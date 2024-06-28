import { PaginationModelRequest } from '@/models/services/requests/PaginationModelRequest'

export interface MemberOutgoingNumberListRequest extends PaginationModelRequest {
  callingNumber?: string
  fromDate?: string
  toDate?: string
}
