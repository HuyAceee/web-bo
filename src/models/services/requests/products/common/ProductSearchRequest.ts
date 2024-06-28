import { PaginationModelRequest } from '@/models/services/requests/PaginationModelRequest'

export interface ProductSearchRequest extends PaginationModelRequest {
  totalItems?: number
}
