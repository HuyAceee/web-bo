import { ProductTypeRegisterOptionValue, WelfareSelectOptionType } from '@/models'
import { ProductBeforeDiscountPromotionListModel } from '@/models/views/products/modal/ProductSearchProductModalModel'
import { DeliverySellerAndCustomerSearchTableModel } from '@/models/views/delivery/modal/DeliverySellerAndCustomerSearchModel'

export * from './ProductSearchModalData'
export * from './ProductSearchModel'

export * from './ProductRegisterModalModel'

export interface ProductVendorInformationModel {
  sellerCode: number
  nameOfSellingCompany: string
  salesDirectory: string | string[]
  masterAccount?: string
  businessNumber: string
  companyRegistrationNumber: string
  representative: string
  workplace: string
  phoneNumber?: string
}

export interface ProductOptionsDeliveryInfo {
  noOption3?: number
  no?: number | string
  optionId?: number
  option?: string
  option1?: string
  option2?: string
  optionPrice?: number
  inventory?: number
  salesStatus?: WelfareSelectOptionType
  selected?: boolean
  optionDisplayOrder?: number | string
  productKey?: number
  productReqeustOptionKey?: number
}

export interface ProductRegisterSingleOptionModel {
  productCode: string
  productName: string
  type?: ProductTypeRegisterOptionValue
  dataTable?: ProductOptionsDeliveryInfo[]
  enableMultipleValue?: boolean
  optionShow?: boolean
  baseInfoType?: string
  productKey?: number
  productRequestKey?: number
}

export interface ProductSelectOptionModel {
  label?: string
  value?: string
  path?: string
}

export interface ProductHeaderTableOptionModel {
  label?: string
  labelElement?: any
  isProductCode?: boolean
  element?: any
  required?: boolean
  flex?: number
  props?: any
  events?: any
  labelProps?: any
  labelEvents?: any
  className?: string
}

export interface ProductContentTableDataModel extends ProductHeaderTableOptionModel {
  content?: string
  classNameContent?: string
}

export interface ProductWarningModel {
  label: string
  contentList: string[]
}

export interface ProductSearchModalProps {
  searchInput?: string
  searchResData?: ProductSearchRecordModel
  onSelectRow?: (value: DeliverySellerAndCustomerSearchTableModel) => void
  searchType: ProductSearchType
  onCancel?: () => void
  onSelect: (value: ProductSearchRecordModel) => void
}

export interface ProductSearchRecordModel {
  code: number
  name: string
  id?: string | number
}

export enum ProductSearchType {
  MD = 'MD',
  SELLER = 'SELLER',
  BRAND = 'BRAND',
  CUSTOMER = 'CUSTOMER'
}

export enum ProductSelectDefinitionType {
  CATEGORY = 'CATEGORY',
  PRODUCT = 'PRODUCT',
  EXHIBITION_SELLER = 'EXHIBITION_SELLER',
  EXHIBITION_SPECIAL = 'EXHIBITION_SPECIAL',
  EXHIBITION_SEARCH_BANNER = 'EXHIBITION_SEARCH_BANNER',
  EXHIBITION_COMMON_BANNER = 'EXHIBITION_COMMON_BANNER',
  EXHIBITION_COMMON_POPUP_REGIS = 'EXHIBITION_COMMON_POPUP_REGIS',
  OPERATING_MEDICAL_IMAGE = 'OPERATING_MEDICAL_IMAGE',
  OPERATING_OG_TAG_IMAGE = 'OPERATING_OG_TAG_IMAGE',
  PARTNER_CONTRACT = 'PARTNER_CONTRACT',
  PARTNER_BANK_ACCOUNT = 'PARTNER_BANK_ACCOUNT',
  PARTNER_PERMISSION = 'PARTNER_PERMISSION',
  PARTNER_INTRODUCTION = 'PARTNER_INTRODUCTION',
  PARTNER_REGISTRATION = 'PARTNER_REGISTRATION'
}

export interface ProductSearchModalWrapperProps {
  placeholderInput?: string
  labelButton?: string
  type: ProductSearchType
  defaultValue?: string
  disabled?: boolean
  isDisabledOnEmptySearchText?: boolean
  reverseSearchText?: boolean
}

export type ProductSearchModalWrapperEmits = (e: 'selectValue', value: ProductSearchRecordModel) => void

export interface ProductRegisterFileProps {
  name?: string
  alt?: string
  type?: ProductSelectDefinitionType
}

export type ProductRegisterFileEmits = {
  (e: 'get-file', value: any): void
  (e: 'call-api', data: any): void
}

export type ProductImageType = 'square' | 'pcBanner' | ''

export interface ProductSearchItemModalProps {
  onCancel?: () => void
  onSelect: (items: any[]) => void
  itemCheck?: ProductBeforeDiscountPromotionListModel[]
  typeApproval?: boolean
}

export type ProductDateRowKey = 'beginDate' | 'endDate'

export const productSearchRecordRes: ProductSearchRecordModel = {
  code: NaN,
  name: ''
}

export const listButtonDate = [
  {
    label: '오늘',
    class: 'wf_w-55',
    value: 0
  },
  {
    label: '7일',
    class: 'wf_w-55',
    value: 6
  },
  {
    label: '1개월',
    class: 'wf_w-55',
    value: 29
  },
  {
    label: '3개월',
    class: 'wf_w-55',
    value: 89
  },
  {
    label: '1년',
    class: 'wf_w-55',
    value: 364
  },
  {
    label: '직접입력',
    class: 'wf_w-55',
    value: -1
  }
]

export interface ProductRegisterOptionPropsModel {
  baseInfoType?: string
  productKey?: number
  productRequestKey?: number
}
