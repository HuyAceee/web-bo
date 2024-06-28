import { MemberRemarkGetListResponse } from '@/models/services/responses/members/MemberRemarkResponse'
import { BaseApi } from '../BaseApi'
import { MemberRemarkDeleteDataRequest, MemberRemarkGetListParamsRequest } from '@/models/services/requests/members/MemberRemarkRequest'
import { BaseModelErrorResponse } from '@/models/services/responses/BaseModelResponse'

class MemberRemarkApi extends BaseApi {
  constructor() {
    super('member/bo/members')
  }

  async getList(memberId: string, params: MemberRemarkGetListParamsRequest): Promise<MemberRemarkGetListResponse> {
    const { data, page: pageRes, ...otherRes } = await this.get(`${memberId}/remarks`, params)
    const resData: MemberRemarkGetListResponse = {
      data: data.map((it: any, index: number) => {
        return {
          id: (params.pageNum - 1) * params.rowSize + index + 1,
          detail: it.memo,
          registerId: it.auditing.registerId,
          registerKey: it.auditing?.registerKey,
          registerName: it.auditing.registerName,
          registrationDate: it.auditing.modifiedDate?.replace('T', ' ')
        }
      }),
      totalItems: pageRes.totalCount,
      ...otherRes
    }
    return Promise.resolve(resData)
  }

  async postItem(memberKey: string, message: string): Promise<BaseModelErrorResponse> {
    const data = { memo: message }
    return this.post(`${memberKey}/remarks`, data)
  }

  async deleteList(data: MemberRemarkDeleteDataRequest): Promise<BaseModelErrorResponse> {
    const reqData = { memoKeys: data.memoIds }
    return this.delete('remarks', reqData)
  }
}

export const memberRemarkApi = new MemberRemarkApi()
