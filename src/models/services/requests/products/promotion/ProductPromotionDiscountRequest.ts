import { FORMAT_DATE_YYYY_MM_DD_T_hh_mm, formatTime } from '@/common'
import { ProductPromotionListFormModel } from '@/models/views'
import { PaginationModelRequest } from '@/models/services/requests/PaginationModelRequest'
import { ProductDiscountPromotionProductModel } from '@/models/views/products/modal/ProductSearchProductModalModel'

export interface ProductDiscountPromotionListRequest {
  discountPriceType?: string
  sellerKey?: string
  progressYn?: string
  discountCouponYn?: string
  pmtSearchDateType?: string
  fromDate?: string
  toDate?: string
  pmtSearchWordType?: string
  pmtSearchWord?: string
}

export interface ProductDiscountPromotionRegisterRequest {
  productDiscountAmount: string
  discountPromotionKey?: string
  discountPromotionEndDateTime: string
  discountPromotionName: string
  sellerKey: string
  boDscntPmtProdDetailList: ProductDiscountPromotionProductModel[]
  discountCouponYn: string
  discountPriceType: string
  discountPromotionId?: string
  progressYn?: string
  discountPromotionStartDateTime: string
}
export interface ProductDiscountPromotionCloseRequest {
  discountPromotionKey: string
  productKey?: string
}

export class ProductDiscountPromotionListRequestConvertor {
  static from(model: ProductPromotionListFormModel, page: number, size: number): ProductDiscountPromotionListRequest & PaginationModelRequest {
    const pmtSearchWordType = model.pmtSearchWordType.value
    const pmtSearchDateType = model.pmtSearchDateType.value
    const fromDate = model.fromDate ? formatTime(model.fromDate, FORMAT_DATE_YYYY_MM_DD_T_hh_mm) : ''
    const toDate = model.toDate ? formatTime(model.toDate, FORMAT_DATE_YYYY_MM_DD_T_hh_mm) : ''
    return {
      ...model,
      pmtSearchWordType,
      pmtSearchDateType,
      fromDate,
      toDate,
      pageNum: page + 1,
      rowSize: size
    }
  }
}
