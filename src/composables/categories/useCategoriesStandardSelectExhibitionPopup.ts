import { useModal } from '@/composables'
import CategoriesStandardSelectExhibitionPopup from '@/views/categories/standard/CategoriesStandardSelectExhibitionPopup.vue'
import { TreeNode, TreeSelectionKeys } from 'primevue/tree'
import { ref } from 'vue'
interface CategoriesStandardSelectExhibitionPopupProps {
  closeModal?: () => void
  onSelect?: (value: TreeNode) => void
  selectedKey?: TreeSelectionKeys
}

export const useCategoriesStandardSelectExhibitionPopup = (listKey?: TreeSelectionKeys) => {
  const modal = useModal<CategoriesStandardSelectExhibitionPopupProps>()
  const selectedNode = ref()

  const openModal = () => {
    modal.showModal?.({
      component: CategoriesStandardSelectExhibitionPopup,
      props: {
        closeModal: modal.closeModalByPop,
        onSelect: (value?: TreeNode) => {
          selectedNode.value = value
          modal.closeModalByPop?.()
        },
        selectedKey: listKey
      }
    })
  }

  return { ...modal, openModal, selectedNode }
}
