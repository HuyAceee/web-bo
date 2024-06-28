import { WelfareSelectOptionType } from '@/models'

export interface CompanyContractInformationProps {}

export enum ContractStatus {
  STARTED = '01',
  UPCOMING = '02',
  TERMINATED = '03'
}

export const companyContractInformationContractStatus: WelfareSelectOptionType[] = [
  { label: '계약', value: ContractStatus.STARTED },
  { label: '예정', value: ContractStatus.UPCOMING },
  { label: '계약종료', value: ContractStatus.TERMINATED }
]

export const companyContractInformationExhibitionManagementTableConfig = [
  { header: 'No.', field: 'no', class: 'wf_m-w-50' },
  {
    header: '계약상태',
    field: 'contractStatus',
    class: 'wf_m-w-150'
  },
  {
    header: '계약시작일시',
    field: 'contractStartDate',
    class: 'wf_m-w-150'
  },
  {
    header: '계약종료일시',
    field: 'contractEndDate',
    class: 'wf_m-w-150'
  },
  {
    header: '계약일',
    field: 'contractRegDate',
    class: 'wf_m-w-150'
  },
  {
    header: '정산일',
    field: 'settlementDate',
    class: 'wf_m-w-150'
  },
  {
    header: '계약서',
    field: 'contract',
    class: 'wf_m-w-150'
  },
  {
    header: '등록자',
    field: 'registeredName',
    class: 'wf_m-w-150'
  },
  {
    header: '등록일시',
    field: 'registeredDate',
    class: 'wf_m-w-150'
  }
]

export const companyContractInformationHeaderName = [
  'No.',
  '계약상태',
  '계약시작일시',
  '계약종료일시',
  '계약일',
  '정산일',
  '계약서',
  '등록자',
  '등록일시'
]

export interface CompanyContractInformationExhibitionManagementTableModel {
  id: string
  contractKey: number
  customerKey: number
  contractStartDate: string
  contractEndDate: string
  contractStatus: string
  settlementDate: string
  contractRegDate: string
  contractFileOriginName: string
  contractFileSize: number
  contractFileDownloadLink: string
  auditing: {
    registerKey: number
    registerId: string
    registerName: string
    registeredDate: Date
    modifierKey: number
    modifierId: string
    modifierName: string
    modifiedDate: Date
  }
}

export interface CompanyContractInformationFormModel {
  contractKey: number
  customerKey: number
  contractStartDate: string
  contractEndDate: string
  contractStatus: string
  settlementDate: string
  contractRegDate: string
  contractFileOriginName: string
  contractFileSize: number
  contractFileDownloadLink: string
  registerKey: number
  registerId: string
  registerName: string
  registeredDate: Date
  modifierKey: number
  modifierId: string
  modifierName: string
  modifiedDate: Date
}

export interface CompanyContractInformationExcelModel {
  no: number
  contractStatus: string
  contractStartDate: string
  contractEndDate: string
  contractRegDate: string
  settlementDate: string
  contract: string
  registerName: string
  registeredDate: string
}
