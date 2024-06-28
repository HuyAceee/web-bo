import { useModal } from '@/composables'
import { mainContractInfoApi } from '@/services/api/main/MainContractInfoApi'
import { MainContractInfoResponseModel } from '@/models/services/responses/main/modal/MainContractInfoResponse'
import MenuPlayInformationModal from '@/views/modal/MenuPlayInformationModal.vue'

export const useMainContractInfoModal = (onCloseModal?: () => void) => {
  const { showModal, closeModalByPop } = useModal()

  const onShowModal = (data: MainContractInfoResponseModel[]) => {
    showModal?.({
      component: MenuPlayInformationModal,
      props: {
        onClose: () => {
          onCloseModal?.()
          closeModalByPop?.()
        },
        data: data
      }
    })
  }

  const handleShowModal = () => {
    mainContractInfoApi.getChargersRepresentative().then((value) => {
      onShowModal(value.data)
    })
  }

  return { onShowModal, handleShowModal }
}
