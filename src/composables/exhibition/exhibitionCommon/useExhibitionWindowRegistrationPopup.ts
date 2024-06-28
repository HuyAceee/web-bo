import dayjs from 'dayjs'
import { useForm } from 'vee-validate'
import { computed, ref, watch } from 'vue'
import { object, string, number, array } from 'yup'
import {
  DATETIME_END_BEFORE_START,
  DATETIME_END_REQUIRED,
  DATETIME_IN_THE_PAST,
  DATETIME_REQUIRED,
  DATETIME_START_REQUIRED,
  DEFAULT_DATE_FORMAT_DOT,
  FORMAT_DATE_YYYYMMDD,
  formatDate
} from '@/common'
import { useLoading, useModal } from '@/composables/common'
import { useProductModalSearchWithTable } from '@/composables/products/modal/modalSearch/useProductModalSearchWithTable'
import { useModalConfirm, useModalNotification } from '@/composables/widgets'
import { useComingSoonModal } from '@/composables/widgets/modal/useComingSoonModal'
import { ProductSearchType, ProductSelectDefinitionType, YnOptions } from '@/models'
import {
  ExhibitionApplicationChannelType,
  ExhibitionCommonWindowRegistrationPopupModel,
  ExhibitionCommonWindowRegistrationPopupProps,
  ExhibitionCommonWindowRegistrationPopupEmits,
  ExhibitionSelectOptionsType,
  exhibitionExposureOptions,
  exhibitionNatureOptions,
  exhibitionNatureType,
  exhibitionNonDisplayPeriodType,
  exhibitionPlatformOptions,
  exhibitionStatusOptions,
  exhibitionTotalPopup,
  nonExhibitionPeriod,
  ExhibitionCommonWindowRegistrationPopupConfig,
  ExhibitionCommonPopupDisplayCreateRequestModel
} from '@/models/views/exhibition/exhibitionCommon/ExhibitionCommonWindowRegistrationModel'
import { exhibitionWindowRegistrationApi } from '@/services/api/exhibition/ExhibitionWindowRegistrationApi'
import ExhibitionCommonWindowRegistrationPopup from '@/views/exhibition/exhibitionCommon/ExhibitionCommonWindowRegistrationPopup.vue'
import { useProductModalChangeImage } from '@/composables/products/ticketProduct/baseInfo/useProductModalChangeImage'
import { useValidateTimeRange } from '@/composables/widgets/dateTimePicker/useValidateTimeRange'
import { ExhibitionGnbLinkType } from '@/models/views/exhibition/modal/ExhibitionCornerConnectionModalModel'

export const useExhibitionCommonOpenWindowRegistrationPopup = () => {
  const { showModal } = useModal()
  const openModal = (
    refreshCallback?: () => void,
    data?: ExhibitionCommonWindowRegistrationPopupModel,
    config?: ExhibitionCommonWindowRegistrationPopupConfig
  ) => {
    showModal?.({
      component: ExhibitionCommonWindowRegistrationPopup,
      props: {
        data,
        config
      },
      events: {
        callback: refreshCallback
      }
    })
  }
  return { openModal }
}

export const useExhibitionWindowRegistrationPopup = (
  props: ExhibitionCommonWindowRegistrationPopupProps,
  emit: ExhibitionCommonWindowRegistrationPopupEmits
) => {
  const { setLoading } = useLoading()

  const { openModal: openModalSearchCustomer } = useProductModalSearchWithTable()
  const { openComingSoonModal } = useComingSoonModal()
  const { openModal: openConfirm, closeModalByPop, closeAllModal } = useModalConfirm()
  const { openModal: openNotification } = useModalNotification()
  const { onShowModal: openSquareImageModal } = useProductModalChangeImage()

  const tableRef = ref()
  const checkedList = ref<(number | string)[]>([])
  const currentValue = ref<ExhibitionCommonWindowRegistrationPopupModel>()
  // const fileUrlPath = ref('')

  const displayExhibitionOption = exhibitionStatusOptions
  const applyChannelOptions = exhibitionPlatformOptions
  const exhibitionNatureOption = exhibitionNatureOptions
  const nonExhibitionPeriodOption = nonExhibitionPeriod
  const exhibitionExposureOption = exhibitionExposureOptions
  const exhibitionTotalPopupOptions = exhibitionTotalPopup

  const dateRangeStart: string = dayjs(new Date()).format(DEFAULT_DATE_FORMAT_DOT)

  const defaultValue: ExhibitionCommonWindowRegistrationPopupModel = {
    popupName: '',
    displayYn: YnOptions.Y,
    applyChannelType: ExhibitionApplicationChannelType.ALL,
    displayStartDate: '',
    displayStartTime: '',
    displayEndDate: '',
    displayEndTime: '',
    popupAttributeType: exhibitionNatureType.IMAGE,
    commonPopupCount: ExhibitionSelectOptionsType.ZERO,
    nonDisplayPeriodType: exhibitionNonDisplayPeriodType.DAY,
    popupFormType: exhibitionNatureType.ORDER,
    excludeCustomerCreateRequestList: [],
    popupDisplayCreateRequestList: []
  }

  const schema = object().shape(
    {
      popupName: string().required(),
      displayYn: string().required(),
      applyChannelType: string().required(),
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
      commonPopupCount: number().required(),
      nonDisplayPeriodType: string().required(),
      popupFormType: string().required(),
      excludeCustomerCreateRequestList: array().of(
        object().shape({
          customerKey: string().trim()
        })
      ),
      popupDisplayCreateRequestList: array().of(
        object().shape({
          popupDisplayOrder: string().required(),
          imagePathName: string().required(),
          imageName: string().required(),
          imageAltName: string().required(),
          linkType: string().trim().required(),
          linkUrl: string()
            .trim()
            .nullable()
            .when(['linkType'], {
              is: (linkType: string) => linkType === ExhibitionGnbLinkType.LINK_URL,
              then: (_schema) => _schema.required()
            }),
          linkExhibitionKey: string()
            .trim()
            .nullable()
            .when(['linkType'], {
              is: (linkType: string) => linkType === ExhibitionGnbLinkType.EXHIBITION,
              then: (_schema) => _schema.required()
            }),
          linkEventKey: string()
            .trim()
            .nullable()
            .when(['linkType'], {
              is: (linkType: string) => linkType === ExhibitionGnbLinkType.EVENT,
              then: (_schema) => _schema.required()
            }),
          linkProductKey: string()
            .trim()
            .nullable()
            .when(['linkType'], {
              is: (linkType: string) => linkType === ExhibitionGnbLinkType.PRODUCT,
              then: (_schema) => _schema.required()
            }),
          linkPromotionKey: string()
            .trim()
            .nullable()
            .when(['linkType'], {
              is: (linkType: string) => linkType === ExhibitionGnbLinkType.PROMOTION,
              then: (_schema) => _schema.required()
            })
        })
      )
    },
    [['displayStartDate', 'displayEndDate']]
  )

  const { values, setFieldValue, setValues, validate, handleReset } = useForm<ExhibitionCommonWindowRegistrationPopupModel>({
    initialValues: defaultValue,
    validationSchema: schema
  })

  const { validateTime } = useValidateTimeRange({ setFieldValue })

  const handleCommonPopup = (value: any) => {
    setFieldValue(
      'popupDisplayCreateRequestList',
      Array.from({ length: value ?? 0 }).map((item, index) => ({
        popupDisplayOrder: (index + 1).toString(),
        linkType: ExhibitionGnbLinkType.LINK_URL,
        linkUrl: '',
        linkExhibitionKey: '',
        linkEventKey: '',
        linkProductKey: ''
      }))
    )
    setFieldValue('commonPopupCount', value)
  }

  const getData = async () => {
    //call api get data
    if (props.data?.popupKey) {
      try {
        setLoading?.(true)
        const { data: detailData } = await exhibitionWindowRegistrationApi.getDetail(props.data?.popupKey)
        const { data: detailExcludeData } = await exhibitionWindowRegistrationApi.getDetailExcludeCustomer(props.data?.popupKey)
        const { data: detailDisplayPopupData } = await exhibitionWindowRegistrationApi.getDetailDisplayPopup(props.data?.popupKey)
        const resData: ExhibitionCommonWindowRegistrationPopupModel = {
          ...detailData,
          excludeCustomerCreateRequestList: detailExcludeData,
          popupDisplayCreateRequestList: detailDisplayPopupData
        }
        setValues(resData)
        currentValue.value = resData
      } catch (error) {
        /* empty */
      } finally {
        setLoading?.(false)
      }
    }
  }

  watch(
    [() => props.data, () => props.config],
    () => {
      if (props.config?.type === 'modify') {
        getData()
      }
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

  const onClickOpenModalNoticeComingSoon = () => {
    openComingSoonModal()
  }

  const isDisabledHexColor = computed(() => {
    return values.popupAttributeType !== exhibitionNatureType.IMAGE_TEXT
  })

  const onChangeImage = (
    index: number,
    pathKey: keyof ExhibitionCommonPopupDisplayCreateRequestModel,
    nameKey: keyof ExhibitionCommonPopupDisplayCreateRequestModel,
    altKey: keyof ExhibitionCommonPopupDisplayCreateRequestModel
  ) => {
    openSquareImageModal({
      name: (values.popupDisplayCreateRequestList?.[index]?.[nameKey] as string) ?? '',
      alt: (values.popupDisplayCreateRequestList?.[index]?.[altKey] as string) ?? '',
      type: ProductSelectDefinitionType.EXHIBITION_COMMON_POPUP_REGIS,
      events: {
        getFile: (data: any) => {
          const updatedList = [...(values.popupDisplayCreateRequestList || [])]
          const currentItem = { ...updatedList[index] }
          currentItem[pathKey] = data?.newData?.filePathName
          currentItem[nameKey] = data?.newData?.fileName
          currentItem[altKey] = data?.alt
          updatedList[index] = currentItem
          setFieldValue('popupDisplayCreateRequestList', updatedList)
        }
      }
    })
  }

  const onDeleteImage = (index: number) => {
    const currentList = values.popupDisplayCreateRequestList || []
    const updatedList = [...currentList]
    const item = updatedList.map((item, id) => {
      if (id === index) {
        return { ...item, imagePathName: '', imageName: '', imageAltName: '' }
      }
      return item
    })
    setFieldValue('popupDisplayCreateRequestList', item)
  }

  const isDisabledDeleteImgBtn = (
    index: number,
    pathKey: keyof ExhibitionCommonPopupDisplayCreateRequestModel,
    nameKey: keyof ExhibitionCommonPopupDisplayCreateRequestModel
  ) => {
    const item = values.popupDisplayCreateRequestList?.[index]
    return !(item && item[pathKey]) && !(item && item[nameKey])
  }

  const onCancel = () => {
    openConfirm({
      content: '입력 내용이 있습니다. 창을 닫으시겠습니까?',
      onConfirm: () => {
        closeAllModal?.()
      }
    })
  }

  const onSubmit = async () => {
    const { valid } = await validate()
    if (valid) {
      openConfirm({
        content: '저장하시겠습니까?',
        onConfirm: () => {
          closeModalByPop?.()
          handleConfirm()
        }
      })
    } else {
      openNotification({
        content: '<p><span class="wf_text-sub-01">( * )</span> 필수입력 값을 입력하세요.</p>'
      })
    }
  }

  const handleConfirm = async () => {
    const reqData: ExhibitionCommonWindowRegistrationPopupModel = {
      ...values,
      displayStartDate: formatDate(values.displayStartDate ?? '', DEFAULT_DATE_FORMAT_DOT, FORMAT_DATE_YYYYMMDD),
      displayStartTime: values.displayStartTime?.split(':').join(''),
      displayEndDate: formatDate(values.displayEndDate ?? '', DEFAULT_DATE_FORMAT_DOT, FORMAT_DATE_YYYYMMDD),
      displayEndTime: values.displayEndTime?.split(':').join(''),
      pcPopupCount: values.pcPopupCount ?? 0,
      mobilePopupCount: values.mobilePopupCount ?? 0,
      excludeCustomerCreateRequestList: values.excludeCustomerCreateRequestList?.map((item) => ({
        customerKey: item.customerKey
      })),
      popupDisplayCreateRequestList: values.popupDisplayCreateRequestList?.map((item) => ({
        ...item,
        imageDeleteYn: item.imageDeleteYn ?? YnOptions.N,
        colorHexaUseYn: item.colorHexaUseYn ?? YnOptions.N,
        applyChannelType: item.applyChannelType ?? ExhibitionApplicationChannelType.ALL
      }))
    }
    if (props.config?.type === 'register') {
      setLoading?.(true)
      exhibitionWindowRegistrationApi
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
        .catch(() => {})
        .finally(() => {
          setLoading?.(false)
        })
    } else {
      setLoading?.(true)
      exhibitionWindowRegistrationApi
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
        .catch(() => {})
        .finally(() => {
          setLoading?.(false)
        })
    }
  }

  return {
    displayExhibitionOption,
    applyChannelOptions,
    exhibitionNatureOption,
    nonExhibitionPeriodOption,
    exhibitionExposureOption,
    exhibitionTotalPopupOptions,
    tableRef,
    values,
    setFieldValue,
    setValues,
    validate,
    handleReset,
    onClickOpenModalNoticeComingSoon,
    isDisabledHexColor,
    getCustomerData,
    tableComputed,
    onCheckAllChange,
    onCheckRowChange,
    onDeleteSelected,
    onDeleteRow,
    dateRangeStart,
    onCancel,
    onSubmit,
    onChangeImage,
    onDeleteImage,
    isDisabledDeleteImgBtn,
    validateTime,
    handleCommonPopup
  }
}
