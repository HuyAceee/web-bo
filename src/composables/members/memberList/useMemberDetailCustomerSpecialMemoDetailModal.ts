import { useModal } from '@/composables/common'
import { MemberCustomerSpecialInfoModel, MemberDetailBaseModel } from '@/models'
import MemberDetailCustomerSpecialInfoMemoDetailModal from '@/views/members/modal/MemberDetailCustomerSpecialInfoMemoDetailModal.vue'

export const useMemberDetailCustomerSpecialMemoDetailModal = () => {
  const { closeModalByPop, showModal } = useModal()
  const openModal = (member: MemberDetailBaseModel, data: MemberCustomerSpecialInfoModel) => {
    showModal?.({
      component: MemberDetailCustomerSpecialInfoMemoDetailModal,
      props: {
        member,
        data
      },
      events: {
        onClose: () => closeModalByPop?.()
      }
    })
  }
  return { openModal }
}
