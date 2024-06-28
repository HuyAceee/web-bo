import { COMPANY_CUSTOMER_LIST } from '@/common'
import { CustomerDetailTab } from '@/models/views/company/customerDetail'
import CompanyContractInformationPageVue from '@/views/company/customerManagement/detail/CompanyContractInformationPage.vue'
import CompanyCustomerInfomationPageVue from '@/views/company/customerManagement/detail/CompanyCustomerInfomationPage.vue'
import WrapRouteView from '@/views/router/WrapRouteView.vue'
import { TabViewChangeEvent } from 'primevue/tabview'
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export const useCustomerDetail = () => {
  const route = useRoute()
  const router = useRouter()
  const tabData = [
    { name: CustomerDetailTab.INFORMATION, component: CompanyCustomerInfomationPageVue, header: '기업정보' },
    { name: CustomerDetailTab.CONTRACT, component: CompanyContractInformationPageVue, header: '계약정보' },
    { name: CustomerDetailTab.ACCOUNT, component: WrapRouteView, header: '관리자 계정' }
  ]
  let customerKey: string

  onMounted(() => {
    if (!route.query.customerKey) {
      router.push(COMPANY_CUSTOMER_LIST)
    }
    customerKey = route.query.customerKey as string
  })

  const tabPanelProps = tabData.map((item) => {
    return { header: item.header }
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

  watch(
    () => route.query.customerKey,
    (value) => {
      customerKey = value as string
    }
  )

  const handleTabChange = (event: TabViewChangeEvent) => {
    currentActive.value = event.index
    router.push({
      query: {
        tab: tabData[event.index].name,
        customerKey: customerKey
      }
    })
  }
  return {
    currentActive,
    handleTabChange,
    tabData,
    tabPanelProps
  }
}
