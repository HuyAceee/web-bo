export interface PartnerContractFileModel {
  attachmentType?: string
  attachmentId?: string
  attachmentFileOriginName?: string
  attachmentFileSize?: number
  contractFileDownloadLink?: string
}

export const partnerFileDefault = {
  attachmentType: '',
  attachmentId: '',
  attachmentFileOriginName: '',
  attachmentFileSize: 0,
  contractFileDownloadLink: ''
}
