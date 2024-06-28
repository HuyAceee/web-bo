import { ExhibitionTemplateManagementModel } from '@/models/views/exhibition/templateManagement/ExhibitionTemplateManagementModel'

export interface ExhibitionRegisterTemplateDetailRequest {
  templateName?: string
  imagePathName?: string
  imageName?: string
  imageDeleteYn?: string
  imageAltName?: string
  displayYn?: string
  applyChannelType?: string
  templateAttributeProductYn?: string
  templateAttributeBannerYn?: string
  templateAttributeProductGroupYn?: string
  templateAttributeSpecialPriceYn?: string
  templateAttributeTextYn?: string
  templateRemarkContents?: string
}

export interface ExhibitionModifyTemplateDetailRequest extends ExhibitionRegisterTemplateDetailRequest {
  templateKey?: number
}

export interface ExhibitionDeleteAttachedFileRequest {
  filePathName?: string
  fileName?: string
}

export class ExhibitionDeleteAttachedFileConvertor {
  static from(value: ExhibitionTemplateManagementModel): ExhibitionDeleteAttachedFileRequest {
    return {
      fileName: value.imageName,
      filePathName: value.imagePathName
    }
  }
}
