import { WelfareSelectOptionType } from '@/models'

export interface MemberListFormModel {
  codeCustomer: string
  nameMember: string
  codeMember: string
  email: string
  employeePhone: string
  phone: string
  employmentStatus: WelfareSelectOptionType
  accountStatus: WelfareSelectOptionType
  membershipLevel: string
  dateSelect?: WelfareSelectOptionType
  fromDate: string
  toDate: string
}

export const memberFormModelConfig = {
  listInputRow1: [
    {
      placeholder: '이름 입력',
      label: '회원명',
      field: 'nameMember'
    },
    {
      placeholder: '회원코드 입력',
      label: '회원코드',
      field: 'codeMember'
    },
    {
      placeholder: '@포함 이메일주소입력',
      label: '아이디(이메일)',
      field: 'email',
      type: 'email'
    }
  ],
  listInputRow2: [
    {
      placeholder: '사번 입력',
      label: '사번',
      field: 'employeePhone'
    },
    {
      placeholder: '“-”없이 숫자만 입력',
      label: '휴대폰번호',
      field: 'phone',
      type: 'number'
    }
  ],
  listSelectRow2: [
    {
      label: '재직상태',
      field: 'employmentStatus',
      options: [
        { label: '전체', value: '1' },
        { label: '재직 ', value: '2' },
        { label: '퇴사 ', value: '3' }
      ]
    },
    {
      label: '계정상태',
      field: 'accountStatus',
      options: [
        { label: '전체', value: '1' },
        { label: '사용 ', value: '2' },
        { label: '미사용 ', value: '3' }
      ]
    }
  ],
  listRadioLevelMember: {
    label: '회원등급',
    field: 'membershipLevel',
    options: [
      { label: '전체', value: '1' },
      { label: '일반', value: '2' },
      { label: '블랙', value: '3' }
    ]
  },
  listSelectDate: {
    label: '조회기간',
    field: 'dateSelect',
    options: [
      { label: '회원등록일시', value: 'REG' },
      { label: '최근 접속일 ', value: 'LOGIN' }
    ]
  }
}

export const memberTableHeaders = [
  '회원코드',
  '회원명',
  '아이디(이메일)',
  '휴대폰번호',
  '성별',
  '사번',
  '직급',
  '재직상태',
  '계정상태',
  '회원등급',
  '고객사코드',
  '고객사',
  '고객사 주소',
  '인증여부',
  '마케팅 동의',
  '최근 접속일',
  '회원등록일시'
]
export const memberXlsxSheetName = 'List_Member'

export const memberHeaderFieldTableMemberListConfig = [
  [
    {
      header: '회원명',
      field: 'name',
      class: 'wf_m-w-120 '
    },
    {
      header: '아이디(이메일)',
      field: 'email',
      class: 'wf_m-w-300 '
    },
    {
      header: '휴대폰번호',
      field: 'phone',
      class: 'wf_m-w-120 '
    },
    {
      header: '성별',
      field: 'gender',
      class: 'wf_m-w-80 '
    },
    {
      header: '사번',
      field: 'employeeNumber',
      class: 'wf_m-w-120 '
    },
    {
      header: '직급',
      field: 'rank',
      class: 'wf_m-w-80 '
    },
    {
      header: '재직상태',
      field: 'holdingOfficeYn',
      class: 'wf_m-w-80'
    },
    {
      header: '계정상태',
      field: 'accountStatus',
      class: 'wf_m-w-100 '
    },
    {
      header: '회원등급',
      field: 'membershipLevel',
      class: 'wf_m-w-100'
    }
  ],
  [
    {
      header: '고객사코드',
      field: 'customerCompanyCode',
      class: 'wf_m-w-120'
    },
    {
      header: '고객사',
      field: 'customer',
      class: 'wf_m-w-200'
    },
    {
      header: '고객사 주소',
      field: 'customerAddress',
      class: 'wf_m-w-380'
    },
    {
      header: '인증여부',
      field: 'authenticationYn',
      class: 'wf_m-w-150'
    },
    {
      header: '마케팅 동의',
      field: 'marketingConsent',
      class: 'wf_m-w-120 '
    },
    {
      header: '최근 접속일',
      field: 'lastAccessDate',
      class: 'wf_m-w-200'
    },
    {
      header: '회원등록일시',
      field: 'registrationDateTime',
      class: 'wf_m-w-200'
    }
  ]
]

export interface MemberListDataTableModel {
  code: string
  name: string
  email: string
  phone: string
  gender: string
  employeeNumber: string
  rank: string
  employmentStatus: string
  accountStatus: string
  membershipLevel: string
  customerCompanyCode: string
  customer: string
  customerAddress: string
  certification: string
  marketingConsent: string
  lastAccessDate: string
  registrationDateTime: string
}
