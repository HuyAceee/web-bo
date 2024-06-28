import { DeliveryKeywordSearchType } from '../common'

export enum DeliveryOrderStatusModel {
  ALL = '',
  PAYMENT_WAIT = 'PAYWAT',
  PAYMENT_FAILED = 'PAYFAL',
  PAYMENT_COMPLETE = 'PAYCMP',
  ISSUE_FAIL = 'ISSUFL',
  ISSUE_DELAY = 'ISSUDY',
  ISSUE_COMPLETE = 'ISSUCP',
  PRODUCT_PREPARATION_DELAY = 'PRPRDY',
  PRODUCT_PREPARATION = 'PRPRPR',
  DELIVERY_DELAY = 'DELADY',
  DELIVERY = 'DELIVR',
  DELIVERY_COMPLETE = 'DELACP',
  PURCHASE_COMPLETE = 'PURCHP',
  NO_CLAIM = 'NOCLAM',
  ORDER_CANCEL = 'ORDCAN',
  SALE_CANCEL = 'SALCAN',
  ORDER_CANCEL_WITHDRAWAL = 'ORDCWD',
  DISUSE_FAIL = 'DISUFL',
  REFUND_REQUEST = 'REFDRQ',
  REFUND_FAIL = 'REFDFL',
  REFUND_COMPLETE = 'REFDCP'
}

export enum DeliveryClaimStatusModel {
  ALL = '',
  ORDER_CANCEL = 'ORDCCL',
  SALE_CANCEL = 'SLCCL',
  ORDER_CANCEL_WITHDRAWAL = 'ORDCW',
  CANCEL_COMPLETE = 'CCLCP'
}

export enum DeliveryTicketUseStatusModel {
  USED = 'Y',
  UNUSED = 'N',
  CANCELED = 'C'
}

export const deliveryOrderStatusTicketListOptions = [
  {
    label: '전체',
    value: DeliveryOrderStatusModel.ALL
  },
  {
    label: '발급완료',
    value: DeliveryOrderStatusModel.PURCHASE_COMPLETE
  },
  {
    label: '취소신청',
    value: DeliveryOrderStatusModel.REFUND_REQUEST
  },
  {
    label: '판매취소',
    value: DeliveryOrderStatusModel.ORDER_CANCEL
  }
]

export const deliveryOrderStatusPurchaseConfirmListOptions = [
  {
    label: '전체',
    value: DeliveryOrderStatusModel.ALL
  },
  {
    label: '구매확정',
    value: DeliveryOrderStatusModel.PURCHASE_COMPLETE
  },
  {
    label: '취소신청',
    value: DeliveryOrderStatusModel.REFUND_REQUEST
  },
  {
    label: '판매취소',
    value: DeliveryOrderStatusModel.ORDER_CANCEL
  }
]

export const deliveryClaimStatusRefundRequestOptions = [
  {
    label: '전체',
    value: DeliveryOrderStatusModel.ALL
  },
  {
    label: '주문취소신청',
    value: DeliveryOrderStatusModel.ORDER_CANCEL
  },
  {
    label: '티켓폐기실패',
    value: DeliveryOrderStatusModel.ISSUE_FAIL
  },
  {
    label: '환불요청완료',
    value: DeliveryOrderStatusModel.REFUND_REQUEST
  },
  {
    label: '환불완료',
    value: DeliveryOrderStatusModel.REFUND_COMPLETE
  },
  {
    label: '환불실패',
    value: DeliveryOrderStatusModel.REFUND_FAIL
  },
  {
    label: '주문취소철회',
    value: DeliveryOrderStatusModel.ORDER_CANCEL_WITHDRAWAL
  }
]

export const deliveryClaimStatusOrderCancelOptions = [
  {
    label: '전체',
    value: DeliveryOrderStatusModel.ALL
  },
  {
    label: '판매취소신청',
    value: DeliveryOrderStatusModel.SALE_CANCEL
  },
  {
    label: '환불요청완료',
    value: DeliveryOrderStatusModel.REFUND_REQUEST
  },
  {
    label: '환불완료',
    value: DeliveryOrderStatusModel.REFUND_COMPLETE
  },
  {
    label: '환불실패',
    value: DeliveryOrderStatusModel.REFUND_FAIL
  }
]

export const deliveryClaimStatusOrderDetailOptions = [
  {
    label: '없음',
    value: DeliveryOrderStatusModel.NO_CLAIM
  },
  {
    label: '전체',
    value: DeliveryOrderStatusModel.ALL
  },
  {
    label: '주문취소신청',
    value: DeliveryOrderStatusModel.ORDER_CANCEL
  },
  {
    label: '판매취소신청',
    value: DeliveryOrderStatusModel.SALE_CANCEL
  },
  {
    label: '티켓폐기실패',
    value: DeliveryOrderStatusModel.ISSUE_FAIL
  },
  {
    label: '환불요청완료',
    value: DeliveryOrderStatusModel.REFUND_REQUEST
  },
  {
    label: '환불완료',
    value: DeliveryOrderStatusModel.REFUND_COMPLETE
  },
  {
    label: '환불실패',
    value: DeliveryOrderStatusModel.REFUND_FAIL
  },
  {
    label: '주문취소철회',
    value: DeliveryOrderStatusModel.ORDER_CANCEL_WITHDRAWAL
  }
]

export const deliveryClaimStatusOptions = [
  {
    label: '전체',
    value: DeliveryOrderStatusModel.ALL
  },
  {
    label: '결제 대기',
    value: DeliveryOrderStatusModel.PAYMENT_WAIT
  },
  {
    label: '결제 실패',
    value: DeliveryOrderStatusModel.PAYMENT_FAILED
  },
  {
    label: '결제 완료',
    value: DeliveryOrderStatusModel.PAYMENT_COMPLETE
  },
  {
    label: '발급 실패',
    value: DeliveryOrderStatusModel.ISSUE_FAIL
  },
  {
    label: '발급 지연',
    value: DeliveryOrderStatusModel.ISSUE_DELAY
  },
  {
    label: '발급 완료',
    value: DeliveryOrderStatusModel.ISSUE_COMPLETE
  },
  {
    label: '상품 준비 지시 지연',
    value: DeliveryOrderStatusModel.PRODUCT_PREPARATION_DELAY
  },
  {
    label: '상품 준비 중',
    value: DeliveryOrderStatusModel.PRODUCT_PREPARATION
  },
  {
    label: '배송 지연',
    value: DeliveryOrderStatusModel.DELIVERY_DELAY
  },
  {
    label: '배송 중',
    value: DeliveryOrderStatusModel.DELIVERY
  },
  {
    label: '배송 완료',
    value: DeliveryOrderStatusModel.DELIVERY_COMPLETE
  },
  {
    label: '구매 확정',
    value: DeliveryOrderStatusModel.PURCHASE_COMPLETE
  },
  {
    label: '클레임 없음',
    value: DeliveryOrderStatusModel.NO_CLAIM
  },
  {
    label: '주문 취소 신청',
    value: DeliveryOrderStatusModel.ORDER_CANCEL
  },
  {
    label: '판매 취소 신청',
    value: DeliveryOrderStatusModel.SALE_CANCEL
  },
  {
    label: '주문 취소 철회',
    value: DeliveryOrderStatusModel.ORDER_CANCEL_WITHDRAWAL
  },
  {
    label: '티켓 폐기 실패',
    value: DeliveryOrderStatusModel.DISUSE_FAIL
  },
  {
    label: '환불 요청',
    value: DeliveryOrderStatusModel.REFUND_REQUEST
  },
  {
    label: '환불 실패',
    value: DeliveryOrderStatusModel.REFUND_FAIL
  },
  {
    label: '환불 완료',
    value: DeliveryOrderStatusModel.REFUND_COMPLETE
  }
]

export const deliveryTicketProductTicketListXlsxSheetName = 'Ticket_List'

export const deliveryKeywordSearchTicketListOptions = [
  {
    label: '사용 안 함',
    value: DeliveryKeywordSearchType.NONE
  },
  {
    label: '주문코드',
    value: DeliveryKeywordSearchType.ORDER_KEY
  },
  {
    label: '상품주문코드',
    value: DeliveryKeywordSearchType.ORDER_PRODUCT_KEY
  },
  {
    label: '회원코드',
    value: DeliveryKeywordSearchType.MEMBER_KEY
  },
  {
    label: '아이디',
    value: DeliveryKeywordSearchType.MEMBER_ID
  },
  {
    label: '상품코드',
    value: DeliveryKeywordSearchType.PRODUCT_KEY
  },
  {
    label: '거래번호 ',
    value: DeliveryKeywordSearchType.TRANSACTION_NUMBER
  }
]

export const DeliveryTicketListTooltip = `<div class="wf_flex wf_flex-col wf-gap-10 wf_text-left"><p class="wf-body_04-reg wf_text-n-33 wf_text-sub-02">-&nbsp;&nbsp;&nbsp;티켓상품 중 티켓 발급이 완료된 주문 내역을 확인하실 수 있습니다.</p><p class="wf-body_04-reg wf_text-n-33 wf_text-sub-01">-&nbsp;&nbsp;&nbsp;결제일로부터 15일 이후 자동으로 구매확정처리가 됩니다.</p><p class="wf-body_04-reg wf_text-n-33">-&nbsp;&nbsp;&nbsp;자동 구매확정처리에 장애가 있을 경우 구매 확정 처리할 수 있습니다.</p></div>`
