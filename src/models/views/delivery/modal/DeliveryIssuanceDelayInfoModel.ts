import { WelfareSelectOptionType } from '@/models'
import { DeliveryHintModel } from '@/models/views/delivery/modal/DeliveryHintModel'
import { DeliveryCancelSellModel, DeliveryOrderProcessStatusModel } from './DeliveryCancelSellModel'

export interface DeliveryIssuanceDelayInfoModel {
  issueDelayReason: WelfareSelectOptionType
  reasonContents: string
}

export interface DeliveryIssuanceDelayInfoProps {
  onClose: () => void
  receiverProductOrderKeys: string
}

export interface DeliveryIssueDelayTargetsTableModel extends DeliveryCancelSellModel {
  id: number
  isSelected: boolean
  isDisabled: boolean
  claimStatus: string
}

export const deliveryIssuanceDelayInfoHint: DeliveryHintModel[] = [
  { content: '결제일로부터 1일 이내에 티켓발급 처리 불가한 경우 구매자에게 미리 발급 지연 안내를 할 수 있습니다.' },
  { content: '발급 지연 안내는 1회만 가능합니다.', isEmphasize: true },
  {
    content: '발급 지연 안내가 처리된 주문이라도 결제일로부터 3일 이내에 티켓 발급 처리하지 않을 경우 주문 취소 및 패널티 부과의 대상이 됩니다.',
    isEmphasize: true
  }
]

enum DeliveryIssueDelayReason {
  TEMPORARILY_OUT_OF_STOCK = 'TMPOT',
  SURGE_IN_ORDERS = 'SURGE',
  HOLIDAY = 'HLDAY',
  COMPANY_GATHERING = 'CMPGT'
}

export const deliveryReasonForDelayInIssuanceSelectOption: WelfareSelectOptionType[] = [
  {
    label: '일시품절',
    value: DeliveryIssueDelayReason.TEMPORARILY_OUT_OF_STOCK
  },
  {
    label: '주문폭주',
    value: DeliveryIssueDelayReason.SURGE_IN_ORDERS
  },
  {
    label: '연휴',
    value: DeliveryIssueDelayReason.HOLIDAY
  },
  {
    label: '회사행사',
    value: DeliveryIssueDelayReason.COMPANY_GATHERING
  }
]

export const deliveryOrderProcessStatusCommonCodeName: WelfareSelectOptionType[] = [
  {
    label: '결제 대기',
    value: DeliveryOrderProcessStatusModel.PAYMENT_WAIT
  },
  {
    label: '결제 실패',
    value: DeliveryOrderProcessStatusModel.PAYMENT_FAILED
  },
  {
    label: '결제 완료',
    value: DeliveryOrderProcessStatusModel.PAYMENT_COMPLETE
  },
  {
    label: '발급 실패',
    value: DeliveryOrderProcessStatusModel.ISSUE_FAIL
  },
  {
    label: '발급 지연',
    value: DeliveryOrderProcessStatusModel.ISSUE_DELAY
  },
  {
    label: '발급 지연',
    value: DeliveryOrderProcessStatusModel.ISSUE_COMPLETE
  },
  {
    label: '상품 준비 지시 지연',
    value: DeliveryOrderProcessStatusModel.PRODUCT_PREPARATION_DELAY
  },
  {
    label: '상품 준비 중',
    value: DeliveryOrderProcessStatusModel.PRODUCT_PREPARATION
  },
  {
    label: '배송 지연',
    value: DeliveryOrderProcessStatusModel.DELIVERY_DELAY
  },
  {
    label: '배송 중',
    value: DeliveryOrderProcessStatusModel.DELIVERY
  },
  {
    label: '배송 완료',
    value: DeliveryOrderProcessStatusModel.DELIVERY_COMPLETE
  },
  {
    label: '구매 확정',
    value: DeliveryOrderProcessStatusModel.PURCHASE_COMPLETE
  },
  {
    label: '주문 취소 신청',
    value: DeliveryOrderProcessStatusModel.ORDER_CANCEL
  },
  {
    label: '판매 취소 신청',
    value: DeliveryOrderProcessStatusModel.SALE_CANCEL
  },
  {
    label: '주문 취소 철회',
    value: DeliveryOrderProcessStatusModel.ORDER_CANCEL_WITHDRAWAL
  },
  {
    label: '티켓 폐기 실패',
    value: DeliveryOrderProcessStatusModel.DISUSE_FAIL
  },
  {
    label: '환불 요청',
    value: DeliveryOrderProcessStatusModel.REFUND_REQUEST
  },
  {
    label: '환불 실패',
    value: DeliveryOrderProcessStatusModel.REFUND_FAIL
  },
  {
    label: '환불 완료',
    value: DeliveryOrderProcessStatusModel.REFUND_COMPLETE
  },
  {
    label: '없음',
    value: DeliveryOrderProcessStatusModel.NO_CLAIM
  }
]

enum ClaimReasonStatusModel {
  ORDER_CANCEL = 'ORDCAN',
  SALE_CANCEL = 'SALCAN',
  RETURN = 'RETN',
  EXCHANGE = 'EXCH'
}

export const deliveryClaimReasonStatusCommonCodeName: WelfareSelectOptionType[] = [
  {
    label: '주문취소',
    value: ClaimReasonStatusModel.ORDER_CANCEL
  },
  {
    label: '판매취소',
    value: ClaimReasonStatusModel.SALE_CANCEL
  },
  {
    label: '반품',
    value: ClaimReasonStatusModel.RETURN
  },
  {
    label: '교환',
    value: ClaimReasonStatusModel.EXCHANGE
  }
]

export enum DeliveryIssuanceRewardPointProcessTypeModel {
  SAVING_CANCEL = 'SAV',
  RESTORE = 'RES',
  DEDUCTION = 'DED'
}

export const deliveryRewardPointProcessTypeCodeName: WelfareSelectOptionType[] = [
  {
    label: '적립취소',
    value: DeliveryIssuanceRewardPointProcessTypeModel.SAVING_CANCEL
  },
  {
    label: '복원',
    value: DeliveryIssuanceRewardPointProcessTypeModel.RESTORE
  },
  {
    label: '차감',
    value: DeliveryIssuanceRewardPointProcessTypeModel.DEDUCTION
  }
]
