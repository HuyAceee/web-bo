import {
  exhibitionCornerConnectionModalModelConfig,
  ExhibitionCornerConnectionModalValueModel
} from '@/models/views/exhibition/modal/ExhibitionCornerConnectionModalModel'
import { object, string } from 'yup'
import { useForm } from 'vee-validate'
import { ref } from 'vue'

export const useExhibitionCornerConnectionActionModal = () => {
  const initialData: ExhibitionCornerConnectionModalValueModel = {
    cornerNumber: '0000',
    cornerName: '메인 띠 배너',
    exhibitionHallCategoryCode: '1111',
    exhibitionHallCategoryName: '메인',
    cornerNameInput: '123',
    exhibitionStatus: exhibitionCornerConnectionModalModelConfig.displayCornerBasicInfo.row3?.[1].options?.[0].value,
    displayOrder: '321',
    ApplicableChannel: exhibitionCornerConnectionModalModelConfig.displayCornerBasicInfo.row4?.[1].options?.[0].value,
    fromDate: '',
    toDate: '',
    mainTitlePc: '',
    subTitlePc: '',
    imageTextPc: '',
    imagePc: '',
    imageAltPc: '',
    typeLinkPc: exhibitionCornerConnectionModalModelConfig.cornerExhibitionPcInformation.row6?.[0].options?.[0].value,
    promoCodePc: '',
    promotionNamePc: '',
    mainTitleMobile: '',
    subTitleMobile: '',
    imageTextMobile: '',
    imageMobile: '',
    imageAltMobile: '',
    typeLinkMobile: exhibitionCornerConnectionModalModelConfig.cornerExhibitionMobileInformation.row6?.[0].options?.[0].value,
    promoCodeMobile: '',
    promotionNameMobile: ''
  }

  const commonOption = ref<boolean>(false)

  const validSchema = {
    cornerNumber: string(),
    cornerName: string(),
    exhibitionHallCategoryCode: string(),
    exhibitionHallCategoryName: string(),
    cornerNameInput: string().required(),
    exhibitionStatus: object({
      label: string(),
      value: string()
    }),
    displayOrder: string(),
    ApplicableChannel: object({
      label: string(),
      value: string()
    }),
    fromDate: string(),
    toDate: string()
  }

  const { values, setFieldValue, resetForm } = useForm<ExhibitionCornerConnectionModalValueModel>({
    initialValues: initialData,
    validationSchema: validSchema
  })

  const setCommonOption = (value: boolean) => {
    commonOption.value = value
    if (value) {
      setFieldValue('mainTitleMobile', values.mainTitlePc)
      setFieldValue('subTitleMobile', values.subTitlePc)
      setFieldValue('imageTextMobile', values.imageTextPc)
      setFieldValue('imageMobile', values.imagePc)
      setFieldValue('imageAltMobile', values.imageAltPc)
      setFieldValue('typeLinkMobile', values.typeLinkPc)
    }
  }

  return {
    values,
    setFieldValue,
    resetForm,
    commonOption,
    setCommonOption
  }
}
