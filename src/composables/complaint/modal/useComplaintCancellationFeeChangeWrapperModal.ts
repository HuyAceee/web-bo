import { useLoading, useModal, useModalConfirm, useModalNotification } from '@/composables'
import { ComplaintCancellationFeeChangeModalRequest } from '@/models/services/requests/complaint/modal/ComplaintCancellationFeeChangeModalRequest'
import { ComplaintCancellationFeeProps } from '@/models/views/complaint/modal/ComplainCancellationFeeChangeModel'
import { complaintOrderCancelApi } from '@/services/api/complaint/ComplaintOrderCancelApi'
import ComplaintCancellationFeeChangeModal from '@/views/complaint/modal/ComplaintCancellationFeeChangeModal.vue'

export const useComplaintCancellationFeeChangeWrapperModal = () => {
  const handleSubmitChangeFee = async (claimKey: string, cancellationFee: string) => {
    const newFee: ComplaintCancellationFeeChangeModalRequest = {
      cancellationFee: cancellationFee,
      claimKey: claimKey
    }
    await complaintOrderCancelApi.putComplaintCancellationFee(newFee)
  }
  const modal = useModal<ComplaintCancellationFeeProps>()

  const { openModal: openConfirm, closeModalByPop: closeConfirmModal } = useModalConfirm()

  const { openModal: openNotification, closeModalByPop } = useModalNotification()

  const { setLoading } = useLoading()

  const openModal = (claimKey: string, lastPayAmount: string, callBack?: () => void) => {
    modal.showModal?.({
      component: ComplaintCancellationFeeChangeModal,
      props: {
        claimKey: claimKey,
        lastPayAmount: lastPayAmount,
        onCancel: modal.closeModalByPop,
        onConfirm: async (cancellationFee: string) => {
          openConfirm({
            content: '취소수수료를 변경하시겠습니까?',
            onConfirm: async () => {
              try {
                setLoading?.(true)
                closeConfirmModal?.()
                await handleSubmitChangeFee(claimKey, cancellationFee)
                setLoading?.(false)
                openNotification({
                  content: '취소수수료변경이 완료되었습니다.',
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
    openModal
  }
}
