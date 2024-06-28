import { BaseApi } from '@/services/api/BaseApi'
import {
  CompanyCustomerDetailContractInformationLastResponse,
  CompanyCustomerDetailContractInformationResponse
} from '@/models/services/responses/company/companyCustomers/CompanyCustomerDetailContractInformationResponse'
import { CompanyCustomerDetailContractInformationRequest } from '@/models/services/requests/company/companyCustomers/CompanyCustomerDetailContractInformationRequest'

export class CompanyCustomerContractInformationApi extends BaseApi {
  constructor() {
    super('')
  }

  async getDetailContracts(
    customerKey: string,
    params: CompanyCustomerDetailContractInformationRequest
  ): Promise<CompanyCustomerDetailContractInformationResponse> {
    return this.get(`member/bo/customer-companies/${customerKey}/contracts`, params)
  }

  async getDetailContractsLast(customerKey: string): Promise<CompanyCustomerDetailContractInformationLastResponse> {
    return this.get(`member/bo/customer-companies/${customerKey}/contracts:last`)
  }

  async downloadFileContractInformation(contractFileDownloadLink: string): Promise<Blob> {
    return this.getBlob(`${contractFileDownloadLink}`)
  }
}

export const companyCustomerContractInformationApi = new CompanyCustomerContractInformationApi()
