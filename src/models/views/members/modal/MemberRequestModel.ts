import { WelfareSelectOptionType } from '@/models'
import { PaginationModelRequest } from '@/models/services/requests/PaginationModelRequest'
import { MemberSearchType } from './MemberSearchTypeModel'

export interface MemberRequestModel extends PaginationModelRequest {
  memberKey?: string | undefined
  memberName?: string
  memberId?: string
  customerKey?: WelfareSelectOptionType
  employeeNumber?: string
  cellphoneNumber?: string | undefined
  gradeCode?: WelfareSelectOptionType
  accountStatusCode?: WelfareSelectOptionType
  holdingOfficeYn?: WelfareSelectOptionType
  marketingAgreeYn?: WelfareSelectOptionType
  startDate?: string
  endDate?: string
}

export interface MemberRequestTableModel {
  id?: number | string
  memberName: string
  memberId: string
  genderCode: string
  employeeNumber: string
  rankName: string
  gradeCode: string
  customerKey: number
  customerName: string
  companyLoadNameAddress: string
  marketingAgreeYn: string
  registeredDate: string
  latestLoginDate: string
  pointBalance?: number
  managerMemo?: string
  cellphoneNumber?: string
  memberKey?: number
  isSelected?: boolean
  customerStatus: {
    code: string
    title: string
  }
}

export interface MemberSearchTableModel {
  id: number
  customerKey?: string
  memberKey?: string
  memberName: string
  memberId: string
  customerName: string
  employeeNumber: string
  cellphoneNumber: string
  marketingAgreeYn: string
  gradeCode: string
  accountStatusCode: string
  registeredDate: string
  isSelected?: boolean
  customerStatus: {
    code: string
    title: string
  }
}

export interface MemberSearchUsagePointModel {
  companyLoadNameAddress: string
  customerKey: number
  customerName: string
  employeeNumber: string
  genderCode: string
  gradeCode: string
  id: number | string
  isSelected: boolean
  latestLoginDate: string
  managerMemo: string
  marketingAgreeYn: string
  memberId: string
  memberName: string
  pointBalance: number
  rankName: string
  registeredDate: string
  cellphoneNumber: string
  memberKey: number
  pointAmount?: number
  removeRow?: {
    label: string
    onClick: Function
  }
}

export interface MemberRequestSearchModel {
  memberKey: string
  memberName: string
}

export interface MemberRequestModalProps {
  searchInput?: string
  onCancel?: () => void
  onSelect: (value: MemberRequestSearchModel) => void
  onSelectRow?: (value: MemberSearchTableModel | MemberRequestTableModel) => void
  searchResData: MemberRequestSearchModel
  searchType?: MemberSearchType
  defaultDataTable?: MemberSearchTableModel[]
}

export interface MemberSearchRequestModalEmits {
  (e: 'save', data: MemberSearchTableModel[]): void

  (e: 'close'): void
}

export interface MemberSearchModalWrapperProps {
  placeholderInput: string
  labelButton?: string
  defaultValue?: string
  disabled?: boolean
  type?: MemberSearchType
  isDisabledOnEmptySearchText?: boolean
}

export const memberRequestGradeCode: WelfareSelectOptionType[] = [
  { label: '전체', value: '' },
  { label: '일반', value: 'GENERAL' },
  { label: '블랙', value: 'BLACK' }
]
export const memberRequestAccountStatusCodeResponse: WelfareSelectOptionType[] = [
  { label: '전체', value: '' },
  { label: '재직', value: 'ACTIVE' },
  { label: '퇴사', value: 'INACTIVE' }
]

export const memberRequestMarketingAgreeYn: WelfareSelectOptionType[] = [
  { label: '전체', value: '' },
  { label: '동의', value: 'Y' },
  { label: '미동의', value: 'N' }
]
export const memberRequestHoldingOfficeYn: WelfareSelectOptionType[] = [
  { label: '전체', value: '' },
  { label: '재직', value: 'Y' },
  { label: '퇴사', value: 'N' }
]
export const memberRequestTableHeaderConfig = [
  { header: '회원코드', field: 'id', class: 'wf_m-w-120 ' },
  { header: '회원명', field: 'memberName', class: 'wf_m-w-120 ' },
  { header: '아이디(이메일)', field: 'memberId', class: 'wf_m-w-200 ' },
  { header: '성별', field: 'genderCode', class: 'wf_m-w-120 ' },
  { header: '사번', field: 'employeeNumber', class: 'wf_m-w-120 ' },
  { header: '직급', field: 'rankName', class: 'wf_m-w-120 ' },
  { header: '회원구분', field: 'gradeCode', class: 'wf_m-w-120 ' },
  { header: '고객사코드', field: 'customerKey', class: 'wf_m-w-120 ' },
  { header: '고객사', field: 'customerName', class: 'wf_m-w-120 ' },
  { header: '고객사 주소', field: 'companyLoadNameAddress', class: 'wf_m-w-150 wf-company-address' },
  { header: '마케팅 동의', field: 'marketingAgreeYn', class: 'wf_m-w-100 ' },
  { header: '회원등록일', field: 'registeredDate', class: 'wf_m-w-150 ' },
  { header: '최근 접속일', field: 'latestLoginDate', class: 'wf_m-w-150 ' }
]

export const memberSearchTableHeaderConfig = [
  { header: '회원코드', field: 'id', class: 'wf_m-w-120 ' },
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

export const deliveryCodeText = {
  COMPANY: '직장',
  HOME: '자택',
  ETC: '기타'
}
