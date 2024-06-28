export interface ExhibitionGnbReservationListRequest {
  gnbDisplayKey?: string
  gnbGroupKey: string
  displayYn: string
  displayStartDate: string
  displayStartTime?: string
  displayEndDate: string
  displayEndTime?: string
  mainTitleName: string
  linkType: string
  linkUrl: string
  linkExhibitionKey: string
  linkEventKey: string
  linkProductKey: string
  linkPromotionKey: string
  subTitleUseYn: string
  subTitleName: string
}

export interface ExhibitionExcludeCustomerCreateRequest {
  customerKey?: number
}

export interface ExhibitionBannerDetailModalRequest {
  bannerGroupKey?: string
  bannerGroupUseYn: string
  bannerGroupName: string
  applyChannelType: string
  excludeCustomerCreateRequestList: ExhibitionExcludeCustomerCreateRequest[]
}
