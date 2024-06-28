import { useModal } from '@/composables'
import DeliveryCancelSellModal from '@/views/delivery/modal/DeliveryCancelSellModal.vue'

export const useDeliveryCancelSellModal = () => {
  const { showModal, closeModalByPop } = useModal()

  const openModal = (orderKey: number, receiverProductOrderKeys: string) => {
    showModal?.({
      component: DeliveryCancelSellModal,
      props: {
        onCancel: closeModalByPop,
        orderKey: orderKey,
        receiverProductOrderKeys: receiverProductOrderKeys
      }
    })
  }

  return { openModal }
}
