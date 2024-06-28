import { ref } from 'vue'

export const useComplaintExchangeWithdrawalModal = ( /*props: ConfirmModalProps*/) => {
  const reasonRefuse = ref('')

  return {
    reasonRefuse
  }
}
