import { BaseModelResponse } from '@/models/services/responses/BaseModelResponse'

export interface ExhibitionPromotionCouponResponseModel {
  couponKey?: number
  couponName?: string
  couponType?: string
  couponStatus?: string
  issueMethod?: string
  autoIssueCouponType?: string
  issueDate?: string
  validPeriodType?: string
  afterValidDay?: number
  validFromDate?: string
  validToDate?: string
  couponBenefitType?: string
  benefitValue?: number
  maxDiscountAmount?: number
  minOrderAmount?: number
  issueQuantityLimitYn?: string
  totalIssueQuantity?: number
  issueQuantity?: number
  sameMemberIssueLimitYn?: string
  sameMemberIssueLimitQuantity?: number
  applyChannels?: string[]
  couponRegisterDate: string
  couponRegisterManagerName?: string
  couponRegisterManagerId?: string
  forceEndDate?: string
  forceEndManagerName?: string
  forceEndManagerId?: string
}

export interface ExhibitionPromotionCouponByKeyResponse extends BaseModelResponse<ExhibitionPromotionCouponByKeyResponseModel> {}

export interface ExhibitionPromotionCouponByKeyResponseModel {
  couponKey?: number
  couponStatus?: string
  couponName?: string
  issueType?: string
  issueMethod?: string
  couponType?: string
  issueQuantityLimitYn?: string
  totalIssueQuantity?: number
  issueQuantity?: number
  issueConditionType?: string
  issueConditionFromDate?: string
  issueConditionToDate?: string
  couponRegisterDate?: string
  couponRegisterManagerName?: string
  couponRegisterManagerId?: string
  forceEndDate?: string
  forceEndManagerName?: string
  forceEndManagerId?: string
  applyChannels?: string[]
  issueDate?: string
  displayFromDate?: string
  displayToDate?: string
  validPeriodType?: string
  afterValidDay?: number
  validFromDate?: string
  validToDate?: string
  discountPlatformShareRate?: number
  discountSellerShareRate?: number
  imagePath?: string
  imageName?: string
  imageAlt?: string
  imageDeleteYn?: string
  couponBenefitType?: string
  benefitValue?: number
  maxDiscountAmount?: number
  applyProductQuantityLimitYn?: string
  applyProductQuantity?: number
  sameMemberIssueLimitYn?: string
  sameMemberIssueLimitQuantity?: number
  issueTargetType?: string
  targetType?: string
  productPriceLimitYn?: string
  minProductPrice?: number
  maxProductPrice?: number
}
