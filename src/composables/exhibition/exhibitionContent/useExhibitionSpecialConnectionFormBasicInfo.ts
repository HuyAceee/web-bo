import { array, object, string } from 'yup'
import { useModalNotification } from '@/composables/widgets'
import { ProductSearchType, YnOptions } from '@/models'
import {
  exhibitionCategoryExposureTypeOptions,
  exhibitionDisplayStatusOptions,
  exhibitionExposurePeriodOptions,
  ExhibitionFormType,
  exhibitionFullExposureDisplayOption,
  exhibitionPlatformOptions,
  ExhibitionSpecialConnectionFormBasicInfoModel,
  ExhibitionSpecialConnectionFormBasicInfoProps,
  exhibitionSpecialExhibitionCategory,
  exhibitionStatusOptions,
  ExhibitionStatusType,
  ExhibitionType
} from '@/models/views/exhibition/exhibitionContent/ExhibitionSpecialConnectionFormBasicInfoModel'
import { computed, ref, watch } from 'vue'
import { useForm } from 'vee-validate'
import { useComingSoonModal } from '@/composables/widgets/modal/useComingSoonModal'
import { useProductModalSearchWithTable } from '@/composables/products/modal/modalSearch/useProductModalSearchWithTable'
import {
  DATETIME_END_BEFORE_START,
  DATETIME_END_REQUIRED,
  DATETIME_IN_THE_PAST,
  DATETIME_REQUIRED,
  DATETIME_START_REQUIRED,
  DEFAULT_DATE_FORMAT_DOT,
  FORMAT_DATE_YYYYMMDD,
  formatTime
} from '@/common'
import { useValidateTimeRange } from '@/composables/widgets/dateTimePicker/useValidateTimeRange'
import dayjs from 'dayjs'

export const useExhibitionSpecialConnectionFormBasicInfo = (props: ExhibitionSpecialConnectionFormBasicInfoProps) => {
  const { openModal: openNotification } = useModalNotification()
  const { openComingSoonModal } = useComingSoonModal()
  const { openModal: openModalSearchCustomer } = useProductModalSearchWithTable()

  const tableRef = ref()
  const checkedList = ref<(number | string)[]>([])
  const keyWordInput = ref<string>()

  const dateRangeStart: string = formatTime(new Date(), DEFAULT_DATE_FORMAT_DOT)

  const exhibitionStatusTypeOptions = exhibitionDisplayStatusOptions
  const exhibitionTypeOptions = exhibitionSpecialExhibitionCategory
  const exhibitionFormType = exhibitionCategoryExposureTypeOptions
  const applyChannelOptions = exhibitionPlatformOptions
  const exhibitionPeriodOptions = exhibitionExposurePeriodOptions
  const displayExhibitionOption = exhibitionStatusOptions
  const exposureDisplayOptions = exhibitionFullExposureDisplayOption

  const emptyData: ExhibitionSpecialConnectionFormBasicInfoModel = {
    exhibitionKey: '',
    exhibitionType: ExhibitionType.DEFAULT,
    exhibitionStatusType: ExhibitionStatusType.EXPECT,
    exhibitionName: '',
    exhibitionContents: '',
    displayStartDate: '',
    displayStartTime: '',
    displayEndDate: '',
    displayEndTime: '',
    keywordCreateRequestList: [],
    chargeMdCode: '',
    displayYn: YnOptions.Y,
    exhibitionPeriodUseYn: YnOptions.Y,
    applyChannelAllYn: YnOptions.Y,
    applyChannelPcYn: YnOptions.N,
    applyChannelMobileYn: YnOptions.N,
    applyChannelMobileWebYn: YnOptions.N,
    exhibitionFormType: ExhibitionFormType.TAB,
    exhibitionFormAllYn: YnOptions.Y,
    terminateReasonContents: '',
    excludeCustomerCreateRequestList: []
  }

  const schema = object()
    .shape(
      {
        exhibitionType: string().required(),
        exhibitionStatusType: string(),
        exhibitionName: string().trim().required(),
        exhibitionContents: string().trim(),
        chargeMdCode: string().required(),
        displayYn: string().required(),
        exhibitionPeriodUseYn: string().required(),
        applyChannelAllYn: string(),
        applyChannelPcYn: string(),
        applyChannelMobileYn: string(),
        applyChannelMobileWebYn: string(),
        terminateReasonContents: string().trim().required(),
        displayStartDate: string()
          .trim()
          .when(['displayEndDate'], ([displayEndDate], _schema) => {
            return !displayEndDate
              ? _schema.required(DATETIME_REQUIRED)
              : _schema.required(DATETIME_START_REQUIRED).test('min-range', DATETIME_IN_THE_PAST, (value) => {
                  return !dayjs(value, DEFAULT_DATE_FORMAT_DOT).isBefore(dayjs(dateRangeStart, DEFAULT_DATE_FORMAT_DOT))
                })
          }),
        displayStartTime: string().trim().required(),
        displayEndDate: string()
          .trim()
          .required(DATETIME_END_REQUIRED)
          .when(['displayStartDate'], ([displayStartDate], __schema) =>
            __schema.test({
              message: DATETIME_END_BEFORE_START,
              test: (value: string) => {
                return !dayjs(value, DEFAULT_DATE_FORMAT_DOT).isBefore(dayjs(displayStartDate, DEFAULT_DATE_FORMAT_DOT))
              }
            })
          ),
        displayEndTime: string()
          .trim()
          .required()
          .when(['displayStartDate', 'displayEndDate', 'displayStartTime'], ([displayStartDate, displayEndDate, displayStartTime], __schema) =>
            __schema.test({
              message: DATETIME_END_BEFORE_START,
              test: (value: string) => {
                if (displayStartDate === displayEndDate) {
                  return Number(value.split(':').join('')) >= Number(displayStartTime.split(':').join(''))
                } else {
                  return true
                }
              }
            })
          ),
        keywordCreateRequestList: array().of(
          object().shape({
            keywordName: string().trim()
          })
        ),
        excludeCustomerCreateRequestList: array().of(
          object().shape({
            customerKey: string().trim()
          })
        )
      },
      [['displayStartDate', 'displayEndDate']]
    )
    .test('applyChannel', '1개 이상 필수 체크해주세요.', (values) => {
      const { applyChannelAllYn, applyChannelPcYn, applyChannelMobileYn, applyChannelMobileWebYn } = values
      return Boolean(
        applyChannelAllYn === YnOptions.Y ||
          applyChannelPcYn === YnOptions.Y ||
          applyChannelMobileYn === YnOptions.Y ||
          applyChannelMobileWebYn === YnOptions.Y
      )
    })
    .test('terminateReasonContents', '필수 입력 항목을 입력해주세요.', (values) => {
      const { exhibitionStatusType, terminateReasonContents } = values
      if (exhibitionStatusType === ExhibitionStatusType.TERMINATE) {
        return Boolean(terminateReasonContents)
      }
      return true
    })

  const { values, setFieldValue, setValues, handleReset, validate } = useForm<ExhibitionSpecialConnectionFormBasicInfoModel>({
    initialValues: emptyData,
    validationSchema: schema
  })

  const { validateTime } = useValidateTimeRange({ setFieldValue })

  watch(
    () => props.data,
    (data) => {
      setValues({ ...(data as ExhibitionSpecialConnectionFormBasicInfoModel) })
    },
    { immediate: true }
  )

  const tableComputed = computed(() => {
    return values.excludeCustomerCreateRequestList?.map((v, idx) => ({
      ...v,
      id: v.customerKey,
      no: idx + 1,
      contractStatus: v?.contractStatus?.title ?? v.contractStatus,
      customerStatus: v?.customerStatus?.title ?? v.customerStatus,
      isSelected: checkedList.value.includes(v.customerKey as string | number)
    }))
  })

  const getCustomerData = () => {
    tableRef.value?.clearCheckAll()
    checkedList.value = []
    openModalSearchCustomer(ProductSearchType.CUSTOMER, (data: any) => getCustomer(data))
  }

  const getCustomer = (data: any) => {
    if ((values.excludeCustomerCreateRequestList ?? []).filter((v) => v.customerKey === data?.customerKey).length > 0) {
      return
    }
    setFieldValue('excludeCustomerCreateRequestList', [
      ...(values.excludeCustomerCreateRequestList ?? []),
      { ...data, customerName: data.name, customerStatus: data.status }
    ])
  }

  const onDeleteSelected = () => {
    setFieldValue(
      'excludeCustomerCreateRequestList',
      (values.excludeCustomerCreateRequestList ?? []).filter((v) => !checkedList.value.includes(v.customerKey as string | number))
    )
    checkedList.value = []
    tableRef.value?.clearCheckAll()
  }

  const onDeleteRow = (id: string | number) => {
    setFieldValue(
      'excludeCustomerCreateRequestList',
      (values.excludeCustomerCreateRequestList ?? []).filter((v) => v.customerKey !== id)
    )
    checkedList.value = checkedList.value.filter((it) => it !== id)
  }

  const onCheckAllChange = (value: boolean) => {
    if (value) {
      checkedList.value = (values.excludeCustomerCreateRequestList ?? []).map((it) => it.customerKey ?? 0)
    } else {
      checkedList.value = []
    }
  }

  const onCheckRowChange = (item: { id: number }) => {
    if (checkedList.value.includes(item.id)) {
      checkedList.value = checkedList.value.filter((it) => it !== item.id)
    } else {
      checkedList.value = checkedList.value.concat([item.id])
    }
  }

  const onSubmit = async () => {
    const { errors, valid } = await validate()

    if (valid) {
      return {
        data: {
          ...values,
          displayStartTime: values.displayStartTime.replace(':', ''),
          displayEndTime: values.displayEndTime.replace(':', ''),
          displayStartDate: formatTime(values.displayStartDate, FORMAT_DATE_YYYYMMDD),
          displayEndDate: formatTime(values.displayEndDate, FORMAT_DATE_YYYYMMDD)
        },
        isValid: valid
      }
    } else {
      const firstErrorKey = Object.keys(errors)[0]
      if (firstErrorKey === '') {
        //@ts-ignore
        openNotification({ content: errors[firstErrorKey] })
      } else {
        openNotification({
          content: '<p><span class="wf_text-sub-01">( * )</span> 필수입력 값을 입력하세요.</p>'
        })
      }
      return { data: {}, isValid: valid }
    }
  }

  const onRegisKeyword = () => {
    if ((values.keywordCreateRequestList?.length ?? 0) >= 10) {
      openNotification({ content: '키워드는 10개까지 등록 가능합니다.' })
      return
    }
    if (keyWordInput.value) {
      setFieldValue('keywordCreateRequestList', [...(values.keywordCreateRequestList ?? []), { keywordName: keyWordInput.value }])
      keyWordInput.value = ''
    }
  }
  const onDeleteKeyword = (index: number) => {
    setFieldValue(
      'keywordCreateRequestList',
      [...(values.keywordCreateRequestList ?? [])].filter((_, i) => i !== index)
    )
  }

  const onClickOpenModalNoticeComingSoon = () => {
    openComingSoonModal()
  }

  return {
    exhibitionStatusTypeOptions,
    displayExhibitionOption,
    exhibitionPeriodOptions,
    exposureDisplayOptions,
    applyChannelOptions,
    exhibitionFormType,
    tableRef,
    exhibitionTypeOptions,
    keyWordInput,
    values,
    setFieldValue,
    onRegisKeyword,
    onDeleteKeyword,
    onSubmit,
    handleReset,
    onClickOpenModalNoticeComingSoon,
    tableComputed,
    getCustomerData,
    onCheckAllChange,
    onCheckRowChange,
    onDeleteSelected,
    onDeleteRow,
    dateRangeStart,
    validateTime
  }
}
