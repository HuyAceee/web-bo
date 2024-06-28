import { DataTableContainerConfigModel, WelfareSelectOptionType } from '@/models'
import { ProductClassification } from '../../products/common/ProductTypeModel'

export interface DeliverySearchProductProps {
  onClose: () => void
  searchInput?: string
  onSelect: (value: DeliverySearchProductSelectedValueModel) => void
}

export const deliverySearchProductTableHeaderConfig: DataTableContainerConfigModel[] = [
  { header: '상품코드', class: 'wf_m-w-120 ', field: 'productCode' },
  { header: '상품명', class: 'wf_m-w-200 ', field: 'productName' },
  { header: '상품구분', class: 'wf_m-w-80 ', field: 'productClassificationName' },
  { header: '상품유형', class: 'wf_m-w-100 ', field: 'productTypeName' },
  { header: '판매가', class: 'wf_m-w-120 ', field: 'salePrice' },
  { header: '판매상태', class: 'wf_m-w-100 ', field: 'lastProductSalesStatusName' },
  { header: '승인상태', class: 'wf_m-w-120 ', field: 'lastProductProgressStatusName' },
  { header: '담당MD', class: 'wf_m-w-120 ', field: 'createdByName' },
  { header: '등록일', class: 'wf_m-w-120 ', field: 'createdYyyymmdd' },
  { header: '수정일', class: 'wf_m-w-120 ', field: 'lastModifiedYyyymmdd' },
  { header: '표준카테고리', class: 'wf_m-w-160 ', field: 'standardCategoryPath' },
  { header: '전시카테고리', class: 'wf_m-w-160 ', field: 'displayCategoryPath' }
]

export interface DeliverySearchProductTableModel {
  id: string
  productName: string
  productTypeName: string
  productClassificationName: string
  salePrice: number
  lastProductSalesStatusName: string
  lastProductProgressStatusName: string
  createdByName: string
  createdYyyymmdd: string
  lastModifiedYyyymmdd: string
  standardCategoryPath: string
  displayCategoryPath: string
}

export interface DeliverySearchProductModel {
  categoryType: WelfareSelectOptionType
  categoryDepthId1: WelfareSelectOptionType | undefined
  categoryDepthId2: WelfareSelectOptionType | undefined
  categoryDepthId3: WelfareSelectOptionType | undefined
  productClassificationCode: WelfareSelectOptionType
  productCode: string
  productName: string
  sellerKey: WelfareSelectOptionType
  chargeMdKey: string
  searchDateType: WelfareSelectOptionType
  fromDate: string
  toDate: string
  lastProductSalesStatusCode: WelfareSelectOptionType
  displayYn: WelfareSelectOptionType
}

export interface DeliverySearchProductSelectedValueModel {
  productCode: string
  productName: string
  productKey: string
}

export const deliveryProductClassification: WelfareSelectOptionType[] = [
  { label: '전체', value: '' },
  { label: '배송형 상품', value: ProductClassification.DELIVERY },
  { label: '티켓형 상품', value: ProductClassification.TICKET }
]

enum DeliverySaleStatus {
  'ON_SALE' = '01',
  'TEMPORARILY_SUSPENDED' = '02',
  'TEMPORARILY_OUT_OF_STOCK' = '03',
  'OUT_OF_STOCK' = '04',
  'END_OF_SALE' = '05'
}

export enum DeliverySearchDateType {
  'REGISTRATION' = 'REG',
  'MODIFICATION' = 'MOD'
}

export const deliverySearchDateType: WelfareSelectOptionType[] = [
  { label: '등록일', value: DeliverySearchDateType.REGISTRATION },
  { label: '수정일', value: DeliverySearchDateType.MODIFICATION }
]

export const deliverySaleStatus: WelfareSelectOptionType[] = [
  { label: '전체', value: '' },
  { label: '판매중', value: DeliverySaleStatus.ON_SALE },
  { label: '판매일시중지', value: DeliverySaleStatus.TEMPORARILY_SUSPENDED },
  { label: '일시품절', value: DeliverySaleStatus.TEMPORARILY_OUT_OF_STOCK },
  { label: '품절', value: DeliverySaleStatus.OUT_OF_STOCK },
  { label: '판매종료', value: DeliverySaleStatus.END_OF_SALE }
]

export const deliveryDisplayStatus: WelfareSelectOptionType[] = [
  { label: '전체', value: '' },
  { label: '전시', value: 'Y' },
  { label: '비전시', value: 'N' }
]
