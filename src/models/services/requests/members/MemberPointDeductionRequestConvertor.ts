import { DEFAULT_DATE_FORMAT, formatTime } from '@/common'
import { MemberPointAllocationFormModel } from '@/models/views/members/memberWelfarePoint/MemberWelfarePointAllocationListModel'

export interface MemberPointDeductionRequest {
  memberId: string
  params: MemberPointDeductionParamsRequest
}

export interface MemberPointDeductionParamsRequest {
  pointNameLike?: string
  pointKey?: string
  processCategory?: string
  detailedCategory?: string
  managementKind?: string
  dateRangeKind?: string
  'dateRange.startDate'?: string
  'dateRange.endDate'?: string
  pageNum: number
  rowSize: number
}

export class MemberPointDeductionRequestConvertor {
  static from(model: MemberPointAllocationFormModel, page: number, size: number): MemberPointDeductionRequest {
    const fromDate = model.fromDate ? formatTime(model.fromDate, DEFAULT_DATE_FORMAT) : ''
    const toDate = model.toDate ? formatTime(model.toDate, DEFAULT_DATE_FORMAT) : ''
    const processCategory = model?.pointClassification
    const detailedCategory = model?.pointType?.value
    const managementKind = model?.registrationStatus?.value
    return {
      memberId: model.codeCustomer,
      params: {
        'dateRange.startDate': fromDate,
        'dateRange.endDate': toDate,
        pointKey: model.pointAllocationCode,
        pointNameLike: model.pointAllocationName,
        processCategory,
        detailedCategory,
        managementKind,
        pageNum: page + 1,
        rowSize: size
      }
    }
  }
}
