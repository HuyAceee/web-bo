import { BaseApi } from '../BaseApi'
import { MemberListCouponDetailResponse } from '@/models/services/responses/members/MemberListCouponDetailResponse'
import { PaginationModelRequest } from '@/models/services/requests/PaginationModelRequest'
import { MemberCouponDetailTypes, MemberCouponDetailUseStatusEnum } from '@/models'
import { renderLabelEnum } from '@/common'

class MemberListCouponDetailApi extends BaseApi {
  constructor() {
    super('order/bo/promotion')
  }

  getMemberListCouponDetail(memberId: string, request: PaginationModelRequest) {
    return new Promise<MemberListCouponDetailResponse>((resolve, reject) => {
      this.get(`member-coupons/members/${memberId}`, request)
        .then((res) => {
          const dataWithIndex = res?.data.map((item: any, index: any) => ({
            index: (request.pageNum - 1) * request.rowSize + index + 1,
            ...item,
            useStatus: renderLabelEnum(MemberCouponDetailUseStatusEnum, item.useStatus),
            couponType: renderLabelEnum(MemberCouponDetailTypes, item.couponType)
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

export const memberListCouponDetailApi = new MemberListCouponDetailApi()
