import { PaginationModelRequest } from '@/models/services/requests/PaginationModelRequest'

export interface MemberCustomerSearchRequest extends PaginationModelRequest {
  customerKey?: string
  customerName?: string
  customerStatus?: string
  bizRegNum?: string
  corpRegNum?: string
  contractStatus?: string
  startDate?: string
  endDate?: string
}
