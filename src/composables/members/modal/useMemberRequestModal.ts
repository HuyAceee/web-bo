import { useModal } from '@/composables'
import {
  MemberRequestModalProps,
  MemberRequestSearchModel,
  MemberRequestTableModel,
  MemberSearchTableModel
} from '@/models/views/members/modal/MemberRequestModel'
import { MemberSearchType } from '@/models/views/members/modal/MemberSearchTypeModel'
import MemberRequestModal from '@/views/members/modal/MemberRequestModal.vue'
import { ref } from 'vue'

export const useMemberRequestModal = (searchType?: MemberSearchType) => {
  const modalTable = useModal<MemberRequestModalProps>()
  const searchText = ref()
  const searchResData = ref<MemberRequestSearchModel>({ memberKey: '', memberName: '' })

  const openModal = (callback?: (value: MemberSearchTableModel | MemberRequestTableModel) => void) => {
    modalTable.showModal?.({
      component: MemberRequestModal,
      props: {
        onCancel: modalTable.closeModalByPop,
        onSelect: onSelect,
        onSelectRow: callback,
        searchInput: searchText.value,
        searchResData: searchResData.value,
        searchType: searchType
      }
    })
  }

  const onSelect = (value: MemberRequestSearchModel) => {
    searchText.value = value.memberKey ? `${value.memberKey} (${value.memberName})` : ''
    searchResData.value = value
    modalTable.closeModalByPop?.()
  }

  return { openModal, searchText, searchResData }
}
