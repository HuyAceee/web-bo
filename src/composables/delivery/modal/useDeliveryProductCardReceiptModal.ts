import { useModal } from '@/composables'
import DeliveryProductCardReceiptModal from '@/views/delivery/modal/DeliveryProductCardReceiptModal.vue'

export const useDeliveryProductCardReceiptModal = () => {
  const modalTable = useModal()

  const onShowModal = (id?: string) => {
    modalTable.showModal?.({
      component: DeliveryProductCardReceiptModal,
      props: {
        onCancel: modalTable?.closeModalByPop,
        id
      }
    })
  }

  return { onShowModal }
}
