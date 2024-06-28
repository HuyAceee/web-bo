import { BaseApi } from '../BaseApi'

export class CompanyBaseApi extends BaseApi {
  constructor() {
    super('member/bo')
  }

  post<K>(uri: string, data?: any, params?: any, isShowErrorModal?: boolean, noAddPrefix?: boolean, header?: any): Promise<K> {
    return super.post(uri, data, params, isShowErrorModal, noAddPrefix, header) as Promise<K>
  }

  async get<K>(uri: string, params: any = {}, isShowErrorModal: boolean = true, noAddPrefix = false, header: any = {}) {
    return super.get(uri, params, isShowErrorModal, noAddPrefix, header) as Promise<K>
  }
}
