import { DataTableContainerConfigModel } from "@/models/uikit"

export enum ProductRegisterValueOptionType {
  use = 'use',
  notUsed = 'notUsed'
}

export type ProductTypeRegisterOptionValue = 'single' | 'multiple' | 'optional' | undefined

export enum ProductOptionType {
  single = "01",
  multiple = "02",
  optional = "03"
}

export enum ProductTicketOptionTab {
  TAB_BASE_INFORMATION = 0,
  TAB_EXHIBITION = 1,
  TAB_SALES = 2,
  TAB_OPTIONS_STOCK = 3,
  TAB_RELEASE = 4,
  TAB_MORE_INFORMATION = 5,
  TAB_PROVISION_NOTICE = 6
}

export const productTicketApprovalStatus = {
  registration: '01', // 상품등록중
  awaitingApproval: '02', //승인대기
  approvalWithdrawal: '03', //승인철회
  approvalCompleted: '04', //승인완료
  rejectedApproval: '05' //승인반려
}

export const ProductCouponPromotionHeaderTableConfig: DataTableContainerConfigModel[] = [
  {
    header: '쿠폰 ID',
    field: 'id',
    class: 'wf_m-w-300 ',
  },
  {
    header: '쿠폰명',
    field: 'name',
    class: 'wf_m-w-300 ',
  },
  {
    header: '정률 (%)',
    field: 'fixedRate',
    class: 'wf_m-w-300 ',
  },
  {
    header: '정액 (/)',
    field: 'fixedAmount',
    class: 'wf_m-w-300 ',
  },
  {
    header: '쿠폰 할인가',
    field: 'discountPrice',
    class: 'wf_m-w-300 ',
  },
]

export const ProductDiscountPromotionHeaderTableConfig: DataTableContainerConfigModel[] = [
  {
    header: '프로모션 ID',
    field: 'id',
  },
  {
    header: '프로모션명',
    field: 'name',
  },
  {
    header: '판매가',
    field: 'price',
  },
  {
    header: '프로모션 할인가',
    field: 'discountPrice',
  },
  {
    header: '할인율 (%)',
    field: 'discountRate',
  },
]