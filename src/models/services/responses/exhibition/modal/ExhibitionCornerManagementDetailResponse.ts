import { BaseModelResponse } from '@/models/services/responses/BaseModelResponse'

export interface ExhibitionCornerManagementGetListPavilionCategoryResponse
  extends BaseModelResponse<ExhibitionCornerManagementGetListPavilionCategoryResponseModel[]> {}

export interface ExhibitionCornerManagementGetListCornerResponse extends BaseModelResponse<ExhibitionCornerManagementGetListCornerResponseModel[]> {}

export interface ExhibitionCornerManagementGetListCornerResponseModel extends ExhibitionCornerManagementGetListPavilionCategoryResponseModel {
  cornerKey?: number
  cornerName?: string
  applyChannelTypeName?: string
  areaAddYn?: string
  templateKey?: number
}

export interface ExhibitionCornerManagementGetListPavilionCategoryResponseModel {
  rowNum?: number
  customerId?: string
  classDivision?: string
  lclassCode?: string
  sclassCode?: string
  className?: string
}
