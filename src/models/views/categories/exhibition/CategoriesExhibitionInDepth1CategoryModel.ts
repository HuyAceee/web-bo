import { DataTableContainerConfigModel } from '@/models/uikit'
import { ProductRegisterValueOptionType } from '../../products'

export interface CategoriesExhibitionInDepthCategoryOneInfoModel {
  displayCategoryName: string
  displayCategoryImagePathName?: string
  displayCategoryImageName?: string
  displayCategoryImageOriginName?: string
  displayCategoryImageAltName?: string
  displayCategoryExposureYn?: ProductRegisterValueOptionType
  displayCategoryDepth?: number
  displayCategoryExposureOrder?: number
  displayExcludedCompanyYn?: string
}

export interface CategoriesExhibitionDisplayCategoryIdModel {
  displayCategoryId: string
}

export interface CategoriesExhibitionDspCategoryExceptCompanyModel {
  customerKey: number
  customerName: string
}

export interface CategoriesExhibitionBoDspCatExpsrExclEntInsertListModel {
  customerKey: number
  displayCategoryId?: string
}

export interface CategoriesExhibitionDspCategoryManageModel {
  displayCategoryId?: string
  displayCategoryDepth?: number
  displayCategoryExposureYn?: string
  displayCategoryImageName?: string
  upperDisplayCategoryId?: string
  displayCategoryImagePathName?: string
  displayCategoryExposureOrder?: number
  boDspCatExpsrExclEntInsertList?: CategoriesExhibitionBoDspCatExpsrExclEntInsertListModel[]
  displayCategoryImageOriginName?: string
  displayCategoryName?: string
  displayExcludedCompanyYn?: string
  displayCategoryImageAltName?: string
}

export interface CategoriesExhibitionDspCategoryManageResponseModel {
  standardCategoryId: string
  standardCategoryName: string
  displayCategoryId: string
  displayCategoryName: string
  productKey: number
  errMessage: string
  sucessMessage: string
}

export interface CategoriesExhibitionLowDspCategoryListModel {
  displayCategoryId: string
  displayCategoryName: string
  representativeDisplayCategoryYn: string
  productCount: number
  displayCategoryExposureOrder: number
}

export const CategoriesExhibitionDataHeaderExhibitionInDepthCategoryOneTableConfig: DataTableContainerConfigModel[] = [
  {
    header: 'No',
    field: 'displayCategoryExposureOrder',
    class: 'wf_m-w-120'
  },
  {
    header: '카테고리명',
    field: 'displayCategoryName',
    class: 'wf_m-w-614'
  },
  {
    header: '상품수',
    field: 'productCount',
    class: 'wf_m-w-120'
  }
  // {
  //     header: '전시 순서',
  //     field: 'action',
  //     class: 'wf_m-w-120'
  // }
]

export interface CategoriesExhibitionDspCategoryImageDeleteModel {
  displayCategoryImagePathName: string
  displayCategoryImageName: string
  displayCategoryId: string
}

export interface CategoriesExhibitionDspCategoryDetailModel {
  displayCategoryDepthName?: string
  upperDisplayCategoryId?: string
  upperDisplayCategoryName?: string
  displayCategoryId?: string
  displayCategoryName?: string
  displayCategoryImagePathName?: string
  displayCategoryImageName?: string
  displayCategoryImageOriginName?: string
  displayCategoryImageAltName?: string
  displayCategoryExposureYn?: string
  displayCategoryDepth?: number
  displayCategoryExposureOrder?: number
  displayExcludedCompanyYn?: string
}

export enum CategoriesExhibitionValueMoveType {
  MOVE_UP = 'MOVE_UP',
  MOVE_DOWN = 'MOVE_DOWN'
}

export interface CategoriesExhibitionValueModeReducerModel {
  type: CategoriesExhibitionValueMoveType
  payload: {
    index: number
  }
}

export interface CategoriesExhibitionDspCategoryImageModel {
  displayCategoryImagePathName: string
  displayCategoryImageName: string
  dirFileName: string
  displayCategoryImageOriginName: string
}
export interface CategoriesExhibitionDataImageModel {
  newData: CategoriesExhibitionDspCategoryImageModel
  alt: string
  file: File
  url: string
}

export interface CategoriesExhibitionDspCategoryListModel {
  displayCategoryId: string
  upperDisplayCategoryId: string
  displayCategoryName: string
  displayCategoryDepth: number
  productCount: number
  displayCategoryPathName: string
  displayCategoryPathId: string
  children?: CategoriesExhibitionDspCategoryListModel[]
  displayCategoryExposureOrder?: number
  //   representativeDisplayCategoryYn?: YnOptions
  //   standardCategoryDisplayOrder?: number
  //   standardDisplayCategoryKey?: number
}

export interface CategoriesExhibitionDspCategoryManageSeqModel {
  boDspCategoryExpsrSeqList: CategoriesExhibitionBoDspCategoryExpsrSeqModel[]
}

export interface CategoriesExhibitionBoDspCategoryExpsrSeqModel {
  displayCategoryId: string,
  displayCategoryDepth: number,
  displayCategoryExposureOrder: number
}


export enum CategoriesExhibitionDspCategoryDepthTypeModel {
  DSP_CATE_DEPTH_1 = 1,
  DSP_CATE_DEPTH_2 = 2,
  DSP_CATE_DEPTH_3 = 3
}


export interface CategoriesExhibitionDspDepthProps{
    nodes: []
}
