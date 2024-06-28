export interface ClaimTicketDetailModel {
  receiverProductOrderKey: number
  claimProductKey: number
  claimStatus: string
  transactionNumber: string
  orderStatus: string
  ticketCouponNumber: string
  receiverName: string
  receiverPhone: string
  lastPaymentAmount: number
  cancelProductAmount: number
  cancelFeeAmount: number
  refundAmount: number
  refundWelfarePoint: number
  refundPgAmount: number
  refundApproveDatetime: string
  withdrawalReasonContents: string
  withdrawer: string
  attachedFiles: string
  detailReason: string
  etcMemoContents: string
  claimTicketHistories: ClaimTicketHistoryModel[]
}

export interface ClaimTicketDetailTableModel extends Omit<ClaimTicketDetailModel, 'claimTicketHistories'> {
  id: number
  claimTicketHistories: string
}

interface ClaimTicketHistoryModel {
  processHistoryKey: number
  claimProductKey: number
  claimProcess: string
  handleDatetime: string
  handlerName: string
}

interface ClaimTicketProductCouponModel {
  couponKey: number
  couponName: string
  validStartDate: string
  validEndDate: string
  processDatetime: string
}

interface ClaimTicketProductRewardPointModel {
  rewardPointProcessType: string
  rewardPoint: number
  rewardPointProcessDatetime: string
}

export interface ComplaintOrderCancelDetailFormModel {
  claimKey: number
  applyDatetime: string
  applierName: string
  applierCode: number
  orderKey: number
  memberName: string
  memberKey: number
  memberId: string
  companyName: string
  memberPhoneNumber: string
  claimDetailReason: string
  memo: string
  etcMemoContents: string
  sellerName: string
  sellerKey: number
  subcontract: string
  orderProductKey: number
  productKey: number
  productName: string
  optionLargeName: string
  optionMediumName: string
  optionSmallName: string
  claimTicketDetails: ClaimTicketDetailModel[]
  ticketProductRewardPoints: ClaimTicketProductRewardPointModel[]
  ticketProductCoupons: ClaimTicketProductCouponModel[]
}

export interface ComplaintOrderCancelTableInfoModel {
  orderKey: number
  productKey: number
  productName: string
  optionLargeName: string
}

export const ComplaintOrderCancelTableInfoConfig = [
  {
    header: '상품주문코드',
    field: 'orderKey',
    class: 'wf_m-w-250'
  },
  {
    header: '상품코드',
    field: 'productKey',
    class: 'wf_m-w-300'
  },
  {
    header: '상품명',
    field: 'productName',
    class: 'wf_m-w-300'
  },
  {
    header: '옵션명',
    field: 'optionLargeName',
    class: 'wf_m-w-300'
  }
]

export const ComplaintOrderCancelTableDetailInfoConfig = [
  {
    header: 'No.',
    field: 'no',
    class: 'wf_m-w-50'
  },
  {
    header: '처리유형',
    field: 'rewardPointProcessType',
    class: 'wf_m-w-250'
  },
  {
    header: '적립금',
    field: 'rewardPoint',
    class: 'wf_m-w-300'
  },
  {
    header: '처리일시',
    field: 'rewardPointProcessDatetime',
    class: 'wf_m-w-300'
  }
]

export const ComplaintOrderCancelTableTicketConfig = [
  {
    header: '순번',
    field: 'receiverProductOrderKey',
    class: 'wf_m-w-50'
  },
  {
    header: '클레임상태',
    field: 'claimStatus',
    class: 'wf_m-w-120'
  },
  {
    header: '거래번호',
    field: 'transactionNumber',
    class: 'wf_m-w-120'
  },
  {
    header: '주문상태',
    field: 'orderStatus',
    class: 'wf_m-w-100'
  },
  {
    header: '티켓번호',
    field: 'ticketCouponNumber',
    class: 'wf_m-w-120'
  },
  {
    header: '티켓상태',
    field: 'ticketStatus',
    class: 'wf_m-w-120'
  },
  {
    header: '수령자명',
    field: 'receiverName',
    class: 'wf_m-w-120'
  },
  {
    header: '수령자 휴대폰번호',
    field: 'receiverPhone',
    class: 'wf_m-w-200'
  },
  {
    header: '상품 최종주문금액',
    field: 'lastPaymentAmount',
    class: 'wf_m-w-200'
  },
  {
    header: '취소상품가',
    field: 'cancelProductAmount',
    class: 'wf_m-w-120'
  },
  {
    header: '취소수수료',
    field: 'cancelFeeAmount',
    class: 'wf_m-w-120'
  },
  {
    header: '환불예정금액',
    field: 'refundAmount',
    class: 'wf_m-w-120'
  },
  {
    header: '복원복지포인트',
    field: 'refundWelfarePoint',
    class: 'wf_m-w-200'
  },
  {
    header: 'PG결제환불금액',
    field: 'refundPgAmount',
    class: 'wf_m-w-200'
  },
  {
    header: '환불처리일시',
    field: 'refundApproveDatetime',
    class: 'wf_m-w-200'
  }
]

export const ComplaintOrderCancelTableRestorationConfig = [
  {
    header: '처리유형',
    field: 'couponKey',
    class: 'wf_m-w-290'
  },
  {
    header: '적립/사용 내역',
    field: 'couponName',
    class: 'wf_m-w-290'
  },
  {
    header: '소멸 예정일',
    field: 'validDate',
    class: 'wf_m-w-290'
  },
  {
    header: '처리일시',
    field: 'processDatetime',
    class: 'wf_m-w-290'
  }
]

export const CompaintRefundTextContent = [
  { title: '복지포인트', content: ' 상품 정상 취소 즉시 복원처리됩니다.' },
  { title: '신용카드', content: '주문 시 사용한 신용카드 결제가 취소됩니다. 신용카드 결제 취소일은 각 신용카드사 사정에 따라 다릅니다.' },
  {
    title: '휴대폰결제',
    content:
      '당월 결제건인 경우, 즉시 결제 취소 및 휴대폰요금에 미포함됩니다. 익월 결제건인 경우, 입력한 환불계좌로 입금되며 휴대폰 요금에 포함됩니다.'
  },
  {
    title: '카카오페이',
    content:
      '연결계좌 결제 시, 카카오페이 계좌로 환불처리 됩니다. 카드결제 시, 연결 신용카드결제가 취소됩니다. 신용카드 결제 취소일은 각 신용카드사 사정에 따라 다릅니다.'
  },
  {
    title: '네이버페이/L.Pay/삼성페이/애플페이',
    content: '주문 시 사용한 간편결제 연결 신용카드결제가 취소됩니다. 신용카드 결제 취소일은 각 신용카드사 사정에 따라 다릅니다.\n'
  }
]
