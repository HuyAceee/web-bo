import { useModalNotification } from '@/composables'
import { useProductModalChangeImage } from '@/composables/products/ticketProduct/baseInfo/useProductModalChangeImage'
import { useProductModalChangeVideo } from '@/composables/products/ticketProduct/baseInfo/useProductModalChangeVideo'
import { GenericOptionType, ProductSelectDefinitionType, YnOptions } from '@/models'
import {
  ExhibitionConnectionFormRepresentativeImgModel,
  ExhibitionConnectionFormRepresentativeImgProps,
  ExhibitionConnectionSpecialModalType,
  ExhibitionRepresentativeType,
  ExhibitionRepresentativeVideoType
} from '@/models/views/exhibition/exhibitionContent/ExhibitionConnectionMngtModel'
import { useForm } from 'vee-validate'
import { watch } from 'vue'
import { object, string } from 'yup'

export const useExhibitionConnectionFormRepresentativeImg = (
  props: ExhibitionConnectionFormRepresentativeImgProps<ExhibitionConnectionFormRepresentativeImgModel>
) => {
  const representativeTypeOptions: GenericOptionType<string>[] = [
    { label: '이미지', value: ExhibitionRepresentativeType.IMAGE },
    { label: '이미지 + 텍스트', value: ExhibitionRepresentativeType.IMAGE_TEXT },
    { label: 'VOD  동영상', value: ExhibitionRepresentativeType.VOD },
    { label: 'HTML', value: ExhibitionRepresentativeType.HTML }
  ]

  const videoTypeOptions: GenericOptionType<string>[] = [
    { label: '동영상', value: ExhibitionRepresentativeVideoType.VOD },
    { label: '유튜브', value: ExhibitionRepresentativeVideoType.YOUTUBE }
  ]

  const noticeOptions: GenericOptionType<YnOptions>[] = [
    { label: '전시', value: YnOptions.Y },
    { label: '비전시', value: YnOptions.N }
  ]

  const noticeDisplayOptions: GenericOptionType<YnOptions>[] = [
    { label: '펼침', value: YnOptions.Y },
    { label: '접힘', value: YnOptions.N }
  ]

  const defaultValue: ExhibitionConnectionFormRepresentativeImgModel = {
    exhibitionRepresentativeType: ExhibitionRepresentativeType.IMAGE,
    imagePathName: '',
    imageName: '',
    imageAltName: '',
    mainTitleName1: '',
    mainTitleName2: '',
    subTitleName: '',
    colorHexaUseYn: YnOptions.N,
    colorHexaValue: '',
    exhibitionVideoType: videoTypeOptions[0].value,
    videoPathName: '',
    videoName: '',
    videoAltName: '',
    videoThumbnailPathName: '',
    videoThumbnailName: '',
    videoThumbnailAltName: '',
    youtubeUrl: '',
    youtubeAltName: '',
    htmlContents: '',
    noticeUseYn: YnOptions.Y,
    noticeDisplayYn: YnOptions.Y,
    noticeContents: ''
  }

  const schema = object().shape({
    exhibitionRepresentativeType: string().required(),
    imageAltName: string()
      .trim()
      .nullable()
      .when(['exhibitionRepresentativeType'], {
        is: (value: any) => value === ExhibitionRepresentativeType.IMAGE || value === ExhibitionRepresentativeType.IMAGE_TEXT,
        then: (_schema) => _schema.required()
      }),
    subTitleName: string()
      .trim()
      .nullable()
      .when(['exhibitionRepresentativeType'], {
        is: (value: any) => value === ExhibitionRepresentativeType.IMAGE_TEXT,
        then: (_schema) => _schema.required()
      }),
    videoAltName: string()
      .trim()
      .nullable()
      .when(['exhibitionRepresentativeType'], {
        is: (value: any) => value === ExhibitionRepresentativeType.VOD,
        then: (_schema) => _schema.required()
      }),
    videoThumbnailAltName: string()
      .trim()
      .nullable()
      .when(['exhibitionRepresentativeType'], {
        is: (value: any) => value === ExhibitionRepresentativeType.VOD,
        then: (_schema) => _schema.required()
      })
  })

  const { openModal: openNotification } = useModalNotification()
  const { onShowModalVideo: openVideoModal } = useProductModalChangeVideo()
  const { onShowModal: openSquareImageModal } = useProductModalChangeImage()

  const { values, setFieldValue, setValues, validate, handleReset } = useForm<ExhibitionConnectionFormRepresentativeImgModel>({
    initialValues: defaultValue,
    validationSchema: schema
  })

  watch(
    () => props.data,
    (data) => {
      if (data) {
        const newData: any = {}
        const keys = Object.keys(defaultValue)
        keys.forEach((key) => {
          newData[key] = data[key as keyof ExhibitionConnectionFormRepresentativeImgModel]
        })
        setValues(newData)
      }
    }
  )

  const onChangeImage = (
    pathKey: keyof ExhibitionConnectionFormRepresentativeImgModel,
    nameKey: keyof ExhibitionConnectionFormRepresentativeImgModel,
    altKey: keyof ExhibitionConnectionFormRepresentativeImgModel
  ) => {
    openSquareImageModal({
      name: values[nameKey] ?? '',
      alt: values[altKey] ?? '',
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

  const onChangeVideo = (
    pathKey: keyof ExhibitionConnectionFormRepresentativeImgModel,
    nameKey: keyof ExhibitionConnectionFormRepresentativeImgModel,
    altKey: keyof ExhibitionConnectionFormRepresentativeImgModel
  ) => {
    openVideoModal({
      name: values[nameKey] ?? '',
      alt: values[altKey] ?? '',
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

  const onSubmit = async () => {
    const { errors, valid } = await validate()
    console.log('errors', errors)

    if (valid) {
      return { data: { ...values }, isValid: valid }
    } else {
      openNotification({
        content: '<p><span class="wf_text-sub-01">( * )</span> 필수입력 값을 입력하세요.</p>'
      })
      return { data: {}, isValid: valid }
    }
  }

  return {
    representativeTypeOptions,
    videoTypeOptions,
    noticeOptions,
    noticeDisplayOptions,
    values,
    setFieldValue,
    onSubmit,
    handleReset,
    onChangeImage,
    onChangeVideo
  }
}
