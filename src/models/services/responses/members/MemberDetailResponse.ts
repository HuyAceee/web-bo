import { DEFAULT_DATE_FORMAT_ERROR_MESSAGE_NULL, FORMAT_DATE_TIME_YYYY_MM_DD_HH_MM_SS, PASSWORD_TEXT, formatTime } from '@/common'
import { DEFAULT_DATE_FORMAT } from '@/common/constant'
import {
  MemberDetailBaseInformationModel,
  MemberDetailBaseModel,
  MemberDetailWelfareMallInMallInformationModel,
  MemberDetailWelfareMallInformationModel
} from '@/models'
import { BaseModelResponse } from '../BaseModelResponse'
import { MemberAccountStatus, MemberGenderCode } from '@/models/services/requests/members/MemberListRequest'

export type MemberDetailResponse = BaseModelResponse<MemberDetailBaseModel>

export interface MemberDetailBaseInformationResponse {
  data: MemberDetailBaseInformationModel
}

export class MemberDetailBaseInformationResponseConvertor {
  static fromMemberBaseInformationDetailResponse(data: any) {
    return {
      customer: data.data.company.customerName,
      nameCustomer: data.data.memberName,
      idRegister: data.data.memberId,
      password: PASSWORD_TEXT,
      phone: data.data.cellphoneNumber,
      level: data.data.company.rankName,
      employeeNumber: data.data.company.employeeNumber,
      employeeStatus: data.data.company.holdingOfficeYn?.code,
      birthDate: formatTime(data.data.birthDate, DEFAULT_DATE_FORMAT),
      gender: data.data.genderCode?.code === MemberGenderCode.MAN ? 2 : data.data.genderCode?.code === MemberGenderCode.NONE ? 0 : 1,
      positionMember: data.data.gradeCode?.title,
      // certification: data.data.company.companyZipCode,
      certification: data.data?.authenticationYn?.title, // feedback mz kr 201223
      emailPersonal: data.data.email,
      customerAddress: {
        zipCode: data.data.deliveryZipCode,
        loadNameAddress: data.data.deliveryLoadNameAddress,
        loadLotBasedAddress: data.data.deliveryLoadLotBasedAddress,
        detailedAddress: data.data.deliveryDetailedAddress
      },
      memberRegistrationDateTime: data.data.latestLoginDate
        ? formatTime(data.data.auditing.registeredDate, FORMAT_DATE_TIME_YYYY_MM_DD_HH_MM_SS)
        : '',
      accountStatus: data.data.accountStatusCode?.code === MemberAccountStatus.ACTIVE ? 0 : 1,
      lassAccessDate: data.data.latestLoginDate ? formatTime(data.data.latestLoginDate, FORMAT_DATE_TIME_YYYY_MM_DD_HH_MM_SS) : '',
      passwordChangeDate:
        formatTime(data.data.passwordChangeDate, FORMAT_DATE_TIME_YYYY_MM_DD_HH_MM_SS) == DEFAULT_DATE_FORMAT_ERROR_MESSAGE_NULL
          ? ''
          : formatTime(data.data.passwordChangeDate, FORMAT_DATE_TIME_YYYY_MM_DD_HH_MM_SS),
      companyAddress: {
        zipCode: data.data.company.companyZipCode,
        loadNameAddress: data.data.company.companyLoadNameAddress,
        loadLotBasedAddress: data.data.company.companyLoadLotBasedAddress,
        detailedAddress: data.data.company.companyDetailedAddress
      },
      customerKey: data.data.company.customerKey,
      latestBlackListChangedAdminId: data.data.latestBlackListChangedAdminId,
      latestBlackListChangeAdminName: data.data.latestBlackListChangeAdminName,
      latestBlackListChangedDate: data.data.latestBlackListChangedDate
        ? formatTime(data.data.latestBlackListChangedDate, FORMAT_DATE_TIME_YYYY_MM_DD_HH_MM_SS)
        : '',

      createdById: data.data.auditing?.registerKey,
      createdByName: data.data.auditing?.registerName,
      createdDate: data.data.auditing?.registeredDate ? formatTime(data.data.registeredDate, FORMAT_DATE_TIME_YYYY_MM_DD_HH_MM_SS) : '',

      modifiedDate: data.data?.auditing?.modifiedDate ? formatTime(data.data?.auditing?.modifiedDate, FORMAT_DATE_TIME_YYYY_MM_DD_HH_MM_SS) : ''
    }
  }
}

export interface MemberDetailAcceptInformationMallResponse {
  data: MemberDetailWelfareMallInformationModel[]
}

export interface MemberDetailAcceptInformationMallInMallResponse {
  data: MemberDetailWelfareMallInMallInformationModel[]
}
