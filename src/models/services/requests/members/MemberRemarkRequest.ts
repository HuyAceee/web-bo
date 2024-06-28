import { PaginationModelRequest } from '@/models/services/requests/PaginationModelRequest'

export interface MemberRemarkGetListParamsRequest extends PaginationModelRequest {}

export interface MemberRemarkDeleteDataRequest {
  memoIds: number[]
}
