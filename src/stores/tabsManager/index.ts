import { DASH_BOARD_CACHE, cloneArray, currentActiveStorage, listCacheStorage } from '@/common'
import { useStorage } from '@/composables'
import { TabMangerRecordModel } from '@/models/widgets/TabModel'
import { listRouteForwardPathFlat } from '@/router/private'
import { defineStore } from 'pinia'
import { computed, onMounted, reactive, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

interface TabManagerModel {
  nameComponent: string
  path: string
  name: string
  disabled?: boolean
}

const MAX_TAB = 11

export const useTabsManagerStore = defineStore('tabs-manager', () => {
  const [currentActiveInit, setCurrentActive] = useStorage<string>(currentActiveStorage)
  const [listCacheInit, setListCache] = useStorage<TabManagerModel[]>(listCacheStorage)
  const route = useRoute()
  const currentActive = ref(Number(currentActiveInit?.value ?? 0))
  const listCache = reactive<TabManagerModel[]>(listCacheInit?.value ?? [])

  function pushTab(tab: TabManagerModel) {
    const index = listCache.findIndex((item: TabManagerModel) => item.path.includes(tab.path))
    if (index > -1) {
      currentActive.value = index
      return
    }
    listCache.push(tab)
    currentActive.value = listCache.length - 1
    if (listCache.length < MAX_TAB) return
    listCache.shift()
  }

  function onCloseTab(index: number, callback: (arg: string) => void = () => {}) {
    if (index < currentActive.value) currentActive.value--
    const path = listCache[index].path
    listCache.splice(index, 1)
    if (path !== route.path) return
    if (!listCache.length) return callback('/')
    if (index <= listCache.length - 1) return callback(listCache[index].path)
    callback(listCache?.[index - 1]?.path)
  }

  function onHandleTabClose(index: number, callback: (arg: TabMangerRecordModel) => void) {
    const currentTabPath = listCache[index].path
    const copyListCache: TabManagerModel[] = cloneArray(listCache ?? [])
    copyListCache.splice(index, 1)
    let targetTabPath: string
    if (currentTabPath !== route.path) {
      targetTabPath = route.path
    } else if (!copyListCache.length) {
      targetTabPath = '/'
    } else if (index < copyListCache.length - 1) {
      targetTabPath = copyListCache?.[index]?.path
    } else {
      targetTabPath = copyListCache?.[index - 1]?.path
    }
    callback({
      index,
      currentPath: currentTabPath,
      targetPath: targetTabPath
    })
  }

  function onCloseAllTabs(callback: () => void) {
    callback()
    listCache.splice(listCache.length)
  }

  const handleChangeRouter = () => {
    let routePath = route.path
    if (routePath !== '/') {
      if (route.matched.length >= 2) {
        routePath = route.matched[1].path ?? route.path
      }
    } else {
      currentActive.value = -1
      return
    }
    const currentPath = listCacheInit?.value?.find((cache: TabManagerModel) => cache.path.includes(route.path))
    if (currentPath?.path !== route.fullPath) {
      const indexPath = listCacheInit?.value?.findIndex((cache: TabManagerModel) => cache.path.includes(route.path))
      if (typeof indexPath === 'number' && indexPath > -1 && listCacheInit && currentPath) {
        listCache.splice(indexPath, 1, {
          ...currentPath,
          path: route.fullPath
        })
      }
    }
    const itemPath = listRouteForwardPathFlat.find((routeItem) => routeItem.path.includes(routePath))
    if (!itemPath) {
      currentActive.value = -1
      return
    }
    if (currentPath) return
    const { name = '', nameComponent = '' } = itemPath
    pushTab({ name, path: route.fullPath, nameComponent })
  }

  const listComponent = computed(() => {
    return [...listCache, DASH_BOARD_CACHE].map((item) => item.nameComponent)
  })

  const updateTabActiveBy = (path?: string) => {
    const index = listCache.findIndex((cache: TabManagerModel) => cache.path.includes(path ?? ''))
    currentActive.value = index || 0
    handleChangeRouter()
  }

  watch(
    () => route.path,
    (newPath: string) => {
      updateTabActiveBy(newPath)
    }
  )

  onMounted(() => {
    updateTabActiveBy(route.path)
  })

  watch(listCache, (newList: TabManagerModel[]) => {
    setListCache(newList)
    setTimeout(() => {
      const element = document.getElementById('wf_single-tab-tablist')
      if (element) {
        element.scrollLeft = element.scrollWidth
      }
    }, 10)
  })

  watch(currentActive, (newCurrentActive: number) => {
    setCurrentActive(newCurrentActive)
  })

  return {
    onCloseTab,
    onCloseAllTabs,
    pushTab,
    onHandleTabClose,
    listCache,
    listComponent,
    currentActive
  }
})
