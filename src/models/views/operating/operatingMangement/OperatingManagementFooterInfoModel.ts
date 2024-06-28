import { AddressModel } from '@/models/common'
export interface OperatingManagementFooterInfoModel {
  enterpriseName: string
  representativeName: string
  representativeTelNumber: string
  taxpayerIdentificationNumber: string
  mailOrderSalesCode: string
  faxTelNumber: string
  securityManagerName: string
  siteEmail?: string
  customerServiceCenterTelNumber: string
  medicalDeviceSalesDeclarationFileId: string
  medicalDeviceSalesDeclarationFilePath?: string
  siteInformationTitle?: string
  siteInformationPageDescription?: string
  siteInformationName?: string
  siteInformationogTagFileId?: string
  siteInformationOgTagFilePath?: string
  registrationAdmin: string
  registrationKey?: number
  registrationDate: string
  modificationAdmin: string
  modificationKey?: number
  modificationDate: string
  customerAddress: AddressModel
}

export interface OperatingManagementFooterImageModel {
  type?: string
  size?: number
}

export interface OperatingManagementFooterGetApiResponseModel {
  basicInformation: OperatingBasicInformationModel
  siteInformation: OperatingSiteInformationModel
  createdBy: OperatingCreateModifyModel
  modifiedBy: OperatingCreateModifyModel
  createdAt: string
  modifiedAt: string
}

export interface OperatingBasicInformationModel {
  enterpriseName: string
  representative: OperatingBasicInformationRepresentativeModel
  faxTelNumber: string
  taxpayerIdentificationNumber: string
  mailOrderSalesCode: string
  address: OperatingBasicInformationAddressModel
  securityManagerName: string
  siteEmail: string
  customerServiceCenterTelNumber: string
  medicalDeviceSalesDeclarationFileDownloadLink: string
}

export interface OperatingBasicInformationRepresentativeModel {
  name: string
  telNumber: string
}

export interface OperatingBasicInformationAddressModel {
  zipCode: string
  streetName: string
  lotNumber: string
  detailAddress: string
}

export interface OperatingSiteInformationModel {
  title: string
  pageDescription: string
  siteName: string
  ogTagFileDownloadLink: string
}

export interface OperatingCreateModifyModel {
  key: number
  name: string
}
