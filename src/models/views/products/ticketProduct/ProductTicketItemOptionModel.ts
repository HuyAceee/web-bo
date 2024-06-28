export interface ProductTicketItemOptionManageModel {
    productKey: number,
    productCode: string,
    errMessage: string,
    sucessMessage: string
}

export interface ProductTicketBoItemOptionListModel {
    productOptionKey?: number,
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

export interface ProductTicketItemDetailOptionInfoModel {
    productKey: number,
    productCode: string,
    optionUseYn: string,
    optionType: string,
    optionTypeName: string,
    sclassOptionUseYn: string,
    inventoryQuantity: number,
    lastProductProgressStatusCode: string,
    lastProductProgressStatusName: string,
    boItemOptionList: ProductTicketBoItemOptionListModel[]
}

export interface ProductTicketItemDetailOptionPopupInfoModel {
    productKey: number,
    productCode: string,
    productName: string,
    boItemOptionPopupList: ProductTicketBoItemOptionListModel[]
}