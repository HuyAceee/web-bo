import { YnOptions } from '@/models/common'
import { ProductCategoryFormModel, ProductStandardCategoryFormModel } from '@/models/views'
import {
  CategoriesExhibitionDisplayCategoryIdModel,
  CategoriesExhibitionDspCategoryImageDeleteModel,
  CategoriesExhibitionDspCategoryManageModel,
  CategoriesExhibitionDspCategoryManageSeqModel
} from '@/models/views/categories/exhibition/CategoriesExhibitionInDepth1CategoryModel'

export interface ProductCategoryRequest extends ProductCategoryFormModel {}
export interface ProductStandardCategoryRequest extends ProductStandardCategoryFormModel {}

export interface ProductStandardCategoryRequestParams {
  upperStandardCategoryId?: string
  allFlag?: string
  chargeMdKey?: string
}
export interface ProductStandardCategoryListRequestParams {
  standardCategoryId?: string
}
export interface ProductStandardCategoryDetailRequest {
  modifiedBy?: null
  standardCategoryId?: string
  upperStandardCategoryId?: string
  standardCategoryName?: string
  chargeMdKey?: number
  standardCategoryDepth?: number
  standardCategoryDisplayOrder?: number
}

export interface ProductStandardDspCategoryDeleteRequest {
  boStdDspCatetoryDeleteList: {
    standardDisplayCategoryKey: number
  }[]
}

export interface ProductStandardDspCategoryEditRequest {
  boStdDspCatetoryInsertList: {
    modifiedBy: null | string
    standardDisplayCategoryKey: null | number
    standardCategoryId: string
    displayCategoryId: string
    representativeDisplayCategoryYn: YnOptions
  }[]
}
export interface ProductStdCategorySeqDspRequest {
  boStdCategoryDspSeqList: {
    standardCategoryId: string
    standardCategoryDepth: number
    standardCategoryDisplayOrder: number
  }[]
}

export interface ProductDspCategoryExceptCompanyRequest extends CategoriesExhibitionDisplayCategoryIdModel {}

export interface ProductDspCategoryManageRequest extends CategoriesExhibitionDspCategoryManageModel {}

export interface ProductDspCategoryImageDeleteRequest extends CategoriesExhibitionDspCategoryImageDeleteModel {}

export interface ProductDspCategoryManageSeqRequest extends CategoriesExhibitionDspCategoryManageSeqModel {}