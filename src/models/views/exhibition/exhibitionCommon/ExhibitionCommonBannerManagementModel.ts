import { DataTableContainerConfigModel, MergeColsTableConfigType, WelfareSelectOptionType } from '@/models'
import { ExhibitionSearchPeriodType, ExhibitionSearchWordType } from '@/models/views/exhibition/exhibitionContent/ExhibitionSpecialManagementModel'
import { ExhibitionBannerGroupListRequestModel } from '@/models/services/requests/exhibition/ExhibitionBannerManagementRequest'
import {
  ExhibitionBannerGroupListResponseModel,
  ExhibitionBannerListResponseModel
} from '@/models/services/responses/exhibition/exhibitionCommon/ExhibitionCommonBannerManagementResponse'
import { PageState } from 'primevue/paginator'
import { DataTableRowClickEvent } from 'primevue/datatable'

export const exhibitionBannerGroupUseYnOptions: WelfareSelectOptionType[] = [
  { label: '전체', value: null },
  { label: '사용', value: 'Y' },
  { label: '미사용', value: 'N' }
]

export const exhibitionCommonBannerSearchWordTypeOptions: WelfareSelectOptionType[] = [
  { label: '배너그룹코드', value: ExhibitionSearchWordType.KEY },
  { label: '등록자', value: ExhibitionSearchWordType.CREATED_BY },
  { label: '수정자', value: ExhibitionSearchWordType.MODIFIED_BY }
]

export const exhibitionCommonBannerSearchPeriodTypeOptions: WelfareSelectOptionType[] = [
  { label: '등록일', value: ExhibitionSearchPeriodType.CREATED_DATE },
  { label: '수정일', value: ExhibitionSearchPeriodType.MODIFIED_DATE }
]

export const exhibitionCommonBannerGroupTableConfig: DataTableContainerConfigModel[] = [
  {
    header: 'No.',
    field: 'rowNum',
    class: 'wf_m-w-100 '
  },
  {
    header: '배너그룹 코드',
    field: 'bannerGroupKey',
    class: 'wf_m-w-150 '
  },
  {
    header: '배너그룹명',
    field: 'bannerGroupName',
    class: 'wf_m-w-150 '
  },
  {
    header: '적용채널',
    field: 'applyChannelName',
    class: 'wf_m-w-150 '
  },
  {
    header: '사용여부',
    field: 'bannerGroupUseYn',
    class: 'wf_m-w-150 '
  },
  {
    header: '등록자',
    field: 'createdByName',
    class: 'wf_m-w-200 '
  },
  {
    header: '등록일',
    field: 'createdDate',
    class: 'wf_m-w-150 '
  },
  {
    header: '수정자',
    field: 'lastModifiedByName',
    class: 'wf_m-w-200 '
  },
  {
    header: '수정일',
    field: 'lastModifiedDate',
    class: 'wf_m-w-150 '
  }
]

export const exhibitionCommonBannerTableConfig: MergeColsTableConfigType[] = [
  {
    header: 'No.',
    field: 'rowNum',
    class: 'wf_col-56 ',
    required: false
  },
  {
    header: '배너코드',
    field: 'bannerKey',
    class: 'wf_col-100 ',
    required: false
  },
  {
    header: '배너명',
    field: 'bannerName',
    class: 'wf_col-100 ',
    required: false
  },
  {
    header: '전시여부',
    field: 'displayYn',
    class: 'wf_m-w-150 ',
    required: true
  },
  {
    header: '전시순서',
    field: 'displayOrder',
    class: 'wf_col-100 ',
    required: true
  },
  {
    header: '시작일',
    field: 'displayStartDate',
    class: 'wf_col-200 ',
    required: false
  },
  {
    header: '시작시간',
    field: 'displayStartTime',
    class: 'wf_col-100 ',
    required: false
  },
  {
    header: '종료일',
    field: 'displayEndDate',
    class: 'wf_col-200 ',
    required: false
  },
  {
    header: '종료시간',
    field: 'displayEndTime',
    class: 'wf_col-100 ',
    required: false
  },
  {
    header: '적용채널',
    field: 'applyChannelName',
    class: 'wf_col-100 ',
    required: false
  },
  {
    header: '배너그룹코드',
    field: 'bannerGroupKey',
    class: 'wf_m-w-100 ',
    required: false
  },
  {
    header: '배너그룹명',
    field: 'bannerGroupName',
    class: 'wf_m-w-100 ',
    required: false
  },
  {
    header: '등록자',
    field: 'createdByName',
    class: 'wf_m-w-150 ',
    required: false
  },
  {
    header: '등록일',
    field: 'createdDate',
    class: 'wf_m-w-200 ',
    required: false
  },
  {
    header: '수정자',
    field: 'lastModifiedByName',
    class: 'wf_m-w-150 ',
    required: false
  },
  {
    header: '수정일',
    field: 'lastModifiedDate',
    class: 'wf_m-w-200 ',
    required: false
  }
]

export const exhibitionCommonBannerTableField = [
  'rowNum',
  'bannerKey',
  'bannerName',
  'displayYn',
  'displayOrder',
  'displayStartDate',
  'displayStartTime',
  'displayEndDate',
  'displayEndTime',
  'applyChannelName',
  'bannerGroupKey',
  'bannerGroupName',
  'createdByName',
  'createdDate',
  'lastModifiedByName',
  'lastModifiedDate'
]

export const exhibitionCommonBannerTableHeader = [
  'No.',
  '배너코드',
  '배너명',
  '전시여부',
  '전시순서',
  '시작일',
  '시작시간',
  '종료일',
  '종료시간',
  '적용채널',
  '배너그룹코드',
  '배너그룹명',
  '등록자',
  '등록일',
  '등록일',
  '수정일'
]

export interface ExhibitionCommonBannerFormModel extends Omit<ExhibitionBannerGroupListRequestModel, 'searchPeriodType' | 'searchWordType'> {
  searchPeriodType: WelfareSelectOptionType
  searchWordType: WelfareSelectOptionType
}

// Table model
export interface ExhibitionBannerGroupListTableModel extends ExhibitionBannerGroupListResponseModel {
  id: number
  isSelected: boolean
}

export interface ExhibitionBannerListTableModel extends ExhibitionBannerListResponseModel {
  id: number
  isSelected: boolean
}

// Table Props
export interface ExhibitionCommonBannerListTableProps {
  bannerGroupKey?: number
  data?: ExhibitionBannerListTableModel[]
  totalItems?: number
  isLoading?: boolean
  selectedRow?: ExhibitionBannerListTableModel
}

export interface ExhibitionCommonBannerGroupListTableProps {
  data?: ExhibitionBannerGroupListTableModel[]
  totalItems?: number
  isLoading?: boolean
  selectedRow?: ExhibitionBannerGroupListTableModel
}

// Table Emits
export interface ExhibitionCommonBannerGroupListTableEmits {
  (e: 'page-change', params: PageState): void

  (e: 'row-click', params: DataTableRowClickEvent): void

  (e: 'excel-download'): void

  (e: 'refresh'): void
}
