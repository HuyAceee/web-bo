import { DataTableContainerConfigModel } from '@/models/uikit'
export interface PartnerContractInformationModel {
  contractKey: number
  sellerKey?: number
  sellerName?: string
  contractStartDate: string
  contractEndDate: string
  contractStatus: string
  contractRegDate?: string
  settlementDate: string
  contractType: string
  contractFileOriginName: string
  contractFileSize: number
  contractFileDownloadLink: string
  auditing: {
    registerKey?: number
    registerId?: string
    registerName: string
    registeredDate?: string
    modifierKey?: number
    modifierId: string
    modifierName: string
  }
}
export interface PartnerContractDataHeaderTableModel {
  id?: number
  contractKey: number
  sellerKey?: number
  contractStartDate?: string
  contractEndDate?: string
  contractStatus?: string
  contractRegDate?: string
  settlementDate?: string
  contractFileOriginName?: string
  contractFileSize?: number
  contractFileDownloadLink?: string
  registerName: string
  registeredDate?: string
}
export const partnerContractDataHeaderTableConfig: DataTableContainerConfigModel[] = [
  {
    header: 'No.',
    field: 'id',
    class: 'wf_m-w-50 '
  },
  {
    header: '계약상태',
    field: 'contractStatus',
    class: 'wf_m-w-150 '
  },
  {
    header: '계약시작일시',
    field: 'contractStartDate',
    class: 'wf_m-w-180 '
  },
  {
    header: '계약종료일시',
    field: 'contractEndDate',
    class: 'wf_m-w-180 '
  },
  {
    header: '계약일',
    field: 'contractRegDate',
    class: 'wf_m-w-180 '
  },
  {
    header: '정산일',
    field: 'settlementDate',
    class: 'wf_m-w-160 '
  },
  {
    header: '계약서',
    field: 'contractFileDownloadLink',
    class: 'wf_m-w-140 '
  },
  {
    header: '등록자',
    field: 'registerName',
    class: 'wf_m-w-200 '
  },
  {
    header: '등록일시',
    field: 'registeredDate',
    class: 'wf_m-w-250 '
  }
]
