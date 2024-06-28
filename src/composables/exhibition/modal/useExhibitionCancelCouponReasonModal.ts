import { useModal } from '@/composables/common'
import ExhibitionCancelCouponReasonModal from '@/views/exhibition/modal/ExhibitionCancelCouponReasonModal.vue'

export const useExhibitionCancelCouponReasonModal = () => {
  const { showModal, closeModalByPop } = useModal()

  const onShowModal = (couponKey: string) => {
    showModal?.({
      component: ExhibitionCancelCouponReasonModal,
      props: {
        onClose: () => {
          closeModalByPop?.()
        },
        couponKey
      }
    })
  }

  return { onShowModal, closeModalByPop }
}
