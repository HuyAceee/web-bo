import { ExhibitionCommonWindowDeleteDataModelRequest, ExhibitionCommonWindowGetListParamsModelRequest, ExhibitionCommonWindowPutDataModelRequest } from "@/models/services/requests/exhibition/ExhibitionWindowModelRequest"
import { BaseModelErrorResponse } from "@/models/services/responses/BaseModelResponse"
import { ExhibitionWindowGetListModelResponse } from "@/models/services/responses/exhibition/ExhibitionWindowModelResponse"
import { BaseApi } from "@/services/api/BaseApi"

class ExhibitionWindowApi extends BaseApi {
  constructor() {
    super('shop/bo/display/popup')
  }

  async getList(params: ExhibitionCommonWindowGetListParamsModelRequest): Promise<ExhibitionWindowGetListModelResponse> {
    const { data, code, message, page } = await this.get('list', params, false)
    const resData: ExhibitionWindowGetListModelResponse = {
      data: data.map((it: any) => ({ ...it })),
      code,
      message,
      totalItems: page?.totalCount ?? 0
    }
    return Promise.resolve(resData)
  }

  async updateList(data: ExhibitionCommonWindowPutDataModelRequest): Promise<BaseModelErrorResponse> {
    return this.put('list:modify', data, {}, false)
  }

  async deleteList(data: ExhibitionCommonWindowDeleteDataModelRequest): Promise<BaseModelErrorResponse> {
    return this.delete('list:delete', data, {}, false)
  }
}

export const exhibitionWindowApi = new ExhibitionWindowApi()