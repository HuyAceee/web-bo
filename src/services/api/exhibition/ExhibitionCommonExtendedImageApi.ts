import { BaseApi } from '@/services/api/BaseApi'
import {
  ExhibitionCommonExtendedImageListRequest,
  ExhibitionCommonExtendedImageListRequestModel,
  ExhibitionCommonExtendedImageModifyRequestListType
} from '@/models/services/requests/exhibition/ExhibitionCommonExtensibleImageManagementRequest'
import { ExhibitionCommonExtendedImageListResponseModel } from '@/models/services/responses/exhibition/exhibitionCommon/ExhibitionCommonExtensibleImageManagementResponse'
import { ExhibitionCommonExtensibleImageManagementTableModel } from '@/models/views/exhibition/exhibitionCommon/ExhibitionCommonExtensibleImageManagementModel'
import { DataTablePaginationResponseModel } from '@/models/services/responses/BaseModelResponse'

export class ExhibitionCommonExtendedImageApi extends BaseApi {
  constructor() {
    super('shop/bo/display/extended-image')
  }

  async getExtendedImageList(
    params: ExhibitionCommonExtendedImageListRequest
  ): Promise<DataTablePaginationResponseModel<ExhibitionCommonExtensibleImageManagementTableModel>> {
    const { data, page } = await this.get('list', params)
    const resData: DataTablePaginationResponseModel<ExhibitionCommonExtensibleImageManagementTableModel> = {
      data: data.map((it: ExhibitionCommonExtendedImageListResponseModel): ExhibitionCommonExtensibleImageManagementTableModel => {
        return {
          ...it,
          id: it?.productKey,
          isSelected: false
        }
      }),
      totalItems: page.totalCount
    }
    return Promise.resolve(resData)
  }

  async modifyExtendedImageList(body: ExhibitionCommonExtendedImageModifyRequestListType[]) {
    return this.put('list:modify', { modifyRequestList: body })
  }

  async deleteExtendedImageList(deleteList: string[]) {
    return this.delete('list:delete', { deleteList: deleteList })
  }

  async excelDownload(params: ExhibitionCommonExtendedImageListRequestModel) {
    return this.get('list/excel:download', params)
  }

  async imageFileUpload(file: any) {
    return this.postMultipart('list/file:upload', { file: file })
  }
}

export const exhibitionCommonExtendedImageApi = new ExhibitionCommonExtendedImageApi()
