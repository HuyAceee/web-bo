import { DataTableContainerConfigModel } from '@/models/uikit'

export const ProductDataHeaderTicketProductTableModalConfig: DataTableContainerConfigModel[] = [
  {
    header: '외부연동 여부',
    field: 'integration',
    class: 'wf_m-w-120 '
  },
  {
    header: '상품유형',
    field: 'product_type',
    class: 'wf_m-w-80 '
  },
  {
    header: '전시여부',
    field: 'exhibition_status',
    class: 'wf_m-w-80 '
  },
  {
    header: '노출채널',
    field: 'exposure_channel',
    class: 'wf_m-w-80 '
  },
  {
    header: '판매가',
    field: 'price',
    class: 'wf_m-w-120 wf_justify-end'
  },
  {
    header: '즉시 할인가',
    field: 'instant_discount_price',
    class: 'wf_m-w-120 wf_text-sub-01 wf_justify-end'
  },
  {
    header: '판매상태',
    field: 'sales_status',
    class: 'wf_m-w-100 '
  },
  {
    header: '과세 구분',
    field: 'tax_classification',
    class: 'wf_m-w-100 '
  },
  {
    header: '표준카테고리',
    field: 'standard_category',
    class: 'wf_m-w-200 wf_justify-start'
  },
  {
    header: '전시카테고리',
    field: 'exhibition_category',
    class: 'wf_m-w-200 wf_justify-start'
  },
  {
    header: '판매사',
    field: 'seller',
    class: 'wf_m-w-150  wf_text-sub-02 wf_text-underline cursor-pointer'
  },
  {
    header: '하위업체',
    field: 'sub_company',
    class: 'wf_m-w-150 '
  },
  {
    header: '상품등록일',
    field: 'product_registration_date',
    class: 'wf_m-w-150 '
  },
  {
    header: '상품수정일',
    field: 'product_modification_date',
    class: 'wf_m-w-150 '
  },
  {
    header: '판매시작일',
    field: 'sales_start_date',
    class: 'wf_m-w-150 '
  },
  {
    header: '판매종료일',
    field: 'sale_end_date',
    class: 'wf_m-w-150 '
  },
  {
    header: 'MD',
    field: 'md',
    class: 'wf_m-w-150 '
  },
  {
    header: '상품등록자',
    field: 'registrant',
    class: 'wf_m-w-150 '
  },
  {
    header: '상품수정자',
    field: 'modifier',
    class: 'wf_m-w-150 '
  },
  {
    header: '상품승인자',
    field: 'approver',
    class: 'wf_m-w-150 '
  }
]

export interface ProductTicketProductListModel {
  id: string
  product_code: string
  product_name: string
  integration: string
  product_type: string
  exposure_channel: string
  exhibition_status: string
  price: string
  instant_discount_price: string
  sales_status: string
  tax_classification: string
  standard_category: string
  exhibition_category: string
  seller: string
  sub_company: string
  product_registration_date: string
  product_modification_date: string
  sales_start_date: string
  sale_end_date: string
  md: string
  registrant: string
  modifier: string
  approver: string
  copy: string
  management: string
  isSelected: boolean
  productClassificationCode: string
}
