
import { PartnerActiveRequest, PartnerListRequest, PartnerRegistrationModelRequest } from '@/models/services/requests/partner/PartnerListRequest'
import { BaseApi } from '../BaseApi'
import { PartnerListResponse } from '@/models/services/responses/partner/PartnerListResponse'
import { PartnerRegistrationBusinessClassificationsResponse, PartnerRegistrationExistNumberResponse } from '@/models/services/responses/partner/PartnerRegistrationResponse'
import { PartnerRegisterEditPersonInChangeResponse } from '@/models/services/responses/partner/partnerManagementDetail/companyInformation/PartnerRegisterEditPersonInChangeResponse'
import { PartnerRegisterEditPersonInChangeRequest } from '@/models/services/requests/partner/partnerManagementDetail/companyInformation/PartnerRegisterEditPersonInChangeRequest'

class PartnerListManagementApi extends BaseApi {
  constructor() {
    super('member/bo')
  }

  async saveNewPartner(body: PartnerRegistrationModelRequest) {
    return this.post(`seller-companies`, body)
  }

  async getList(params: PartnerListRequest): Promise<PartnerListResponse> {
    return this.get(`seller-companies`, params)
  }

  async activePartner(body: PartnerActiveRequest) {
    return this.put(`seller-companies/status`, body)
  }

  async getBusinessClassifications(): Promise<PartnerRegistrationBusinessClassificationsResponse> {
    return this.get(`seller-companies/business-classifications`)
  }

  async checkExistCompanyRegistrationNumber(number: number): Promise<PartnerRegistrationExistNumberResponse> {
    return this.get(`seller-companies/registration-number:exists`, { bizRegNum: number })
  }

  async getPersonInChargeDetail(sellerKey : number | string, chargerKey : number | string): Promise<PartnerRegisterEditPersonInChangeResponse> {
    return this.get(`seller-companies/${sellerKey}/chargers/${chargerKey}`)
  }

  async registerPersonInCharge(sellerKey : number | string, charger: PartnerRegisterEditPersonInChangeRequest): Promise<PartnerRegisterEditPersonInChangeResponse> {
    return this.post(`seller-companies/${sellerKey}/chargers`, {
      charger
    })
  }

  async editPersonInCharge(sellerKey : number | string, chargerKey : number | string, charger: PartnerRegisterEditPersonInChangeRequest): Promise<PartnerRegisterEditPersonInChangeResponse> {
    return this.put(`seller-companies/${sellerKey}/chargers/${chargerKey}`, {
      charger
    })
  }
}

export const partnerListManagementApi = new PartnerListManagementApi()
