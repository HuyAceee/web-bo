import { OrderCouponPromotionResponse, OrderSavingsPromotionResponse } from '@/models/services/responses/order/OrderSavingsPromotionResponse'
import { BaseApi } from '../BaseApi'

class OrderSavingsPromotionApi extends BaseApi {
  constructor() {
    super('order/bo/promotion')
  }

  async getSavingsPromotion(productKey: string): Promise<OrderSavingsPromotionResponse> {
    return this.get(`rewards/reward-points/target-products/${productKey}`)
  }
  async getCouponPromotion(productKey: string): Promise<OrderCouponPromotionResponse> {
    return this.get(`coupons/target-products/${productKey}`)
  }
}

export const orderSavingsPromotionApi = new OrderSavingsPromotionApi()
