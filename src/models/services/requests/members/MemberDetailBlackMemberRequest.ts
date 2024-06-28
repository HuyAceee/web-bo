import { MemberBlackReasonCodeType } from '@/models'
import { PaginationModelRequest } from '@/models/services/requests/PaginationModelRequest'

export interface MemberDetailBlackMemberGetListParamsRequest extends PaginationModelRequest {}

export interface MemberDetailBlackMemberRegisterDataRequest {
  message: string
  reason: MemberBlackReasonCodeType
}
