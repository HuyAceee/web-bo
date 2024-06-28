export interface DeliveryCustomerInfoModel {
  customerKey: number
  customerName: string
  bizRegNum: string
  corpRegNum: string
  contractStartDate: string
  contractEndDate: string
  representativeName: string
  streetAddress: string
  masterAccountName: string
  masterAccountPhone: string
}

export interface DeliveryCustomerFullInfoModel {
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
  bizRegDocumentFileDownloadLink?: null
  introductionDocumentFileOriginName: string
  introductionDocumentFileSize: number
  introductionDocumentFileDownloadLink?: null
  introductionContent: string
  companyHomePageUrl: string
  customerId: string
  customerDomainUrl?: null
  auditing: {
    registerKey: number
    registerId: string
    registerName: string
    registeredDate: string
    modifierKey: number
    modifierId: string
    modifierName: string
    modifiedDate: string
  }
}
