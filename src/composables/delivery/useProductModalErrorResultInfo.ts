import { useModal } from '@/composables'
import { ErrorResultInfoDataModel } from '@/models'
import { ModalErrorResultInfo } from '@/components'
import { DeliveryHintModel } from '@/models/views/delivery/modal/DeliveryHintModel'
import { MemberRequestModalProps } from '@/models/views/members/modal/MemberRequestModel'

export const useProductModalErrorResultInfo = () => {
  const { showModal, closeAllModal, closeModalByPop } = useModal<MemberRequestModalProps>()

  const onShowModal = (data: ErrorResultInfoDataModel[], dataHint?: DeliveryHintModel[]) => {
    showModal?.({
      component: ModalErrorResultInfo,
      props: {
        data: data,
        dataHint: dataHint
      }
    })
  }

  return { onShowModal, closeAllModal, closeModalByPop }
}
