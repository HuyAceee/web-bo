import { useModal } from '@/composables/common'
import { useModalNotification } from '@/composables/widgets'
import { MemberDetailBaseModel } from '@/models'
import { memberRemarkApi } from '@/services/api/members/MemberRemarkApi'
import MemberDetailCustomerSpecialInfoMemoRegistrationModal from '@/views/members/modal/MemberDetailCustomerSpecialInfoMemoRegistrationModal.vue'

export const useMemberDetailCustomerSpecialMemoRegistrationModal = (callback?: () => void) => {
  const { closeModalByPop, showModal } = useModal()
  const { openModal: openNotification, closeAllModal } = useModalNotification()
  const openModal = (member: MemberDetailBaseModel) => {
    showModal?.({
      component: MemberDetailCustomerSpecialInfoMemoRegistrationModal,
      props: { member },
      events: {
        onClose: () => closeModalByPop?.(),
        onSave
      }
    })
  }

  const onSave = async (memberKey: string, message: string) => {
    try {
      await memberRemarkApi.postItem(memberKey, message)
      // save api
      openNotification({
        content: '저장이 완료되었습니다.',
        onAccept: () => {
          callback?.()
          closeAllModal?.()
        }
      })
    } catch (error) {
      /* empty */
    }
  }
  return { openModal }
}
