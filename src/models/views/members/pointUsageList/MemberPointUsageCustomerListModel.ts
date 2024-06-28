import { DataTableContainerConfigModel, WelfareSelectOptionType } from '@/models'

export const memberPUCustomerListHeaderTableConfig: DataTableContainerConfigModel[] = [
  {
    header: '고객사코드',
    field: 'customerCompanyCode',
    class: 'wf_m-w-114 '
  },
  {
    header: '고객사',
    field: 'customer',
    class: 'wf_m-w-120 '
  },
  {
    header: '계약상태',
    field: 'contractStatus',
    class: 'wf_m-w-120 '
  },

  {
    header: '전체 회원 수',
    field: 'totalMembers',
    class: 'wf_m-w-128 '
  },
  {
    header: '재직',
    field: 'tenure',
    class: 'wf_m-w-111 '
  },
  {
    header: '퇴사',
    field: 'leave',
    class: 'wf_m-w-111 '
  },
  {
    header: '계정상태',
    field: 'accountStatus',
    class: 'wf_m-w-111 '
  },
  {
    header: '사용 가능 복지포인트',
    field: 'pointAvailable',
    class: 'wf_m-w-140 '
  },
  {
    header: '소멸 예정 복지포인트',
    field: 'pointScheduledExpire',
    class: 'wf_m-w-140 '
  },
  {
    header: '고객사 계약일',
    field: 'customerContractDate',
    class: 'wf_m-w-200 '
  },
  {
    header: '고객사 계약 종료일',
    field: 'customerContractEndDate',
    class: 'wf_m-w-200 wf_w-200 '
  }
]

export interface MemberPUCustomerListDataTableModel {
  customerCompanyCode: string
  customer: string
  contractStatus: string
  totalMembers: string
  accountStatus: string
  pointAvailable: string
  pointScheduledExpire: string
  tenure: string
  leave: string
  customerContractDate: string
  customerContractEndDate: string
}

export const memberPUCustomerCompanyTotalHeaderTableConfig: DataTableContainerConfigModel[] = [
  {
    header: '전체 고객사',
    field: 'totalCustomer',
    class: 'wf_m-w-128 '
  },
  {
    header: '예정',
    field: 'totalExpected',
    class: 'wf_m-w-90 '
  },
  {
    header: '계약',
    field: 'totalContract',
    class: 'wf_m-w-90 '
  },

  {
    header: '계약종료',
    field: 'totalContractTermination',
    class: 'wf_m-w-90 '
  },
  {
    header: '활성',
    field: 'activation',
    class: 'wf_m-w-90 '
  },
  {
    header: '비활성',
    field: 'inActivation',
    class: 'wf_m-w-90 '
  },
  {
    header: '전체 회원수',
    field: 'totalMember',
    class: 'wf_m-w-128 '
  },
  {
    header: '재직',
    field: 'totalTenure',
    class: 'wf_m-w-90 '
  },
  {
    header: '퇴사',
    field: 'totalLeave',
    class: 'wf_m-w-90 '
  },
  {
    header: '사용',
    field: 'totalUse',
    class: 'wf_m-w-90 '
  },
  {
    header: '미사용',
    field: 'totalUnUse',
    class: 'wf_m-w-90 wf_m-w-custom-lastChild '
  },
  {
    header: '사용 가능 복지포인트',
    field: 'totalPointAvailable',
    class: 'wf_m-w-180 wf_w-180 '
  },
  {
    header: '소멸 예정 복지포인트',
    field: 'totalPointExpire',
    class: 'wf_m-w-180 wf_w-180 '
  }
]

export interface MemberPointUsageCustomerListFormModel {
  customerCode?: string
  customerStatus?: WelfareSelectOptionType
  contractStatus?: WelfareSelectOptionType
  memberPoint?: any
  fromDate: string
  toDate: string
  keyword?: string
  customer?: any
  searchType?: WelfareSelectOptionType
}

export interface MemberTotalPointUsageCustomerListFormModel {
  totalCustomer?: number
  totalExpected?: number
  totalContract?: number
  totalContractTermination?: number
  activation?: number
  inActivation?: number
  totalMember?: number
  totalTenure?: number
  totalLeave?: number
  totalUse?: number
  totalUnUse?: number
  totalPointAvailable?: number
  totalPointExpire?: number
}

export const memberPointUsageCustomerListSelectDateOptions = [
  { label: '고객사 등록일', value: '01' },
  { label: '최근 업데이트 일시', value: '02' }
]

export const memberPointUsageCustomerTotalPointOptions = [
  { label: '전체', value: '' },
  { label: '총 사용 포인트', value: '02' },
  { label: '총 잔여 포인트', value: '03' },
  { label: '총 차감 포인트', value: '04' }
]

export const memberPointUsageCustomerSearchOptions = [
  { label: '사용안함', value: '' },
  { label: '고객사', value: '01' },
  { label: '고객사 코드', value: '02' }
]
