import { ExhibitionCommonSearchBannerDeleteDataModelRequest, ExhibitionCommonSearchBannerGetListParamsModelRequest, ExhibitionCommonSearchBannerPutDataModelRequest } from "@/models/services/requests/exhibition/ExhibitionSearchBannerModelRequest"
import { BaseModelErrorResponse } from "@/models/services/responses/BaseModelResponse"
import { ExhibitionDetailExcludeCustomerModelResponse } from "@/models/services/responses/exhibition/ExhibitionExcludeCustomerModelRespone"
import { ExhibitionSearchBannerDetailModelResponse, ExhibitionSearchBannerGetListModelResponse } from "@/models/services/responses/exhibition/ExhibitionSearchBannerModelResponse"
import { ExhibitionCommonSearchBannerDetailModel } from "@/models/views/exhibition/exhibitionCommon/ExhibitionCommonSearchBannerModel"
import { BaseApi } from "@/services/api/BaseApi"


class ExhibitionSearchBannerApi extends BaseApi {
  constructor() {
    super('shop/bo/display/search-word-banner')
  }

  async getList(params: ExhibitionCommonSearchBannerGetListParamsModelRequest): Promise<ExhibitionSearchBannerGetListModelResponse> {
    const { data, code, message, page } = await this.get('list', params, false)
    const resData: ExhibitionSearchBannerGetListModelResponse = {
      data: data.map((it: any) => ({ ...it })),
      code,
      message,
      totalItems: page?.totalCount ?? 0
    }
    return Promise.resolve(resData)
  }

  async updateList(data: ExhibitionCommonSearchBannerPutDataModelRequest): Promise<BaseModelErrorResponse> {
    return this.put('list:modify', data, {}, false)
  }

  async deleteList(data: ExhibitionCommonSearchBannerDeleteDataModelRequest): Promise<BaseModelErrorResponse> {
    return this.delete('list:delete', data, {}, false)
  }

  async getDetail(bannerKey: string | number): Promise<ExhibitionSearchBannerDetailModelResponse> {
    const resData = await this.get(`detail/${bannerKey}`)
    return Promise.resolve(resData)
  }

  async getDetailExcludeCustomer(bannerKey: string | number): Promise<ExhibitionDetailExcludeCustomerModelResponse> {

    const { data, code, message } = await this.get(`detail/exclude-customer/${bannerKey}`)
    const resData = {
      code, message, data: data.map((it: any) => ({ ...it, customerStatus: it?.customerUseYn, contractStatus: it?.lastContractStatusName }))
    }
    return Promise.resolve(resData)
  }

  async register(data: ExhibitionCommonSearchBannerDetailModel): Promise<BaseModelErrorResponse> {
    return this.post('detail:register', data, {}, false)
  }

  async update(data: ExhibitionCommonSearchBannerDetailModel): Promise<BaseModelErrorResponse> {
    return this.put('detail:modify', data, {}, false)
  }

  async uploadFile(file: any) {
    const data = new FormData()
    data.append('file', file)
    return this.postMultipart('detail/file:upload', data, {}, false)
  }
}

export const exhibitionSearchBannerApi = new ExhibitionSearchBannerApi()