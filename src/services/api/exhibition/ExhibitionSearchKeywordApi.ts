import { ExhibitionCommonSearchKeywordDeleteDataModelRequest, ExhibitionCommonSearchKeywordGetListParamsModelRequest, ExhibitionCommonSearchKeywordPutDataModelRequest } from "@/models/services/requests/exhibition/ExhibitionSearchKeywordModelRequest"
import { BaseModelErrorResponse } from "@/models/services/responses/BaseModelResponse"
import { ExhibitionDetailExcludeCustomerModelResponse } from "@/models/services/responses/exhibition/ExhibitionExcludeCustomerModelRespone"
import { ExhibitionSearchKeyWordDetailModelResponse, ExhibitionSearchKeyWordGetListModelResponse } from "@/models/services/responses/exhibition/ExhibitionSearchKeywordModelResponse"
import { ExhibitionCommonSearchKeywordDetailModel } from "@/models/views/exhibition/exhibitionCommon/ExhibitionCommonSearchKeywordModel"
import { BaseApi } from "@/services/api/BaseApi"

class ExhibitionSearchKeywordApi extends BaseApi {
  constructor() {
    super('shop/bo/display/search-box-keyword')
  }

  async getList(params: ExhibitionCommonSearchKeywordGetListParamsModelRequest): Promise<ExhibitionSearchKeyWordGetListModelResponse> {
    const { data, code, message, page } = await this.get('list', params, false)
    const resData: ExhibitionSearchKeyWordGetListModelResponse = {
      data: data.map((it: any) => ({ ...it })),
      code,
      message,
      totalItems: page?.totalCount ?? 0
    }
    return Promise.resolve(resData)
  }

  async updateList(data: ExhibitionCommonSearchKeywordPutDataModelRequest): Promise<BaseModelErrorResponse> {
    return this.put('list:modify', data, {}, false)
  }

  async deleteList(data: ExhibitionCommonSearchKeywordDeleteDataModelRequest): Promise<BaseModelErrorResponse> {
    return this.delete('list:delete', data, {}, false)
  }

  async getDetail(keywordKey: string | number): Promise<ExhibitionSearchKeyWordDetailModelResponse> {
    const resData = await this.get(`detail/${keywordKey}`)
    return Promise.resolve(resData)
  }

  async getDetailExcludeCustomer(keywordKey: string | number): Promise<ExhibitionDetailExcludeCustomerModelResponse> {

    const { data, code, message } = await this.get(`detail/exclude-customer/${keywordKey}`)
    const resData = {
      code, message, data: data.map((it: any) => ({ ...it, customerStatus: it?.customerUseYn, contractStatus: it?.lastContractStatusName }))
    }
    return Promise.resolve(resData)
  }

  async register(data: ExhibitionCommonSearchKeywordDetailModel): Promise<BaseModelErrorResponse> {
    return this.post('detail:register', data, {}, false)
  }

  async update(data: ExhibitionCommonSearchKeywordDetailModel): Promise<BaseModelErrorResponse> {
    return this.put('detail:modify', data, {}, false)
  }
}

export const exhibitionSearchKeywordApi = new ExhibitionSearchKeywordApi()