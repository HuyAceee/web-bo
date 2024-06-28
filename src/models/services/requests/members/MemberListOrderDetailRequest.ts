import { MemberSearchMemberListOrderDetailFormModel } from '@/models/views'
import { PaginationModelRequest } from '@/models/services/requests/PaginationModelRequest'
import { FORMAT_DATE_YYYY_MM_DD_T_hh_mm, formatTime, removeEmptyObjectProperties } from '@/common'

export interface MemberListOrderDetailRequest {
  productClassification?: string
  paymentMethod?: string
  fromDate: string
  toDate: string
}

export class MemberOrderDetailRequestConvertor {
  static from(
    model: MemberSearchMemberListOrderDetailFormModel,
    page: number,
    size: number
  ): Partial<MemberListOrderDetailRequest & PaginationModelRequest> {
    const productClassification = model?.productClassification?.value
    const paymentMethod = model?.paymentMethod?.value
    const fromDate = model.fromDate ? formatTime(model.fromDate, FORMAT_DATE_YYYY_MM_DD_T_hh_mm) : ''
    const toDate = model.toDate ? formatTime(model.toDate, FORMAT_DATE_YYYY_MM_DD_T_hh_mm) : ''
    const params = removeEmptyObjectProperties({
      ...model,
      productClassification,
      paymentMethod,
      fromDate,
      toDate,
      pageNum: page + 1,
      rowSize: size
    })

    return params
  }
}
