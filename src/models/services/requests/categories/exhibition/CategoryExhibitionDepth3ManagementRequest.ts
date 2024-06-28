import {
  CategoriesExhibitionStatusModel,
  CategoryExhibitionDspCategoryProductListFormModel
} from '@/models/views/categories/exhibition/CategoriesExhibitionDepth3ManagementModel'
import { PaginationModelRequest } from '../../PaginationModelRequest'

export interface CategoryExhibitionDspCategoryProductListRequest extends PaginationModelRequest, CategoryExhibitionDspCategoryProductListFormModel {}

export interface CategoryExhibitionUpdateCategoryProductRequest {
  boDspCategoryItemInsertList: {
    modifiedBy: string
    displayCategoryProductKey: number
    displayCategoryId: string
    productKey: number
    representativeDisplayCategoryYn: CategoriesExhibitionStatusModel
  }[]
}

export interface CategoryExhibitionDeleteCategoryProductRequest {
  boDspCategoryItemDeleteList: {
    displayCategoryProductKey: number
  }[]
}
