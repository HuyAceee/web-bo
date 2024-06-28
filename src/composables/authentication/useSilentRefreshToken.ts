import { ACCESS_TOKEN, AUTH_LOGIN_ROUTER, AXIOS_TIMEOUT, REFRESH_TOKEN, storage } from '@/common'
import { BaseModelErrorResponse } from '@/models/services/responses/BaseModelResponse'
import { axiosOAuth2Service } from '@/services/AxiosOAuth2Service'
import { authApi } from '@/services/api/authentication/AuthApi'
import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { onMounted } from 'vue'
import { useHandleApiError } from '../common'
import { useRouter } from 'vue-router'

export const useSilentRefreshToken = () => {
  const { handleError } = useHandleApiError()
  const router = useRouter()
  const saveToken = (params: { accessToken?: string; refreshToken?: string }) => {
    storage.set(ACCESS_TOKEN, params.accessToken ?? '')
    storage.set(REFRESH_TOKEN, params.refreshToken ?? '')
  }

  const clearToken = () => {
    storage.remove(ACCESS_TOKEN)
    storage.remove(REFRESH_TOKEN)
  }

  const openLoginPage = () => {
    router.push(AUTH_LOGIN_ROUTER)
  }
  /**
   * The function to setup call to server to get new one refresh token and access token when access tolen was expired
   * use it for retry call api to get data. If the refresh api has error, send a force logout event to navigation to logout
   */
  const setupRefreshToken = () => {
    const refreshToken = (originalRequestConfig: AxiosRequestConfig) => {
      console.log('called refreshToken')
      return new Promise((resolve, reject) => {
        authApi
          .refreshToken()
          .then((response) => {
            const { accessToken, refreshToken } = response.data
            saveToken({
              accessToken,
              refreshToken
            })
            axiosOAuth2Service.attachHeaderToken({
              accessToken: accessToken
            })
            if (originalRequestConfig.headers) {
              originalRequestConfig.headers['Authorization'] = `Bearer ${accessToken}`
            }
            axiosOAuth2Service.processWaitingQueue(null, accessToken)
            resolve(axios(originalRequestConfig))
          })
          .catch((error?: AxiosError) => {
            axiosOAuth2Service.clearWaitingQueue()
            clearToken()
            openLoginPage()
            reject({
              response: error
            })
          })
      })
    }

    const onHandleApiError = (response?: BaseModelErrorResponse) => {
      handleError(response)
    }
    axiosOAuth2Service.setup({
      refreshTokenCallback: refreshToken,
      apiErrorCallback: onHandleApiError,
      timeout: AXIOS_TIMEOUT,
      timeoutErrorMessage: undefined
    })
  }
  onMounted(() => {
    setupRefreshToken()
  })
}
