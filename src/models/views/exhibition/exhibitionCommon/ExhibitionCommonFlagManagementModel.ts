import { ExhibitionFlagListRequestModel } from '@/models/services/requests/exhibition/ExhibitionFlagManagementRequest'
import { MergeColsTableConfigType, WelfareSelectOptionType } from '@/models'
import { ExhibitionFlagListResponseModel } from '@/models/services/responses/exhibition/ExhibitionFlagManagementResponse'

export interface ExhibitionCommonFlagManagementFormModel extends Omit<ExhibitionFlagListRequestModel, 'searchPeriodType' | 'searchWordType'> {
  searchPeriodType?: WelfareSelectOptionType
  searchWordType?: WelfareSelectOptionType
}

export const exhibitionCommonFlagManagementFlagTypeOption: WelfareSelectOptionType[] = [
  { label: '구분', value: null },
  { label: '엠블럼', value: 'emblem' },
  { label: '프로모션', value: 'promotion' }
]

export const exhibitionCommonFlagManagementTableConfig: MergeColsTableConfigType[] = [
  {
    header: 'No.',
    field: 'rowNum',
    class: 'wf_m-w-100'
  },
  {
    header: '플래그코드',
    field: 'flagKey',
    class: 'wf_m-w-150'
  },
  {
    header: '구분',
    field: 'flagTypeName',
    class: 'wf_m-w-150'
  },
  {
    header: '전시순서',
    field: 'flagDisplayOrder',
    class: 'wf_m-w-100',
    required: true
  },
  {
    header: '플래그명',
    field: 'flagName',
    class: 'wf_m-w-200',
    required: true
  },
  {
    header: '플래그 이미지',
    field: 'imageFullPathName',
    class: 'wf_m-w-200',
    required: true
  },
  {
    header: '전시여부',
    field: 'displayYn',
    class: 'wf_m-w-150',
    required: true
  },
  {
    header: '전시시작일',
    field: 'displayStartDate',
    class: 'wf_m-w-200',
    required: true
  },
  {
    header: '시작시간',
    field: 'displayStartTime',
    class: 'wf_m-w-150',
    required: true
  },
  {
    header: '전시종료일',
    field: 'displayEndDate',
    class: 'wf_m-w-200',
    required: true
  },
  {
    header: '종료시간',
    field: 'displayEndTime',
    class: 'wf_m-w-150',
    required: true
  },
  {
    header: '등록자',
    field: 'createdByName',
    class: 'wf_m-w-200'
  },
  {
    header: '등록일',
    field: 'createdDate',
    class: 'wf_m-w-150'
  },
  {
    header: '수정자',
    field: 'lastModifiedByName',
    class: 'wf_m-w-200'
  },
  {
    header: '수정일',
    field: 'lastModifiedDate',
    class: 'wf_m-w-150'
  }
]

export interface ExhibitionFlagManagementTableModel extends ExhibitionFlagListResponseModel {
  rowNum?: number
  id?: number
  isSelected?: boolean
}

export interface ExhibitionFlagManagementTableFormModel {
  modifyRequestList?: {
    flagKey: number
    flagName: string
    flagDisplayOrder: string
    displayYn: string
    displayStartDate: string
    displayStartTime: string
    displayEndDate: string
    displayEndTime: string
  }[]
}
