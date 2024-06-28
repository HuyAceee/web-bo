import IconCS from '@/components/icons/IconCS.vue'
import { RouteRecordRawExtends } from '@/models/RouteRecordRawExtends'
import { WrapRouteView } from '@/views'

const data: RouteRecordRawExtends = {
  name: 'CS 관리',
  image: IconCS,
  component: WrapRouteView,
  path: '/cs',
  id: 165,
  children: [
    {
      name: '상품Q&A 관리',
      path: 'product-qa',
      id: 303,
      component: WrapRouteView,
      children: []
    },
    {
      name: '상품평 관리',
      path: 'product-preview',
      id: 304,
      component: WrapRouteView,
      children: []
    },
    {
      name: 'CS 접수 관리',
      component: WrapRouteView,
      path: 'reception',
      id: 305,
      children: [
        {
          name: 'CS 목록',
          path: 'list',
          id: 307,
          component: WrapRouteView
        },
        {
          name: 'CS 등록',
          path: 'register',
          id: 308,
          component: WrapRouteView
        }
      ]
    },
    {
      name: '1:1문의 관리',
      path: 'inquiry',
      id: 306,
      component: WrapRouteView,
      children: []
    }
  ]
}

export default data
