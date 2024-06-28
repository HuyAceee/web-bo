export const memberPointUsageRegistrationBulkHeaders = [
  'No.',
  '회원코드',
  '회원명',
  '아이디(이메일)',
  '휴대폰번호',
  '배정 복지포인트',
  '비고(특이사항 메모)',
  '고객사코드',
  '고객사'
]

export const memberPointUsageRegistrationBulkFields = [
  'memberKey',
  'memberName',
  'memberId',
  'cellphoneNumber',
  'pointBalance',
  'managerMemo',
  'customerKey',
  'customerName'
]

export interface MemberPointUsageRegistrationBulkModel {
  id: string
  memberKey: string
  memberName: string
  memberId: string
  cellphoneNumber: string
  pointAmount: string
  managerMemo: string
  client?: string
  clientKey?: string
  customerKey?: string
  customerName?: string
  reasonRefused?: string
  pointBalance?: number
  isSelected?: boolean
}
