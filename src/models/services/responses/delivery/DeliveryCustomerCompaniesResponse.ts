export interface DeliveryCustomerCompaniesResponse {
  customerKey: number
  customerName: string
  customerStatus: string
  bizRegNum: string
  corpRegNum: string
  contractStatus: string
  contractStartDate: string
  contractEndDate: string
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
