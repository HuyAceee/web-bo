import {
  ProductItemDetailDisplayInfoModel,
  ProductTicketDetailBasicInfoModel
} from '@/models/services/responses/products/ticket/ProductTicketBaseInfoResponse'
import { productTicketDetailInfoApi } from '@/services/api/products/tickets/ProductTicketDetailInfoApi'
import { productTicketItemApi } from '@/services/api/products/tickets/ProductTicketItemApi'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

export const useProductTicketCommon = () => {
  const route = useRoute()
  const dataValue = ref<ProductTicketDetailBasicInfoModel>({
    externalInterfaceYn: '',
    productClassificationCode: '',
    productClassificationName: '',
    productType: '',
    productTypeName: '',
    productName: '',
    productKey: 0,
    productCode: '',
    multilingualProductName: '',
    sellerProductCode: '',
    sellerKey: 0,
    lowSellerKey: 0,
    ticketPassType: '',
    ticketPassTypeName: '',
    ticketCancelPossibleType: '',
    ticketCancelPossibleTypeName: '',
    ticketType: '',
    ticketTypeName: '',
    ticketUseRuleType: '',
    ticketUseRuleTypeName: '',
    ticketValidityDateYn: '',
    ticketValidityStartDateTime: '',
    ticketValidityEndDateTime: '',
    reviewPossibleYn: '',
    inquiryPossibleYn: '',
    giftPossibleYn: '',
    minimumPurchaseQuantityYn: '',
    minimumPurchaseQuantity: 0,
    maximumPurchaseQuantityYn: '',
    maximumPurchaseQuantity: 0,
    excludedCompanyYn: '',
    lastProductProgressStatusCode: '',
    lastProductProgressStatusName: '',
    productRequestProcessReason: '',
    createdBy: '',
    createdByName: '',
    createdDate: '',
    lastProductApprovedBy: '',
    lastProductApprovedByName: '',
    lastProductApprovedDate: '',
    lastModifiedBy: '',
    lastModifiedByName: '',
    lastModifiedByDate: '',
    lastProductSalesStatusCode: '',
    lastProductSalesStatusName: '',
    boKeyWordList: [
      {
        keywordName: ''
      }
    ]
  })

  const categoryData = ref<ProductItemDetailDisplayInfoModel>()

  const fetchDetailsTicketData = async (productCode: string, productClassificationCode: string) => {
    const productId = { productCode: productCode, productClassificationCode: productClassificationCode }
    const { data } = await productTicketDetailInfoApi.getBasicDetailInfo(productId)
    dataValue.value = data
  }

  const fetchCategoryData = async (productCode: string) => {
    const params = { productCode: productCode }
    const { data } = await productTicketItemApi.getItemDetailsDisplayInfo(params)
    categoryData.value = data
  }

  onMounted(() => {
    if (route.query?.code) {
      dataValue.value.productCode = route.query?.code as string
      dataValue.value.productClassificationCode = route.query?.classification as string
      fetchDetailsTicketData(route.query?.code as string, route.query?.classification as string)
      fetchCategoryData(route.query.code as string)
    }
  })

  return {
    categoryData,
    dataValue
  }
}
