import { BaseModelResponse } from '@/models/services/responses/BaseModelResponse'
import { YnOptions } from '@/models'

export interface PartnerCompanyDetailDetailResponse extends BaseModelResponse<PartnerCompanyDetailDetailModel> {}

export interface PartnerCompanyDetailDetailModel {
  sellerKey: number
  sellerStatus: YnOptions
  sellerId: number
  sellerName: string
  corpRegNum: string
  bizRegNum: string
  bizCategoryName: string
  address: string
  bizItemName: string
  representativeName: string
  representativeBirthDate: string
  representativeTelNum: string
  bizRegDocumentFileOriginName: string
  bizRegDocumentFileSize: number
  introductionDocumentFileOriginName: string
  introductionDocumentFileSize: number
  bizRegDocumentFileDownloadLink: string
  introductionDocumentFileDownloadLink: string
  introductionContent: string
  companyHomePageUrl: string
  internetSalesRegNum: string
  streetAddress: string
  addressDetail: string
  bizType: string
  auditing: {
    registerKey: number
    registerId: string
    registerName: string
    registeredDate: string
    modifierKey: number
    modifierId: string
    modifierName: string
    modifiedDate: string
  }
}
