import { useModal } from '@/composables'
import ExhibitionBannerGroupRegistrationModal from '@/views/exhibition/modal/ExhibitionBannerGroupRegistrationModal.vue'
import { ExhibitionBannerGroupModalModalProps } from '@/models/views/exhibition/modal/ExhibitionBannerGroupRegistrationModalModel'

export const useExhibitionBannerGroupRegistrationModal = () => {
  const { showModal, closeModalByPop } = useModal<ExhibitionBannerGroupModalModalProps>()

  const onShowModal = (bannerGroupKey?: string, callBack?: () => void) => {
    showModal?.({
      component: ExhibitionBannerGroupRegistrationModal,
      props: {
        onCancel: closeModalByPop,
        onSelect: callBack,
        bannerGroupKey: bannerGroupKey
      }
    })
  }

  return { openModal: onShowModal, closeModalByPop }
}
