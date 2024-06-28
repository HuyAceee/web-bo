import { PaginationModelRequest } from '@/models/services/requests/PaginationModelRequest'

export interface ExhibitionPromotionCouponRequest extends PaginationModelRequest {
  couponStatuses?: string
}
