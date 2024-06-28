import IconComplain from '@/components/icons/IconComplain.vue'
import { RouteRecordRawExtends } from '@/models/RouteRecordRawExtends'

const data: RouteRecordRawExtends = {
  name: '클레임관리',
  image: IconComplain,
  component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/router/WrapRouteView.vue'),
  path: '/claim',
  id: 46,
  children: [
    {
      name: '배송상품 클레임관리',
      component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/router/WrapRouteView.vue'),
      path: 'delivery-product',
      id: 174,
      children: [
        {
          name: '배송상품 클레임 목록',
          path: 'delivery-product-list',
          id: 175,
          component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/router/WrapRouteView.vue')
        },
        {
          name: '주문 취소 관리',
          path: 'order-cancellation',
          id: 177,
          component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/router/WrapRouteView.vue')
        },
        {
          name: '반품 관리',
          path: 'returns',
          id: 255,
          component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/router/WrapRouteView.vue')
        },
        {
          name: '교환 관리',
          path: 'exchange',
          id: 256,
          component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/router/WrapRouteView.vue')
        }
      ]
    },
    {
      name: '티켓상품 클레임 관리',
      component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/router/WrapRouteView.vue'),
      path: 'ticket-product-complaint',
      id: 259,
      children: [
        {
          name: '티켓상품 클레임 목록',
          path: 'ticket-product-complaint-list',
          id: 264,
          component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/complaint/complaintTicketProduct/ComplaintTicketProductListPage.vue'),
          nameComponent: 'ComplaintTicketProductListPage',
          meta: { title: 'Ticket Product Complaint List' }
        },
        {
          name: '주문취소 관리',
          path: 'order-cancellation',
          id: 265,
          meta: { title: 'Ticket Product Order Cancellation Management' },
          component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/complaint/complaintOrderCancel/ComplaintOrderCancelListPage.vue')
        }
      ]
    }
  ]
}

export default data
