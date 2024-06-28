export interface CompanyCustomerDetailResponse {
  customerKey: number
  customerStatus: string
  customerName: string
  bizRegNum: string
  bizType: string
  corpRegNum: string
  bizItemCode: string
  bizCategoryName: string
  bizItemName: string
  zipCode: string
  streetAddress: string
  address: string
  addressDetail: string
  representativeName: string
  representativeTelNum: string
  bizRegDocumentFileOriginName: string
  bizRegDocumentFileSize: number
  bizRegDocumentFileDownloadLink: string
  introductionDocumentFileOriginName: string
  introductionDocumentFileSize: number
  introductionDocumentFileDownloadLink: string
  introductionContent: string
  companyHomePageUrl: string
  customerId: string
  customerDomainUrl: string
  auditing?: {
    registerKey: number
    registerId: number
    registerName: string
    registeredDate?: string
    modifierKey?: number
    modifierId?: number
    modifierName?: string
    modifiedDate?: string
  }
}
export interface CompanyCustomerMasterResponse {
  email: string
  managerId: string
  managerKey: number
  managerName: string
  phone: string
}
