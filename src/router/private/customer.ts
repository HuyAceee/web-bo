import IconCustomer from '@/components/icons/IconCustomer.vue'
import { RouteRecordRawExtends } from '@/models/RouteRecordRawExtends'
import { WrapRouteView } from '@/views/router'

const data: RouteRecordRawExtends = {
  name: '고객사 관리',
  image: IconCustomer,
  path: '/customer',
  id: 179,
  component: WrapRouteView,
  children: [
    {
      name: '고객사 관리',
      component: WrapRouteView,
      path: 'information',
      id: 180,
      children: [
        {
          name: '고객사 관리',
          path: 'list',
          id: 359,
          component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/company/customerManagement/CompanyCustomerListPage.vue'),
          nameComponent: 'CompanyCustomerListPage',
          meta: { title: 'Customer company list page' }
        },
        {
          name: '고객사 등록',
          path: 'registration',
          isHideMenu: true,
          id: 360,
          component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/company/customerManagement/CompanyCustomerRegistrationPage.vue'),
          nameComponent: 'CompanyCustomerRegistrationPage',
          meta: { title: 'Company customer registration Page' }
        },
        {
          name: '고객사 상세',
          path: 'edit',
          isHideMenu: true,
          component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/company/customerManagement/detail/CompanyCustomerDetailPage.vue'),
          // nameComponent: 'CompanyCustomerRegistrationPage',
          meta: { title: 'Company Customer Edit Page' },
          nameComponent: 'CompanyCustomerDetailPage'
        },
        {
          name: '',
          path: 'search-modal',
          isHideMenu: true,
          component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/company/CompanyBlankPage.vue'),
          meta: { title: 'Company Blank Page' },
          nameComponent: 'Company Blank Page'
        }
      ]
    },
    {
      name: 'CO 관리자 관리',
      component: WrapRouteView,
      path: 'co-manager',
      id: 378,
      children: [
        {
          name: 'CO 관리자 목록',
          path: 'list',
          id: 379,
          component: WrapRouteView
        },
        {
          name: 'CO 관리자 등록',
          path: 'registration',
          id: 380,
          component: WrapRouteView
        },
        {
          name: 'CO 관리자 권한 그룹 관리',
          path: 'permission-group',
          id: 381,
          component: WrapRouteView
        }
      ]
    },
    {
      name: 'CO 관리자 모니터링',
      component: WrapRouteView,
      path: 'co-manager-monitoring',
      id: 358,
      children: [
        {
          name: '관리자 접속 이력 조회',
          path: 'check-administrator-access-history',
          id: 385,
          component: () =>
            import(/* webpackChunkName: "user-chunk" */ '@/views/company/coManagerMonitoring/CompanyAdministratorAccessHistoryPage.vue'),
          nameComponent: 'CompanyAdministratorAccessHistoryPage',
          meta: { title: 'Addministator Access History' }
        },
        {
          name: '개인정보 열람 이력 조회',
          path: 'check-personal-information-viewing-history',
          id: 386,
          component: WrapRouteView
        }
      ]
    }
  ]
}

export default data
