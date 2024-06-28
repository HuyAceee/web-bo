import { DeliveryCancellationFeeChangeModalUpdateRequest } from '@/models/services/requests/delivery/modal/DeliveryCancellationFeeChangeModalRequest'
import { DeliveryCancellationFeeChangeModalResponse } from '@/models/services/responses/delivery/modal/DeliveryCancellationFeeChangeModalResponse'

import { BaseApi } from '@/services/api/BaseApi'

class DeliveryCancellationFeeChangeModalApi extends BaseApi {
  constructor() {
    super('order/bo/claims/tickets/order-cancels')
  }

  updateCancellationFee(request: DeliveryCancellationFeeChangeModalUpdateRequest): Promise<DeliveryCancellationFeeChangeModalResponse> {
    return this.put('cancellation-fee', request)
  }
}
export const deliveryCancellationFeeChangeModalApi = new DeliveryCancellationFeeChangeModalApi()
