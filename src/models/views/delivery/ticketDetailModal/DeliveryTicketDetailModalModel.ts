interface DeliveryTicketProductModel {
  receiverProductOrderKey: number
  transactionNumber: string
  senderName: string
  receiverName: string
  receiverPhone: string
  ticketCouponNumber: string
  productAmount: number
  discountAmount: number
  lastPaymentAmount: number
  ticketCouponStatus: string
  useYn: string
  issueDate: string
  expireDate: string
  confirmedDate: string
  balance: number
  welfarePointPaymentAmount: number
  pgPaymentAmount: number
  orderStatus: string
  claimStatus: string
  no?: number
}

interface DeliveryOrderHistoryModel {
  orderStatus: string
  processDatetime: string
  processor: string
}

export interface DeliveryOrderDataModel {
  orderKey: number
  paymentDatetime: string
  memberKey: number
  memberName: string
  memberId: string
  memberPhone: string
  customerKey: number
  customerName: string
  employeeNumber: number
  ordererName: string
  totalProductAmount: number
  discountAmount: number
  lastPaymentAmount: number
  orderChannel: string
  welfarePointPaymentAmount: number
  creditCartPaymentAmount: number
  transferPaymentAmount: number
  megazonePaymentAmount: number
  naverPaymentAmount: number
  kakaoPaymentAmount: number
  tossPaymentAmount: number
  sellerKey: number
  sellerName: string
  productOrderKey: number
  ticketType: string
  productKey: number
  productName: string
  optionKey: number
  optionLargeName: string
  optionMediumName: string
  optionSmallName: string
  orderProductCount: number
  salePrice: number
  senderMessage: string
  installment: number
  orderedTicketProducts: DeliveryTicketProductModel[]
  orderHistories: DeliveryOrderHistoryModel[]
  claimStatus?: string
}

export const orderTicketDetailTableHeaderConfig = [
  { header: '거래번호', field: 'transactionNumber', class: 'wf_m-w-100 ' },
  { header: '주문순번', field: 'stt', class: 'wf_m-w-120 ' },
  { header: '보내는 사람 ', field: 'senderName', class: 'wf_m-w-120 ' },
  { header: '받는 사람', field: 'receiverName', class: 'wf_m-w-120 ' },
  { header: '휴대폰번호', field: 'receiverPhone', class: 'wf_m-w-120 ' },
  { header: '상품금액', field: 'productAmount', class: 'wf_m-w-120 ' },
  { header: '즉시할인금액', field: 'immediatelyDiscountAmount', class: 'wf_m-w-120 ' },
  { header: '상품쿠폰할인금액', field: 'couponDiscountAmount', class: 'wf_m-w-120 ' },
  { header: '최종결제금액', field: 'lastPaymentAmount', class: 'wf_m-w-120 ' },
  { header: '복지포인트', field: 'welfarePointPaymentAmount', class: 'wf_m-w-120 ' },
  { header: 'PG결제금액', field: 'pgPaymentAmount', class: 'wf_m-w-120 ' },
  { header: 'PG결제수단', field: 'pgPaymentAmount', class: 'wf_m-w-120 ' },
  { header: '티켓번호', field: 'ticketCouponNumber', class: 'wf_m-w-120 ' },
  { header: '티켓상태', field: 'ticketCouponStatus', class: 'wf_m-w-120 ' },
  { header: '사용여부', field: 'useYn', class: 'wf_m-w-120 ' },
  { header: '티켓발급일', field: 'issueDate', class: 'wf_m-w-200 ' },
  { header: '티켓만료일', field: 'expireDate', class: 'wf_m-w-200 ' },
  { header: '구매확정일', field: 'confirmedDate', class: 'wf_m-w-120 ' },
  { header: '잔액', field: 'balance', class: 'wf_m-w-120 ' },
  { header: '주문상태', field: 'orderStatus', class: 'wf_m-w-120 ' },
  { header: '클레임상태', field: 'claimStatus', class: 'wf_m-w-120 ' }
]
