import { useModalConfirm, useModalNotification } from '@/composables/widgets'
import { YnOptions } from '@/models/common'
import {
  ProductSalesCouponPromotionDataModel,
  ProductSalesDiscountPromotionDataModel,
  ProductSalesSavingPromotionDataModel,
  ProductSalesTax,
  ProductSalesTaxNumber,
  ProductSalesTestCase,
  ProductTab
} from '@/models/views'
import { productTicketItemApi } from '@/services/api/products/tickets/ProductTicketItemApi'
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductCodeQuery, useProductRedirectLink, useProductRequestKeyQuery } from '@/composables/products/common/useProductRedirectLink'
import { formatDateToISOString, isAllPropertyObjectEmpty } from '@/common'
import { useLoading } from '@/composables/common'
import { orderSavingsPromotionApi } from '@/services/api/order/OrderSavingsPromotionApi'
import {
  ProductRequestSalesInfoUpdateRequest,
  ProductSalesInfoUpdateRequest
} from '@/models/services/requests/products/ticket/ProductTicketBaseInfoRequest'
import { ProductSalesInfoModel, ProductTicketSalesResponseConverter } from '@/models/services/responses/products/ticket/ProductTicketBaseInfoResponse'
import { PRODUCT_STATUS_ENUM, productBaseInfoType } from '@/models/views/products/common/ProductTypeModel'

const prepareQuery = {
  tax: ProductSalesTax.TAXATION,
  adultCertified: false,
  startDate: '',
  endDate: '',
  unlimited: false,
  sellingPrice: '0',
  marginRate: '0',
  productCode: 0,
  productRequestKey: '',
  lastProductProgressStatusCode: '',
  marginRateModificationYn: false,
  contractMarginRateYN: false
}

export const useProductSalesTicketUpdate = (type: string = productBaseInfoType.ticket) => {
  const defaultContractMarginRate = 0
  // const routeQuery = useProductCodeQuery()

  const productCodeQuery = useProductCodeQuery()

  const productKeyQuery = useProductRequestKeyQuery()

  const route = useRoute()

  const productRequestKeyParams = {
    productReqeustKey: route.query.productRequestKey as string
  }
  const productCodeParams = { productCode: route.query.code as string, productClassificationCode: route.query.classification as string }

  const forwardQuery = isAllPropertyObjectEmpty(productRequestKeyParams) ? productCodeQuery : productKeyQuery

  const { redirectSavedLink } = useProductRedirectLink(type, ProductTab.OPTIONS_STOCK, forwardQuery)

  const contractMarginRate = ref(defaultContractMarginRate)

  const dataFromApi = ref<ProductSalesInfoModel>()

  const statusLastProductProgressStatusCode = ref()

  const router = useRouter()
  const { openModal: openConfirm, closeModalByPop } = useModalConfirm()
  const { openModal: openNotification } = useModalNotification()
  const query = reactive(prepareQuery)
  const couponPromotionData = ref<ProductSalesCouponPromotionDataModel[]>([])
  const discountPromotionData = ref<ProductSalesDiscountPromotionDataModel[]>([])
  const savingPromotionData = ref<ProductSalesSavingPromotionDataModel[]>([])
  const { setLoading } = useLoading()
  // update onApprove, onSave, onTemporary, onPreview fn when api is ready
  const fetchData = async () => {
    if (!isAllPropertyObjectEmpty(productCodeParams)) {
      try {
        setLoading?.(true)
        const { data } = await productTicketItemApi.getSalesInfo(productCodeParams)
        dataFromApi.value = data
        contractMarginRate.value = data.marginRate
        query.tax = Object.values(ProductSalesTax).includes(data.taxTypeName) ? data.taxTypeName : ProductSalesTax.TAXATION
        query.adultCertified = data.adultCertificationYn === YnOptions.Y
        query.startDate = data.saleStartDateTime
        query.endDate = data.saleEndDateTime
        query.unlimited = data.salePeriodUseYn === YnOptions.N
        query.sellingPrice = data.salePrice.toString()
        query.marginRate = data.marginRate.toString()
        query.productCode = data.productKey
        const discount = data.boDscntPmtProdList
          ? data.boDscntPmtProdList?.map((it) => {
              const transform = ProductTicketSalesResponseConverter.toPromotion(it)
              return transform
            })
          : []
        discountPromotionData.value = discount
        if (data?.productKey) {
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
        setLoading?.(false)
      }
    } else if (!isAllPropertyObjectEmpty(productRequestKeyParams)) {
      try {
        const { data } = await productTicketItemApi.getItemRequestDetailSaleInfo(productRequestKeyParams)
        setLoading?.(true)
        dataFromApi.value = data
        statusLastProductProgressStatusCode.value = data.lastProductProgressStatusCode
        contractMarginRate.value = data.marginRate
        query.tax = Object.values(ProductSalesTax).includes(data.taxTypeName) ? data.taxTypeName : ProductSalesTax.TAXATION
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

        if (
          (statusLastProductProgressStatusCode.value !== PRODUCT_STATUS_ENUM.PRODUCT_REGISTRATION_IN_PROGRESS ||
            !statusLastProductProgressStatusCode.value) &&
          data?.productKey
        ) {
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
      } catch {
        // setLoading?.(false)
      } finally {
        setLoading?.(false)
      }
    }
  }

  const handleUpdateSalesInfo = async () => {
    try {
      if (!isAllPropertyObjectEmpty(productCodeParams)) {
        const taxType =
          query.tax === ProductSalesTax.TAXATION
            ? ProductSalesTaxNumber.TAXATION
            : query.tax === ProductSalesTax.TAXFREE
              ? ProductSalesTaxNumber.TAXFREE
              : ProductSalesTaxNumber.YOUNG

        const modifyMarginRateYn =
          taxType !== dataFromApi.value?.taxType || query.marginRate !== dataFromApi.value?.marginRate.toString() ? YnOptions.Y : YnOptions.N

        const preparedData: ProductSalesInfoUpdateRequest = {
          productKey: dataFromApi.value?.productKey ?? 0,
          salePeriodUseYn: query.unlimited === false ? YnOptions.Y : YnOptions.N,
          saleStartDateTime: formatDateToISOString(new Date(query.startDate)),
          saleEndDateTime: formatDateToISOString(new Date(query.endDate)),
          taxType: taxType,
          adultCertificationYn: query.adultCertified === true ? YnOptions.Y : YnOptions.N,
          salePrice: parseInt(query.sellingPrice),
          marginRateModificationYn: modifyMarginRateYn,
          marginRate: parseInt(query.marginRate),
          marginPrice: parseInt(query.sellingPrice)
          // marginRateModificationYn: query.marginRateModificationYn === true ? YnOptions.Y : YnOptions.N,
        }
        await productTicketItemApi.updateSalesInfo(preparedData)
      } else if (!isAllPropertyObjectEmpty(productRequestKeyParams)) {
        const taxType =
          query.tax === ProductSalesTax.TAXATION
            ? ProductSalesTaxNumber.TAXATION
            : query.tax === ProductSalesTax.TAXFREE
              ? ProductSalesTaxNumber.TAXFREE
              : ProductSalesTaxNumber.YOUNG
        const preparedData: ProductRequestSalesInfoUpdateRequest = {
          productReqeustKey: parseInt(productRequestKeyParams.productReqeustKey),
          productKey: dataFromApi.value?.productKey ?? 0,
          salePeriodUseYn: query.unlimited === false ? YnOptions.Y : YnOptions.N,
          saleStartDateTime: query.startDate ? formatDateToISOString(new Date(query.startDate)) : '',
          saleEndDateTime: query.startDate ? formatDateToISOString(new Date(query.endDate)) : '',
          taxType: taxType,
          adultCertificationYn: query.adultCertified === true ? YnOptions.Y : YnOptions.N,
          salePrice: parseInt(query.sellingPrice),
          marginRateModificationYn: query.contractMarginRateYN === true ? YnOptions.Y : YnOptions.N,
          marginRate: parseInt(query.marginRate),
          marginPrice: parseInt(query.sellingPrice)
        }
        await productTicketItemApi.updateRequestSalesInfo(preparedData)
      }
    } catch {
      // openNotification({
      //   content: '<p><span class="wf_text-sub-01">( * )</span> 표시는 필수입력항목입니다.</p>'
      // })
    }
  }
  // mock data
  onMounted(() => {
    fetchData()
  })
  const onCancel = () => {
    openConfirm({
      content: '상품등록을 취소할 경우 입력한 정보는 저장되지 않습니다. 계속하시겠습니까?',
      onConfirm: () => {
        closeModalByPop?.()
        // router.push({
        //   query: {
        //     tab: ''
        //   }
        // })
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
  const onApprove = () => {
    // case: save after editing (before)
    if (route.query.testCase === ProductSalesTestCase.EDIT_BEFORE) {
      openNotification({
        content: '입력한 정보를 저장 완료한 후 승인요청 해주세요.'
      })
      return
    }
    // case: Save after editing (complete)
    if (route.query.testCase === ProductSalesTestCase.EDIT_COMPLETE) {
      openNotification({
        content: '입력한 정보가 수정되었습니다.'
      })
    }
  }
  return {
    contractMarginRate,
    query,
    discountPromotionData,
    couponPromotionData,
    savingPromotionData,
    onApprove,
    onSave,
    onCancel,
    onPreview,
    onTemporary
  }
}
