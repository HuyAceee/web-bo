import { DataTableContainerConfigModel, WelfareRadioProps, WelfareSelectOptionType } from '@/models/uikit'

export interface MemberSearchMemberListOrderDetailFormModel {
  productClassification?: WelfareSelectOptionType
  paymentMethod?: WelfareSelectOptionType
  fromDate: string
  toDate: string
}

export interface MemberListOrderReceiverModel {
  receiverName: string
  receiverPhoneNumber: string
  receiverAddress: string
}
export interface MemberListOrderDetailDataTableModel {
  orderKey: string
  paymentDatetime: string
  productClassification: string
  productName: string
  orderQuantity: string
  totalProductAmount: string
  immediatelyDiscountAmount: string
  lastOrderAmount: string
  deliveryAmount: string
  orderCouponDiscountAmount: string
  lastPaymentAmount: string
  cancelProductAmount: string
  claimDeliveryAmount: string
  cancelFeeAmount: string
  addDeliveryAmount: string
  remainingQuantity: string
  remainingPaymentAmount: string
  welfarePointPaymentAmount: string
  pgPaymentAmount: string
  ordererName: string
  receiverName: string
  receiverPhoneNumber: string
  cancelQuantity: string
  pgPaymentMethod: string
  orderChannel: string
  deliveryDiscountAmount: string
  rewardPoint: string
  orderMemberReceiverResponses: MemberListOrderReceiverModel[]
}

export enum MemberOrderDetailProductClassificationModel {
  // product classification code
  ALL = '',
  DELIVERY_GENERAL = '02',
  TICKET_GENERAL = '01'
}

export enum MemberOrderDetailPaymentMethodModel {
  ALL = '',
  WELFARE_POINT = 'WLFPT',
  RESERVES = '',
  CREDIT_CARD = 'CRCD',
  MOBILE_PHONE_PAYMENT = '',
  NAVER_PAY = 'NVPR',
  KAKAO_PAY = 'KAKP',
  L_PAY = 'LP',
  SAMSUNG_PAY = 'SAMP',
  APPLE_PAY = 'APPP'
}

export const memberSearchMemberOrderDetailProductClassificationOptions = [
  { label: '상품구분 전체', value: MemberOrderDetailProductClassificationModel.ALL },
  { label: '배송상품', value: MemberOrderDetailProductClassificationModel.DELIVERY_GENERAL },
  { label: '티켓상품', value: MemberOrderDetailProductClassificationModel.TICKET_GENERAL }
]

export const memberSearchMemberOrderDetailPaymentMethodOptions = [
  { label: '전체', value: MemberOrderDetailPaymentMethodModel.ALL },
  { label: '복지포인트', value: MemberOrderDetailPaymentMethodModel.WELFARE_POINT },
  { label: '적립금', value: MemberOrderDetailPaymentMethodModel.RESERVES },
  { label: '신용카드', value: MemberOrderDetailPaymentMethodModel.CREDIT_CARD },
  { label: '휴대폰결제', value: MemberOrderDetailPaymentMethodModel.MOBILE_PHONE_PAYMENT },
  { label: '네이버페이', value: MemberOrderDetailPaymentMethodModel.NAVER_PAY },
  { label: '카카오페이', value: MemberOrderDetailPaymentMethodModel.KAKAO_PAY },
  { label: 'L페이', value: MemberOrderDetailPaymentMethodModel.L_PAY },
  { label: '삼성페이', value: MemberOrderDetailPaymentMethodModel.SAMSUNG_PAY },
  { label: '애플페이', value: MemberOrderDetailPaymentMethodModel.ALL }
]

export const DataHeaderMemberOrderDetailTableModalConfig: DataTableContainerConfigModel[] = [
  {
    header: '결제일시',
    field: 'paymentDatetime',
    class: 'wf_m-w-200 '
  },
  {
    header: '주문코드',
    field: 'orderKey',
    class: 'wf_m-w-200 '
  },
  {
    header: '상품구분',
    field: 'productClassification',
    class: 'wf_m-w-150 '
  },
  {
    header: '주문 상품',
    field: 'productName',
    class: 'wf_m-w-250 '
  },
  {
    header: '주문수량',
    field: 'orderQuantity',
    class: 'wf_m-w-100 '
  },
  {
    header: '상품금액',
    field: 'totalProductAmount',
    class: 'wf_m-w-120 '
  },
  {
    header: '즉시할인금액',
    field: 'immediatelyDiscountAmount',
    class: 'wf_m-w-120 '
  },
  {
    header: '상품쿠폰할인금액',
    field: 'orderCouponDiscountAmount',
    class: 'wf_m-w-200 '
  },
  {
    header: '최종주문금액',
    field: 'lastOrderAmount',
    class: 'wf_m-w-150 '
  },
  {
    header: '배송비',
    field: 'deliveryAmount',
    class: 'wf_m-w-100 '
  },
  {
    header: '배송비할인금액',
    field: 'deliveryDiscountAmount',
    class: 'wf_m-w-150 '
  },
  {
    header: '최종결제금액',
    field: ' lastPaymentAmount',
    class: 'wf_m-w-150 '
  },
  {
    header: '취소수량',
    field: 'cancelQuantity',
    class: 'wf_m-w-120 '
  },
  {
    header: '취소상품금액',
    field: 'cancelProductAmount',
    class: 'wf_m-w-150 '
  },
  {
    header: '클레임배송비',
    field: 'claimDeliveryAmount',
    class: 'wf_m-w-150 '
  },
  {
    header: '취소수수료',
    field: 'cancelFeeAmount',
    class: 'wf_m-w-120 '
  },
  {
    header: '순주문수량',
    field: 'remainingQuantity',
    class: 'wf_m-w-120 '
  },
  {
    header: '순결제금액',
    field: 'remainingPaymentAmount',
    class: 'wf_m-w-120'
  },
  {
    header: '적립금',
    field: 'rewardPoint',
    class: 'wf_m-w-120 '
  },
  {
    header: '복지포인트',
    field: 'welfarePointPaymentAmount',
    class: 'wf_m-w-120 '
  },
  {
    header: 'PG 결제금액',
    field: 'pgPaymentAmount',
    class: 'wf_m-w-120 '
  },
  {
    header: 'PG 결제수단',
    field: 'pgPaymentMethod',
    class: 'wf_m-w-120 '
  },
  {
    header: '주문자명',
    field: 'ordererName',
    class: 'wf_m-w-120 '
  },
  {
    header: '수령자명',
    field: 'receiverName',
    class: 'wf_m-w-200 '
  },
  {
    header: '수령자 휴대폰번호',
    field: 'receiverPhoneNumber',
    class: 'wf_m-w-250 '
  },
  {
    header: '배송지',
    field: 'receiverAddress',
    class: 'wf_m-w-300 '
  },
  {
    header: '주문채널',
    field: 'orderChannel',
    class: 'wf_m-w-200 '
  }
]

export const MemberOrderChannelsLabel: WelfareRadioProps[] = [
  {
    label: 'WEB(PC)',
    value: 'WPC'
  },
  {
    label: 'WEB(MO)',
    value: 'WMO'
  },
  {
    label: 'APP(iOS)',
    value: 'IOS'
  },
  {
    label: 'APP(AOS)',
    value: 'AOS'
  }
]
