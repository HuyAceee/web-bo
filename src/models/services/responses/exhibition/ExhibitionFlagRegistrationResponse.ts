import { BaseModelResponse } from '@/models/services/responses/BaseModelResponse'

export interface ExhibitionGetFlagDetailByKeyResponse extends BaseModelResponse<ExhibitionGetFlagDetailByKeyResponseModel> {}

export interface ExhibitionGetFlagDetailByKeyResponseModel {
  flagKey?: number
  flagName?: string
  flagType?: string
  targetProductType?: string
  lclassDisplayCategoryId?: string
  mclassDisplayCategoryId?: string
  sclassDisplayCategoryId?: string
  flagDisplayOrder?: number
  displayYn?: string
  displayStartDatetime?: string
  displayEndDatetime?: string
  imagePathName?: string
  imageName?: string
  imageDeleteYn?: string
  imageAltName?: string
  createdByName?: string
  createdDate?: string
  lastModifiedByName?: string
  lastModifiedDate?: string
}

export interface ExhibitionGetFlagDetailDisplayProductByKeyResponse
  extends BaseModelResponse<ExhibitionGetFlagDetailDisplayProductByKeyResponseModel[]> {}

export interface ExhibitionGetFlagDetailDisplayProductByKeyResponseModel {
  flagDisplayProductKey: number
  flagKey: number
  productKey: number
  productName: string
  lastSaleStatusName: string
  productDisplayYn: string
  sellerKey: number
  sellerName: string
  chargeMdName: string
  lastModifiedByName: string
  lastModifiedDate: string
}
