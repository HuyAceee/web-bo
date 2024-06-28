import { DataTableContainerConfigModel } from "@/models/uikit";

export const CategoriesExhibitionDataHeaderExhibitionInDepth2CategoryTableConfig: DataTableContainerConfigModel[] = [
    {
        header: 'NO',
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
    },
]

export enum CategoriesExhibitionStatusModel {
    DISPLAY = 'Y',
    NOT_DISPLAY = 'N'
}

export const categoriesExhibitionExposureYnOptions = [
    {
      label: '전시',
      value: CategoriesExhibitionStatusModel.DISPLAY
    },
    {
      label: '비전시',
      value: CategoriesExhibitionStatusModel.NOT_DISPLAY
    }
  ]

  export const categoriesExhibitionCompanyYnOptions = [
    {
      label: '등록',
      value: CategoriesExhibitionStatusModel.NOT_DISPLAY
    },
    {
      label: '미등록',
      value: CategoriesExhibitionStatusModel.DISPLAY
    },
  ]