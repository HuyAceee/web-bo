import { AccountStatusEnum, EmployeeStatusEnum, GenderCodeEnum, GradeCodeEnum } from '@/models/common'

export interface MemberCustomerRegisterIndividualRequest {
  memberId: string
  password: string
  memberName: string
  cellphoneNumber: string
  birthDate: string
  genderCode: GenderCodeEnum
  email: string
  accountStatusCode: AccountStatusEnum
  gradeCode: GradeCodeEnum
  memo: string
  deliveryZipCode: number
  deliveryLoadNameAddress: string
  deliveryLoadLotBasedAddress: string
  deliveryDetailedAddress: string
  company: {
    customerKey: number
    employeeNumber: string
    holdingOfficeYn: EmployeeStatusEnum
    rankName: string
    companyZipCode: number
    companyLoadNameAddress: string
    companyLoadLotBasedAddress: string
    companyDetailedAddress: string
  }
  agreement: {
    marketingAgreeYn: EmployeeStatusEnum
  }
}
