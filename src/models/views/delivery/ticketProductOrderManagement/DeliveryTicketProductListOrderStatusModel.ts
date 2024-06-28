import { FORMAT_DATE_YYYY_MM_DD_T_hh_mm_ss, formatTime } from '@/common'
import { DataTableContaineDeliveryConfigModel, DeliveryKeywordSearchType, DeliveryPeriodSearchType } from '../common'
export class DeliveryTicketProductRequestConvertor {
  static from(model: DeliveryTicketProductListOrderStatusFormModel): DeliveryTicketProductListOrderStatusFormModel {
    const { keywords, keywordSearchType, periodSearchType, ...newModelValue } = model
    if (model.keywordSearchType !== DeliveryKeywordSearchType.NONE) {
      return {
        keywords,
        keywordSearchType,
        periodSearchType
      }
    }
    const fromDate = model.fromDate ? formatTime(model.fromDate, FORMAT_DATE_YYYY_MM_DD_T_hh_mm_ss) : ''
    const toDate = model.toDate ? formatTime(model.toDate, FORMAT_DATE_YYYY_MM_DD_T_hh_mm_ss) : ''

    return {
      ...newModelValue,
      keywords,
      keywordSearchType,
      periodSearchType,
      fromDate,
      toDate
    }
  }
}

export enum DeliveryPaymentMethodModel {
  ALL = '',
  WELFARE_POINT = 'WLFPT',
  CREDIT_CARD = 'CRCD',
  TRANSFER = 'ATRNS',
  MEGAZONE = 'MZPAY',
  NAVER = 'NVPR',
  KAKAO = 'KAKP',
  TOSS = 'TSPY',
  REWARD_POINT = 'REPT'
}

export enum DeliveryOrderChannelModel {
  ALL = '',
  WEB_PC = 'WPC',
  WEB_MO = 'WMO',
  APP_IOS = 'IOS',
  APP_AOS = 'AOS'
}

interface DeliveryTicketProductListReceiverModel {
  memberKey: number
  name: string
  phone: string
  ticketQuantity: number | null
}

export interface DeliveryTicketProductListOrderStatusFormModel {
  orderKey?: string
  customerKey?: string
  orderMemberKey?: string
  ordererName?: string
  receiverName?: string
  receiverPhone?: number
  paymentMethod?: string
  orderChannel?: string
  periodSearchType?: DeliveryPeriodSearchType
  fromDate?: string
  toDate?: string
  keywordSearchType?: DeliveryKeywordSearchType
  keywords?: string
  dateSelect?: {
    label: string
    value: string
  }
}

export interface DeliveryTicketProductListOrderStatusModel extends Record<string, unknown> {
  orderKey: number
  memberKey: number
  memberName: string
  memberId: string
  ordererName: string
  customerKey: number
  customerName: string
  productAmount: number
  immediateDiscountAmount: number
  couponDiscountAmount: number
  lastPaymentAmount: number
  applePaymentAmount: number
  samsungPayPaymentAmount: string
  lPayPaymentAmount: string
  phonePaymentAmount: string
  cancelQuantity: number
  cancelAmount: number
  cancelFeeAmount: number
  orderQuantity: number
  netOrderQuantity: number
  netOrderAmount: number
  welfarePointPaymentAmount: number
  creditCartPaymentAmount: number
  transferPaymentAmount: number
  megazonePaymentAmount: number
  naverPaymentAmount: number
  kakaoPaymentAmount: number
  tossPaymentAmount: number
  orderChannel: string
  orderDate: string
  paymentStatus: string
  receivers: DeliveryTicketProductListReceiverModel[]
  receiverName?: string
  receiverPhone?: string
}

export const deliveryPaymentMethodOptions = [
  {
    label: '전체',
    value: DeliveryPaymentMethodModel.ALL
  },
  {
    label: '복지포인트',
    value: DeliveryPaymentMethodModel.WELFARE_POINT
  },
  {
    label: '신용카드',
    value: DeliveryPaymentMethodModel.CREDIT_CARD
  },
  {
    label: '계좌이체',
    value: DeliveryPaymentMethodModel.TRANSFER
  },
  {
    label: '메가존페이',
    value: DeliveryPaymentMethodModel.MEGAZONE
  },
  {
    label: '네이버페이',
    value: DeliveryPaymentMethodModel.NAVER
  },
  {
    label: '카카오페이',
    value: DeliveryPaymentMethodModel.KAKAO
  },
  {
    label: '토스페이 ',
    value: DeliveryPaymentMethodModel.TOSS
  }
]

export const deliveryPaymentMethodAllOptions = [
  ...deliveryPaymentMethodOptions,
  {
    label: '적립금',
    value: DeliveryPaymentMethodModel.REWARD_POINT
  }
]

export const deliveryOrderChannelOptions = [
  {
    label: '전체',
    value: DeliveryOrderChannelModel.ALL
  },
  {
    label: 'Web(PC)',
    value: DeliveryOrderChannelModel.WEB_PC
  },
  {
    label: 'Web(MO)',
    value: DeliveryOrderChannelModel.WEB_MO
  },
  {
    label: 'App(iOS)',
    value: DeliveryOrderChannelModel.APP_IOS
  },
  {
    label: 'App(AOS)',
    value: DeliveryOrderChannelModel.APP_AOS
  }
]

export const deliveryKeywordSearchOptions = [
  {
    label: '사용 안 함',
    value: DeliveryKeywordSearchType.NONE
  },
  {
    label: '주문코드',
    value: DeliveryKeywordSearchType.ORDER_KEY
  },
  {
    label: '회원코드',
    value: DeliveryKeywordSearchType.MEMBER_KEY
  },
  {
    label: '아이디',
    value: DeliveryKeywordSearchType.MEMBER_ID
  }
]

export const deliveryTicketProductListOrderStatusHeaderTableConfig = (
  onClickOrderKey: (value?: DeliveryTicketProductListOrderStatusModel) => void,
  onClickMemberKey: (value?: DeliveryTicketProductListOrderStatusModel) => void,
  onClickCustomerKey: (value?: DeliveryTicketProductListOrderStatusModel) => void
): DataTableContaineDeliveryConfigModel[] => [
  {
    header: '주문코드',
    field: 'orderKey',
    class: 'wf_m-w-200 ',
    onClick: onClickOrderKey
  },
  {
    header: '회원코드',
    field: 'memberKey',
    class: 'wf_m-w-200 ',
    onClick: onClickMemberKey
  },
  {
    header: '회원명',
    field: 'memberName',
    class: 'wf_m-w-200 ',
    onClick: onClickMemberKey
  },
  {
    header: '아이디',
    field: 'memberId',
    class: 'wf_m-w-200 ',
    onClick: onClickMemberKey
  },
  {
    header: '고객사코드',
    field: 'customerKey',
    class: 'wf_m-w-200 ',
    onClick: onClickCustomerKey
  },
  {
    header: '고객사',
    field: 'customerName',
    class: 'wf_m-w-200 ',
    onClick: onClickCustomerKey
  },
  {
    header: '주문수량',
    field: 'orderQuantity',
    class: 'wf_m-w-200 '
  },
  {
    header: '상품금액',
    field: 'productAmount',
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
    header: '최종결제금액',
    field: 'lastPaymentAmount',
    class: 'wf_m-w-200 '
  },
  {
    header: '복지포인트',
    field: 'welfarePointPaymentAmount',
    class: 'wf_m-w-200 '
  },
  // {
  //   header: '취소수량',
  //   field: 'cancelQuantity',
  //   class: 'wf_m-w-200 '
  // },
  // {
  //   header: '취소상품금액',
  //   field: 'cancelAmount',
  //   class: 'wf_m-w-200 '
  // },
  // {
  //   header: '취소수수료',
  //   field: 'cancelFeeAmount',
  //   class: 'wf_m-w-200 '
  //},
  // {
  //   header: '순주문수량',
  //   field: 'netOrderQuantity',
  //   class: 'wf_m-w-200 '
  // },
  // {
  //   header: '순결제금액',
  //   field: 'netOrderAmount',
  //   class: 'wf_m-w-200 '
  // },
  {
    header: '신용카드',
    field: 'creditCartPaymentAmount',
    class: 'wf_m-w-200 '
  },
  //added
  {
    header: '휴대폰결제',
    field: 'phonePaymentAmount',
    class: 'wf_m-w-200 '
  },
  {
    header: '네이버페이',
    field: 'naverPaymentAmount',
    class: 'wf_m-w-200 '
  },
  {
    header: '카카오페이',
    field: 'kakaoPaymentAmount',
    class: 'wf_m-w-200 '
  },
  {
    header: 'L.PAY',
    field: 'lPayPaymentAmount',
    class: 'wf_m-w-200 '
  },
  {
    header: '삼성페이',
    field: 'samsungPayPaymentAmount',
    class: 'wf_m-w-200 '
  },
  {
    header: '애플페이',
    field: 'applePaymentAmount',
    class: 'wf_m-w-200 '
  },
  //end
  // {
  //   header: '계좌이체',
  //   field: 'transferPaymentAmount',
  //   class: 'wf_m-w-200 '
  // },
  // {
  //   header: '메가존페이',
  //   field: 'megazonePaymentAmount',
  //   class: 'wf_m-w-200 '
  // },
  // {
  //   header: '토스페이',
  //   field: 'tossPaymentAmount',
  //   class: 'wf_m-w-200 '
  // },
  {
    header: '주문자명',
    field: 'ordererName',
    class: 'wf_m-w-200 '
  },
  {
    header: '수령자명',
    field: 'receiverName',
    class: 'wf_m-w-200 '
  },
  {
    header: '수령자 휴대폰번호',
    field: 'receiverPhone',
    class: 'wf_m-w-200 '
  },
  {
    header: '주문채널',
    field: 'orderChannel',
    class: 'wf_m-w-200 '
  },
  {
    header: '결제일시',
    field: 'orderDate',
    class: 'wf_m-w-200 '
  },
  {
    header: '결제상태',
    field: 'paymentStatus',
    class: 'wf_m-w-200 '
  }
]

export const deliveryTicketProductListOrderStatusXlsxSheetName = 'List_Order_Status'

export const deliveryTicketProductListOrderStatusHeaders = [
  '주문코드',
  '회원코드',
  '회원명',
  '아이디',
  '고객사코드',
  '고객사',
  '주문수량',
  '상품금액',
  '즉시할인금액',
  '상품쿠폰할인금액',
  '최종결제금액',
  '취소수량',
  '취소상품금액',
  '취소수수료',
  '순주문수량',
  '순결제금액',
  '복지포인트',
  '신용카드',
  //add
  '휴대폰결제',
  'L.PAY',
  '삼성페이',
  '애플페이',
  //end
  '계좌이체',
  '메가존페이',
  '네이버페이',
  '카카오페이',
  '토스페이',
  '주문자명',
  '수령자명',
  '수령자 휴대폰번호',
  '주문채널',
  '결제일시',
  '결제상태'
]

export const deliveryListSelectDateTicketListOptions = [
  { label: '티켓발급일', value: DeliveryPeriodSearchType.TICKET_ISSUE_DATE },
  { label: '결제일 ', value: DeliveryPeriodSearchType.PAYMENT_DATE }
]

export const deliveryListSelectDatePurchaseConfirmListOptions = [
  { label: '구매확정일', value: DeliveryPeriodSearchType.PURCHASE_CONFIRM_DATE },
  { label: '티켓발급일', value: DeliveryPeriodSearchType.TICKET_ISSUE_DATE },
  { label: '결제일', value: DeliveryPeriodSearchType.PAYMENT_DATE }
]

export const deliveryListSelectDateOrderDetailOptions = [{ label: '결제일 ', value: DeliveryPeriodSearchType.PAYMENT_DATE }]

export const DeliveryListOrderStatusTooltip = `<div class="wf_flex wf_flex-col wf-gap-10 wf_text-left"><p class="wf-body_04-reg wf_text-n-33 wf_text-sub-02">-&nbsp;&nbsp;&nbsp;티켓상품의 전체 주문현황을 확인하실 수 있습니다.</p><p class="wf-body_04-reg wf_text-n-33">-&nbsp;&nbsp;&nbsp;주문현황은 최대 1년 이내 기간에서 조회 가능합니다.</p><p class="wf-body_04-reg wf_text-n-33">-&nbsp;&nbsp;&nbsp;모든 상태의 주문을 확인할 수 있으나 티켓 발급, 클레임 처리 등은 개별 메뉴에서 가능합니다.</p></div>`
