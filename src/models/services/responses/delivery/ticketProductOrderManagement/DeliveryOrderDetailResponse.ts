import { BaseModelResponse } from '../../BaseModelResponse'

export interface DeliveryFailureResponseModel {
  receiverProductOrderKey: number
  code: string
  message: string
}

interface DeliveryOrderDetailTicketIssueModel {
  failureResponses: DeliveryFailureResponseModel[]
}

export interface DeliveryOrderDetailTicketIssueResponse extends BaseModelResponse<DeliveryOrderDetailTicketIssueModel> {}
