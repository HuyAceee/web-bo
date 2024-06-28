export const memberBulkRegistrationTableHeaders = [
  // 'id',
  // 'memberShipCode',
  '회원명 *',
  '아이디(이메일) *',
  '휴대폰번호 *',
  '생년월일 *',
  '성별 *',
  '사번 *',
  '직급 *',
  '재직상태 *',
  '계정상태 *',
  '회원등급 *',
  '고객사코드 *',
  '고객사 *',
  '고객사 주소 *'
]

export const memberReasonRefusedHeaderName = '실패 사유'

export interface MemberRegistrationModel {
  id: number
  memberShipCode: string
  name: string
  email: string
  phone: string
  dateOfBirth: string
  gender: string
  jobNumber: string
  rank: string
  employeeStatus: string
  accountStatus: string
  memberShipLevel: string
  customerCompanyCode: number
  customer: string
  address: string
  isSelected?: string
  reasonRefused?: string
  companyZipCode?: number
  companyLoadNameAddress?: string
  companyLoadLotBasedAddress?: string
  companyDetailedAddress?: string
}

export const memberBulkRegistrationFields = [
  // 'id',
  // 'memberShipCode',
  'name',
  'email',
  'phone',
  'dateOfBirth',
  'gender',
  'jobNumber',
  'rank',
  'employeeStatus',
  'accountStatus',
  'memberShipLevel',
  'customerCompanyCode',
  'customer',
  'address'
]

export const memberReasonRefusedFieldName = 'reasonRefused'

export const memberBulkRegistrationXlsxSheetName = 'List_Registration'
