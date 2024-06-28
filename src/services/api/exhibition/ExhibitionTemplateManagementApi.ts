import { BaseApi } from '@/services/api/BaseApi'
import {
  ExhibitionTemplateDataResponse,
  ExhibitionTemplateDetailByKeyResponse,
  ExhibitionTemplateFileUploadResponse
} from '@/models/services/responses/display/templateManagement/ExhibitionTemplateDataResponse'
import { BaseModelErrorResponse } from '@/models/services/responses/BaseModelResponse'
import {
  ExhibitionDeleteAttachedFileRequest,
  ExhibitionModifyTemplateDetailRequest,
  ExhibitionRegisterTemplateDetailRequest
} from '@/models/services/requests/exhibition/ExhibitionTemplateManagementRequest'

class ExhibitionTemplateManagementApi extends BaseApi {
  constructor() {
    super('shop')
  }

  async getTemplateTableData(): Promise<ExhibitionTemplateDataResponse> {
    return this.get('bo/display/template/list')
  }

  async getTemplateDetailByKey(templateKey: number): Promise<ExhibitionTemplateDetailByKeyResponse> {
    return this.get(`bo/display/template/detail/${templateKey}`)
  }

  async registerTemplateDetail(params: ExhibitionRegisterTemplateDetailRequest): Promise<BaseModelErrorResponse> {
    return this.post('bo/display/template/detail:register', params)
  }

  async modifyTemplateDetail(params: ExhibitionModifyTemplateDetailRequest): Promise<BaseModelErrorResponse> {
    return this.put('bo/display/template/detail:modify', params)
  }

  async uploadAttachFile(file: any): Promise<ExhibitionTemplateFileUploadResponse> {
    return this.postMultipart('bo/display/template/detail/file:upload', file)
  }

  async deleteAttachFile(data: ExhibitionDeleteAttachedFileRequest): Promise<BaseModelErrorResponse> {
    return this.delete('bo/display/template/detail/file:delete', data)
  }
}

export const exhibitionTemplateManagementApi = new ExhibitionTemplateManagementApi()
