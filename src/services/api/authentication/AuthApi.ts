import { BaseApi } from '../BaseApi'
import { LoginModelRequest } from '@/models/services/requests/authentications/LoginRequest'
import { ChangePasswordModelRequest } from '@/models/services/requests/authentications/ChangePasswordRequest'
import { LoginModelResponse } from '@/models/services/responses/authentication/LoginResponse'
import { ChangePasswordModelResponse, SkipChangePasswordModelResponse } from '@/models/services/responses/authentication/ChangePasswordResponse'

class AuthApi extends BaseApi {
  constructor() {
    super('member/bo')
  }

  async login(data: LoginModelRequest): Promise<LoginModelResponse> {
    return this.post('auth:login', data, {}, false)
  }
  async resetAccount(): Promise<LoginModelResponse> {
    return this.post('auth:login/state:reset', {}, false)
  }
  async changePassword(data: ChangePasswordModelRequest): Promise<ChangePasswordModelResponse> {
    return this.put('admins/me/password', data, {}, false)
  }

  async skipChangePassword(): Promise<SkipChangePasswordModelResponse> {
    return this.post('admins/me/password:skip')
  }

  async refreshToken(): Promise<LoginModelResponse> {
    return this.post('auth:reissue', {}, {}, false)
  }

  async emailVerify(customAccessToken: string): Promise<LoginModelResponse> {
    return this.post('admins/email:verify', {}, {}, false, false, {
      Authorization: `Bearer ${customAccessToken}`
    })
  }
  async emailVerifyChangeInfo(customAccessToken: string): Promise<LoginModelResponse> {
    return this.post('admins/me/email:verify', {}, {}, false, false, {
      Authorization: `Bearer ${customAccessToken}`
    })
  }
}

export const authApi = new AuthApi()
