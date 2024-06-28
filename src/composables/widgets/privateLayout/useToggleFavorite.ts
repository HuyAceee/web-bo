import { useThrottle } from '@/composables/common/useThrottle'
import { RouteRecordRawChildItem } from '@/models'
import { useTabsManagerStore } from '@/stores/tabsManager'
import { ref, watch } from 'vue'

export const useToggleFavorite = (
  favorites: {
    isActive?: boolean
  },
  handleSetFavorites: (id: number) => void
) => {
  const { pushTab } = useTabsManagerStore()
  const isActive = ref(favorites.isActive ?? false)

  const { throttle } = useThrottle()

  const handleToggleFavorite = throttle((id) => {
    handleSetFavorites(id as number)
  }, 500)

  const handlePushTab = (data: RouteRecordRawChildItem) => {
    pushTab({
      name: data.name ?? '',
      path: data.path,
      nameComponent: data.nameComponent ?? ''
    })
  }

  watch(
    () => favorites.isActive,
    (newActive) => {
      isActive.value = newActive ?? false
    },
    { immediate: true }
  )

  return {
    handleToggleFavorite,
    favorites,
    // hasFavorite,
    handlePushTab,
    // lisFavorites,
    isActive
  }
}
