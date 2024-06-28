import { WelfareSelectOptionType } from '@/models/uikit'

export interface ProductBaseInfoFormModel {
  lastSavedTime: string
  lastApprovalFinishedTime: string
  lastChangeSavedTime: string
  externalIntegration?: string
  selectTypeProduct?: WelfareSelectOptionType
  productName: string
  productNameI18?: string
  productCode: string
  productCodeSeller?: string
  seller: string
  brand: string
  nameModel?: string
  selectSeller?: WelfareSelectOptionType
  selectStatusSell?: WelfareSelectOptionType
  productStatus: string
  productKeywords: string[]

  // More info
  manufacturingCompany?: string
  origin?: string
  registerProductReview: string
  qaRegistration: string
  giveAGift: string
  minimumPurchaseQuantity: string
  isMinimumPurchaseQuantity: boolean
  maximumPurchaseQuantity: string
  isMaximumPurchaseQuantity: boolean

  // Customer Info
  customerRegistration?: boolean
  customerKeywords: string[]

  // Ticket product
  selectTypeTicket?: WelfareSelectOptionType
  startTime: string
  endTime: string
  ticketCancelPossibleType: string
  ticketType: string
  ticketPassType: string
  ticketUseRuleType: string
  ticketValidityDateYn?: string

  lastModifiedBy?: string
  lastModifiedByName?: string
  createdBy?: string
  createdByName?: string
  lastProductApprovedBy?: string
  lastProductApprovedByName?: string
  classification?: string
  productType?: string
  key?: number
  sellerKey?: number
  lowSellerKey?: number
  excludedCompanyYn?: string
  lastProductSalesStatusCode?: string
  inquiryPossibleYn?: string
  productRequestProcessReason?: string
  createdDate: string
  productRequestKey?: string,
  lastProductProgressStatusCode?: string
  productKey?: number
  sellerName?: string
}
