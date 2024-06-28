import { useModalConfirm } from '@/composables/widgets'
import { WrapRouteView } from '@/views'
import OperatingPOSiteManagementPageVue from '@/views/operating/operatingManagement/site/OperatingPOSiteManagementPage.vue'
import { TabViewChangeEvent } from 'primevue/tabview'
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
export const isDirtyForm = ref<boolean>(false)
export const useOperatingMenuSite = () => {
  const { openModal: openModalConfirm } = useModalConfirm()
  const route = useRoute()
  const router = useRouter()
  const tabData = [
    { name: 'BO', component: OperatingPOSiteManagementPageVue, header: 'BO' },
    { name: 'PO', component: WrapRouteView, header: 'PO' },
    { name: 'CO', component: WrapRouteView, header: 'CO' }
  ]
  const tabPanelProps = tabData.map((item) => {
    return { header: item.header, disabled: true }
  })
  const searchTabIndex = (tab?: string) => {
    const tabIndex = tabData.findIndex((item) => item.name === tab)
    return tabIndex > 0 ? tabIndex : 0
  }
  const currentActive = ref(searchTabIndex(route.query.tab as string))
  watch(
    () => route.query.tab,
    (value) => {
      currentActive.value = searchTabIndex(value as string)
    }
  )
  const handleTabChange = (event: TabViewChangeEvent) => {
    if (isDirtyForm.value) {
      openModalConfirm({
        content: '메뉴 등록 중 플랫폼을 변경할 경우 정보가 저장되지 않습니다. 계속하시겠습니까?',
        onConfirm: () => {
          currentActive.value = event.index
          router.push({
            query: {
              tab: tabData[event.index].name
            }
          })
          isDirtyForm.value = false
        }
      })
    } else {
      currentActive.value = event.index
      router.push({
        query: {
          tab: tabData[event.index].name
        }
      })
      isDirtyForm.value = false
    }
  }
  return {
    currentActive,
    handleTabChange,
    tabData,
    tabPanelProps
  }
}