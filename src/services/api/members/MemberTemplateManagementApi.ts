import { MockDateMemberTemplateManagementDataTable } from '@/assets/mockData'
import { BaseApi } from '../BaseApi'
import { MemberTemplateManagementRequest } from '@/models/services/requests/members/MemberTemplateManagementRequest'
import { MemberTemplateManagementResponse } from '@/models/services/responses/members/MemberTemplateManagementResponse'

class MemberTemplateManagementApi extends BaseApi {
  getMemberTemplateManagementList(request: MemberTemplateManagementRequest) {
    return new Promise<MemberTemplateManagementResponse>((resolve) => {
      setTimeout(() => {
        const items: any[] = []
        const maxItemInPage = request.pageNum * request.rowSize + request.rowSize
        for (let i = request.pageNum * request.rowSize; i < maxItemInPage; i++) {
          const index = i + 1
          items.push({
            ...MockDateMemberTemplateManagementDataTable,
            id: index
          })
        }
        resolve({
          totalItems: 3128,
          data: items
        })
      })
    })
  }
}

export const memberTemplateManagementApi = new MemberTemplateManagementApi()
