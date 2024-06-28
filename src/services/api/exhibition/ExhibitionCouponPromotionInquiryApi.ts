import { BaseApi } from '@/services/api/BaseApi'
import {
  ExhibitionPromotionCouponByKeyResponse,
  ExhibitionPromotionCouponResponseModel
} from '@/models/services/responses/exhibition/modal/ExhibitionPromotionCouponResponse'
import { ExhibitionPromotionCouponRequest } from '@/models/services/requests/exhibition/modal/ExhibitionPromotionCouponRequest'
import { DataTablePaginationResponseModel } from '@/models/services/responses/BaseModelResponse'
import {
  exhibitionCouponApplyChannelOptions,
  exhibitionCouponBenefitOptions,
  exhibitionCouponIssueMethodOptions,
  ExhibitionCouponPromotionInquiryTableModel,
  exhibitionCouponStatusOptions,
  exhibitionCouponTypeOptions
} from '@/models/views/exhibition/modal/ExhibitionCouponPromotionInquiryModel'
import { renderLabelEnum } from '@/common'

export class ExhibitionCouponPromotionInquiryApi extends BaseApi {
  constructor() {
    super('order')
  }

  async getPromotionCoupons(
    params: ExhibitionPromotionCouponRequest
  ): Promise<DataTablePaginationResponseModel<ExhibitionCouponPromotionInquiryTableModel>> {
    const { data, page } = await this.get('bo/promotion/coupons', params)
    const resData = {
      data: data.map((item: ExhibitionPromotionCouponResponseModel): ExhibitionCouponPromotionInquiryTableModel => {
        const applyChannel: string[] = []
        item?.applyChannels?.forEach((item) => {
          applyChannel.push(renderLabelEnum(exhibitionCouponApplyChannelOptions, item))
        })
        return {
          id: item?.couponKey,
          isSelected: false,
          couponKey: item?.couponKey,
          couponName: item?.couponName,
          couponType: renderLabelEnum(exhibitionCouponTypeOptions, item?.couponType ?? ''),
          couponStatus: renderLabelEnum(exhibitionCouponStatusOptions, item?.couponStatus ?? ''),
          issueMethod: renderLabelEnum(exhibitionCouponIssueMethodOptions, item?.issueMethod ?? ''),
          couponBenefitType: renderLabelEnum(exhibitionCouponBenefitOptions, item?.couponBenefitType ?? ''),
          maxDiscountAmount: (item?.maxDiscountAmount ?? '0') + '원',
          applyChannels: applyChannel.join(', ') ?? ''
        }
      }),
      totalItems: page.totalCount
    }

    return Promise.resolve(resData)
  }

  async getCouponByKey(couponKey: number): Promise<ExhibitionPromotionCouponByKeyResponse> {
    return this.get(`bo/promotion/coupons/${couponKey}`)
  }
}

export const exhibitionCouponPromotionInquiryApi = new ExhibitionCouponPromotionInquiryApi()
