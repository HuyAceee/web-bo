import { WelfareSelectOptionType } from '@/models/uikit'

export interface CompanyCustomerRegistrationModel {
  company: CompanyModel
  contract: CompanyContractModel
  tempIntroductionFile: CompanyFileTempModel | undefined
  tempRegistrationFile: CompanyFileTempModel | undefined
  tempContractFile: CompanyFileTempModel | undefined
  tempValidBizRegNumber: boolean
  tempValidCustomerId: boolean
}

export interface CompanyFileTempModel {
  file: File
  url: string
  name: string
  size: number
  uploaded: boolean
}

export interface CompanyModel {
  customerStatus: string
  customerName: string
  bizType: string
  bizRegNum: string
  corpRegNum: string
  bizItemCode: string
  zipCode: string
  streetAddress: string
  address: string
  addressDetail: string
  representativeName: string
  representativeTelNum: string
  registrationFileId: string
  registrationDelYn: string
  registrationAltName: string
  introductionFileId: string
  introductionDelYn: string
  introductionAltName: string
  introductionContent: string
  companyHomePageUrl: string
  customerId: string
  businessTypeTemp: string
}

export interface CompanyContractModel {
  contractRegDate: string
  contractStartDate: string
  contractEndDate: string
  settlementDate: number
  contractFileId: string
  contractDelYn: string
  contractAltName: string
}

export type CompanyCheckExistsType = 'customer-id' | 'registration-number'

export function unique<T>(array: Array<T>, comparator: (args: T) => any): Array<T> {
  return array.reduce((uniqueArray, item) => {
    if (!uniqueArray.find((i) => comparator(i) === comparator(item))) {
      uniqueArray.push(item)
    }
    return uniqueArray
  }, [] as Array<T>)
}

export interface CompanyCustomFormRegistrationProps {
  valueProps: CompanyCustomerRegistrationModel
  mapCategoryToBusinessTypes: { [prop: string]: Array<WelfareSelectOptionType> }
  bizCategories: Array<WelfareSelectOptionType>
  mapObjectBusinessTypes: { [prop: string]: WelfareSelectOptionType }
  mapObjectCategories: { [prop: string]: WelfareSelectOptionType }
}

export type MapObjectBusinessTypes = { [prop: string]: { item: WelfareSelectOptionType; list: Array<WelfareSelectOptionType> } }

export const customerRegistrationRadioOption = [
  { label: '법인사업자', value: '1' },
  { label: '일반사업자', value: '2' }
]

export enum CompanyCustomerContactStatusEnum {
  start = '01',
  upComing = '02',
  terminated = '03'
}

export const companyCustomerStatusText = {
  [CompanyCustomerContactStatusEnum.start]: '계약',
  [CompanyCustomerContactStatusEnum.upComing]: '예정',
  [CompanyCustomerContactStatusEnum.terminated]: '계약종료'
}

export interface CompanyCustomerContactDataBaseModel {
  contractRegDate: string
  contractStartDate: string
  contractEndDate: string
  settlementDate?: number
}

export interface CompanyCustomerContactDataPostModel extends CompanyCustomerContactDataBaseModel {
  contractFileId: string
  contractAltName: string
}

export interface CompanyCustomerContactModel extends CompanyCustomerContactDataBaseModel {
  contractKey: number
  customerKey: number
  contractStatus: CompanyCustomerContactStatusEnum
  contractFileOriginName: string
  contractFileSize: number
  contractFileDownloadLink: string
}

export interface ContractDataFileModel {
  attachmentType: string
  attachmentId: string
  attachmentFileOriginName: string
  attachmentFileSize: number
}

export enum CompanyAttachmentType {
  bizRegistration = '01',
  introduction = '02',
  contract = '03',
  bankStatement = '04',
  health = '05',
  medical = '06',
  alcohol = '07',
  abroad = '08',
  cosmetics = '09'
}

export interface CompanyReviewContractModalProps {
  data: CompanyCustomerContactModel
}

export interface CompanyReviewContractModalEmits {
  (e: 'close'): void
  (e: 'save', data: CompanyCustomerContactModel): void
}
