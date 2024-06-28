import IconExhibition from '@/components/icons/IconExhibition.vue'
import { RouteRecordRawExtends } from '@/models'
import { WrapRouteView } from '@/views'

const data: RouteRecordRawExtends = {
  name: '전시관리',
  image: IconExhibition,
  component: WrapRouteView,
  path: '/exhibition',
  id: 34,
  children: [
    {
      name: '전시 콘텐츠 관리',
      component: WrapRouteView,
      path: 'content',
      id: 107,
      children: [
        {
          name: '템플릿 관리',
          path: 'template',
          id: 282,
          component: () => import('@/views/exhibition/templateManagement/ExhibitionTemplateManagementPage.vue'),
          nameComponent: 'ExhibitionTemplateManagementPage',
          meta: { title: 'Exhibition Template Management' }
        },
        {
          name: '전시관 카테고리 관리',
          path: 'hall-category',
          id: 390,
          component: () =>
            import(/* webpackChunkName: "user-chunk" */ '@/views/exhibition/exhibitionContent/ExhibitionHallCategoryManagementPage.vue'),
          nameComponent: 'ExhibitionHallCategoryManagementPage',
          meta: { title: 'Exhibition Hall Category Management' }
        },
        {
          name: '전시관 관리',
          path: 'hall',
          id: 390,
          component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/exhibition/exhibitionContent/ExhibitionHallMngtWrapperPage.vue'),
          nameComponent: 'ExhibitionHallMngtWrapperPage',
          meta: { title: 'Exhibition Hall Management' }
        },
        {
          name: '기획전 관리',
          path: 'special',
          id: 284,
          component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/exhibition/exhibitionContent/ExhibitionSpecialManagementPage.vue'),
          nameComponent: 'ExhibitionSpecialManagementPage',
          meta: { title: 'Exhibition Special Management' }
        },
        {
          name: '판매사 기획전 관리',
          path: 'seller-special',
          id: 285,
          component: () =>
            import(/* webpackChunkName: "user-chunk" */ '@/views/exhibition/exhibitionContent/ExhibitionSellerSpecialManagementPage.vue'),
          nameComponent: 'ExhibitionSellerSpecialManagementPage',
          meta: { title: 'Exhibition Seller Special Management' }
        }
      ]
    },
    {
      name: '이벤트 관리',
      path: 'event',
      id: 280,
      component: WrapRouteView,
      children: []
    },
    {
      name: '공통 전시 관리',
      component: WrapRouteView,
      path: 'common',
      id: 281,
      children: [
        {
          name: '공통GNB 관리',
          path: 'gnb',
          id: 288,
          component: () => import('@/views/exhibition/exhibitionCommon/ExhibitionGnbManagementPage.vue'),
          nameComponent: 'ExhibitionGnbManagement',
          meta: { title: 'Exhibition GNB Management' }
        },

        {
          name: '고객사GNB 관리',
          path: 'gnb-customer',
          id: 289,
          component: () => import('@/views/exhibition/exhibitionCommon/ExhibitionGnbCustomerManagementPage.vue'),
          nameComponent: 'ExhibitionGnbCustomerManagement',
          meta: { title: 'Exhibition GNB Customer Management' }
        },
        {
          name: '검색창 키워드 관리',
          path: 'search-keyword',
          id: 399,
          component: () =>
            import(/* webpackChunkName: "user-chunk" */ '@/views/exhibition/exhibitionCommon/ExhibitionCommonSearchKeywordMngtPage.vue'),
          nameComponent: 'ExhibitionCommonSearchKeywordMngtPage',
          meta: { title: 'Exhibition Search Keyword Management' }
        },

        {
          name: '검색어 배너 관리',
          path: 'search-banner',
          id: 291,
          component: () =>
            import(/* webpackChunkName: "user-chunk" */ '@/views/exhibition/exhibitionCommon/ExhibitionCommonSearchBannerMngtPage.vue'),
          nameComponent: 'ExhibitionCommonSearchBannerMngtPage',
          meta: { title: 'Exhibition Search Banner Management' }
        },
        {
          name: '팝업창 관리',
          path: 'pop-up-window',
          id: 287,
          component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/exhibition/exhibitionCommon/ExhibitionCommonWindowMngtPage.vue'),
          nameComponent: 'ExhibitionCommonWindowMngtPage',
          meta: { title: 'Exhibition Popup Window Management' }
        },
        {
          name: '공통배너 관리',
          path: 'banner-management',
          id: 404,
          component: () => import('@/views/exhibition/exhibitionCommon/ExhibitionCommonBannerManagement.vue'),
          nameComponent: 'ExhibitionBannerManagement',
          meta: { title: 'Exhibition Banner Management' }
        },
        {
          name: '확장형 이미지 관리',
          path: 'extensible-image-management',
          id: 290,
          component: () => import('@/views/exhibition/exhibitionCommon/ExhibitionCommonExtensibleImageManagementPage.vue'),
          nameComponent: 'Exhibition Common Extensible Image Management Page',
          meta: { title: 'Exhibition Common Extensible Image Management Page' }
        },
        {
          name: '플래그 관리',
          path: 'flag-management',
          id: 460,
          component: () => import('@/views/exhibition/exhibitionCommon/ExhibitionCommonFlagManagementPage.vue'),
          nameComponent: 'Exhibition Common Flag Management Page',
          meta: { title: 'Exhibition Common Flag Management Page' }
        }
      ]
    }
  ]
}
export default data
