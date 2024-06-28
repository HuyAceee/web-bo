import { WelfareSelectOptionType } from '@/models'
import { ExhibitionPromotionCouponByKeyResponseModel } from '@/models/services/responses/exhibition/modal/ExhibitionPromotionCouponResponse'

export enum ExhibitionCouponTargetType {
  ALL = 'ALL',
  PRODUCT = 'PRD',
  BRAND = 'BRD',
  DISPLAY_CATEGORY = 'DSC'
}

export enum ExhibitionCouponIssueMethod {
  DOWNLOAD = 'DWN',
  ISSUE = 'ISS'
}

export enum ExhibitionCouponType {
  PRODUCT = 'PRD',
  CART = 'CRT',
  FREE_DELIVERY = 'FSP'
}

export enum ExhibitionCouponStatus {
  SCHEDULED = 'SCH',
  PROGRESS = 'PRG',
  END = 'END',
  FORCE_END = 'FND'
}

export enum ExhibitionCouponBenefit {
  FIXED = 'FIX',
  PERCENT = 'PER'
}

export enum ExhibitionCouponApplyChannel {
  PC_WEB = 'PWEB',
  MOBILE_WEB = 'MWEB',
  MOBILE_APP = 'MAPP'
}

export enum ExhibitionCouponIssueType {
  DIRECT = 'DIR',
  EVENT = 'EVT',
  AUTO = 'AUT'
}

export const exhibitionCouponTargetTypeOptions: WelfareSelectOptionType[] = [
  {
    label: '모든상품',
    value: ExhibitionCouponTargetType.ALL
  },
  {
    label: '상품별',
    value: ExhibitionCouponTargetType.PRODUCT
  },
  {
    label: '브랜드별',
    value: ExhibitionCouponTargetType.BRAND
  },
  {
    label: '카테고리별',
    value: ExhibitionCouponTargetType.DISPLAY_CATEGORY
  }
]

export const exhibitionCouponIssueTypeOptions: WelfareSelectOptionType[] = [
  {
    label: '직접발급',
    value: ExhibitionCouponIssueType.DIRECT
  },
  {
    label: '이벤트',
    value: ExhibitionCouponIssueType.EVENT
  },
  {
    label: '자동발급',
    value: ExhibitionCouponIssueType.AUTO
  }
]

export const exhibitionCouponBenefitOptions: WelfareSelectOptionType[] = [
  {
    label: '정액',
    value: ExhibitionCouponBenefit.FIXED
  },
  {
    label: '정률',
    value: ExhibitionCouponBenefit.PERCENT
  }
]

export const exhibitionCouponIssueMethodOptions: WelfareSelectOptionType[] = [
  {
    label: '다운로드',
    value: ExhibitionCouponIssueMethod.DOWNLOAD
  },
  {
    label: '발급',
    value: ExhibitionCouponIssueMethod.ISSUE
  }
]

export const exhibitionCouponStatusOptions: WelfareSelectOptionType[] = [
  {
    label: '진행예정',
    value: ExhibitionCouponStatus.SCHEDULED
  },
  {
    label: '진행중',
    value: ExhibitionCouponStatus.PROGRESS
  },
  {
    label: '종료',
    value: ExhibitionCouponStatus.END
  },
  {
    label: '강제종료',
    value: ExhibitionCouponStatus.FORCE_END
  }
]

export const exhibitionCouponTypeOptions: WelfareSelectOptionType[] = [
  {
    label: '상품',
    value: ExhibitionCouponType.PRODUCT
  },
  {
    label: '장바구니',
    value: ExhibitionCouponType.CART
  },
  {
    label: '무료배송',
    value: ExhibitionCouponType.FREE_DELIVERY
  }
]

export const exhibitionCouponApplyChannelOptions: WelfareSelectOptionType[] = [
  {
    label: 'PC 웹',
    value: ExhibitionCouponApplyChannel.PC_WEB
  },
  {
    label: '모바일 웹',
    value: ExhibitionCouponApplyChannel.MOBILE_WEB
  },
  {
    label: '모바일 앱',
    value: ExhibitionCouponApplyChannel.MOBILE_APP
  }
]

export interface ExhibitionCouponPromotionInquiryProps {
  onClose?: () => void
  onSelect?: (value: ExhibitionCouponPromotionInquiryTableModel[]) => void
}

export const exhibitionCouponPromotionInquiryTableConfig = [
  {
    header: '쿠폰코드',
    field: 'couponKey',
    class: 'wf_m-w-150 '
  },
  {
    header: '쿠폰명',
    field: 'couponName',
    class: 'wf_m-w-150 '
  },
  {
    header: '쿠폰유형',
    field: 'couponType',
    class: 'wf_m-w-150 '
  },
  {
    header: '진행상태',
    field: 'couponStatus',
    class: 'wf_m-w-150 '
  },
  {
    header: '발급방법',
    field: 'issueMethod',
    class: 'wf_m-w-150 '
  },
  {
    header: '정률/정액',
    field: 'couponBenefitType',
    class: 'wf_m-w-150 '
  },
  {
    header: '할인률',
    field: 'maxDiscountAmount',
    class: 'wf_m-w-150 '
  },
  {
    header: '적용채널',
    field: 'applyChannels',
    class: 'wf_m-w-150 '
  }
]

export interface ExhibitionCouponPromotionInquiryTableModel {
  id?: number
  isSelected?: boolean
  couponKey?: number
  couponName?: string
  couponType?: string
  couponStatus?: string
  issueMethod?: string
  couponBenefitType?: string
  maxDiscountAmount?: string
  applyChannels?: string
}

export interface ExhibitionPromotionCouponByKeyModel extends ExhibitionPromotionCouponByKeyResponseModel {
  applyChannelsString?: string
}
