import { WelfareSelectOptionType } from '@/models'

export interface CompanyCustomerListFormModel {
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
  CustomerCompanyCode = 'KEY',
  CompanyRegistrationNumber = 'BIZ_REG_NUMBER',
  RegistrantID = 'REGISTER_ID'
}

export enum EContractStatus {
  All = '',
  Expected = '02',
  Contract = '01',
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

export const companyCustomerFormModelConfig = {
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

enum ECompanyExportHeaders {
  No = 'No.',
  CustomerCompanyCode = '고객사코드',
  CustomerName = '고객사명',
  CustomerStatus = '고객사상태',
  ContractStatus = '계약상태',
  ContractStartDateTime = '계약시작일시',
  ContractEndDateTime = '계약종료일시',
  Registrant = '등록자',
  DateOfRegistration = '등록일시'
}

export const companyCustomerTableHeaders = [
  ECompanyExportHeaders.No,
  ECompanyExportHeaders.CustomerCompanyCode,
  ECompanyExportHeaders.CustomerName,
  ECompanyExportHeaders.CustomerStatus,
  ECompanyExportHeaders.ContractStatus,
  ECompanyExportHeaders.ContractStartDateTime,
  ECompanyExportHeaders.ContractEndDateTime,
  ECompanyExportHeaders.Registrant,
  ECompanyExportHeaders.DateOfRegistration
]
export const companyCustomerXlsxSheetName = 'List_CompanyCustomer'

export const companyCustomerHeaderFieldTableCompanyCustomerListConfig = [
  [
    {
      header: 'No.',
      field: 'no',
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

export interface CompanyCustomerListDataTableModel {
  customerKey: number
  customerName: string
  customerStatus: string
  contractStatus: string
  contractStartDate: string
  contractEndDate: string
  no: number
  auditing: CompanyAuditingModel
}

export interface CompanyAuditingModel {
  registerKey: number
  registerId: string
  registerName: string
  registeredDate: string
  modifierKey: number
  modifierId: string
  modifierName: string
  modifiedDate: string
}

export class DownloadCustomerListConvertor {
  static from(data: CompanyCustomerListDataTableModel): { [key in ECompanyExportHeaders]: any } {
    return {
      [ECompanyExportHeaders.No]: data.no,
      [ECompanyExportHeaders.CustomerCompanyCode]: data.customerKey,
      [ECompanyExportHeaders.CustomerName]: data.customerName,
      [ECompanyExportHeaders.CustomerStatus]: CustomerStatusEnumObject[data.customerStatus as ECustomerStatus]?.label || '',
      [ECompanyExportHeaders.ContractStatus]: ContractStatusEnumObject[data.contractStatus as EContractStatus]?.label || '',
      [ECompanyExportHeaders.ContractStartDateTime]: data.contractStartDate,
      [ECompanyExportHeaders.ContractEndDateTime]: data.contractEndDate,
      [ECompanyExportHeaders.Registrant]: `${data['auditing']['registerName']}
      ${data['auditing']['registerKey'] ? `(${data['auditing']['registerKey']})` : ``}`,
      [ECompanyExportHeaders.DateOfRegistration]: data.auditing.registeredDate
    }
  }
}

export const COMPANY_ACTIVATE_MESSAGE = `선택하신 고객사의 상태를
<br>‘활성’ 으로 변경하시겠습니까?
`

export const COMPANY_UNACTIVE_MESSAGE = `선택하신 고객사의 상태를
<br>‘비활성’상태로 변경하시겠습니까?
`
