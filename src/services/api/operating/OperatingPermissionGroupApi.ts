import { BaseModelErrorResponse } from '@/models/services/responses/BaseModelResponse'
import { BaseApi } from '../BaseApi'
import {
  OperatingAdministratorsPermissionListResponse,
  OperatingAuthorityGroupsNamesResponse
} from '@/models/services/responses/operating/boAdministrator/OperatingPermissionGroupListResponse'
import { OperatingAdministratorsPermissionTableModel } from '@/models/views/operating/adminManagement/OperatingAdministratorsListOfPermissionsModel'
import {
  OperatingAdministratorsListRequest,
  OperatingAdministratorsPermissionUpdateStatusRequest
} from '@/models/services/requests/operating/OperatingPermissionGroupListRequest'

class OperatingPermissionGroupApi extends BaseApi {
  constructor() {
    super('member/bo')
  }

  async getAdministrator(params: OperatingAdministratorsListRequest): Promise<OperatingAdministratorsPermissionListResponse> {
    const { data, page, ...otherRes } = await this.get('authority-groups', params)
    const dataMapping = data?.map((item: OperatingAdministratorsPermissionTableModel, index: number) => {
      return {
        ...item,
        id: item?.groupKey,
        no: index + 1
      }
    })
    const resData: OperatingAdministratorsPermissionListResponse = {
      data: dataMapping,
      totalItems: page.totalCount,
      ...otherRes
    }
    return Promise.resolve(resData)
  }

  async putUpdateGroupStatus(data: OperatingAdministratorsPermissionUpdateStatusRequest): Promise<BaseModelErrorResponse> {
    const response = await this.put('authority-groups/status', data)
    return Promise.resolve(response)
  }

  async getAuthorityGroupsNames(): Promise<OperatingAuthorityGroupsNamesResponse> {
    return await this.get('authority-groups/names')
  }
}

export const operatingPermissionGroupApi = new OperatingPermissionGroupApi()
