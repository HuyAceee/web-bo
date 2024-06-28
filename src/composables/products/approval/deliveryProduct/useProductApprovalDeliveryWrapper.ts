import { ProductTab } from '@/models/views'
import ProductApprovalDeliveryExhibitionBaseInfoPage from '@/views/products/approval/deliveryProduct/ProductApprovalDeliveryExhibitionBaseInfoPage.vue'
import ProductApprovalDeliveryExhibitionInfoPage from '@/views/products/approval/deliveryProduct/ProductApprovalDeliveryExhibitionInfoPage.vue'
import ProductApprovalDeliveryProvisionNoticePage from '@/views/products/approval/deliveryProduct/ProductApprovalDeliveryProvisionNoticePage.vue'
import ProductApprovalDeliverySalesPage from '@/views/products/approval/deliveryProduct/ProductApprovalDeliverySalesPage.vue'
import ProductApprovalDeliveryDetailPage from '@/views/products/approval/deliveryProduct/ProductApprovalDeliveryDetailPage.vue'
import ProductApprovalDeliveryOptionStockPage from '@/views/products/approval/deliveryProduct/ProductApprovalDeliveryOptionStockPage.vue'
import ProductApprovalDeliveryMoreInfoPage from '@/views/products/approval/deliveryProduct/ProductApprovalDeliveryMoreInfoPage.vue'

import { TabViewChangeEvent } from 'primevue/tabview'
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export const useProductApprovalDeliveryWrapper = () => {
  const route = useRoute()
  const router = useRouter()
  const tabData = [
    { name: ProductTab.BASE_INFORMATION, component: ProductApprovalDeliveryExhibitionBaseInfoPage, header: '기본정보' },
    { name: ProductTab.EXHIBITION, component: ProductApprovalDeliveryExhibitionInfoPage, header: '전시정보' },
    { name: ProductTab.SALES, component: ProductApprovalDeliverySalesPage, header: '판매정보' },
    { name: ProductTab.OPTIONS_STOCK, component: ProductApprovalDeliveryOptionStockPage, header: '옵션/재고' },
    { name: ProductTab.SHIPPING, component: ProductApprovalDeliveryDetailPage, header: '배송정보' },
    { name: ProductTab.MORE_INFORMATION, component: ProductApprovalDeliveryMoreInfoPage, header: '상세정보' },
    { name: ProductTab.PROVISION_NOTICE, component: ProductApprovalDeliveryProvisionNoticePage, header: '상품정보제공고시' }
  ]

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
    (newTab) => {
      currentActive.value = searchTabIndex(newTab as string)
    }
  )

  const handleTabChange = (event: TabViewChangeEvent) => {
    currentActive.value = event.index
    router.push({
      query: {
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
