import { useModal } from '@/composables'
import { DeliveryCancellationFeeChangeProps } from '@/models/views/delivery/modal/DeliveryCancellationFeeChangeModel'
import DeliveryCancellationFeeChangeModal from '@/views/delivery/modal/DeliveryCancellationFeeChangeModal.vue'

export const useDeliveryCancellationFeeChangeModal = () => {
  const modalTable = useModal()

  const onShowModal = (params: DeliveryCancellationFeeChangeProps) => {
    modalTable.showModal?.({
      component: DeliveryCancellationFeeChangeModal,
      props: {
        cancellationFee: params.cancellationFee,
        finalPaymentAmount: params.finalPaymentAmount,
        claimKey: params.claimKey,
        onCancel: modalTable?.closeModalByPop,
        onCheck: params.onCheck
      }
    })
  }

  return { onShowModal }
}
