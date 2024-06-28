import { DataTableContainerConfigModel, ProductSearchRecordModel } from '@/models'

export const ProductSearchSellerTableHeaderConfig: DataTableContainerConfigModel[] = [
  {
    header: '판매사코드',
    field: 'id'
  },
  {
    header: '판매사명',
    field: 'name'
  },
  {
    header: '판매사상태',
    field: 'status'
  },
  {
    header: '사업자등록번호',
    field: 'registrationCode'
  },
  {
    header: '법인등록번호',
    field: 'companyRegistrationCode'
  },
  {
    header: '계약상태',
    field: 'contractStatus'
  },
  {
    header: '계약시작일',
    field: 'startContractDate'
  },
  {
    header: '계약종료일',
    field: 'endContractDate'
  },
  {
    header: '등록일',
    field: 'registrationDate'
  }
]
export const ProductSearchCustomerTableHeaderConfig: DataTableContainerConfigModel[] = [
  {
    header: '고객사코드',
    field: 'id'
  },
  {
    header: '고객사명',
    field: 'name'
  },
  {
    header: '고객사상태',
    field: 'status'
  },
  {
    header: '사업자등록번호',
    field: 'registrationCode'
  },
  {
    header: '법인등록번호',
    field: 'companyRegistrationCode'
  },
  {
    header: '계약상태',
    field: 'contractStatus'
  },
  {
    header: '계약시작일',
    field: 'startContractDate'
  },
  {
    header: '계약종료일',
    field: 'endContractDate'
  },
  {
    header: '등록일',
    field: 'registrationDate'
  }
]

export interface ProductSearchModalModel {
  id: string
  promotion_name: string
  discount_classification: string
  seller_code: string
  seller: string
  coupon_applies: string
  promotion_period: string
  progress: string
  registrant: string
  isRowSelected?: boolean
}

export const defaultProductSearchRecord: ProductSearchRecordModel = {
  code: '',
  name: ''
}
