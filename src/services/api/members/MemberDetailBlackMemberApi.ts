import { MemberBlackListProcessStatusType } from '@/models'
import { BaseApi } from '../BaseApi'
import {
  MemberDetailBlackMemberGetListParamsRequest,
  MemberDetailBlackMemberRegisterDataRequest
} from '@/models/services/requests/members/MemberDetailBlackMemberRequest'
import { MemberDetailBlackMemberListResponse } from '@/models/services/responses/members/MemberDetailBlackMemberResponse'
import { BaseModelErrorResponse } from '@/models/services/responses/BaseModelResponse'

class MemberDetailBlackMemberApi extends BaseApi {
  constructor() {
    super('member/bo/members')
  }
  async getList(memberKey: string, params: MemberDetailBlackMemberGetListParamsRequest): Promise<MemberDetailBlackMemberListResponse> {
    const { data, page: pageRes, ...otherRes } = await this.get(`${memberKey}/blacklist`, params)
    const resData: MemberDetailBlackMemberListResponse = {
      data: data.map((it: any) => {
        return {
          id: it.memoKey,
          content: it.memo,
          registerId: it.auditing.registerId,
          registerKey: it.auditing.registerKey,
          registerName: it.auditing.registerName,
          registrationDate: it.auditing.registeredDate,
          reason: it.blackReasonCode,
          status: it.blackProcessStatus,
          contentLabel: this.getReasonContent(it.blackReasonCode, it.memo)
        }
      }),
      totalItems: pageRes.totalCount,
      ...otherRes
    }
    return Promise.resolve(resData)
  }

  async release(memberKey: string): Promise<BaseModelErrorResponse> {
    return this.post(`${memberKey}/blacklist:release`)
  }

  async register(memberKey: string, data: MemberDetailBlackMemberRegisterDataRequest): Promise<BaseModelErrorResponse> {
    const resData = {
      memo: data.message,
      blackProcessStatus: MemberBlackListProcessStatusType.REGISTER,
      blackReasonCode: data.reason
    }
    return this.post(`${memberKey}/blacklist:register`, resData)
  }
  getReasonContent = (blackReasonCode?: string, memo?: string) => {
    let resasonContentName: string = ''
    if (blackReasonCode) {
      resasonContentName = `사유 구분: ${blackReasonCode}`
    }
    if (memo) {
      resasonContentName += `\n상세 내용: ${memo}`
    }
    return resasonContentName
  }
}

export const memberDetailBlackMemberApi = new MemberDetailBlackMemberApi()
