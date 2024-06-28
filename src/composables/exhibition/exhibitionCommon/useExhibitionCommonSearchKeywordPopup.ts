import { DATETIME_END_BEFORE_START, DATETIME_END_REQUIRED, DATETIME_IN_THE_PAST, DATETIME_MESSAGES, DATETIME_REQUIRED, DATETIME_START_REQUIRED, DEFAULT_DATE_FORMAT_DOT, FORMAT_DATE_YYYYMMDD, formatDate } from '@/common'
import { useLoading, useModal, useModalConfirm, useModalNotification } from '@/composables'
import { useWatchCheckAll } from '@/composables/common/useWatchCheckAll'
import { useProductModalSearchWithTable } from '@/composables/products/modal/modalSearch/useProductModalSearchWithTable'
import { useValidateTimeRange } from '@/composables/widgets/dateTimePicker/useValidateTimeRange'
import { GenericOptionType, ProductSearchType, YnOptions } from '@/models'
import {
  ExhibitionCommonSearchKeywordDetailModel,
  ExhibitionCommonSearchKeywordPopupEmits,
  ExhibitionCommonSearchKeywordPopupProps,
  ExhibitionCommonSearchKeywordRegisPopupConfig
} from '@/models/views/exhibition/exhibitionCommon/ExhibitionCommonSearchKeywordModel'
import { ExhibitionGnbLinkType } from '@/models/views/exhibition/modal/ExhibitionCornerConnectionModalModel'
import { exhibitionSearchKeywordApi } from '@/services/api/exhibition/ExhibitionSearchKeywordApi'
import ExhibitionCommonSearchKeywordRegisPopup from '@/views/exhibition/exhibitionCommon/ExhibitionCommonSearchKeywordRegisPopup.vue'
import dayjs from 'dayjs'
import { useForm } from 'vee-validate'
import { computed, ref, watch } from 'vue'
import { array, object, string } from 'yup'

export const useExhibitionCommonSearchKeywordPopup = () => {
  const { showModal } = useModal()

  const openModal = (refreshCallback?: () => void, data?: ExhibitionCommonSearchKeywordDetailModel, config?: ExhibitionCommonSearchKeywordRegisPopupConfig) => {
    showModal?.(
      {
        component: ExhibitionCommonSearchKeywordRegisPopup,
        props: {
          data,
          config
        },
        events: {
          callback: refreshCallback
        }
      }
    )
  }
  return { openModal }
}

export const useExhibitionCommonSearchKeywordPopupCtrl = (props: ExhibitionCommonSearchKeywordPopupProps, emit: ExhibitionCommonSearchKeywordPopupEmits) => {
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

  const applyChannelOptions: GenericOptionType<'applyChannelAllYn' | 'applyChannelPcYn' | 'applyChannelMobileYn' | 'applyChannelMobileWebYn'>[] = [
    {
      label: '전체',
      value: 'applyChannelAllYn'
    },
    {
      label: 'PC',
      value: 'applyChannelPcYn'
    },
    {
      label: '모바일',
      value: 'applyChannelMobileYn'
    },
    {
      label: '모바일-웹',
      value: 'applyChannelMobileWebYn'
    }
  ]

  const { setLoading } = useLoading()
  const { openModal: openModalSearchMember } = useProductModalSearchWithTable()
  const { openModal: openConfirm, closeModalByPop, closeAllModal } = useModalConfirm()
  const { openModal: openNotification } = useModalNotification()

  const dateRangeStart: string = dayjs(new Date()).format(DEFAULT_DATE_FORMAT_DOT)

  const defaultValue: ExhibitionCommonSearchKeywordDetailModel = {
    searchBoxKeywordKey: '',
    searchBoxKeywordName: '',
    linkType: ExhibitionGnbLinkType.LINK_URL,
    linkUrl: '',
    linkExhibitionKey: '',
    linkEventKey: '',
    linkProductKey: '',
    displayYn: YnOptions.Y,
    displayStartDate: '',
    displayStartTime: '',
    displayEndDate: '',
    displayEndTime: '',
    applyChannelAllYn: YnOptions.Y,
    applyChannelPcYn: YnOptions.Y,
    applyChannelMobileYn: YnOptions.Y,
    applyChannelMobileWebYn: YnOptions.Y,
    excludeCustomerCreateRequestList: []
  }

  const schema = object().shape({
    searchBoxKeywordName: string().trim().required(),
    linkType: string().trim().required(),
    linkUrl: string().trim().nullable().when(['linkType'], {
      is: (linkType: string) => linkType === ExhibitionGnbLinkType.LINK_URL,
      then: (_schema) => _schema.required()
    }),
    linkExhibitionKey: string().trim().nullable().when(['linkType'], {
      is: (linkType: string) => linkType === ExhibitionGnbLinkType.EXHIBITION,
      then: (_schema) => _schema.required()
    }),
    linkEventKey: string().trim().nullable().when(['linkType'], {
      is: (linkType: string) => linkType === ExhibitionGnbLinkType.EVENT,
      then: (_schema) => _schema.required()
    }),
    linkProductKey: string().trim().nullable().when(['linkType'], {
      is: (linkType: string) => linkType === ExhibitionGnbLinkType.PRODUCT,
      then: (_schema) => _schema.required()
    }),
    linkPromotionKey: string().trim().nullable().when(['linkType'], {
      is: (linkType: string) => linkType === ExhibitionGnbLinkType.PROMOTION,
      then: (_schema) => _schema.required()
    }),
    displayYn: string().trim().required(),
    displayStartDate: string().trim().when(['displayEndDate'],
      ([displayEndDate], _schema) => {
        return !displayEndDate ? _schema.required(DATETIME_REQUIRED)
          : _schema.required(DATETIME_START_REQUIRED)
            .test('min-range', DATETIME_IN_THE_PAST, (value) => {
              return !dayjs(value, DEFAULT_DATE_FORMAT_DOT).isBefore(dayjs(dateRangeStart, DEFAULT_DATE_FORMAT_DOT))
            })
      }
    ),
    displayStartTime: string().trim().required(),
    displayEndDate: string().trim().required(DATETIME_END_REQUIRED)
      .when(['displayStartDate'], ([displayStartDate], __schema) => __schema.test({
        message: DATETIME_END_BEFORE_START,
        test: (value: string) => {
          return !dayjs(value, DEFAULT_DATE_FORMAT_DOT).isBefore(dayjs(displayStartDate, DEFAULT_DATE_FORMAT_DOT))
        }
      })),
    displayEndTime: string().trim().required().when(['displayStartDate', 'displayEndDate', 'displayStartTime'],
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
    applyChannelAllYn: string().trim(),
    applyChannelPcYn: string().trim(),
    applyChannelMobileYn: string().trim(),
    applyChannelMobileWebYn: string().trim().when(['applyChannelAllYn', 'applyChannelPcYn', 'applyChannelMobileYn'], {
      is: (applyChannelAllYn: string, applyChannelPcYn: string, applyChannelMobileYn: string) =>
        Boolean(applyChannelAllYn === YnOptions.N && applyChannelPcYn === YnOptions.N && applyChannelMobileYn === YnOptions.N),
      then: (_schema) => _schema.equals([YnOptions.Y])
    }),
    excludeCustomerCreateRequestList: array().of(object().shape({ customerKey: string().trim().required() }))
  }, [['displayStartDate', 'displayEndDate']])

  const tableRef = ref()

  const currentValue = ref<ExhibitionCommonSearchKeywordDetailModel>()
  const checkedList = ref<(number | string)[]>([])

  const { values, meta, setFieldValue, validate, resetForm } = useForm<ExhibitionCommonSearchKeywordDetailModel>({
    initialValues: defaultValue,
    validationSchema: schema
  })
  
  const { validateTime: validateTimeFunc } = useValidateTimeRange({ setFieldValue })

  const validateTime = (field: any, time: string, date?: string, config?: { type?: 'start' | 'end', compareDate?: string, compareTime?: string }) => {
    validateTimeFunc(field, time, date, config, meta.value.dirty)
  }

  useWatchCheckAll(values, {
    setFieldValue,
    checkAllKeyDependency: 'applyChannelAllYn',
    checkListKeyDependencies: ['applyChannelPcYn', 'applyChannelMobileYn', 'applyChannelMobileWebYn']
  })

  const getData = async () => {
    if (props.data?.searchBoxKeywordKey) {
      try {
        setLoading?.(true)
        const { data: detailData } = await exhibitionSearchKeywordApi.getDetail(props.data?.searchBoxKeywordKey)
        const { data: detailExcludeData } = await exhibitionSearchKeywordApi.getDetailExcludeCustomer(props.data?.searchBoxKeywordKey)
        const resData: ExhibitionCommonSearchKeywordDetailModel = {
          ...detailData,
          excludeCustomerCreateRequestList: detailExcludeData
        }
        resetForm({ values: resData })
        currentValue.value = resData

      } catch (err) {
        // catch
      } finally {
        setLoading?.(false)
      }
    }
  }

  watch([() => props.data, () => props.config], () => {
    if (props.config?.type === 'modify') {
      getData()
    }
  }, { immediate: true })

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

  const onGetMember = () => {
    openModalSearchMember(ProductSearchType.CUSTOMER, (data: any) => getMember(data))
  }

  const getMember = (data: any) => {
    if ((values.excludeCustomerCreateRequestList ?? []).filter((v) => v.customerKey === data?.customerKey).length > 0) {
      return
    }
    setFieldValue('excludeCustomerCreateRequestList', [...(values.excludeCustomerCreateRequestList ?? []), { ...data, customerName: data.name, customerStatus: data.status }])
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
    const { valid, errors } = await validate()
    if (valid) {
      openConfirm({
        content: '저장하시겠습니까?',
        onConfirm: () => {
          closeModalByPop?.()
          handleConfirm()
        }
      })
    } else {
      let message: string
      if (errors.displayStartDate) {
        message = DATETIME_MESSAGES[errors.displayStartDate]
      } else if (errors.displayEndDate) {
        message = DATETIME_MESSAGES[errors.displayEndDate]
      } else if (errors.displayEndTime === DATETIME_END_BEFORE_START) {
        message = DATETIME_MESSAGES[errors.displayEndTime]
      } else {
        message = '필수입력 값을 입력하세요.'
      }
      openNotification({ content: message })
    }
  }

  const handleConfirm = async () => {
    const reqData: ExhibitionCommonSearchKeywordDetailModel = {
      ...values,
      displayStartDate: formatDate(values.displayStartDate ?? '', DEFAULT_DATE_FORMAT_DOT, FORMAT_DATE_YYYYMMDD),
      displayStartTime: values.displayStartTime?.split(':').join(''),
      displayEndDate: formatDate(values.displayEndDate ?? '', DEFAULT_DATE_FORMAT_DOT, FORMAT_DATE_YYYYMMDD),
      displayEndTime: values.displayEndTime?.split(':').join(''),
      excludeCustomerCreateRequestList: values.excludeCustomerCreateRequestList?.map((v) => ({
        customerKey: v.customerKey
      }))
    }
    if (props.config?.type === 'register') {
      setLoading?.(true)
      exhibitionSearchKeywordApi
        .register(reqData)
        .then(() => {
          openNotification({
            content: '저장되었습니다.',
            onAccept: () => {
              emit('callback')
              closeAllModal?.()
            }
          })
        })
        .catch(() => { })
        .finally(() => {
          setLoading?.(false)
        })
    } else {
      setLoading?.(true)
      exhibitionSearchKeywordApi
        .update(reqData)
        .then(() => {
          openNotification({
            content: '저장되었습니다.',
            onAccept: () => {
              emit('callback')
              closeAllModal?.()
            }
          })
        })
        .catch(() => { })
        .finally(() => {
          setLoading?.(false)
        })
    }
  }

  const onCancel = () => {
    if (meta.value.dirty) {
      openConfirm({
        content: '입력 내용이 있습니다. 창을 닫으시겠습니까?',
        onConfirm: () => {
          closeAllModal?.()
        }
      })
    } else {
      closeAllModal?.()
    }
  }

  return {
    displayStatusOptions,
    applyChannelOptions,
    dateRangeStart,
    tableRef,
    values,
    tableComputed,
    setFieldValue,
    validateTime,
    onGetMember,
    onCheckAllChange,
    onCheckRowChange,
    onDeleteSelected,
    onDeleteRow,
    onSubmit,
    onCancel
  }
}