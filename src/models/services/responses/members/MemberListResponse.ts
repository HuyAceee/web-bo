import { FORMAT_DATE_YYYY_MM_DD_HH_mm_ss, formatTime } from '@/common'
import { MemberListDataTableModel } from '@/models/views'
import { DataTablePaginationResponseModel } from '../BaseModelResponse'
import { EmployeeStatusEnum } from '@/models/common'

export interface MemberListListResponse extends DataTablePaginationResponseModel<MemberListDataTableModel> {}

const textTranslationMember = (param: string): string => {
  const mappings: Record<string, string> = {
    GENERAL: '일반',
    BLACK: '블랙',
    MAN: '남',
    WOMAN: '여',
    NONE: '구분없음',
    ACTIVE: '계정 사용',
    INACTIVE: '계정 미사용',
    Y: '재직',
    N: '퇴사'
  }
  return mappings[param]
}

export class MemberListListResponseConvertor {
  static fromMemberListResponse(data: any): MemberListListResponse {
    const items: MemberListDataTableModel[] = []
    const maxItemInPage = data.data.length
    for (let i = 0; i < maxItemInPage; i++) {
      const itemData = {
        id: data.data[i].memberId,
        code: data.data[i].memberKey,
        name: data.data[i].memberName,
        email: data.data[i].memberId,
        phone: data.data[i].cellphoneNumber,
        gender: data.data[i].genderCode,
        employeeNumber: data.data[i].company.employeeNumber,
        rank: data.data[i].company.rankName,
        employmentStatus: textTranslationMember(data.data[i].authenticationYn),
        authenticationYn: data.data[i].authenticationYn,
        accountStatus: data.data[i].accountStatusCode,
        membershipLevel: data.data[i].gradeCode,
        customerCompanyCode: data.data[i].company.customerKey,
        holdingOfficeYn: data.data[i].company?.holdingOfficeYn?.title,
        customer: data.data[i].company.customerName,
        customerAddress: data.data[i].company.companyLoadNameAddress,
        certification: data.data[i].authenticationYn,
        marketingConsent: data.data[i].agreement.marketingAgreeYn === EmployeeStatusEnum.Y ? '동의' : '비동의',
        lastAccessDate:
          formatTime(data.data[i].latestLoginDate, FORMAT_DATE_YYYY_MM_DD_HH_mm_ss) === 'Invalid Date'
            ? '-'
            : formatTime(data.data[i].latestLoginDate, FORMAT_DATE_YYYY_MM_DD_HH_mm_ss),
        registrationDateTime: formatTime(data.data[i].auditing.registeredDate, FORMAT_DATE_YYYY_MM_DD_HH_mm_ss)
      }
      items.push({
        ...itemData
      })
    }
    return {
      totalItems: data.page.totalCount,
      data: items
    }
  }
}
