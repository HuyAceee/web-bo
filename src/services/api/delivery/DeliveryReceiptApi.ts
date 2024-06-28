import MockDataDeliveryReceipt from '@/assets/mockData/data/delivery/delivery-receipt-view-data-table.json'
import { BaseApi } from '../BaseApi'
import { DeliveryReceiptHistoryRequest, DeliveryReceiptPaymentRequest } from '@/models/services/requests/delivery/modal/DeliveryReceiptRequst'
import { DeliveryReceiptHistoryResponse, DeliveryReceiptPaymentResponse } from '@/models/services/responses/delivery/DeliveryReceiptViewResponse'
import { DeliveryReceiptResponseModel } from '@/models/services/responses/delivery/modal/DeliveryReceiptModalResponse'

class DeliveryReceiptApi extends BaseApi {
  constructor() {
    super('order/bo/orders/tickets')
  }

  async getReceiptByOrderKey(key: string | number): Promise<DeliveryReceiptResponseModel> {
    return await this.get(`${key}/receipt`)
  }
  getListHistoryReceipt(request: DeliveryReceiptHistoryRequest) {
    return new Promise<DeliveryReceiptHistoryResponse>((resolve) => {
      setTimeout(() => {
        const items: any[] = []
        const maxItemInPage = request.pageNum * request.rowSize + request.rowSize
        for (let i = request.pageNum * request.rowSize; i < maxItemInPage; i++) {
          const index = i + 1
          items.push({
            ...MockDataDeliveryReceipt.history,
            id: index
          })
        }
        resolve({
          totalItems: 2,
          data: items
        })
      })
    })
  }
  getListPaymentReceipt(request: DeliveryReceiptPaymentRequest) {
    return new Promise<DeliveryReceiptPaymentResponse>((resolve) => {
      setTimeout(() => {
        const items: any[] = []
        const maxItemInPage = request.pageNum * request.rowSize + request.rowSize
        for (let i = request.pageNum * request.rowSize; i < maxItemInPage; i++) {
          const index = i + 1
          items.push({
            ...MockDataDeliveryReceipt.payment,
            id: index
          })
        }
        resolve({
          totalItems: 2,
          data: items
        })
      })
    })
  }
}

export const deliveryReceiptApi = new DeliveryReceiptApi()
