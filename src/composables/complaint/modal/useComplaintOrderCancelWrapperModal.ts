import { useLoading, useModal } from '@/composables/common'
import { useModalConfirm, useModalNotification } from '@/composables/widgets'
import { ComplainOrderCancelModalPutDataRequest } from '@/models/services/requests/complaint/modal/ComplainOrderCancelModalRequest'
import { ComplaintOrderCancelProps } from '@/models/views/complaint/modal/ComplainOrderCancelModel'
import { complaintOrderCancelApi } from '@/services/api/complaint/ComplaintOrderCancelApi'
import ComplaintOrderCancelModal from '@/views/complaint/modal/ComplaintOrderCancelModal.vue'

export const useComplaintOrderCancelWrapperModal = () => {
  const handleSubmitOrderCancel = async (claimProductKey: number[], withdrawalReason: string) => {
    const newOrderCancel: ComplainOrderCancelModalPutDataRequest = {
      claimProductKey: claimProductKey,
      withdrawalReason: withdrawalReason
    }
    await complaintOrderCancelApi.putOrderCancelWithdrawalReason(newOrderCancel)
  }
  const modal = useModal<ComplaintOrderCancelProps>()
  const { openModal: openConfirm, closeModalByPop: closeConfirmModal } = useModalConfirm()
  const { openModal: openNotification, closeModalByPop } = useModalNotification()
  const { setLoading } = useLoading()

  const openModalOrderCancel = (claimProductKey: number[], callBack?: () => void) => {
    modal.showModal?.({
      component: ComplaintOrderCancelModal,
      props: {
        claimProductKey: claimProductKey,
        onCancel: modal.closeModalByPop,
        onConfirm: async (withdrawalReason: string) => {
          openConfirm({
            content: '선택한 주문의 취소 신청을 철회하시겠습니까?',
            onConfirm: async () => {
              try {
                setLoading?.(true)
                closeConfirmModal?.()
                await handleSubmitOrderCancel(claimProductKey, withdrawalReason)
                openNotification({
                  content: '<p>취소 신청이 철회되었습니다.</p><p>이후 정상 주문 절차가 진행됩니다.</p>',
                  onAccept: () => {
                    closeModalByPop?.()
                    callBack?.()
                    modal.closeModalByPop?.()
                  }
                })
              } catch {
                // setLoading?.(false)
              } finally {
                setLoading?.(false)
              }
            }
          })
        }
      }
    })
  }
  return {
    openModalOrderCancel
  }
}
