import IconVendor from '@/components/icons/IconVendor.vue'
import { RouteRecordRawExtends } from '@/models/RouteRecordRawExtends'
import { WrapRouteView } from '@/views'

const data: RouteRecordRawExtends = {
  name: '판매사 관리',
  image: IconVendor,
  path: '/vendor',
  id: 172,
  component: WrapRouteView,
  children: [
    {
      name: '판매사 관리',
      path: 'manager',
      id: 344,
      component: WrapRouteView,
      children: [
        {
          name: '판매사 목록',
          path: 'list',
          id: 348,
          component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/partner/PartnerManagementListPage.vue'),
          nameComponent: 'PartnerManagementListPage',
          meta: {
            title: 'List of Manager'
          }
        },
        {
          name: '판매사 등록',
          path: 'register-seller',
          id: 349,
          component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/partner/PartnerManagementRegistrationPage.vue'),
          nameComponent: 'PartnerManagementRegistrationPage',
          meta: {
            title: 'Register Seller'
          }
        },
        {
          name: '판매사 상세',
          path: 'detail',
          isHideMenu: true,
          component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/partner/partnerManagementDetail/PartnerManagementDetailPage.vue'),
          nameComponent: 'PartnerManagementDetailPage',
          meta: {
            title: 'Seller Detail'
          }
        },
        {
          name: '판매사 계약 상세',
          path: 'seller-contract-detail',
          id: 351,
          component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/partner/PartnerSellerContractDetailPage.vue'),
          nameComponent: 'PartnerSellerContractDetailPage',
          meta: {
            title: 'Seller Contract Detail'
          }
        },
        {
          name: '판매사 계약기간 연장',
          path: 'seller-contract-period',
          id: 352,
          component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/partner/PartnerSellerContractPeriodPage.vue'),
          nameComponent: 'PartnerSellerContractPeriodPage',
          meta: {
            title: 'Seller Contract Period'
          }
        }
      ]
    },
    {
      name: 'PO 관리자 관리',
      path: 'po-manager',
      id: 345,
      component: WrapRouteView,
      children: [
        {
          name: 'PO 관리자 목록',
          path: 'list',
          id: 350,
          component: WrapRouteView
        },
        {
          name: 'PO 관리자 등록',
          path: 'po-registration',
          id: 351,
          component: WrapRouteView
        },
        {
          name: 'PO 관리자 권한 그룹 관리',
          path: 'permission-group-management',
          id: 352,
          component: WrapRouteView
        }
      ]
    },
    {
      name: 'PO 관리자 모니터링',
      path: 'po-manager-monitoring',
      id: 346,
      component: WrapRouteView,
      children: [
        {
          name: '관리자 접속 이력 조회',
          path: 'check-administrator-access-history',
          id: 353,
          component: WrapRouteView
        },
        {
          name: '개인정보 열람 이력 조회',
          path: 'check-personal-information-viewing-history',
          id: 354,
          component: WrapRouteView
        }
      ]
    },
    {
      name: '제휴몰인몰 관리',
      path: 'affiliate-mall-in-mall',
      id: 347,
      component: WrapRouteView,
      children: [
        {
          name: '제휴몰인몰 목록',
          path: 'list',
          id: 355,
          component: WrapRouteView
        },
        {
          name: '제휴몰인몰 등록',
          path: 'registration',
          id: 356,
          component: WrapRouteView
        }
      ]
    }
  ]
}

export default data
