import { BaseModelResponse } from '../BaseModelResponse'
export interface EditUserInfoModelResponse {
  isExist: boolean
}
export interface EditUserInfoVerifyEmailModelResponse {
  isVerified: boolean
}
export interface EditUserInfoModelResponse extends BaseModelResponse<EditUserInfoModelResponse> {}
export interface EditUserInfoVerifyEmailModelResponse extends BaseModelResponse<EditUserInfoVerifyEmailModelResponse> {}
