import { DEFAULT_DATE_FORMAT, formatTime } from '@/common'
import { MemberRequestModel } from '@/models/views/members/modal/MemberRequestModel'

export class MemberRequestRequestConvertor {
  static from(member: MemberRequestModel, page: number, size: number): MemberRequestModel {
    return {
      pageNum: page + 1,
      rowSize: size,
      memberKey: member?.memberKey,
      memberName: member?.memberName,
      memberId: member?.memberId,
      customerKey: member?.customerKey?.value,
      employeeNumber: member?.employeeNumber,
      cellphoneNumber: member?.cellphoneNumber,
      gradeCode: member?.gradeCode?.value,
      accountStatusCode: member?.accountStatusCode?.value,
      holdingOfficeYn: member?.holdingOfficeYn?.value,
      marketingAgreeYn: member?.marketingAgreeYn?.value,
      startDate: member?.startDate && formatTime(member?.startDate, DEFAULT_DATE_FORMAT),
      endDate: member?.endDate && formatTime(member?.endDate, DEFAULT_DATE_FORMAT)
    }
  }
}
