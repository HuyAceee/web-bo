import { BaseModelErrorResponse } from '@/models/services/responses/BaseModelResponse'
import {
  ExhibitionCommonWindowRegistrationDetailDisplayPopupModelResponse,
  ExhibitionCommonWindowRegistrationDetailExcludeCustomerModelResponse,
  ExhibitionCommonWindowRegistrationDetailModelResponse
} from '@/models/services/responses/exhibition/exhibitionCommon/ExhibitionCommonWindowRegistrationResponse'
import { ExhibitionCommonWindowRegistrationPopupModel } from '@/models/views/exhibition/exhibitionCommon/ExhibitionCommonWindowRegistrationModel'
import { BaseApi } from '@/services/api/BaseApi'

class ExhibitionWindowRegistrationApi extends BaseApi {
  constructor() {
    super('shop/bo/display/popup')
  }
  //get data form basic
  async getDetail(keywordKey: string | number): Promise<ExhibitionCommonWindowRegistrationDetailModelResponse> {
    const resData = await this.get(`detail/${keywordKey}`)
    return Promise.resolve(resData)
  }
  //get data exclude customer
  async getDetailExcludeCustomer(keywordKey: string | number): Promise<ExhibitionCommonWindowRegistrationDetailExcludeCustomerModelResponse> {
    const { data, code, message } = await this.get(`detail/exclude-customer/${keywordKey}`)
    const resData = {
      code,
      message,
      data: data.map((it: any) => ({ ...it, customerStatus: it?.customerUseYn, contractStatus: it?.lastContractStatusName }))
    }
    return Promise.resolve(resData)
  }
  //get data popup display
  async getDetailDisplayPopup(keywordKey: string | number): Promise<ExhibitionCommonWindowRegistrationDetailDisplayPopupModelResponse> {
    const { data, code, message } = await this.get(`detail/display/${keywordKey}`)
    const resData = {
      code,
      message,
      data
    }
    return Promise.resolve(resData)
  }
  // post registration
  async register(data: ExhibitionCommonWindowRegistrationPopupModel): Promise<BaseModelErrorResponse> {
    return this.post('detail:register', data, {}, false)
  }
  // update
  async update(data: ExhibitionCommonWindowRegistrationPopupModel): Promise<BaseModelErrorResponse> {
    return this.put('detail:modify', data, {}, false)
  }
  //upload file
  async uploadFile(file: any) {
    const data = new FormData()
    data.append('file', file)
    return this.postMultipart('detail/file:upload', data, {}, false)
  }
}

export const exhibitionWindowRegistrationApi = new ExhibitionWindowRegistrationApi()
