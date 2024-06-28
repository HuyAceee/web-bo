import { useButtonMenuBar, useHandleExpanderNavigation, useModal, useToggleNavigation } from '@/composables'
import MenuManualModal from '@/views/modal/MenuManualModal.vue'
import { useMainContractInfoModal } from '@/composables/main/modal/useMainContractInfoModal'

export const useWelfareSidebar = () => {
  const { handleToggle, handleHideNavigationFavorite, handleShowNavigationFavorite, isShowNavigationFavorite } = useToggleNavigation()
  const { isExpanderAll } = useHandleExpanderNavigation()
  const { currentIndexActive, handleActiveIndex } = useButtonMenuBar()
  const { showModal, closeModalByPop } = useModal()
  const { handleShowModal } = useMainContractInfoModal(() => {
    handleActiveIndex(currentIndexActive.value)
  })

  const handleActiveBtn = (index: number) => {
    if (currentIndexActive.value === 0 || index === 0 || index === 1) {
      // handleActiveIndex(index)
      currentIndexActive.value = index
    }
  }

  const listActionBtn = {
    _0: () => {
      handleActiveBtn(0)
      if (isShowNavigationFavorite.value) {
        handleHideNavigationFavorite()
      } else {
        handleToggle()
      }
    },
    _1: () => {
      if (!isShowNavigationFavorite.value) {
        currentIndexActive.value = 1
        handleShowNavigationFavorite()
      } else {
        currentIndexActive.value = 0
        handleActiveIndex(0)
        handleHideNavigationFavorite()
      }
      isExpanderAll.value = false
    },
    _2: () => {
      // showModalManual()
      // currentIndexActive.value = 2
      handleActiveIndex(2)
      showModal?.({
        component: MenuManualModal,
        props: {
          onClose: () => {
            closeModalByPop?.()
            handleActiveIndex(currentIndexActive.value)
          }
        }
      })
      isExpanderAll.value = false
    },
    _3: () => {
      // currentIndexActive.value = 3
      handleActiveIndex(3)
      handleShowModal()
      isExpanderAll.value = false
    }
  }

  const handleClick = (e: MouseEvent, index: number) => {
    handleActiveIndex(index)
    const key = `_${index}` as '_0'
    listActionBtn?.[key]?.()
  }

  return {
    currentIndexActive,
    handleClick,
    handleActiveIndex
  }
}
