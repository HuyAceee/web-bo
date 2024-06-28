import { PaginationModelRequest } from '@/models/services/requests/PaginationModelRequest'

export interface MemberSellerSearchRequest extends PaginationModelRequest {
  sellerKey?: string
  sellerName?: string
  sellerStatus?: string
  bizRegNum?: string
  corpRegNum?: string
  contractStatus?: string
  startDate?: string
  endDate?: string
}
