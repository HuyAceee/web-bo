import { ProductTab } from '@/models/views'
import ProductTicketBaseInfoPage from '@/views/products/ticketProduct/ProductTicketBaseInfoPage.vue'
import ProductTicketExhibitionInfoPage from '@/views/products/ticketProduct/ProductTicketExhibitionInfoPage.vue'
import ProductTicketMoreInfoPage from '@/views/products/ticketProduct/ProductTicketMoreInfoPage.vue'
import ProductTicketOptionsStockPage from '@/views/products/ticketProduct/ProductTicketOptionsStockPage.vue'
import ProductTicketProvisionNoticePage from '@/views/products/ticketProduct/ProductTicketProvisionNoticePage.vue'
import ProductTicketReleaseInfoPage from '@/views/products/ticketProduct/ProductTicketReleaseInfoPage.vue'
import ProductTicketSalesPage from '@/views/products/ticketProduct/ProductTicketSalesPage.vue'
import { TabViewChangeEvent } from 'primevue/tabview'
import { reactive, ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export const useProductTicketRegistration = () => {
  const route = useRoute()
  const router = useRouter()
  const editPathRoute = 'edit'
  const tabData = [
    { name: ProductTab.BASE_INFORMATION, component: ProductTicketBaseInfoPage, header: '기본정보', disabled: false },
    { name: ProductTab.EXHIBITION, component: ProductTicketExhibitionInfoPage, header: '전시정보', disabled: false },
    { name: ProductTab.SALES, component: ProductTicketSalesPage, header: '판매정보', disabled: false },
    { name: ProductTab.OPTIONS_STOCK, component: ProductTicketOptionsStockPage, header: '옵션/재고', disabled: false },
    { name: ProductTab.RELEASE, component: ProductTicketReleaseInfoPage, header: '발급정보', disabled: false },
    { name: ProductTab.MORE_INFORMATION, component: ProductTicketMoreInfoPage, header: '상세정보', disabled: false },
    { name: ProductTab.PROVISION_NOTICE, component: ProductTicketProvisionNoticePage, header: '상품정보제공고시', disabled: false }
  ]

  const isCreation = !route.path.includes(editPathRoute)
  const tabPanelProps = reactive(
    tabData.map((item) => {
      return { header: item.header, disabled: item?.disabled === true }
      // return { header: item.header }
    })
  )

  const searchTabIndex = (tab?: string) => {
    const tabIndex = tabData.findIndex((item) => item.name === tab)
    return tabIndex > 0 ? tabIndex : 0
  }

  const currentActive = ref(searchTabIndex(route.query.tab as string))

  onMounted(() => {
    if (isCreation) {
      // currentActive.value = 0
      // router.push({
      //   query: {
      //     ...route.query,
      //     tab: ProductTab.BASE_INFORMATION
      //   }
      // })
      for (let index = currentActive.value + 1; index < tabData.length; index++) {
        tabPanelProps[index].disabled = true
      }
    }
  })

  watch(
    () => route.query.tab,
    (newTab) => {
      currentActive.value = searchTabIndex(newTab as string)
      if (isCreation) {
        tabPanelProps[currentActive.value].disabled = false
      }
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
    handleTabChange,
    tabData,
    tabPanelProps
  }
}
