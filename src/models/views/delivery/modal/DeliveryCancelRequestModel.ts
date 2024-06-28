import {} from '@/models'
import { DeliveryHintModel } from '@/models/views/delivery/modal/DeliveryHintModel'
import { DeliveryOrderProcessStatusModel } from './DeliveryCancelSellModel'
import { deliveryOrderProcessStatusCommonCodeName } from './DeliveryIssuanceDelayInfoModel'
import { DataTableContaineDeliveryConfigModel, DeliveryProductReceiptTableConfigModel, deliveryTicketStatusOptions } from '../common'
import { formatNumberDot } from '@/common'

export interface DeliveryOrderedTicketProductModelContain extends DeliveryOrderedTicketProductModel {
  id: number | string
  isSelected: boolean
  isDisabled: boolean
}
interface DeliveryOrderedTicketProductModel {
  receiverProductOrderKey: number
  transactionNumber: string
  senderName: string
  receiverName: string
  receiverPhone: string
  ticketCouponNumber: string
  productAmount: number
  discountAmount: number
  lastPaymentAmount: number
  ticketCouponStatus: 'Y'
  useYn: 'N'
  issueDate: string
  expireDate: string
  confirmedDate: string
  balance: number
  welfarePointPaymentAmount: number
  pgPaymentAmount: number
  orderStatus: DeliveryOrderProcessStatusModel
  claimStatus: DeliveryOrderProcessStatusModel
}

interface DeliveryTicketProductCouponModel {
  couponKey: number
  couponName: string
  validStartDate: string
  validEndDate: string
}

export interface DeliveryCancelRequestModalModel {
  orderKey: number
  memberKey: number
  memberName: string
  memberId: string
  productOrderKey: number
  ticketType: string
  productKey: number
  productName: string
  optionKey: number
  optionLargeName: string
  optionMediumName: string
  optionSmallName: string
  orderProductCount: number
  productAmount: number
  lastPaymentAmount: number
  welfarePointPaymentAmount: number
  creditCartPaymentAmount: number
  transferPaymentAmount: number
  megazonePaymentAmount: number
  naverPaymentAmount: number
  kakaoPaymentAmount: number
  tossPaymentAmount: number
  sellerKey: number
  sellerName: string
  orderedTicketProducts: DeliveryOrderedTicketProductModel[]
  ticketProductCoupons: DeliveryTicketProductCouponModel[]
}

export const deliveryCancelRequestInfoHint: DeliveryHintModel[] = [
  { content: '취소 신청할 주문 정보를 확인 후 취소 사유를 입력하여 신청해 주세요.' },
  { content: '쿠폰 상태 폐기, 유효기간 종료, 이미 사용된 쿠폰은 취소 신청할 수 없습니다.', isEmphasize: true }
]

export const DeliveryCancelRequestModalConfigs = (
  detail: DeliveryCancelRequestModalModel,
  onClickOrderKey: (value?: DeliveryCancelRequestModalModel) => void,
  onClickProductKey: (value?: DeliveryCancelRequestModalModel) => void,
  onClickSellerKey: (value?: DeliveryCancelRequestModalModel) => void
): DeliveryProductReceiptTableConfigModel[] => [
  {
    tableRows: [
      {
        rowItems: [
          {
            title: '주문코드',
            value: detail.orderKey,
            onClick: () => onClickOrderKey(detail)
          },
          {
            title: '회원코드 (회원명)',
            value: detail.memberName + ' (' + detail.memberKey + ')',
            onClick: () => onClickOrderKey(detail)
          },
          {
            title: '아이디',
            value: detail.memberId,
            onClick: () => onClickOrderKey(detail)
          }
        ]
      }
    ]
  },
  {
    title: '주문 상품 정보',
    tableRows: [
      {
        rowItems: [
          {
            title: '판매사코드',
            value: detail.sellerKey,
            onClick: () => onClickSellerKey(detail)
          },
          {
            title: '판매사명',
            value: detail.sellerName,
            onClick: () => onClickSellerKey(detail)
          }
        ]
      },
      {
        rowItems: [
          {
            title: '상품주문코드',
            value: detail.productOrderKey,
            onClick: () => onClickSellerKey(detail)
          },
          {
            title: '티켓 유형',
            value: detail.ticketType,
            classNameValue: 'wf_text-sub-01'
          }
        ]
      },
      {
        rowItems: [
          {
            title: '상품코드',
            value: detail.productKey,
            onClick: () => onClickProductKey(detail)
          },
          {
            title: '상품명',
            value: detail.productName,
            onClick: () => onClickProductKey(detail)
          }
        ]
      },
      {
        rowItems: [
          {
            title: '옵션 코드',
            value: detail.optionKey
          },
          {
            title: '옵션명',
            value: detail.optionMediumName
          }
        ]
      },
      {
        rowItems: [
          {
            title: '수량',
            value: detail.orderProductCount
          },
          {
            title: '판매가',
            value: formatNumberDot(detail.productAmount) + ' 원',
            classNameValue: 'wf_justify-end'
          }
        ]
      }
    ]
  }
]

export const deliveryCancelRequestModalTableHeaderConfig: DataTableContaineDeliveryConfigModel[] = [
  { header: '거래번호', field: 'transactionNumber', class: 'wf_m-w-200 ' },
  { header: '주문순번', field: 'no', class: 'wf_m-w-200 ' },
  { header: '보내는 사람', field: 'senderName', class: 'wf_m-w-200 ' },
  { header: '받는 사람', field: 'receiverName', class: 'wf_m-w-200 ' },
  { header: '휴대폰번호', field: 'receiverPhone', class: 'wf_m-w-200 ' },
  { header: '상품금액', field: 'productAmount', class: 'wf_m-w-200 ' },
  { header: '즉시할인금액', field: 'immediatelyDiscountAmount', class: 'wf_m-w-200' },
  { header: '상품쿠폰할인금액', field: 'couponDiscountAmount', class: 'wf_m-w-200' },
  { header: '최종결제금액', field: 'lastPaymentAmount', class: 'wf_m-w-200 ' },
  { header: '복지포인트', field: 'welfarePointPaymentAmount', class: 'wf_m-w-200 ' },
  { header: '신용카드', field: 'pgPaymentAmount', class: 'wf_m-w-200 ' },
  { header: '티켓번호', field: 'ticketCouponNumber', class: 'wf_m-w-200 ' },
  { header: '티켓상태', field: 'ticketCouponStatus', class: 'wf_m-w-200 ', convertEnumValue: deliveryTicketStatusOptions },
  { header: '사용여부', field: 'useYn', class: 'wf_m-w-200 ' },
  { header: '티켓발급일', field: 'issueDate', class: 'wf_m-w-200 ' },
  { header: '티켓만료일', field: 'expireDate', class: 'wf_m-w-200 ' },
  { header: '잔액 ', field: 'balance', class: 'wf_m-w-200 ' },
  { header: '주문상태', field: 'orderStatus', class: 'wf_m-w-200 ', convertEnumValue: deliveryOrderProcessStatusCommonCodeName },
  { header: '클레임상태', field: 'claimStatus', class: 'wf_m-w-200 ', convertEnumValue: deliveryOrderProcessStatusCommonCodeName }
]

export const deliveryCancelRequestCaculateTotalFields = [
  'productAmount',
  'immediatelyDiscountAmount',
  'couponDiscountAmount',
  'lastPaymentAmount',
  'welfarePointPaymentAmount',
  'pgPaymentAmount',
  'balance',
]

export const deliveryCancelRequestModalTableRefundAmountHeaderConfig: DataTableContaineDeliveryConfigModel[] = [
  { header: '최종결제금액', field: 'lastPaymentAmount', class: 'wf_m-w-290 wf_justify-end ' },
  { header: '취소 상품가', field: 'cancelAmout', class: 'wf_m-w-290 wf_justify-end ' },
  { header: '취소 수수료', field: 'cancelFee', class: 'wf_m-w-290 wf_justify-end ' },
  { header: '환불예정금액', field: 'expectedRefundAmount', class: 'wf_m-w-290 wf_justify-end wf_text-sub-01 ' }
]

export const deliveryCancelRequestModalTableRefundPaymentHeaderConfig: DataTableContaineDeliveryConfigModel[] = [
  { header: '복원 복지포인트', field: 'refundPayment1', class: 'wf_m-w-386-66 wf_justify-end ' },
  { header: 'PG 결제 취소 금액', field: 'refundPayment2', class: 'wf_m-w-386-66 wf_justify-end wf_text-sub-01 ' },
  { header: 'PG 결제 수단', field: 'refundPayment3', class: 'wf_m-w-386-66 ' }
]

export const deliveryCancelRequestModalTablePointExpireHeaderConfig: DataTableContaineDeliveryConfigModel[] = [
  { header: '구분', field: 'pointExpire1', class: 'wf_m-w-386-66 ' },
  { header: '소멸 예정 금액', field: 'pointExpire2', class: 'wf_m-w-386-66 ' },
  { header: '유효기간', field: 'pointExpire3', class: 'wf_m-w-386-66 ' }
]

export const deliveryCancelRequestModalTableDepositProcessingHistoryHeaderConfig: DataTableContaineDeliveryConfigModel[] = [
  { header: 'NO', field: 'no', class: 'wf_m-w-80 ' },
  { header: '처리유형', field: 'depositProcessingHistory2', class: 'wf_m-w-150 ' },
  { header: '적립금', field: 'depositProcessingHistory3', class: 'wf_m-w-150 ' },
  { header: '적립 / 사용 내역', field: 'depositProcessingHistory4', class: 'wf_m-w-380 ' },
  { header: '소멸 예정일', field: 'depositProcessingHistory5', class: 'wf_m-w-200 ' },
  { header: '처리일시', field: 'depositProcessingHistory6', class: 'wf_m-w-200 ' }
]

export const deliveryCancelRequestModalTableRestorationCouponInformationHeaderConfig: DataTableContaineDeliveryConfigModel[] = [
  { header: '쿠폰코드', field: 'restorationCouponInformation1', class: 'wf_m-w-290 wf-underline ' },
  { header: '쿠폰명', field: 'restorationCouponInformation2', class: 'wf_m-w-290 ' },
  { header: '사용기간', field: 'restorationCouponInformation3', class: 'wf_m-w-290 ' },
  { header: '처리일시', field: 'restorationCouponInformation4', class: 'wf_m-w-290 ' }
]
