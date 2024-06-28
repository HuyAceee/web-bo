import { CompanyBaseApi } from '../CompanyBaseApi'
import { CompanyCustomerListRequest } from '@/models/services/requests/company/companyCustomers/CompanyCustomerListRequest'
import { BaseModelErrorResponse } from '@/models/services/responses/BaseModelResponse'
import {
  CompanyCustomerListListResponse,
  CompanyCustomerListListResponseConvertor,
  CompanyCustomerUpdateResponse,
  ContractDataFileResponse
} from '@/models/services/responses/company/companyCustomers/CompanyCustomerListResponse'
import { ECustomerStatus } from '@/models/views/company/customerManagement/CompanyCustomerListModel'
import { CompanyCustomerContactDataPostModel } from '@/models/views/company/customerManagement/CompanyCustomerRegistrationModel'

class CompanyCustomerListApi extends CompanyBaseApi {
  getCompanyCustomerList(request: CompanyCustomerListRequest) {
    return new Promise<CompanyCustomerListListResponse>((resolve) => {
      this.get('customer-companies', request).then((data) => {
        resolve(CompanyCustomerListListResponseConvertor.fromCompanyCustomerListResponse(data as any, request.pageNum, request.rowSize))
      })
    })
  }

  async updateCompanyCustomerStatus(customerStatus: ECustomerStatus, customerKeyList: number[]) {
    return this.put(`customer-companies/status`, { customerStatus, customerKeyList }) as Promise<CompanyCustomerUpdateResponse>
  }

  postContactFile(data: FormData): Promise<ContractDataFileResponse> {
    return this.post('customer-companies/files/contract:upload', data)
  }

  updateContact(id: number, contract: CompanyCustomerContactDataPostModel): Promise<BaseModelErrorResponse> {
    return this.post(`customer-companies/${id}/contracts:extend`, { contract })
  }

  getFileContact(path: string): Promise<Blob> {
    return this.getBlob(path)
  }
}
export const companyCustomerListApi = new CompanyCustomerListApi()
