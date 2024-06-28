import { FORMAT_DATE_YYYY_MM_DD_T_hh_mm, formatTime, removeEmptyObjectProperties } from '@/common'
import { PaginationModelRequest } from '@/models/services/requests/PaginationModelRequest'
import { ComplaintTicketProductListFormModel } from '@/models/views/complaint/complaintTicketProduct/ComplaintTicketProductListModel'

export interface ComplaintTicketProductListRequest {
  claimType?: string
  claimKey?: string
  orderMemberKey?: string
  customerKey?: string
  orderKey?: string
  orderer?: string
  sellerKey?: string
  companyChild?: string
  periodSearchType?: string
  fromDate?: string
  toDate?: string
  keywordSearchType?: string
  keyword?: string
}

export class ComplaintTicketProductRequestConvertor {
  static from(model: ComplaintTicketProductListFormModel, page: number, size: number): Partial<ComplaintTicketProductListRequest & PaginationModelRequest> {
    const keywordSearchType = model.keywordSearchType.value
    const periodSearchType = model.periodSearchType.value
    const fromDate = model.fromDate ? formatTime(model.fromDate, FORMAT_DATE_YYYY_MM_DD_T_hh_mm) : ''
    const toDate = model.toDate ? formatTime(model.toDate, FORMAT_DATE_YYYY_MM_DD_T_hh_mm) : ''
    return removeEmptyObjectProperties({
      ...model,
      keywordSearchType,
      periodSearchType,
      fromDate,
      toDate,
      pageNum: page + 1,
      rowSize: size
    })
  }
}
