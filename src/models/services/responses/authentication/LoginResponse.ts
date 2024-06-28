import { BaseModelResponse } from '../BaseModelResponse'
interface LoginPolicyViolationModel {
  violationType: string
  resolveRequired: boolean
}
export interface LoginDataModelResponse {
  policyViolation: LoginPolicyViolationModel
  policyViolated: boolean
  accessToken: string
  refreshToken: string
  authenticated: boolean
  tokenType: string
  accountStatusNormal: boolean
}

export interface LoginModelResponse extends BaseModelResponse<LoginDataModelResponse> {}
