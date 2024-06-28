const data = {
  path: '',
  name: '홈',
  isHideMenu: true,
  nameComponent: 'DashboardPage',
  component: () => import(/* webpackChunkName: "user-chunk" */ '@/views/main/dashboard/DashboardPage.vue'),
  children: [],
  meta: {
    title: 'Dashboard'
  }
}

export default data
