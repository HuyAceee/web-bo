import { WelfareSelectOptionType } from '@/models'
import { CommonGroupCodeResponse } from '@/models/services/responses/common'
import { MemberPointRegistrationFormModel } from '@/models/views/members/memberWelfarePoint/MemberWelfarePointModel'

export interface MemberPointAdjustmentDeleteListFormModel {
  id: number
  no: number
  membershipCode: string
  memberName: string
  idEmail: string
  phoneNumber: string
  customerCompanyCode: string
  customer: string
  lastAccessDate: string
  delete: string
}

export interface MemberPointAdjustmentTableListFormModel {
  membershipCode: string
  memberName: string
  idEmail: string
  phoneNumber: string
  allocationPoints: string
  individualAdjustmentPoints: string
  pointsAfterAdjustment: string
  adjustmentNotes: string
  remarks: string
  companyCode: string
  customer: string
}

interface MemberPointAuditingModel {
  registerKey: number
  registerId: string
  registerName: string
  registeredDate: string
  modifierKey: number
  modifierId: string
  modifierName: string
  modifiedDate: string
}

interface MemberPointListUseValidDateTypeModel {
  startDate: string
  endDate: string
}

export interface MemberPointAdjustmentListFormModel {
  no: string
  customerKey: string
  pointKey: string
  customerName: string
  managementKind: CommonGroupCodeResponse
  processCategory: CommonGroupCodeResponse
  detailedCategory: CommonGroupCodeResponse
  targetKind: CommonGroupCodeResponse
  pointName: string
  pointAmount: string
  useValidDate?: MemberPointListUseValidDateTypeModel
  allocationDate?: string
  deductionDate?: string
  foMemberCount: string
  auditing: MemberPointAuditingModel
}

export interface MemberPointListFormFieldModel {
  label: string
  field: string
  placeholder?: string
  optionsNormal?: WelfareSelectOptionType[]
  options?: WelfareSelectOptionType[]
  optionsSpecial?: WelfareSelectOptionType[]
}

export const MemberWelfarePointAdjustmentTableConfig = [
  {
    header: 'No.',
    field: 'no',
    class: 'wf_m-w-50'
  },
  {
    header: '고객사 코드',
    field: 'customerKey',
    class: 'wf_m-w-120'
  },
  {
    header: '고객사',
    field: 'customerName',
    class: 'wf_m-w-120'
  },
  {
    header: '복지포인트 차감코드',
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
    header: '복지포인트 차감명',
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
    header: '기준년도',
    field: 'registeredDate',
    class: 'wf_m-w-200'
  },
  {
    header: '사용시작',
    field: 'useStartDate',
    class: 'wf_m-w-200'
  },
  {
    header: '등록자',
    field: 'register',
    class: 'wf_m-w-250'
  }
]

export const MemberPointAdjustmentTableDeleteConfig = [
  {
    header: 'No.',
    field: 'no',
    class: 'wf_m-w-50'
  },
  {
    header: '회원코드',
    field: 'membershipCode',
    class: 'wf_m-w-120'
  },
  {
    header: '회원명',
    field: 'memberName',
    class: 'wf_m-w-120'
  },
  {
    header: '아이디(이메일)',
    field: 'idEmail',
    class: 'wf_m-w-200'
  },
  {
    header: '휴대폰번호',
    field: 'phoneNumber',
    class: 'wf_m-w-200'
  },
  {
    header: '고객사코드',
    field: 'customerCompanyCode',
    class: 'wf_m-w-100 '
  },
  {
    header: '고객사',
    field: 'customer',
    class: 'wf_m-w-200'
  },
  {
    header: '최근접속일',
    field: 'lastAccessDate',
    class: 'wf_m-w-231'
  },
  {
    header: '삭제',
    field: 'delete',
    class: 'wf_m-w-100'
  }
]

export const MemberPointAdjustmentTableUpdateConfig = [
  {
    header: '회원코드',
    field: 'foMemberKey',
    class: 'wf_m-w-80'
  },
  {
    header: '회원명',
    field: 'memberName',
    class: 'wf_m-w-100'
  },
  {
    header: '아이디(이메일)',
    field: 'memberId',
    class: 'wf_m-w-150'
  },
  {
    header: '휴대폰번호',
    field: 'cellphone',
    class: 'wf_m-w-120'
  },
  {
    header: '고객사코드',
    field: 'pointAmount',
    class: 'wf_m-w-100 '
  },
  {
    header: '조정 후 배정 포인트',
    field: 'inputPoint',
    class: 'wf_m-w-231'
  },
  {
    header: '조정 후 배정 포인트',
    field: 'pointAfter',
    class: 'wf_m-w-140'
  },
  {
    header: '조정 메모',
    field: 'inputNote',
    class: 'wf_m-w-100'
  },
  {
    header: '비고(특이사항 메모)',
    field: 'managerMemo',
    class: 'wf_m-w-150'
  },
  {
    header: '고객사코드',
    field: 'customerKey',
    class: 'wf_m-w-120'
  },
  {
    header: '고객사',
    field: 'customerName',
    class: 'wf_m-w-50'
  }
]

export type MemberPointAllocationDetailModel = MemberPointRegistrationFormModel & {
  customerKey?: string | number
  customerName?: string
  pointKey?: string | number
  foMembers?: MemberFOModel[]
  allocationDate?: string
  adjustmentDate?: string
  foMemberCount?: string | number
  registerId?: string
  registerName?: string
  registeredDate?: string
  modifierKey?: string
  modifierId?: string
  modifierName?: string
  modifiedDate?: string
}

export interface MemberFOModel {
  pointMemberKey?: string
  pointAmount?: string
  managerMemo?: string
  foMemberKey?: string
  memberName?: string
  memberId?: string
  cellphone?: string
  customerKey?: string
  customerName?: string
}

export interface MemberPointAdjustmentProps {
  data: MemberFOModel[]
}
