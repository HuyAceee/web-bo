import { BaseModelErrorResponse } from '@/models/services/responses/BaseModelResponse'
import { BaseApi } from '../BaseApi'
import {
  OperatingAdministratorsListResponse,
  OperatingAuthorityGroupsNamesResponse
} from '@/models/services/responses/operating/boAdministrator/OperatingPermissionGroupListResponse'
import { OperatingAdministratorsTableModel } from '@/models/views/operating/adminManagement/OperatingAdministratorsListOfAdministratorsModel'
import {
  OperatingAdministratorsListRequest,
  OperatingAdministratorsUpdateStatusRequest
} from '@/models/services/requests/operating/OperatingPermissionGroupListRequest'

class OperatingAdministratorApi extends BaseApi {
  constructor() {
    super('member/bo')
  }

  async getAdministrator(params: OperatingAdministratorsListRequest): Promise<OperatingAdministratorsListResponse> {
    const { data, page, ...otherRes } = await this.get('admins', params)
    const dataMapping = data?.map((item: OperatingAdministratorsTableModel, index: number) => {
      return {
        ...item,
        id: item?.managerKey,
        no: index + 1
      }
    })
    const resData: OperatingAdministratorsListResponse = {
      data: dataMapping,
      totalItems: page.totalCount,
      ...otherRes
    }
    return Promise.resolve(resData)
  }

  async putUpdateGroupStatus(data: OperatingAdministratorsUpdateStatusRequest): Promise<BaseModelErrorResponse> {
    const response = await this.put('admins/status', data)
    return Promise.resolve(response)
  }

  async getAuthorityGroupsNames(): Promise<OperatingAuthorityGroupsNamesResponse> {
    return await this.get('authority-groups/names')
  }
}

export const operatingAdministratorApi = new OperatingAdministratorApi()
