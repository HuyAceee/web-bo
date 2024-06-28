import IconSettled from '@/components/icons/IconSettled.vue'
import { RouteRecordRawExtends } from '@/models/RouteRecordRawExtends'
import { WrapRouteView } from '@/views'

const data: RouteRecordRawExtends = {
  name: '정산 관리',
  image: IconSettled,
  component: WrapRouteView,
  path: '/settlement',
  id: 30,
  children: [
    {
      name: '플랫폼 매출정산관리',
      path: 'platform-sales',
      id: 266,
      component: WrapRouteView,
      children: []
    },
    {
      name: '업체별 정산 관리',
      component: WrapRouteView,
      path: 'company',
      id: 267,
      children: [
        {
          name: '판매사정산조회',
          path: 'sales-inquiry',
          id: 268,
          component: WrapRouteView
        },
        {
          name: '세금계산서조회',
          path: 'tax-invoice-inquiry',
          id: 269,
          component: WrapRouteView
        },
        {
          name: '부가세신고내역',
          path: 'vat-reporting-details',
          id: 270,
          component: WrapRouteView
        }
      ]
    },
    {
      name: '고객사 정산관리',
      path: 'customer',
      id: 271,
      component: WrapRouteView,
      children: []
    },
    {
      name: 'PG정산조회',
      component: WrapRouteView,
      path: 'pg',
      id: 272,
      children: [
        {
          name: 'PG정산조회',
          path: 'inquiry',
          id: 376,
          component: WrapRouteView
        },
        {
          name: 'PG일대사',
          path: 'line',
          id: 377,
          component: WrapRouteView
        }
      ]
    }
  ]
}

export default data
