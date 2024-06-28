import { BaseApi } from '../BaseApi'
import {
  MemberListPointPaymentDetailResponse,
  MemberListPointUsageDetailResponse
} from '@/models/services/responses/members/MemberListPointDetailResponse'
import { PaginationModelRequest } from '@/models/services/requests/PaginationModelRequest'

class MemberListPointDetailApi extends BaseApi {
  constructor() {
    super('member/bo/members')
  }
  getMemberPointPaymentData(memberId: string, request: PaginationModelRequest) {
    return new Promise<MemberListPointPaymentDetailResponse>((resolve, reject) => {
      this.get(`${memberId}/points/assigned`, request)
        .then((res) => {
          const dataPayment = res?.data.map((item: any, index: any) => ({
            index: index + 1,
            ...item,
          }))
          resolve({
            totalItems: res?.page?.totalCount,
            data: dataPayment
          })
        })
        .catch((res) => {
          reject(res)
        })
    })
  }
  getMemberPointUsageData(memberId: string, request: PaginationModelRequest) {
    return new Promise<MemberListPointUsageDetailResponse>((resolve, reject) => {
      this.get(`${memberId}/points/used`, request)
        .then((res) => {
          const dataUsage = res?.data.map((item: any, index: any) => ({
            index: index + 1,
            ...item,
          }))
          resolve({
            totalItems: res?.page?.totalCount,
            data: dataUsage
          })
        })
        .catch((res) => {
          reject(res)
        })
    })
  }
}

export const memberListPointDetailApi = new MemberListPointDetailApi()
