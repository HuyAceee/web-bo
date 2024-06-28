export const systemRoutes = [
  {
    name: 'system-error',
    path: 'system-error',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/general/GeneralSystemErrorPage.vue'),
    meta: { title: 'System error', isNotRequiresAuth: true }
  },
  {
    name: 'loading',
    path: 'loading',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/general/GeneralLoadingPage.vue'),
    meta: { title: 'Loading', isNotRequiresAuth: true }
  },
  {
    name: 'loading-small',
    path: 'loading-small',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/general/GeneralLoadingSmallPage.vue'),
    meta: { title: 'Loading Small', isNotRequiresAuth: true }
  },
  {
    name: 'system-maintenance',
    path: 'system-maintenance',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/general/GeneralSystemMaintenancePage.vue'),
    meta: {
      title: 'System Maintenance',
      isNotRequiresAuth: true
    }
  },
  {
    name: 'not-found',
    path: 'not-found',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/general/GeneralNotFoundPage.vue'),
    meta: { title: '404 Not Found', isNotRequiresAuth: true }
  }
]
