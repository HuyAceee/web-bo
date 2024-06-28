import { BaseModelErrorResponse } from '@/models/services/responses/BaseModelResponse'

import { BaseApi } from '@/services/api/BaseApi'

class ExhibitionCancelCouponReasonModalApi extends BaseApi {
  constructor() {
    super('order/bo')
  }

  updateCancelCoupon(couponKey: string, forceEndReason: string): Promise<BaseModelErrorResponse> {
    return this.put(`promotion/coupons/${couponKey}/status/force-end`, { forceEndReason })
  }
}
export const exhibitionCancelCouponReasonModalApi = new ExhibitionCancelCouponReasonModalApi()
