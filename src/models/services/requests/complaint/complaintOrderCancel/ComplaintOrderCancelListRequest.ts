import { PaginationModelRequest } from '@/models/services/requests/PaginationModelRequest'
import { ComplaintOrderCancelFormModel } from '@/models/views/complaint/complaintOrderCancel/ComplaintOrderCancelModel'
import { FORMAT_DATE_YYYY_MM_DD_T_hh_mm_ss, formatTime } from '@/common'

export interface ComplaintOrderCancelListRequest {
  claimKey?: string
  claimStatus?: string
  orderMemberKey?: string
  customerKey?: string
  orderKey?: string
  orderer?: string
  receiver?: string
  receiverPhone?: string
  sellerKey?: string
  subcontractKey?: string
  mdKey?: string
  periodSearchType?: string
  fromDate?: string
  toDate?: string
  productKey?: string
  keyword?: string
  keywordSearchType: string
}

export enum ComplaintOrderCancelProcessStatus {
  ALL = '',
  ORDER_CANCEL = 'ORDCAN',
  DISUSE_FAIL = 'DISUFL',
  REFUND_COMPLETE = 'REFDCP',
  REFUND_REQUEST = 'REFDRQ',
  REFUND_FAIL = 'REFDFL',
  ORDER_CANCEL_WITHDRAWAL = 'ORDCWD'
}

export enum ComplaintOrderCancelPeriodSearchType {
  CLAIM_APPLY_DATE = '3',
  PAYMENT_DATE = '0'
}

export enum ComplaintOrderCancelKeywordSearchType {
  NONE = '0',
  CLAIM_KEY = '12',
  ORDER_KEY = '1',
  MEMBER_KEY = '8',
  MEMBER_ID = '9',
  CUSTOMER_COMPANY_KEY = '16',
  PRODUCT_KEY = '3',
  PRODUCT_NAME = '4',
  SELLER_KEY = '17',
  TRANSACTION_NUMBER = '10',
  TICKET_NUMBER = '11'
}

export class ComplaintOrderCancelRequestConvertor {
  static from(model: ComplaintOrderCancelFormModel, page: number, size: number): ComplaintOrderCancelListRequest & PaginationModelRequest {
    const claimStatus = model.claimStatus?.value
    const { keyword, ...newModelValue } = model
    const subcontractKey = model.subcontractKey?.value
    const periodSearchType = model.periodSearchType?.value
    const keywordSearchType = model.keywordSearchType?.value
    const mdKey = model.mdKey?.value
    const productKey = model.productKey?.productKey
    if (keywordSearchType !== ComplaintOrderCancelKeywordSearchType.NONE) {
      return {
        keyword: keyword,
        keywordSearchType,
        pageNum: page + 1,
        rowSize: size
      }
    }
    const fromDate = model.fromDate ? formatTime(model.fromDate, FORMAT_DATE_YYYY_MM_DD_T_hh_mm_ss) : ''
    const toDate = model.toDate ? formatTime(model.toDate, FORMAT_DATE_YYYY_MM_DD_T_hh_mm_ss) : ''

    return {
      ...newModelValue,
      claimStatus,
      subcontractKey,
      periodSearchType,
      keywordSearchType,
      mdKey,
      productKey,
      pageNum: page + 1,
      rowSize: size,
      fromDate,
      toDate
    }
  }
}
