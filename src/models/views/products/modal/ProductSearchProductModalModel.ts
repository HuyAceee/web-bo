import { WelfareSelectOptionType } from '@/models'

export interface ProductDiscountPromotionProductModel {
  productDiscountAmount: string
  discountPromotionKey?: string
  productKey: string
  progressYn?: string
}

export interface ProductDiscountPromotionCloseModel {
  discountPromotionId: string
  discountPromotionKey: number
  discountPromotionName: string
  errMessage: string
  productCode: string
  productKey: number
  sucessMessage: string
}

export interface ProductDiscountPromotionModel {
  discountPromotionKey: number
  discountPromotionId: string
  discountPromotionName: string
  discountPriceType: string
  discountPriceTypeName: string
  sellerKey: number
  discountPromotionStartDateTime: string
  discountPromotionEndDateTime: string
  progressYn: string
  discountCouponYn: string
  productDiscountAmount: number
  createdBy: string
  createdByName: string
  createdDate: string
  boDscntPmtProdDetailList: ProductDiscountPromotionListModel[]
}

export interface ProductDiscountPromotionListModel {
  discountPromotionProductKey?: string
  discountPromotionKey?: string
  productKey: string
  productCode: string
  productName: string
  salePrice: number
  lastProductSalesStatusCode: string
  lastProductSalesStatusName: string
  productCreatedBy: string
  productCreatedByName: string
  productCreatedDate: string
  productDiscountAmount: number
  productDiscountRate?: string
  immediatelyProductDiscountAmount: number
  discountCouponYn?: string
  progressYn?: string
}

export interface ProductBeforeDiscountPromotionListModel {
  productKey: string
  productCode: string
  productName: string
  salePrice: number
  lastProductSalesStatusCode: string
  lastProductSalesStatusName: string
  productCreatedBy: string
  productCreatedByName: string
  productCreatedDate: string
  progressYn: string
  productDiscountAmount?: number
  immediatelyProductDiscountAmount?: number
}

export interface ProductSearchProductTableModel {
  productKey: string
  productCode: string
  productName: string
  sellerKey: string
  sellerName: string
  brandId: string
  brandName: string
  productClassificationCode: string
  productClassificationName: string
  productType: string
  productTypeName: string
  salePrice: string
  lastProductSalesStatusCode: string
  lastProductSalesStatusName: string
  lastProductProgressStatusCode: string
  lastProductProgressStatusName: string
  chargeMdKey: string
  chargeMdName: string
  createdBy: string
  createdByName: string
  createdYyyymmdd: string
  lastModifiedYyyymmdd: string
  lastModifiedBy: string
  lastModifiedByName: string
  standardCategoryPath: string
  displayCategoryPath: string
  displayYn?: string
}

export interface ProductSearchModalQuery {
  productClassificationCode: WelfareSelectOptionType
  chargeMdKey: string
  productName: string
  productCode: string
  lastProductSalesStatusCode: WelfareSelectOptionType
  lastProductProgressStatusCode: WelfareSelectOptionType
  searchDateType: WelfareSelectOptionType
  fromDate: string
  toDate: string
  codeSearch: WelfareSelectOptionType
  codeQuery: string
}

export const ProductSearchProductModalModelTableConfig = [
  {
    header: 'No.',
    field: 'id',
    class: 'wf_m-w-80'
  },
  {
    header: '상품코드',
    field: 'productCode',
    class: 'wf_m-w-120'
  },
  {
    header: '상품명',
    field: 'productName',
    class: 'wf_m-w-140'
  },
  {
    header: '상품구분',
    field: 'productClassificationName',
    class: 'wf_m-w-100'
  },
  {
    header: '상품유형',
    field: 'productTypeName',
    class: 'wf_m-w-100'
  },
  {
    header: '판매가',
    field: 'salePrice',
    class: 'wf_m-w-100'
  },
  {
    header: '판매상태',
    field: 'lastProductSalesStatusName',
    class: 'wf_m-w-120'
  },
  {
    header: '승인상태',
    field: 'lastProductProgressStatusName',
    class: 'wf_m-w-120'
  },
  {
    header: '담당MD',
    field: 'chargeMdName',
    class: 'wf_m-w-180'
  },
  {
    header: '등록자',
    field: 'createdByName',
    class: 'wf_m-w-180'
  },
  {
    header: '등록일',
    field: 'createdYyyymmdd',
    class: 'wf_m-w-180'
  },
  {
    header: '수정자',
    field: 'lastModifiedBy',
    class: 'wf_m-w-180'
  },
  {
    header: '수정일',
    field: 'lastModifiedByName',
    class: 'wf_m-w-180'
  }
]

export const discountPromotionApplicable = {
  applicable: '적용 하다',
  notApplicable: '적용 불가'
}

export const isOnCoupon = {
  applicable: '진행중',
  notApplicable: '종료',
  initial: '전체'
}
