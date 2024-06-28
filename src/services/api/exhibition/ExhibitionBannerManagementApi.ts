import { BaseApi } from '@/services/api/BaseApi'
import {
  ExhibitionBannerGroupListRequest,
  ExhibitionBannerGroupListRequestModel,
  ExhibitionBannerListRequest,
  ExhibitionCommonModifyBannerGroupListRequest,
  ExhibitionCommonModifyBannerListRequest
} from '@/models/services/requests/exhibition/ExhibitionBannerManagementRequest'
import {
  ExhibitionBannerGroupListResponseModel,
  ExhibitionBannerListResponseModel
} from '@/models/services/responses/exhibition/exhibitionCommon/ExhibitionCommonBannerManagementResponse'
import { BaseModelErrorResponse, DataTablePaginationResponseModel } from '@/models/services/responses/BaseModelResponse'
import {
  ExhibitionBannerGroupListTableModel,
  ExhibitionBannerListTableModel
} from '@/models/views/exhibition/exhibitionCommon/ExhibitionCommonBannerManagementModel'

export class ExhibitionBannerManagementApi extends BaseApi {
  constructor() {
    super('shop/bo/display/banner')
  }

  async getBannerGroupList(params: ExhibitionBannerGroupListRequest): Promise<DataTablePaginationResponseModel<ExhibitionBannerGroupListTableModel>> {
    const { data, page } = await this.get('group/list', params)
    const resData = {
      data: data.map((it: ExhibitionBannerGroupListResponseModel): ExhibitionBannerGroupListTableModel => {
        return { ...it, id: it?.bannerGroupKey ?? NaN, isSelected: false }
      }),
      totalItems: page.totalCount
    }
    return Promise.resolve(resData)
  }

  async getBannerGroupListExcelDownload(params: ExhibitionBannerGroupListRequestModel) {
    return this.get('group/list/excel:download', params)
  }

  async getBannerListExcelDownload(bannerGroupKey: number) {
    return this.get('list/excel:download', { bannerGroupKey: bannerGroupKey })
  }

  async getBannerList(params: ExhibitionBannerListRequest) {
    const { data, page } = await this.get('list', params)
    const resData = {
      data: data.map((it: ExhibitionBannerListResponseModel): ExhibitionBannerListTableModel => {
        return { ...it, id: it?.bannerKey ?? NaN, isSelected: false }
      }),
      totalItems: page.totalCount
    }
    return Promise.resolve(resData)
  }

  async modifyBannerGroupList(body: ExhibitionCommonModifyBannerGroupListRequest): Promise<BaseModelErrorResponse> {
    return this.put('group/list:modify', body)
  }

  async modifyBannerList(body: ExhibitionCommonModifyBannerListRequest): Promise<BaseModelErrorResponse> {
    return this.put('list:modify', body)
  }

  async deleteBannerGroupList(deleteList: string[]): Promise<BaseModelErrorResponse> {
    return this.delete('group/list:delete', { deleteList: deleteList })
  }

  async deleteBannerList(deleteList: string[]): Promise<BaseModelErrorResponse> {
    return this.delete('list:delete', { deleteList: deleteList })
  }
}

export const exhibitionBannerManagementApi = new ExhibitionBannerManagementApi()
