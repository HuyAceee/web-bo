import {
  DEFAULT_DATE_FORMAT_DOT,
  FORMAT_DATE_YYYYMMDD,
  exportExcel,
  formatDate,
  regexIndexArrayForm
} from '@/common'
import {
  DATETIME_END_BEFORE_START,
  DATETIME_END_REQUIRED,
  DATETIME_IN_THE_PAST,
  DATETIME_MESSAGES,
  DATETIME_REQUIRED,
  DATETIME_START_REQUIRED,
} from '@/common/validation/errorMessages'
import { useLoading, useModalConfirm, useModalNotification } from '@/composables'
import { useExhibitionCommonOpenWindowRegistrationPopup } from '@/composables/exhibition/exhibitionCommon/useExhibitionWindowRegistrationPopup'
import { useValidateTimeRange } from '@/composables/widgets/dateTimePicker/useValidateTimeRange'
import { GenericOptionType, YnOptions } from '@/models'
import { ExhibitionCommonWindowDeleteDataModelRequest, ExhibitionCommonWindowPutDataModelRequest } from '@/models/services/requests/exhibition/ExhibitionWindowModelRequest'
import {
  ExhibitionCommonWindowTableEmits,
  ExhibitionCommonWindowTableFormModel,
  ExhibitionCommonWindowTableProps,
  exhibitionCommonWindowTableConfig
} from '@/models/views/exhibition/exhibitionCommon/ExhibitionCommonWindowModel'
import { exhibitionWindowApi } from '@/services/api/exhibition/ExhibitionWindowApi'
import dayjs from 'dayjs'
import { useForm } from 'vee-validate'
import { computed, ref, watch } from 'vue'
import { array, boolean, object, string } from 'yup'

export const useExhibitionCommonWindowTable = (props: ExhibitionCommonWindowTableProps, emit: ExhibitionCommonWindowTableEmits) => {
  const displayStatusOptions: GenericOptionType<YnOptions>[] = [
    {
      label: '전시',
      value: YnOptions.Y
    },
    {
      label: '비전시',
      value: YnOptions.N
    }
  ]

  const { setLoading } = useLoading()
  const { openModal: openConfirm, closeModalByPop } = useModalConfirm()
  const { openModal: openNotification } = useModalNotification()
  const { openModal: openWindowPopup } = useExhibitionCommonOpenWindowRegistrationPopup()
  const tableRef = ref()

  const dateRangeStart: string = dayjs(new Date()).format(DEFAULT_DATE_FORMAT_DOT)

  const schema = {
    data: array().of(
      object().shape({
        isChanged: boolean(),
        popupName: string().trim().nullable().when(['isChanged'], {
          is: (isChanged: boolean) => isChanged,
          then: (_schema) => _schema.required(),
        }),
        displayYn: string().trim().nullable().when(['isChanged'], {
          is: (isChanged: boolean) => isChanged,
          then: (_schema) => _schema.required(),
        }),
        displayStartDate: string().trim().nullable()
          .when(['isChanged', 'displayEndDate'], ([isChanged, displayEndDate], _schema) => {
            if (isChanged) {
              if (displayEndDate) {
                return _schema.required(DATETIME_START_REQUIRED).test('min-range', DATETIME_IN_THE_PAST, (value) => {
                  return !dayjs(value, DEFAULT_DATE_FORMAT_DOT).isBefore(dayjs(dateRangeStart, DEFAULT_DATE_FORMAT_DOT))
                })
              } else {
                return _schema.required(DATETIME_REQUIRED)
              }
            } else {
              return _schema
            }
          }),
        displayStartTime: string().trim().nullable().when(['isChanged'], {
          is: (isChanged: boolean) => isChanged,
          then: (_schema) => _schema.required(),
        }),
        displayEndDate: string().trim().nullable().when(['isChanged'], {
          is: (isChanged: boolean) => isChanged,
          then: (_schema) => _schema
            .required(DATETIME_END_REQUIRED)
            .when(['displayStartDate'], ([displayStartDate], __schema) => __schema.test({
              message: DATETIME_END_BEFORE_START,
              test: (value: string) => {
                return !dayjs(value, DEFAULT_DATE_FORMAT_DOT).isBefore(dayjs(displayStartDate, DEFAULT_DATE_FORMAT_DOT))
              }
            })),
        }),
        displayEndTime: string().trim().nullable().when(['isChanged'], {
          is: (isChanged: boolean) => isChanged,
          then: (_schema) => _schema.required().when(['displayStartDate', 'displayEndDate', 'displayStartTime'],
            ([displayStartDate, displayEndDate, displayStartTime], __schema) => __schema.test({
              message: DATETIME_END_BEFORE_START,
              test: (value: string) => {
                if (displayStartDate === displayEndDate) {
                  return Number(value.split(':').join('')) >= Number(displayStartTime.split(':').join(''))
                } else {
                  return true
                }
              }
            }))
        })
      })
    )
  }

  const { values, setFieldValue, validate } = useForm<ExhibitionCommonWindowTableFormModel>({
    validationSchema: schema
  })

  const onChangeField = (field: any, value: string) => {
    const [, index] = regexIndexArrayForm.exec(field) as RegExpExecArray
    setFieldValue(field, value);
    setFieldValue(`data.${Number(index)}.isChanged`, true);
  }

  const { validateTime } = useValidateTimeRange({ setFieldValue: onChangeField })

  const checkedList = ref<number[]>([])

  watch(
    () => props.data,
    (v) => {
      setFieldValue('data', v ?? [])
    },
    { immediate: true }
  )

  const tableComputed = computed(() =>
    (values.data ?? []).map((v) => ({
      ...v,
      id: v.popupKey,
      isSelected: checkedList.value.includes(v.popupKey as number)
    }))
  )

  const onCheckAllChange = (value: boolean) => {
    if (value) {
      checkedList.value = values.data.map((it) => it.popupKey as number)
    } else {
      checkedList.value = []
    }
  }

  const onCheckeRowChange = (item: { id: number }) => {
    if (checkedList.value.includes(item.id)) {
      checkedList.value = checkedList.value.filter((it) => it !== item.id)
    } else {
      checkedList.value = checkedList.value.concat([item.id])
    }
  }

  const onSave = async () => {
    const { valid, errors } = await validate()
    if (valid) {
      const reqData: ExhibitionCommonWindowPutDataModelRequest = {
        modifyRequestList: values.data.filter((it) => it.isChanged).map((it) => ({
          ...it,
          displayStartDate: formatDate(it.displayStartDate ?? '', DEFAULT_DATE_FORMAT_DOT, FORMAT_DATE_YYYYMMDD),
          displayStartTime: it.displayStartTime?.split(':').join(''),
          displayEndDate: formatDate(it.displayEndDate ?? '', DEFAULT_DATE_FORMAT_DOT, FORMAT_DATE_YYYYMMDD),
          displayEndTime: it.displayEndTime?.split(':').join('')
        }))
      }
      if (reqData.modifyRequestList.length === 0) {
        return
      }
      openConfirm({
        content: '변경 사항을 저장하시겠습니까?',
        onConfirm: () => {
          handleSave(reqData)
          closeModalByPop?.()
        }
      })
    } else {
      let message: string
      switch (errors.data) {
        case DATETIME_REQUIRED:
        case DATETIME_START_REQUIRED:
        case DATETIME_END_REQUIRED:
        case DATETIME_END_BEFORE_START:
        case DATETIME_IN_THE_PAST:
          message = DATETIME_MESSAGES[errors.data]
          break
        default:
          message = '필수입력 값을 입력하세요.'
      }
      openNotification({ content: message })
    }
  }

  const handleSave = async (reqData: ExhibitionCommonWindowPutDataModelRequest) => {
    setLoading?.(true)
    exhibitionWindowApi
      .updateList(reqData)
      .then(() => {
        openNotification({ content: '변경사항이 저장되었습니다.' })
      })
      .catch(() => { })
      .finally(() => {
        setLoading?.(false)
        emit('refresh')
      })
  }

  const onDelete = () => {
    if (checkedList.value.length) {
      openConfirm({
        content: '삭제하시겠습니까?',
        onConfirm: () => {
          closeModalByPop?.()
          handleDelete()
        }
      })
    } else {
      openNotification({ content: '삭제할 행을 선택해 주세요.' })
    }
  }

  const handleDelete = async () => {
    const reqData: ExhibitionCommonWindowDeleteDataModelRequest = {
      deleteList: [...checkedList.value]
    }
    setLoading?.(true)
    exhibitionWindowApi
      .deleteList(reqData)
      .then(() => {
        openNotification({ content: '삭제되었습니다.' })
      })
      .catch(() => { })
      .finally(() => {
        setLoading?.(false)
        tableRef.value?.clearCheckAll()
        checkedList.value = []
        emit('refresh')
      })
  }

  const onRegis = () => {
    openWindowPopup(() => emit('refresh'))
  }

  const onUpdate = (data: any) => {
    openWindowPopup(() => emit('refresh'), data, { type: 'modify' })
  }

  const onExport = () => {
    const recordHeader = exhibitionCommonWindowTableConfig.reduce((acc, cur) =>
      [...acc, cur.header]
      , [] as string[])
    const recordData = tableComputed.value.map((it) => ({
      no: it.rowNum,
      popupKey: it.popupKey,
      displayOrder: it.displayOrder,
      popupName: it.popupName,
      displayYn: it.displayYn === displayStatusOptions[0].value ? displayStatusOptions[0].label : displayStatusOptions[1].label,
      displayStartDate: it.displayStartDate,
      displayStartTime: it.displayStartTime,
      displayEndDate: it.displayEndDate,
      displayEndTime: it.displayEndTime,
      popupAttributeTypeName: it.popupAttributeTypeName,
      popupCount: it.popupCount,
      createdByName: it.createdByName,
      createdDate: it.createdDate,
      lastModifiedByName: it.lastModifiedByName,
      lastModifiedDate: it.lastModifiedDate
    }))
    exportExcel(recordData, "WindowPopUp", recordHeader)
  }

  return {
    displayStatusOptions,
    tableRef,
    values,
    tableComputed,
    dateRangeStart,
    onChangeField,
    validateTime,
    onCheckAllChange,
    onCheckeRowChange,
    onSave,
    onDelete,
    onRegis,
    onUpdate,
    onExport
  }
}