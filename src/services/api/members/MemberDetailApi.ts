import { MemberDetailResponse } from '@/models/services/responses/members/MemberDetailResponse'
import { BaseApi } from '../BaseApi'

class MemberDetailApi extends BaseApi {
  constructor() {
    super('member/bo/members')
  }

  async getDetail(memberKey: string): Promise<MemberDetailResponse> {
    const { data, ...otherRes } = await this.get(`${memberKey}`)
    const resData: MemberDetailResponse = {
      data: {
        memberKey: data.memberKey,
        name: data.memberName,
        id: data.memberId,
        email: data.email,
        membershipLevel: data.gradeCode,
        phoneNumber: data.cellphoneNumber,
        gender: data.genderCode,
        cleanup: data?.company?.employeeNumber,
        rank: data.company?.rankName,
        employmentStatus: data?.company?.holdingOfficeYn,
        accountStatus: data.accountStatusCode,
        // companyCode: data.company.companyZipCode, // 201223 feedback mz kr
        companyCode: data.company.customerKey,
        customer: data.company.customerName
      },
      ...otherRes
    }
    return Promise.resolve(resData)
  }
}

export const memberDetailApi = new MemberDetailApi()
