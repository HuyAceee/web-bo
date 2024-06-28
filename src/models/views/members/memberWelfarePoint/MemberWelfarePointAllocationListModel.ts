import { WelfareSelectOptionType } from '@/models'
import { CommonGroupCodeResponse } from '@/models/services/responses/common'
import { MemberPointDetailedCategoryType, MemberPointProcessCategoryType } from '@/models/views/members/memberWelfarePoint/MemberWelfarePointModel'

interface MemberPointAuditing {
  registerKey: number
  registerId: string
  registerName: string
  registeredDate: string
  modifierKey: number
  modifierId: string
  modifierName: string
  modifiedDate: string
}

interface MemberWelfarePointWFoMember {}

export interface MemberPointAllocationModel {
  customerKey: number
  pointKey: number
  customerName: string
  managementKind: CommonGroupCodeResponse
  processCategory: CommonGroupCodeResponse
  detailedCategory: CommonGroupCodeResponse
  targetKind: CommonGroupCodeResponse
  pointName: string
  pointAmount: number
  useStartDate: string
  useEndDate: string
  managerMemo: string
  allocationDate: string
  foMemberCount: number
  foMemberList: MemberWelfarePointWFoMember[]
  auditing: MemberPointAuditing
}

export interface MemberPointAllocationListFormModel {
  no: number
  companyCode: string
  customer: string
  pointKey?: string
  pointAllocationCode: string
  pointClassification: string
  pointType: string
  pointAllocationName: string
  allottedWelfarePoints: string
  numberOfSubjects: number
  registrationStatus: string
  baseYear: number
  startUsing: string
  endOfUse: string
  registrationDate: string
  registrant: string
  adjustmentDate: string
  coordinator: string
}

export interface MemberPointAllocationFormModel {
  codeCustomer: string
  pointAllocationName: string
  pointAllocationCode: string
  pointClassification: string
  pointType: WelfareSelectOptionType
  registrationStatus: WelfareSelectOptionType
  dateSelect: WelfareSelectOptionType
  fromDate: string
  toDate: string
}

enum MemberPointDateSelectType {
  ALLOCATION_DATE = 'ALLOC_DATE',
  ADJUSTMENT_DATE = 'ADJUST_DATE',
  USE_START_DATE = 'USE_START_DATE',
  USE_END_DATE = 'USE_END_DATE'
}

enum MemberPointRegistrationDateSelectType {
  ALLOCATION = 'ALLOCATION',
  ADJUSTMENT = 'ADJUSTMENT'
}

export const memberPointAllocationListModelConfig = {
  listInputRow1: [
    {
      label: '복지포인트 배정명',
      placeholder: '포인트 명 입력',
      field: 'pointAllocationName'
    },
    {
      label: '복지포인트 배정코드',
      placeholder: '포인트 코드 입력',
      field: 'pointAllocationCode'
    }
  ],
  listSelectRow2: [
    {
      label: '복지포인트 유형',
      field: 'pointType',
      options: [
        { label: '전체', value: '' },
        { label: '명절포인트 ', value: MemberPointDetailedCategoryType.NORMAL_HOLIDAY },
        { label: '생일포인트 ', value: MemberPointDetailedCategoryType.NORMAL_EVENT },
        { label: '이벤트', value: MemberPointDetailedCategoryType.SPECIAL_EVENT }
      ],
      optionsNormal: [
        { label: '전체', value: MemberPointDetailedCategoryType.NORMAL_ALL },
        { label: '명절포인트 ', value: MemberPointDetailedCategoryType.NORMAL_HOLIDAY },
        { label: '이벤트', value: MemberPointDetailedCategoryType.SPECIAL_EVENT }
      ],
      optionsSpecial: [
        { label: '전체', value: MemberPointDetailedCategoryType.SPECIAL_ALL },
        { label: '생일포인트', value: MemberPointDetailedCategoryType.SPECIAL_BIRTHDAY },
        { label: '이벤트', value: MemberPointDetailedCategoryType.SPECIAL_EVENT }
      ]
    },
    {
      label: '등록 상태',
      field: 'registrationStatus',
      options: [
        { label: '전체', value: '1' },
        { label: '명절포인트 ', value: '2' },
        { label: '생일포인트 ', value: '3' },
        { label: '이벤트', value: '4' }
      ],
      optionsNormal: [
        { label: '전체', value: '' },
        { label: '배정등록', value: MemberPointRegistrationDateSelectType.ALLOCATION },
        { label: '조정등록', value: MemberPointRegistrationDateSelectType.ADJUSTMENT }
      ],
      optionsSpecial: [
        { label: '전체', value: '1' },
        { label: '생일포인트', value: '2' },
        { label: '이벤트', value: '3' }
      ]
    }
  ],
  listRadioLevelMember: {
    label: '복지포인트 구분',
    field: 'pointClassification',
    options: [
      { label: '전체', value: '' },
      { label: '선복 복지포인트', value: MemberPointProcessCategoryType.NORMAL },
      { label: '특별 복지포인트', value: MemberPointProcessCategoryType.SPECIAL }
    ]
  },
  listSelectDate: {
    label: '등록일',
    field: 'dateSelect',
    options: [
      { label: '등록일', value: MemberPointDateSelectType.ADJUSTMENT_DATE },
      { label: '조정일 ', value: MemberPointDateSelectType.ALLOCATION_DATE },
      { label: '사용 시작일', value: MemberPointDateSelectType.USE_START_DATE },
      { label: '사용 종료일', value: MemberPointDateSelectType.USE_END_DATE }
    ]
  }
}
export const MemberWelfarePointAllocationTableConfig = [
  {
    header: 'No.',
    field: 'no',
    class: 'wf_m-w-50'
  },
  {
    header: '고객사코드',
    field: 'customerKey',
    class: 'wf_m-w-120'
  },
  {
    header: '고객사',
    field: 'customerName',
    class: 'wf_m-w-120'
  },
  {
    header: '복지포인트 배정 코드',
    field: 'pointKey',
    class: 'wf_m-w-200'
  },
  {
    header: '복지포인트 구분',
    field: 'processCategory',
    class: 'wf_m-w-168'
  },
  {
    header: '복지포인트 유형',
    field: 'detailedCategory',
    class: 'wf_m-w-140 '
  },
  {
    header: '복지포인트 배정명',
    field: 'pointName',
    class: 'wf_m-w-231'
  },
  {
    header: '배정 복지포인트',
    field: 'pointAmount',
    class: 'wf_m-w-120 '
  },
  {
    header: '대상자수',
    field: 'foMemberCount',
    class: 'wf_m-w-100'
  },
  {
    header: '등록상태',
    field: 'registrationStatus',
    class: 'wf_m-w-150'
  },
  {
    header: '기준년도',
    field: 'baseYear',
    class: 'wf_m-w-200'
  },
  {
    header: '사용시작',
    field: 'startUsing',
    class: 'wf_m-w-200'
  },
  {
    header: '사용종료',
    field: 'endOfUse',
    class: 'wf_m-w-200'
  },
  {
    header: '등록일자',
    field: 'registeredDate',
    class: 'wf_m-w-200'
  },
  {
    header: '등록자',
    field: 'register',
    class: 'wf_m-w-200'
  },
  {
    header: '조정일자',
    field: 'adjustmentDate',
    class: 'wf_m-w-200'
  },
  {
    header: '조정자',
    field: 'coordinator',
    class: 'wf_m-w-120'
  }
]
export interface MemberCustomerCompanySelectModel {
  customerKey: number
  customerName: string
}
