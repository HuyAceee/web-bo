import { useModal } from '@/composables'
import DeliveryProductCashReceiptModal from '@/views/delivery/modal/DeliveryProductCashReceiptModal.vue'

export const useDeliveryProductCashReceiptModal = () => {
  const modalTable = useModal()

  const onShowModal = (id?: string) => {
    modalTable.showModal?.({
      component: DeliveryProductCashReceiptModal,
      props: {
        onCancel: modalTable?.closeModalByPop,
        id
      }
    })
  }

  return { onShowModal }
}
