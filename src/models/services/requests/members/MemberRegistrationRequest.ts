import { MemberCommonCodeGroups } from '@/models/services/responses/members/MemberRegistrationResponse'
import { hyphenRegex } from '@/common'
import { PaginationModelRequest } from '@/models/services/requests/PaginationModelRequest'
import { MemberRegistrationModel } from '@/models/views/members/memberBulkRegistration/MemberBulkRegistrationModel'
export interface MemberRegisterInBulkRequest extends PaginationModelRequest {}

interface CompanyInfoModel {
  customerKey: number
  employeeNumber: string
  holdingOfficeYn: string
  rankName: string
  companyZipCode?: number
  companyLoadNameAddress?: string
  companyLoadLotBasedAddress?: string
  companyDetailedAddress?: string
}

interface MemberRegistrationModelApi {
  memberId: string
  memberName: string
  cellphoneNumber: string
  birthDate: string
  genderCode: string
  accountStatusCode: string
  gradeCode: string
  company: CompanyInfoModel
}
export interface MemberBulkRegistrationRequest {
  batchRequests: MemberRegistrationModelApi[]
}
export interface MemberMultiGetCompanyRequest {
  keyList: number[]
}

export class MemberRegistrationRequestConvertor {
  static from(member: MemberRegistrationModel, colInfo?: MemberCommonCodeGroups): MemberRegistrationModelApi {
    const {
      email,
      name,
      phone,
      dateOfBirth,
      gender,
      accountStatus,
      memberShipLevel,
      customerCompanyCode,
      jobNumber,
      rank,
      employeeStatus,
      companyZipCode,
      companyLoadNameAddress,
      companyLoadLotBasedAddress,
      companyDetailedAddress
    } = member

    const genderCode = colInfo?.genderCode?.codes?.find((it) => it?.title === gender)?.code ?? gender
    const accountStatusCode = colInfo?.accountStatus?.codes?.find((it) => it?.title === accountStatus)?.code ?? accountStatus
    const gradeCode = colInfo?.gradeCode?.codes?.find((it) => it?.title === memberShipLevel)?.code ?? memberShipLevel
    const holdingOfficeYn = colInfo?.holdingOfficeYn?.codes?.find((it) => it?.title === employeeStatus)?.code ?? employeeStatus

    return {
      memberId: email,
      memberName: name,
      cellphoneNumber: phone.replace(hyphenRegex, ''),
      birthDate: dateOfBirth,
      genderCode,
      accountStatusCode,
      gradeCode,
      company: {
        customerKey: customerCompanyCode,
        employeeNumber: jobNumber,
        rankName: rank,
        holdingOfficeYn,
        companyZipCode,
        companyLoadNameAddress,
        companyLoadLotBasedAddress,
        companyDetailedAddress
      }
    }
  }
}
