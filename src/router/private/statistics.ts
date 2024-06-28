import IconStatistics from '@/components/icons/IconStatistics.vue'
import { RouteRecordRawExtends } from '@/models/RouteRecordRawExtends'
import { WrapRouteView } from '@/views'

const data: RouteRecordRawExtends = {
  name: '통계 관리',
  image: IconStatistics,
  path: '/statistics',
  id: 168,
  component: WrapRouteView,
  children: [
    {
      name: '회원 통계',
      path: 'member',
      id: 309,
      component: WrapRouteView,
      children: [
        {
          name: '가입 통계',
          path: 'subscription',
          id: 314,
          component: WrapRouteView
        },
        {
          name: '로그인 통계',
          path: 'login',
          id: 315,
          component: WrapRouteView
        }
      ]
    },
    {
      name: '매출 통계',
      path: 'sales',
      id: 310,
      component: WrapRouteView,
      children: [
        {
          name: '전체 매출 통계',
          path: 'full-sales',
          id: 316,
          component: WrapRouteView
        },
        {
          name: '상품유형별 매출 통계',
          path: 'sales-product-type',
          id: 317,
          component: WrapRouteView
        },
        {
          name: '카테고리별 매출 통계',
          path: 'sales-category',
          id: 318,
          component: WrapRouteView
        },
        {
          name: '상품별 매출 통계',
          path: 'sales-product',
          id: 319,
          component: WrapRouteView
        },
        {
          name: '판매사별 매출 통계',
          path: 'sales-seller',
          id: 320,
          component: WrapRouteView
        },
        {
          name: '고객사별 매출 통계',
          path: 'sales-customer',
          id: 321,
          component: WrapRouteView
        }
      ]
    },
    {
      name: '클레임 통계',
      path: 'claim',
      id: 311,
      component: WrapRouteView,
      children: [
        {
          name: '주문취소 통계',
          path: 'order-cancellation',
          id: 322,
          component: WrapRouteView
        },
        {
          name: '반품 통계',
          path: 'order-cancellation',
          id: 323,
          component: WrapRouteView
        },
        {
          name: '교환 통계',
          path: 'return',
          id: 324,
          component: WrapRouteView
        }
      ]
    },
    {
      name: '프로모션 통계',
      path: 'promotion',
      id: 312,
      component: WrapRouteView,
      children: [
        {
          name: '쿠폰 사용 통계',
          path: 'coupon-usage',
          id: 325,
          component: WrapRouteView
        },
        {
          name: '복지포인트 사용 통계',
          path: 'welfare-point-usage',
          id: 326,
          component: WrapRouteView
        }
      ]
    },
    {
      name: '콘텐츠 통계',
      path: 'content',
      id: 313,
      component: WrapRouteView,
      children: [
        {
          name: '상품Q&A 통계',
          path: 'product-qa',
          id: 327,
          component: WrapRouteView
        },
        {
          name: '상품평 통계',
          path: 'product-review',
          id: 328,
          component: WrapRouteView
        },
        {
          name: '1:1문의 통계',
          path: 'inquiry',
          id: 329,
          component: WrapRouteView
        }
      ]
    }
  ]
}

export default data
