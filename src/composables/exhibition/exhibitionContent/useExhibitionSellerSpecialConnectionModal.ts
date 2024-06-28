import { useModal } from '@/composables/common'
import ExhibitionSellerSpecialConnectionMngtPopup from '@/views/exhibition/exhibitionContent/ExhibitionSellerSpecialConnectionMngtPopup.vue'
import { ExhibitionSellerSpecialConnectionMngtPopupProps } from '@/models/views/exhibition/exhibitionContent/ExhibitionConnectionMngtModel'

export const useExhibitionSellerSpecialConnectionModal = () => {
  const { showModal, closeModalByPop } = useModal()

  const openModal = (props?: ExhibitionSellerSpecialConnectionMngtPopupProps, events?: {}) => {
    showModal?.({
      component: ExhibitionSellerSpecialConnectionMngtPopup,
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
