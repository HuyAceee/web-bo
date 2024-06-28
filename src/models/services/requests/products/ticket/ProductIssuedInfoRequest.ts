export interface ProductTicketDetailIssuedInfoRequest {
    productClassificationCode: string
    productCode: string
}

export interface ProductTicketIssuedManageRequest {
    exchangeReturnPeriodContents: string,
    exchangeReturnContents: string,
    exchangeReturnWarningContents: string,
    productKey: number
}

export interface ProductDetailOptionPopupInfoRequest {
    productKey: string
    productCode: string
}