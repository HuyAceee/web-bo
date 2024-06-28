import { DataTableContainerConfigModel } from '@/models/uikit'

export const partnerListDataHeaderTableModel: DataTableContainerConfigModel[] = [
  {
    header: 'No.',
    field: 'id',
    class: 'wf_m-w-40 '
  },
  {
    header: '판매사코드',
    field: 'seller_code',
    class: 'wf_m-w-100 '
  },
  {
    header: '판매사명',
    field: 'sales_company_name',
    class: 'wf_m-w-220 '
  },
  {
    header: '판매사상태',
    field: 'seller_status',
    class: 'wf_m-w-100 '
  },
  {
    header: '계약상태',
    field: 'contract_status',
    class: 'wf_m-w-100 '
  },
  {
    header: '계약시작일시',
    field: 'contract_start_date_time',
    class: 'wf_m-w-160 '
  },
  {
    header: '계약종료일시',
    field: 'contract_end_date_time',
    class: 'wf_m-w-160 '
  },
  {
    header: '계약유형',
    field: 'contract_type',
    class: 'wf_m-w-100 '
  },
  {
    header: '사업자등록번호',
    field: 'company_registration_number',
    class: 'wf_m-w-120 '
  },
  {
    header: '등록자',
    field: 'registrant',
    class: 'wf_m-w-100 '
  },
  {
    header: '등록일시',
    field: 'registration_date_time',
    class: 'wf_m-w-160  '
  }
]

export interface PartnerListTableDataModel {
  id: string
  seller_code: string
  sales_company_name: string
  seller_status: string
  contract_status: string
  contract_start_date_time: string
  contract_end_date_time: string
  contract_type: string
  company_registration_number: string
  registrant: string
  registration_date_time: string
}
