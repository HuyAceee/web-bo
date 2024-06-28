import { useModal } from '@/composables'
import { DeliveryDetailModalProps } from '@/models/views/delivery/modal/DeliveryDetailModalModel'
import DeliveryTicketProductDetailModal from '@/views/delivery/modal/DeliveryTicketProductDetailModal.vue'

export const useDeliveryTicketProductModalDetail = () => {
  const modalTable = useModal<DeliveryDetailModalProps>()

  const openModal = (orderKey: string | number) => {
    modalTable.showModal?.({
      component: DeliveryTicketProductDetailModal,
      props: {
        onCancel: modalTable.closeModalByPop,
        orderKey
      }
    })
  }

  return { ...modalTable, openModal }
}
