import { WelfareSelectOptionType } from '@/models'

export interface AdministratorAccessHistoryListFormModel {
  customerStatus?: string
  customerKey?: string
  customerName?: string
  dateSelect?: WelfareSelectOptionType
  fromDate?: string
  toDate?: string
  contractStatus?: string
  searchType?: WelfareSelectOptionType
  searchWord?: string
}

export enum ECustomerStatus {
  All = 'All',
  Activate = 'Y',
  UnActivate = 'N'
}

// TODO: Mocking ECustomerSearchType
// - Wait response search type enum
export enum ECustomerSearchType {
  NotUsed = '1',
  CustomerCompanyCode = '2',
  CompanyRegistrationNumber = '3',
  RegistrantID = '4'
}

export enum EContractStatus {
  All = '',
  Expected = '01',
  Contract = '02',
  ContractTermination = '03'
}

export const ContractStatusEnumObject = {
  [EContractStatus.All]: {
    id: EContractStatus.All,
    label: '전체',
    class: 'wf_w-52'
  },
  [EContractStatus.Expected]: {
    id: EContractStatus.Expected,
    label: '예정',
    class: 'wf_w-52'
  },
  [EContractStatus.Contract]: {
    id: EContractStatus.Contract,
    label: '계약',
    class: 'wf_w-52'
  },
  [EContractStatus.ContractTermination]: {
    id: EContractStatus.ContractTermination,
    label: '계약 종료',
    class: 'wf_w-76'
  }
}

export const CustomerStatusEnumObject = {
  [ECustomerStatus.All]: { label: '전체', value: ECustomerStatus.All },
  [ECustomerStatus.Activate]: { label: '활성', value: ECustomerStatus.Activate },
  [ECustomerStatus.UnActivate]: { label: '비활성', value: ECustomerStatus.UnActivate }
}

export const administratorAccessHistoryFormModelConfig = {
  listCheckboxContractStatus: {
    title: '계약상태',
    field: 'contractStatus',
    list: Object.values(ContractStatusEnumObject)
  },
  listRadioCustomerStatus: {
    label: '고객사 상태',
    field: 'customerStatus',
    options: Object.values(CustomerStatusEnumObject)
  },
  listTextInput: [
    {
      placeholder: '',
      label: '고객사 코드',
      field: 'customerKey',
      class: 'wf-form-group_pr-8'
    },
    {
      placeholder: '',
      label: '고객사명',
      field: 'customerName',
      class: ''
    }
  ],
  optionsListFilter: [
    { label: '사용안함', value: ECustomerSearchType.NotUsed },
    { label: '고객사코드', value: ECustomerSearchType.CustomerCompanyCode },
    { label: '사업자등록번호', value: ECustomerSearchType.CompanyRegistrationNumber },
    { label: '등록자 아이디', value: ECustomerSearchType.RegistrantID }
  ],

  listSelectDate: {
    label: '등록일',
    field: 'dateSelect',
    options: []
  }
}

export const administratorAccessHistoryTableHeaders = [
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
export const administratorAccessHistoryXlsxSheetName = 'List_AdministratorAccessHistory'

export const administratorAccessHistoryHeaderFieldTableAdministratorAccessHistoryListConfig = [
  [
    {
      header: 'No.',
      field: 'No',
      class: 'wf_m-w-50'
    },
    {
      header: '고객사코드',
      field: 'customerKey',
      class: 'wf_m-w-136'
    },
    {
      header: '고객사명',
      field: 'customerName',
      class: 'wf_m-w-290'
    },
    {
      header: '고객사상태',
      field: 'customerStatus',
      class: 'wf_m-w-120'
    },
    {
      header: '계약상태',
      field: 'contractStatus',
      class: 'wf_m-w-120'
    },
    {
      header: '계약시작일시',
      field: 'contractStartDate',
      class: 'wf_m-w-170'
    },
    {
      header: '계약종료일시',
      field: 'contractEndDate',
      class: 'wf_m-w-170'
    },
    {
      header: '등록자',
      field: 'auditing.registerName',
      class: 'wf_m-w-136'
    },
    {
      header: '등록일시',
      field: 'auditing.registeredDate',
      class: 'wf_m-w-170'
    }
  ]
]

export interface AdministratorAccessHistoryListDataTableModel {
  customerKey: number
  customerName: string
  customerStatus: string
  contractStatus: string
  contractStartDate: string
  contractEndDate: string
  auditing: CompanyAuditing
}

export interface CompanyAuditing {
  registerKey: number
  registerId: string
  registerName: string
  registeredDate: string
  modifierKey: number
  modifierId: string
  modifierName: string
  modifiedDate: string
}
