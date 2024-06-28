import { WelfareSelectOptionType } from '@/models'
import { ComplaintResearchMemberType } from '@/models/views/complaint/modal/ComplainOrderCancelModel'

export interface ComplaintResearchMemberModalProps {
  searchInput?: string
  onCancel?: () => void
  onSelect: (value: ComplaintResearchMemberModel) => void
  searchResData: ComplaintResearchMemberModel
  searchType?: ComplaintResearchMemberType
}

export interface ComplaintResearchMemberModel {
  memberKey: string
  memberName: string
}

export interface ComplaintResearchMemberWrapperProps {
  placeholderInput: string
  labelButton?: string
  defaultValue?: string
  disabled?: boolean
}

export type ComplaintResearchMemberWrapperEmits = (e: 'selectValue', value: ComplaintResearchMemberModel) => void

export const complaintResearchMemberModalRequestGradeCode: WelfareSelectOptionType[] = [
  { label: '전체', value: '' },
  { label: '일반', value: 'GENERAL' },
  { label: '블랙', value: 'BLACK' }
]

export const complaintResearchMemberModalRequestAccountStatusCode: WelfareSelectOptionType[] = [
  { label: '전체', value: '' },
  { label: '사용', value: 'Y' },
  { label: '미사용', value: 'N' }
]

export const complaintResearchMemberModalRequestMarketingAgreeYn: WelfareSelectOptionType[] = [
  { label: '전체', value: '' },
  { label: '동의', value: 'Y' },
  { label: '미동의', value: 'N' }
]

export const complaintResearchMemberModalTableHeaderConfig = [
  { header: '회원코드', field: 'memberKey', class: 'wf_m-w-120 ' },
  { header: '회원명', field: 'memberName', class: 'wf_m-w-120 ' },
  { header: '아이디', field: 'memberId', class: 'wf_m-w-120 ' },
  { header: '고객사', field: 'customerName', class: 'wf_m-w-120 ' },
  { header: '사번', field: 'employeeNumber', class: 'wf_m-w-120 ' },
  { header: '휴대폰번호', field: 'cellphoneNumber', class: 'wf_m-w-120 ' },
  { header: '마케팅 동의', field: 'marketingAgreeYn', class: 'wf_m-w-120 ' },
  { header: '회원구분', field: 'gradeCode', class: 'wf_m-w-120 ' },
  { header: '계정상태', field: 'accountStatusCode', class: 'wf_m-w-120 ' },
  { header: '회원등록일', field: 'registeredDate', class: 'wf_m-w-120 ' }
]
