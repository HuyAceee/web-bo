import { DataTableContainerConfigModel } from '@/models'

export interface DeliveryIssuanceDelayInfoDetailProps {
  receiverProductOrderKey: number
  issuanceDelayProcessingDateTime: string
  manager: string
  onClose?: () => void
}

export const deliveryIssuanceDelayInfoDetailTableConfig: DataTableContainerConfigModel[] = [
  { header: '주문코드', field: 'orderKey', class: 'wf_m-w-231 ' },
  { header: '거래번호', field: 'transactionNumber', class: 'wf_m-w-231 ' },
  { header: '상품주문코드', field: 'productOrderKey', class: 'wf_m-w-231 ' },
  { header: '상품명', field: 'productName', class: 'wf_m-w-231 ' },
  { header: '옵션명', field: 'optionSmallName', class: 'wf_m-w-231 ' }
]
