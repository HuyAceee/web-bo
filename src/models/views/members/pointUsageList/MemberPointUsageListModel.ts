import { ButtonDateModel, DataTableContainerConfigModel, WelfareSelectOptionType } from '@/models'
import {
  MemberPointDetailedCategoryType,
  MemberPointManagementKindType,
  MemberPointProcessCategoryType,
  MenberPointTargetKindType
} from '@/models/views/members/memberWelfarePoint/MemberWelfarePointModel'

export const memberPointUsageHeaderTableConfig: DataTableContainerConfigModel[] = [
  {
    header: '고객사코드',
    field: 'companyCode',
    class: 'wf_m-w-120 '
  },
  {
    header: '고객사',
    field: 'customer',
    class: 'wf_m-w-150'
  },
  {
    header: '회원코드',
    field: 'memberKey',
    class: 'wf_m-w-120 '
  },
  {
    header: '회원명',
    field: 'nameEmployee',
    class: 'wf_m-w-150 '
  },
  {
    header: '재직상태',
    field: 'employmentStatus',
    class: 'wf_m-w-120 '
  },
  {
    header: '계정상태',
    field: 'accountStatus',
    class: 'wf_m-w-120 '
  },
  {
    header: '회원등급',
    field: 'gradeCode',
    class: 'wf_m-w-120 '
  },
  {
    header: '사용 가능 복지포인트',
    field: 'welfarePointsAvailable',
    class: 'wf_m-w-150 '
  },
  {
    header: '소멸 예정 복지포인트',
    field: 'welfarePointsScheduledToExpire',
    class: 'wf_m-w-150 '
  },
  {
    header: '회원 등록일',
    field: 'memberRegistrationDate',
    class: 'wf_m-w-120 '
  }
]

export const memberPointUsageMemberHeaderName = [
  '객사코드',
  '고객사',
  '회원코드',
  '회원명',
  '재직상태',
  '계정상태',
  '회원등급',
  '사용 가능 복지포인트',
  '소멸 예정 복지포인트',
  '회원 등록일'
]
export type MemberDataExcelModel = {
  data: any[]
  sheetName: string
  customHeader?: string[]
  columnWidth?: number
}

export interface MemberPointUsageListDataTableModel {
  companyCode: string
  customer: string
  memberKey: string
  accountStatus: string
  nameEmployee: string
  employmentStatus: string
  gradeCode: string
  welfarePointsAvailable: string
  welfarePointsScheduledToExpire: string
  memberRegistrationDate: string
}

export const memberPointUsageCustomerHeaderTableConfig: DataTableContainerConfigModel[] = [
  {
    header: '고객사코드',
    field: 'customerCompanyCode',
    class: 'wf_m-w-150 '
  },
  {
    header: '고객사',
    field: 'customer',
    class: 'wf_m-w-168 '
  },
  {
    header: '계약상태',
    field: 'contactStatus',
    class: 'wf_m-w-128 '
  },
  {
    header: '재직',
    field: 'numberOfCustomerTenure',
    class: 'wf_m-w-168 '
  },
  {
    header: '퇴사',
    field: 'numberOfCustomerLeave',
    class: 'wf_m-w-168 '
  },
  {
    header: '사용',
    field: 'totalHeldPoints',
    class: 'wf_m-w-150 '
  },
  {
    header: '미사용',
    field: 'totalUsedPoints',
    class: 'wf_m-w-150 '
  },
  {
    header: '사용 가능 복지포인트',
    field: 'totalAdjustmentPointAddition',
    class: 'wf_m-w-150 '
  },
  {
    header: '소멸 예정 복지포인트',
    field: 'totalAdjustmentPointDeduction',
    class: 'wf_m-w-150 '
  }
]

export const memberPointUsageCustomerHeaderName = [
  '고객사코드',
  '고객사',
  '계약상태',
  '재직',
  '퇴사',
  '사용',
  '미사용',
  '사용 가능 복지포인트',
  '소멸 예정 복지포인트'
]

export interface MemberPointUsageCustomerDataTableModel {
  id?: string
  customerCompanyCode: string
  customer: string
  contactStatus: string
  numberOfCustomerTenure: string
  numberOfCustomerLeave: string
  totalHeldPoints: string
  totalUsedPoints: string
  totalAdjustmentPointAddition: string
  totalAdjustmentPointDeduction: string
}

export const memberPointUsageDetailsHeaderTableConfig: DataTableContainerConfigModel[] = [
  {
    header: 'No.',
    field: 'index',
    class: 'wf_m-w-64 '
  },
  {
    header: '발생일자',
    field: 'processDate',
    class: 'wf_m-w-120 '
  },
  {
    header: '회원명(회원코드)',
    field: 'memberName',
    class: 'wf_m-w-150 '
  },
  {
    header: '복지포인트 코드',
    field: 'pointKey',
    class: 'wf_m-w-120 '
  },
  {
    header: '복지포인트 처리명',
    field: 'pointName',
    class: 'wf_m-w-200 '
  },
  {
    header: '발생 구분',
    field: 'useKindName',
    class: 'wf_m-w-150 '
  },
  {
    header: '복지포인트',
    field: 'pointAmount',
    class: 'wf_m-w-150 '
  },
  {
    header: '유효기간',
    field: 'useValidDateUsing',
    class: 'wf_m-w-200 '
  },
  {
    header: '주문코드',
    field: 'orderKey',
    class: 'wf_m-w-150 '
  },
  {
    header: '고객사명(고객사코드)',
    field: 'customerName',
    class: 'wf_m-w-140-not-important '
  }
]

export interface MemberPointUsageDetailsDataTableModel {
  useKey: number
  foMemberKey: number
  foMemberName: string
  customerKey: number
  customerName: string
  pointKey: number
  detail: string
  order: {
    orderKey: number
    productClass: {
      code: number
      title: string
    }
  }
  useKind: {
    code: number
    title: string
  }
  pointAmount: number
  pointName: string
  processContents: string
  processDate: string
  useValidDate: {
    startDate: string
    endDate: string
  }
  pointBalance: number
  auditing: {
    registerKey: number
    registerId: string
    registerName: string
    registeredDate: string
    modifierKey: number
    modifierId: string
    modifierName: string
    modifiedDate: string
  }
}

export interface MemberPointUsageListFormModel {
  customerKey: string
  memberName: string
  memberKey: string
  employmentStatus: WelfareSelectOptionType
  accountStatus: WelfareSelectOptionType
  fromDate: string
  toDate: string
  searchType: WelfareSelectOptionType
  searchTerm: string
}

export interface MemberPointUsageListFormConvertModel {
  customerKey: string
  memberName: string
  memberKey: string
  employmentStatus: string
  accountStatus: string
  fromDate: string
  toDate: string
  searchType: WelfareSelectOptionType
  searchTerm: string
}

export enum MemberHoldingOfficeStatus {
  IN_OFFICE = 'Y',
  LEAVE_OFFICE = 'N'
}

enum MemberAccountStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

export enum MemberSearchTypeStatus {
  MEMBER_KEY = 'MEMBER_KEY',
  MEMBER_NAME = 'MEMBER_NAME'
}

export const memberEmploymentStatusOptions: WelfareSelectOptionType[] = [
  { label: '전체', value: 'all' },
  { label: '재직', value: MemberHoldingOfficeStatus.IN_OFFICE },
  { label: '퇴사', value: MemberHoldingOfficeStatus.LEAVE_OFFICE }
]

export const memberAccountStatusOptions: WelfareSelectOptionType[] = [
  { label: '전체', value: 'all' },
  { label: '사용', value: MemberAccountStatus.ACTIVE },
  { label: '미사용', value: MemberAccountStatus.INACTIVE }
]

export const memberWelfareKeywordSearchTypeOptions: WelfareSelectOptionType[] = [
  { label: '회원명', value: MemberSearchTypeStatus.MEMBER_NAME },
  { label: '회원코드', value: MemberSearchTypeStatus.MEMBER_KEY }
]

export const memberListSelectDateOptions: WelfareSelectOptionType[] = [
  { label: '회원등록일시', value: '회원등록일시' },
  { label: '최근 접속일', value: '최근 접속일' }
]

export const memberListButtonDateFilter: ButtonDateModel[] = [
  {
    label: '오늘',
    class: 'wf_w-55',
    value: 0
  },
  {
    label: '7일',
    class: 'wf_w-55',
    value: 6
  },
  {
    label: '1개월',
    class: 'wf_w-55',
    value: 29
  },
  {
    label: '3개월',
    class: 'wf_w-55',
    value: 89
  },
  {
    label: '1년',
    class: 'wf_w-55',
    value: 364
  }
]

export interface MemberDeliveryPointAllocationAdjustmentListModel {
  customerKey?: number | string
  pointKey: number | string
  customerName: string
  managementKind: {
    code: MemberPointManagementKindType
    title: string
  }
  processCategory: {
    code: MemberPointProcessCategoryType
    title: string
  }
  detailedCategory: {
    code: MemberPointDetailedCategoryType
    title: string
  }
  targetKind: {
    code: MenberPointTargetKindType
    title: string
  }
  managerMemo?: string
  processReason?: string
  pointName: string
  pointAmount: number | string
  useStartDate: string
  useEndDate: string
  allocationDate?: string
  adjustmentDate?: string
  deductionDate?: string
  foMemberCount?: number | string
  auditing?: {
    registerKey: number | string
    registerId: string
    registerName: string
    registeredDate: string
    modifierKey: number | string
    modifierId: string
    modifierName: string
    modifiedDate: string
  }
  useValidDate: {
    startDate: string
    endDate?: string
  }
  foMemberList: {
    pointMemberKey: number
    pointKey: number
    memberDetails: {
      memberKey: number
      memberId: string
      memberName: string
      cellphone: string
      customerDetails: {
        customerKey: number
        customerName: string
      }
    }
    pointAmount: number
    useValidDate: {
      startDate: string
      endDate: string
    }
    managerMemo: string
  }[]
}

export interface MemberPointCustomerCompaniesModel {
  customerKey: number
  customerName: string
  contractStatus: string
  inOfficeMemberCount: number
  leaveOfficeMemberCount: number
  activeMemberCount: number
  inactiveMemberCount: number
  totalAvailablePoint: number
  totalExpiringPoint: number
}

export interface MemberPointUsageListModel {
  memberKey: number
  memberId: string
  memberName: string
  cellphoneNumber: string
  accountStatusCode: string
  gradeCode: string
  genderCode: string
  latestLoginDate: string
  pointBalance: number
  extinctionScheduledPoint: number
  company: {
    customerKey: number
    customerName: string
    employeeNumber: string
    holdingOfficeYn: {
      code: string
      title: string
    }
    rankName: string
    companyLoadNameAddress: string
    contractRegDate: string
  }
  agreement: {
    marketingAgreeYn: {
      code: string
      title: string
    }
  }
  authenticationYn: string
  auditing: {
    registerKey: number
    registerId: string
    registerName: string
    registeredDate: string
    modifierKey: number
    modifierId: string
    modifierName: string
    modifiedDate: string
  }
}

export enum MemberContractStatus {
  STARTED = '01',
  UPCOMING = '02',
  TERMINATED = '03'
}

export const ContractStatusOptions = [
  {
    label: '계약 진행 중',
    value: MemberContractStatus.STARTED
  },
  {
    label: '계약 완료',
    value: MemberContractStatus.TERMINATED
  },
  {
    label: '계약 예정',
    value: MemberContractStatus.UPCOMING
  }
]
