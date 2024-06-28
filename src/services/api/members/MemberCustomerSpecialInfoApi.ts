import { MockDataMemberCustomerSpecialInfo } from '@/assets/mockData'
import { BaseApi } from '../BaseApi'
import { MemberCustomerSpecialInfoModelRequest } from '@/models/services/requests/members/MemberCustomerSpecialInfoRequest'
import { MemberCustomerSpecialInfoModelResponse } from '@/models/services/responses/members/MemberCustomerSpecialInfoResponse'

class MemberCustomerSpecialInfoApi extends BaseApi {
  getMemberCustomerSpecialInfoList(request: MemberCustomerSpecialInfoModelRequest) {
    return new Promise<MemberCustomerSpecialInfoModelResponse>((resolve) => {
      setTimeout(() => {
        const items: any[] = []
        const maxItemInPage = request.pageNum * request.rowSize + request.rowSize
        for (let i = request.pageNum * request.rowSize; i < maxItemInPage; i++) {
          const index = i + 1
          items.push({
            ...MockDataMemberCustomerSpecialInfo,
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

export const memberCustomerSpecialInfoApi = new MemberCustomerSpecialInfoApi()
