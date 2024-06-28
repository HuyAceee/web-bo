export interface CompanyCustomerDetailRequest {
  company?: {
    customerStatus?: string
    customerName?: string
    bizType?: string
    bizRegNum?: string
    corpRegNum?: string
    bizItemCode?: string
    zipCode?: string
    streetAddress?: string
    address?: string
    addressDetail?: string
    representativeName?: string
    representativeTelNum?: string
    registrationFileId?: string
    registrationDelYn?: string
    registrationAltName?: string
    introductionFileId?: string
    introductionDelYn?: string
    introductionAltName?: string
    introductionContent?: string
    companyHomePageUrl?: string
    customerId?: string
  }
  contract?: {
    contractRegDate?: string
    contractStartDate?: string
    contractEndDate?: string
    settlementDate?: string
    contractFileId?: string
    contractDelYn?: string
    contractAltName?: string
  }
}
