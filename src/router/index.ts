import { WrapRouteView } from '@/views'
import { createRouter, createWebHistory } from 'vue-router'
import { PrivateRoutes } from './private'
import { HTMLListRoutes, UIKitRoutes } from './uikit'
import { authRoutes, systemRoutes } from './general'
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      name: '',
      path: '/',
      component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/router/MainTemplateRouteView.vue'),
      children: PrivateRoutes
    },
    {
      name: 'system',
      path: '/system',
      component: WrapRouteView,
      children: systemRoutes,
      meta: {
        isNotRequiresAuth: true
      }
    },
    {
      name: 'auth',
      path: '/auth',
      component: WrapRouteView,
      children: authRoutes,
      meta: {
        isNotRequiresAuth: true
      }
    },
    {
      name: 'Preview UI_KIT & pages',
      path: '/html-list',
      component: WrapRouteView,
      children: HTMLListRoutes,
      meta: {
        isNotRequiresAuth: true
      }
    },
    {
      name: 'Preview UI_KIT',
      path: '/ui-kit',
      component: WrapRouteView,
      children: UIKitRoutes,
      meta: {
        isNotRequiresAuth: true
      }
    },
    {
      name: 'Manager email verification',
      path: '/manager-email-verification',
      component: () => import('@/views/authentication/AuthEmailVerificationPage.vue'),
      meta: {
        isNotRequiresAuth: true
      }
    },

    {
      name: 'Verification email',
      path: '/manager-email-verification/me',
      component: () => import('@/views/authentication/AuthEmailChangeInfoPage.vue'),
      meta: {
        isNotRequiresAuth: true
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/general/GeneralNotFoundPage.vue'),
      meta: {
        isNotRequiresAuth: true
      }
    }
  ]
})
export default router
