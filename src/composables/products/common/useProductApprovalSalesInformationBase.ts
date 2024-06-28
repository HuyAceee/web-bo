import { useLoading } from '@/composables/common'
import { useProductRedirectLink } from '@/composables/products/common/useProductRedirectLink'
import { useModalConfirm, useModalNotification } from '@/composables/widgets'
import { YnOptions } from '@/models/common'
import { ProductRequestSalesInfoUpdateRequest } from '@/models/services/requests/products/ticket/ProductTicketBaseInfoRequest'
import {
  ProductRequestSaleInfoModel,
  ProductTicketSalesResponseConverter
} from '@/models/services/responses/products/ticket/ProductTicketBaseInfoResponse'
import {
  ProductSalesCouponPromotionDataModel,
  ProductSalesDiscountPromotionDataModel,
  ProductSalesSavingPromotionDataModel,
  ProductSalesTax,
  ProductSalesTaxNumber,
  ProductSalesTestCase,
  ProductTab
} from '@/models/views'
import { orderSavingsPromotionApi } from '@/services/api/order/OrderSavingsPromotionApi'
import { productTicketItemApi } from '@/services/api/products/tickets/ProductTicketItemApi'
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useHandleApprovalTicketProductActionButton } from '../ticketProduct/provisionInfo/useProductTicketProvisionInformation'
import { useProductApprovalCodeQuery, useProductCodeQuery } from './useProductRedirectLink'
import { PRODUCT_STATUS_ENUM, productBaseInfoType } from '@/models/views/products/common/ProductTypeModel'
import { formatDateToISOString } from '@/common'

export const useProductApprovalSalesInformationBase = (type: string = productBaseInfoType.approval_ticket) => {
  const { setLoading } = useLoading()
  const { openModal: openConfirm, closeModalByPop } = useModalConfirm()
  const { openModal: openNotification } = useModalNotification()
  const { handleRefuseApprovalById, handleApprovalById } = useHandleApprovalTicketProductActionButton()

  const route = useRoute()
  const router = useRouter()
  const queryProductCode = useProductCodeQuery()
  const queryApprovalCode = useProductApprovalCodeQuery()
  const forwardQuery = type === productBaseInfoType.approval_ticket ? queryApprovalCode : queryProductCode
  const { redirectSavedLink, redirectCancelLink } = useProductRedirectLink(type, ProductTab.OPTIONS_STOCK, forwardQuery)
  const defaultContractMarginRate = 0
  const statusLastProductProgressStatusCode = ref()
  const approvalProductKey = ref()
  const contractMarginRate = ref(defaultContractMarginRate)
  const dataFromApi = ref<ProductRequestSaleInfoModel>()
  const couponPromotionData = ref<ProductSalesCouponPromotionDataModel[]>([])
  const discountPromotionData = ref<ProductSalesDiscountPromotionDataModel[]>([])
  const savingPromotionData = ref<ProductSalesSavingPromotionDataModel[]>([])
  const productReqeustKey = Number(route.query.productRequestKey)
  const prepareQuery = {
    tax: ProductSalesTax.TAXATION,
    adultCertified: false,
    startDate: '',
    endDate: '',
    unlimited: false,
    sellingPrice: '0',
    marginRate: '0',
    contractMarginRateYN: false
  }
  const query = reactive(prepareQuery)

  const fetchData = async () => {
    try {
      setLoading?.(true)
      const productRequestKeyId = { productReqeustKey: route.query.productRequestKey as string }
      const { data } = await productTicketItemApi.getItemRequestDetailSaleInfo(productRequestKeyId)
      dataFromApi.value = data
      statusLastProductProgressStatusCode.value = data.lastProductProgressStatusCode
      contractMarginRate.value = data.marginRate
      approvalProductKey.value = data.productKey
      query.tax = data.taxTypeName
      query.adultCertified = data.adultCertificationYn === YnOptions.Y
      query.startDate = data.saleStartDateTime
      query.endDate = data.saleEndDateTime
      query.unlimited = data.salePeriodUseYn === YnOptions.N
      query.contractMarginRateYN = data.marginRateModificationYn === YnOptions.Y
      query.sellingPrice = data.salePrice.toString()
      query.marginRate = data.marginRate.toString()
      const discount = data.boTempDscntPmtProdList.map((it) => {
        const transform = ProductTicketSalesResponseConverter.toPromotion(it)
        return transform
      })
      discountPromotionData.value = discount
      if (statusLastProductProgressStatusCode.value !== PRODUCT_STATUS_ENUM.PRODUCT_REGISTRATION_IN_PROGRESS && data?.productKey) {
        const { data: savingsPromotion } = await orderSavingsPromotionApi.getSavingsPromotion(data?.productKey?.toString())
        savingPromotionData.value = savingsPromotion.map((it) => {
          const transform = ProductTicketSalesResponseConverter.toSavingsPromotion(it)
          return transform
        })
        const { data: couponPromotions } = await orderSavingsPromotionApi.getCouponPromotion(data?.productKey?.toString())
        const coupon = couponPromotions.map((it) => {
          const transform = ProductTicketSalesResponseConverter.toCoupon(it)
          return transform
        })
        couponPromotionData.value = coupon
      }

      setLoading?.(false)
    } catch {
      // setLoading?.(false)
    } finally {
      setLoading?.(false)
    }
  }

  const handleUpdateSalesInfo = async () => {
    const taxType =
      query.tax === ProductSalesTax.TAXATION
        ? ProductSalesTaxNumber.TAXATION
        : query.tax === ProductSalesTax.TAXFREE
          ? ProductSalesTaxNumber.TAXFREE
          : ProductSalesTaxNumber.YOUNG
    const preparedData: ProductRequestSalesInfoUpdateRequest = {
      modifiedBy: null,
      productReqeustKey: productReqeustKey,
      productKey: dataFromApi.value?.productKey ?? 0,
      salePeriodUseYn: query.unlimited === true ? YnOptions.N : YnOptions.Y,
      saleStartDateTime: query.startDate ? formatDateToISOString(new Date(query.startDate)) : '',
      saleEndDateTime: query.endDate ? formatDateToISOString(new Date(query.endDate)) : '',
      taxType: taxType,
      adultCertificationYn: query.adultCertified === true ? YnOptions.Y : YnOptions.N,
      salePrice: parseInt(query.sellingPrice),
      marginRateModificationYn: query.contractMarginRateYN === true ? YnOptions.Y : YnOptions.N,
      marginRate: parseInt(query.marginRate),
      marginPrice: parseInt(query.sellingPrice)
    }
    await productTicketItemApi.updateRequestSalesInfo(preparedData)
  }

  const handleUpdateContractMarginRateYN = (val: boolean) => {
    query.contractMarginRateYN = val
  }

  onMounted(() => {
    fetchData()
  })

  const onCancel = () => {
    openConfirm({
      content: '상품등록을 취소할 경우 입력한 정보는 저장되지 않습니다. 계속하시겠습니까?',
      onConfirm: () => {
        router.push(redirectCancelLink.value)
      }
    })
  }
  const onPreview = () => {
    return
  }

  const onTemporary = () => {
    openNotification({
      content: '입력한 정보가 저장되었습니다.'
    })
    // handle temporary save
  }

  const onSave = () => {
    // check required
    if (!(query.unlimited || (query.startDate && query.endDate))) {
      openNotification({
        content: '<p><span class="wf_text-sub-01">( * )</span> 표시는 필수입력항목입니다.</p>'
      })
      return
    }
    // case: regis success
    if (!route.query.testCase || route.query.testCase === ProductSalesTestCase.SUCCESS) {
      // update sales info
      handleUpdateSalesInfo()
      openNotification({
        content: '판매정보 입력이 완료되었습니다.',
        onAccept: () => {
          closeModalByPop?.()
          router.push(redirectSavedLink.value)
        }
      })
      return
    }
    // case: update success
    if (route.query.testCase === ProductSalesTestCase.UPDATE) {
      openNotification({
        content: '입력한 정보가 수정되었습니다.'
      })
      return
    }
    // case: wait approve
    if (route.query.testCase === ProductSalesTestCase.WAIT_APPROVE) {
      openNotification({
        content: '현재 승인 대기중인 상품이 존재합니다.'
      })
      return
    }
    // case: has field cant be modified after approval
    if (route.query.testCase === ProductSalesTestCase.CANT_BE_MODIFIED) {
      openNotification({
        content: '승인완료 후 수정할 수 없는 항목입니다. [판매가, 상품마진율]'
      })
    }
  }

  const handleRefuseApprovalByIdAction = () => {
    if (dataFromApi?.value?.productReqeustKey) {
      handleRefuseApprovalById(
        productReqeustKey.toString(),
        approvalProductKey.value.toString(),
        statusLastProductProgressStatusCode.value.toString(),
        () => {
          fetchData()
        }
      )
    }
  }

  const handleApprovalByIdAction = () => {
    if (dataFromApi?.value?.productReqeustKey) {
      handleApprovalById(
        productReqeustKey.toString(),
        approvalProductKey.value.toString(),
        statusLastProductProgressStatusCode.value.toString(),
        () => {
          fetchData()
        }
      )
    }
  }

  return {
    statusLastProductProgressStatusCode,
    query,
    contractMarginRate,
    discountPromotionData,
    couponPromotionData,
    savingPromotionData,
    onSave,
    onCancel,
    onPreview,
    onTemporary,
    handleUpdateContractMarginRateYN,
    handleRefuseApprovalByIdAction,
    handleApprovalByIdAction
  }
}
