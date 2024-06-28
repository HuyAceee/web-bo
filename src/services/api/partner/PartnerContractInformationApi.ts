import { PartnerContractInformationParamsRequest } from '@/models/services/requests/partner/PartnerContractInformationRequest'
import { BaseApi } from '../BaseApi'
import {
  PartnerContractInfoFileModel,
  PartnerContractInfoResponse,
  PartnerContractInfoTableResponse
} from '@/models/services/responses/partner/PartnerContractInformationResponse'

class PartnerContractInformationApi extends BaseApi {
  constructor() {
    super('member/bo')
  }

  async getDetail(sellerKey: string): Promise<PartnerContractInfoResponse> {
    return this.get(`seller-companies/${sellerKey}/contracts:last`)
  }
  async downloadFile(link: string): Promise<PartnerContractInfoFileModel> {
    return this.getBlob(link)
  }
  async getList(sellerKey: string, params: PartnerContractInformationParamsRequest): Promise<PartnerContractInfoTableResponse> {
    return this.get(`seller-companies/${sellerKey}/contracts`, params)
  }
}

export const partnerContractInformationApi = new PartnerContractInformationApi()
