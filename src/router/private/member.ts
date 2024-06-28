import IconMember from '@/components/icons/IconMember.vue'
import { RouteRecordRawExtends } from '@/models/RouteRecordRawExtends'

const data: RouteRecordRawExtends = {
  name: '회원 관리',
  image: IconMember,
  component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/router/WrapRouteView.vue'),
  path: '/member',
  id: 2,
  children: [
    {
      name: '회원 정보 관리',
      path: 'information',
      id: 38,
      component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/router/WrapRouteView.vue'),
      children: [
        {
          name: '회원 목록',
          path: 'list',
          id: 211,
          component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/members/memberList/MemberListPage.vue'),
          nameComponent: 'MemberListPage',
          meta: { title: 'Member List' }
        },
        {
          name: '회원상세',
          path: 'detail',
          id: 212,
          component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/members/memberList/MemberDetailWrapperPage.vue'),
          nameComponent: 'MemberList',
          meta: { title: 'Member List' }
        },
        {
          name: '회원 일괄등록',
          path: 'bulk-registration',
          id: 213,
          component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/members/memberRegistration/MemberBulkRegistrationWrapper.vue'),
          meta: { title: 'Member Bulk Registration' }
        },
        {
          name: '회원 개별 등록',
          path: 'individual-member-registration',
          id: 214,
          component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/members/registerIndividual/MemberRegisterIndividualPage.vue'),
          nameComponent: 'MemberRegisterIndividualPage',
          meta: { title: 'Member Register Individual Page' }
        }
      ]
    },
    {
      name: '복지포인트 배정관리',
      path: 'welfare-point-allocation-management',
      id: 'welfare-point-allocation-management',
      component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/router/WrapRouteView.vue'),
      isHideMenu: true,
      children: [
        {
          name: '복지포인트 배정목록',
          path: 'profit-point-allocation',
          id: 'profit-point-allocation',
          component: () =>
            import(/* webpackChunkName: "user-chunk" */ '@/views/members/profitPointAllocation/MemberWelfarePointAllocationListPage.vue'),
          nameComponent: 'MemberWelfarePointAllocationListPage',
          meta: { title: 'Member Profit Point Allocation Page' },
          isHideMenu: true
        },
        {
          name: '복지포인트 조정등록',
          path: 'point-adjustment-registration',
          id: 'point-adjustment-registration',
          component: () =>
            import(/* webpackChunkName: "user-chunk" */ '@/views/members/pointAdjustmentRegistration/MemberPointAdjustmentRegistrationPage.vue'),
          nameComponent: 'MemberPointAdjustmentRegistrationPage',
          meta: { title: 'Member Profit Point Allocation Page' },
          isHideMenu: true
        }
      ]
    },
    {
      name: '복지포인트 배정관리',
      path: 'point-management',
      id: 3,
      component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/router/WrapRouteView.vue'),
      children: [
        {
          name: '복지포인트 배정목록',
          path: 'point-allocation-management/point-allocation-list',
          id: 4,
          component: () =>
            import(/* webpackChunkName: "user-chunk" */ '@/views/members/profitPointAllocation/MemberWelfarePointAllocationListPage.vue'),
          nameComponent: 'MemberWelfarePointAllocationListPage',
          meta: { title: 'Member Profit Point Allocation Page' }
        },
        {
          name: '복지포인트 배정등록',
          path: 'point-allocation-management/allocation-registration',
          id: 'point-allocation-management/allocation-registration',
          component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/members/pointUsageList/MemberPointUsageRegistrationBulkPage.vue'),
          meta: { title: 'Member Point Usage Registration Bulk Page' },
          isHideMenu: true
        }
      ]
    },
    {
      name: '복지포인트 차감목록',
      path: 'welfare-point-deduction-management',
      id: 216,
      component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/router/WrapRouteView.vue'),
      children: [
        {
          name: '복지포인트 차감목록',
          path: 'profit-point-deduction',
          id: 219,
          component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/members/pointDeductionList/MemberWelfarePointDeductionListPage.vue'),
          nameComponent: 'MemberWelfarePointDeductionListPage',
          meta: { title: 'Member Welfare Point Deduction Page' }
        },
        {
          name: '복지포인트 차감등록',
          path: 'registration',
          id: 'deduction-registration',
          component: () =>
            import(/* webpackChunkName: "user-chunk" */ '@/views/members/pointDeductionManagement/MemberPointDeductionRegistrationPage.vue'),
          meta: { title: 'Member Welfare Point Deduction Registration' },
          isHideMenu: true
        },
        {
          name: '복지포인트 차감 상세',
          path: 'detail',
          id: 'deduction-registration',
          component: () =>
            import(/* webpackChunkName: "user-chunk" */ '@/views/members/pointDeductionDetail/MemberPointDeductionDetailPage.vue'),
          meta: { title: 'Member Welfare Point Deduction detail' },
          isHideMenu: true
        }
      ]
    },
    {
      name: '복지포인트 이용현황',
      path: 'welfare-point-usage-status',
      id: 176,
      component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/router/WrapRouteView.vue'),
      children: [
        {
          name: '복지포인트 회원 사용목록',
          path: 'list',
          id: 222,
          component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/members/pointUsageList/MemberPointUsageListPage.vue'),
          nameComponent: 'MemberPointUsageListPage',
          meta: { title: 'Member Point Usage List Page' }
        },
        {
          name: '복지포인트 고객사 사용목록',
          path: 'customer-list',
          id: 221,
          component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/members/pointUsageList/MemberPointUsageCustomerListPage.vue'),
          nameComponent: 'MemberPointUsageCustomerListPage',
          meta: { title: 'Member Point Usage Customer List Page' }
        },
        {
          name: '복지포인트 배정등록',
          path: 'registration-bulk',
          id: 'registration-bulk',
          component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/members/pointUsageList/MemberPointUsageRegistrationBulkPage.vue'),
          nameComponent: 'MemberPointUsageRegistrationBulkPage',
          meta: { title: 'Member Point Usage Registration Bulk Page' },
          isHideMenu: true
        },
        {
          name: '복지포인트 배정등록',
          path: 'specify-in-bulk',
          id: 'specify-in-bulk',
          component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/members/pointUsageList/MemberPointAllocationSpecifyInBulkPage.vue'),
          nameComponent: 'MemberPointAllocationSpecifyInBulkPage',
          meta: { title: 'Member Point Allocation Specify In Bulk Page' },
          isHideMenu: true
        }
      ]
    },
    {
      name: 'DM 발송 관리',
      path: 'dm-sending',
      id: 220,
      component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/router/WrapRouteView.vue'),
      children: [
        {
          name: '수동 발송 관리',
          path: 'manual-shipping',
          id: 223,
          component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/router/WrapRouteView.vue')
        },
        {
          name: '자동 발송 관리',
          path: 'automatic-shipping',
          id: 224,
          component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/members/automatedShippingList/MemberAutomatedShippingListPage.vue'),
          nameComponent: 'MemberAutomatedShippingListPage',
          meta: { title: 'Member Automated Shipping List Page' }
        },
        {
          name: '템플릿 관리',
          path: 'template',
          id: 225,
          component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/members/templateManagement/MemberTemplateManagementPage.vue'),
          meta: { title: 'Member Template Management Page' }
        },
        {
          name: '알림톡 발신채널 관리',
          path: 'notification-talk-sending-channel',
          id: 226,
          component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/router/WrapRouteView.vue'),
          meta: { title: 'Notification Talk Sending Channel' }
        },
        {
          name: '발신번호 관리',
          path: 'outgoing-number',
          id: 227,
          component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/members/outgoingNumberList/MemberOutgoingNumberListPage.vue'),
          nameComponent: 'MemberOutgoingNumberListPage',
          meta: { title: 'Member Outgoing Number List Page' }
        }
      ]
    }
  ]
}

export default data
