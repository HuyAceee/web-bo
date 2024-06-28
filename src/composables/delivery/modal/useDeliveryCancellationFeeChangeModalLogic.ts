import { useModal, useModalConfirm, useModalNotification } from '@/composables'
import { ref } from 'vue'
import { DeliveryCancellationFeeChangeProps } from '@/models/views/delivery/modal/DeliveryCancellationFeeChangeModel'
import { deliveryCancellationFeeChangeModalApi } from '@/services/api/delivery/DeliveryCancellationFeeChangeModalApi'

export const useDeliveryCancellationFeeChangeModalLogic = (props: DeliveryCancellationFeeChangeProps) => {
  const notificationModal = useModalNotification()
  const { closeModalByPop } = useModal()
  const confirmModal = useModalConfirm()
  const changedFee = ref<number>()
  const handlerChangeFee = () => {
    if (!changedFee.value) {
      return emptyFeeNotify()
    } else if (changedFee.value > props.finalPaymentAmount) {
      return tooHighFeeNotify()
    }

    confirmModal.openModal({
      content: '취소수수료를 변경하시겠습니까?',
      onConfirm() {
        confirmModal?.closeModalByPop?.()
        fechApiClaimkey()
          .then(() => {
            notificationModal.openModal({
              content: '취소수수료변경이 완료되었습니다.',
              onAccept() {
                props.onCancel?.()
                props.onCheck?.(changedFee.value ?? 0)
                closeModalByPop?.()
                closeModalByPop?.()
              }
            })
          })
          .catch(() => {
            // error
          })
      }
    })
  }
  const fechApiClaimkey = () => {
    const cancelData = { claimKey: props?.claimKey, cancellationFee: changedFee.value as number }
    return deliveryCancellationFeeChangeModalApi.updateCancellationFee(cancelData)
  }
  const emptyFeeNotify = () => {
    notificationModal.openModal({
      content: '변경 취소수수료를 입력해 주세요.'
    })
  }

  const tooHighFeeNotify = () => {
    notificationModal.openModal({
      content: '취소수수료는 최종결제금액보다 클 수 없습니다.\n' + '다시 확인해 주세요.\n'
    })
  }

  return {
    changedFee,
    handlerChangeFee
  }
}
