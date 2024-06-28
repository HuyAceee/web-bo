import { MemberBulkRegistrationTableMockData } from '@/assets/mockData'
import { BaseApi } from '../BaseApi'
import {
  MemberBulkRegistrationRequest,
  MemberMultiGetCompanyRequest,
  MemberRegisterInBulkRequest
} from '@/models/services/requests/members/MemberRegistrationRequest'
import {
  MemberBulkRegistrationResponse,
  MemberCommonCodeGroupsResponse,
  MemberMultiGetCompanyResponse
} from '@/models/services/responses/members/MemberRegistrationResponse'
import { DataTablePaginationResponseModel } from '@/models/services/responses/BaseModelResponse'
import { MemberRegistrationModel } from '@/models/views/members/memberBulkRegistration/MemberBulkRegistrationModel'

class MemberRegistrationApi extends BaseApi {
  constructor() {
    super('member')
  }

  registerInBulk(request: MemberRegisterInBulkRequest) {
    return new Promise<DataTablePaginationResponseModel<MemberRegistrationModel>>((resolve) => {
      setTimeout(() => {
        const items: MemberRegistrationModel[] = []
        const maxItemInPage = request.pageNum * request.rowSize + request.rowSize
        for (let i = request.pageNum * request.rowSize; i < maxItemInPage; i++) {
          items.push({
            ...MemberBulkRegistrationTableMockData,
            id: i + 1
            // memberShipCode: MemberBulkRegistrationTableMockData.memberShipCode + i + ''
          })
        }
        resolve({
          totalItems: 1234,
          data: items
        })
      })
    })
  }
  getMultiCustomerCompany(request: MemberMultiGetCompanyRequest): Promise<MemberMultiGetCompanyResponse> {
    return this.post('bo/customer-companies:multiGet', request)
  }

  bulkRegistration(request: MemberBulkRegistrationRequest, isShowErrorModal: boolean = true): Promise<MemberBulkRegistrationResponse> {
    return this.post('bo/members:batch', request, {}, isShowErrorModal)
  }
  async getCommonCodeGroups(): Promise<MemberCommonCodeGroupsResponse> {
    return this.get('bo/members/common-code-groups')
  }
}

export const memberRegistrationApi = new MemberRegistrationApi()
