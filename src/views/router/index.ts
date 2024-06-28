import GeneralTemplateRouteView from './GeneralTemplateRouteView.vue'
const WrapRouteView = () => import(/* webpackChunkName: "user-chunk" */ '@/views/router/WrapRouteView.vue')
export { WrapRouteView, GeneralTemplateRouteView }
