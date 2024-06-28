import { WelfareSelectOptionType } from '@/models'
import { ComplaintOrderCancelKeywordSearchType } from '@/models/services/requests/complaint/complaintOrderCancel/ComplaintOrderCancelListRequest'
import { DeliverySearchDateType } from '@/models/views/delivery/modal/DeliverySearchProductModel'

export interface ExhibitionProductSearchModalProps {
  onCancel?: () => void
  onSelect: (value: any) => void
}

export interface ExhibitionSearchProductModalWrapperProps {
  placeholderInput?: string
  labelButton?: string
  defaultValue?: string
  disabled?: boolean
  isDisabledOnEmptySearchText?: boolean
  reverseSearchText?: boolean
}

export type ExhibitionSearchProductModalWrapperEmits = (e: 'selectValue', value: ExhibitionSearchProductRecordModel) => void

export interface ExhibitionSearchProductRecordModel {
  productKey: string
  productCode: string
  name: string
}

export interface ExhibitionProductSearchFormModel {
  productName: string
  productKey: string
  mdKey: string
  seller: string
  sellerKey: string
  brandName: string
  brandCode: string
  salesStatus: WelfareSelectOptionType
  searchDateType: WelfareSelectOptionType
  fromDate: string
  toDate: string
  keyword: string
  keywordSearchType: WelfareSelectOptionType
  productClassificationCode: WelfareSelectOptionType
}

export const exhibitionProductSearchTableHeaderConfig = [
  { header: 'No', field: 'no', class: 'wf_m-w-50' },
  { header: '상품코드', field: 'productCode', class: 'wf_m-w-150' },
  { header: '상품명', field: 'productName', class: 'wf_m-w-120' },
  { header: '판매사 코드', field: 'sellerKey', class: 'wf_m-w-120' },
  { header: '판매사', field: 'sellerName', class: 'wf_m-w-120' },
  { header: '브랜드 코드', field: 'brandId', class: 'wf_m-w-120' },
  { header: '브랜드', field: 'brandName', class: 'wf_m-w-120' },
  { header: '상품구분', field: 'productClassificationName', class: 'wf_m-w-120' },
  { header: '상품유형', field: 'productTypeName', class: 'wf_m-w-120' },
  { header: '판매가', field: 'salePrice', class: 'wf_m-w-120' },
  { header: '판매상태', field: 'lastProductSalesStatusName', class: 'wf_m-w-120' },
  { header: '담당MD', field: 'chargeMdName', class: 'wf_m-w-120' },
  { header: '등록자', field: 'createdByName', class: 'wf_m-w-150' },
  { header: '등록일', field: 'createdYyyymmdd', class: 'wf_m-w-120' },
  { header: '수정자', field: 'lastModifiedByName', class: 'wf_m-w-150' },
  { header: '수정일', field: 'lastModifiedYyyymmdd', class: 'wf_m-w-120' }
]

export const exhibitionProductSearchType = [
  { label: '사용안함', value: ComplaintOrderCancelKeywordSearchType.NONE },
  { label: '상품코드', value: ComplaintOrderCancelKeywordSearchType.PRODUCT_KEY }
]

export const exhibitionProductSearchSaleStatusType = [
  { label: '전체', value: 0 },
  { label: '판매중', value: 1 },
  { label: '일시품절', value: 2 }
]

export const exhibitionProductSearchPeriodType = [
  { label: '등록일', value: DeliverySearchDateType.REGISTRATION },
  { label: '수정일', value: DeliverySearchDateType.MODIFICATION }
]
