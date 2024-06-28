import { useModal } from '@/composables/common'
import ExhibitionSpecialExhibitionConnectionManagementPopup from '@/views/exhibition/exhibitionContent/ExhibitionSpecialExhibitionConnectionMngtPopup.vue'
import { ExhibitionContentSpecialConnectionManagementPopupProps } from '@/models/views/exhibition/exhibitionContent/ExhibitionSpecialConnectionManagementModel'

export const useExhibitionSpecialConnectionManagementModal = () => {
  const { showModal, closeModalByPop } = useModal()

  const openModal = (props?: ExhibitionContentSpecialConnectionManagementPopupProps, events?: {}) => {
    showModal?.({
      component: ExhibitionSpecialExhibitionConnectionManagementPopup,
      props,
      events: {
        ...events,
        close: () => closeModalByPop?.()
      }
    })
  }

  return {
    openModal,
    closeModalByPop
  }
}
