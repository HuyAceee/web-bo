import { YnOptions } from '@/models/common'

export interface ProductCategoryModel {
  displayCategoryId: string
  upperDisplayCategoryId: string
  displayCategoryName: string
}

export interface ProductStandardCategoryModel {
  standardCategoryId: string
  upperStandardCategoryId?: string
  standardCategoryName?: string
}

export interface ProductCategoryFormModel {
  upperDisplayCategoryId?: string
}

export interface ProductStandardCategoryFormModel {
  upperStandardCategoryId?: string
  chargeMdKey?: string
}

export interface ProductStandardCategoryListItemModel extends ProductStandardCategoryModel {
  standardCategoryDepth?: number
  productCount?: number
  standardCategoryPathName?: string
  standardCategoryPathId?: string
  children?: ProductStandardCategoryListItemModel[]
  isSelected?: boolean
  representativeDisplayCategoryYn?: YnOptions
  standardCategoryDisplayOrder?: number
  standardDisplayCategoryKey?: number
  displayCategoryId?: string
}

export interface ProductStandardLowCategoryListModel {
  standardCategoryId: string
  standardCategoryName: string
  representativeDisplayCategoryYn: YnOptions
  productCount: number
  standardCategoryDisplayOrder: number
}
export interface ProductStandardCategoryDetailModel {
  standardCategoryDepthName: string
  upperStandardCategoryId: string
  upperStandardCategoryName: string
  standardCategoryId: string
  standardCategoryName: string
  chargeMdKey: number
  chargeMdName: string
  standardCategoryDepth: number
  standardCategoryDisplayOrder: number
}
