import { axiosOAuth2Service } from '../AxiosOAuth2Service'
import qs from 'qs'
import { AxiosError, AxiosResponse } from 'axios'
import { AppConfig, SYSTEM_ERROR_ROUTER } from '@/common'
import router from '@/router'
import { BaseModelErrorResponse } from '@/models/services/responses/BaseModelResponse'

export class BaseApi {
  apiHostUrl = `${AppConfig.host}`
  baseUri?: string

  constructor(baseUri?: string) {
    this.baseUri = baseUri
  }

  createDefaultHeader(header: any = {}): Record<string, string> {
    return {
      ...header
      // 'Accept-Language': currentLanguge === 'en' ? 'en-US' : currentLanguge ?? 'vi',
      // 'Accept-Language': 'en-US'
    }
  }

  async get(uri: string, params: any = {}, isShowErrorModal: boolean = true, noAddPrefix = false, header: any = {}) {
    const url = this.createUrl(uri, noAddPrefix)
    return axiosOAuth2Service
      .getAxiosInstance()
      ?.get(url, {
        params,
        headers: this.createDefaultHeader(header)
      })
      .then((response) => this.onSuccess(response))
      .catch((error) => {
        return this.onFailed(error, isShowErrorModal)
      })
  }

  async getBlob(uri: string, params: any = {}, isShowErrorModal: boolean = true, noAddPrefix = false, header: any = {}) {
    const url = this.createUrl(uri, noAddPrefix)
    return axiosOAuth2Service
      .getAxiosInstance()
      ?.get(url, {
        params,
        headers: this.createDefaultHeader(header),
        responseType: 'blob'
      })
      .then((response) => this.onSuccess(response))
      .catch((error) => {
        return this.onFailed(error, isShowErrorModal)
      })
  }

  async post(uri: string, data: any = {}, params: any = {}, isShowErrorModal: boolean = true, noAddPrefix = false, header: any = {}) {
    const url = this.createUrl(uri, noAddPrefix)
    return axiosOAuth2Service
      .getAxiosInstance()
      ?.post(url, data, {
        params,
        headers: this.createDefaultHeader(header)
      })
      .then((response) => response?.data)
      .catch((error) => {
        return this.onFailed(error, isShowErrorModal)
      })
  }

  async postRaw(uri: string, data: any = {}, params: any = {}, isShowErrorModal: boolean = true, noAddPrefix = false, header: any = {}) {
    const url = this.createUrl(uri, noAddPrefix)
    return axiosOAuth2Service
      .getAxiosInstance()
      ?.post(url, data, {
        params,
        headers: this.createDefaultHeader(header)
      })
      .then((response: any) => {
        return response
      })
      .catch((error) => {
        return this.onFailed(error, isShowErrorModal)
      })
  }

  async postMultipart(uri: string, data: any = {}, params: any = {}, isShowErrorModal: boolean = true, noAddPrefix = false, header: any = {}) {
    const url = this.createUrl(uri, noAddPrefix)
    return axiosOAuth2Service
      .getAxiosInstance()
      ?.post(url, data, {
        params,
        headers: {
          ...{ 'Content-Type': 'multipart/form-data' },
          ...this.createDefaultHeader(header)
        }
      })
      .then((response) => response?.data)
      .catch((error) => {
        return this.onFailed(error, isShowErrorModal)
      })
  }

  async postUrlEncoded(
    uri: string,
    data: any = {},
    isShowErrorModal: boolean = true,
    noAddPrefix = false,
    header: any = {},
    onErrorHandler?: (error?: object) => void
  ) {
    const url = this.createUrl(uri, noAddPrefix)
    return axiosOAuth2Service
      .getAxiosInstance()
      ?.post(url, qs.stringify(data), {
        headers: {
          ...{ 'content-type': 'application/x-www-form-urlencoded' },
          ...this.createDefaultHeader(header)
        }
      })
      .then((response: AxiosResponse) => response?.data)
      .catch((error: AxiosError) => {
        onErrorHandler?.(error)
        return this.onFailed(error, isShowErrorModal)
      })
  }

  async put(uri: string, data: any = {}, params: any = {}, isShowErrorModal: boolean = true, noAddPrefix = false, header: any = {}) {
    const url = this.createUrl(uri, noAddPrefix)
    return axiosOAuth2Service
      .getAxiosInstance()
      ?.put(url, data, {
        params,
        headers: this.createDefaultHeader(header)
      })
      .then((response) => response?.data)
      .catch((error) => {
        return this.onFailed(error, isShowErrorModal)
      })
  }

  async delete(uri: string, data: any = {}, params: any = {}, isShowErrorModal: boolean = true, noAddPrefix = false, header: any = {}) {
    const url = this.createUrl(uri, noAddPrefix)
    return axiosOAuth2Service
      .getAxiosInstance()?.({
        method: 'delete',
        headers: this.createDefaultHeader(header),
        url,
        data,
        params
      })
      .then((response) => response?.data)
      .catch((error) => {
        return this.onFailed(error, isShowErrorModal)
      })
  }

  createUrl(uri: string, noPrefix = false) {
    let result = ''
    if (noPrefix){
      result = uri
    } else {
      if (this.baseUri){
        result = `${this.apiHostUrl}/${this.baseUri}/${uri}`
      } else {
        result = `${this.apiHostUrl}/${uri}`
      }
    }
    return result
  }

  onSuccess = (response: any) => {
    let ret = null
    if (response?.status === 200) {
      ret = response.data
    }
    return ret
  }

  onFailed = (error: AxiosError, isShowErrorModal: boolean = true) => {
    if (error.status === 500 || error.status === 408) {
      router?.push(SYSTEM_ERROR_ROUTER)
    } else if (isShowErrorModal) {
      let result: BaseModelErrorResponse | undefined
      if (typeof error.response?.data === 'string') {
        result = {
          message: error.response?.data
        }
      } else {
        result = error.response?.data as AxiosError
      }
      axiosOAuth2Service.fireResponseError(result)
    }
    return Promise.reject(error.response)
  }
}
