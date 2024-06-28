import { useModal } from '@/composables/common'
import { MemberDetailBaseModel } from '@/models'
import MemberDetailBlackMemberRegistrationModal from '@/views/members/modal/MemberDetailBlackMemberRegistrationModal.vue'

export const useMemberDetailBlackMemberRegistrationModal = () => {
  const { closeModalByPop, showModal } = useModal()
  const openModal = (member: MemberDetailBaseModel, refreshCallback: () => void) => {
    showModal?.({
      component: MemberDetailBlackMemberRegistrationModal,
      props: {
        member,
        onRefresh: refreshCallback
      },
      events: {
        onClose: () => closeModalByPop?.()
      }
    })
  }
  return { openModal }
}
