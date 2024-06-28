import { useModal } from '@/composables'
import MemberWelfarePointUsageDetailsModal from '@/views/members/modal/MemberWelfarePointUsageDetailsModal.vue'

export const useMemberWelfarePointUsageDetail = () => {
  const modal = useModal()

  const handleOpenModal = (memberKey: string) => {
    modal.showModal?.({
      component: MemberWelfarePointUsageDetailsModal,
      props: {
        onClose: modal.closeModalByPop,
        memberKey: memberKey
      }
    })
  }
  return {
    handleOpenModal
  }
}
