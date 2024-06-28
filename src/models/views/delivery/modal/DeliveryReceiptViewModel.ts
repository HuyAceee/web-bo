import { DataTableContainerConfigModel } from "@/models/uikit"
import { ConfirmModalProps } from "@/models/widgets"

export interface DeliveryReceiptViewPaymentModel {
    id: string
    seller: string
    franchisee: string
    amount: string
    proof: string
}

export const deliveryHeaderFieldTableReceiptHistoryConfig: DataTableContainerConfigModel[] = [
    { header: '상품명', field: 'productName', class: 'wf_m-w-400 wf_justify-start' },
    { header: '수량', field: 'quantity', class: 'wf_m-w-180 wf_justify-end' },
    { header: '물품가액', field: 'productAmount', class: 'wf_m-w-180 wf_justify-end' },
] 
export const deliveryHeaderFieldTableReceiptPaymentConfig: DataTableContainerConfigModel[] = [
    { header: '판매자', field: 'seller', class: 'wf_m-w-190' },
    { header: '가맹점', field: 'affiliatedStore', class: 'wf_m-w-190' },
    { header: '금액', field: 'paymentAmount', class: 'wf_m-w-190' },
    { header: '증빙', field: 'proofId', class: 'wf_m-w-190' },
]

export interface DeliveryReceiptModalPropsModel extends ConfirmModalProps {
    orderKey: string | number
}