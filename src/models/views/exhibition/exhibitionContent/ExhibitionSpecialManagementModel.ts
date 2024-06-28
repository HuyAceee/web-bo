import { MergeColsTableConfigType, WelfareSelectOptionType, YnOptions } from '@/models'

export interface ExhibitionSpecialManagementListFormModel {
  rowNum: number
  exhibitionKey: number
  exhibitionName: string
  exhibitionTypeName: string
  exhibitionStatusName: string
  displayYn: string
  applyChannelName: string
  displayStartDate: string
  displayStartTime?: string
  displayEndDate: string
  displayEndTime?: string
  chargeMdName: string
  sellerName: string
  createdByName: string
  createdDate: string
  lastModifiedByName: string
  lastModifiedDate: string
}

export interface ExhibitionSpecialManagementModel {
  customerKey: WelfareSelectOptionType
  exhibitionName: string
  chargeMdCode: WelfareSelectOptionType
  exhibitionStatusType: string
  exhibitionType: string
  searchPeriodType: WelfareSelectOptionType
  displayYn: string
  displayOptions: string
  fromDate: string
  toDate: string
  searchWord: string
  searchWordType: WelfareSelectOptionType
  applyChannelAllYn: boolean
  applyChannelPcYn: boolean
  applyChannelMobileYn: boolean
  applyChannelMobileWebYn: boolean
}

export enum ExhibitionSearchWordType {
  KEY = 'key',
  CREATED_BY = 'rgtr',
  MODIFIED_BY = 'modr'
}

export enum ExhibitionSearchPeriodType {
  START_DATE = 'startDate',
  END_DATE = 'endDate',
  CREATED_DATE = 'regDate',
  MODIFIED_DATE = 'modDate'
}

const enum ExhibitionCheckBoxField {
  applyChannelAllYn = 'applyChannelAllYn',
  applyChannelPcYn = 'applyChannelPcYn',
  applyChannelMobileYn = 'applyChannelMobileYn',
  applyChannelMobileWebYn = 'applyChannelMobileWebYn'
}

const enum ExhibitionType {
  SHOP = 'shop',
  THEME = 'theme'
}

export enum ExhibitionStatusType {
  EXPECT = 'expect',
  ON = 'on',
  TERMINATE = 'terminate',
  END = 'end'
}

export const exhibitionSpecialManagementListModelConfig = {
  inputRow1: [
    {
      label: '고객사(고객사 코드)',
      placeholder: '포인트 명 입력',
      field: 'customerKey'
    },
    {
      label: '기획전명',
      placeholder: '기획전명 입력',
      field: 'exhibitionName'
    },
    {
      label: '담당 MD',
      placeholder: 'MD 조회',
      field: 'chargeMdCode'
    }
  ],
  selectRow2: [
    {
      label: '기획전 구분',
      field: 'exhibitionType',
      options: [
        { label: '전체', value: '' },
        { label: '쇼핑', value: ExhibitionType.SHOP },
        { label: '테마샵', value: ExhibitionType.THEME }
      ]
    },
    {
      label: '전시 상태',
      field: 'exhibitionStatusType',
      options: [
        { label: '전체', value: '' },
        { label: '전시예정', value: ExhibitionStatusType.EXPECT },
        { label: '전시중', value: ExhibitionStatusType.ON },
        { label: '강제종료', value: ExhibitionStatusType.TERMINATE },
        { label: '기간종료', value: ExhibitionStatusType.END }
      ]
    }
  ],
  selectRow3: [
    {
      label: '전시 여부',
      field: 'displayYn',
      options: [
        { label: '전체', value: '' },
        { label: '전시', value: YnOptions.Y },
        { label: '비전시', value: YnOptions.N }
      ]
    },
    {
      label: '적용 채널',
      field: 'displayOptions',
      options: [
        { label: '전체', value: ExhibitionCheckBoxField.applyChannelAllYn },
        { label: 'PC', value: ExhibitionCheckBoxField.applyChannelPcYn },
        { label: '모바일', value: ExhibitionCheckBoxField.applyChannelMobileYn },
        { label: '모바일-웹', value: ExhibitionCheckBoxField.applyChannelMobileWebYn }
      ]
    }
  ],
  listSelectDate: {
    label: '기간',
    field: 'searchPeriodType',
    options: [
      { label: '전시 시작일', value: ExhibitionSearchPeriodType.START_DATE },
      { label: '전시 종료일 ', value: ExhibitionSearchPeriodType.END_DATE },
      { label: '등록일 ', value: ExhibitionSearchPeriodType.CREATED_DATE },
      { label: '수정일 ', value: ExhibitionSearchPeriodType.MODIFIED_DATE }
    ]
  },
  listSelectSearchType: {
    label: '검색어',
    field: 'searchWordType',
    options: [
      { label: '자동증가번호', value: ExhibitionSearchWordType.KEY },
      { label: '등록자 ', value: ExhibitionSearchWordType.CREATED_BY },
      { label: '수정일', value: ExhibitionSearchWordType.MODIFIED_BY }
    ]
  },
  querySearch: {
    label: '클레임상태',
    placeholder: '쉼표(,)구분하여 검색어 입력',
    field: 'searchWord'
  },
  listButtonDateFilter: [
    {
      label: '오늘',
      class: 'wf_w-176',
      value: 0
    },
    {
      label: '7일',
      class: 'wf_w-176',
      value: 6
    },
    {
      label: '1개월',
      class: 'wf_w-176',
      value: 29
    },
    {
      label: '3개월',
      class: 'wf_w-176',
      value: 89
    },
    {
      label: '1년',
      class: 'wf_w-176',
      value: 364
    }
  ]
}

export const exhibitionSpecialMngtTableConfig: MergeColsTableConfigType[] = [
  {
    field: 'rowNum',
    header: 'No.',
    required: false,
    class: 'wf_col-56',
    children: []
  },
  {
    field: 'exhibitionKey',
    header: '기획전코드',
    required: false,
    class: 'wf_col-100',
    children: []
  },
  {
    field: 'exhibitionName',
    header: '기획전명',
    required: false,
    class: 'wf_col-100',
    children: []
  },
  {
    field: 'exhibitionTypeName',
    header: '기획전 구분',
    required: false,
    class: 'wf_col-180',
    children: []
  },
  {
    field: 'applyChannelName',
    header: '적용채널',
    required: false,
    class: 'wf_col-200',
    children: []
  },
  {
    field: 'exhibitionStatusName',
    header: '전시상태',
    required: false,
    class: 'wf_col-100',
    children: []
  },
  {
    field: 'displayYn',
    header: '전시여부',
    required: true,
    class: 'wf_col-100',
    children: []
  },
  { field: 'displayStartDate', header: '시작일', required: false, class: 'wf_m-w-200' },
  { field: 'displayStartTime', header: '시작시간', required: false, class: 'wf_m-w-100' },
  { field: 'displayEndDate', header: '종료일', required: false, class: 'wf_m-w-200' },
  { field: 'displayEndTime', header: '종료시간', required: false, class: 'wf_m-w-100' },
  {
    field: 'chargeMdName',
    header: '담당MD',
    required: false,
    class: 'wf_m-w-200',
    children: []
  },
  {
    field: 'createdByName',
    header: '등록자',
    required: false,
    class: 'wf_m-w-200',
    children: []
  },
  {
    field: 'createdDate',
    header: '등록일시',
    required: false,
    class: 'wf_m-w-150',
    children: []
  },
  {
    field: 'lastModifiedByName',
    header: '수정자',
    required: false,
    class: 'wf_m-w-200',
    children: []
  },
  {
    field: 'lastModifiedDate',
    header: '수정일시',
    required: false,
    class: 'wf_m-w-150',
    children: []
  }
]

export const exhibitionSellerSpecialMngtTableConfig: MergeColsTableConfigType[] = [
  {
    field: 'rowNum',
    header: 'No.',
    required: false,
    class: 'wf_col-56',
    children: []
  },
  {
    field: 'exhibitionKey',
    header: '기획전코드',
    required: false,
    class: 'wf_col-100',
    children: []
  },
  {
    field: 'exhibitionName',
    header: '기획전명',
    required: false,
    class: 'wf_col-100',
    children: []
  },
  {
    field: 'exhibitionTypeName',
    header: '기획전 구분',
    required: false,
    class: 'wf_col-180',
    children: []
  },
  {
    field: 'applyChannelName',
    header: '적용채널',
    required: false,
    class: 'wf_col-200',
    children: []
  },
  {
    field: 'exhibitionStatusName',
    header: '전시상태',
    required: false,
    class: 'wf_col-100',
    children: []
  },
  {
    field: 'displayYn',
    header: '전시여부',
    required: true,
    class: 'wf_col-100',
    children: []
  },
  { field: 'displayStartDate', header: '시작일', required: false, class: 'wf_m-w-200' },
  { field: 'displayStartTime', header: '시작시간', required: false, class: 'wf_m-w-100' },
  { field: 'displayEndDate', header: '종료일', required: false, class: 'wf_m-w-200' },
  { field: 'displayEndTime', header: '종료시간', required: false, class: 'wf_m-w-100' },
  {
    field: 'chargeMdName',
    header: '담당MD',
    required: false,
    class: 'wf_m-w-200',
    children: []
  },
  {
    field: 'sellerName',
    header: '판매사',
    required: false,
    class: 'wf_m-w-200',
    children: []
  },
  {
    field: 'createdByName',
    header: '등록자',
    required: false,
    class: 'wf_m-w-200',
    children: []
  },
  {
    field: 'createdDate',
    header: '등록일시',
    required: false,
    class: 'wf_m-w-150',
    children: []
  },
  {
    field: 'lastModifiedByName',
    header: '수정자',
    required: false,
    class: 'wf_m-w-200',
    children: []
  },
  {
    field: 'lastModifiedDate',
    header: '수정일시',
    required: false,
    class: 'wf_m-w-150',
    children: []
  }
]

export const exhibitionSpecialTableExcelConfig = [
  {
    field: 'rowNum',
    header: 'No.'
  },
  {
    field: 'exhibitionKey',
    header: '기획전코드'
  },
  {
    field: 'exhibitionName',
    header: '기획전명'
  },
  {
    field: 'exhibitionTypeName',
    header: '기획전 구분'
  },
  {
    field: 'applyChannelName',
    header: '적용채널'
  },
  {
    field: 'exhibitionStatusName',
    header: '전시상태'
  },
  {
    field: 'displayYn',
    header: '전시여부'
  },
  { field: 'displayStartDate', header: '시작일' },
  { field: 'displayStartTime', header: '시작시간' },
  { field: 'displayEndDate', header: '종료일' },
  { field: 'displayEndTime', header: '종료시간' },
  {
    field: 'chargeMdName',
    header: '담당MD'
  },
  {
    field: 'createdByName',
    header: '등록자'
  },
  {
    field: 'createdDate',
    header: '등록일시'
  },
  {
    field: 'lastModifiedByName',
    header: '수정자'
  },
  {
    field: 'lastModifiedDate',
    header: '수정일시'
  }
]

export const exhibitionSellerSpecialTableExcelConfig = [
  {
    field: 'rowNum',
    header: 'No.'
  },
  {
    field: 'exhibitionKey',
    header: '기획전코드'
  },
  {
    field: 'exhibitionName',
    header: '기획전명'
  },
  {
    field: 'exhibitionTypeName',
    header: '기획전 구분'
  },
  {
    field: 'applyChannelName',
    header: '적용채널'
  },
  {
    field: 'exhibitionStatusName',
    header: '전시상태'
  },
  {
    field: 'displayYn',
    header: '전시여부'
  },
  { field: 'displayStartDate', header: '시작일' },
  { field: 'displayStartTime', header: '시작시간' },
  { field: 'displayEndDate', header: '종료일' },
  { field: 'displayEndTime', header: '종료시간' },
  {
    field: 'chargeMdName',
    header: '담당MD'
  },
  {
    field: 'sellerName',
    header: '판매사'
  },
  {
    field: 'createdByName',
    header: '등록자'
  },
  {
    field: 'createdDate',
    header: '등록일시'
  },
  {
    field: 'lastModifiedByName',
    header: '수정자'
  },
  {
    field: 'lastModifiedDate',
    header: '수정일시'
  }
]
