import { WelfareSelectOptionType } from '@/models'
import {
  ComplaintOrderCancelKeywordSearchType,
  ComplaintOrderCancelPeriodSearchType,
  ComplaintOrderCancelProcessStatus
} from '@/models/services/requests/complaint/complaintOrderCancel/ComplaintOrderCancelListRequest'
import { DeliverySearchProductSelectedValueModel } from '@/models/views/delivery/modal/DeliverySearchProductModel'

export enum COMPLAINT_ORDER_CANCEL_STATUS {
  ORDER_CANCEL = 'ORDCAN',
  DISUSE_FAIL = 'DISUFL'
}

export interface ComplaintOrderCancelListFormModel {
  id: string
  no: number
  claimKey: string
  claimType: string
  orderKey: string
  transactionNumber: string
  claimStatus: string
  orderStatus: string
  productKey: string
  productName: string
  optionLargeName: string
  optionMediumName: string
  optionSmallName: string
  ticketCouponNumber: string
  receiverName: string
  receiverPhone: string
  sellerKey: string
  sellerName: string
  subcontract: string
  ordererName: string
  paymentDatetime: string
  lastPaymentAmount: string
  cancelFee: string
  lastRefundAmount: string
  memberKey: string
  memberName: string
  memberId: string
  companyKey: string
  companyName: string
  claimApplyDatetime: string
  claimApproveDatetime: string
  claimWithdrawalDatetime: string
  claimDetailReason: string
  detailReason?: string
  claimApplierName: string
  claimApplierKey?: string
  claimHandlerName: string
  claimHandlerKey: string
  receiverProductOrderKey: string
  claimProductKey: string
}

export interface ComplaintOrderCancelFormModel {
  claimKey: string
  claimStatus: WelfareSelectOptionType
  orderMemberKey: string
  customerKey: string
  orderKey: string
  orderer: string
  receiver: string
  receiverPhone: string
  sellerKey: string
  subcontractKey: WelfareSelectOptionType
  mdKey: WelfareSelectOptionType
  periodSearchType: WelfareSelectOptionType
  fromDate: string
  toDate: string
  productKey: DeliverySearchProductSelectedValueModel
  keyword: string
  keywordSearchType: WelfareSelectOptionType
  [key: string]: any
}

export const complaintOrderCancelSelectOptionDefault = {
  value: '',
  label: ''
}

export const complaintOrderCancelSelectProductDefault = {
  productCode: '',
  productName: '',
  productKey: ''
}

export const complaintOrderCancelListModelConfig = {
  inputRow1: {
    label: '클레임 코드',
    placeholder: '포인트 명 입력',
    field: 'claimKey'
  },
  selectRow1: {
    label: '클레임 상태',
    field: 'claimStatus',
    options: [
      { label: '전체', value: ComplaintOrderCancelProcessStatus?.ALL },
      { label: '주문취소 신청', value: ComplaintOrderCancelProcessStatus?.ORDER_CANCEL },
      { label: '티켓폐기 실패', value: ComplaintOrderCancelProcessStatus?.DISUSE_FAIL },
      { label: '환불요청 완료', value: ComplaintOrderCancelProcessStatus?.REFUND_COMPLETE },
      { label: '환불완료', value: ComplaintOrderCancelProcessStatus?.REFUND_REQUEST },
      { label: '환불실패', value: ComplaintOrderCancelProcessStatus?.REFUND_FAIL },
      { label: '주문취소 철회', value: ComplaintOrderCancelProcessStatus?.ORDER_CANCEL_WITHDRAWAL }
    ]
  },
  listInputRow2: [
    {
      label: '회원',
      placeholder: '포인트 명 입력',
      field: 'orderMemberKey'
    },
    {
      label: '고객사',
      placeholder: '포인트 코드 입력',
      field: 'customerKey'
    }
  ],
  listInputRow3: [
    {
      label: '주문 코드',
      placeholder: '',
      field: 'orderKey'
    },
    {
      label: '주문자명',
      placeholder: '',
      field: 'orderer'
    },
    {
      label: '수령자명',
      placeholder: '',
      field: 'receiver'
    },
    {
      label: '수령자 휴대폰 번호',
      placeholder: '',
      field: 'receiverPhone'
    }
  ],
  inputRow4: {
    label: '판매사',
    placeholder: '포인트 명 입력',
    field: 'sellerKey'
  },
  listInputRow4: [
    {
      label: 'MD',
      placeholder: '',
      field: 'mdKey'
    },
    {
      label: '상품',
      placeholder: '',
      field: 'productKey'
    }
  ],
  selectRow4: {
    label: '하위업체',
    field: 'subcontractKey',
    options: [{ label: '하위업체 전체', value: '' }]
  },
  listSelectDate: {
    label: '기간',
    field: 'periodSearchType',
    options: [
      { label: '클레임신청일', value: ComplaintOrderCancelPeriodSearchType.CLAIM_APPLY_DATE },
      { label: '결제일 ', value: ComplaintOrderCancelPeriodSearchType.PAYMENT_DATE }
    ]
  },
  listSelectSearchType: {
    label: '검색어',
    field: 'keywordSearchType',
    options: [
      { label: '사용안함', value: ComplaintOrderCancelKeywordSearchType.NONE },
      { label: '클레임코드 ', value: ComplaintOrderCancelKeywordSearchType.CLAIM_KEY },
      { label: '주문코드', value: ComplaintOrderCancelKeywordSearchType.ORDER_KEY },
      { label: '회원코드', value: ComplaintOrderCancelKeywordSearchType.MEMBER_KEY },
      { label: '회원아이디', value: ComplaintOrderCancelKeywordSearchType.MEMBER_ID },
      { label: '고객사코드', value: ComplaintOrderCancelKeywordSearchType.CUSTOMER_COMPANY_KEY },
      { label: '상품코드', value: ComplaintOrderCancelKeywordSearchType.PRODUCT_KEY },
      { label: '상품명', value: ComplaintOrderCancelKeywordSearchType.PRODUCT_NAME },
      { label: '판매사코드', value: ComplaintOrderCancelKeywordSearchType.SELLER_KEY },
      { label: '거래번호', value: ComplaintOrderCancelKeywordSearchType.TRANSACTION_NUMBER },
      { label: '티켓번호', value: ComplaintOrderCancelKeywordSearchType.TICKET_NUMBER }
    ]
  },
  querySearch: {
    label: '클레임상태',
    placeholder: '최대 50개까지 입력 가능합니다. (,로 구분)',
    field: 'keyword'
  },
  listButtonDateFilter: [
    {
      label: '오늘',
      class: 'wf_w-176',
      value: 0
    },
    {
      label: '7일',
      class: 'wf_w-176',
      value: 6
    },
    {
      label: '1개월',
      class: 'wf_w-176',
      value: 29
    },
    {
      label: '3개월',
      class: 'wf_w-176',
      value: 89
    },
    {
      label: '1년',
      class: 'wf_w-176',
      value: 364
    }
  ]
}

export const ComplaintOrderCancelTableConfig = [
  {
    header: 'No.',
    field: 'no',
    class: 'wf_m-w-50'
  },
  {
    header: '클레임코드',
    field: 'claimKey',
    class: 'wf_m-w-100'
  },
  {
    header: '클레임유형',
    field: 'claimType',
    class: 'wf_m-w-120'
  },
  {
    header: '주문코드',
    field: 'orderKey',
    class: 'wf_m-w-120'
  },
  {
    header: '거래번호',
    field: 'transactionNumber',
    class: 'wf_m-w-120'
  },
  {
    header: '클레임상태',
    field: 'claimStatus',
    class: 'wf_m-w-120 '
  },
  {
    header: '주문상태',
    field: 'orderStatus',
    class: 'wf_m-w-120'
  },
  {
    header: '상품코드',
    field: 'productKey',
    class: 'wf_m-w-120 '
  },
  {
    header: '클레임 상품명',
    field: 'productName',
    class: 'wf_m-w-200'
  },
  {
    header: '옵션명',
    field: 'optionLargeName',
    class: 'wf_m-w-100'
  },
  {
    header: '티켓번호',
    field: 'ticketCouponNumber',
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
    class: 'wf_m-w-120'
  },
  {
    header: '판매사코드',
    field: 'sellerKey',
    class: 'wf_m-w-120'
  },
  {
    header: '판매사',
    field: 'sellerName',
    class: 'wf_m-w-120'
  },
  {
    header: '하위업체',
    field: 'subcontract',
    class: 'wf_m-w-170'
  },
  {
    header: '주문자',
    field: 'ordererName',
    class: 'wf_m-w-120'
  },
  {
    header: '결제일시',
    field: 'paymentDatetime',
    class: 'wf_m-w-200'
  },
  {
    header: '최종 결제금액',
    field: 'lastPaymentAmount',
    class: 'wf_m-w-120'
  },
  {
    header: '취소수수료',
    field: 'cancelFee',
    class: 'wf_m-w-120'
  },
  {
    header: '최종환불금액',
    field: 'lastRefundAmount',
    class: 'wf_m-w-120'
  },
  {
    header: '회원코드',
    field: 'memberKey',
    class: 'wf_m-w-120'
  },
  {
    header: '회원명',
    field: 'memberName',
    class: 'wf_m-w-120'
  },
  {
    header: '회원아이디',
    field: 'memberId',
    class: 'wf_m-w-200'
  },
  {
    header: '고객사코드',
    field: 'companyKey',
    class: 'wf_m-w-120'
  },
  {
    header: '고객사명',
    field: 'companyName',
    class: 'wf_m-w-120'
  },
  {
    header: '클레임 신청일시',
    field: 'claimApplyDatetime',
    class: 'wf_m-w-200'
  },
  {
    header: '클레임 승인일시',
    field: 'claimApproveDatetime',
    class: 'wf_m-w-120'
  },
  {
    header: '클레임 철회일시',
    field: 'claimWithdrawalDatetime',
    class: 'wf_m-w-120'
  },
  {
    header: '클레임사유',
    field: 'detailReason',
    class: 'wf_m-w-120'
  },
  {
    header: '클레임 신청자',
    field: 'claimApplierName',
    class: 'wf_m-w-180'
  },
  {
    header: '클레임 처리자',
    field: 'claimHandlerName',
    class: 'wf_m-w-180'
  }
]
