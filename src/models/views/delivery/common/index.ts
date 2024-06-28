import { DataTableContainerConfigModel, WelfareSelectOptionType } from '@/models/uikit'
import { ErrorResultInfoDataModel } from '@/models/widgets'
import { DeliveryFailureResponseModel } from '@/models/services/responses/delivery/ticketProductOrderManagement/DeliveryOrderDetailResponse'
import {
  DeliveryStandardCategoryModel,
  DeliveryProductTypeModel,
  DeliveryCategoryTypeModel
} from '../ticketProductOrderManagement/DeliveryTicketProductOrderStatusProductModel'
import {
  DeliveryOrderStatusModel,
  DeliveryClaimStatusModel,
  DeliveryTicketUseStatusModel
} from '../ticketProductOrderManagement/DeliveryTicketProductTicketListModel'

export interface DataTableContaineDeliveryConfigModel extends DataTableContainerConfigModel {
  onClick?: Function
  options?: WelfareSelectOptionType[]
  compareValue?: any
  convertEnumValue?: WelfareSelectOptionType[]
}

export interface DeliverySelectOptionModel<T> {
  label: string
  value: T
}

export enum DeliveryKeywordSearchType {
  NONE,
  ORDER_KEY,
  ORDER_PRODUCT_KEY,
  PRODUCT_KEY,
  PRODUCT_NAME,
  ORDERER_NAME,
  ORDERER_ID,
  RECEIVER_NAME,
  MEMBER_KEY,
  MEMBER_ID,
  TRANSACTION_NUMBER,
  TICKET_NUMBER,
  CLAIM_KEY,
  COUPON_CODE,
  COUPON_REGISTER_NAME,
  FORCE_END_MANAGER_NAME,
  CUSTOMER_COMPANY_KEY,
  SELLER_KEY,
  REWARD_POINT_KEY,
  REGISTRANT,
  CLOSE_REGISTRANT,
  MEMBER_NAME,
  COMPANY_NAME
}

export enum DeliveryPeriodSearchType {
  PAYMENT_DATE,
  TICKET_ISSUE_DATE,
  PURCHASE_CONFIRM_DATE,
  CLAIM_APPLY_DATE,
  COUPON_REGISTER,
  FORCE_END,
  ISSUE,
  DISPLAY_START,
  DISPLAY_END,
  REGISTRATION,
  CLOSE_REGISTRATION
}

export enum DeliveryClaimDetailReasonType {
  HEART_CHANGE = 'HRTCH',
  DESIGN_COLOR_DISSATISFACTION = 'DCDSF',
  PRICE_PROMOTION_COMPARISON = 'PPCMP',
  DELIVERY_MISTAKE_CHANGE = 'DLMCH',
  SOLD_OUT_PRODUCT = 'SOLDT',
  DELIVERY_DELAY = 'DLVDY',
  DEFECTIVE_PRODUCT = 'DEFPR',
  PRODUCT_DAMAGE_OMISSION_WRONG_DELIVERY = 'PDDOW',
  INCORRECT_PRODUCT_INFO = 'INCPI',
  ISSUE_DELAY_EXPECTED = 'ISDDE',
  ETC = 'ETC'
}

export const deliveryClaimDetailReasonTypeOptions = [
  {
    label: '고객 변심',
    value: DeliveryClaimDetailReasonType.HEART_CHANGE
  },
  {
    label: '디자인/색상 불만족',
    value: DeliveryClaimDetailReasonType.DESIGN_COLOR_DISSATISFACTION
  },
  {
    label: '가격/프로모션 비교',
    value: DeliveryClaimDetailReasonType.PRICE_PROMOTION_COMPARISON
  },
  {
    label: ' 배송지 오류/변경',
    value: DeliveryClaimDetailReasonType.DELIVERY_MISTAKE_CHANGE
  },
  {
    label: '상품 품절',
    value: DeliveryClaimDetailReasonType.SOLD_OUT_PRODUCT
  },
  {
    label: '배송 지연',
    value: DeliveryClaimDetailReasonType.DELIVERY_DELAY
  },
  {
    label: '상품(서비스)불량',
    value: DeliveryClaimDetailReasonType.DEFECTIVE_PRODUCT
  },
  {
    label: '파손/구성품 누락/상품 오배송',
    value: DeliveryClaimDetailReasonType.PRODUCT_DAMAGE_OMISSION_WRONG_DELIVERY
  },
  {
    label: '상품정보오류',
    value: DeliveryClaimDetailReasonType.INCORRECT_PRODUCT_INFO
  },
  {
    label: '발급지연예상',
    value: DeliveryClaimDetailReasonType.ISSUE_DELAY_EXPECTED
  },
  {
    label: '기타',
    value: DeliveryClaimDetailReasonType.ETC
  }
]

enum DeliveryTicketStatusModel {
  USED = 'Y',
  CANCELED = 'C'
}

export const deliveryTicketStatusOptions = [
  {
    label: '활성화',
    value: DeliveryTicketStatusModel.USED
  },
  {
    label: '폐기 ',
    value: DeliveryTicketStatusModel.CANCELED
  }
]

export interface DeliveryTicketProductFilterTableFormModel {
  orderKey?: string
  customerKey?: string
  memberKey?: string
  orderMemberKey?: string
  ordererName?: string
  receiverName?: string
  receiverPhoneNumber?: number
  categoryType?: DeliveryCategoryTypeModel
  categoryId?: string
  categoryDepthId1?: string
  categoryDepthId2?: string
  categoryDepthId3?: string
  productKey?: string
  sellerKey?: string
  subcontractKey?: string
  productType?: DeliveryProductTypeModel
  mdKey?: string
  orderStatus?: DeliveryOrderStatusModel
  claimStatus?: DeliveryOrderStatusModel
  periodSearchType?: DeliveryPeriodSearchType
  fromDate?: string
  toDate?: string
  keywordSearchType?: DeliveryKeywordSearchType
  keywords?: string
  dateSelect?: {
    label: string
    value: DeliveryPeriodSearchType
  }
}

export interface DeliveryTicketProductFilterTableModel {
  id?: number | string
  receiverProductOrderKey: number
  orderKey: number
  orderStatus: DeliveryOrderStatusModel
  claimStatus: DeliveryClaimStatusModel
  transactionNumber: string
  productOrderKey: number
  productKey: number
  productName: string
  optionKey: number
  option1DepthName: string
  option2DepthName: string
  option3DepthName: string
  quantity: number
  productType: DeliveryProductTypeModel
  externalTicketNumber: string
  ticketStatus: string
  ticketUseYn: DeliveryTicketUseStatusModel
  issueDate: string
  expireDate: string
  balance: number
  sellerKey: number
  sellerName: string
  subcontractName: string
  memberKey: number
  memberName: string
  memberId: string
  ordererName: string
  customerKey: number
  customerName: string
  receiverName: string
  receiverPhoneNumber: string
  paymentDate: string
  standardCategories: DeliveryStandardCategoryModel[]
  mdId: string
  mdName: string
  standardCategory?: DeliveryStandardCategoryModel
}

export const deliveryTicketProductFilterTableHeaderTableConfig = (
  onClickOrderKey: (value?: DeliveryTicketProductFilterTableModel) => void,
  onClickClaimKey: (value?: DeliveryTicketProductFilterTableModel) => void,
  onClickProductKey: (value?: DeliveryTicketProductFilterTableModel) => void,
  onClickSellerKey: (value?: DeliveryTicketProductFilterTableModel) => void,
  onClickMemberKey: (value?: DeliveryTicketProductFilterTableModel) => void,
  onClickCustomerKey: (value?: DeliveryTicketProductFilterTableModel) => void
): DataTableContaineDeliveryConfigModel[] => [
  {
    header: '주문코드',
    field: 'orderKey',
    class: 'wf_m-w-200 ',
    onClick: onClickOrderKey
  },
  {
    header: '주문상태',
    field: 'orderStatus',
    class: 'wf_m-w-200 '
  },
  {
    header: '클레임상태',
    field: 'claimStatus',
    class: 'wf_m-w-200 ',
    onClick: onClickClaimKey
  },
  {
    header: '거래번호',
    field: 'transactionNumber',
    class: 'wf_m-w-200 ',
    onClick: onClickOrderKey
  },
  {
    header: '상품주문코드',
    field: 'productOrderKey',
    class: 'wf_m-w-200 ',
    onClick: onClickOrderKey
  },
  {
    header: '상품코드',
    field: 'productKey',
    class: 'wf_m-w-200 ',
    onClick: onClickProductKey
  },
  {
    header: '상품명',
    field: 'productName',
    class: 'wf_m-w-200 ',
    onClick: onClickProductKey
  },
  {
    header: '옵션코드',
    field: 'optionKey',
    class: 'wf_m-w-200 '
  },
  {
    header: '옵션명',
    field: 'option1DepthName',
    class: 'wf_m-w-200 '
  },
  {
    header: '수량',
    field: 'quantity',
    class: 'wf_m-w-200 '
  },
  {
    header: '상품유형',
    field: 'productType',
    class: 'wf_m-w-200 '
  },
  {
    header: '티켓유형',
    field: 'ticketType',
    class: 'wf_m-w-200 '
  },
  {
    header: '티켓번호',
    field: 'externalTicketNumber',
    class: 'wf_m-w-200 '
  },
  {
    header: '티켓상태',
    field: 'ticketStatus',
    class: 'wf_m-w-200 '
  },
  {
    header: '사용여부',
    field: 'ticketUseYn',
    class: 'wf_m-w-200 '
  },
  {
    header: '티켓발급일',
    field: 'issueDate',
    class: 'wf_m-w-200 '
  },
  {
    header: '티켓만료일',
    field: 'expireDate',
    class: 'wf_m-w-200 '
  },
  {
    header: '잔액',
    field: 'balance',
    class: 'wf_m-w-200 '
  },
  {
    header: '판매사코드',
    field: 'sellerKey',
    class: 'wf_m-w-200 ',
    onClick: onClickSellerKey
  },
  {
    header: '판매사',
    field: 'sellerName',
    class: 'wf_m-w-200 ',
    onClick: onClickSellerKey
  },
  {
    header: '하위업체',
    field: 'subcontractName',
    class: 'wf_m-w-200 '
  },
  {
    header: '회원코드',
    field: 'memberKey',
    class: 'wf_m-w-200 ',
    onClick: onClickMemberKey
  },
  {
    header: '회원명',
    field: 'memberName',
    class: 'wf_m-w-200 ',
    onClick: onClickMemberKey
  },
  {
    header: '아이디',
    field: 'memberId',
    class: 'wf_m-w-200 ',
    onClick: onClickMemberKey
  },
  {
    header: '고객사코드',
    field: 'customerKey',
    class: 'wf_m-w-200 ',
    onClick: onClickCustomerKey
  },
  {
    header: '고객사',
    field: 'customerName',
    class: 'wf_m-w-200 ',
    onClick: onClickCustomerKey
  },
  {
    header: '주문자명',
    field: 'customer_name',
    class: 'wf_m-w-200 '
  },
  {
    header: '수령자명',
    field: 'receiverName',
    class: 'wf_m-w-200 '
  },
  {
    header: '수령자 휴대폰번호',
    field: 'receiverPhoneNumber',
    class: 'wf_m-w-200 '
  },
  {
    header: '결제일시',
    field: 'paymentDate',
    class: 'wf_m-w-200 '
  },
  {
    header: '티켓발급일시',
    field: 'issue_date',
    class: 'wf_m-w-200 '
  },
  {
    header: '표준카테고리',
    field: 'standardCategoryName',
    class: 'wf_m-w-200 '
  },
  {
    header: 'MD',
    field: 'mdName',
    class: 'wf_m-w-200 '
  }
]

interface DeliveryProductReceiptTableRowItemConfigModel {
  title: string
  value: string | number
  classNameRow?: string
  classNameValue?: string
  onClick?: (key: string | number) => void
}

interface DeliveryProductReceiptTableRowConfigModel {
  rowItems: DeliveryProductReceiptTableRowItemConfigModel[]
}

export interface DeliveryProductReceiptTableConfigModel {
  title?: string
  tableRows: DeliveryProductReceiptTableRowConfigModel[]
}

export const renderStandardCategoriesName = (arr: DeliveryStandardCategoryModel[]): string => {
  const standardCategoriesName = arr?.map((standardCategory) => standardCategory.categoryName)
  return standardCategoriesName.join(' > ')
}

export function convertErrorFailureResponses(arr: DeliveryFailureResponseModel[]): ErrorResultInfoDataModel[] {
  const result: ErrorResultInfoDataModel[] = []
  for (const item of arr) {
    const indexLabel = result.findIndex((message) => message.errorLabel === item.message)
    if (indexLabel === -1) {
      result.push({
        errorLabel: item.message,
        errorContent: item.receiverProductOrderKey.toString()
      })
    } else {
      const newErrorContent = result[indexLabel].errorContent + ', ' + item.receiverProductOrderKey.toString()
      result.splice(indexLabel, 1, {
        ...result[indexLabel],
        errorContent: newErrorContent
      })
    }
  }
  return result
}
