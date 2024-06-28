import { CompanyCustomerRegistrationModel } from '@/models/views/company/customerManagement/CompanyCustomerRegistrationModel'
import { CompanyBaseApi } from '../CompanyBaseApi'
import {
  BizCategoryItem,
  CommonCompanyItemResponse,
  CommonCompanyListResponse,
  ExistsRequest,
  ICustomerRegistrationResponse,
  UploadRequest
} from '@/models/services/responses/company/companyCustomers/CompanyCustomerRegistrationResponse'

class CompanyCustomerRegistrationApi extends CompanyBaseApi {
  async registration(customerInfo: CompanyCustomerRegistrationModel) {
    return super.post<ICustomerRegistrationResponse>(`customer-companies`, customerInfo)
  }

  async getBusinessClassifications() {
    return super.get<CommonCompanyListResponse<BizCategoryItem>>(`customer-companies/business-classifications`)
  }

  async getCustomerIdExists(customerId: string) {
    return super.get<CommonCompanyItemResponse<ExistsRequest>>(`customer-companies/customer-id:exists`, { customerId })
  }

  async getRegistrationNumberExists(bizRegNum: string) {
    return super.get<CommonCompanyItemResponse<ExistsRequest>>(`customer-companies/registration-number:exists`, { bizRegNum })
  }

  async postContractUpload(file: File, attachmentType: string = '03') {
    const data = new FormData()
    data.set('attachmentFile', file)
    // data.set('attachmentType', attachmentType)
    return this.postMultipart(`customer-companies/files/contract:upload`, data, { attachmentType }) as Promise<
      CommonCompanyItemResponse<UploadRequest>
    >
  }

  async postIntroductionUpload(file: File, attachmentType: string = '02') {
    const data = new FormData()
    data.set('attachmentFile', file)
    // data.set('attachmentType', attachmentType)
    return this.postMultipart(`customer-companies/files/introduction:upload`, data, { attachmentType }) as Promise<
      CommonCompanyItemResponse<UploadRequest>
    >
  }

  async postRegistrationUpload(file: File, attachmentType: string = '01') {
    const data = new FormData()
    data.set('attachmentFile', file)
    // data.set('attachmentType', attachmentType)
    return super.postMultipart(`customer-companies/files/registration:upload`, data, { attachmentType }) as Promise<
      CommonCompanyItemResponse<UploadRequest>
    >
  }
}
export const companyCustomerRegistrationApi = new CompanyCustomerRegistrationApi()
