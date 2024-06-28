export interface ProductApprovalTicketItemRequestDetailOptionInfoModel {
    productReqeustKey: number,
    productReqeustCode: string,
    productKey: number,
    lastProductProgressStatusCode: string,
    lastProductProgressStatusName: string,
    optionUseYn: string,
    optionType: string,
    optionTypeName: string,
    sclassOptionUseYn: string,
    inventoryQuantity: number,
    boTempItemOptionList: ProductApprovalTicketBoTempItemOptionListModel[]
}

export interface ProductApprovalTicketBoTempItemOptionListModel {
    productReqeustOptionKey?: number,
    productReqeustKey?: number,
    productKey?: number,
    optionId?: string,
    option1DepthName?: string,
    option2DepthName?: string,
    option3DepthName?: string,
    optionPrice?: number,
    optionInventoryQuantity?: number,
    optionSaleStatus?: string,
    optionDisplayOrder?: number | string
}

export interface ProductApprovalTicketItemOptionDetailModel {
    productReqeustKey: number,
    productReqeustCode: string,
    productKey: null,
    errMessage: string,
    sucessMessage: string
}

export interface ProductApprovalTicketItemOptionDetailModel {
    productReqeustKey: number,
    productReqeustCode: string,
    productKey: null,
    errMessage: string,
    sucessMessage: string
}

export interface ProductApprovalItemDetailIssuedInfoModel {
    productReqeustKey: number,
    productReqeustCode: string,
    productKey: number,
    lastProductProgressStatusCode: string,
    lastProductProgressStatusName: string,
    ticketType: string,
    ticketTypeName: string,
    deliveryFeePolicyTypeName: string,
    exchangeReturnPeriodContents: string,
    exchangeReturnContents: string,
    exchangeReturnWarningContents: string
}

export interface ProductApprovalTicketItemRequestDetailOptionPopupInfoModel {
    productReqeustKey: number,
    productReqeustCode: string,
    productKey: number,
    productName: string,
    boTempItemOptionPopupList: ProductApprovalTicketBoTempItemOptionListModel[]
}