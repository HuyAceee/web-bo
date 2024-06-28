import IconCategory from '@/components/icons/IconCategory.vue'
import { RouteRecordRawExtends } from '@/models/RouteRecordRawExtends'
import { WrapRouteView } from '@/views'

const data: RouteRecordRawExtends = {
  name: '카테고리 관리',
  image: IconCategory,
  component: WrapRouteView,
  path: '/category',
  id: 13,
  children: [
    {
      name: '표준카테고리 관리',
      path: 'standard-category/management',
      id: 14,
      component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/categories/standard/CategoriesStandardManagementPage.vue'),
      meta: {
        title: 'Standard Category Management'
      },
      children: []
    },
    {
      name: '전시카테고리 관리',
      path: 'exhibition-category/management',
      id: 17,
      component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/categories/exhibition/CategoriesExhibitionManagementPage.vue'),
      meta: {
        title: 'Display Category Management'
      },
      children: []
    }
  ]
}

export default data
