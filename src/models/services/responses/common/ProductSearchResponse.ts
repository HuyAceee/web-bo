import { ProductSearchModalModel } from '@/models/views'
import { DataTablePaginationResponseModel } from '../BaseModelResponse'

export interface ProductSearchSellerAuditingInfo {
  registerKey: number
  registerId: string
  registerName: string
  registeredDate: string
  modifierKey: number
  modifierId: string
  modifierName: string
  modifiedDate: string
}

export interface ProductSearchSellerModel {
  sellerKey: number
  sellerName: string
  sellerStatus: string
  bizRegNum: string
  corpRegNum: string
  contractType: string
  contractStatus: string
  contractStartDate: string
  contractEndDate: string
  auditing: ProductSearchSellerAuditingInfo
}

export interface ProductSearchResponse extends DataTablePaginationResponseModel<ProductSearchModalModel> {}

export interface ProductSearchSelllerResponse extends DataTablePaginationResponseModel<ProductSearchSellerModel> {}
