import {
  CompanyCustomerDetailResponse,
  CompanyCustomerMasterResponse
} from '@/models/services/responses/company/companyCustomers/CompanyCustomerDetailResponse'
import { CompanyBaseApi } from '../CompanyBaseApi'
import { BaseModelResponse } from '@/models/services/responses/BaseModelResponse'
import { CompanyCustomerDetailRequest } from '@/models/services/requests/company/companyCustomers/CompanyCustomerDetailRequest'

class CompanyCustomerDetailInfoApi extends CompanyBaseApi {
  async getDetail(customerKey: number): Promise<BaseModelResponse<CompanyCustomerDetailResponse>> {
    return this.get('customer-companies/' + customerKey)
  }
  async getDetailMasterInfo(customerKey: number): Promise<BaseModelResponse<CompanyCustomerMasterResponse>> {
    return this.get('customer-companies/' + customerKey + '/admins/master')
  }
  async getFileIntroduce(fileName: string): Promise<Blob> {
    return this.getBlob('customer-companies/files/introduction/' + fileName)
  }

  async getFileRegistration(fileName: string): Promise<Blob> {
    return this.getBlob('customer-companies/files/registration/' + fileName)
  }
  async update(customerKey: number, request: CompanyCustomerDetailRequest): Promise<BaseModelResponse<any>> {
    return this.put('customer-companies/' + customerKey, request)
  }
}
export const companyCustomerDetailInfoApi = new CompanyCustomerDetailInfoApi()
