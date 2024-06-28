import { MemberPointDeductionRegistrationDataModelRequest } from "@/models/services/requests/members/MemberPointDeductionRequest"
import { MemberPointDeductionRegistrationResponse } from "@/models/services/responses/members/MemberPointDeductionResponse"
import { MemberUsagePointDetailResponse } from "@/models/services/responses/members/MemberPointUsageListResponse"
import { BaseApi } from "@/services/api/BaseApi"

class MemberPointDeductionApi extends BaseApi {
  constructor() {
    super("member/bo")
  }

  async registerPointDeduction(customerKey: string, data: MemberPointDeductionRegistrationDataModelRequest): Promise<MemberPointDeductionRegistrationResponse> {
    return this.post(`customer-companies/${customerKey}/points/deduction`, data)
  }

  async getPointDeductionDetail(customerKey: string | number, pointKey: string | number): Promise<MemberUsagePointDetailResponse> {
    return this.get(`customer-companies/${customerKey}/points/deduction/${pointKey}`)
  }
}

export const memberPointDeductionApi = new MemberPointDeductionApi()