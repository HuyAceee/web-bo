import { WelfareSelectOptionType } from '@/models/uikit'
import { PartnerContractStatus, PartnerContractType } from './PartnerListModel'
import { PartnerContractFileModel } from './PartnerUploadFileModel'

export enum PartnerRegisterForSalesOptionsOptionType {
  USE = 'Y',
  NOT_USED = 'N'
}

export const partnerRegisterForSalesOptionsOptions = [
  {
    label: '판매권한 신청하지 않음',
    value: PartnerRegisterForSalesOptionsOptionType.NOT_USED
  },
  {
    label: '판매권한 신청',
    value: PartnerRegisterForSalesOptionsOptionType.USE
  }
]

export enum PartnerAttachmentType {
  BIZ_REGISTRATION = '01',
  INTRODUCTION = '02',
  CONTRACT = '03',
  BANK_STATEMENT = '04',
  HEALTH = '05',
  MEDICAL = '06',
  ALCOHOL = '07',
  ABROAD = '08',
  COSMETICS = '09'
}

export enum PartnerBankCodeType {
  KYONGNAMBANK = '039',
  GWANGJUBANK = '034',
  LOCALNONGHYEOP = '012',
  BUSANBANK = '032',
  SAEMAUL = '045',
  SANLIM = '064',
  SHINHAN = '088',
  SHINHYEOP = '048',
  CITI = '027',
  WOORI = '020',
  POST = '071',
  SAVINGBANK = '050',
  JEONBUKBANK = '037',
  JEJUBANK = '035',
  KAKAOBANK = '090',
  TOSSBANK = '092',
  HANA = '081',
  HSBC = '054',
  IBK = '003',
  KOOKMIN = '004',
  DAEGUBANK = '031',
  KDBBANK = '002',
  NONGHYEOP = '011',
  SC = '023',
  SUHYEOP = '007'
}

export const PartnerApplicationProductStatusOptions: WelfareSelectOptionType[] = [
  { label: '사업자등록증', value: PartnerAttachmentType.BIZ_REGISTRATION },
  { label: '회사소개서', value: PartnerAttachmentType.INTRODUCTION },
  { label: '계약서', value: PartnerAttachmentType.CONTRACT },
  { label: '계좌 사본', value: PartnerAttachmentType.BANK_STATEMENT },
  { label: '건강기능식품 관련', value: PartnerAttachmentType.HEALTH },
  { label: '의료기기 관련', value: PartnerAttachmentType.MEDICAL },
  { label: '전통주 관련', value: PartnerAttachmentType.ALCOHOL },
  { label: '수입식품 관련 (구매대행)', value: PartnerAttachmentType.ABROAD },
  { label: '화장품 관련 (구매대행)', value: PartnerAttachmentType.COSMETICS }
]
export interface PartnerAuditingModel {
  registerKey: number
  registerId: string
  registerName: string
  registeredDate: string
  modifierKey: number
  modifierId: string
  modifierName: string
  modifiedDate: string
}

export interface PartnerBasicContractInfoModel {
  contractKey: number
  sellerKey: number
  sellerName: string
  contractStartDate: string
  contractEndDate: string
  contractStatus: string
  contractRegDate: string
  settlementDate: string
  contractType: string
  contractFileOriginName: string
  contractFileSize: number
  contractFileDownloadLink: string
  auditing: PartnerAuditingModel
}

export const PartnerContractStatusOptions: WelfareSelectOptionType[] = [
  { label: '계약 진행 중', value: PartnerContractStatus.STARTED },
  { label: '계약 예정', value: PartnerContractStatus.UPCOMING },
  { label: '계약 완료', value: PartnerContractStatus.TERMINATED }
]

export const PartnerContractTypeOptions: WelfareSelectOptionType[] = [
  { label: '위수탁계약', value: PartnerContractType.CONSIGNMENT },
  { label: '배송', value: PartnerContractType.DIRECT }
]

export const PartnerBankCodeOptions: WelfareSelectOptionType[] = [
  { label: '경남은행', value: PartnerBankCodeType.KYONGNAMBANK },
  { label: '광주은행', value: PartnerBankCodeType.GWANGJUBANK },
  { label: '단위농협(지역농축협)', value: PartnerBankCodeType.LOCALNONGHYEOP },
  { label: '부산은행', value: PartnerBankCodeType.BUSANBANK },
  { label: '새마을금고', value: PartnerBankCodeType.SAEMAUL },
  { label: '산림조합', value: PartnerBankCodeType.SANLIM },
  { label: '신한은행', value: PartnerBankCodeType.SHINHAN },
  { label: '신협', value: PartnerBankCodeType.SHINHYEOP },
  { label: '씨티은행', value: PartnerBankCodeType.CITI },
  { label: '우리은행', value: PartnerBankCodeType.WOORI },
  { label: '우체국예금보험', value: PartnerBankCodeType.POST },
  { label: '저축은행중앙회', value: PartnerBankCodeType.SAVINGBANK },
  { label: '전북은행', value: PartnerBankCodeType.JEONBUKBANK },
  { label: '제주은행', value: PartnerBankCodeType.JEJUBANK },
  { label: '토스뱅크', value: PartnerBankCodeType.KAKAOBANK },
  { label: '하나은행', value: PartnerBankCodeType.TOSSBANK },
  { label: '하나은행', value: PartnerBankCodeType.HANA },
  { label: '홍콩상하이은행', value: PartnerBankCodeType.HSBC },
  { label: 'IBK기업은행', value: PartnerBankCodeType.IBK },
  { label: 'KB국민은행', value: PartnerBankCodeType.KOOKMIN },
  { label: 'DGB대구은행', value: PartnerBankCodeType.DAEGUBANK },
  { label: 'KDB산업은행', value: PartnerBankCodeType.KDBBANK },
  { label: 'NH농협은행', value: PartnerBankCodeType.NONGHYEOP },
  { label: 'SC제일은행', value: PartnerBankCodeType.SC },
  { label: 'Sh수협은행', value: PartnerBankCodeType.SUHYEOP }
]
export interface PartnerSalesCategoryModel {
  categoryKey: number
  sellerKey: number
  standardCategoryId: string
  standardCategoryName: string
  chargeMdKey: number
  chargeMdName: string
  marginRate: number
  isRepresentative: boolean
}

export interface PartnerSpecificProductSalesPermissionListModel {
  permissionKey: number
  permissionType: string
  permissionFileOriginName: string
  permissionFileSize: number
  permissionFileDownloadLink: string
  permissionDelYn: string
}

export interface PartnerPermissionsModel {
  submitSpecificProductSalesPermission: PartnerRegisterForSalesOptionsOptionType
  specificProductSalesPermissionList: PartnerSpecificProductSalesPermissionListModel[]
}

export interface PartnerBankAccountInfoModel {
  bankAccountKey: number
  bankCode: string
  bankBranchName: string
  accountNumber: string
  accountHolderName: string
  accountImageOriginName: string
  accountImageSize: number
  accountImageDownloadLink: string
  accountImageDelYn: string
}

export interface PartnerBankAccountEmits {
  (e: 'get-data', data: PartnerBankAccountRequestModel): void
}

export interface PartnerCategoryListModel {
  standardCategoryId: string
  marginRate: number
  isRepresentative: boolean
}

export interface PartnerSpecificProductSalesPermissionListRequestModel {
  permissionType: string
  permissionFileId?: string
  permissionDelYn?: string
  permissionAltName?: string
}

export interface PartnerContractRequestModel {
  sellerKey: number
  contractType: string
  contractRegDate: string
  contractStartDate: string
  contractEndDate: string
  settlementDate: string
  contractFileId?: string
  contractDelYn?: string
  contractAltName?: string
}
export interface PartnerBankAccountRequestModel {
  bankCode: string
  accountNumber: string
  bankBranchName: string
  accountHolderName: string
  accountImageId?: string
  accountImageDelYn?: string
  accountImageAltName?: string
  isChecked?: boolean
}
export interface PartnerContractsRequestModel {
  contract: PartnerContractRequestModel
  categoryList: PartnerCategoryListModel[]
  permission: {
    submitSpecificProductSalesPermission: string
    specificProductSalesPermissionList: PartnerSpecificProductSalesPermissionListRequestModel[]
  }
  bankAccount: PartnerBankAccountRequestModel
}

export const partnerSelectProductGroupOptions = [
  { label: '건강기능식품 관련', value: PartnerAttachmentType.HEALTH },
  { label: '의료기기 관련', value: PartnerAttachmentType.MEDICAL },
  { label: '전통주 관련', value: PartnerAttachmentType.ALCOHOL },
  { label: '수입식품 관련 (구매대행)', value: PartnerAttachmentType.ABROAD },
  { label: '화장품 관련 (구매대행', value: PartnerAttachmentType.COSMETICS }
]

export interface PartnerPermissionToSellPeriodItemModel {
  id: string
  productGroup: any
  document: PartnerContractFileModel
  file: any
}

export const emptyPartnerPermissionToSellPeriodItem: PartnerPermissionToSellPeriodItemModel = {
  id: '0',
  productGroup: undefined,
  document: {},
  file: undefined
}
