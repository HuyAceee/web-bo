import { AccountStatusEnum, GradeCodeEnum } from '@/models/common'
import { EmployeeStatusEnum, GenderCodeEnum, AddressModel } from '@/models/common'

export interface MemberRegisterIndividualFormModel {
  customer?: string
  nameMember: string
  emailId: string
  password: string
  phone: string
  emailPersonal: string
  birthday: string
  jobNumber: string
  rank: string
  gender: GenderCodeEnum
  employmentStatus: EmployeeStatusEnum
  accountStatus: AccountStatusEnum
  membershipLevel: GradeCodeEnum
  customerAddress: AddressModel
  homeAddress: AddressModel
  notes?: string
  marketingAgreeYn: EmployeeStatusEnum
}
