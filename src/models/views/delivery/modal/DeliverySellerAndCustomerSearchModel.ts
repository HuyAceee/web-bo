import { WelfareSelectOptionType } from '@/models'

export interface DeliverySellerAndCustomerSearchModel {
  status: WelfareSelectOptionType
  contractStatus: WelfareSelectOptionType
  searchCode: string
  searchName: string
  searchRegisterCode: string
  searchBusinessRegistrationNumber: string
  searchStartDate: string
  searchEndDate: string
}

export interface DeliverySellerAndCustomerSearchTableModel {
  id: number
  customerKey?: number
  sellerKey?: number
  name: string
  status: string
  registrationCode: string
  companyRegistrationCode: string
  contractStatus: string
  startContractDate: string
  endContractDate: string
  registrationDate: string
}

export interface DeliverySubSellerSimpleModel {
  managerKey: number
  subSellerName: string
}
