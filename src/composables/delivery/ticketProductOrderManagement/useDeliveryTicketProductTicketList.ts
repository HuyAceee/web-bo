import { useModalConfirm, useModalNotification } from '@/composables'
import { deliveryListOrderStatusApi } from '@/services/api/delivery/DeliveryTicketProductOrderManagementApi'
import { computed, ref } from 'vue'
import { useDeliveryTicketProductFilterTable } from '@/composables/delivery/common/useDeliveryTicketProductFilterTable'
import { DeliveryTicketProductFilterTableRequest } from '@/models/services/requests/delivery/common/DeliveryTicketProductFilterTableRequest'
import { DeliveryFailureResponseModel } from '@/models/services/responses/delivery/ticketProductOrderManagement/DeliveryOrderDetailResponse'
import { deliveryListSelectDateTicketListOptions } from '@/models/views/delivery/ticketProductOrderManagement/DeliveryTicketProductListOrderStatusModel'
import {
  DeliveryOrderStatusModel,
  deliveryTicketProductTicketListXlsxSheetName
} from '@/models/views/delivery/ticketProductOrderManagement/DeliveryTicketProductTicketListModel'
import { deliveryHintListMockData } from '@/models/views/delivery/ticketProductOrderManagement/DeliveryTicketProductOrderDetailModel'
import { convertErrorFailureResponses, deliveryTicketProductFilterTableHeaderTableConfig } from '@/models/views/delivery/common'
import { useProductModalErrorResultInfo } from '../useProductModalErrorResultInfo'

interface DeliveryTicketListPropsModel {
  onShowModalCancelRequest: (id?: string | number | undefined) => void
}

export const useDeliveryTicketProductTicketList = ({ onShowModalCancelRequest }: DeliveryTicketListPropsModel) => {
  const singleLoadingIndex = ref<number | undefined>()
  const isLoadingFetchApi = ref<boolean>(false)
  const { openModal: openNotificationModal } = useModalNotification()
  const { openModal: openConfirmModal, closeModalByPop } = useModalConfirm()
  const { onShowModal } = useProductModalErrorResultInfo()

  const callback = async (params: DeliveryTicketProductFilterTableRequest) => {
    return await deliveryListOrderStatusApi.getAllTicketList(params)
  }

  const {
    values,
    setFieldValue,
    resetForm,
    onPageChange,
    listChecked,
    onRowSelected,
    onSelectAllChange,
    items,
    isLoading,
    refTable,
    currentFilterDate,
    handleChangeCountDate,
    onSubmit,
    onDownload,
    searchSellerKeyRef,
    searchOrderMemberKeyRef,
    handleOpenPopupSearchMember,
    categoryDepth1,
    categoryDepth2,
    categoryDepth3,
    getIsCheckBox,
    handleCheckBoxChange,
    handleResetForm,
    handleOpenPopupSearchSeller,
    searchMDKeyRef,
    sellerCompanies,
    tableConfigs,
    deliveryClaimStatusOptions,
    handleOpenPopupSearchProduct,
    searchProductKeyRef,
    isDisabledClaimStatus,
    setData,
    clearChecked,
    searchMemberKeyRef,
    searchCustomerKeyRef,
    handleOpenPopupSearchOrderMember,
    handleOpenPopupSearchCustomer,
    handleResetFilter,
    handleChangeKeywordFilter,
    handleInputFieldChange,
    placeholderKeywordSearch
  } = useDeliveryTicketProductFilterTable(
    deliveryTicketProductTicketListXlsxSheetName,
    callback,
    deliveryListSelectDateTicketListOptions[0],
    deliveryTicketProductFilterTableHeaderTableConfig
  )

  const isDistanceBetweenDatesGreaterThan = (startDate: string, endDate: string, days: number) => {
    const startTime = (!startDate ? new Date() : new Date(startDate ?? '')).getTime()
    const endTime = (!endDate ? new Date() : new Date(endDate ?? '')).getTime()
    const difference = endTime - startTime
    return difference / (1000 * 60 * 60 * 24) > days
  }

  const handleConfirmPurchase = async (receiverProductOrderKey: string | number, issueDate: string, index: number | undefined) => {
    if (!isDistanceBetweenDatesGreaterThan(issueDate, '', 15))
      return openNotificationModal({
        content: '<p>티켓발급일로부터 15일 경과되기</p><p>이전에는 구매확정 처리할 수 없습니다.</p>'
      })
    try {
      isLoadingFetchApi.value = true
      singleLoadingIndex.value = index
      await deliveryListOrderStatusApi.confirmPurchase(receiverProductOrderKey)
      openNotificationModal({
        content: '<p>구매확정 처리되었습니다.</p><p>해당 주문은 구매확정 목록으로 이동됩니다.</p>'
      })
      const newItems =
        items.value?.map((item) => {
          if (item.receiverProductOrderKey === receiverProductOrderKey)
            return {
              ...item,
              orderStatus: DeliveryOrderStatusModel.PURCHASE_COMPLETE
            }
          return item
        }) ?? []
      setData(newItems)
    } catch (error) {
      openNotificationModal({
        content: '<p>구매확정 처리에 실패하였습니다.</p><p>해당 주문의 현재 상태를 확인해 주세요.</p>'
      })
    } finally {
      refTable?.value?.clearCheckAll()
      clearChecked()
      singleLoadingIndex.value = undefined
      isLoadingFetchApi.value = false
    }
  }

  const handleConfirmPurchaseMultiple = () => {
    if (!listChecked.value.length)
      return openNotificationModal({
        content: '먼저 원하는 주문을 선택해 주세요.'
      })

    openConfirmModal({
      content: '선택한 주문을 구매확정 처리하시겠습니까?',
      async onConfirm() {
        closeModalByPop?.()
        const promises = listChecked.value.map((receiverProductOrderKey) => {
          return deliveryListOrderStatusApi.confirmPurchase(receiverProductOrderKey)
        })
        const data = await Promise.allSettled(promises)
        const temp = data.map((item, index) => ({
          data: item as PromiseRejectedResult,
          receiverProductOrderKey: listChecked.value[index]
        }))
        const errors = temp.filter((i) => i.data.status === 'rejected')
        handleNotificationAfterCallApi(errors)
        refTable?.value?.clearCheckAll()
        clearChecked()
      }
    })
  }

  const handleNotificationAfterCallApi = (
    errors: {
      data: PromiseRejectedResult
      receiverProductOrderKey: string
    }[]
  ) => {
    if (!errors.length)
      return openNotificationModal({
        content: '<p>구매확정 처리되었습니다.</p><p>해당 주문은 구매확정목록으로 이동됩니다.</p>'
      })

    if (errors.length === listChecked.value.length)
      return openNotificationModal({
        content: '<p>구매확정 처리에 실패하였습니다.</p><p>기처리 여부 및 클레임 유무를 재확인해 주세요.</p>'
      })

    const dataErrors: DeliveryFailureResponseModel[] = errors.map((error: { data: PromiseRejectedResult; receiverProductOrderKey: string }) => ({
      code: '',
      message: error.data.reason.message,
      receiverProductOrderKey: Number(error.receiverProductOrderKey)
    }))

    const errorsList = convertErrorFailureResponses(dataErrors)

    return onShowModal(errorsList, deliveryHintListMockData)
  }

  const isLoadingPurchaseConfirm = (index: number, id: string) => {
    return typeof singleLoadingIndex.value === 'number'
      ? index === singleLoadingIndex.value
      : listChecked.value.includes(id) && isLoadingFetchApi.value
  }

  const isCheckedEmpty = computed(() => {
    return !listChecked.value.length
  })

  const itemSelected = computed(() => {
    return items.value?.find((i) => i.id === listChecked.value?.[0])
  })

  const showModalCancelRequest = () => {
    if (isCheckedEmpty.value) return
    onShowModalCancelRequest?.(itemSelected?.value?.orderKey)
  }

  return {
    values,
    setFieldValue,
    resetForm,
    onPageChange,
    listChecked,
    onRowSelected,
    onSelectAllChange,
    items,
    isLoading,
    refTable,
    currentFilterDate,
    handleChangeCountDate,
    onSubmit,
    onDownload,
    searchSellerKeyRef,
    searchOrderMemberKeyRef,
    handleOpenPopupSearchMember,
    categoryDepth1,
    categoryDepth2,
    categoryDepth3,
    getIsCheckBox,
    handleCheckBoxChange,
    handleResetForm,
    handleOpenPopupSearchSeller,
    searchMDKeyRef,
    handleConfirmPurchase,
    sellerCompanies,
    handleConfirmPurchaseMultiple,
    tableConfigs,
    isDisabledClaimStatus,
    deliveryClaimStatusOptions,
    handleOpenPopupSearchProduct,
    searchProductKeyRef,
    isLoadingPurchaseConfirm,
    showModalCancelRequest,
    searchMemberKeyRef,
    searchCustomerKeyRef,
    handleOpenPopupSearchOrderMember,
    handleOpenPopupSearchCustomer,
    handleResetFilter,
    handleChangeKeywordFilter,
    handleInputFieldChange,
    placeholderKeywordSearch
  }
}
