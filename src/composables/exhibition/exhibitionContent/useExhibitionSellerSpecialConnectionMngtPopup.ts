import { exhibitionSellerSpecialConnectionMngtPopupApi } from '@/services/api/exhibition/ExhibitionSellerSpecialConnectionMngtPopupApi'
import { onMounted, ref } from 'vue'
import {
  ExhibitionConnectionFormBasicInfoModel,
  ExhibitionCornerTableModel,
  ExhibitionSellerSpecialConnectionMngtAllFormPopupModel,
  ExhibitionSellerSpecialConnectionMngtPopupModel,
  ExhibitionSellerSpecialConnectionMngtPopupProps
} from '@/models/views/exhibition/exhibitionContent/ExhibitionConnectionMngtModel'
import { WelfareSelectOptionType } from '@/models'
import { productCategoryApi } from '@/services/api/products/category/ProductCategoryApi'
import { useLoading, useModalConfirm, useModalNotification } from '@/composables'
import { ExhibitionConnectionFormMarketingAreaModel } from '@/models/views/exhibition/exhibitionContent/ExhibitionConnectionFormMarketingAreaModel'

interface ExhibitionFormSubmit<T> {
  submit: () => Promise<{
    data: T
    isValid: boolean
  }>
  reset: () => void
}

export const useExhibitionSellerSpecialConnectionMngtPopup = (props: ExhibitionSellerSpecialConnectionMngtPopupProps, closeModal: () => void) => {
  const exhibitionBasicInformation = ref<ExhibitionSellerSpecialConnectionMngtAllFormPopupModel>()
  const exhibitionContentDepthOption = ref<WelfareSelectOptionType[]>([])
  const { openModal: openModalConfirm } = useModalConfirm()
  const { openModal } = useModalNotification()
  const { setLoading } = useLoading()

  const formBasicRef = ref<ExhibitionFormSubmit<ExhibitionConnectionFormBasicInfoModel>>()
  const formRepresentativeImgRef = ref<ExhibitionFormSubmit<ExhibitionSellerSpecialConnectionMngtPopupModel>>()
  const formMarketingAreaRef = ref<ExhibitionFormSubmit<ExhibitionConnectionFormMarketingAreaModel>>()
  // const formBannerRef = ref<ExhibitionFormSubmit<ExhibitionConnectionFormBannerModel>>()
  const formCategoryRef = ref<ExhibitionFormSubmit<ExhibitionCornerTableModel>>()

  const getDepth2nd = async () => {
    try {
      const { data } = await productCategoryApi.getDisplayCategoryList()
      const dataDepth = (data as any).filter((item: any) => item.displayCategoryDepth === 2)
      dataDepth.sort((a: any, b: any) => a.displayCategoryName.localeCompare(b.displayCategoryName))
      const options: WelfareSelectOptionType[] = dataDepth.map((item: any) => ({
        label: item.displayCategoryName,
        value: item.displayCategoryId
      }))
      exhibitionContentDepthOption.value = options
    } catch (error) {
      //error
    }
  }

  const getSellerSpecialConnection = async (exhibitionKey: string) => {
    try {
      setLoading?.(true)
      const { data: dataBasic } = await exhibitionSellerSpecialConnectionMngtPopupApi.getDetail(exhibitionKey)
      const { data: cornerList } = await exhibitionSellerSpecialConnectionMngtPopupApi.getCornerList(exhibitionKey)
      const { data: cornerProductList } = await exhibitionSellerSpecialConnectionMngtPopupApi.getCornerProductList(exhibitionKey)
      const { data: keywordCreateRequestList } = await exhibitionSellerSpecialConnectionMngtPopupApi.getKeywordList(exhibitionKey)
      const { data: couponCreateRequestList } = await exhibitionSellerSpecialConnectionMngtPopupApi.getCouponList(exhibitionKey)
      // const { data: displayCategoryCreateRequestList } = await exhibitionSellerSpecialConnectionMngtPopupApi.getDisplayList(exhibitionKey)
      const dataForm = {
        ...dataBasic,
        cornerCreateRequestList: cornerList,
        cornerProductCreateRequestList: cornerProductList,
        keywordCreateRequestList: keywordCreateRequestList,
        // displayCategoryCreateRequestList: displayCategoryCreateRequestList,
        couponCreateRequestList: couponCreateRequestList
      }
      exhibitionBasicInformation.value = dataForm
    } catch (error) {
      /** */
    } finally {
      setLoading?.(false)
    }
  }

  onMounted(() => {
    getDepth2nd()
    if (props.exhibitionKey) {
      getSellerSpecialConnection(props.exhibitionKey)
    }
  })

  const submitValue = async () => {
    if (formBasicRef.value && formCategoryRef.value && formMarketingAreaRef.value && formCategoryRef.value && formRepresentativeImgRef.value) {
      const formRefs = [formBasicRef.value, formCategoryRef.value, formMarketingAreaRef.value, formCategoryRef.value, formRepresentativeImgRef.value]

      let valueSubmit: any = {}

      for (const formRef of formRefs) {
        const { data, isValid } = await formRef.submit()
        if (!isValid) {
          return
        }

        valueSubmit = { ...valueSubmit, ...data }
      }
      if (props.exhibitionKey) {
        openModalConfirm({
          content: '저장하시겠습니까?',
          onConfirm: () => {
            closeModal?.()
            exhibitionSellerSpecialConnectionMngtPopupApi
              .putData(valueSubmit)
              .then(() => {
                openModal({ content: '저장되었습니다.' })
              })
              .catch()
          }
        })
      } else {
        openModalConfirm({
          content: '저장하시겠습니까?',
          onConfirm: () => {
            closeModal?.()
            exhibitionSellerSpecialConnectionMngtPopupApi
              .postData(valueSubmit)
              .then(() => {
                openModal({ content: '저장되었습니다.' })
              })
              .catch()
          }
        })
      }
    }
  }

  const onCloseModal = () => {
    openModalConfirm({
      content: '입력 내용이 있습니다. 창을 닫으시겠습니까?',
      onConfirm: () => {
        closeModal?.()
        closeModal?.()
      }
    })
  }

  return {
    exhibitionBasicInformation,
    exhibitionContentDepthOption,
    onCloseModal,
    formBasicRef,
    formRepresentativeImgRef,
    formMarketingAreaRef,
    formCategoryRef,
    submitValue
  }
}
