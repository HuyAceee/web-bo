import { ProductTicketDataFileModel, ProductTicketMoreInformationModel } from '@/models'
import { BaseApi } from '../../BaseApi'
import {
  ProductTicketApprovalDetailInfoRequest,
  ProductTicketDetailBasicInfoRequest
} from '@/models/services/requests/products/ticket/ProductTicketBaseInfoRequest'
import { ProductTicketMoreInformationRequest } from '@/models/services/requests/products/ticket/ProductTicketMoreInformationRequest'
import {
  ProductTicketMoreInformationResponse,
  ProductTicketUpdateSuccessResponse
} from '@/models/services/responses/products/ticket/ProductTicketMoreInformationResponse'
class ProductTicketMoreInfoApi extends BaseApi {
  constructor() {
    super('shop/bo/item')
  }

  async getDetailMoreInfo(params: ProductTicketDetailBasicInfoRequest): Promise<ProductTicketMoreInformationResponse> {
    return this.get('item-detail-description-info', params)
  }

  deleteAttachFile(params: ProductTicketDataFileModel): Promise<ProductTicketUpdateSuccessResponse> {
    const paramsConvert = ProductTicketMoreInformationRequest.from(params)
    return this.put('item-attach-file-delete', paramsConvert)
  }

  updateDescriptionManager(params: ProductTicketMoreInformationModel): Promise<ProductTicketUpdateSuccessResponse> {
    const paramsConvert = ProductTicketMoreInformationRequest.fromPostDescription(params)
    return this.put('item-description-manage', paramsConvert)
  }

  insertAttachFile(params: any[]): Promise<ProductTicketUpdateSuccessResponse> {
    const paramsConvert = ProductTicketMoreInformationRequest.fromRegisterFileConvert(params)
    return this.put('item-attach-file-insert', paramsConvert)
  }
  // Approval
  async getDetailApprovalMoreInfo(params: ProductTicketApprovalDetailInfoRequest): Promise<ProductTicketMoreInformationResponse> {
    return this.get('item-request-detail-description-info', params)
  }

  deleteApprovalAttachFile(params: ProductTicketDataFileModel): Promise<ProductTicketUpdateSuccessResponse> {
    const paramsConvert = ProductTicketMoreInformationRequest.fromApproveDeleteFile(params)
    return this.put('item-request-attach-file-delete', paramsConvert)
  }

  updateApprovalDescriptionManager(params: ProductTicketMoreInformationModel): Promise<ProductTicketUpdateSuccessResponse> {
    const paramsConvert = ProductTicketMoreInformationRequest.fromApprovalPostDescription(params)
    return this.put('item-request-description-manage', paramsConvert)
  }

  insertApprovalAttachFile(params: any[]): Promise<ProductTicketUpdateSuccessResponse> {
    const paramsConvert = ProductTicketMoreInformationRequest.fromApprovalRegisterFileConvert(params)
    return this.put('item-request-attach-file-insert', paramsConvert)
  }
}

export const productTicketMoreInfoApi = new ProductTicketMoreInfoApi()
