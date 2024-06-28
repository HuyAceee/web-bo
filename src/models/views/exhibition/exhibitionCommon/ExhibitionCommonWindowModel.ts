import { BaseArrayFormModel, GenericOptionType, MergeColsTableConfigType, YnOptions } from "@/models/common"
import { ExhibitionApplyChannelType, ExhibitionSearchPeriodType, ExhibitionSearchWordType } from "@/models/views/exhibition/exhibitionCommon/ExhibitionCommonModel"
import { PageState } from "primevue/paginator"

export interface ExhibitionWindowMngtFormQueryModel {
  customerKey?: string
  popupName?: string
  displayYn?: YnOptions | 'all'
  applyChannelType?: ExhibitionApplyChannelType
  searchPeriodType?: GenericOptionType<ExhibitionSearchPeriodType>
  fromDate?: string
  toDate?: string
  searchWordType?: ExhibitionSearchWordType
  searchWord?: string
}

export interface ExhibitionWindowModel {
  isChanged?: boolean
  rowNum?: number
  popupKey?: number
  popupName?: string
  popupCount?: number
  displayYn?: YnOptions
  displayOrder?: number | string
  popupAttributeTypeName?: string
  displayStartDate?: string
  displayStartTime?: string
  displayEndDate?: string
  displayEndTime?: string
  createdByName?: string
  createdDate?: string
  lastModifiedByName?: string
  lastModifiedDate?: string
}

export type ExhibitionCommonWindowTableFormModel = BaseArrayFormModel<ExhibitionWindowModel>

export interface ExhibitionCommonWindowTableProps {
  data?: ExhibitionWindowModel[]
  totalItems?: number | string
  isLoading?: boolean
}

export interface ExhibitionCommonWindowTableEmits {
  (e: 'refresh'): void
  (e: 'pageChange', params: PageState): void
}

export const exhibitionCommonWindowTableConfig: MergeColsTableConfigType[] = [
  {
    field: 'rowNum',
    header: 'No.',
    required: false,
    class: 'wf_col-56',
    children: []
  },
  {
    field: 'popupKey',
    header: '팝업코드',
    required: false,
    class: 'wf_col-140',
    children: []
  },
  {
    field: 'displayOrder',
    header: '전시순서',
    required: false,
    class: 'wf_col-140',
    children: []
  },
  {
    field: 'popupName',
    header: '팝업명',
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
  { field: 'displayStartDate', header: '시작일', required: true, class: 'wf_col-200' },
  { field: 'displayStartTime', header: '시작시간', required: true, class: 'wf_col-100' },
  { field: 'displayEndDate', header: '종료일', required: true, class: 'wf_col-200' },
  { field: 'displayEndTime', header: '종료시간', required: true, class: 'wf_col-100' },
  {
    field: 'popupAttributeTypeName',
    header: '전시성격',
    required: false,
    class: 'wf_col-140',
    children: []
  },
  {
    field: 'popupCount',
    header: '팝업개수',
    required: false,
    class: 'wf_col-140',
    children: []
  },
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