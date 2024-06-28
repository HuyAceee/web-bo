import { ref, watch } from 'vue'
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
import {
  ExhibitionCommonBannerDisplayCreateRequestModel,
  ExhibitionApplicationChannelType,
  ExhibitionCommonBannerRegisPopupConfig,
  ExhibitionCommonBannerRegisPopupEmits,
  ExhibitionCommonBannerRegisPopupModel,
  ExhibitionCommonBannerRegisPopupProps,
  ExhibitionSelectOptionsType,
  exhibitionBannerOrderOptions,
  exhibitionBannerOrderType,
  exhibitionPlatformOptions,
  exhibitionStatusOptions,
  exhibitionTotalPopup
} from '@/models/views/exhibition/exhibitionCommon/ExhibitionCommonBannerRegisModel'
import dayjs from 'dayjs'
import { useForm } from 'vee-validate'
import { ProductSelectDefinitionType, YnOptions } from '@/models'
import { exhibitionCommonBannerRegisApi } from '@/services/api/exhibition/ExhibitionBannerRegistrationApi'
import { useModalConfirm, useModalNotification } from '@/composables/widgets'
import ExhibitionCommonBannerRegisPopup from '@/views/exhibition/exhibitionCommon/ExhibitionCommonBannerRegistrationPopup.vue'
import { useProductModalChangeImage } from '@/composables/products/ticketProduct/baseInfo/useProductModalChangeImage'
import { useValidateTimeRange } from '@/composables/widgets/dateTimePicker/useValidateTimeRange'
import { ExhibitionGnbLinkType } from '@/models/views/exhibition/modal/ExhibitionCornerConnectionModalModel'

export const useExhibitionCommonOpenBannerRegisPopup = () => {
  const { showModal } = useModal()
  const openModal = (refreshCallback?: () => void, data?: ExhibitionCommonBannerRegisPopupModel, config?: ExhibitionCommonBannerRegisPopupConfig) => {
    showModal?.({
      component: ExhibitionCommonBannerRegisPopup,
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

export const useExhibitionBannerRegisPopup = (props: ExhibitionCommonBannerRegisPopupProps, emit: ExhibitionCommonBannerRegisPopupEmits) => {
  const { setLoading } = useLoading()
  const { openModal: openConfirm, closeModalByPop, closeAllModal } = useModalConfirm()
  const { openModal: openNotification } = useModalNotification()
  const { onShowModal: openSquareImageModal } = useProductModalChangeImage()

  const exhibitionBannerOrderOption = exhibitionBannerOrderOptions
  const exhibitionBannerStatusOption = exhibitionStatusOptions
  const exhibitionApplyChannelOptions = exhibitionPlatformOptions
  const exhibitionTotalPopupOptions = exhibitionTotalPopup

  const currentValue = ref<ExhibitionCommonBannerRegisPopupModel>()

  const dateRangeStart: string = dayjs(new Date()).format(DEFAULT_DATE_FORMAT_DOT)

  const defaultValue: ExhibitionCommonBannerRegisPopupModel = {
    bannerName: '',
    bannerGroupKey: '',
    bannerOrderType: exhibitionBannerOrderType.ORDER,
    displayYn: YnOptions.Y,
    displayStartDate: '',
    displayStartTime: '',
    displayEndDate: '',
    displayEndTime: '',
    applyChannelType: ExhibitionApplicationChannelType.ALL,
    commonBannerCount: ExhibitionSelectOptionsType.ZERO,
    pcBannerCount: ExhibitionSelectOptionsType.ZERO,
    mobileBannerCount: ExhibitionSelectOptionsType.ZERO,
    bannerDisplayCreateRequestList: []
  }

  const schema = object().shape(
    {
      bannerName: string().required(),
      bannerGroupKey: string().required(),
      bannerOrderType: string().required(),
      displayYn: string().required(),
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
      applyChannelType: string().required(),
      commonBannerCount: number().required(),
      bannerDisplayCreateRequestList: array().of(
        object().shape({
          bannerDisplayOrder: string().required(),
          imageName: string().required(),
          imageAltName: string().required(),
          imageTextName: string().required(),
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

  const { values, setFieldValue, setValues, validate } = useForm<ExhibitionCommonBannerRegisPopupModel>({
    initialValues: defaultValue,
    validationSchema: schema
  })

  const { validateTime } = useValidateTimeRange({ setFieldValue })

  const handleCommonPopup = (value: any) => {
    setFieldValue(
      'bannerDisplayCreateRequestList',
      Array.from({ length: value ?? 0 }).map((item, index) => ({
        bannerDisplayOrder: (index + 1).toString(),
        linkType: ExhibitionGnbLinkType.LINK_URL,
        linkUrl: '',
        linkExhibitionKey: '',
        linkEventKey: '',
        linkProductKey: ''
      }))
    )
    setFieldValue('commonBannerCount', value)
  }

  const getData = async () => {
    //call api get
    if (props.data?.bannerKey) {
      try {
        setLoading?.(true)
        const { data: detailData } = await exhibitionCommonBannerRegisApi.getDetail(props.data?.bannerKey)
        const { data: detailDisplayBannerData } = await exhibitionCommonBannerRegisApi.getDetailDisplayBanner(props.data?.bannerKey)
        const resData: ExhibitionCommonBannerRegisPopupModel = {
          ...detailData,
          bannerDisplayCreateRequestList: detailDisplayBannerData
        }
        setValues(resData)
        currentValue.value = resData
      } catch (err) {
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
      } else {
        setValues({ ...values, bannerGroupKey: String(props.data?.bannerGroupKey) })
      }
    },
    { immediate: true }
  )

  const onChangeImage = (
    index: number,
    pathKey: keyof ExhibitionCommonBannerDisplayCreateRequestModel,
    nameKey: keyof ExhibitionCommonBannerDisplayCreateRequestModel,
    altKey: keyof ExhibitionCommonBannerDisplayCreateRequestModel
  ) => {
    openSquareImageModal({
      name: (values.bannerDisplayCreateRequestList?.[index]?.[nameKey] as string) ?? '',
      alt: (values.bannerDisplayCreateRequestList?.[index]?.[altKey] as string) ?? '',
      type: ProductSelectDefinitionType.EXHIBITION_COMMON_BANNER,
      events: {
        getFile: (data: any) => {
          const updatedList = [...(values.bannerDisplayCreateRequestList || [])]
          const currentItem = { ...updatedList[index] }
          currentItem[pathKey] = data?.newData?.filePathName
          currentItem[nameKey] = data?.newData?.fileName
          currentItem[altKey] = data?.alt
          updatedList[index] = currentItem
          setFieldValue('bannerDisplayCreateRequestList', updatedList)
        }
      }
    })
  }

  const onDeleteImage = (index: number) => {
    const currentList = values.bannerDisplayCreateRequestList || []
    const updatedList = [...currentList]
    const item = updatedList.map((item, id) => {
      if (id === index) {
        return { ...item, imagePathName: '', imageName: '', imageAltName: '' }
      }
      return item
    })
    setFieldValue('bannerDisplayCreateRequestList', item)
  }

  const isDisabledDeleteImgBtn = (
    index: number,
    pathKey: keyof ExhibitionCommonBannerDisplayCreateRequestModel,
    nameKey: keyof ExhibitionCommonBannerDisplayCreateRequestModel
  ) => {
    const item = values.bannerDisplayCreateRequestList?.[index]
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
    const reqData: ExhibitionCommonBannerRegisPopupModel = {
      ...values,
      bannerGroupKey: values.bannerGroupKey,
      displayStartDate: formatDate(values.displayStartDate ?? '', DEFAULT_DATE_FORMAT_DOT, FORMAT_DATE_YYYYMMDD),
      displayStartTime: values.displayStartTime?.split(':').join(''),
      displayEndDate: formatDate(values.displayEndDate ?? '', DEFAULT_DATE_FORMAT_DOT, FORMAT_DATE_YYYYMMDD),
      displayEndTime: values.displayEndTime?.split(':').join(''),
      bannerDisplayCreateRequestList: values.bannerDisplayCreateRequestList?.map((item) => ({
        ...item
      }))
    }
    if (props.config?.type === 'register') {
      setLoading?.(true)
      exhibitionCommonBannerRegisApi
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
      exhibitionCommonBannerRegisApi
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
    exhibitionBannerOrderOption,
    exhibitionBannerStatusOption,
    exhibitionApplyChannelOptions,
    exhibitionTotalPopupOptions,
    values,
    setFieldValue,
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
