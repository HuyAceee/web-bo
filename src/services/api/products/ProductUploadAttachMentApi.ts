import { ProductTicketAttachFileModelResponse } from '@/models/services/responses/products/ticket/ProductTicketMoreInformationResponse'
import { BaseApi } from '../BaseApi'
import { ProductUploadAttachMentRequest } from '@/models/services/requests/products/ProductUploadAttachMentRequest'

class ProductUploadAttachmentApi extends BaseApi {
  constructor() {
    super('shop/bo/item')
  }
  async uploadAttachFile(params: any): Promise<ProductTicketAttachFileModelResponse> {
    const paramsConvert = ProductUploadAttachMentRequest.from(params)
    return this.postMultipart('uploadAttachment', paramsConvert)
  }
}
export const productUploadAttachmentApi = new ProductUploadAttachmentApi()
