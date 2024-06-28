import { BaseModelResponse } from '@/models/services/responses/BaseModelResponse'
import {
  GetGroupAuthorityResponse,
  PermissionGroupDetailResponse
} from '@/models/services/responses/operating/boAdministrator/OperatingAdministratorsRegistrationResponse'
import { AxiosResponse } from 'axios'
import { BaseApi } from '../BaseApi'
import { OperatingAdminPermissionRegisForm } from '@/models/views/operating/adminManagement/OperatingAdministratorsRegistrationModel'

class OperatingAdministratorsRegistrationApi extends BaseApi {
  constructor() {
    super('member/bo')
  }

  async getAuthorityGroupsNames(): Promise<GetGroupAuthorityResponse> {
    return await this.get('authority-groups/names')
  }

  async create(request: OperatingAdminPermissionRegisForm): Promise<AxiosResponse<BaseModelResponse<undefined>>> {
    return await this.postRaw('admins', request)
  }

  async update(managerId: number, request: OperatingAdminPermissionRegisForm): Promise<BaseModelResponse<undefined>> {
    return await this.put('admins/' + managerId, request)
  }

  async detail(managerId: number): Promise<PermissionGroupDetailResponse> {
    return await this.get('admins/' + managerId)
  }

  async checkEmail(email: string): Promise<BaseModelResponse<{ isExist: boolean }>> {
    return await this.get('admins/email:exists?email=' + email)
  }
  async checkManagerId(managerId: string): Promise<BaseModelResponse<{ isExist: boolean }>> {
    return await this.get('admins/id:exists?managerId=' + managerId)
  }
  async checkPhone(phone: string): Promise<BaseModelResponse<{ isExist: boolean }>> {
    return await this.get('admins/phone:exists?phone=' + phone)
  }
  async getTemporaryPassword(): Promise<BaseModelResponse<{ password: string }>> {
    return await this.post('admins/temporary-password:issue')
  }
}

export const operatingAdministratorsRegistrationApi = new OperatingAdministratorsRegistrationApi()
