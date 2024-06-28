import { YnOptions } from '@/models/common'
import { ExhibitionCornerListModel, ExhibitionCornerProductListModel } from './ExhibitionConnectionMngtModel'
export interface ExhibitionFormSubmit<T> {
  submit: () => Promise<{
    data: T
    isValid: boolean
  }>
  reset: () => void
}

export interface ExhibitionContentSpecialConnectionManagementPopupProps {
  exhibitionKey?: string | number
}

export interface ExhibitionContentSpecialConnectionManagementPopupEmits {
  (e: 'close'): void
}
export interface ExhibitionContentSpecialConnectionManagementPopupModel {
  exhibitionKey?: number | string
  sellerKey?: number
  exhibitionType?: string
  exhibitionName?: string
  exhibitionContents?: string
  chargeMdCode?: string
  displayYn?: YnOptions
  exhibitionPeriodUseYn?: YnOptions
  applyChannelAllYn?: YnOptions
  applyChannelPcYn?: YnOptions
  applyChannelMobileYn?: YnOptions
  applyChannelMobileWebYn?: YnOptions
  exhibitionFormType?: string
  exhibitionStatusType?: string
  terminateReasonContents?: string
  exhibitionRepresentativeType?: string
  imagePathName?: string
  imageName?: string
  imageDeleteYn?: YnOptions
  imageAltName?: string
  mainTitleName1?: string
  mainTitleName2?: string
  subTitleName?: string
  colorHexaValue?: string
  exhibitionVideoType?: string
  videoPathName?: string
  videoName?: string
  videoDeleteYn?: YnOptions
  videoAltName?: string
  videoThumbnailPathName?: string
  videoThumbnailName?: string
  videoThumbnailDeleteYn?: YnOptions
  videoThumbnailAltName?: string
  youtubeUrl?: string
  youtubeAltName?: string
  htmlContents?: string
  noticeDisplayYn?: YnOptions
  noticeUseYn?: YnOptions
  noticeContents?: string
  marketingDisplayYn?: YnOptions
  marketingBannerYn?: YnOptions
  marketingCouponYn?: YnOptions
  marketingImageCommonYn?: YnOptions
  pcMarketingImagePathName?: string
  pcMarketingImageName?: string
  pcMarketingImageDeleteYn?: YnOptions
  pcMarketingImageAltName?: string
  pcLinkType?: string
  pcLinkUrl?: string
  pcLinkExhibitionKey?: number
  pcLinkEventKey?: number
  pcLinkProductKey?: number
  pcLinkExhibitionName?: string
  pcLinkEventName?: string
  pcLinkProductName?: string
  mobileMarketingImagePathName?: string
  mobileMarketingImageName?: string
  mobileMarketingImageDeleteYn?: YnOptions
  mobileMarketingImageAltName?: string
  mobileLinkType?: string
  mobileLinkUrl?: string
  mobileLinkExhibitionKey?: number
  mobileLinkEventKey?: number
  mobileLinkProductKey?: number
  mobileLinkExhibitionName?: string
  mobileLinkEventName?: string
  mobileLinkProductName?: string
  marketingCouponMainTitleName?: string
  marketingCouponSubTitleName?: string
  marketingCouponImagePathName?: string
  marketingCouponImageName?: string
  marketingCouponImageDeleteYn?: YnOptions
  marketingCouponImageAltName?: string
  bannerImageUseYn?: YnOptions
  bannerImagePathName?: string
  bannerImageName?: string
  bannerImageDeleteYn?: YnOptions
  bannerImageAltName?: string
  mclassDisplayCategoryId?: string
  couponCreateRequestList?: {
    couponKey?: string | number
    couponName?: string
  }[]
  keywordCreateRequestList?: {
    keywordName?: string
  }[]
  excludeCustomerCreateRequestList?: {
    customerKey?: string | number
    [key: string]: any
  }[]
  cornerCreateRequestList?: ExhibitionCornerListModel[]
  cornerProductCreateRequestList?: ExhibitionCornerProductListModel[]
  displayStartDate?: string
  displayStartTime?: string
  displayEndDate?: string
  displayEndTime?: string
  chargeMdName?: string
  createdByName?: string
  createdDate?: string
  lastModifiedByName?: string
  lastModifiedDate?: string
}
