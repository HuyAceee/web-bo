import {
  OperatingManagementFooterImageResponse,
  OperatingManagementFooterInfoResponse
} from '@/models/services/responses/operating/OperatingManagementFooterInfoResponse'
import { BaseApi } from '../BaseApi'
import { OperatingManagementFooterInfoRequest } from '@/models/services/requests/operating/OperatingManagementFooterInfoRequest'
import { BaseModelErrorResponse } from '@/models/services/responses/BaseModelResponse'

class OperatingManagementFooterInfoApi extends BaseApi {
  constructor() {
    super('operation')
  }
  getFooterInformation(): Promise<OperatingManagementFooterInfoResponse> {
    return this.get('bo/footers')
  }
  getImage(imageUrl: string): Promise<OperatingManagementFooterImageResponse> {
    return this.getBlob(imageUrl)
  }
  saveFooterInformation(data: OperatingManagementFooterInfoRequest): Promise<BaseModelErrorResponse> {
    return this.post('bo/footers', data)
  }
  updateFooterInformation(data: OperatingManagementFooterInfoRequest): Promise<BaseModelErrorResponse> {
    return this.put('bo/footers', data)
  }
}

export const operatingManagementFooterInfoApi = new OperatingManagementFooterInfoApi()
