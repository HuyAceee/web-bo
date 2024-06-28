import { DataTablePaginationResponseModel } from '@/models/services/responses/BaseModelResponse'

export interface ExhibitionFlagListResponse extends DataTablePaginationResponseModel<ExhibitionFlagListResponseModel> {}

export interface ExhibitionFlagListResponseModel {
  flagKey?: number
  flagName?: string
  flagTypeName?: string
  targetProductType?: string
  lclassDisplayCategoryId?: string
  mclassDisplayCategoryId?: string
  sclassDisplayCategoryId?: string
  flagDisplayOrder?: number
  displayYn?: string
  displayStartDate?: string
  displayStartTime?: string
  displayEndDate?: string
  displayEndTime?: string
  imageFullPathName?: string
  imageName?: string
  imageDeleteYn?: string
  imageAltName?: string
  createdByName?: string
  createdDate?: string
  lastModifiedByName?: string
  lastModifiedDate?: string
}
