import { DeliveryIssuanceDelayInfoDetailResponse } from '@/models/services/responses/delivery/modal/DeliveryIssuanceDelayInfoDetailResponse'
import { BaseApi } from '../BaseApi'

class DeliveryIssuanceDelayInfoDetailApi extends BaseApi {
  constructor() {
    super('order')
  }

  async getIssueDelay(receiverProductOrderKey: number): Promise<DeliveryIssuanceDelayInfoDetailResponse> {
    return this.get(`bo/orders/tickets/products/receivers/${receiverProductOrderKey}/status/issue-delay`)
  }
}

export const deliveryIssuanceDelayInfoDetailApi = new DeliveryIssuanceDelayInfoDetailApi()
