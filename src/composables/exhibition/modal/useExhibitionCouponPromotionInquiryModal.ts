import { useModal } from '@/composables'
import {
  ExhibitionCouponPromotionInquiryProps,
  ExhibitionCouponPromotionInquiryTableModel
} from '@/models/views/exhibition/modal/ExhibitionCouponPromotionInquiryModel'
import ExhibitionCouponPromotionInquiryModal from '@/views/exhibition/modal/ExhibitionCouponPromotionInquiryModal.vue'

export const useExhibitionCouponPromotionInquiryModal = () => {
  const { showModal, closeModalByPop } = useModal<ExhibitionCouponPromotionInquiryProps>()
  const onShowModal = (callback?: (value: ExhibitionCouponPromotionInquiryTableModel[]) => void) => {
    showModal?.({
      component: ExhibitionCouponPromotionInquiryModal,
      props: {
        onClose: closeModalByPop,
        onSelect: callback
      }
    })
  }

  return { onShowModal, closeModalByPop }
}
