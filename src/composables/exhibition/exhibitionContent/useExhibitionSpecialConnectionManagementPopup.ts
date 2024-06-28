import { useLoading } from '@/composables/common'
import { useModalConfirm, useModalNotification } from '@/composables/widgets'
import { WelfareSelectOptionType } from '@/models'
import { ExhibitionConnectionFormBannerModel } from '@/models/views/exhibition/exhibitionContent/ExhibitionConnectionFormBannerModel'
import { ExhibitionConnectionFormMarketingAreaModel } from '@/models/views/exhibition/exhibitionContent/ExhibitionConnectionFormMarketingAreaModel'
import {
  ExhibitionCornerTableModel,
  ExhibitionSellerSpecialConnectionMngtPopupModel
} from '@/models/views/exhibition/exhibitionContent/ExhibitionConnectionMngtModel'
import { ExhibitionSpecialConnectionFormBasicInfoModel } from '@/models/views/exhibition/exhibitionContent/ExhibitionSpecialConnectionFormBasicInfoModel'
import {
  ExhibitionContentSpecialConnectionManagementPopupModel,
  ExhibitionContentSpecialConnectionManagementPopupProps,
  ExhibitionFormSubmit
} from '@/models/views/exhibition/exhibitionContent/ExhibitionSpecialConnectionManagementModel'
import { exhibitionSpecialConnectionManagementApi } from '@/services/api/exhibition/ExhibitionSpecialConnectionManagementApi'
import { productCategoryApi } from '@/services/api/products/category/ProductCategoryApi'
import { onMounted, ref } from 'vue'

export const useExhibitionSpecialConnectionManagementPopup = (
  props: ExhibitionContentSpecialConnectionManagementPopupProps,
  closeModal: () => void
) => {
  const { setLoading } = useLoading()
  const { openModal: openModalConfirm } = useModalConfirm()
  const { openModal: openModalNotice } = useModalNotification()

  const currentValue = ref<ExhibitionContentSpecialConnectionManagementPopupModel>()
  const exhibitionContentDepthOption = ref<WelfareSelectOptionType[]>([])

  const formBasicRef = ref<ExhibitionFormSubmit<ExhibitionSpecialConnectionFormBasicInfoModel>>()
  const formRepresentativeImgRef = ref<ExhibitionFormSubmit<ExhibitionSellerSpecialConnectionMngtPopupModel>>()
  const formMarketingAreaRef = ref<ExhibitionFormSubmit<ExhibitionConnectionFormMarketingAreaModel>>()
  const formBannerRef = ref<ExhibitionFormSubmit<ExhibitionConnectionFormBannerModel>>()
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
      /* empty */
    }
  }

  const getData = async (exhibitionKey: string | number) => {
    try {
      setLoading?.(true)
      const { data: detailData } = await exhibitionSpecialConnectionManagementApi.getDetail(exhibitionKey)
      const { data: detailExcludeCustomer } = await exhibitionSpecialConnectionManagementApi.getDetailExcludeCustomer(exhibitionKey)
      const { data: detailCoupon } = await exhibitionSpecialConnectionManagementApi.getDetailCoupon(exhibitionKey)
      const { data: detailCornerList } = await exhibitionSpecialConnectionManagementApi.getCornerList(exhibitionKey)
      const { data: detailKeyword } = await exhibitionSpecialConnectionManagementApi.getDetailKeywordName(exhibitionKey)
      const { data: detailProductCornerList } = await exhibitionSpecialConnectionManagementApi.getCornerProductList(exhibitionKey)
      const resData = {
        ...detailData,
        excludeCustomerCreateRequestList: detailExcludeCustomer,
        couponCreateRequestList: detailCoupon,
        cornerCreateRequestList: detailCornerList,
        cornerProductCreateRequestList: detailProductCornerList,
        keywordCreateRequestList: detailKeyword
      }
      currentValue.value = resData
    } catch (error) {
      /** */
    } finally {
      setLoading?.(false)
    }
  }

  onMounted(() => {
    getDepth2nd()
    if (props.exhibitionKey) {
      getData(props.exhibitionKey)
    }
  })

  const onSubmitValue = async () => {
    if (
      formBasicRef.value &&
      formCategoryRef.value &&
      formMarketingAreaRef.value &&
      formBannerRef.value &&
      formCategoryRef.value &&
      formRepresentativeImgRef.value
    ) {
      const formRefs = [
        formBasicRef.value,
        formCategoryRef.value,
        formMarketingAreaRef.value,
        formBannerRef.value,
        formCategoryRef.value,
        formRepresentativeImgRef.value
      ]
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
            exhibitionSpecialConnectionManagementApi
              .modify(valueSubmit)
              .then(() => {
                openModalNotice({ content: '저장되었습니다.' })
              })
              .catch()
          }
        })
      } else {
        openModalConfirm({
          content: '저장하시겠습니까?',
          onConfirm: () => {
            closeModal?.()
            exhibitionSpecialConnectionManagementApi
              .register(valueSubmit)
              .then(() => {
                openModalNotice({ content: '저장되었습니다.' })
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
    exhibitionContentDepthOption,
    currentValue,
    onCloseModal,
    onSubmitValue,
    formBasicRef,
    formRepresentativeImgRef,
    formMarketingAreaRef,
    formBannerRef,
    formCategoryRef
  }
}
