import router from '@/router'
import {nextTick} from 'vue';


export const usePageTitle = () => {
  router.afterEach((to) => {
    // Use next tick to handle router history correctly
    // see: https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
    nextTick(() => {
      document.title = to?.meta?.title || '';
  });
  })
}
