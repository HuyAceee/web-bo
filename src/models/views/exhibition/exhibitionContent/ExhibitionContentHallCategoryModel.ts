import { GenericOptionType, YnOptions } from "@/models/common"
import { DataTableContainerConfigModel } from "@/models/uikit/WelfareDataTableProps"

export interface ExhibitionContentHallCategoryUpperListItem {
  customerPavilionKey?: number,
  applyChannelTypeName?: string,
  customerId?: string,
  customerName?: string,
  lclassCode?: string,
  sclassCode?: string,
  lclassName?: string,
  sclassName?: string
}

export interface ExhibitionContentHallCategoryUpperDetail {
  customerPavilionKey?: number,
  customerId?: string,
  lclassCode?: string,
  lclassName?: string,
  sclassUseYn?: YnOptions,
  displayYn?: YnOptions,
  displayYnName?: string,
  createdByName?: string,
  createdDate?: string,
  lastModifiedByName?: string,
  lastModifiedDate?: string
}

export const exhibitionHallCategoryUpperTableConfig: DataTableContainerConfigModel[] = [
  {
    header: 'No.',
    field: 'index',
    class: 'wf_col-56'
  },
  {
    header: '상위 카테고리코드',
    field: 'lclassCode',
    class: 'wf_col-120'
  },
  {
    header: '상위 카테고리명',
    field: 'lclassName',
    class: 'wf_col-160'
  },
  {
    header: '전시여부',
    field: 'displayYn',
    class: 'wf_col-80'
  },
  {
    header: '등록자',
    field: 'createdByName',
    class: 'wf_col-120'
  },
  {
    header: '등록일',
    field: 'createdDate',
    class: 'wf_col-160'
  },
  {
    header: '수정자',
    field: 'lastModifiedByName',
    class: 'wf_col-120'
  },
  {
    header: '수정일',
    field: 'lastModifiedDate',
    class: 'wf_col-160'
  }
]

export const exhibitionContentDisplayOptions: GenericOptionType<YnOptions>[] = [
  { label: '전시', value: YnOptions.Y },
  { label: '미전시', value: YnOptions.N }
]

export const exhibitionContentSubUseYnOptions = [
  { label: '사용', value: YnOptions.Y },
  { label: '미사용', value: YnOptions.N }
]

export interface ExhibitionContentHallCategoryLowerListItem {
  rowNum?: string,
  customerPavilionKey?: string,
  customerId?: string,
  lclassCode?: string,
  sclassCode?: string,
  lclassName?: string,
  sclassName?: string,
  displayYnName?: string,
  createdByName?: string,
  createdDate?: string,
  lastModifiedByName?: string,
  lastModifiedDate?: string
}

export interface ExhibitionContentHallCategoryLowerDetail {
  customerPavilionKey?: number,
  customerId?: string,
  lclassCode?: string,
  lclassName?: string,
  sclassCode?: string,
  sclassName?: string,
  displayYn?: YnOptions,
  displayYnName?: string,
  createdByName?: string,
  createdDate?: string,
  lastModifiedByName?: string,
  lastModifiedDate?: string
}

export interface ExhibitionContentHallCategoryLowerFormItemModel {
  customerId?: string | number,
  lclassCode?: string,
  sclassCode?: string,
  sclassName?: string,
  displayYn?: YnOptions
}


export const exhibitionHallCategoryLowerTableConfig: DataTableContainerConfigModel[] = [
  {
    header: 'No.',
    field: 'index',
    class: 'wf_col-56'
  },
  {
    header: '하위 카테고리코드',
    field: 'sclassCode',
    class: 'wf_col-120'
  },
  {
    header: '하위 카테고리명',
    field: 'sclassName',
    class: 'wf_col-160',
  },
  {
    header: '전시여부',
    field: 'displayYnName',
    class: 'wf_col-80'
  },
  {
    header: '등록자',
    field: 'createdByName',
    class: 'wf_col-120'
  },
  {
    header: '등록일',
    field: 'createdDate',
    class: 'wf_col-160'
  },
  {
    header: '수정자',
    field: 'lastModifiedByName',
    class: 'wf_col-120'
  },
  {
    header: '수정일',
    field: 'lastModifiedDate',
    class: 'wf_col-160'
  }
]
