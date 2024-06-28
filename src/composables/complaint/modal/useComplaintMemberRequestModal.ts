import { useModal } from '@/composables'
import { ComplaintResearchMemberType } from '@/models/views/complaint/modal/ComplainOrderCancelModel'
import { ComplaintResearchMemberModalProps, ComplaintResearchMemberModel } from '@/models/views/complaint/modal/ComplainResearchMemberModel'
import ComplaintResearchMemberModal from '@/views/complaint/modal/ComplaintResearchMemberModal.vue'
import { ref } from 'vue'

export const useComplaintMemberRequestModal = (searchType?: ComplaintResearchMemberType) => {
  const openTableModal = useModal<ComplaintResearchMemberModalProps>()
  const searchText = ref()
  const searchResData = ref<ComplaintResearchMemberModel>({ memberKey: '', memberName: '' })
  const openModal = () => {
    openTableModal.showModal?.({
      component: ComplaintResearchMemberModal,
      props: {
        onCancel: openTableModal.closeModalByPop,
        onSelect: onSelect,
        searchInput: searchText.value,
        searchResData: searchResData.value,
        searchType: searchType
      }
    })
  }
  const onSelect = (value: ComplaintResearchMemberModel) => {
    searchText.value = value.memberKey ? `${value.memberKey} (${value.memberName})` : ''
    searchResData.value = value
    openTableModal.closeModalByPop?.()
  }

  return { openModal, searchText, searchResData }
}
