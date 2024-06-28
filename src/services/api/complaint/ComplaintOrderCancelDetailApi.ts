import {
  ComplaintOrderCancelDetailResponse,
  ComplaintOrderCancelTicketDetailResponse
} from '@/models/services/responses/complaint/complaintOrderCancel/ComplaintOrderCancelListResponse'
import { BaseApi } from '../BaseApi'
import { BaseModelResponse } from '@/models/services/responses/BaseModelResponse'

class ComplaintOrderCancelDetailApi extends BaseApi {
  constructor() {
    super('order/bo/claims/tickets')
  }

  getDetailOrderCancel(id: number): Promise<ComplaintOrderCancelDetailResponse> {
    return this.get(`order-cancels/${id}/detail`)
  }

  getDetailOrderCancelTicket(id: number): Promise<ComplaintOrderCancelTicketDetailResponse> {
    return this.get(`order-cancels/${id}/detail/tickets`)
  }

  putMemoOrderCancel(claimKey: number, memo: string): Promise<BaseModelResponse<string>> {
    return this.put(`order-cancels/memo`, { claimKey, memo })
  }
}

export const complaintOrderCancelDetailApi = new ComplaintOrderCancelDetailApi()
