import { ref } from 'vue'

const isShow = ref(true)
const isShowNavigationFavorite = ref(false)

export const useToggleNavigation = () => {
  const handleToggle = () => {
    isShow.value = !isShow.value
  }

  const handleHideNavigationFavorite = () => {
    isShowNavigationFavorite.value = false
    isShow.value = true
  }

  const handleShowNavigationFavorite = () => {
    isShowNavigationFavorite.value = true
    isShow.value = true
  }

  return {
    handleToggle,
    isShow,
    handleShowNavigationFavorite,
    handleHideNavigationFavorite,
    isShowNavigationFavorite
  }
}
