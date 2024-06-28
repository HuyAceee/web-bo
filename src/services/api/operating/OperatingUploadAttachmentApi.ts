import { OperatingTicketAttachFileModelResponse } from '@/models/services/responses/operating/ticket/OperatingTicketMoreInformationResponse'
import { BaseApi } from '../BaseApi'
import { OperatingUploadAttachmentConverter } from '@/models/services/requests/operating/OperatingUploadAttachmentRequest'

class OperatingUploadImageApi extends BaseApi {
  constructor() {
    super('operation/bo/footers')
  }

  async uploadAttachFile(
    file: any,
    alt: string,
    fileType: 'medical-device-sales-declaration' | 'og-tag'
  ): Promise<OperatingTicketAttachFileModelResponse> {
    const endpoint = fileType ? `${fileType}:upload` : 'og-tag:upload'
    const paramsConvert = OperatingUploadAttachmentConverter.from(file, alt)
    return this.postMultipart(endpoint, paramsConvert)
  }
}

export const operatingUploadImageApi = new OperatingUploadImageApi()
