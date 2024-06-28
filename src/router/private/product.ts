import IconProduct from '@/components/icons/IconProduct.vue'
import { RouteRecordRawExtends } from '@/models/RouteRecordRawExtends'

const data: RouteRecordRawExtends = {
  name: '상품 관리',
  image: IconProduct,
  path: '/product',
  id: 6,
  component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/router/WrapRouteView.vue'),
  children: [
    {
      name: '배송상품 등록 관리',
      path: 'delivery-product',
      id: 9,
      component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/router/WrapRouteView.vue'),
      children: [
        {
          name: '배송 상품 목록',
          path: 'list',
          id: 228,
          component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/products/deliveryProduct/ProductDeliveryProductListPage.vue'),
          nameComponent: 'ProductDeliveryProductListPage',
          meta: { title: 'Delivery Product list' }
        },
        {
          name: '배송 상품 등록 / 수정',
          path: 'registration',
          id: 229,
          nameComponent: 'ProductDeliveryProductWrapperPage',
          component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/products/deliveryProduct/ProductDeliveryProductWrapperPage.vue'),
          isShowTips: true,
          meta: { title: 'Delivery Product' }
        },
        {
          name: '배송 상품 등록 / 수정',
          path: 'edit/:id',
          id: 'delivery-product-edit',
          isShowTips: true,
          isHideMenu: true,
          nameComponent: 'ProductDeliveryProductWrapperPage',
          component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/products/deliveryProduct/ProductDeliveryProductWrapperPage.vue'),
          meta: { title: 'Delivery Product' }
        }
      ]
    },
    {
      name: '티켓 상품 등록 관리',
      path: 'ticket-product',
      id: 230,
      component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/router/WrapRouteView.vue'),
      children: [
        {
          name: '티켓 상품 목록',
          path: 'list',
          id: 231,
          component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/products/ticketProduct/ProductTicketProductListPage.vue'),
          nameComponent: 'ProductTicketProductListPage',
          meta: { title: 'Ticket Product' }
        },
        {
          name: '티켓 상품 등록 / 수정',
          path: 'registration',
          id: 374,
          isShowTips: true,
          nameComponent: 'ProductTicketProductWrapperPage',
          component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/products/ticketProduct/ProductTicketProductWrapperPage.vue'),
          meta: { title: 'Ticket Product' }
        },
        {
          name: '티켓 상품 등록',
          path: 'edit',
          isHideMenu: true,
          isShowTips: true,
          id: 'ticket-product-edit',
          nameComponent: 'ProductTicketProductWrapperPage',
          component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/products/ticketProduct/ProductTicketProductWrapperPage.vue'),
          meta: { title: 'Ticket Product' }
        },
        {
          name: '티켓 상품 대량 등록',
          path: 'bulk-registration',
          id: 232,
          component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/router/WrapRouteView.vue')
        }
      ]
    },
    {
      name: '상품승인 관리',
      path: 'approval',
      id: 233,
      component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/router/WrapRouteView.vue'),
      children: [
        {
          name: '배송 상품 승인 목록',
          path: 'delivery-product-list',
          id: 234,
          component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/products/deliveryProduct/ProductApprovalListPage.vue'),
          nameComponent: 'ProductApprovalListPage',
          meta: { title: 'Approval Product List' }
        },
        {
          name: '배송 상품 승인 상세',
          path: 'delivery-product/edit/:id',
          id: 'delivery-product-detail',
          isShowTips: true,
          component: () =>
            import(/* webpackChunkName: "user-chunk" */ '@/views/products/approval/deliveryProduct/ProductApprovalDeliveryWrapperPage.vue'),
          nameComponent: 'ProductApprovalDeliveryWrapperPage',
          isHideMenu: true,
          meta: { title: 'Approval Delivery Product Base' }
        },
        {
          name: '티켓 상품 승인 목록',
          path: 'ticket-product-list',
          id: 235,
          component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/products/ticketProduct/ProductTicketProductApprovalListPage.vue')
        },
        {
          name: '티켓 상품 승인 상세',
          path: 'ticket-product/edit',
          isHideMenu: true,
          isShowTips: true,
          id: 'ticket-product-detail',
          component: () =>
            import(/* webpackChunkName: "user-chunk" */ '@/views/products/approval/ticketProduct/ProductApprovalTicketWrapperPage.vue'),
          nameComponent: 'ProductApprovalTicketWrapperPage',
          meta: { title: 'Approval Ticket Product Base' }
        }
      ]
    },
    {
      name: '할인 프로모션 관리',
      path: 'promotion',
      id: 236,
      component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/router/WrapRouteView.vue'),
      children: [
        {
          name: '할인 프로모션 목록',
          path: 'list',
          id: 237,
          component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/products/promotion/ProductDiscountPromotionListPage.vue'),
          nameComponent: 'ProductDiscountPromotionListPage',
          meta: { title: 'Promotion Product List' }
        },
        {
          name: '할인 프로모션 등록',
          path: 'registration',
          id: 238,
          component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/products/promotion/ProductDiscountPromotionRegistrationPage.vue')
        },
        {
          name: '할인 프로모션 등록',
          path: 'detail/:id',
          isHideMenu: true,
          id: 'discount-promotion-registration',
          component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/products/promotion/ProductDiscountPromotionRegistrationPage.vue')
        }
      ]
    },
    {
      name: '브랜드 관리',
      path: 'brand',
      id: 240,
      component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/router/WrapRouteView.vue'),
      children: [
        {
          name: '브랜드 관리',
          path: 'list',
          id: 241,
          component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/products/trademark/ProductTradeMarkProductListPage.vue'),
          nameComponent: 'ProductTradeMarkProductListPage',
          meta: { title: 'TradeMark Product List' }
        },
        {
          name: '브랜드 등록/수정',
          path: 'registration',
          id: 375,
          component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/products/brand/ProductBrandRegistrationPage.vue'),
          meta: { title: 'Trademark Registration' }
        },
        {
          name: '브랜드 등록/수정',
          path: 'edit/:id',
          id: 242,
          isHideMenu: true,
          component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/products/brand/ProductBrandRegistrationPage.vue'),
          meta: { title: 'Trademark View' }
        }
      ]
    }
  ]
}

export default data
