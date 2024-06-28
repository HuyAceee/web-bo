import { ACCESS_TOKEN, AXIOS_TIMEOUT, storage } from '@/common'
import axios, { AxiosError, AxiosRequestConfig, AxiosInstance } from 'axios'
import { BaseModelErrorResponse } from '@/models/services/responses/BaseModelResponse'
import { API_RESPONSE_STATUS } from './api/ApiResponseCode'
/*
 * File Created: Friday February 2020
 * Author: pahmcougn
 * -----
 * Last Modified: Friday February 2020
 * Modified By: pahmcougn
 * -----
 * Copyright © 2020
 */
/**
 * This class add one interceptor to detect response data of all api in app.
 * It design for authentication mechanism is OAuth-2. I use axios library to call api
 * if once api has error with code = 401, that mean access token was expired,
 * we should call api refresh token to get new one access token and refresh token
 * in the time, we refresh token, if any request api to come, we will add them to and waiting array.
 * After we refresh token success, we will retry all request in the waiting array with new access token.
 *
 */
class AxiosOAuth2Service {
  /**
   * the flag to mark we are doing refresh token, when it equals true that mean we are in process to refresh token
   */
  isRefreshing = false
  /**
   * the array to store all resolved and reject promise of all api has been called while we call refresh token
   */
  waitingPromiseQueue?: [{ resolve?: (value?: string) => void; reject?: (reason?: any) => void }]
  /**
   * the refresh token callback, it will be call to client for get new access token and refresh token
   */
  refreshTokenCallback?: (originalRequestConfig: AxiosRequestConfig) => Promise<any>

  apiErrorCallback?: (response?: BaseModelErrorResponse) => void

  axiosInstance: AxiosInstance | undefined

  constructor() {
    this.initial()
    this.waitingPromiseQueue = [{}]
  }
  /**
   * initial interceptor to deact all request and api response
   */
  private initial() {
    this.axiosInstance = axios.create()
    this.axiosInstance.interceptors.response.use(
      (response) => {
        return response
      },
      (error: AxiosError) => {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const self = this
        const originalRequestConfig: any = error.config ?? {}
        if (error.response && error.response?.status === API_RESPONSE_STATUS.UNAUTHORIZED) {
          if (originalRequestConfig.url.includes('bo/auth:reissue') || originalRequestConfig.url.includes('bo/auth:login')) {
            return Promise.reject(error)
          } else {
            if (self.isRefreshing) {
              return new Promise<string | undefined>(function (resolve, reject) {
                self.waitingPromiseQueue?.push({ resolve, reject })
              })
                .then((token?: string) => {
                  originalRequestConfig.headers['Authorization'] = `Bearer ${token}`
                  return axios(originalRequestConfig)
                })
                .catch((err) => {
                  return Promise.reject(err)
                })
            }
            self.isRefreshing = true
            return this.refreshToken(originalRequestConfig)
          }
        } else {
          return Promise.reject(error)
        }
      }
    )
    const self = this
    this.axiosInstance.interceptors.request.use(async function (config) {
      if (config.headers['Authorization']) {
        return config
      }
      if (!self.axiosInstance?.defaults.headers.common.Authorization) {
        const accessToken = storage.get(ACCESS_TOKEN)
        if (accessToken) {
          config.headers['Authorization'] = `Bearer ${accessToken}`
          self.attachHeaderToken({
            accessToken: accessToken
          })
        }
      }
      if (!config.headers['Authorization'] && self.axiosInstance?.defaults.headers.common.Authorization) {
        config.headers['Authorization'] = self.axiosInstance?.defaults.headers.common.Authorization
      }
      return config
    })
  }

  private refreshToken(originalRequestConfig: AxiosRequestConfig): Promise<any> {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this
    return new Promise(function (resolve, reject) {
      ;(self.refreshTokenCallback ? self.refreshTokenCallback(originalRequestConfig) : Promise.reject(new Error()))
        .then((response) => {
          self.isRefreshing = false
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  /**
   * This function will be called in client to set up callback refresh token action when we refresh token success
   * @param _refreshTokenCallback
   */
  setup(params?: {
    refreshTokenCallback?: (originalRequestConfig: AxiosRequestConfig) => Promise<any>
    apiErrorCallback?: (response?: BaseModelErrorResponse) => void
    timeout?: number
    timeoutErrorMessage?: string
  }) {
    if (!params?.refreshTokenCallback) {
      throw new Error('the refresh token must be initial')
    }
    this.refreshTokenCallback = params?.refreshTokenCallback
    this.apiErrorCallback = params?.apiErrorCallback
    if (this.axiosInstance) {
      this.axiosInstance.defaults.timeout = params?.timeout ?? AXIOS_TIMEOUT
      this.axiosInstance.defaults.timeoutErrorMessage = params?.timeoutErrorMessage
    }
  }
  processWaitingQueue = (error?: any, newAccessToken?: string) => {
    this.waitingPromiseQueue?.forEach((item) => {
      if (error) {
        if (item.reject) {
          item.reject(error)
        }
      } else if (item.resolve) {
        item.resolve(newAccessToken)
      }
    })
    this.clearWaitingQueue()
  }

  clearWaitingQueue() {
    this.waitingPromiseQueue = [{}]
    this.isRefreshing = false
  }

  /**
   * get axios instance
   */
  getAxiosInstance(): AxiosInstance | undefined {
    return this.axiosInstance
  }

  attachHeaderToken = (params: { accessToken: string }) => {
    if (!this.axiosInstance) return
    this.axiosInstance.defaults.headers.common.Authorization = `Bearer ${params.accessToken}`
  }
  clearHeaderToken = () => {
    if (!this.axiosInstance) return
    this.axiosInstance.defaults.headers.common.Authorization = ''
  }

  fireResponseError = (response?: BaseModelErrorResponse) => {
    this.apiErrorCallback?.(response)
  }

  /**
   * example refresh token action fuction in client
   * const refreshToken = (originalRequestConfig: AxiosRequestConfig) => {
      return new Promise(function(resolve, reject) {
        AuthUtil.getRefreshToken()
          .then((refreshToken: string) => {
            return authApi
              .refreshToken(refreshToken)
              .then(response => {
                AuthUtil.saveToken(response.refresh_token, response.access_token);
                originalRequestConfig.headers['Authorization'] = `Bearer ${response.access_token}`;
                AxiosOAuth2Service.processWaittingQueue(null, response.access_token);
                resolve(axios(originalRequestConfig));
              })
              .catch((error?: AxiosError) => {
                AxiosOAuth2Service.clearWaittingQueue();
                // send force logout event
                AuthUtil.clearStorage()
                Event.emitEvent(EventName.ForceLogout);
                reject(error);
              });
          })
          .catch(error => {
            AxiosOAuth2Service.processWaittingQueue(error);
            reject(error);
          });
      });
    };
   */
}

export const axiosOAuth2Service = new AxiosOAuth2Service()
