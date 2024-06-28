import { EmployeeStatusEnum, ProductSearchRecordModel } from '@/models'
import {
  ProductBeforeDiscountPromotionListModel,
  ProductDiscountPromotionListModel
} from '@/models/views/products/modal/ProductSearchProductModalModel'

export interface ProductPromotionRegisterModel {
  discountCat: string
  seller: ProductSearchRecordModel
  sellerFromApi?: string
  promotionName: string
  discountPeriodBegin: string
  discountPeriodEnd: string
  couponApplies: string
  discountAmount: number
  promotionCode: string
  product: ProductBeforeDiscountPromotionListModel[]
  productDiscounted: ProductDiscountPromotionListModel[]
  discountCouponYn?: string
}

export enum ProductPromotionDiscountType {
  MZ = '01',
  SLCP = '02'
}

export const ProductPromotionRegisterConfig = {
  discountCatOptions: [
    { label: '플랫폼', value: ProductPromotionDiscountType.MZ },
    { label: '판매사', value: ProductPromotionDiscountType.SLCP }
  ],
  couponAppliesOptions: [
    { label: '적용 가능', value: EmployeeStatusEnum.Y },
    { label: '적용 불가', value: EmployeeStatusEnum.N }
  ]
}
