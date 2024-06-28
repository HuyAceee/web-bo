import { MemberPointRegistrationFormModel } from "@/models/views/members/memberWelfarePoint/MemberWelfarePointModel"

export interface MemberPointDeductionRegistrationDataModelRequest extends MemberPointRegistrationFormModel {
  customerKey?: string
  pointKey?: string
  useValidDate: {
    startDate: string
    endDate?: string
  }
  foMembers: {
    foMemberKey?: string | number
    pointAmount?: string | number
    managerMemo?: string
  }[]
}