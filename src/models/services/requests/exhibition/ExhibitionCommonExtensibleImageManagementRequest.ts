import { PaginationModelRequest } from '@/models/services/requests/PaginationModelRequest'

export interface ExhibitionCommonExtendedImageListRequest extends PaginationModelRequest, ExhibitionCommonExtendedImageListRequestModel {}

export interface ExhibitionCommonExtendedImageListRequestModel {
  productKey?: string
  sellerKey?: string
  brandKey?: string
  productClassification?: string | null
  displayYn?: string
  searchPeriodType?: string
  fromDate?: string
  toDate?: string
  searchWordType?: string
  searchWord?: string
}

export interface ExhibitionCommonExtendedImageModifyRequestListType {
  productKey?: number
  filePathName?: string
  fileName?: string
}

export interface ExhibitionCommonModifyExtendedImageListRequest {
  modifyRequestList: ExhibitionCommonExtendedImageModifyRequestListType[]
}
