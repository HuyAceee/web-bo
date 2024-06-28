export enum MemberPointManagementKindType {
  ALLOCATION = 'ALLOCATION',
  DEDUCTION = 'DEDUCTION',
  ADJUSTMENT = 'ADJUSTMENT'
}

export enum MemberPointProcessCategoryType {
  NORMAL = 'NORMAL',
  SPECIAL = 'SPECIAL'
}

export const memberPointProcessCategoryOptions = [
  {
    label: '선복 복지포인트',
    value: MemberPointProcessCategoryType.NORMAL
  },
  {
    label: '특별 복지포인트',
    value: MemberPointProcessCategoryType.SPECIAL
  }
]

export enum MenberPointTargetKindType {
  ALL_MEMBER = 'ALL',
  SPECIFIC_MEMBER = 'SPECIFIC',
  BULK_ALLOCATION = 'BULK'
}

export const memberPointTargetKindOptions = [
  {
    label: '전체 회원',
    value: MenberPointTargetKindType.ALL_MEMBER
  },
  {
    label: '회원 지정',
    value: MenberPointTargetKindType.SPECIFIC_MEMBER
  },
  {
    label: '일괄 지정',
    value: MenberPointTargetKindType.BULK_ALLOCATION
  }
]

export enum MemberPointDetailedCategoryType {
  NORMAL_ALL = 'N_ALL',
  NORMAL_HOLIDAY = 'N_HOLIDAY',
  NORMAL_EVENT = 'N_EVENT',
  SPECIAL_ALL = 'S_ALL',
  SPECIAL_BIRTHDAY = 'S_BIRTHDAY',
  SPECIAL_EVENT = 'S_EVENT'
}

export const memberPointNormalDetailedCategoryOptions = [
  { label: '전체', value: MemberPointDetailedCategoryType.NORMAL_ALL },
  { label: '명절포인트', value: MemberPointDetailedCategoryType.NORMAL_HOLIDAY },
  { label: '이벤트', value: MemberPointDetailedCategoryType.NORMAL_EVENT },
]

export const memberPointSpecialDetailedCategoryOptions = [
  { label: '전체', value: MemberPointDetailedCategoryType.SPECIAL_ALL },
  { label: '생일포인트', value: MemberPointDetailedCategoryType.SPECIAL_BIRTHDAY },
  { label: '전체', value: MemberPointDetailedCategoryType.SPECIAL_EVENT },
]

export interface MemberPointRegistrationFormModel {
  targetKind?: MenberPointTargetKindType
  processCategory?: MemberPointProcessCategoryType
  detailedCategory?: MemberPointDetailedCategoryType
  pointName?: string
  pointAmount?: string | number
  useStartDate?: string,
  useEndDate?: string,
  managementKind?: MemberPointManagementKindType,
  managerMemo?: string
  processReason?: string
}

export interface MemberPointDeductionRegistrationParamsModel {
  customerKey?: string
  pointKey?: string
}