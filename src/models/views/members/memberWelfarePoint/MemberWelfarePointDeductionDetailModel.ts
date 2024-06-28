import { MemberPointProcessCategoryType } from './MemberWelfarePointModel'

export interface MemberPointDeductionFormDetailModel {
  pointCode: string
  pointStatus: string
  pointClassification: MemberPointProcessCategoryType
  pointType: string
  pointDeductionName: string
  deductionDate: string
  deductedWelfarePoints: string
  totalPoints: number
  administratorNotes: string
  processReason: string
}

export const MemberPointDeductionDetailConfig = [
  {
    header: '회원코드',
    field: 'memberKey',
    class: 'wf_m-w-120'
  },
  {
    header: '회원명',
    field: 'memberName',
    class: 'wf_m-w-200'
  },
  {
    header: '아이디(이메일)',
    field: 'memberId',
    class: 'wf_m-w-313'
  },
  {
    header: '휴대폰번호',
    field: 'cellphoneNumber',
    class: 'wf_m-w-200'
  },
  {
    header: '차감 포인트',
    field: 'pointAmount',
    class: 'wf_m-w-200'
  },
  {
    header: '고객사코드',
    field: 'customerKey',
    class: 'wf_m-w-100 '
  },
  {
    header: '고객사',
    field: 'customerName',
    class: 'wf_m-w-200'
  }
]

export interface MemberPointDeductionDetailTableModel {
  id?: string
  memberKey: string
  memberName: string
  memberId: string
  cellphoneNumber: string
  pointAmount?: string
  managerMemo?: string
  client?: string
  clientKey?: string
  customerKey?: string
  customerName?: string
  reasonRefused?: string
  pointBalance?: number
  isSelected?: boolean
}

export interface MemberPointDeductionDetailParamsModel {
  customerKey?: string,
  pointKey?: string
}