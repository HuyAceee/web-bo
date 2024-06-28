import { BaseModelResponse, DataTablePaginationResponseModel } from '@/models/services/responses/BaseModelResponse'
import { CategoryExhibitionDspCategoryProductListModel } from '@/models/views/categories/exhibition/CategoriesExhibitionDepth3ManagementModel'

interface CategoryExhibitionUpdateCategoryProductDataResponse {
  standardCategoryId: string
  standardCategoryName: string
  displayCategoryId: string
  displayCategoryName: string
  productKey: number
  errMessage: string
  sucessMessage: string
}

export interface CategoryExhibitionDspCategoryProductListResponse
  extends DataTablePaginationResponseModel<CategoryExhibitionDspCategoryProductListModel> {}
export interface CategoryExhibitionUpdateCategoryProductResponse extends BaseModelResponse<CategoryExhibitionUpdateCategoryProductDataResponse> {}
export interface CategoryExhibitionDeleteCategoryProductResponse extends CategoryExhibitionUpdateCategoryProductResponse {}
