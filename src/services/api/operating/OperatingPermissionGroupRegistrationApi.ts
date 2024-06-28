import { OperatingPermissionGroupRequest } from '@/models/services/requests/operating/OperatingPermissionGroupRequest'
import { BaseModelResponse } from '@/models/services/responses/BaseModelResponse'
import {
  CheckGroupAuthorityExistedResponse,
  PermissionGroupDetailResponse
} from '@/models/services/responses/operating/boAdministrator/OperatingPermissionGroupResponse'
import { AxiosResponse } from 'axios'
import { BaseApi } from '../BaseApi'

class OperatingPermissionGroupRegistrationApi extends BaseApi {
  constructor() {
    super('member/bo')
  }

  async checkAuthorityGroupsName(groupName: string): Promise<CheckGroupAuthorityExistedResponse> {
    return await this.get('authority-groups/names:exists?groupName=' + groupName)
  }
  async createPermissionGroup(request: OperatingPermissionGroupRequest): Promise<AxiosResponse<BaseModelResponse<undefined>>> {
    return await this.postRaw('authority-groups', request)
  }
  async updatePermissionGroup(groupKey: number, request: OperatingPermissionGroupRequest): Promise<BaseModelResponse<undefined>> {
    return await this.put('authority-groups/' + groupKey, request)
  }
  async getPermissionGroupDetail(groupKey: number): Promise<PermissionGroupDetailResponse> {
    return await this.get('authority-groups/' + groupKey)
  }
}

export const operatingPermissionGroupRegistrationApi = new OperatingPermissionGroupRegistrationApi()
