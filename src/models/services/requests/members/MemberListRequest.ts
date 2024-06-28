import { PaginationModelRequest } from '@/models/services/requests/PaginationModelRequest'
import { MemberListFormModel } from '@/models/views'
import { DEFAULT_DATE_FORMAT, formatTime } from '@/common'

export interface MemberListRequest extends PaginationModelRequest {
  accountStatusCode?: string
  gradeCode?: string
  customerKey?: string
  memberKey?: string
  memberName?: string
  memberId?: string
  cellphoneNumber?: string
  employeeNumber?: string
  durationItem?: string
  holdingOfficeYn?: string
  startDate?: string
  endDate?: string
}
export enum MemberAccountStatus {
  ACTIVE = 'ACTIVE',
  NOT_ACTIVE = 'INACTIVE'
}
export enum MembershipLevel {
  BLACK = 'BLACK',
  GENERAL = 'GENERAL'
}
export enum MemberGenderCode {
  MAN = 'MAN',
  NONE = 'NONE',
  WOMAN = 'WOMAN'
}
export enum MemberHoldingOfficeYn {
  YES = 'Y',
  NO = 'N',
  VALUE_YES = '0',
  VALUE_NO = '1'
}

export enum MemberEmploymentStatus {
  UNDEFINED = '1',
  YES = '2'
}

export class MemberListRequestConvertor {
  static from(model: MemberListFormModel, page: number, numberOfItems: number): MemberListRequest {
    let accountStatusCode: MemberAccountStatus | undefined
    let gradeCode: MembershipLevel | undefined
    let holdingOfficeYn: MemberHoldingOfficeYn | undefined
    switch (model.accountStatus.value) {
      case '1':
        accountStatusCode = undefined
        break
      case '2':
        accountStatusCode = MemberAccountStatus.ACTIVE
        break
      default:
        accountStatusCode = MemberAccountStatus.NOT_ACTIVE
        break
    }
    switch (model.membershipLevel) {
      case '1':
        gradeCode = undefined
        break
      case '3':
        gradeCode = MembershipLevel.BLACK
        break
      default:
        gradeCode = MembershipLevel.GENERAL
        break
    }
    switch (model.employmentStatus.value) {
      case MemberEmploymentStatus.UNDEFINED:
        holdingOfficeYn = undefined
        break
      case MemberEmploymentStatus.YES:
        holdingOfficeYn = MemberHoldingOfficeYn.YES
        break
      default:
        holdingOfficeYn = MemberHoldingOfficeYn.NO
        break
    }
    return {
      rowSize: numberOfItems,
      pageNum: page + 1,
      accountStatusCode: accountStatusCode,
      gradeCode: gradeCode,
      customerKey: model.codeCustomer === '' ? undefined : model.codeCustomer,
      memberKey: model.codeMember === '' ? undefined : model.codeMember,
      memberName: model.nameMember === '' ? undefined : model.nameMember,
      memberId: model.email === '' ? undefined : model.email,
      cellphoneNumber: model.phone === '' ? undefined : model.phone,
      employeeNumber: model.employeePhone === '' ? undefined : model.employeePhone,
      startDate: formatTime(model.fromDate, DEFAULT_DATE_FORMAT),
      endDate: formatTime(model.toDate, DEFAULT_DATE_FORMAT),
      durationItem: model.dateSelect?.value ?? '',
      holdingOfficeYn: holdingOfficeYn
    }
  }
}
