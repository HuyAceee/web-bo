import { ProductDiscountPromotionListRequest } from '@/models/services/requests/products/promotion/ProductPromotionDiscountRequest'
import { BaseApi } from '../BaseApi'
import { ProductDiscountPromotionListResponse } from '@/models/services/responses/products/promotion/ProductPromotionDiscountResponse'
import { PaginationModelRequest } from '@/models/services/requests/PaginationModelRequest'
import { renderLabelEnum } from '@/common'
import { productDiscountPromotionDiscountCouponYnEnum, productDiscountPromotionProgressYnEnum } from '@/models'

class ProductPromotionApi extends BaseApi {
  constructor() {
    super('shop/bo/item')
  }
  getDiscountPromotionList(request: ProductDiscountPromotionListRequest & PaginationModelRequest) {
    return new Promise<ProductDiscountPromotionListResponse>((resolve, reject) => {
      this.get('discount-promotion-list', request)
        .then((res) => {
          const dataWithIndex = res?.data.map((item: any, index: any) => ({
            index: index + 1,
            ...item,
            progressYn: renderLabelEnum(productDiscountPromotionProgressYnEnum, item.progressYn),
            discountCouponYn: renderLabelEnum(productDiscountPromotionDiscountCouponYnEnum, item.discountCouponYn)
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

export const productPromotionApi = new ProductPromotionApi()
