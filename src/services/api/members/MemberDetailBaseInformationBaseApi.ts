import { MockDataMemberDetailBaseInformation } from '@/assets/mockData'
import { MemberDetailWelfareMallDataModel } from '@/models'
import { BaseApi } from '../BaseApi'
import {
  MemberDetailBaseInformationRequest,
  MemberDetailUpdateBaseInformation,
  MemberDetailUpdateWelfareMallRequest
} from '@/models/services/requests/members/MemberDetailRequest'
import {
  MemberDetailAcceptInformationMallInMallResponse,
  MemberDetailBaseInformationResponse,
  MemberDetailBaseInformationResponseConvertor
} from '@/models/services/responses/members/MemberDetailResponse'
import { BaseModelErrorResponse } from '@/models/services/responses/BaseModelResponse'
class MemberDetailBaseInformationBaseApi extends BaseApi {
  constructor() {
    super('member/bo/members')
  }

  getMemberBaseInformationDetail(request: MemberDetailBaseInformationRequest) {
    return new Promise<MemberDetailBaseInformationResponse>((resolve, reject) => {
      if (!request.memberKey) reject(new Error(''))
      this.get(request.memberKey, request)
        .then((data) => {
          resolve({
            data: MemberDetailBaseInformationResponseConvertor.fromMemberBaseInformationDetailResponse(data)
          })
        })
        .catch((error) => {
          resolve(error)
        })
    })
  }
  async updateMemberBaseInformationDetail(
    request: MemberDetailBaseInformationRequest,
    data: MemberDetailUpdateBaseInformation
  ): Promise<BaseModelErrorResponse> {
    return this.put(`${request.memberKey}`, data)
  }

  async getMemberAcceptInformationDetailWelfareMall(request: MemberDetailBaseInformationRequest) {
    return new Promise<MemberDetailWelfareMallDataModel>((resolve, reject) => {
      if (!request.memberKey) return
      this.get(`${request.memberKey}/agreement`)
        .then((result) => {
          const data: MemberDetailWelfareMallDataModel = result.data.agreement
          resolve(data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  async updateWelfareMall(request: MemberDetailBaseInformationRequest, data: MemberDetailUpdateWelfareMallRequest): Promise<BaseModelErrorResponse> {
    return this.put(`${request.memberKey}/agreement`, data)
  }

  getMemberAcceptInformationDetailWelfareMallInMall(request: MemberDetailBaseInformationRequest) {
    return new Promise<MemberDetailAcceptInformationMallInMallResponse>((resolve, reject) => {
      if (!request.memberKey) reject(new Error(''))
      setTimeout(() => {
        const data = {
          ...MockDataMemberDetailBaseInformation.acceptTab.mallInMall
        }
        resolve({
          data: Array.from({ length: 5 }).map(() => data)
        })
      })
    })
  }
}

export const memberDetailBaseInformationApi = new MemberDetailBaseInformationBaseApi()
