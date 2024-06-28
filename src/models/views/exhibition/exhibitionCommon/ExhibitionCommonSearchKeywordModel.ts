import { BaseArrayFormModel, GenericOptionType, MergeColsTableConfigType, YnOptions } from "@/models/common"
import { PageState } from "primevue/paginator"
import { ExhibitionSearchPeriodType, ExhibitionSearchWordType } from "@/models/views/exhibition/exhibitionCommon/ExhibitionCommonModel"
import { ExhibitionGnbLinkType } from "../modal/ExhibitionCornerConnectionModalModel"

export interface ExhibitionSearchKeywordMngtFormQueryModel {
  customerKey?: string
  searchBoxKeywordName?: string
  displayYn?: YnOptions | 'all'
  applyChannelAllYn?: YnOptions
  applyChannelPcYn?: YnOptions
  applyChannelMobileYn?: YnOptions
  applyChannelMobileWebYn?: YnOptions
  searchPeriodType?: GenericOptionType<ExhibitionSearchPeriodType>
  fromDate?: string
  toDate?: string
  searchWordType?: ExhibitionSearchWordType
  searchWord?: string
}

export interface ExhibitionSearchKeywordModel {
  isChanged?: boolean
  rowNum?: number
  searchBoxKeywordKey?: number
  searchBoxKeywordName?: string
  linkType?: ExhibitionGnbLinkType
  linkUrl?: string
  linkExhibitionKey?: string
  linkEventKey?: string
  linkProductKey?: string
  linkPromotionKey?: string
  linkExhibitionName?: string
  linkEventName?: string
  linkProductName?: string
  linkPromotionName?: string
  displayYn?: YnOptions
  applyChannelName?: string
  displayStartDate?: string
  displayStartTime?: string
  displayEndDate?: string
  displayEndTime?: string
  createdByName?: string
  createdDate?: string
  lastModifiedByName?: string
  lastModifiedDate?: string
}

export type ExhibitionCommonSearchKeywordTableFormModel = BaseArrayFormModel<ExhibitionSearchKeywordModel>

export interface ExhibitionCommonSearchKeywordTableProps {
  data?: ExhibitionSearchKeywordModel[]
  totalItems?: number | string
  isLoading?: boolean
}

export interface ExhibitionCommonSearchKeywordTableEmits {
  (e: 'refresh'): void
  (e: 'pageChange', params: PageState): void
}

export const exhibitionCommonSearchKeywordTableConfig: MergeColsTableConfigType[] = [
  {
    field: 'rowNum',
    header: 'No.',
    required: false,
    class: 'wf_col-56',
    children: []
  },
  {
    field: 'searchBoxKeywordKey',
    header: '검색창 키워드 코드',
    required: false,
    class: 'wf_col-140',
    children: []
  },
  {
    field: 'applyChannelName',
    header: '적용채널',
    required: false,
    class: 'wf_col-100',
    children: []
  },
  {
    field: 'searchKeyword',
    header: '검색창 키워드',
    required: true,
    class: 'wf_col-180',
    children: []
  },
  {
    field: 'exhibitionStatus',
    header: '전시여부',
    required: true,
    class: 'wf_col-100',
    children: []
  },
  {
    field: 'url',
    header: '랜딩 url',
    required: true,
    class: 'wf_col-500',
    children: []
  },
  { field: 'displayStartDate', header: '시작일', required: true, class: 'wf_col-200' },
  { field: 'displayStartTime', header: '시작시간', required: true, class: 'wf_col-100' },
  { field: 'displayEndDate', header: '종료일', required: true, class: 'wf_col-200' },
  { field: 'displayEndTime', header: '종료시간', required: true, class: 'wf_col-100' },
  {
    field: 'createdByName',
    header: '등록자',
    required: false,
    class: 'wf_col-200',
    children: []
  },
  {
    field: 'createdDate',
    header: '등록일',
    required: false,
    class: 'wf_col-120',
    children: []
  },
  {
    field: 'lastModifiedByName',
    header: '수정자',
    required: false,
    class: 'wf_col-200',
    children: []
  },
  {
    field: 'lastModifiedDate',
    header: '수정일',
    required: false,
    class: 'wf_col-120',
    children: []
  }
]

export interface ExhibitionCommonSearchKeywordDetailModel {
  searchBoxKeywordKey?: number | string,
  searchBoxKeywordName?: string,
  linkType?: ExhibitionGnbLinkType
  linkUrl?: string
  linkExhibitionKey?: string
  linkEventKey?: string
  linkProductKey?: string
  linkPromotionKey?: string
  linkExhibitionName?: string
  linkEventName?: string
  linkProductName?: string
  linkPromotionName?: string
  displayYn?: YnOptions,
  displayStartDate?: string,
  displayStartTime?: string,
  displayEndDate?: string,
  displayEndTime?: string,
  applyChannelAllYn?: YnOptions,
  applyChannelPcYn?: YnOptions,
  applyChannelMobileYn?: YnOptions,
  applyChannelMobileWebYn?: YnOptions,
  excludeCustomerCreateRequestList?: {
    customerKey?: string | number,
    [key: string]: any
  }[]
  createdByName?: string
  createdDate?: string
  lastModifiedByName?: string
  lastModifiedDate?: string
}

export interface ExhibitionCommonSearchKeywordRegisPopupConfig {
  type?: 'register' | 'modify'
}

export interface ExhibitionCommonSearchKeywordPopupProps {
  data?: ExhibitionCommonSearchKeywordDetailModel
  config?: ExhibitionCommonSearchKeywordRegisPopupConfig
}
export interface ExhibitionCommonSearchKeywordPopupEmits {
  (e: 'callback'): void
}
