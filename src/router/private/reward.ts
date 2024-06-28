import IconReward from '@/components/icons/IconReward.vue'
import { RouteRecordRawExtends } from '@/models'
import { WrapRouteView } from '@/views'

const data: RouteRecordRawExtends = {
  name: '프로모션 관리',
  image: IconReward,
  path: '/promotion',
  id: 32,
  component: WrapRouteView,
  children: [
    {
      name: '쿠폰 관리',
      path: 'coupon',
      id: 35,
      component: WrapRouteView,
      children: [
        {
          name: '일반 쿠폰 목록',
          path: 'list',
          id: 273,
          component: WrapRouteView
        },
        {
          name: '자동발급 쿠폰 목록',
          path: 'list-automatically-issued',
          id: 274,
          component: WrapRouteView
        },
        {
          name: '쿠폰 발행/사용내역',
          path: 'coupon-issuance-use history',
          id: 275,
          component: WrapRouteView
        }
      ]
    },
    {
      name: '복지포인트 관리',
      path: 'welfare-point',
      id: 49,
      component: WrapRouteView,
      children: [
        {
          name: '복지포인트 배정관리',
          path: 'allocation',
          id: 276,
          component: WrapRouteView
        },
        {
          name: '복지포인트 조정관리',
          path: 'adjustment',
          id: 277,
          component: WrapRouteView
        },
        {
          name: '복지포인트 차감관리',
          path: 'deduction',
          id: 278,
          component: WrapRouteView
        },
        {
          name: '복지포인트 이용현황',
          path: 'usage-status',
          id: 279,
          component: WrapRouteView
        }
      ]
    }
  ]
}

export default data
