import { BaseModelResponse } from '../BaseModelResponse'

export interface OrderSavingsPromotionResponse extends BaseModelResponse<OrderSavingsPromotionModel[]> {}
export interface OrderCouponPromotionResponse extends BaseModelResponse<OrderCouponPromotionModel[]> {}

export interface OrderSavingsPromotionModel {
  rewardPointKey?: string
  rewardPointName?: string
  benefitType?: string
  benefitValue?: number
  maxSavingAmount?: number
}
export interface OrderCouponPromotionModel {
  couponKey?: number
  couponName?: string
  couponBenefitType?: string
  benefitSettingValue?: number
  discountedPrice?: number
}
