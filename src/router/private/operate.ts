import IconOperational from '@/components/icons/IconOperational.vue'
import { RouteRecordRawExtends } from '@/models/RouteRecordRawExtends'
import { AdministratorRegistrationTooltip } from '@/models/views/operating/adminManagement/OperatingAdministratorsRegistrationModel'
import { PermissionGroupRegistrationTooltip } from '@/models/views/operating/adminManagement/OperatingPermissionGroupRegistrationModel'
import { WrapRouteView } from '@/views'

const data: RouteRecordRawExtends = {
  name: '운영 관리',
  image: IconOperational,
  component: WrapRouteView,
  path: '/operation',
  id: 169,
  children: [
    {
      name: '사이트 관리',
      component: WrapRouteView,
      path: 'site',
      id: 330,
      children: [
        {
          name: '사이트 메뉴 관리',
          path: 'site-menu',
          id: 400,
          component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/operating/operatingManagement/site/OperatingSiteManagementPage.vue'),
          meta: { title: 'Operation Site Management' }
        },
        {
          name: 'Footer 정보 관리',
          path: 'footer-information',
          id: 334,
          component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/operating/operatingManagement/OperatingManagementFooterInfoPage.vue'),
          meta: { title: 'Operation Footer Information' }
        },
        {
          name: '배치관리',
          path: 'batch',
          id: 335,
          component: WrapRouteView
        },
        {
          name: '관리자 접근 IP 관리',
          path: 'administrator-access-ip',
          id: 336,
          component: WrapRouteView
        },
        {
          name: '약관 관리',
          path: 'terms-conditions',
          id: 401,
          component: WrapRouteView
        },
        {
          name: '앱 버전 관리',
          path: 'app-versioning',
          id: 402,
          component: WrapRouteView
        }
      ]
    },
    {
      name: 'BO 관리자 관리',
      path: 'bo-administrator',
      id: 331,
      component: WrapRouteView,
      children: [
        {
          name: '관리자 목록',
          path: 'administrator-list',
          id: 337,
          component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/operating/adminManagement/OperatingAdministratorsPage.vue'),
          meta: { title: 'Operation Administrator List' }
        },
        {
          name: '관리자 등록/수정',
          isShowTips: true,
          path: 'administrator-registration',
          tooltipElement: AdministratorRegistrationTooltip,
          id: 338,
          component: () =>
            import(/* webpackChunkName: "user-chunk" */ '@/views/operating/adminManagement/OperatingAdministratorsRegistrationPage.vue'),
          meta: { title: 'Operation Administrator Registration' }
        },
        {
          name: '권한 그룹 목록',
          path: 'permission-group-list',
          id: 339,
          component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/operating/adminManagement/OperatingPermissionGroupPage.vue'),
          meta: { title: 'Operation Administrator Permission Group' }
        },
        {
          name: '권한 그룹 등록/수정',
          isShowTips: true,
          tooltipElement: PermissionGroupRegistrationTooltip,
          path: 'permission-group-registration',
          id: 434,
          component: () =>
            import(/* webpackChunkName: "user-chunk" */ '@/views/operating/adminManagement/OperatingPermissionGroupRegistrationPage.vue'),
          meta: { title: 'Operation Administrator Permission Registration' }
        }
      ]
    },
    {
      name: '모니터링',
      path: 'monitoring',
      id: 332,
      component: WrapRouteView,
      children: [
        {
          name: '관리자 접속 이력 조회',
          path: 'administrator-access-history-inquiry',
          id: 340,
          component: WrapRouteView
        },
        {
          name: '개인정보 열람 이력 조회',
          path: 'check-personal-information-viewing-history',
          id: 341,
          component: WrapRouteView
        }
      ]
    }
    // {
    //   name: '혜택 관리',
    //   path: 'benefits',
    //   id: 333,
    //   component: WrapRouteView,
    //   children: [
    //     {
    //       name: '신용카드 무이자정보 목록',
    //       path: 'credit-card-interest-free-information-list',
    //       id: 342,
    //       component: WrapRouteView
    //     },
    //     {
    //       name: '결제혜택정보 목록',
    //       path: 'payment-benefit-information-list',
    //       id: 343,
    //       component: WrapRouteView
    //     }
    //   ]
    // }
  ]
}

export default data
