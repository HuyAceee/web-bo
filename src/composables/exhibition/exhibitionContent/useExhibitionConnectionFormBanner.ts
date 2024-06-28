import { object, string } from 'yup'
import {
  ExhibitionConnectionFormBannerModel,
  ExhibitionConnectionFormBannerProps
} from '@/models/views/exhibition/exhibitionContent/ExhibitionConnectionFormBannerModel'
import { YnOptions } from '@/models/common'
import { useForm } from 'vee-validate'
import { watch } from 'vue'
import { useModalNotification } from '@/composables/widgets'
import { useProductModalChangeImage } from '@/composables/products/ticketProduct/baseInfo/useProductModalChangeImage'
import { ProductSelectDefinitionType } from '@/models'
import { ExhibitionConnectionSpecialModalType } from '@/models/views/exhibition/exhibitionContent/ExhibitionConnectionMngtModel'

export const useExhibitionConnectionFormBanner = (props: ExhibitionConnectionFormBannerProps) => {
  const { openModal: openNotification } = useModalNotification()
  const { onShowModal: openSquareImageModal } = useProductModalChangeImage()

  const defaultValue: ExhibitionConnectionFormBannerModel = {
    bannerImageUseYn: YnOptions.Y,
    bannerImagePathName: '',
    bannerImageName: '',
    bannerImageDeleteYn: YnOptions.Y,
    bannerImageAltName: '',
    mclassDisplayCategoryId: ''
  }

  const schema = object().shape({
    bannerImageUseYn: string(),
    bannerImagePathName: string()
      .trim()
      .nullable()
      .when(['bannerImageUseYn'], {
        is: (bannerImageUseYn: string) => Boolean(bannerImageUseYn === YnOptions.N),
        then: (_schema) => _schema.required()
      }),
    bannerImageName: string()
      .trim()
      .nullable()
      .when(['bannerImageUseYn'], {
        is: (bannerImageUseYn: string) => Boolean(bannerImageUseYn === YnOptions.N),
        then: (_schema) => _schema.required()
      }),
    bannerImageAltName: string()
      .trim()
      .nullable()
      .when(['bannerImageUseYn'], {
        is: (bannerImageUseYn: string) => Boolean(bannerImageUseYn === YnOptions.N),
        then: (_schema) => _schema.required()
      }),
    mclassDisplayCategoryId: string()
      .trim()
      .nullable()
      .when(['bannerImageUseYn'], {
        is: (bannerImageUseYn: string) => Boolean(bannerImageUseYn === YnOptions.N),
        then: (_schema) => _schema.required()
      })
  })

  const { values, setFieldValue, setValues, validate } = useForm<ExhibitionConnectionFormBannerModel>({
    initialValues: defaultValue,
    validationSchema: schema
  })

  watch(
    () => props.data,
    (data) => {
      if (data) {
        if (data) {
          const newData: any = {}
          const keys = Object.keys(defaultValue)
          keys.forEach((key) => {
            newData[key] = data[key as keyof ExhibitionConnectionFormBannerModel]
          })
          setValues(newData)
        }
      }
    },
    { immediate: true }
  )

  const onChangeImage = (
    pathKey: keyof ExhibitionConnectionFormBannerModel,
    nameKey: keyof ExhibitionConnectionFormBannerModel,
    altKey: keyof ExhibitionConnectionFormBannerModel
  ) => {
    openSquareImageModal({
      name: (values[nameKey] as string) ?? '',
      alt: (values[altKey] as string) ?? '',
      type:
        props.config === ExhibitionConnectionSpecialModalType.seller
          ? ProductSelectDefinitionType.EXHIBITION_SELLER
          : ProductSelectDefinitionType.EXHIBITION_SPECIAL,
      events: {
        getFile: (data: any) => {
          setFieldValue(pathKey, data?.newData?.filePathName)
          setFieldValue(nameKey, data?.newData?.fileName)
          setFieldValue(altKey, data?.alt)
        }
      }
    })
  }

  const onDeleteImage = (
    pathKey: keyof ExhibitionConnectionFormBannerModel,
    nameKey: keyof ExhibitionConnectionFormBannerModel,
    altKey: keyof ExhibitionConnectionFormBannerModel
  ) => {
    setFieldValue(pathKey, '')
    setFieldValue(nameKey, '')
    setFieldValue(altKey, '')
  }

  const isDisabledDeleteImgBtn = (pathKey: keyof ExhibitionConnectionFormBannerModel, nameKey: keyof ExhibitionConnectionFormBannerModel) => {
    return !values[pathKey] && !values[nameKey]
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
    values,
    setFieldValue,
    onSubmit,
    onChangeImage,
    onDeleteImage,
    isDisabledDeleteImgBtn
  }
}
