import { MergeColsTableConfigType } from "@/models/common";

export enum ExhibitionSearchPeriodType {
  START_DATE = 'startDate',
  END_DATE = 'endDate',
  CREATED_DATE = 'regDate',
  MODIFIED_DATE = 'modDate'
}

export enum ExhibitionSearchWordType {
  KEY = 'key',
  CREATED_BY = 'rgtr',
  MODIFIED_BY = 'modr'
}

export enum ExhibitionApplyChannelType {
  ALL = 'all',
  PC = 'pc',
  MOBILE = 'mo'
}

export const exhibitionCommonExcludeCustomerRegisTableConfig: MergeColsTableConfigType[] = [
  {
    field: 'no',
    header: 'No.',
    required: false,
    class: 'wf_col-100',
    children: []
  },
  {
    field: 'customerKey',
    header: '고객사코드',
    required: false,
    class: 'wf_col-180',
    children: []
  },
  {
    field: 'customerName',
    header: '고객사',
    required: false,
    class: 'wf_col-200',
    children: []
  },
  {
    field: 'contractStatus',
    header: '고객사 계약상태',
    required: false,
    class: 'wf_col-300',
    children: []
  },
  {
    field: 'customerStatus',
    header: '고객사 상태',
    required: false,
    class: 'wf_col-180',
    children: []
  },
  {
    field: 'delete',
    header: '삭제',
    required: false,
    class: 'wf_col-120',
    children: []
  }
]