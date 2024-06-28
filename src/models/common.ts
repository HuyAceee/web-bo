import { WelfareSelectOptionType } from './uikit'

export enum EmployeeStatusEnum {
  Y = 'Y',
  N = 'N'
}

export enum AccountStatusEnum {
  ACTIVE = 'ACTIVE',
  NOT_ACTIVE = 'NOT_ACTIVE',
  INACTIVE = 'INACTIVE'
}

export enum GradeCodeEnum {
  GENERAL = 'GENERAL',
  BLACK = 'BLACK'
}

export enum GenderCodeEnum {
  MAN = 'MAN',
  WOMAN = 'WOMAN',
  NONE = 'NONE'
}
export enum EmployeeStatusKrEnum {
  Y = '재직',
  N = '퇴사'
}

export enum AccountStatusKrEnum {
  ACTIVE = '사용',
  NOT_ACTIVE = '미사용'
}

export enum GradeCodeKrEnum {
  GENERAL = '일반',
  /* 05.12.23 do not create member with black grade */
  BLACK = '블랙'
}

export enum GenderCodeKrEnum {
  MAN = '남자',
  WOMAN = '여자',
  NONE = '구분없음'
}

export interface AddressModel {
  zipCode: string
  loadNameAddress: string
  loadLotBasedAddress: string
  detailedAddress: string
}

export type FilterResult<T> = {
  validItems: T[]
  invalidItems: T[]
}

export interface SelectOptionModel {
  label: string
  value: string
}

export const MemberGender = ['여자', '남자', '구분없음', 'MAN', 'WOMAN', 'NONE']

export const EmployeeStatus = ['재직', '퇴사', 'Y', 'N']

export const AccountStatus = ['사용', '미사용', 'ACTIVE', 'INACTIVE']

export const MemberShipLevel = ['일반', 'GENERAL']

export enum YnOptions {
  Y = 'Y',
  N = 'N'
}

export const productStatusSell: WelfareSelectOptionType[] = [
  { label: '판매중', value: '01' },
  { label: '판매일시중지', value: '02' },
  { label: '일시품절', value: '03' },
  { label: '품절', value: '04' },
  { label: '판매 종료', value: '05' }
]
export enum productStatusSellEnum {
  ON_SALE = '01',
  TEMPORARILY_SUSPENDED = '02',
  TEMPORARILY_OUT_OF_STOCK = '03',
  OUT_OF_STOCK = '04',
  END_OF_SALE = '05'
}

export enum OperationSystemEnum {
  BACK_OFFICE = 'BO',
  PARTNER_OFFICE = 'PO',
  COMPANY_OFFICE = 'CO'
}

export const defaultFormRadioValue = '01'

export type GenericOptionType<T> = {
  label: string
  value: T
}

export type MergeColsTableConfigType = {
  field: string
  header: string
  required?: boolean
  class?: string
  span?: string | number
  children?: MergeColsTableConfigType[]
}

export type BaseArrayFormModel<T> = {
  data: T[]
}