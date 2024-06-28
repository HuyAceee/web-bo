import { BaseModelResponse } from '@/models/services/responses/BaseModelResponse'
import {
  ExhibitionContentHallCategoryLowerDetail,
  ExhibitionContentHallCategoryLowerListItem,
  ExhibitionContentHallCategoryUpperDetail,
  ExhibitionContentHallCategoryUpperListItem
} from '@/models/views/exhibition/exhibitionContent/ExhibitionContentHallCategoryModel'

export type ExhibitionHallCategoryGetUpperListModelResponse = BaseModelResponse<ExhibitionContentHallCategoryUpperListItem[]>
export type ExhibitionHallCategoryGetUpperDetailModelResponse = BaseModelResponse<ExhibitionContentHallCategoryUpperDetail>

export type ExhibitionHallCategoryGetLowerListModelResponse = BaseModelResponse<ExhibitionContentHallCategoryLowerListItem[]>
export type ExhibitionHallCategoryGeLowerDetailModelResponse = BaseModelResponse<ExhibitionContentHallCategoryLowerDetail>
