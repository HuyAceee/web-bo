import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PartnerManagermentDetailTabPage from '@/views/partner/partnerManagementDetail/tab/PartnerManagermentDetailTabPage.vue'
import PartnerContractInformationPage from '@/views/partner/partnerManagementDetail/tab/PartnerContractInformationPage.vue'
import { WrapRouteView } from '@/views'
import { TabViewChangeEvent } from 'primevue/tabview'


export const PartnerTab = {
  NONE: '',
  CONTRACT: 'contract',
  TRANSPORT: 'transport',
  SUB_COMPANY: 'sub-company',
}

export const usePartnerManagementDetail = () => {
  const route = useRoute()
  const router = useRouter()
  const tabData = [
    { name: PartnerTab.NONE, component: PartnerManagermentDetailTabPage, header: '기업정보' },
    { name: PartnerTab.CONTRACT, component: PartnerContractInformationPage, header: '계약정보' },
    { name: PartnerTab.TRANSPORT, component: WrapRouteView, header: '배송정보' },
    { name: PartnerTab.SUB_COMPANY, component: WrapRouteView, header: '하위업체' }
  ]

  const searchTabIndex = (tab?: string) => {
    const tabIndex = tabData.findIndex((item) => item.name === tab)
    return tabIndex > 0 ? tabIndex : 0
  }

  const currentActive = ref(searchTabIndex(route.query.tab as string))

  const tabPanelProps = tabData.map((item) => {
    return { header: item.header }
  })

  watch(
    () => route.query.tab,
    (value) => {
      currentActive.value = searchTabIndex(value as string)
    }
  )

  const handleTabChange = (event: TabViewChangeEvent) => {
    currentActive.value = event.index
    router.push({
      query: {
        ...route.query,
        tab: tabData[event.index].name
      }
    })
  }

  return {
    currentActive,
    tabData,
    handleTabChange,
    tabPanelProps
  }
}
