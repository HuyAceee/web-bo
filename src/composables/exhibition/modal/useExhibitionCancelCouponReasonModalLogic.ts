import { useModalConfirm, useModalNotification } from '@/composables/widgets'
import { ref } from 'vue'
import { ExhibitionCancelCouponReasonModalProps } from '@/models/views/exhibition/modal/ExhibitionCancelCouponReasonModalModel'
import { exhibitionCancelCouponReasonModalApi } from '@/services/api/exhibition/ExhibitionCancelCouponReasonModalApi'

export const useExhibitionCancelCouponReasonModalLogic = (props: ExhibitionCancelCouponReasonModalProps) => {
  const notificationModal = useModalNotification()
  const confirmModal = useModalConfirm()
  const reasonContents = ref('')
  const onRegister = () => {
    if (reasonContents.value === '') {
      notificationModal.openModal({
        content: '사유를 입력해주세요'
      })
    } else {
      confirmModal.openModal({
        content: '해당 쿠폰을 강제종료 하시겠습니까?',
        onConfirm() {
          updateCancelCoupon()
          notificationModal.openModal({
            content: '강제종료 되었습니다.',
            onAccept() {
              confirmModal.closeAllModal?.()
            }
          })
        }
      })
    }
  }
  const updateCancelCoupon = async () => {
    try {
      await exhibitionCancelCouponReasonModalApi.updateCancelCoupon(props.couponKey, reasonContents.value)
    } catch (e) {
      // error
    }
  }
  return { reasonContents, onRegister }
}
