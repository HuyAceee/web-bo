import { DEFAULT_DATE_FORMAT, formatTime } from '@/common'
import { MemberAccountStatus, MemberGenderCode } from './MemberListRequest'

export interface MemberDetailBaseInformationRequest {
  memberKey: string
}

export interface MemberDetailUpdateWelfareMallRequest {
  marketingAgreeYn: string
  smsAgreeYn: string
  emailAgreeYn: string
  kakaoAgreeYn: string
}
export interface MemberDetailUpdateBaseInformation {
  cellphoneNumber: string
  deliveryLoadLotBasedAddress: string
  deliveryLoadNameAddress: string
  genderCode: string
  deliveryZipCode: string
  accountStatusCode: string
  birthDate: string
  deliveryDetailedAddress: string
  email: string
  company: {
    companyLoadLotBasedAddress: string
    companyLoadNameAddress: string
    customerKey: string
    rankName: string
    companyZipCode: string
    holdingOfficeYn: string
    companyDetailedAddress: string
    employeeNumber: string
  }
}
export class MemberUpdateDetailRequestConvertor {
  static from(detailMember: any): MemberDetailUpdateBaseInformation {
    let genderCode: MemberGenderCode
    switch (detailMember.data.gender) {
      case 0:
        genderCode = MemberGenderCode.NONE
        break
      case 2:
        genderCode = MemberGenderCode.MAN
        break
      default:
        genderCode = MemberGenderCode.WOMAN
        break
    }
    return {
      cellphoneNumber: detailMember.data.phone,
      deliveryLoadLotBasedAddress:
        detailMember.data.customerAddress.loadLotBasedAddress === '' ? '-' : detailMember.data.customerAddress.loadLotBasedAddress,
      deliveryLoadNameAddress: detailMember.data.customerAddress.loadNameAddress === '' ? '-' : detailMember.data.customerAddress.loadNameAddress,
      genderCode: genderCode,
      deliveryZipCode: detailMember.data.customerAddress.zipCode,
      accountStatusCode: detailMember.data.accountStatus === '0' ? MemberAccountStatus.ACTIVE : MemberAccountStatus.NOT_ACTIVE,
      birthDate: formatTime(detailMember.data.birthDate, DEFAULT_DATE_FORMAT),
      deliveryDetailedAddress: detailMember.data.customerAddress.detailedAddress === '' ? '-' : detailMember.data.customerAddress.detailedAddress,
      email: detailMember.data.emailPersonal,
      company: {
        companyLoadLotBasedAddress:
          detailMember.data.companyAddress.loadLotBasedAddress === '' ? '-' : detailMember.data.companyAddress.loadLotBasedAddress,
        companyLoadNameAddress: detailMember.data.companyAddress.loadNameAddress === '' ? '-' : detailMember.data.companyAddress.loadNameAddress,
        customerKey: detailMember.data.customerKey,
        rankName: detailMember.data.level,
        companyZipCode: detailMember.data.companyAddress.zipCode,
        holdingOfficeYn: detailMember.data.employeeStatus,
        companyDetailedAddress: detailMember.data.companyAddress.detailedAddress === '' ? '-' : detailMember.data.companyAddress.detailedAddress,
        employeeNumber: detailMember.data.employeeNumber
      }
    }
  }
}
