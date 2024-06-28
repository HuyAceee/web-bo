import { useHandleExpanderNavigationPreview } from '@/composables'
import { useTabsManagerStore } from '@/stores/tabsManager'

export const useModalFavorite = () => {
  const { refParent, handleToggle, isExpanderAll } = useHandleExpanderNavigationPreview('wf-frame1000002229-item ')
  const { pushTab } = useTabsManagerStore()

  const handleCloseModal = (callback: () => void, data?: any) => {
    isExpanderAll.value = false
    callback()
    if (data) {
      pushTab(data)
    }
  }

  const handleExpanderAll = (value: boolean) => {
    isExpanderAll.value = value
  }

  return {
    refParent,
    isExpanderAll,
    handleToggle,
    handleCloseModal,
    handleExpanderAll
  }
}
