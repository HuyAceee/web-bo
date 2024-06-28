import { MergeColsTableConfigType } from "@/models/common"

export enum ExhibitionHallTabType {
  BASE_INFORMATION = 'base-information',
  DETAILED_INFORMATION = 'detailed-information'
}

export const exhibitionHallMngtCategoryGroupTableConfig: MergeColsTableConfigType[] = [
  {
    field: 'aaa',
    header: 'No.',
    required: false,
    class: 'wf_col-56',
    children: []
  },
  {
    field: '템플릿코드',
    header: '템플릿코드',
    required: false,
    class: 'wf_col-100',
    children: []
  },
  {
    field: '코너번호',
    header: '코너번호',
    required: false,
    class: 'wf_col-100',
    children: []
  },
  {
    field: '코너명',
    header: '코너명',
    required: false,
    class: 'wf_col-180',
    children: []
  },
  {
    field: 'flatform',
    header: '적용채널',
    required: true,
    class: 'wf_col-100',
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
    field: 'exhibitionOrder',
    header: '전시순서',
    required: true,
    class: 'wf_col-100',
    children: []
  },
  {
    field: '예약전시',
    header: '예약전시',
    required: false,
    class: 'wf_col-100',
    children: []
  },
  {
    field: 'ex-start',
    header: '전시시작-종료',
    required: false,
    class: 'wf_col-400',
    children: [
      { field: 'c1', header: '시작일', required: false, class: 'wf_col-100' },
      { field: 'c2', header: '시작시간', required: false, class: 'wf_col-100' },
      { field: 'c3', header: '종료일', required: false, class: 'wf_col-100' },
      { field: 'c4', header: '종료시간', required: false, class: 'wf_col-100' }
    ]
  },
  {
    field: 'ex-nature',
    header: '전시성격',
    required: false,
    class: 'wf_col-500',
    children: [
      { field: 'c1', header: '상품', required: false, class: 'wf_col-100' },
      { field: 'c2', header: '배너', required: false, class: 'wf_col-100' },
      { field: 'c3', header: '상품그룹', required: false, class: 'wf_col-100' },
      { field: 'c4', header: '특가', required: false, class: 'wf_col-100' },
      { field: 'c5', header: '상품그룹', required: false, class: 'wf_col-100' }
    ]
  },
  {
    field: '영역추가여부',
    header: '영역 추가여부',
    required: false,
    class: 'wf_col-100',
    children: []
  }
]

export const exhibitionHallMngtDetailedReservationTableConfig: MergeColsTableConfigType[] = [
  {
    field: 'aaa',
    header: 'No.',
    required: false,
    class: 'wf_col-56',
    children: []
  },
  {
    field: '코너번호',
    header: '코너번호',
    required: false,
    class: 'wf_col-100',
    children: []
  },
  {
    field: '코너번호',
    header: '전시여부',
    required: true,
    class: 'wf_col-100',
    children: []
  },
  {
    field: '코너명',
    header: '예약 코너명',
    required: true,
    class: 'wf_col-180',
    children: []
  },
  {
    field: 'ex-start',
    header: '전시시작-종료',
    required: true,
    class: 'wf_col-400',
    children: [
      { field: 'c1', header: '시작일', required: false, class: 'wf_col-100' },
      { field: 'c2', header: '시작시간', required: false, class: 'wf_col-100' },
      { field: 'c3', header: '종료일', required: false, class: 'wf_col-100' },
      { field: 'c4', header: '종료시간', required: false, class: 'wf_col-100' }
    ]
  },
  {
    field: 'aaaa',
    header: '수정자',
    required: false,
    class: 'wf_col-100',
    children: [
    ]
  },
  {
    field: '영역추가여부',
    header: '수정일',
    required: false,
    class: 'wf_col-100',
    children: []
  }
]