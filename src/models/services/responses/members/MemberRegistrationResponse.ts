import { BaseModelResponse } from '../BaseModelResponse'

export interface MemberBulkRegistrationModel {
  memberKey: number
  memberId: string
  isSuccessful: 'Y' | 'N'
  reasonOfFailed?: string
}

interface CustomerAddressModel {
  customerKey: number
  customerName: string
  zipCode: string
  streetAddress: string
  address: string
  addressDetail: string
}

export const memberRegistrationCompanyEmpty = {
  code: '',
  message: '',
  data: []
}

export interface MemberFieldCode {
  code: string;
  title: string;
}

export interface MemberFieldCodeGroup<T extends string> {
  groupCode: T;
  groupName: string;
  codes: MemberFieldCode[];
}

export interface MemberCommonCodeGroups {
  [fields: string]: MemberFieldCodeGroup<string>;
}

export interface MemberBulkRegistrationResponse extends BaseModelResponse<MemberBulkRegistrationModel[]> {}

export interface MemberMultiGetCompanyResponse extends BaseModelResponse<CustomerAddressModel[]> {}

export interface MemberCommonCodeGroupsResponse extends BaseModelResponse<MemberCommonCodeGroups> {}
