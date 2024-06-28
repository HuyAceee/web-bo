import { ProductApprovalTicketBoTempItemOptionListModel } from '@/models/views'

export interface ProductApprovalTicketItemOptionDetailRequest {
  productReqeustKey: number | string
}
export interface ProductApprovalTicketItemOptionInventoryManageRequest {
  optionUseYn: string
  inventoryQuantity: number
  productReqeustKey: number
  boTempItemOptionUpdatList: ProductApprovalTicketBoTempItemOptionListModel[]
  productKey: number
}

export interface ProductApprovalTicketItemOptionDeleteRequest {
  productReqeustOptionKey: number
  productReqeustKey: number
}

export interface ProductApprovalTicketItemIssuedManageRequest {
  exchangeReturnPeriodContents: string
  exchangeReturnContents: string
  exchangeReturnWarningContents: string
  productKey: number
  productReqeustKey: number
}

export interface ProductApprovalTicketItemOptionManageRequest {
  optionType: string
  boTempItemOptionPopupInsertList: ProductApprovalTicketBoTempItemOptionListModel[]
  sclassOptionUseYn: string
  productKey: number
  productReqeustKey: number
}
