import { DataTableContaineDeliveryConfigModel, DeliveryKeywordSearchType, DeliveryPeriodSearchType } from '../common'

export enum DeliveryProductCategoryDepthRank {
  DEPTH_1 = '1',
  DEPTH_2 = '2',
  DEPTH_3 = '3'
}

export enum DeliveryProductTypeModel {
  ALL = '',
  DELIVERY_GENERAL = '01',
  DELIVERY_INSTALL = '02',
  TICKET_GENERAL = '03',
  TICKET_RESERVATION = '04'
}

export const DeliveryProductTypeOptions = [
  {
    label: '전체',
    value: DeliveryProductTypeModel.ALL
  },
  {
    label: '일반',
    value: DeliveryProductTypeModel.DELIVERY_GENERAL
  },
  {
    label: '설치형',
    value: DeliveryProductTypeModel.DELIVERY_INSTALL
  },
  {
    label: '일반 티켓',
    value: DeliveryProductTypeModel.TICKET_GENERAL
  },
  {
    label: '예약 티켓',
    value: DeliveryProductTypeModel.TICKET_RESERVATION
  }
]

export enum DeliveryCategoryTypeModel {
  STANDARD = 'STD',
  DISPLAY = 'DSP'
}

export enum DeliveryRankingByModel {
  AMOUNT = '1',
  QUANTITY = '2'
}

export enum DeliveryRankingRangeModel {
  TOP_50 = '1',
  TOP_100 = '2',
  TOP_200 = '3'
}

export const deliveryProductTypeOptions = {
  title: '상품 유형',
  field: 'productType',
  list: [
    {
      id: 'all',
      label: '전체',
      value: DeliveryProductTypeModel.ALL
    },
    {
      id: '03',
      label: '일반티켓',
      value: DeliveryProductTypeModel.TICKET_GENERAL
    },
    {
      id: '04',
      label: '예약티켓',
      value: DeliveryProductTypeModel.TICKET_RESERVATION
    }
  ]
}

export const deliveryCategoryTypeOptions = [
  {
    label: '표준카테고리',
    value: DeliveryCategoryTypeModel.STANDARD
  },
  {
    label: '전시카테고리',
    value: DeliveryCategoryTypeModel.DISPLAY
  }
]

export const deliveryRankingRangeOptions = [
  {
    label: '50위까지',
    value: DeliveryRankingRangeModel.TOP_50
  },
  {
    label: '100위까지',
    value: DeliveryRankingRangeModel.TOP_100
  },
  {
    label: '200위까지 ',
    value: DeliveryRankingRangeModel.TOP_200
  }
]

export const deliveryRankingByOptions = [
  {
    label: '순주문금액순',
    value: DeliveryRankingByModel.AMOUNT
  },
  {
    label: '순주문수량순',
    value: DeliveryRankingByModel.QUANTITY
  }
]

export interface DeliveryStandardCategoryModel {
  categoryName: string
  depth: number
}

export interface DeliveryTicketProductOrderStatusProductFormModel {
  categoryType?: DeliveryCategoryTypeModel
  categoryId?: string
  categoryDepthId1?: string
  categoryDepthId2?: string
  categoryDepthId3?: string
  productKey?: string
  sellerKey?: string
  subcontractKey?: string
  productType?: DeliveryProductTypeModel
  mdKey?: string
  rankingBy?: DeliveryRankingByModel
  rankingRange?: DeliveryRankingRangeModel
  periodSearchType?: DeliveryPeriodSearchType
  fromDate?: string
  toDate?: string
  keywordSearchType?: DeliveryKeywordSearchType
  keyword?: string
  dateSelect?: {
    label: string
    value: DeliveryPeriodSearchType
  }
}

export interface DeliveryTicketProductOrderStatusProductModel {
  productKey: number
  productName: string
  productType: DeliveryProductTypeModel
  salesPrice: number
  quantity: number
  totalProductAmount: number
  immediateDiscountAmount: number
  couponDiscountAmount: number
  lastOrderAmount: number
  cancelQuantity: number
  cancelAmount: number
  netOrderQuantity: number
  netOrderAmount: number
  sellerKey: number
  sellerName: string
  subcontractName: string
  standardCategories: DeliveryStandardCategoryModel[]
  mdId: string
  mdName: string
  standardCategoryName?: string
}

export const deliveryTicketProductOrderStatusProductHeaderTableConfig = (
  onClickProductKey: (value?: DeliveryTicketProductOrderStatusProductModel) => void,
  onClickSellerKey: (value?: DeliveryTicketProductOrderStatusProductModel) => void
): DataTableContaineDeliveryConfigModel[] => [
  {
    header: 'No.',
    field: 'no',
    class: 'wf_m-w-200 '
  },
  {
    header: '상품코드',
    field: 'productKey',
    class: 'wf_m-w-200 ',
    onClick: onClickProductKey
  },
  {
    header: '상품명',
    field: 'productName',
    class: 'wf_m-w-200 ',
    onClick: onClickProductKey
  },
  {
    header: '상품유형',
    field: 'productType',
    class: 'wf_m-w-200 '
  },
  {
    header: '단위판매가',
    field: 'salesPrice',
    class: 'wf_m-w-200 '
  },
  {
    header: '주문수량',
    field: 'quantity',
    class: 'wf_m-w-200 '
  },
  {
    header: '상품금액',
    field: 'totalProductAmount',
    class: 'wf_m-w-200 '
  },
  {
    header: '즉시할인금액',
    field: 'immediateDiscountAmount',
    class: 'wf_m-w-200 '
  },
  {
    header: '상품쿠폰할인금액',
    field: 'couponDiscountAmount',
    class: 'wf_m-w-200 '
  },
  {
    header: '최종주문금액',
    field: 'lastOrderAmount',
    class: 'wf_m-w-200 '
  },
  {
    header: '취소수량',
    field: 'cancelQuantity',
    class: 'wf_m-w-200 '
  },
  {
    header: '취소상품금액',
    field: 'cancelAmount',
    class: 'wf_m-w-200 '
  },
  {
    header: '순주문수량',
    field: 'netOrderQuantity',
    class: 'wf_m-w-200 '
  },
  {
    header: '순주문금액',
    field: 'netOrderAmount',
    class: 'wf_m-w-200 '
  },
  {
    header: '판매사코드',
    field: 'sellerKey',
    class: 'wf_m-w-200 ',
    onClick: onClickSellerKey
  },
  {
    header: '판매사',
    field: 'sellerName',
    class: 'wf_m-w-200 ',
    onClick: onClickSellerKey
  },
  {
    header: '하위업체',
    field: 'subcontractName',
    class: 'wf_m-w-200 '
  },
  {
    header: '표준카테고리',
    field: 'standardCategoryName',
    class: 'wf_m-w-200 '
  },
  {
    header: 'MD',
    field: 'mdName',
    class: 'wf_m-w-200 '
  }
]

export const deliveryTicketProductOrderStatusProductXlsxSheetName = 'Order_Status_Product'

export const deliveryTicketProductOrderStatusProductHeaders = [
  'No.',
  '상품코드',
  '상품명',
  '상품유형',
  '단위판매가',
  '주문수량',
  '상품금액',
  '즉시할인금액',
  '상품쿠폰할인금액',
  '최종주문금액',
  '취소수량',
  '취소상품금액',
  '순주문수량',
  '순주문금액',
  '판매사코드',
  '판매사',
  '하위업체',
  '표준카테고리',
  'MD'
]

export const deliveryKeywordSearchOrderStatusProductOptions = [
  {
    label: '사용 안 함',
    value: DeliveryKeywordSearchType.NONE
  },
  {
    label: '상품코드',
    value: DeliveryKeywordSearchType.PRODUCT_KEY
  }
]

export const DeliveryOrderStatusProductTooltip = `<div class='wf_flex wf_flex-col wf-gap-10 wf_text-left'><p class='wf-body_04-reg wf_text-n-33 wf_text-sub-02'>-&nbsp;&nbsp;&nbsp;티켓상품의 상품별 주문현황을 확인하실 수 있습니다.</p><p class='wf-body_04-reg wf_text-n-33'>-&nbsp;&nbsp;&nbsp;상품별 주문현황은 최대 1년 이내 기간에서 조회 가능합니다.</p><p class='wf-body_04-reg wf_text-n-33'>-&nbsp;&nbsp;&nbsp;상품별 최종주문금액은 상품금액에서 상품할인금액이 제외된 금액입니다.</p></div>`
