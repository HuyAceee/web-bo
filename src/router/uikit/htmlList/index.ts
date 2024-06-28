export const HTMLListRoutes = [
  // add route for uikit there
  {
    name: 'HTML List',
    path: '',
    component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/HTMLListView.vue'),
    meta: { title: 'HTML List' }
  }
]
