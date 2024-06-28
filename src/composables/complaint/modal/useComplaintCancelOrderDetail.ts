import { complaintOrderCancelDetailApi } from '@/services/api/complaint/ComplaintOrderCancelDetailApi'
import { computed, ref, watch } from 'vue'
import { ClaimTicketDetailTableModel, ComplaintOrderCancelDetailFormModel } from '@/models/views/complaint/modal/ComplaintOrderCancelDetailModel'
import { useCheckBoxTable, useModalConfirm, useModalNotification } from '@/composables'
import { COMPLAINT_ORDER_CANCEL_STATUS } from '@/models/views/complaint/complaintOrderCancel/ComplaintOrderCancelModel'
import { useComplaintOrderCancelWrapperModal } from '@/composables/complaint/modal/useComplaintOrderCancelWrapperModal'
import { complaintOrderCancelApi } from '@/services/api/complaint/ComplaintOrderCancelApi'
import { useDeliveryTicketProductModalDetail } from '@/composables/delivery/modal/useDeliveryTicketProductModalDetail'

export const useComplaintCancelOrderDetail = (id?: number) => {
  const dataOrderCancel = ref<ComplaintOrderCancelDetailFormModel>()
  const { openModalOrderCancel } = useComplaintOrderCancelWrapperModal()
  const dataTableTicketDetail = ref<ClaimTicketDetailTableModel[]>([])
  const listId = computed(() => {
    return dataTableTicketDetail.value?.map((item: ClaimTicketDetailTableModel) => item.claimProductKey.toString()) ?? []
  })
  const { openModal: openModalConfirm, closeModalByPop } = useModalConfirm()

  const refTable = ref()
  const { onRowSelected, onSelectAllChange, clearChecked, listChecked } = useCheckBoxTable(listId)

  const { openModal } = useModalNotification()
  const getOrderCancelDetail = () => {
    if (id) {
      try {
        complaintOrderCancelDetailApi.getDetailOrderCancel(id).then((response) => {
          dataOrderCancel.value = response.data
        })
      } catch (e) {
        // error
      }
    }
  }
  const updateMemoNotes = (value: string) => {
    if (dataOrderCancel.value) {
      dataOrderCancel.value.etcMemoContents = value
    }
  }

  const submitMemoNotes = () => {
    if (id && dataOrderCancel.value) {
      try {
        complaintOrderCancelDetailApi.putMemoOrderCancel(id, dataOrderCancel.value.etcMemoContents).then((res) => {
          openModal({ content: res.message ?? '' })
        })
      } catch (e) {
        // error
      }
    }
  }

  const resetChecked = () => {
    clearChecked()
    refTable.value?.clearCheckAll()
  }

  const onCancelWithDrawal = () => {
    if (listChecked.value?.length > 0) {
      const checkStatus = dataTableTicketDetail.value?.some((item) => {
        return (
          item?.claimProductKey.toString() ===
            listChecked?.value?.find((idChecked) => idChecked?.toString() === item?.claimProductKey?.toString())?.toString() &&
          item?.claimStatus !== COMPLAINT_ORDER_CANCEL_STATUS.ORDER_CANCEL &&
          item?.claimStatus !== COMPLAINT_ORDER_CANCEL_STATUS.DISUSE_FAIL
        )
      })
      if (checkStatus) {
        openModal?.({
          content: '처리할 수 없는 상태의 상품이 존재합니다. 다시 확인해 주세요.'
        })
      } else {
        openModalOrderCancel(
          listChecked.value.map((item) => Number(item)),
          () => {
            resetChecked()
            getOrderCancelDetail()
          }
        )
      }
    } else {
      openModal?.({
        content: '대상 상품을 선택해 주세요.'
      })
    }
  }

  const disposalRequestAction = () => {
    complaintOrderCancelApi.putDisposalTicketRequest(listChecked.value).then(() => {
      openModal?.({
        content: '티켓 폐기 요청이 전송되었습니다.',
        onAccept() {
          resetChecked()
          getOrderCancelDetail()
        }
      })
    })
  }

  const onReRequestProcessing = () => {
    if (listChecked.value?.length > 0) {
      const checkStatus = dataTableTicketDetail.value?.some((item) => {
        return (
          item?.claimProductKey.toString() ===
            listChecked?.value?.find((idChecked) => idChecked?.toString() === item?.claimProductKey?.toString())?.toString() &&
          item?.claimStatus !== COMPLAINT_ORDER_CANCEL_STATUS.DISUSE_FAIL
        )
      })
      if (checkStatus) {
        openModal?.({
          content: '처리할 수 없는 상태의 상품이 존재합니다. 다시 확인해 주세요.'
        })
      } else {
        openModalConfirm({
          content: '선택하신 티켓 상품에 대해 폐기요청을 재전송 하시겠습니까?',
          buttonCancelLabel: '닫기',
          buttonConfirmLabel: '확인',
          onConfirm: () => {
            closeModalByPop?.()
            disposalRequestAction()
          }
        })
      }
    } else {
      openModal?.({
        content: '대상 상품을 선택해 주세요.'
      })
    }
  }

  watch(
    () => dataOrderCancel.value?.claimTicketDetails,
    (newValue) => {
      clearChecked()
      dataTableTicketDetail.value =
        newValue?.map((item) => {
          return {
            ...item,
            claimTicketHistories: item?.claimTicketHistories?.[0]?.claimProcess,
            id: item.claimProductKey
          }
        }) ?? []
    }
  )
  const deliveryTicketProductModal = useDeliveryTicketProductModalDetail()
  const showTicketDetails = (id: number) => {
    deliveryTicketProductModal.openModal(id)
  }
  watch(
    () => id,
    () => {
      getOrderCancelDetail()
    },
    { immediate: true }
  )

  return {
    dataOrderCancel,
    updateMemoNotes,
    submitMemoNotes,
    dataTableTicketDetail,
    onRowSelected,
    onSelectAllChange,
    onCancelWithDrawal,
    refTable,
    onReRequestProcessing,
    showTicketDetails,
    getDetailOrderCancelTicket: getOrderCancelDetail
  }
}
