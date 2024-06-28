import { DeliveryTicketProductDetailResponse } from '@/models/services/responses/delivery/modal/DeliveryTicketProductDetailResponse'
import { BaseApi } from '../BaseApi'

class DeliveryTicketDetailApi extends BaseApi {
  constructor() {
    super('order/bo/orders/tickets')
  }

  async getDetail(orderKey: string): Promise<DeliveryTicketProductDetailResponse> {
    const { data, ...otherRes } = await this.get(`${orderKey}`)
    const resData: DeliveryTicketProductDetailResponse = {
      data, ...otherRes
    }
    return Promise.resolve(resData)
  }
}

export const deliveryTicketDetailApi = new DeliveryTicketDetailApi()
