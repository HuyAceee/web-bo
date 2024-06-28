import { DataTablePaginationResponseModel } from '../../BaseModelResponse'

export interface ProductTicketApprovalItemResponseModel {
  productReqeustKey?: number
  productReqeustCode?: string
  productKey?: number
  productCode?: string
  externalInterfaceYn?: string
  productName?: string
  productClassificationCode?: string
  productClassificationName?: string
  productRequestTempYn?: string
  productType?: string
  productTypeName?: string
  displayYn?: string
  exposureChannel?: string
  exposureChannelName?: string
  salePrice?: number
  productDiscountAmount?: number
  lastProductSalesStatusCode?: string
  lastProductSalesStatusName?: string
  lastProductProgressStatusCode?: string
  lastProductProgressStatusName?: string
  taxType?: string
  taxTypeName?: string
  standardCategoryId?: number
  standardCategoryPath?: string
  displayCategoryPath?: string
  sellerKey?: number
  lowSellerKey?: number
  chargeMdKey?: number
  createdYyyymmdd?: string
  lastModifiedYyyymmdd?: string
  saleStartYyyymmdd?: string
  saleEndYyyymmdd?: string
  createdBy?: string
  createdByName?: string
  lastModifiedBy?: string
  lastModifiedByName?: string
  lastProductApprovedBy?: string
  lastProductApprovedByName?: string
}

export interface ProductTicketApprovalListResponse extends DataTablePaginationResponseModel<ProductTicketApprovalItemResponseModel> {}
