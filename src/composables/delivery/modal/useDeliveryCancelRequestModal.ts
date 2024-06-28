import { useModal } from '@/composables'
import DeliveryCancelRequestModal from '@/views/delivery/modal/DeliveryCancelRequestModal.vue'

export const useDeliveryCancelRequestModal = () => {
  const modalTable = useModal()
  const onShowModal = (id?: string | number) => {
    modalTable.showModal?.({
      component: DeliveryCancelRequestModal,
      props: {
        onCancel: modalTable?.closeModalByPop,
        id
      }
    })
  }

  return {
    onShowModal
  }
}
