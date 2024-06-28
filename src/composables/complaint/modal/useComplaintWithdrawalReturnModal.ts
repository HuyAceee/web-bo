import { ref } from 'vue'

export const useComplaintWithdrawalReturnModal = (/** props: ConfirmModalProps */) => {
  const reasonRefuse = ref('')

  return {
    reasonRefuse
  }
}
