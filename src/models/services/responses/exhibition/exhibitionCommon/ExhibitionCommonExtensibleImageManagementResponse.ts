import { DataTablePaginationResponseModel } from '@/models/services/responses/BaseModelResponse'

export interface ExhibitionCommonExtendedImageListResponse extends DataTablePaginationResponseModel<ExhibitionCommonExtendedImageListResponseModel> {}

export interface ExhibitionCommonExtendedImageListResponseModel {
  rowNum?: number
  productKey?: number
  productName?: string
  lastSaleStatusName?: string
  productDisplayYn?: string
  imageFullPathName?: string
  productClassificationName?: string
  sellerKey?: number
  sellerName?: string
  brandKey?: number
  brandName?: string
  createdByName?: string
  createdDate?: string
  lastModifiedByName?: string
  lastModifiedDate?: string
}
