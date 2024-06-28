import { YnOptions } from '@/models/common'
import {
  ProductStandardCategoryDetailModel,
  ProductStandardCategoryListItemModel,
  ProductStandardLowCategoryListModel,
  ProductTicketItemOptionManageModel,
  ProductTicketProductListModel
} from '@/models/views'
import { BaseModelResponse, DataTablePaginationResponseModel } from '../../BaseModelResponse'

export interface ProductTicketListResponse extends DataTablePaginationResponseModel<ProductTicketProductListModel> {}

export interface ProductTicketCategoryDspModel {
  standardCategoryId?: string
  upperStandardCategoryId?: string
  standardCategoryName?: string
  displayCategoryId?: string
  upperDisplayCategoryId?: string
  displayCategoryName?: string
}

export interface ProductTicketCategoryDspResponse extends BaseModelResponse<ProductTicketCategoryDspModel[]> {}

export interface ProductTicketStandardCategoryModel {
  standardCategoryId: string
  upperStandardCategoryId?: string
  standardCategoryName: string
}

export type ProductTicketStandardCategoryResponse = BaseModelResponse<ProductTicketStandardCategoryModel[]>

export interface ProductTicketUpdateSellerResponse extends BaseModelResponse<ProductTicketItemOptionManageModel> {}

export interface ProductStandardCategoryListModel {
  standardDisplayCategoryKey: number
  standardCategoryId: string
  displayCategoryId: string
  displayCategoryIdDepth1: string
  displayCategoryNameDepth1: string
  displayCategoryIdDepth2: string
  displayCategoryNameDepth2: string
  displayCategoryIdDepth3: string
  displayCategoryNameDepth3: string
  displayCategoryPathName: string
  representativeDisplayCategoryYn: YnOptions
  productCount: number
  isSelected?: boolean
  id?: string
  displayCategoryPathId?: string
}

export interface ProductStandardCategoryDetailResponseModel {
  standardCategoryId: string
  standardCategoryName: string
  displayCategoryId: string
  displayCategoryName: string
  productKey: string
  errMessage: string
  sucessMessage: string
}

export interface ProductDisplayCategoryModel {
  displayCategoryId: string
  upperDisplayCategoryId: string
  displayCategoryName: string
  displayCategoryDepth: number
  productCount: number
  displayCategoryExposureOrder: number
  displayCategoryPathName: string
  displayCategoryPathId: string
  isSelected?: boolean
  standardCategoryId?: string
  standardCategoryName?: string
  representativeDisplayCategoryYn?: string
  id?: string
}
export interface ProductStandardCategoryListResponse extends BaseModelResponse<ProductStandardCategoryListItemModel[]> {}

export interface ProductStandardLowCategoryListResponse extends BaseModelResponse<ProductStandardLowCategoryListModel[]> {}

export interface ProductStandardCategoryDetailsResponse extends BaseModelResponse<ProductStandardCategoryDetailModel> {}

export interface ProductStandardCategoryDetailResponse extends BaseModelResponse<ProductStandardCategoryDetailResponseModel> {}

export interface ProductDisplayCategoryDetailResponse extends BaseModelResponse<ProductDisplayCategoryModel> {}
