import { useModal } from '@/composables'
import DeliveryIssuanceDelayInfoModal from '@/views/delivery/modal/DeliveryIssuanceDelayInfoModal.vue'

export const useDeliveryIssuanceDelayInfoModal = () => {
  const { showModal, closeModalByPop } = useModal()

  const onShowModal = (receiverProductOrderKeys: string | number) => {
    showModal?.({
      component: DeliveryIssuanceDelayInfoModal,
      props: {
        onClose: closeModalByPop,
        receiverProductOrderKeys: receiverProductOrderKeys
      }
    })
  }

  return { onShowModal }
}
