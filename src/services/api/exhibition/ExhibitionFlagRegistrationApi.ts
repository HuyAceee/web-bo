import { BaseApi } from '@/services/api/BaseApi'
import { ExhibitionFlagDetailRegisterRequest } from '@/models/services/requests/exhibition/ExhibitionFlagRegistrationPopupRequest'
import { ExhibitionTemplateFileUploadResponse } from '@/models/services/responses/display/templateManagement/ExhibitionTemplateDataResponse'
import { BaseModelErrorResponse } from '@/models/services/responses/BaseModelResponse'
import { ExhibitionDeleteAttachedFileRequest } from '@/models/services/requests/exhibition/ExhibitionTemplateManagementRequest'
import {
  ExhibitionGetFlagDetailByKeyResponse,
  ExhibitionGetFlagDetailDisplayProductByKeyResponse
} from '@/models/services/responses/exhibition/ExhibitionFlagRegistrationResponse'

export class ExhibitionFlagRegistrationApi extends BaseApi {
  constructor() {
    super('shop/bo/display/flag')
  }

  async flagDetailRegister(body: ExhibitionFlagDetailRegisterRequest) {
    return this.post('detail:register', body)
  }

  async flagDetailModify(body: ExhibitionFlagDetailRegisterRequest) {
    return this.put('detail:modify', body)
  }

  async flagImageUpload(file: any): Promise<ExhibitionTemplateFileUploadResponse> {
    return this.postMultipart('detail/file:upload', { file: file })
  }

  async flagImageDelete(body: ExhibitionDeleteAttachedFileRequest): Promise<BaseModelErrorResponse> {
    return this.delete('detail/file:delete', body)
  }

  async getFlagDetail(flagKey: string): Promise<ExhibitionGetFlagDetailByKeyResponse> {
    return this.get(`detail/${flagKey}`)
  }

  async getFlagDetailDisplayProduct(flagKey: string): Promise<ExhibitionGetFlagDetailDisplayProductByKeyResponse> {
    return this.get(`detail/display-product/${flagKey}`)
  }
}

export const exhibitionFlagRegistrationApi = new ExhibitionFlagRegistrationApi()
