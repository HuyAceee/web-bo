import { MemberListTabType } from '@/models/views'
import MemberDetailManageCustomerSpecialInfoPage from '@/views/members/memberList/MemberDetailManageCustomerSpecialInfoPage.vue'
import MemberListCouponDetailPage from '@/views/members/memberList/MemberListCouponDetailPage.vue'
import MemberListDeliveryAddressPage from '@/views/members/memberList/MemberListDeliveryAddressPage.vue'
import MemberListOrderDetailPage from '@/views/members/memberList/MemberListOrderDetailPage.vue'
import MemberListPointDetailPage from '@/views/members/memberList/MemberListPointDetailPage.vue'
import MemberListTab from '@/views/members/memberList/MemberListTab.vue'
import MemberListBaseInformationTab from '@/views/members/memberList/MemberListBaseInformationTabWrapperPage.vue'
import { TabViewChangeEvent } from 'primevue/tabview'
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export const useMemberDetailTabWrapper = () => {
  const route = useRoute()
  const router = useRouter()
  const tabData = [
    { name: MemberListTabType.BASE_INFORMATION, component: MemberListBaseInformationTab, header: '기본정보' },
    { name: MemberListTabType.DELIVERY_ADDRESS, component: MemberListDeliveryAddressPage, header: '배송지정보' },
    { name: MemberListTabType.ORDER_DETAIL, component: MemberListOrderDetailPage, header: '주문내역' },
    { name: MemberListTabType.COUPON_DETAIL, component: MemberListCouponDetailPage, header: '쿠폰 내역' },
    { name: MemberListTabType.WELFARE_POINT_DETAIL, component: MemberListPointDetailPage, header: '복지포인트 내역' },
    { name: MemberListTabType.WELFARE_POINT_USAGE_DETAIL, component: MemberListTab, header: '적립금 내역' },
    { name: MemberListTabType.EVENT_DETAIL, component: MemberListTab, header: '이벤트내역' },
    { name: MemberListTabType.INQUIRY_CS, component: MemberListTab, header: '문의 및 CS 내역' },
    { name: MemberListTabType.CUSTOMER_SPECIAL_INFO, component: MemberDetailManageCustomerSpecialInfoPage, header: '고객 특이사항 관리' }
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

  return { currentActive, tabData, tabPanelProps, handleTabChange }
}
