import { useModal } from '@/composables/common'
import { useDataTablePagination } from '@/composables/widgets'
import { defaultPageState } from '@/models'
import { DataTablePaginationResponseModel } from '@/models/services/responses/BaseModelResponse'
import { DeliveryReceiptModalPropsModel } from '@/models/views/delivery/modal/DeliveryReceiptViewModel'
import { DeliveryPurchaseProductModel, DeliveryReceiptModel } from '@/models/views/delivery/ticketProductOrderManagement/DeliveryTicketProductOrderDetailModel'
import { deliveryReceiptApi } from '@/services/api/delivery/DeliveryReceiptApi'
import { PageState } from 'primevue/paginator'
import { computed, onMounted, ref } from 'vue'

export const useDeliveryReceiptViewModalLogic = (props?: DeliveryReceiptModalPropsModel) => {
  const { closeModalByPop } = useModal()
  const tablePurchaseHistoryRef = ref()
  const tablePaymentHistoryRef = ref()
  const exportPdfRef = ref()
  const pageHistory = ref<PageState>(defaultPageState)
  const receiptDetail = ref<DeliveryReceiptModel>({} as DeliveryReceiptModel)
  const purchaseProducts = ref<DeliveryPurchaseProductModel[]>([])

  const onGetReceiptDetail = async(key: string | number) => {
    try {
      const { data } = await deliveryReceiptApi.getReceiptByOrderKey(key)
      receiptDetail.value = data
      purchaseProducts.value = data.purchase.purchaseProducts
    } catch (error) {
      /* empty */
    }
  }

  onMounted(() => {
    onGetReceiptDetail(props?.orderKey ?? '')
  })

  const getDataHistory = async (page: number, size: number) => {
    return {
      totalItems: purchaseProducts.value.length,
      data: purchaseProducts.value.slice(page * size, (page + 1) * size)
    } as DataTablePaginationResponseModel<DeliveryPurchaseProductModel>
  }

  const {
    items: itemsHistory,
    totalItems: totalItemHistory,
    isLoading: isLoadingHistory,
    fetchDataWith: fetchDataWithHistory
  } = useDataTablePagination<DeliveryPurchaseProductModel>(getDataHistory)

  const onPageChangeHistory = (pageState: PageState) => {
    pageHistory.value = pageState
    fetchDataWithHistory({
      numberOfItems: pageState.rows,
      page: pageState.page
    })
      .then(() => {
        tablePurchaseHistoryRef.value.scrollToTop()
      })
      .catch(() => {})
  }

  const totalProductAmount = computed(() => {
    return purchaseProducts?.value?.reduce((a, b) => a + b.quantity * b.productAmount, 0)
  })
  return {
    tablePurchaseHistoryRef,
    tablePaymentHistoryRef,
    itemsHistory,
    totalItemHistory,
    isLoadingHistory,
    onPageChangeHistory,
    closeModalByPop,
    receiptDetail,
    totalProductAmount,
    exportPdfRef
  }
}
