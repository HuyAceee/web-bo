import router from '@/router'
import { AUTH_LOGIN_ROUTER, ACCESS_TOKEN, storage } from '@/common'
import { axiosOAuth2Service } from '@/services/AxiosOAuth2Service'

export const useCheckLogin = () => {
  router.beforeEach(async (to, from, next) => {
    const accessTokenAxios = axiosOAuth2Service?.axiosInstance?.defaults?.headers?.common?.Authorization
    const hasTokenAxios = accessTokenAxios ?? storage.get(ACCESS_TOKEN)
    if (!hasTokenAxios && to.path !== AUTH_LOGIN_ROUTER && !to?.meta?.isNotRequiresAuth) {
      next(AUTH_LOGIN_ROUTER)
    } else {
      next()
    }
  })
}
