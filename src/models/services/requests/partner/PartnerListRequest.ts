import { YnOptions } from "@/models/common"
import { PaginationModelRequest } from "../PaginationModelRequest"

export interface PartnerListRequest extends PaginationModelRequest {
  contractType?: string,
  contractStatus?: string,
  sellerStatus?: string,
  sellerKey?: string,
  sellerName?: string,
  startDate?: string,
  endDate?: string,
  searchType?: string,
  searchWord?: string,
}

export interface PartnerActiveRequest {
  sellerStatus: YnOptions,
  sellerKeyList: number[]
}


// Partner Registration

export enum PartnerCompanyBizType {
  SOLE_PROP = "01",
  CORPORATION = "02"
}

export interface PartnerRegistrationCompanyModelRequest {
  sellerStatus: YnOptions,
  sellerName: string,
  bizRegNum: string,
  bizType: PartnerCompanyBizType,
  corpRegNum: string,
  bizItemCode: number,
  internetSalesRegNum: string,
  zipCode: number,
  streetAddress: string,
  address: string,
  addressDetail: string,
  representativeName: string,
  representativeBirthDate: string,
  representativeTelNum: string,
  registrationFileId: string,
  introductionFileId: string,
  introductionContent: string,
  companyHomePageUrl: string
}
export interface PartnerRegistrationContractModelRequest {
  contractType: string,
  contractRegDate: string,
  contractStartDate: string,
  contractEndDate: string,
  settlementDate: string,
  contractFileId: string,
}

export interface PartnerRegistrationCategoryModelRequest {
  standardCategoryId: string,
  marginRate: number,
  isRepresentative: boolean
}

export interface PartnerRegistrationBankAccountModelRequest {
  bankCode: string,
  accountNumber: number,
  bankBranchName: string,
  accountHolderName: string,
  accountImageId: string,
  accountImageDelYn: YnOptions,
  accountImageAltName: string
}

export interface PartnerRegistrationPermissionModelRequest {
  submitSpecificProductSalesPermission: YnOptions,
  specificProductSalesPermissionList: {
    permissionType: string,
    permissionFileId: string,
  }[]
}

export interface PartnerRegistrationModelRequest {
  company: PartnerRegistrationCompanyModelRequest,
  contract: PartnerRegistrationContractModelRequest,
  categoryList: PartnerRegistrationCategoryModelRequest[],
  permission: PartnerRegistrationPermissionModelRequest,
  bankAccount: PartnerRegistrationBankAccountModelRequest
}