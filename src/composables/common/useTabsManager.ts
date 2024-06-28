import { useTabsManagerStore } from '@/stores/tabsManager'
import { useRouter } from 'vue-router'

export const useTabManager = () => {
  const router = useRouter()
  const tabsManagerStore = useTabsManagerStore()
  const { onCloseTab } = tabsManagerStore
  const closeTabByIndex = (index: number) => {
    onCloseTab(index, (path: string) => {
      router.push(path)
    })
  }

  return {
    closeTabByIndex
  }
}
