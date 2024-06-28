export interface ExhibitionFlagDetailRegisterRequest {
  flagName?: string
  flagType?: string
  targetProductType?: string
  lclassDisplayCategoryId?: string
  mclassDisplayCategoryId?: string
  sclassDisplayCategoryId?: string
  flagDisplayOrder?: string
  displayYn?: string
  displayStartDate?: string
  displayStartTime?: string
  displayEndDate?: string
  displayEndTime?: string
  imagePathName?: string
  imageName?: string
  imageDeleteYn?: string
  imageAltName?: string
  flagDisplayProductCreateRequestList?: { productKey?: number }[]
}
