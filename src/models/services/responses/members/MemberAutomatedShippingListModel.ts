export interface MemberAutomatedShippingListFormModel {
  shippingCategory: number
  shippingTemplate?: any
  isUse: number
  dateSelect?: any
  fromDate: string
  toDate: string
  keyword: string
  customer?: string
}

export const memberOptionsShippingCategoryConfig = [
  { label: '전체', value: 1 },
  { label: '알림톡', value: 2 },
  { label: '문자', value: 3 },
  { label: '앱푸시', value: 4 },
  { label: '이메일', value: 5 }
]

export const memberOptionsIsUseConfig = [
  { label: '전체', value: 1 },
  { label: '사용', value: 2 },
  { label: '미사용', value: 3 }
]

export const memberListSelectDateOptionsConfig = [
  { label: '회원등록일시', value: '1' },
  { label: '최근 접속일 ', value: '2' }
]
