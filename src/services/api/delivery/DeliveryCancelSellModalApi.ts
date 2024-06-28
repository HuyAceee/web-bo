import { DeliveryCancelSellModel } from '@/models/views/delivery/modal/DeliveryCancelSellModel'
import { BaseApi } from '../BaseApi'

class DeliveryCancelSellModalApi extends BaseApi {
  constructor() {
    super('order/bo/orders/tickets/products/receivers')
  }

  getDetailCancelSell(receiverProductOrderKeys: string) {
    return new Promise<{ data: DeliveryCancelSellModel[] }>((resolve, reject) => {
      this.get(`sale-cancel-targets?receiverProductOrderKeys=${receiverProductOrderKeys}`)
        .then((res) => {
          resolve({
            data: res.data
          })
        })
        .catch((res) => {
          reject(res)
        })
    })
  }

  putCancelSell(orderKey: number, receiverProductOrderKeys: Array<number>, claimDetailReason?: string, reasonContents?: string) {
    return new Promise<{ data: string }>((resolve, reject) => {
      this.put(`status/sale-cancel`, { orderKey, receiverProductOrderKeys, claimDetailReason, reasonContents })
        .then((res) => {
          resolve({
            data: res.data
          })
        })
        .catch((res) => {
          reject(res)
        })
    })
  }
}

export const deliveryCancelSellModalApi = new DeliveryCancelSellModalApi()
