import { BaseModelErrorResponse } from '@/models/services/responses/BaseModelResponse'

export interface ExhibitionBrandListPopupResponse extends BaseModelErrorResponse {}

export interface ExhibitionBrandListPopupResponseModel {
  brandKey?: number
  brandId?: string
  brandName?: string
}
