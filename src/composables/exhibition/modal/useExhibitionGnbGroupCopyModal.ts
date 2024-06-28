import { useModal } from '@/composables'
import ExhibitionGNBGroupCopyModal from '@/views/exhibition/modal/ExhibitionGNBGroupCopyModal.vue'
import { ExhibitionGnbGroupCopyModalProps } from '@/models/views/exhibition/modal/ExhibitionGnbGroupCopyModalModel'

export const useExhibitionGnbGroupCopyModal = () => {
  const modalTable = useModal<ExhibitionGnbGroupCopyModalProps>()

  const openModal = (callBack?: () => void) => {
    modalTable.showModal?.({
      component: ExhibitionGNBGroupCopyModal,
      props: {
        onCancel: modalTable.closeModalByPop,
        onSelect: callBack
      }
    })
  }

  return { openModal }
}
