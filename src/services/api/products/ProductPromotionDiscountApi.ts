import { BaseApi } from '../BaseApi'
import {
  ProductDiscountPromotionCloseModel,
  ProductDiscountPromotionModel,
} from '@/models/views/products/modal/ProductSearchProductModalModel'
import { BaseModelResponse } from '@/models/services/responses/BaseModelResponse'
import { ProductDiscountPromotionCloseRequest, ProductDiscountPromotionRegisterRequest } from '@/models/services/requests/products/promotion/ProductPromotionDiscountRequest'

export class ProductPromotionDiscountApi extends BaseApi {
  constructor() {
    super('shop')
  }

  async getPromotion(discountPromotionKey: string): Promise<BaseModelResponse<ProductDiscountPromotionModel>> {
    return this.get('bo/item/discount-promotion-detail', { discountPromotionKey })
  }

  async putClosePromotion(data: ProductDiscountPromotionCloseRequest): Promise<BaseModelResponse<ProductDiscountPromotionCloseModel>> {
    return this.put('bo/item/close-discount-promotion',  data )
  }

  async putEditPromotion(data: ProductDiscountPromotionRegisterRequest): Promise<BaseModelResponse<ProductDiscountPromotionCloseModel>> {
    return this.put('bo/item/discount-promotion-manage', data)
  }
}

export const productPromotionDiscountApi = new ProductPromotionDiscountApi()
