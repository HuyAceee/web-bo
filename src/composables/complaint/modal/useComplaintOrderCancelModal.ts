import { ref } from 'vue'
import { useModalNotification } from '@/composables/widgets'
import { ComplaintOrderCancelModalModel } from '@/models/views/complaint/modal/ComplainOrderCancelModel'

export const useComplaintOrderCancelModal = (props: ComplaintOrderCancelModalModel) => {
  const { openModal: openNotification } = useModalNotification()
  const orderCancelWithdrawalReason = ref()

  const handleConfirm = async () => {
    if (!orderCancelWithdrawalReason.value) {
      openNotification({
        content: '취소 철회 사유를 입력해 주세요.'
      })
    } else {
      props.onConfirm?.(orderCancelWithdrawalReason.value)
    }
  }

  const updateValueReason = (value: string) => {
    orderCancelWithdrawalReason.value = value
  }

  return {
    orderCancelWithdrawalReason,
    handleConfirm,
    updateValueReason
  }
}
