import { BaseModelErrorResponse, BaseModelResponse } from '@/models/services/responses/BaseModelResponse'
import {
  ExhibitionContentSpecialConnectionDetailModelResponse,
  ExhibitionContentSpecialConnectionDetailWithCouponKeyModelResponse,
  ExhibitionContentSpecialConnectionDetailWithExcludeCustomerModelResponse,
  ExhibitionContentSpecialConnectionDetailWithKeywordModelResponse
} from '@/models/services/responses/exhibition/exhibitionContent/ExhibitionContentSpecialConnectionManagementResponse'
import {
  ExhibitionCornerListModel,
  ExhibitionCornerProductListModel
} from '@/models/views/exhibition/exhibitionContent/ExhibitionConnectionMngtModel'
import { ExhibitionContentSpecialConnectionManagementPopupModel } from '@/models/views/exhibition/exhibitionContent/ExhibitionSpecialConnectionManagementModel'
import { BaseApi } from '@/services/api/BaseApi'
class ExhibitionSpecialConnectionManagementApi extends BaseApi {
  constructor() {
    super('shop/bo/display/exhibition')
  }
  //upload file
  async uploadFile(file: any) {
    const data = new FormData()
    data.append('file', file)
    return this.postMultipart('detail/file:upload', data, {}, false)
  }
  // get detail
  async getDetail(exhibitionKey: string | number): Promise<ExhibitionContentSpecialConnectionDetailModelResponse> {
    const resData = await this.get(`detail/${exhibitionKey}`)
    return Promise.resolve(resData)
  }
  //get data exclude customer
  async getDetailExcludeCustomer(exhibitionKey: string | number): Promise<ExhibitionContentSpecialConnectionDetailWithExcludeCustomerModelResponse> {
    const { data, code, message } = await this.get(`detail/exclude-customer/${exhibitionKey}`)
    const resData = {
      code,
      message,
      data: data.map((it: any) => ({ ...it, customerStatus: it?.customerUseYn, contractStatus: it?.lastContractStatusName }))
    }
    return Promise.resolve(resData)
  }
  // get data keywordName
  async getDetailKeywordName(exhibitionKey: string | number): Promise<ExhibitionContentSpecialConnectionDetailWithKeywordModelResponse> {
    const { data, code, message } = await this.get(`detail/keyword/${exhibitionKey}`)
    const resData = { data, code, message }
    return Promise.resolve(resData)
  }
  //get data coupon detail
  async getDetailCoupon(exhibitionKey: string | number): Promise<ExhibitionContentSpecialConnectionDetailWithCouponKeyModelResponse> {
    const { data, code, message } = await this.get(`detail/coupon/${exhibitionKey}`)
    const resData = { data, code, message }
    return Promise.resolve(resData)
  }
  //get data conner list
  async getCornerList(exhibitionKey: string | number): Promise<BaseModelResponse<ExhibitionCornerListModel[]>> {
    const { data, message, code } = await this.get(`detail/corner/${exhibitionKey}`)
    const resData = { data, code, message }
    return Promise.resolve(resData)
  }
  //get data conner product list
  async getCornerProductList(exhibitionKey: string | number): Promise<BaseModelResponse<ExhibitionCornerProductListModel[]>> {
    return this.get(`detail/corner-product/${exhibitionKey}`)
  }
  //post
  async register(data: ExhibitionContentSpecialConnectionManagementPopupModel): Promise<BaseModelErrorResponse> {
    return this.post('detail:register', data, {}, false)
  }
  //put
  async modify(data: ExhibitionContentSpecialConnectionManagementPopupModel): Promise<BaseModelErrorResponse> {
    return this.put('detail:modify', data, {}, false)
  }
}

export const exhibitionSpecialConnectionManagementApi = new ExhibitionSpecialConnectionManagementApi()
