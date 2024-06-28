import {
  OperatingSiteCategoryDetailRequest,
  OperatingSiteReOrderRequest
} from '@/models/services/requests/operating/site/OperatingSiteCategoryRequest'
import {
  OperatingCheckMenuIdResponse,
  OperatingSiteCategoryDetailResponse,
  OperatingSiteCategoryListResponse
} from '@/models/services/responses/operating/site/OperatingSiteCategoryResponse'
import { BaseApi } from '../../BaseApi'
import { AxiosResponse } from 'axios'
import { BaseModelResponse } from '@/models/services/responses/BaseModelResponse'

class OperatingSiteManagementApi extends BaseApi {
  constructor() {
    super('member/bo')
  }

  async getSiteList(): Promise<OperatingSiteCategoryListResponse> {
    return this.get('site-menus')
  }

  async getSiteDetail(menuKey: number): Promise<OperatingSiteCategoryDetailResponse> {
    return this.get('site-menus/' + menuKey)
  }

  async checkMenuId(menuId: string): Promise<OperatingCheckMenuIdResponse> {
    return this.get('site-menus/id:exists?menuId=' + menuId)
  }

  async deleteSite(menuKey: number): Promise<OperatingSiteCategoryDetailResponse> {
    return this.delete('site-menus/' + menuKey)
  }

  async updateSite(menuKey: number, request: OperatingSiteCategoryDetailRequest): Promise<OperatingSiteCategoryDetailResponse> {
    return this.put('site-menus/' + menuKey, request)
  }

  async createSite(request: OperatingSiteCategoryDetailRequest): Promise<AxiosResponse<BaseModelResponse<undefined>>> {
    return this.postRaw('site-menus', request) as any
  }

  async updateOrder(request: OperatingSiteReOrderRequest): Promise<BaseModelResponse<undefined>> {
    return this.put('site-menus/orders', request) as any
  }
}

export const operatingSiteBoCategoryApi = new OperatingSiteManagementApi()
