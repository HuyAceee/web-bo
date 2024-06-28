import { useModalConfirm, useModalNotification } from '@/composables'
import { deliveryListOrderStatusApi } from '@/services/api/delivery/DeliveryTicketProductOrderManagementApi'
import { computed, ref } from 'vue'
import { useDeliveryTicketProductFilterTable } from '@/composables/delivery/common/useDeliveryTicketProductFilterTable'
import { DeliveryTicketProductFilterTableRequest } from '@/models/services/requests/delivery/common/DeliveryTicketProductFilterTableRequest'
import { deliveryListSelectDateOrderDetailOptions } from '@/models/views/delivery/ticketProductOrderManagement/DeliveryTicketProductListOrderStatusModel'
import {
  deliveryTicketProductOrderDetailHeaderTableConfig,
  deliveryHintListMockData,
  deliveryTicketProductOrderDetailXlsxSheetName
} from '@/models/views/delivery/ticketProductOrderManagement/DeliveryTicketProductOrderDetailModel'
import { convertErrorFailureResponses } from '@/models/views/delivery/common'
import { PRODUCT_TICKET_LIST, onpenWindowWithQueryString } from '@/common'
import { useProductModalErrorResultInfo } from '../useProductModalErrorResultInfo'

interface DeliveryOrderDetailPropsModel {
  onShowModalCancelRequest: (id?: string | number | undefined) => void
  openModalCancelSell: (orderKey: number, receiverProductOrderKeys: string) => void
  onShowModalCancelRequestIssuanceDelay: (receiverProductOrderKeys: number | string) => void
}

export const useDeliveryTicketProductOrderDetail = ({
  onShowModalCancelRequest,
  openModalCancelSell,
  onShowModalCancelRequestIssuanceDelay
}: DeliveryOrderDetailPropsModel) => {
  const singleLoadingIndex = ref<number | undefined>()
  const isLoadingFetchApi = ref<boolean>(false)
  const { openModal: openNotificationModal, closeModalByPop: closeModalByPopNotification } = useModalNotification()
  const { openModal: openConfirmModal, closeModalByPop } = useModalConfirm()
  const { onShowModal } = useProductModalErrorResultInfo()
  const callback = async (params: DeliveryTicketProductFilterTableRequest) => {
    return await deliveryListOrderStatusApi.getAllOrders(params)
  }

  const {
    values,
    setFieldValue,
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
    handleResetFilter,
    searchMemberKeyRef,
    searchCustomerKeyRef,
    handleOpenPopupSearchOrderMember,
    handleOpenPopupSearchCustomer,
    handleChangeKeywordFilter,
    handleInputFieldChange,
    placeholderKeywordSearch
  } = useDeliveryTicketProductFilterTable(
    deliveryTicketProductOrderDetailXlsxSheetName,
    callback,
    deliveryListSelectDateOrderDetailOptions[0],
    deliveryTicketProductOrderDetailHeaderTableConfig
  )

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

  const showModalCancelSell = () => {
    if (isCheckedEmpty.value) {
      openNotificationModal({
        content: '<p>먼저 원하는 주문을 선택 후</p><p>[판매취소] 버튼을 클릭해 주세요.</p>'
      })
      return
    }
    openModalCancelSell?.(itemSelected?.value?.orderKey ?? 0, listChecked.value.join(','))
  }

  const showModalCancelRequestIssuanceDelay = () => {
    if (isCheckedEmpty.value) {
      openNotificationModal({
        content: '<p>먼저 원하는 주문을 1건 이상 선택 후</p><p>[발급지연안내] 버튼을 클릭해 주세요.</p>'
      })
      return
    }
    onShowModalCancelRequestIssuanceDelay?.(listChecked?.value?.[0] ?? 0)
  }

  const handleOpenConfirmTicketIssue = (index?: number, id?: number) => {
    if (!listChecked.value.length && !id)
      return openNotificationModal({
        content: '<p>먼저 원하는 주문을 선택 후</p><p>[티켓발급] 버튼을 클릭해 주세요.</p>'
      })
    openConfirmModal?.({
      content: '<p>선택한 주문에 대해 티켓발급 요청하시겠습니까?</p>',
      onConfirm() {
        closeModalByPop?.()
        isLoadingFetchApi.value = true
        if (id) {
          singleLoadingIndex.value = index
          handlePutTicketIssue(id)
          return
        }
        handlePutTicketIssueMultiple()
      }
    })
  }

  const handlePutTicketIssue = async (id: number) => {
    try {
      const { data } = await deliveryListOrderStatusApi.putTicketIssue({
        receiverProductOrderKey: [id]
      })
      if (!data.failureResponses.length) {
        openNotificationModal({
          content: '<p>티켓발급에 성공하였습니다.</p><p>[티켓발급목록]에서 확인할 수 있습니다.</p>'
        })
        return
      }
      openNotificationModal({
        content: '<p>티켓발급에 실패하였습니다.</p><p>기발급 여부 및 클레임 유무를 재확인해 주세요.</p>'
      })
    } finally {
      singleLoadingIndex.value = undefined
      isLoadingFetchApi.value = false
    }
  }

  const handlePutTicketIssueMultiple = async () => {
    try {
      if (!listChecked.value.length) {
        openNotificationModal({
          content: '<p>먼저 원하는 주문을 선택 후</p><p>[티켓발급] 버튼을 클릭해 주세요.</p>'
        })
        return
      }
      const { data } = await deliveryListOrderStatusApi.putTicketIssue({
        receiverProductOrderKey: listChecked.value
      })
      refTable?.value?.clearCheckAll()
      if (data.failureResponses.length === listChecked.value.length) {
        openNotificationModal({
          content: '<p>티켓발급에 실패하였습니다.</p><p>기발급 여부 및 클레임 유무를 재확인해 주세요</p>'
        })
        listChecked.value = []
        return
      }
      listChecked.value = []
      if (!data.failureResponses.length) {
        openNotificationModal({
          content: '<p>티켓발급에 성공하였습니다.</p><p> [티켓발급목록]에서 확인할 수 있습니다</p>',
          onAccept() {
            onpenWindowWithQueryString(PRODUCT_TICKET_LIST, {})
            closeModalByPopNotification?.()
          }
        })
        return
      }
      const errors = convertErrorFailureResponses(data.failureResponses)
      onShowModal(errors, deliveryHintListMockData)
    } catch (error) {
      /* empty */
    } finally {
      isLoadingFetchApi.value = false
    }
  }

  const isLoadingTicketIssue = (index: number, id: string) => {
    return typeof singleLoadingIndex.value === 'number'
      ? index === singleLoadingIndex.value
      : listChecked.value.includes(id) && isLoadingFetchApi.value
  }

  const onSubmitAndReset = () => {
    listChecked.value = []
    refTable?.value?.clearCheckAll()
    onSubmit()
  }

  return {
    values,
    setFieldValue,
    onPageChange,
    listChecked,
    onRowSelected,
    onSelectAllChange,
    items,
    isLoading,
    refTable,
    currentFilterDate,
    handleChangeCountDate,
    onSubmitAndReset,
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
    isDisabledClaimStatus,
    deliveryClaimStatusOptions,
    handleOpenPopupSearchProduct,
    searchProductKeyRef,
    handleOpenConfirmTicketIssue,
    isLoadingTicketIssue,
    showModalCancelRequest,
    showModalCancelSell,
    showModalCancelRequestIssuanceDelay,
    handleResetFilter,
    searchMemberKeyRef,
    searchCustomerKeyRef,
    handleOpenPopupSearchOrderMember,
    handleOpenPopupSearchCustomer,
    handleChangeKeywordFilter,
    handleInputFieldChange,
    placeholderKeywordSearch
  }
}
