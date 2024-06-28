import { BaseApi } from '../BaseApi'
import { PartnerAttachmentType } from '@/models/views/partner/PartnerSellerContractDetailModel'
import { PartnerContractFileResponse } from '@/models/services/responses/partner/PartnerUploadFileResponse'

class PartnerUploadFileApi extends BaseApi {
  constructor() {
    super('member/bo/seller-companies/files')
  }

  uploadContractFile(file: any): Promise<PartnerContractFileResponse> {
    const formData = new FormData()
    formData.append('attachmentFile', file)
    formData.append('attachmentType', PartnerAttachmentType.CONTRACT)
    return this.postMultipart('contract:upload', formData, {}, false)
  }

  uploadBankAccountFile(file: any): Promise<PartnerContractFileResponse> {
    const formData = new FormData()
    formData.append('attachmentFile', file)
    formData.append('attachmentType', PartnerAttachmentType.BANK_STATEMENT)
    return this.postMultipart('bank-account:upload', formData)
  }

  uploadPermissionFile(file: any, type?: any): Promise<PartnerContractFileResponse> {
    const formData = new FormData()
    formData.append('attachmentFile', file)
    formData.append('attachmentType', type)
    return this.postMultipart('permission:upload', formData)
  }

  uploadIntroductionFile(file: any): Promise<PartnerContractFileResponse> {
    const formData = new FormData()
    formData.append('attachmentFile', file)
    formData.append('attachmentType', PartnerAttachmentType.INTRODUCTION)
    return this.postMultipart('introduction:upload', formData)
  }

  uploadRegistrationFile(file: any): Promise<PartnerContractFileResponse> {
    const formData = new FormData()
    formData.append('attachmentFile', file)
    formData.append('attachmentType', PartnerAttachmentType.BIZ_REGISTRATION)
    return this.postMultipart('registration:upload', formData)
  }
}

export const partnerUploadFileApi = new PartnerUploadFileApi()
