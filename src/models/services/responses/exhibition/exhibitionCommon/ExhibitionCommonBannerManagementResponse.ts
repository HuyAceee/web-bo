export interface ExhibitionBannerGroupListResponseModel {
  rowNum?: number
  bannerGroupKey?: number
  bannerGroupName?: string
  applyChannelName?: string
  bannerGroupUseYn?: string
  createdByName?: string
  createdDate?: string
  lastModifiedByName?: string
  lastModifiedDate?: string
}

export interface ExhibitionBannerListResponseModel {
  rowNum?: number
  bannerKey?: number
  bannerName?: string
  bannerGroupKey?: number
  bannerGroupName?: string
  displayOrder?: number
  displayYn?: string
  displayStartDate?: string
  displayStartTime?: string
  displayEndDate?: string
  displayEndTime?: string
  applyChannelName?: string
  createdByName?: string
  createdDate?: string
  lastModifiedByName?: string
  lastModifiedDate?: string
}
