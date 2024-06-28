import { BaseModelResponse } from '@/models/services/responses/BaseModelResponse'

export interface PartnerCompanyCategoryResponse extends BaseModelResponse<PartnerCompanyCategoryModel[]> {
}

export interface PartnerCompanyCategoryModel {
  categoryKey: number
  sellerKey: number
  standardCategoryId: string
  standardCategoryName: string
  chargeMdKey: number
  chargeMdName: string
  marginRate: number
  isRepresentative: boolean
}