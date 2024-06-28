import {
  PartnerBankAccountInfoResponse,
  PartnerBasicContractInfoResponse,
  PartnerCheckBankAccountResponse,
  PartnerPermissionsResponse,
  PartnerSalesCategoryResponse
} from '@/models/services/responses/partner/PartnerSellerCompaniesResponse'
import { BaseApi } from '../BaseApi'
import { PartnerCheckBankAccountRequest } from '@/models/services/requests/partner/PartnerSellerCompanies'
import { BaseModelErrorResponse } from '@/models/services/responses/BaseModelResponse'
import { PartnerContractsRequestModel } from '@/models/views/partner/PartnerSellerContractDetailModel'

class PartnerSellerCompaniesApi extends BaseApi {
  constructor() {
    super('member/bo')
  }

  getBasicContractInfo(sellerKey: string, contractKey: string): Promise<PartnerBasicContractInfoResponse> {
    return this.get(`seller-companies/${sellerKey}/contracts/${contractKey}`)
  }

  getSalesCategory(sellerKey: string): Promise<PartnerSalesCategoryResponse> {
    return this.get(`seller-companies/${sellerKey}/categories`)
  }

  getPermissions(sellerKey: string): Promise<PartnerPermissionsResponse> {
    return this.get(`seller-companies/${sellerKey}/permissions`)
  }
  getBankAccountInfo(sellerKey: string): Promise<PartnerBankAccountInfoResponse> {
    return this.get(`seller-companies/${sellerKey}/bank-account`)
  }

  checkBankAccount(request: PartnerCheckBankAccountRequest): Promise<PartnerCheckBankAccountResponse> {
    return this.post('seller-companies/bank-account:validate', request)
  }
  postContracts(sellerKey: string, request: PartnerContractsRequestModel): Promise<BaseModelErrorResponse> {
    return this.post(`seller-companies/${sellerKey}/contracts:extend`, request)
  }
}

export const partnerSellerCompaniesApi = new PartnerSellerCompaniesApi()
