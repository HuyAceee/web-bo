import { YnOptions } from '@/models/common'
import { ExhibitionConnectionSpecialModalType } from './ExhibitionConnectionMngtModel'

export interface ExhibitionConnectionFormMarketingAreaProps {
  data?: ExhibitionConnectionFormMarketingAreaModel
  config?: ExhibitionConnectionSpecialModalType
}

export interface ExhibitionConnectionFormMarketingAreaModel {
  //option common
  marketingDisplayYn?: YnOptions
  marketingBannerYn?: YnOptions // select default form image, banner pc and mobile
  marketingCouponYn?: YnOptions // select default form coupon
  //option image-banner
  marketingImageCommonYn?: YnOptions //yes or no to confidant pc and mobile
  // PC image-banner
  pcMarketingImagePathName?: string
  pcMarketingImageName?: string
  pcMarketingImageAltName?: string
  pcLinkType?: string
  pcLinkUrl?: string
  pcLinkExhibitionKey?: string
  pcLinkEventKey?: string
  pcLinkProductKey?: string
  pcLinkPromotionKey?: string
  pcLinkExhibitionName?: string
  pcLinkEventName?: string
  pcLinkProductName?: string
  //Mobile image-banner
  mobileMarketingImagePathName?: string
  mobileMarketingImageName?: string
  mobileMarketingImageAltName?: string
  mobileLinkType?: string
  mobileLinkUrl?: string
  mobileLinkExhibitionKey?: string
  mobileLinkEventKey?: string
  mobileLinkProductKey?: string
  mobileLinkPromotionKey?: string
  mobileLinkExhibitionName?: string
  mobileLinkEventName?: string
  mobileLinkProductName?: string
  //option coupon
  couponCreateRequestList?: {
    couponKey?: string
    couponName?: string
  }[]
  marketingCouponImagePathName?: string
  marketingCouponImageName?: string
  marketingCouponImageAltName?: string
  marketingCouponImageLinkUrl?: string
  marketingCouponMainTitleName?: string
  marketingCouponSubTitleName?: string
}
