import { useForm } from 'vee-validate'
import { object, string, array } from 'yup'
import { GenericOptionType, ProductSelectDefinitionType, YnOptions } from '@/models'
import {
  ExhibitionConnectionFormMarketingAreaModel,
  ExhibitionConnectionFormMarketingAreaProps
} from '@/models/views/exhibition/exhibitionContent/ExhibitionConnectionFormMarketingAreaModel'
import { watch } from 'vue'
import { useProductModalChangeImage } from '@/composables/products/ticketProduct/baseInfo/useProductModalChangeImage'
import { useModalConfirm, useModalNotification } from '@/composables/widgets'
import { useExhibitionCouponPromotionInquiryModal } from '@/composables/exhibition/modal/useExhibitionCouponPromotionInquiryModal'
import { ExhibitionConnectionSpecialModalType } from '@/models/views/exhibition/exhibitionContent/ExhibitionConnectionMngtModel'
import { ExhibitionGnbLinkType } from '@/models/views/exhibition/modal/ExhibitionCornerConnectionModalModel'

export const useExhibitionConnectionFormMarketingArea = (props: ExhibitionConnectionFormMarketingAreaProps) => {
  const exhibitionStatusOptions: GenericOptionType<string>[] = [
    { label: '전시', value: YnOptions.Y },
    { label: '비전시', value: YnOptions.N }
  ]

  const exhibitionTypeOptions: GenericOptionType<'marketingBannerYn' | 'marketingCouponYn'>[] = [
    { label: '이미지(배너형)', value: 'marketingBannerYn' },
    { label: '쿠폰 다운로드', value: 'marketingCouponYn' }
  ]

  const { openModal: openNotification, closeModalByPop } = useModalNotification()
  const { openModal: openConfirm } = useModalConfirm()
  const { onShowModal: openSquareImageModal } = useProductModalChangeImage()
  const { onShowModal: showModalCouponPromotionInquiry } = useExhibitionCouponPromotionInquiryModal()

  const emptyValue: ExhibitionConnectionFormMarketingAreaModel = {
    marketingDisplayYn: YnOptions.N,
    marketingBannerYn: YnOptions.Y,
    marketingCouponYn: YnOptions.Y,
    marketingImageCommonYn: YnOptions.Y,
    pcMarketingImagePathName: '',
    pcMarketingImageName: '',
    pcMarketingImageAltName: '',
    pcLinkType: ExhibitionGnbLinkType.LINK_URL,
    pcLinkUrl: '',
    pcLinkExhibitionKey: '',
    pcLinkEventKey: '',
    pcLinkProductKey: '',
    mobileMarketingImagePathName: '',
    mobileMarketingImageName: '',
    mobileMarketingImageAltName: '',
    mobileLinkType: ExhibitionGnbLinkType.LINK_URL,
    mobileLinkUrl: '',
    mobileLinkExhibitionKey: '',
    mobileLinkEventKey: '',
    mobileLinkProductKey: '',
    couponCreateRequestList: [],
    marketingCouponImagePathName: '',
    marketingCouponImageName: '',
    marketingCouponImageAltName: '',
    marketingCouponImageLinkUrl: '',
    marketingCouponMainTitleName: '',
    marketingCouponSubTitleName: ''
  }

  const schema = object().shape({
    marketingBannerYn: string(),
    marketingCouponYn: string(),
    marketingImageCommonYn: string(),
    pcMarketingImageName: string(),
    pcMarketingImageAltName: string().required(),
    mobileMarketingImageName: string(),
    mobileMarketingImageAltName: string().required(),
    marketingCouponImageName: string(),
    marketingCouponImageAltName: string().required(),
    marketingCouponImageLinkUrl: string(),
    marketingCouponMainTitleName: string(),
    marketingCouponSubTitleName: string(),
    pcLinkType: string().trim().required(),
    pcLinkUrl: string()
      .trim()
      .nullable()
      .when(['linkType'], {
        is: (linkType: string) => linkType === ExhibitionGnbLinkType.LINK_URL,
        then: (_schema) => _schema.required()
      }),
    pcLinkExhibitionKey: string()
      .trim()
      .nullable()
      .when(['linkType'], {
        is: (linkType: string) => linkType === ExhibitionGnbLinkType.EXHIBITION,
        then: (_schema) => _schema.required()
      }),
    pcLinkEventKey: string()
      .trim()
      .nullable()
      .when(['linkType'], {
        is: (linkType: string) => linkType === ExhibitionGnbLinkType.EVENT,
        then: (_schema) => _schema.required()
      }),
    pcLinkProductKey: string()
      .trim()
      .nullable()
      .when(['linkType'], {
        is: (linkType: string) => linkType === ExhibitionGnbLinkType.PRODUCT,
        then: (_schema) => _schema.required()
      }),
    pcLinkPromotionKey: string()
      .trim()
      .nullable()
      .when(['linkType'], {
        is: (linkType: string) => linkType === ExhibitionGnbLinkType.PROMOTION,
        then: (_schema) => _schema.required()
      }),
    mobileLinkType: string().trim().required(),
    mobileLinkUrl: string()
      .trim()
      .nullable()
      .when(['linkType'], {
        is: (linkType: string) => linkType === ExhibitionGnbLinkType.LINK_URL,
        then: (_schema) => _schema.required()
      }),
    mobileLinkExhibitionKey: string()
      .trim()
      .nullable()
      .when(['linkType'], {
        is: (linkType: string) => linkType === ExhibitionGnbLinkType.EXHIBITION,
        then: (_schema) => _schema.required()
      }),
    mobileLinkEventKey: string()
      .trim()
      .nullable()
      .when(['linkType'], {
        is: (linkType: string) => linkType === ExhibitionGnbLinkType.EVENT,
        then: (_schema) => _schema.required()
      }),
    mobileLinkProductKey: string()
      .trim()
      .nullable()
      .when(['linkType'], {
        is: (linkType: string) => linkType === ExhibitionGnbLinkType.PRODUCT,
        then: (_schema) => _schema.required()
      }),
    mobileLinkPromotionKey: string()
      .trim()
      .nullable()
      .when(['linkType'], {
        is: (linkType: string) => linkType === ExhibitionGnbLinkType.PROMOTION,
        then: (_schema) => _schema.required()
      }),
    couponCreateRequestList: array().of(
      object().shape({
        couponKey: string().trim()
      })
    )
  })

  const { values, setFieldValue, setValues, validate } = useForm<ExhibitionConnectionFormMarketingAreaModel>({
    initialValues: emptyValue,
    validationSchema: schema
  })

  watch(
    () => props.data,
    (data) => {
      if (data) {
        const newData: any = {}
        const keys = Object.keys(emptyValue)
        keys.forEach((key) => {
          newData[key] = data[key as keyof ExhibitionConnectionFormMarketingAreaModel]
        })
        setValues(newData)
      }
    }
  )

  const openModalCouponPromotionInquiry = () => {
    showModalCouponPromotionInquiry?.((dataCouponPromotionInquiry: any) => {
      const couponData = dataCouponPromotionInquiry.map((item: any) => ({
        couponKey: item.couponKey,
        couponName: item.couponName
      }))

      const updatedList = [
        ...(values.couponCreateRequestList ?? []),
        ...couponData.map(({ couponKey, couponName }: any) => ({
          couponKey,
          couponName
        }))
      ]
      setFieldValue('couponCreateRequestList', updatedList)
    })
  }

  const onDeleteCouponKey = (index: number) => {
    setFieldValue(
      'couponCreateRequestList',
      [...(values.couponCreateRequestList ?? [])].filter((_, i) => i !== index)
    )
  }

  const onDeleteAllCouponKey = () => {
    openConfirm({
      content: '쿠폰을 일괄 삭제하겠습니까?',
      onConfirm: () => {
        setFieldValue('couponCreateRequestList', [])
        closeModalByPop?.()
      }
    })
  }

  const onChangeImage = (
    pathKey: keyof ExhibitionConnectionFormMarketingAreaModel,
    nameKey: keyof ExhibitionConnectionFormMarketingAreaModel,
    altKey: keyof ExhibitionConnectionFormMarketingAreaModel
  ) => {
    openSquareImageModal({
      name: (values[nameKey] as string) ?? '',
      alt: (values[altKey] as string) ?? '',
      type:
        props.config === ExhibitionConnectionSpecialModalType.special
          ? ProductSelectDefinitionType.EXHIBITION_SPECIAL
          : ProductSelectDefinitionType.EXHIBITION_SELLER,
      events: {
        getFile: (data: any) => {
          setFieldValue(pathKey, data?.newData?.filePathName)
          setFieldValue(nameKey, data?.newData?.fileName)
          setFieldValue(altKey, data?.alt)
        }
      }
    })
  }

  const isDisabledDeleteImgBtn = (
    pathKey: keyof ExhibitionConnectionFormMarketingAreaModel,
    nameKey: keyof ExhibitionConnectionFormMarketingAreaModel
  ) => {
    return !values[pathKey] && !values[nameKey]
  }

  const onDeleteImage = (
    pathKey: keyof ExhibitionConnectionFormMarketingAreaModel,
    nameKey: keyof ExhibitionConnectionFormMarketingAreaModel,
    altKey: keyof ExhibitionConnectionFormMarketingAreaModel
  ) => {
    setFieldValue(pathKey, '')
    setFieldValue(nameKey, '')
    setFieldValue(altKey, '')
  }

  const onSubmit = async () => {
    const { errors, valid } = await validate()
    if (valid) {
      return { data: { ...values }, isValid: valid }
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
  return {
    exhibitionStatusOptions,
    exhibitionTypeOptions,
    values,
    setFieldValue,
    onSubmit,
    onDeleteCouponKey,
    onDeleteAllCouponKey,
    openModalCouponPromotionInquiry,
    isDisabledDeleteImgBtn,
    onChangeImage,
    onDeleteImage
  }
}
