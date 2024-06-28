import IconDelivery from '@/components/icons/IconDelivery.vue'
import { RouteRecordRawExtends } from '@/models/RouteRecordRawExtends'
import { DeliveryListOrderStatusTooltip } from '@/models/views/delivery/ticketProductOrderManagement/DeliveryTicketProductListOrderStatusModel'
import { DeliveryOrderDetailTooltip } from '@/models/views/delivery/ticketProductOrderManagement/DeliveryTicketProductOrderDetailModel'
import { DeliveryOrderStatusProductTooltip } from '@/models/views/delivery/ticketProductOrderManagement/DeliveryTicketProductOrderStatusProductModel'
import { DeliveryPurchaseConfirmListTooltip } from '@/models/views/delivery/ticketProductOrderManagement/DeliveryTicketProductPurchaseConfirmListModel'
import { DeliveryTicketListTooltip } from '@/models/views/delivery/ticketProductOrderManagement/DeliveryTicketProductTicketListModel'

const data: RouteRecordRawExtends = {
  name: '주문/배송 관리',
  image: IconDelivery,
  path: '/delivery',
  id: 50,
  component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/router/WrapRouteView.vue'),
  children: [
    {
      name: '배송상품 주문관리',
      path: 'product-order-management',
      id: 51,
      component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/router/WrapRouteView.vue'),
      children: [
        {
          name: '전체주문현황',
          path: 'list-order-status',
          id: 243,
          component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/router/WrapRouteView.vue')
        },
        {
          name: '상품별주문현황',
          path: 'order-status-product',
          id: 244,
          component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/router/WrapRouteView.vue')
        },
        {
          name: '주문상세내역',
          path: 'order-detail',
          id: 'order-detail',
          component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/router/WrapRouteView.vue'),
          isHideMenu: true
        },
        {
          name: '상품준비중목록',
          path: 'list-preparation-product',
          id: 245,
          component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/router/WrapRouteView.vue')
        },
        {
          name: '배송중목록',
          path: 'list-delivery',
          id: 246,
          component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/router/WrapRouteView.vue')
        },
        {
          name: '배송완료목록',
          path: 'list-completion-delivery',
          id: 247,
          component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/router/WrapRouteView.vue')
        },
        {
          name: '구매확정목록',
          path: 'purchase-confirm-list',
          id: 248,
          component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/router/WrapRouteView.vue')
        }
      ]
    },
    {
      name: '티켓상품 주문관리',
      path: 'ticket-product-order-management',
      id: 122,
      component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/router/WrapRouteView.vue'),
      children: [
        {
          name: '전체주문현황',
          path: 'list-order-status',
          id: 249,
          component: () =>
            import(/* webpackChunkName: "user-chunk" */ '@/views/delivery/ticketProductOrderManagement/DeliveryTicketProductListOrderStatusPage.vue'),
          nameComponent: 'DeliveryTicketProductListOrderStatusPage',
          meta: { title: 'List Order Status' },
          isShowTips: true,
          tooltipElement: DeliveryListOrderStatusTooltip
        },
        {
          name: '상품별주문현황',
          path: 'order-status-product',
          id: 250,
          component: () =>
            import(
              /* webpackChunkName: "user-chunk" */ '@/views/delivery/ticketProductOrderManagement/DeliveryTicketProductListOrderStatusProductPage.vue'
            ),
          nameComponent: 'DeliveryTicketProductListOrderStatusProductPage',
          meta: { title: 'Order Status Product' },
          isShowTips: true,
          tooltipElement: DeliveryOrderStatusProductTooltip
        },
        {
          name: '주문상세내역',
          path: 'order-detail',
          id: 251,
          component: () =>
            import(/* webpackChunkName: "user-chunk" */ '@/views/delivery/ticketProductOrderManagement/DeliveryTicketProductOrderDetailPage.vue'),
          nameComponent: 'DeliveryTicketProductOrderDetailPage',
          meta: { title: 'Order Detail' },
          isShowTips: true,
          tooltipElement: DeliveryOrderDetailTooltip
        },
        {
          name: '티켓발급목록',
          path: 'ticket-list',
          id: 252,
          component: () =>
            import(/* webpackChunkName: "user-chunk" */ '@/views/delivery/ticketProductOrderManagement/DeliveryTicketProductTicketListPage.vue'),
          nameComponent: 'DeliveryTicketProductTicketListPage',
          meta: { title: 'Ticket List' },
          isShowTips: true,
          tooltipElement: DeliveryTicketListTooltip
        },
        {
          name: '사용완료목록',
          path: 'usage-list',
          id: 253,
          component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/router/WrapRouteView.vue')
        },
        {
          name: '구매확정목록',
          path: 'purchase-confirm-list',
          id: 254,
          component: () =>
            import(
              /* webpackChunkName: "user-chunk" */ '@/views/delivery/ticketProductOrderManagement/DeliveryTicketProductPurchaseConfirmListPage.vue'
            ),
          nameComponent: 'DeliveryTicketProductPurchaseConfirmListPage',
          meta: { title: 'Purchase Confirm List' },
          isShowTips: true,
          tooltipElement: DeliveryPurchaseConfirmListTooltip
        }
      ]
    }
  ]
}
export default data
