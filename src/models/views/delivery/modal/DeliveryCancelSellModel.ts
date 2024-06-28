import { DataTableContainerConfigModel, WelfareSelectOptionType } from '@/models'
import { DeliveryHintModel } from '@/models/views/delivery/modal/DeliveryHintModel'

export const deliveryCancelSellInfoHint: DeliveryHintModel[] = [
  { content: '판매 취소할 주문을 선택하고 취소 사유를 입력해 주세요.' },
  { content: '판매 취소 사유가 품절일 경우 해당 상품의 재고 상태가 일시품절로 자동 변경됩니다.', isEmphasize: true },
  {
    content: '판매 취소가 반복될 경우 패널티 대상이 될 수 있습니다.',
    isEmphasize: true
  }
]
export const deliveryCancelSellHint: DeliveryHintModel[] = [{ content: '취소신청이 가능한 상태인지 재확인해 주세요.', isEmphasize: false }]

export interface DeliveryCancelSellModalProps {
  orderKey: number
  receiverProductOrderKeys: string
  onCancel?: () => void
}

interface DataTableContainerConfigContainModel extends DataTableContainerConfigModel {
  isClick?: boolean
}

export const deliveryCancelSellTableHeaderConfig: DataTableContainerConfigContainModel[] = [
  { header: '주문코드', field: 'orderKey', class: 'wf_m-w-150 ', isClick: true },
  { header: '거래번호', field: 'transactionNumber', class: 'wf_m-w-150 ', isClick: true },
  { header: '상품주문코드', field: 'productOrderKey', class: 'wf_m-w-100 ', isClick: true },
  { header: '주문순번', field: 'orderSequence', class: 'wf_m-w-100 ', isClick: true },
  { header: '사번', field: 'productName', class: 'wf_m-w-120 ', isClick: true },
  { header: '옵션명', field: 'optionLargeName', class: 'wf_m-w-120 ' },
  { header: '판매가', field: 'salePrice', class: 'wf_m-w-200 ' },
  { header: '상품금액', field: 'productAmount', class: 'wf_m-w-120 ' },
  { header: '즉시할인금액', field: 'immediatelyDiscountAmount', class: 'wf_m-w-120' },
  { header: '상품쿠폰할인금액', field: 'productCouponDiscountAmount', class: 'wf_m-w-120' },
  { header: '최종결제금액', field: 'lastPaymentAmount', class: 'wf_m-w-120 ' },
  { header: '주문상태', field: 'orderStatus', class: 'wf_m-w-120 ', isClick: true },
  { header: '클레임상태', field: 'claimStatus', class: 'wf_m-w-120 ', isClick: true }
]

export interface DeliveryCancelSellModel {
  receiverProductOrderKey: number
  transactionNumber: string
  orderKey: number
  orderSequence: number
  productOrderKey: number
  productKey: number
  productName: string
  optionLargeName: string
  optionMediumName: string
  optionSmallName: string
  salePrice: number
  productAmount: number
  immediatelyDiscountAmount: number
  productCouponDiscountAmount: number
  lastPaymentAmount: number
  orderStatus: string
  claimStatus?: string | null
}

export interface DeliveryCancelSellInfoModel {
  issueDelayReason: string
  reasonContents: string
}

interface DeliveryFailureResponses {
  receiverProductOrderKey: number
  errorContent: string
  errorLabel: string
}

export interface DeliveryCancelSellContainModel extends DeliveryCancelSellModel {
  id: number
  isSelected: boolean
  isDisabled: boolean
}

export enum DeliveryOrderProcessStatusModel {
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
  ORDER_CANCEL = 'ORDCAN',
  SALE_CANCEL = 'SALCAN',
  ORDER_CANCEL_WITHDRAWAL = 'ORDCWD',
  DISUSE_FAIL = 'DISUFL',
  REFUND_REQUEST = 'REFDRQ',
  REFUND_FAIL = 'REFDFL',
  REFUND_COMPLETE = 'REFDCP',
  NO_CLAIM = 'NOCLAM'
}

export const deliveryFailureList: DeliveryFailureResponses[] = [
  {
    receiverProductOrderKey: 2,
    errorContent:
      '230707123, 230707124, 230707126,230707124, 230707126, 230707127,230707123, 230707124, 230707126, 230707123, 230707123, 230707124, 230707126, 230707127,230707123, 230707124, 230707126, 30707127230707123',
    errorLabel: '양식 오류'
  }
]

enum DeliveryClaimDetailReason {
  SOLD_OUT_PRODUCT = 'SOLDT',
  INCORRECT_PRODUCT_INFO = 'INCPI',
  ISSUE_DELAY_EXPECTED = 'ISDDE',
  ETC = 'ETC'
}

export const deliveryCancelSellClaimReasonSelectOption: WelfareSelectOptionType[] = [
  {
    label: '상품품절',
    value: DeliveryClaimDetailReason.SOLD_OUT_PRODUCT
  },
  {
    label: '발급지연예상',
    value: DeliveryClaimDetailReason.ISSUE_DELAY_EXPECTED
  },
  {
    label: '상품정보오류',
    value: DeliveryClaimDetailReason.INCORRECT_PRODUCT_INFO
  },
  {
    label: '기타',
    value: DeliveryClaimDetailReason.ETC
  }
]
