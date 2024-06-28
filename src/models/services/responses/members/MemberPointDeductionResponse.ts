import { BaseModelResponse } from "@/models/services/responses/BaseModelResponse"

export type MemberPointDeductionRegistrationResponse = BaseModelResponse<{
  pointKey?: string | number
}> 