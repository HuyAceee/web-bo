import { BaseModelErrorResponse } from '@/models/services/responses/BaseModelResponse'
import { BaseApi } from '../BaseApi'
import { DeliveryIssueDelayRequest } from '@/models/services/requests/delivery/modal/DeliveryIssueDelayRequest'
import { DeliveryIssueDelayTargetsResponse } from '@/models/services/responses/delivery/modal/DeliveryIssueDelayTargetsResponse'

class DeliveryIssueDelayTargetsApi extends BaseApi {
  constructor() {
    super('order')
  }

  async getIssueDelayTargets(receiverProductOrderKeys: string): Promise<DeliveryIssueDelayTargetsResponse> {
    return this.get(`bo/orders/tickets/products/receivers/issue-delay-targets`, { receiverProductOrderKeys: receiverProductOrderKeys })
  }

  async putIssueDelay(receiverProductOrderKeys: number, body: DeliveryIssueDelayRequest): Promise<BaseModelErrorResponse> {
    return Promise.resolve(this.put(`bo/orders/tickets/products/receivers/${receiverProductOrderKeys}/status/issue-delay`, body))
  }
}

export const deliveryIssueDelayTargetsApi = new DeliveryIssueDelayTargetsApi()
