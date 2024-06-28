import { ID_CHECKBOX_ALL } from '@/common'
import { DataTableContainerConfigModel, WelfareSelectOptionType } from '@/models/uikit'
import { ComplaintCheckBoxConfigType } from '@/models/views/complaint/complaintTicketProduct/ComplaintTicketProductListModel'

export enum ProductPromotionPmtPriceType {
  MZ = '01',
  SLCP = '02'
}

export enum ProductPromotionProgressModel {
  ALL = ID_CHECKBOX_ALL,
  Y = 'Y',
  N = 'N'
}

export enum ProductPromotionDiscountCouponModel {
  ALL = ID_CHECKBOX_ALL,
  APPLICABLE = 'Y',
  NOTAPPLICABLE = 'N'
}

export enum ProductPromotionKeywordSearchModel {
  NO_USE = '',
  PROMOTION_NAME = 'promotionName',
  PROMOTION_ID = 'promotionId'
}

export enum ProductDiscountPromotionKeywordSearchDate {
  REGISTRATION = 'REG',
  PROMOTION_START = 'PMT_START',
  PROMOTION_END = 'PMT_END'
}

export const productPromotionProgressCheckBoxConfig: ComplaintCheckBoxConfigType = {
  field: 'progressYnTypeCheckBox',
  list: [
    {
      id: ProductPromotionProgressModel.ALL,
      label: '전체',
      class: 'wf_w-52'
    },
    {
      id: ProductPromotionProgressModel.Y,
      label: '진행중',
      class: 'wf_w-52'
    },
    {
      id: ProductPromotionProgressModel.N,
      label: '종료',
      class: 'wf_w-63'
    }
  ]
}

export const productPromotionDiscountCouponCheckBoxConfig: ComplaintCheckBoxConfigType = {
  field: 'discountCouponYnTypeCheckBox',
  list: [
    {
      id: ProductPromotionDiscountCouponModel.ALL,
      label: '전체',
      class: 'wf_w-52'
    },
    {
      id: ProductPromotionDiscountCouponModel.APPLICABLE,
      label: '적용 가능',
      class: 'wf_w-63'
    },
    {
      id: ProductPromotionDiscountCouponModel.NOTAPPLICABLE,
      label: '적용 불가',
      class: 'wf_w-96'
    }
  ]
}

export const productPromotionDiscountPriceTypeConfig = {
  listRadios: [
    {
      title: 'MZ 복지몰',
      value: ProductPromotionPmtPriceType.MZ
    },
    {
      title: '판매사',
      value: ProductPromotionPmtPriceType.SLCP
    }
  ]
}

export const DataHeaderPromotionProductTableModalConfig: DataTableContainerConfigModel[] = [
  {
    header: '프로모션ID',
    field: 'discountPromotionId',
    class: 'wf_m-w-120 '
  },
  {
    header: '프로모션명',
    field: 'discountPromotionName',
    class: 'wf_m-w-120 '
  },
  {
    header: '할인구분',
    field: 'discountPriceTypeName',
    class: 'wf_m-w-80 '
  },
  {
    header: '판매사코드',
    field: 'sellerKey',
    class: 'wf_m-w-120 '
  },
  {
    header: '판매사',
    field: 'sellerName',
    class: 'wf_m-w-120'
  },
  {
    header: '쿠폰 적용 여부',
    field: 'discountCouponYn',
    class: 'wf_m-w-120'
  },
  {
    header: '프로모션 기간',
    field: 'promotionPeriod',
    class: 'wf_m-w-300 '
  },
  {
    header: '진행 상태',
    field: 'progressYn',
    class: 'wf_m-w-100 '
  },
  {
    header: '등록자',
    field: 'createdByName',
    class: 'wf_m-w-120 wf_justify-center'
  },
  {
    header: '등록일',
    field: 'createdDate',
    class: 'wf_m-w-200 wf_justify-center'
  },
  {
    header: '조회',
    field: 'view',
    class: 'wf_m-w-50'
  }
]

export interface ProductPromotionListFormModel {
  discountPriceType: string
  sellerKey: string
  progressYn: string
  discountCouponYn: string
  pmtSearchDateType: WelfareSelectOptionType
  fromDate: string
  toDate: string
  pmtSearchWordType: WelfareSelectOptionType
  pmtSearchWord: string
}

export interface ProductDiscountPromotionListDataTableModel {
  discountPromotionKey: string
  discountPromotionId: string
  discountPromotionName: string
  discountPriceType: string
  discountPriceTypeName: string
  sellerKey: string
  sellerName: string
  discountPromotionStartDateTime: string
  discountPromotionEndDateTime: string
  progressYn: string
  discountCouponYn: string
  createdBy: string
  createdByName: string
  createdDate: string
}

export const productPromotionListSelectDateOptionsConfig = [
  { label: '등록일', value: ProductDiscountPromotionKeywordSearchDate.REGISTRATION },
  { label: '프로모션 시작일', value: ProductDiscountPromotionKeywordSearchDate.PROMOTION_START },
  { label: '프로모션 종료일', value: ProductDiscountPromotionKeywordSearchDate.PROMOTION_END }
]

export const productPromotionKeywordSearchOptionsConfig = [
  { label: '사용안함', value: ProductPromotionKeywordSearchModel.NO_USE },
  { label: '프로모션명', value: ProductPromotionKeywordSearchModel.PROMOTION_NAME },
  { label: '프로모션코드', value: ProductPromotionKeywordSearchModel.PROMOTION_ID }
]

export const productDiscountPromotionProgressYnEnum = [
  { label: '진행중', value: 'Y' },
  { label: '종료', value: 'N' },
  { label: '전체', value: '' }
]

export const productDiscountPromotionDiscountCouponYnEnum = [
  { label: '적용가능', value: 'Y' },
  { label: '적용불가', value: 'N' },
  { label: '전체', value: '' }
]
