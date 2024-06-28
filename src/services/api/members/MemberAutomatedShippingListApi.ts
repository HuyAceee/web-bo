import { DataTablePaginationResponseModel } from '@/models/services/responses/BaseModelResponse'
import { MemberAutomatedShippingListRequest } from '@/models/services/requests/members/MemberAutomatedShippingListRequest'
import { MockDataMemberAutomatedShippingListDataTable } from '@/assets/mockData'
import { BaseApi } from '../BaseApi'
import { MemberAutomatedShippingDataTableModel } from '@/models/views/members/automatedShippingList/MemberAutomatedShippingListModel'

class MemberAutomatedShippingListApi extends BaseApi {
  getAutomatedShippings(request: MemberAutomatedShippingListRequest) {
    return new Promise<DataTablePaginationResponseModel<MemberAutomatedShippingDataTableModel>>((resolve) => {
      setTimeout(() => {
        const items: any[] = []
        const maxItemInPage = request.pageNum * request.rowSize + request.rowSize

        for (let i = request.pageNum * request.rowSize; i < maxItemInPage; i++) {
          const index = i
          items.push({
            ...MockDataMemberAutomatedShippingListDataTable,
            id: index,
            number: index,
            code: MockDataMemberAutomatedShippingListDataTable.code + index
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

export const memberAutomatedShippingListApi = new MemberAutomatedShippingListApi()
