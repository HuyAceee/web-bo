import { BaseApi } from '@/services/api/BaseApi'
import { ExhibitionCornerManagementDetailRegisterCornerListRequest } from '@/models/services/requests/exhibition/modal/ExhibitionCornerManagementDetailRequest'
import { BaseModelErrorResponse } from '@/models/services/responses/BaseModelResponse'
import {
  ExhibitionCornerManagementGetListCornerResponse,
  ExhibitionCornerManagementGetListPavilionCategoryResponse
} from '@/models/services/responses/exhibition/modal/ExhibitionCornerManagementDetailResponse'

export class ExhibitionCornerManagementDetailApi extends BaseApi {
  constructor() {
    super('shop/bo/display/template')
  }

  async registerCornerList(body: ExhibitionCornerManagementDetailRegisterCornerListRequest): Promise<BaseModelErrorResponse> {
    return this.post('corner/list:register', body)
  }

  async getListPavilionCategory(customerId: string): Promise<ExhibitionCornerManagementGetListPavilionCategoryResponse> {
    return this.get(`pavilion-category/list/${customerId}`)
  }

  async getListCorner(customerId: string): Promise<ExhibitionCornerManagementGetListCornerResponse> {
    return this.get(`corner/list/${customerId}`)
  }
}

export const exhibitionCornerManagementDetailApi = new ExhibitionCornerManagementDetailApi()
