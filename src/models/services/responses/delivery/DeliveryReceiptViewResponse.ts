import { DeliveryReceiptViewHistoryModel, DeliveryReceiptViewPaymentModel } from '@/models/views/delivery/modal/DeliveryReceiptViewModel'
import { DataTablePaginationResponseModel } from '../BaseModelResponse'

export interface DeliveryReceiptHistoryResponse extends DataTablePaginationResponseModel<DeliveryReceiptViewHistoryModel> {}
export interface DeliveryReceiptPaymentResponse extends DataTablePaginationResponseModel<DeliveryReceiptViewPaymentModel> {}
