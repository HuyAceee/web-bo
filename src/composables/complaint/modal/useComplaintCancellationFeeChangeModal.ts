import { useModalNotification } from '@/composables/widgets'
import { ComplaintCancellationFeeModalModel } from '@/models/views/complaint/modal/ComplainCancellationFeeChangeModel'
import { ref } from 'vue'

export const useComplaintCancellationFeeChangeModal = (props: ComplaintCancellationFeeModalModel) => {
  const newCancellationFee = ref()

  const { openModal: openNotification } = useModalNotification()

  const handleConfirm = async () => {
    if (!newCancellationFee.value) {
      openNotification({
        content: '변경 취소수수료를 입력해 주세요.'
      })
    } else if (parseInt(newCancellationFee.value) > props.lastPayAmount) {
      openNotification({
        content: '취소수수료는 최종결제금액보다 클 수 없습니다. 다시 확인해 주세요.'
      })
    } else {
      props.onConfirm?.(newCancellationFee.value)
    }
  }

  return {
    handleConfirm,
    newCancellationFee
  }
}
