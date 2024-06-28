import { ProductTicketProvisionInformationItemModel, ProductTicketProvisionInformationModel } from '@/models/views'
import { BaseModelResponse } from '../../BaseModelResponse'

export interface ProductTicketBasicProvisionResponse extends BaseModelResponse<ProductTicketProvisionInformationItemModel[]> { }

export interface ProductTicketProvisionInformationResponse extends ProductTicketProvisionInformationModel { }

export interface ProductTicketApprovalProvisionInformationResponse extends ProductTicketProvisionInformationModel {
  productReqeustKey: string
}
