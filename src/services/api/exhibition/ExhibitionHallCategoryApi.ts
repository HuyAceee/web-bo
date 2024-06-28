import { ExhibitionHallCategoryDeleteDataLowerModelRequest, ExhibitionHallCategoryRegisLowerListModelRequest } from "@/models/services/requests/exhibition/ExhibitionHallCategoryModelRequest"
import { BaseModelErrorResponse } from "@/models/services/responses/BaseModelResponse"
import { ExhibitionHallCategoryGeLowerDetailModelResponse, ExhibitionHallCategoryGetLowerListModelResponse, ExhibitionHallCategoryGetUpperDetailModelResponse, ExhibitionHallCategoryGetUpperListModelResponse } from "@/models/services/responses/exhibition/ExhibitionHallCategoryModelResponse"
import { ExhibitionContentHallCategoryLowerDetail, ExhibitionContentHallCategoryUpperDetail } from "@/models/views/exhibition/exhibitionContent/ExhibitionContentHallCategoryModel"
import { BaseApi } from "@/services/api/BaseApi"

class ExhibitionHallCategoryApi extends BaseApi {
  constructor() {
    super('shop/bo/display/pavilion')
  }

  async getUpperList(customerId: string): Promise<ExhibitionHallCategoryGetUpperListModelResponse> {
    const resData = await this.get(`upper/list/${customerId}`)
    return Promise.resolve(resData)
  }

  async getUpperDetail(params: {
    lclassCode: string | number,
    customerId: string | number
  }): Promise<ExhibitionHallCategoryGetUpperDetailModelResponse> {
    const resData = await this.get(`upper/detail`, params)
    return Promise.resolve(resData)
  }

  async updateUpper(data: ExhibitionContentHallCategoryUpperDetail): Promise<BaseModelErrorResponse> {
    return this.put(`upper/detail:modify`, data, {}, false)
  }

  async getLowerList(params: {
    customerId: string | number,
    lclassCode: string | number
  }): Promise<ExhibitionHallCategoryGetLowerListModelResponse> {
    const resData = await this.get(`lower/list`, params)
    return Promise.resolve(resData)
  }

  async getLowerDetail(params: {
    customerId: string | number,
    lclassCode: string | number
    sclassCode: string | number
  }): Promise<ExhibitionHallCategoryGeLowerDetailModelResponse> {
    const resData = await this.get(`lower/detail`, params)
    return Promise.resolve(resData)
  }

  async registerLowerList(data: ExhibitionHallCategoryRegisLowerListModelRequest): Promise<BaseModelErrorResponse> {
    return this.post(`lower/list:register`, data, {}, false)
  }

  async updateLower(data: ExhibitionContentHallCategoryLowerDetail): Promise<BaseModelErrorResponse> {
    return await this.put(`lower/detail:modify`, data, {}, false)
  }

  async deleteLower(data: ExhibitionHallCategoryDeleteDataLowerModelRequest): Promise<BaseModelErrorResponse> {
    return this.delete(`lower/list:delete`, data, {}, false)
  }
}

export const exhibitionHallCategoryApi = new ExhibitionHallCategoryApi()