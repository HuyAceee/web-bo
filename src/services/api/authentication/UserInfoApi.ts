import { UserInfoModelRequest } from '@/models/services/requests/authentications/UserInfoRequest'
import { BaseApi } from '../BaseApi'
import { UserInfoModelResponse } from '@/models/services/responses/authentication/UserInfoResponse'
import { EditUserInfoModelResponse, EditUserInfoVerifyEmailModelResponse } from '@/models/services/responses/authentication/EditUserInfoResponse'

class UserInfoApi extends BaseApi {
  constructor() {
    super('member')
  }
  async getDataUser(): Promise<UserInfoModelResponse> {
    return this.get('bo/admins/me')
  }
  async editUserInfo(data: UserInfoModelRequest): Promise<UserInfoModelResponse> {
    return this.put('bo/admins/me', data)
  }
  async updateEmail(email: string): Promise<EditUserInfoModelResponse> {
    return this.post(`bo/admins/changed-email:verify`, { email })
  }
  async getExistsPhone(phone: string): Promise<EditUserInfoModelResponse> {
    return this.get(`bo/admins/phone:exists?phone=${phone}`)
  }
  async verifyEmail(email: string): Promise<EditUserInfoVerifyEmailModelResponse> {
    return this.post(`bo/admins/me/email-verification:confirm`, { email })
  }
}

export const userInfoApi = new UserInfoApi()
