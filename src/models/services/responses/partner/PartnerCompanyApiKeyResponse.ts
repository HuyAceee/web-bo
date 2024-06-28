import { BaseModelResponse } from '@/models/services/responses/BaseModelResponse'
import { YnOptions } from '@/models'

export interface PartnerCompanyApiKeyResponse extends BaseModelResponse<PartnerCompanyApiKeyModel> {
}

export interface PartnerCompanyApiKeyModel {
  apiKey: string
  useYn: YnOptions
}