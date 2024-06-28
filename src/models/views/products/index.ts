export * from './modal'
export * from './deliveryProduct'
export * from './deliveryProductList'
export * from './promotion'
export * from './ticketProduct'
export * from './common'
export * from './category'
export * from './approval'

export enum ProductTab {
  BASE_INFORMATION = 'base-information',
  EXHIBITION = 'exhibition',
  SALES = 'sales',
  OPTIONS_STOCK = 'options-stock',
  SHIPPING = 'shipping',
  RELEASE = 'release-information',
  MORE_INFORMATION = 'more-information',
  PROVISION_NOTICE = 'provision-notice'
}

export const productStatusOptions = [
  {
    label: '상품등록중',
    value: '01'
  },
  {
    label: '승인대기',
    value: '02'
  },
  {
    label: '승인철회',
    value: '03'
  },
  {
    label: '승인완료',
    value: '04'
  },
  {
    label: '승인반려',
    value: '05'
  },
  {
    label: '수정 승인대기',
    value: '06'
  },
  {
    label: '수정 승인철회',
    value: '07'
  },
  {
    label: '수정 승인완료',
    value: '08'
  },
  {
    label: '수정 승인반려',
    value: '09'
  }
]
