import { useSiteMenuStore } from '@/stores/siteMenus/index'
import { AUTH_LOGIN_ROUTER, AUTH_USER_INFORMATION_ROUTER } from '@/common'
import { useButtonMenuBar, useHandleExpanderNavigation, useModal, useToggleNavigation } from '@/composables'
import { menuApi } from '@/services/api/menu/MenuApi'
import MenuFavoriteModal from '@/views/modal/MenuFavoriteModal.vue'
import { onBeforeMount, ref, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

export const useMainNavigation = () => {
  const { isShow, isShowNavigationFavorite, handleToggle, handleHideNavigationFavorite } = useToggleNavigation()
  const { isExpanderAll } = useHandleExpanderNavigation()
  const isOpenFavoritesModal = ref(false)
  const { currentIndexActive, handleActiveIndex } = useButtonMenuBar()
  const favorites = ref<number[]>([])
  let favoritesRef: number[] = []
  let timeoutRef: NodeJS.Timeout
  const { showModal, closeModalByPop } = useModal()
  const { handleGetSiteMenu } = useSiteMenuStore()

  const router = useRouter()

  const goToInformation = () => {
    router.push(AUTH_USER_INFORMATION_ROUTER)
  }

  const goToLogin = () => {
    router.push(AUTH_LOGIN_ROUTER)
  }

  onUnmounted(() => {
    handleExpanderAll(false)
  })

  const handleShowModalFavorite = () => {
    showModal?.({
      component: MenuFavoriteModal,
      props: {
        favorites: favorites.value,
        onClose: closeModalByPop
      },
      events: {
        onFavorite: handleAddFavorite
      }
    })
  }

  onBeforeMount(() => {
    handleGetSiteMenu()
    menuApi
      .getFavorite()
      .then((data) => {
        const listId = data.data.filter((item) => item.bookmarkStatus).map((item) => item.menuKey)
        favorites.value = listId
        favoritesRef = listId
      })
      .catch(() => {
        //
      })
  })

  const handleCloseModalFavorite = () => {
    isOpenFavoritesModal.value = false
  }

  const handlePostFavorite = (id: number) => {
    menuApi.postFavorite(id).catch(() => {
      //
    })
  }

  const handleDeleteFavorite = (id: number) => {
    menuApi.deleteFavorite(id).catch(() => {
      //
    })
  }

  const handleAddFavorite = (id: number) => {
    if (timeoutRef) clearTimeout(timeoutRef)
    if (!id) return
    const index = favoritesRef.findIndex((item) => item === id)
    if (index >= 0) {
      favoritesRef.splice(index, 1)
      handleDeleteFavorite(id)
    } else {
      favoritesRef.push(id)
      handlePostFavorite(id)
    }
    timeoutRef = setTimeout(() => {
      favorites.value = [...favoritesRef]
    }, 1000)
  }

  const handleClickBtnClose = () => {
    if (isShowNavigationFavorite.value) {
      handleHideNavigationFavorite()
      currentIndexActive.value = 0
      handleActiveIndex(0)
    }
    handleToggle()
  }

  const handleExpanderAll = (value: boolean) => {
    isExpanderAll.value = value
  }

  return {
    isExpanderAll,
    isShow,
    isShowNavigationFavorite,
    isOpenFavoritesModal,
    handleCloseModalFavorite,
    handleShowModalFavorite,
    handleClickBtnClose,
    handleExpanderAll,
    favorites,
    goToInformation,
    goToLogin,
    handleAddFavorite,
    handleDeleteFavorite
  }
}
