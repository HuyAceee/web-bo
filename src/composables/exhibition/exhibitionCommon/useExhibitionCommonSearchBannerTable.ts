import {
  CHARACTER_SEPARATOR,
  DEFAULT_DATE_FORMAT_DOT,
  FORMAT_DATE_YYYYMMDD,
  countMatches,
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
import { useExhibitionCommonSearchBannerPopup } from '@/composables/exhibition/exhibitionCommon/useExhibitionCommonSearchBannerPopup'
import { useValidateTimeRange } from '@/composables/widgets/dateTimePicker/useValidateTimeRange'
import { GenericOptionType, YnOptions } from '@/models'
import { ExhibitionCommonSearchBannerDeleteDataModelRequest, ExhibitionCommonSearchBannerPutDataModelRequest } from '@/models/services/requests/exhibition/ExhibitionSearchBannerModelRequest'
import {
  ExhibitionCommonSearchBannerTableEmits,
  ExhibitionCommonSearchBannerTableFormModel,
  ExhibitionCommonSearchBannerTableProps,
  ExhibitionSearchBannerModel,
  exhibitionCommonSearchBannerTableConfig
} from '@/models/views/exhibition/exhibitionCommon/ExhibitionCommonSearchBannerModel'
import { ExhibitionGnbLinkType, ExhibitionGnbLinkTypeTextValue } from '@/models/views/exhibition/modal/ExhibitionCornerConnectionModalModel'
import { exhibitionSearchBannerApi } from '@/services/api/exhibition/ExhibitionSearchBannerApi'
import dayjs from 'dayjs'
import { useForm } from 'vee-validate'
import { computed, ref, watch } from 'vue'
import { WorkSheet, utils } from 'xlsx'
import { array, boolean, object, string } from 'yup'


export const useExhibitionCommonSearchBannerTable = (props: ExhibitionCommonSearchBannerTableProps, emit: ExhibitionCommonSearchBannerTableEmits) => {
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

  const MAX_KEYWORD = 5
  const DUPLICATE_ERROR = 'duplicate-keyword'
  let valueDuplicateError: string[] = []

  const { setLoading } = useLoading()
  const { openModal: openConfirm, closeModalByPop } = useModalConfirm()
  const { openModal: openNotification } = useModalNotification()
  const { openModal: openSearchBannerPopup } = useExhibitionCommonSearchBannerPopup()
  const tableRef = ref()

  const dateRangeStart: string = dayjs(new Date()).format(DEFAULT_DATE_FORMAT_DOT)

  const schema = {
    data: array().of(
      object().shape({
        isChanged: boolean(),
        searchWordBannerKeyword: string().trim().nullable().when(['isChanged'], {
          is: (isChanged: boolean) => isChanged,
          then: (_schema) => _schema.required().test('duplicate-keyword', DUPLICATE_ERROR, (value) => {
            const listKey = value.split(CHARACTER_SEPARATOR)
            const uniqueItems = new Set(listKey);
            const isUnique = uniqueItems.size === listKey.length;
            if (!isUnique) {
              valueDuplicateError.push(value)
            }
            return isUnique
          }),
        }),
        displayYn: string().trim().nullable().when(['isChanged'], {
          is: (isChanged: boolean) => isChanged,
          then: (_schema) => _schema.required(),
        }),
        linkType: string().trim().nullable().when(['isChanged'], {
          is: (isChanged: boolean) => isChanged,
          then: (_schema) => _schema.required(),
        }),
        linkUrl: string().trim().nullable().when(['isChanged', 'linkType'], {
          is: (isChanged: boolean, linkType: ExhibitionGnbLinkType) => isChanged && linkType === ExhibitionGnbLinkType.LINK_URL,
          then: (_schema) => _schema.required(),
        }),
        linkExhibitionKey: string().trim().nullable().when(['isChanged', 'linkType'], {
          is: (isChanged: boolean, linkType: ExhibitionGnbLinkType) => isChanged && linkType === ExhibitionGnbLinkType.EXHIBITION,
          then: (_schema) => _schema.required(),
        }),
        linkEventKey: string().trim().nullable().when(['isChanged', 'linkType'], {
          is: (isChanged: boolean, linkType: ExhibitionGnbLinkType) => isChanged && linkType === ExhibitionGnbLinkType.EVENT,
          then: (_schema) => _schema.required(),
        }),
        linkProductKey: string().trim().nullable().when(['isChanged', 'linkType'], {
          is: (isChanged: boolean, linkType: ExhibitionGnbLinkType) => isChanged && linkType === ExhibitionGnbLinkType.PRODUCT,
          then: (_schema) => _schema.required(),
        }),
        linkPromotionKey: string().trim().nullable().when(['isChanged', 'linkType'], {
          is: (isChanged: boolean, linkType: ExhibitionGnbLinkType) => isChanged && linkType === ExhibitionGnbLinkType.PROMOTION,
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
            })),
        })
      })
    )
  }

  const { values, setFieldValue, validate } = useForm<ExhibitionCommonSearchBannerTableFormModel>({
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
      id: v.searchWordBannerKey,
      isSelected: checkedList.value.includes(v.searchWordBannerKey as number)
    }))
  )

  const onChangeMaxKeyword = (field: any, value: string) => {
    if (
      value &&
      countMatches(value, CHARACTER_SEPARATOR) >= MAX_KEYWORD - 1
    ) {
      const tempValue = value.split(CHARACTER_SEPARATOR).slice(0, MAX_KEYWORD).join(CHARACTER_SEPARATOR)
      onChangeField(field, tempValue)
    } else {
      onChangeField(field, value)
    }
  }

  const acceptMaxKeyWord = (event: KeyboardEvent) => {
    const value = (event?.target as HTMLInputElement)?.value
    if (value &&
      countMatches(value, CHARACTER_SEPARATOR) >= MAX_KEYWORD - 1 && event.key === CHARACTER_SEPARATOR) {
      event.preventDefault()
    }
  }

  const onCheckAllChange = (value: boolean) => {
    if (value) {
      checkedList.value = values.data.map((it) => it.searchWordBannerKey as number)
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
      const reqData: ExhibitionCommonSearchBannerPutDataModelRequest = {
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
        content: '저장하시겠습니까?',
        onConfirm: () => {
          handleSave(reqData)
          closeModalByPop?.()
        }
      })
    } else {
      let message: string
      switch (errors.data) {
        case DUPLICATE_ERROR:
          message = `[${valueDuplicateError[0]}] 키워드가 중복 되었습니다.`
          break
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
      valueDuplicateError = []
      openNotification({ content: message })
    }
  }

  const handleSave = async (reqData: ExhibitionCommonSearchBannerPutDataModelRequest) => {
    setLoading?.(true)
    exhibitionSearchBannerApi
      .updateList(reqData)
      .then(() => {
        openNotification({ content: '저장되었습니다.' })
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
    const reqData: ExhibitionCommonSearchBannerDeleteDataModelRequest = {
      deleteList: [...checkedList.value]
    }
    setLoading?.(true)
    exhibitionSearchBannerApi
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
    openSearchBannerPopup(() => emit('refresh'))
  }

  const onUpdate = (data: any) => {
    openSearchBannerPopup(() => emit('refresh'), data, { type: 'modify' })
  }

  const onExport = () => {
    const recordHeader = exhibitionCommonSearchBannerTableConfig.reduce((acc, cur) => {
      if (cur.field === 'url') { return [...acc, cur.header, '', ''] }
      return [...acc, cur.header]
    }
      , [] as string[])
    const mergedHeaderConfig = exhibitionCommonSearchBannerTableConfig
      .map((it, idx) => it.field === 'url' ? ({ s: { c: idx, r: 0 }, e: { c: idx + 2, r: 0 } }) : undefined)
      .filter(it => it !== undefined)

    const renderLinkData = (item: ExhibitionSearchBannerModel) => {
      let result: { code: any, name: string } = { code: '', name: '' }
      switch (item.linkType) {
        case ExhibitionGnbLinkType.EVENT:
          result = { code: item.linkEventKey, name: item.linkEventName ?? '' }
          break
        case ExhibitionGnbLinkType.LINK_URL:
          result = { code: '', name: item.linkUrl ?? '' }
          break
        case ExhibitionGnbLinkType.EXHIBITION:
          result = { code: item.linkExhibitionKey, name: item.linkExhibitionName ?? '' }
          break
        case ExhibitionGnbLinkType.PRODUCT:
          result = { code: item.linkProductKey, name: item.linkProductName ?? '' }
          break
        case ExhibitionGnbLinkType.NO_LINK:
        default:
      }
      return result
    }

    const renderHeader = (ws: WorkSheet) => {
      utils.sheet_add_aoa(ws, [recordHeader], { origin: 'A1' })
      if (!ws['!merges']) ws['!merges'] = [];
      ws['!merges'] = mergedHeaderConfig as any
    }

    const recordData = tableComputed.value.map((it) => ({
      no: it.rowNum,
      searchWordBannerKey: it.searchWordBannerKey,
      applyChannelName: it.applyChannelName,
      searchWordBannerKeyword: it.searchWordBannerKeyword,
      displayYn: it.displayYn === displayStatusOptions[0].value ? displayStatusOptions[0].label : displayStatusOptions[1].label,
      linkType: ExhibitionGnbLinkTypeTextValue.find((_it) => _it.value === it.linkType)?.label,
      linkCode: renderLinkData(it).code,
      linkUrl: renderLinkData(it).name,
      displayStartDate: it.displayStartDate,
      displayStartTime: it.displayStartTime,
      displayEndDate: it.displayEndDate,
      displayEndTime: it.displayEndTime,
      createdByName: it.createdByName,
      createdDate: it.createdDate,
      lastModifiedByName: it.lastModifiedByName,
      lastModifiedDate: it.lastModifiedDate
    }))
    exportExcel(recordData, "SearchBanner", recordHeader, 12, {
      customHeader: renderHeader
    })
  }

  return {
    displayStatusOptions,
    tableRef,
    values,
    tableComputed,
    dateRangeStart,
    setFieldValue,
    onChangeField,
    validateTime,
    onChangeMaxKeyword,
    acceptMaxKeyWord,
    onCheckAllChange,
    onCheckeRowChange,
    onSave,
    onDelete,
    onRegis,
    onUpdate,
    onExport
  }
}