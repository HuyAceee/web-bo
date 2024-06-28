import { useModal } from '@/composables/common'
import ExhibitionCornerConnectionModal from '@/views/exhibition/modal/ExhibitionCornerConnectionModal.vue'

export const useExhibitionCornerConnectionModal = () => {
  const { showModal, closeModalByPop } = useModal()

  const onShowModal = (id: number) => {
    showModal?.({
      component: ExhibitionCornerConnectionModal,
      props: {
        onClose: () => {
          closeModalByPop?.()
        },
        id
      }
    })
  }

  return { onShowModal, closeModalByPop }
}
