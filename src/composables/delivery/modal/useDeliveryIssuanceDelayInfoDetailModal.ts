import { useModal } from '@/composables'
import { DeliveryIssuanceDelayInfoDetailProps } from '@/models/views/delivery/modal/DeliveryIssuanceDelayInfoDetailModel'
import DeliveryIssuanceDelayInfoDetailModal from '@/views/delivery/modal/DeliveryIssuanceDelayInfoDetailModal.vue'

export const useDeliveryIssuanceDelayInfoDetailModal = () => {
  const { showModal, closeModalByPop } = useModal()

  const onShowModal = (props: DeliveryIssuanceDelayInfoDetailProps) => {
    showModal?.({
      component: DeliveryIssuanceDelayInfoDetailModal,
      props: {
        onClose: closeModalByPop,
        receiverProductOrderKey: props.receiverProductOrderKey,
        issuanceDelayProcessingDateTime: props.issuanceDelayProcessingDateTime,
        manager: props.manager
      }
    })
  }

  return { onShowModal }
}
