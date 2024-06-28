import { DataTableContaineDeliveryConfigModel, DeliveryTicketProductFilterTableModel } from '../common'
import { DeliveryOrderProcessStatusModel } from '../modal/DeliveryCancelSellModel'
import { deliveryOrderProcessStatusCommonCodeName } from '../modal/DeliveryIssuanceDelayInfoModel'
import { DeliveryOrderStatusModel } from './DeliveryTicketProductTicketListModel'
import { DeliveryPaymentMethodModel } from './DeliveryTicketProductListOrderStatusModel'

export const deliveryOrderStatusOrderDetailOptions = [
  {
    label: '전체',
    value: DeliveryOrderStatusModel.ALL
  },
  {
    label: '결제완료',
    value: DeliveryOrderStatusModel.PAYMENT_COMPLETE
  },
  {
    label: '발급실패',
    value: DeliveryOrderStatusModel.DISUSE_FAIL
  },
  {
    label: '발급지연',
    value: DeliveryOrderStatusModel.ISSUE_DELAY
  }
]

export const deliveryTicketProductOrderDetailHeaderTableConfig = (
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
    class: 'wf_m-w-200 ',
    onClick: onClickOrderKey,
    options: deliveryOrderProcessStatusCommonCodeName,
    compareValue: DeliveryOrderProcessStatusModel.SALE_CANCEL
  },
  {
    header: '클레임상태',
    field: 'claimStatus',
    class: 'wf_m-w-200 ',
    onClick: onClickClaimKey,
    options: deliveryOrderProcessStatusCommonCodeName
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
    field: 'ordererName',
    class: 'wf_m-w-200 '
  },
  {
    header: '수령자명',
    field: 'receiverName',
    class: 'wf_m-w-200 '
  },
  {
    header: '수령자 휴대폰번호',
    field: 'receiverPhone',
    class: 'wf_m-w-200 '
  },
  {
    header: '결제일시',
    field: 'paymentDate',
    class: 'wf_m-w-200 '
  },
  {
    header: '표준카테고리',
    field: 'standardCategoryName',
    class: 'wf_m-w-200 '
  },
  {
    header: 'MD',
    field: 'md',
    class: 'wf_m-w-200 '
  }
]

export const deliveryTicketProductOrderDetailXlsxSheetName = 'Order_Detail'

export const DeliveryOrderDetailTooltip = `<div class="wf_flex wf_flex-col wf-gap-10 wf_text-left"><p class="wf-body_04-reg wf_text-n-33 wf_text-sub-02">-&nbsp;&nbsp;&nbsp;티켓상품의 주문 상세내역을 확인하실 수 있습니다.</p><p class="wf-body_04-reg wf_text-n-33 wf_text-sub-01">-&nbsp;&nbsp;&nbsp;결제완료 후 1영업일 이내에 ‘티켓 발급’을 처리해 주세요.</p><p class="wf-body_04-reg wf_text-n-33">-&nbsp;&nbsp;&nbsp;품절 등 부득이한 경우 판매자 핀매취소가 가능하며 티켓 발급 지연이 예상될 경우 티켓 발급 지연 사전안내를 통해 주문 관리를 할 수 있습니다.</p></div>`

export const deliveryHintListMockData = [
  {
    content: '송장일괄등록에 실패하였습니다.',
    isEmphasize: true
  },
  {
    content: '다음의 오류를 확인 후 재시도해 주세요.'
  }
]

export interface DeliveryPurchaseProductModel {
  productName: string
  quantity: number
  productAmount: number
  productTax: string
}

export interface DeliveryReceiptModel {
  orderKey: number
  orderer: string
  purchase: {
    totalProductAmount: number
    totalProductAmountAdditionalTax: number
    purchaseProducts: DeliveryPurchaseProductModel[]
  }
  etcCost: {
    deliveryAmount: number
    deliveryAmountAdditionalTax: number
  }
  payments: {
    paymentDatetime: string
    paymentMethod: DeliveryPaymentMethodModel
    seller: string
    affiliatedStore: string
    paymentAmount: number
    proofId: string | number
  }[]
}
