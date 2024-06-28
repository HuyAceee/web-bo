export enum ProductSalesTax {
  TAXATION = '과세',
  TAXFREE = '면세',
  YOUNG = '영세'
}

export enum ProductSalesTaxNumber {
  TAXATION = '01',
  TAXFREE = '02',
  YOUNG = '03'
}

export enum ProductSalesTestCase {
  EMPTY_DATA = 'empty',
  SUCCESS = 'success',
  UPDATE = 'update',
  WAIT_APPROVE = 'wait-approve',
  CANT_BE_MODIFIED = 'cant-be-modified',
  EDIT_BEFORE = 'edit-before',
  EDIT_COMPLETE = 'edit-complete'
}

export interface ProductSalesCouponPromotionDataModel {
  id?: any
  name?: any
  fixedRate?: any
  fixedAmount?: any
  discountPrice?: any
}

export interface ProductSalesDiscountPromotionDataModel {
  id?: any
  name?: any
  price?: any
  discountPrice?: any
  discountRate?: any
}

export interface ProductSalesSavingPromotionDataModel {
  id?: any
  name?: any
  fixedRate?: any
  semen?: any
  expectedSavings?: any
}

export interface ProductPricingInformationProps {
  contractMarginRate?: string | number
  tax?: ProductSalesTax
  sellingPrice?: any
  marginRate?: any
  contractMarginRateYN?: boolean
}

export interface ProductPricingInformationEmits {
  (e: 'update:contractMarginRateYN', value: any): void

  (e: 'update:sellingPrice', value: any): void

  (e: 'update:marginRate', value: any): void
}

export const ProductSavingPromotionTableConfig = [
  {
    header: '적립금 ID',
    field: 'id',
    class: 'wf_m-w-280'
  },
  {
    header: '적립금명',
    field: 'name',
    class: 'wf_m-w-280'
  },
  {
    header: '정률 (%)',
    field: 'fixedRate',
    class: 'wf_m-w-280'
  },
  {
    header: '정액 (/)',
    field: 'semen',
    class: 'wf_m-w-280'
  },
  {
    header: '예상 적립금',
    field: 'expectedSavings',
    class: 'wf_m-w-280'
  }
]
