export interface OperatingUploadAttachmentRequestModel {
  file: string
  altName: string
}
export class OperatingUploadAttachmentConverter {
  static from(file: any, alt: string): OperatingUploadAttachmentRequestModel {
    return {
      file: file,
      altName: alt
    }
  }
}
