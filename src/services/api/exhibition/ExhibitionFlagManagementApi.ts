import { BaseApi } from '@/services/api/BaseApi'
import {
  ExhibitionFlagListRequest,
  ExhibitionFlagListRequestModel,
  ExhibitionModifyFlagListRequest
} from '@/models/services/requests/exhibition/ExhibitionFlagManagementRequest'
import { ExhibitionFlagListResponseModel } from '@/models/services/responses/exhibition/ExhibitionFlagManagementResponse'
import { ExhibitionFlagManagementTableModel } from '@/models/views/exhibition/exhibitionCommon/ExhibitionCommonFlagManagementModel'
import { BaseModelErrorResponse, DataTablePaginationResponseModel } from '@/models/services/responses/BaseModelResponse'

export class ExhibitionFlagManagementApi extends BaseApi {
  constructor() {
    super('shop/bo/display/flag')
  }

  async getFlagList(params: ExhibitionFlagListRequest): Promise<DataTablePaginationResponseModel<ExhibitionFlagManagementTableModel>> {
    const { data, page } = await this.get('list', params)
    let dataLength = data.length
    const resData: DataTablePaginationResponseModel<ExhibitionFlagManagementTableModel> = {
      totalItems: page.totalCount,
      data: data
        .sort((a: ExhibitionFlagListResponseModel, b: ExhibitionFlagListResponseModel) => {
          if (b.flagDisplayOrder !== a.flagDisplayOrder) {
            return (b?.flagDisplayOrder ?? 0) - (a?.flagDisplayOrder ?? 0)
          } else {
            const date1 = new Date(`${a?.displayStartDate} ${a?.displayStartTime}`).getTime()
            const date2 = new Date(`${b?.displayStartDate} ${b?.displayStartTime}`).getTime()
            return date1 - date2
          }
        })
        .map((it: ExhibitionFlagListResponseModel): ExhibitionFlagManagementTableModel => {
          return {
            ...it,
            rowNum: dataLength--,
            id: it?.flagKey,
            isSelected: false
          }
        })
    }
    return Promise.resolve(resData)
  }

  async deleteFlagList(deleteList: string[]): Promise<BaseModelErrorResponse> {
    return this.delete('list:delete', { deleteList: deleteList })
  }

  async modifyFlagList(modifyRequestList: ExhibitionModifyFlagListRequest): Promise<BaseModelErrorResponse> {
    return this.put('list:modify', modifyRequestList)
  }

  async excelDownloadFlagList(params: ExhibitionFlagListRequestModel) {
    return this.get('list/excel:download', params)
  }
}

export const exhibitionFlagManagementApi = new ExhibitionFlagManagementApi()
