import { BaseApi } from '../BaseApi'
import { MemberListOrderDetailRequest } from '@/models/services/requests/members/MemberListOrderDetailRequest'
import { MemberListOrderDetailResponse } from '@/models/services/responses/members/MemberListOrderDetailResponse'
import { PaginationModelRequest } from '@/models/services/requests/PaginationModelRequest'
import { formatNumberDot } from '@/common'

class MemberListOrderDetailApi extends BaseApi {
  constructor() {
    super('order/bo/orders')
  }

  getMemberInfoWithOrderDetail(memberId: string, request: Partial<MemberListOrderDetailRequest & PaginationModelRequest>) {
    return new Promise<MemberListOrderDetailResponse>((resolve, reject) => {
      this.get(`order-member/${memberId}`, request)
      .then((res) => {
        const dataWithIndex = res?.data.map((item: any, index: any) => ({
          ...item,
          index: index + 1,
          totalProductAmount: formatNumberDot(item?.totalProductAmount) ?? 0,
          immediatelyDiscountAmount: formatNumberDot(item?.immediatelyDiscountAmount) ?? 0,
          orderCouponDiscountAmount: formatNumberDot(item?.orderCouponDiscountAmount) ?? 0,
          lastOrderAmount: formatNumberDot(item?.lastOrderAmount) ?? 0,
          deliveryAmount: formatNumberDot(item?.deliveryAmount) ?? 0,
          deliveryDiscountAmount: formatNumberDot(item?.deliveryDiscountAmount) ?? 0,
          lastPaymentAmount: formatNumberDot(item?.lastPaymentAmount) ?? 0,
          cancelQuantity: formatNumberDot(item?.cancelQuantity) ?? 0,
          cancelProductAmount: formatNumberDot(item?.cancelProductAmount) ?? 0,
          claimDeliveryAmount: formatNumberDot(item?.claimDeliveryAmount) ?? 0,
          cancelFeeAmount: formatNumberDot(item?.cancelFeeAmount) ?? 0,
          remainingQuantity: formatNumberDot(item?.remainingQuantity) ?? 0,
          remainingPaymentAmount: formatNumberDot(item?.remainingPaymentAmount) ?? 0,
          rewardPoint: formatNumberDot(item?.rewardPoint) ?? 0,
          welfarePointPaymentAmount: formatNumberDot(item?.welfarePointPaymentAmount) ?? 0,
          pgPaymentAmount: formatNumberDot(item?.pgPaymentAmount) ?? 0,
        }))
        resolve({
          totalItems: res?.page?.totalCount,
          data: dataWithIndex
        })
      })
      .catch((res) => {
        reject(res)
      })
    })
  }
}

export const memberListOrderDetailApi = new MemberListOrderDetailApi()
