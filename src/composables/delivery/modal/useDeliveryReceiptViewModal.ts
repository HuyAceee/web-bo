import { useModal } from '@/composables/common'
import DeliveryReceiptViewModal from '@/views/delivery/modal/DeliveryReceiptViewModal.vue'

export const useDeliveryReceiptViewModal = () => {
  const { showModal, closeModalByPop } = useModal()

  const onShowModal = (orderKey?: string | number) => {
    showModal?.({
      component: DeliveryReceiptViewModal,
      props: {
        onCancel: closeModalByPop,
        orderKey
      }
    })
  }

  
  return {
    onShowModal
  }
}
