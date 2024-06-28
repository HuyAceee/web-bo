import { ID_CHECKBOX_ALL } from '@/common'
import { DataTableContainerConfigModel, WelfareSelectOptionType } from '@/models'
import { ComplaintOrderCancelPeriodSearchType } from '@/models/services/requests/complaint/complaintOrderCancel/ComplaintOrderCancelListRequest'

export interface ComplaintCheckBoxConfigType {
  field: string
  list: ComplaintCheckBoxItemType[]
}

export interface ComplaintCheckBoxItemType {
  id: string
  label: string
  class?: string
}

export enum ComplaintClaimTypeModel {
  ALL = ID_CHECKBOX_ALL,
  SALE_CANCEL = 'SALCAN',
  ORDER_CANCEL = 'ORDCAN'
}

export enum ComplaintKeywordSearchModel {
  NONE = '0',
  ORDER_KEY = '1',
  ORDER_PRODUCT_KEY = '2',
  PRODUCT_KEY = '3',
  PRODUCT_NAME = '4',
  MEMBER_KEY = '8',
  MEMBER_ID = '9',
  CLAIM_KEY = '12',
  CUSTOMER_COMPANY_KEY = '16',
  SELLER_KEY = '17'
}

export const complaintCheckBoxClaimConfig: ComplaintCheckBoxConfigType = {
  field: 'claimTypeCheckBox',
  list: [
    {
      id: ComplaintClaimTypeModel.ALL,
      label: '전체',
      class: 'wf_w-52'
    },
    {
      id: ComplaintClaimTypeModel.ORDER_CANCEL,
      label: '주문취소',
      class: 'wf_w-52'
    },
    {
      id: ComplaintClaimTypeModel.SALE_CANCEL,
      label: '판매취소',
      class: 'wf_w-63'
    }
  ]
}

export interface ComplaintTicketProductListDataTableModel {
  id: string
  claimKey: string
  claimType: string
  orderKey: string
  productName: string
  quantity: number
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
  claimDetailReason: string
  claimApplierName: string
  claimApplierKey: string
}

export const complaintHeaderFieldTableTicketProductListConfig: DataTableContainerConfigModel[] = [
  { header: 'No.', field: 'index', class: 'wf_m-w-50' },
  { header: '클레임코드', field: 'claimKey', class: 'wf_m-w-250' },
  { header: '클레임 유형', field: 'claimType', class: 'wf_m-w-250' },
  { header: '주문코드', field: 'orderKey', class: 'wf_m-w-200' },
  { header: '클레임 상품명', field: 'productName', class: 'wf_m-w-300' },
  { header: '수량', field: 'quantity', class: 'wf_m-w-150' },
  { header: '판매사코드', field: 'sellerKey', class: 'wf_m-w-150' },
  { header: '판매사명', field: 'sellerName', class: 'wf_m-w-150' },
  { header: '하위업체명', field: 'subcontract', class: 'wf_m-w-150' },
  { header: '주문자', field: 'ordererName', class: 'wf_m-w-150' },
  { header: '결제일시', field: 'paymentDatetime', class: 'wf_m-w-150' },
  { header: '최종결제금액', field: 'lastPaymentAmount', class: 'wf_m-w-100' },
  { header: '취소수수료', field: 'cancelFee', class: 'wf_m-w-200' },
  { header: '최종환불금액', field: 'lastRefundAmount', class: 'wf_m-w-150' },
  { header: '회원코드', field: 'memberKey', class: 'wf_m-w-150' },
  { header: '회원명', field: 'memberName', class: 'wf_m-w-150' },
  { header: '회원아이디', field: 'memberId', class: 'wf_m-w-200' },
  { header: '고객사코드', field: 'companyKey', class: 'wf_m-w-200' },
  { header: '고객사명', field: 'companyName', class: 'wf_m-w-150' },
  { header: '클레임 신청일시', field: 'claimApplyDatetime', class: 'wf_m-w-200' },
  // { header: '클레임사유', field: 'claimDetailReason', class: 'wf_m-w-200' },
  { header: '클레임 신청자', field: 'claimApplierName', class: 'wf_m-w-150' }
]

export const complaintTicketProductListHeader = [
  'No',
  '클레임코드',
  '클레임유형',
  '주문코드',
  '클레임 상품명',
  '수량',
  '판매사코드',
  '판매사',
  '하위업체',
  '주문자',
  '결제일시',
  '최종결제금액',
  '취소수수료',
  '최종환불금액',
  '회원코드',
  '회원명',
  '회원아이디',
  '고객사코드',
  '고객사명',
  '클레임 신청일시',
  '클레임사유',
  '클레임 신청자'
]

export interface ComplaintTicketProductListFormModel {
  claimType: string
  claimKey: string
  orderMemberKey: string
  customerKey: string
  orderKey: string
  orderer: string
  receiver?: string
  receiverPhone?: string
  sellerKey: string
  subcontractKey: string
  mdKey?: string
  productKey?: string
  periodSearchType: WelfareSelectOptionType
  fromDate: string
  toDate: string
  keywordSearchType: WelfareSelectOptionType
  keyword: string
}

export const complaintSelectDateOptionsConfig = [
  { label: '클레임신청일', value: ComplaintOrderCancelPeriodSearchType.CLAIM_APPLY_DATE },
  { label: '결제일', value: ComplaintOrderCancelPeriodSearchType.PAYMENT_DATE }
]

export const complaintKeywordSearchOptionsConfig = [
  { label: '사용안함', value: ComplaintKeywordSearchModel.NONE },
  { label: '클레임코드', value: ComplaintKeywordSearchModel.CLAIM_KEY },
  { label: '주문코드', value: ComplaintKeywordSearchModel.ORDER_KEY },
  { label: '회원코드', value: ComplaintKeywordSearchModel.MEMBER_KEY },
  { label: '회원아이디', value: ComplaintKeywordSearchModel.MEMBER_ID },
  { label: '고객사코드', value: ComplaintKeywordSearchModel.CUSTOMER_COMPANY_KEY },
  { label: '상품코드', value: ComplaintKeywordSearchModel.PRODUCT_KEY },
  { label: '상품명', value: ComplaintKeywordSearchModel.PRODUCT_NAME },
  { label: '판매사코드 ', value: ComplaintKeywordSearchModel.SELLER_KEY }
]

export const ComplaintTypeEnum = [
  { label: '주문취소', value: 'ORDCAN' },
  { label: '판매취소', value: 'SALCAN' },
  { label: '반품', value: 'RETN' },
  { label: '교환', value: 'EXCH' }
]
