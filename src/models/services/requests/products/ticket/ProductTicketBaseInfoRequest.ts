interface ProductTicketKeywordModel {
  modifiedBy?: string | null
  productKey?: number
  keywordName?: string
}

interface ProductTicketExclusionEntryModel {
  modifiedBy?: null
  customerKey?: number
  productKey?: number
}
export interface ProductTicketDetailBasicInfoRequest {
  productClassificationCode?: string
  productCode?: string
}
export interface ProductTicketApprovalDetailInfoRequest {
  productReqeustKey?: string
}

export interface ProductApprovalTicketDetailBasicInfoRequest {
  productReqeustKey: string
}
export interface ProductTicketItemBasicManageRequestModel {
  modifiedBy?: null
  externalInterfaceYn: string
  productClassificationCode?: string
  productType: string
  productName: string
  productKey?: string
  productCode?: string
  multilingualProductName: string
  sellerProductCode: string
  sellerKey: string
  lowSellerKey: number
  brandKey: string
  productModelName: string
  ticketPassType: string
  ticketCancelPossibleType: string
  ticketType: string
  ticketUseRuleType: string
  ticketValidityDateYn?: string
  ticketValidityStartDateTime: string
  ticketValidityEndDateTime: string
  reviewPossibleYn: string
  inquiryPossibleYn: string
  giftPossibleYn: string
  minimumPurchaseQuantityYn: string
  minimumPurchaseQuantity: number
  maximumPurchaseQuantityYn: string
  maximumPurchaseQuantity: number
  excludedCompanyYn: string
  lastProductSalesStatusCode: string
  boKeyWordList?: ProductTicketKeywordModel[]
  boTempKeyWordList?: ProductTicketKeywordModel[]
  boExpsrExclEntList?: ProductTicketExclusionEntryModel[]
  boTempExpsrExclEntList?: ProductTicketExclusionEntryModel[]
  productProcessRequestType?: string
  productRequestTempYn?: string
  operationSystmType?: string
  productReqeustCode?: string
  productReqeustKey?: string
  lastProductProgressStatusCode?: string,
}

export interface ProductItemDisplayManageModel {
  modifiedBy: null | string
  productKey?: number
  displayYn: 'Y' | 'N'
  exposureChannel: string
  displayStartDateTime: string
  displayEndDateTime: string
  chargeMdKey: number
  standardCategoryId?: string
  boItemDspCategoryInsertList: ProductDisplayCategoryModel[]
  lastProductProgressStatusCode?: string
  productRequestKey?: string
  productCode?: string
}

export interface ProductRequestItemDisplayManageModel {
  modifiedBy: null | string
  productKey?: number
  displayYn: 'Y' | 'N'
  exposureChannel: string
  displayStartDateTime: string
  displayEndDateTime: string
  chargeMdKey: number
  standardCategoryId?: string
  boTempItemDspCategoryInsertList: ProductDisplayCategoryModel[]
}

export interface ProductDisplayCategoryModel {
  modifiedBy: null | string
  displayCategoryId?: string
  productKey?: number
  representativeDisplayCategoryYn: 'Y' | 'N'
}

export interface ProductSalesInfoUpdateRequest {
  modifiedBy?: null | string
  productKey: number
  salePeriodUseYn: string
  saleStartDateTime: string
  saleEndDateTime: string
  taxType: string
  adultCertificationYn: string
  salePrice: number
  marginRateModificationYn: string
  marginRate: number
  marginPrice: null | number
}

export interface ProductRequestSalesInfoUpdateRequest {
  modifiedBy?: null | string
  productReqeustKey: number
  productKey: number
  salePeriodUseYn: string
  saleStartDateTime: string
  saleEndDateTime: string
  taxType: string
  adultCertificationYn: string
  salePrice: number
  marginRateModificationYn: string
  marginRate: number
  marginPrice: null | number
}
