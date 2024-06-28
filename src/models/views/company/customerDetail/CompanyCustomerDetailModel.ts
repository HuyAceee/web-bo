import { CompanyCustomerDetailRequest } from '@/models/services/requests/company/companyCustomers/CompanyCustomerDetailRequest'
import { ECustomerStatus } from '../customerManagement/CompanyCustomerListModel'

export interface CompanyCustomerDetailModel {
  customerStatus: ''
  bizType: ''
}

export const OptionsCustomerStatus = [
  { value: ECustomerStatus.Activate, label: '활성' },
  { value: ECustomerStatus.UnActivate, label: '비활성' }
]

export const CustomerRegistrationRadioOption = [
  { label: '법인사업자', value: '01' },
  { label: '일반사업자', value: '02' }
]

export const mappedRequest = (values: CompanyCustomerDetailModel): CompanyCustomerDetailRequest => {
  return {
    company: {
      customerStatus: values.customerStatus,
      bizType: values.bizType
    }
  }
}
