import { DEFAULT_DATE_FORMAT, formatTime } from '@/common'
import { PaginationModelRequest } from '@/models/services/requests/PaginationModelRequest'
import { MemberPointManagementKindType, MemberPointRegistrationFormModel } from '@/models/views/members/memberWelfarePoint/MemberWelfarePointModel'
import { MemberHoldingOfficeStatus, MemberPointUsageListFormConvertModel } from '@/models/views/members/pointUsageList/MemberPointUsageListModel'
import { MemberAccountStatus, MemberHoldingOfficeYn } from './MemberListRequest'

export interface MemberPointUsageListRequest extends PaginationModelRequest {
  customerCode?: string
  employeeName?: string
  pointWelfare?: string
  fromDate?: string
  toDate?: string
  keyword?: string
  memberName?: string
  memberKey?: string
  holdingOfficeYn?: string
  accountStatusCode?: string
  searchType?: string
  customerKey?: string
}

export interface MemberPointAllocationAdjustmentListRequest extends PaginationModelRequest {
  pointName?: string
  pointKey?: string
  processCategory?: string
  detailedCategory?: string
  managementKind?: string
  dateRangeKind?: string
  'dateRange.startDate'?: string
  'dateRange.endDate'?: string
}

export interface MemberRegistrationPointAllocationAdjustmentRequest {
  customerKey: number | string
  pointKey?: string
  managementKind?: MemberPointManagementKindType
  processCategory?: string
  detailedCategory?: string
  targetKind?: string
  pointName: string
  pointAmount: number | string
  useStartDate?: string
  useEndDate?: string
  managerMemo?: string
  processManagerId?: string
  processDate?: string
  allocationDate?: string
  foMembers?: {
    foMemberKey: number | string
    pointAmount: number | string
    managerMemo: string
  }[]
  useValidDate: {
    startDate: string
    endDate?: string
  }
}

export interface MemberPointAllocationAdjustRegistrationDataModelRequest extends MemberPointRegistrationFormModel {
  customerKey?: string
  pointKey?: string
  foMembers?: {
    foMemberKey?: string
    pointAmount?: string
    managerMemo?: string
  }[]
}

export class MemberPointUsageListRequestConvertor {
  static from(model: MemberPointUsageListFormConvertModel, page: number, numberOfItems: number): MemberPointUsageListRequest {
    let holdingOfficeYn: MemberHoldingOfficeYn | undefined
    let accountStatusCode: MemberAccountStatus | undefined
    switch (model.employmentStatus) {
      case MemberHoldingOfficeStatus.IN_OFFICE:
        holdingOfficeYn = MemberHoldingOfficeYn.YES
        break
      case MemberHoldingOfficeStatus.LEAVE_OFFICE:
        holdingOfficeYn = MemberHoldingOfficeYn.NO
        break
      default:
        holdingOfficeYn = undefined
        break
    }

    switch (model.accountStatus) {
      case MemberAccountStatus.NOT_ACTIVE:
        accountStatusCode = MemberAccountStatus.NOT_ACTIVE
        break
      case MemberAccountStatus.ACTIVE:
        accountStatusCode = MemberAccountStatus.ACTIVE
        break
      default:
        accountStatusCode = undefined
        break
    }

    return {
      pageNum: page,
      rowSize: numberOfItems,
      customerKey: model.customerKey === '' ? undefined : model.customerKey,
      memberName: model.memberName === '' ? undefined : model.memberName,
      memberKey: model.memberKey === '' ? undefined : model.memberKey,
      fromDate: formatTime(model.fromDate, DEFAULT_DATE_FORMAT),
      toDate: formatTime(model.toDate, DEFAULT_DATE_FORMAT),
      keyword: model.searchTerm,
      searchType: model.searchType.value,
      holdingOfficeYn: holdingOfficeYn,
      accountStatusCode: accountStatusCode
    }
  }
}