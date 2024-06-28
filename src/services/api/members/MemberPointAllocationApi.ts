import { BaseApi } from '../BaseApi'
import {
  MemberCustomerSelectResponse,
  MemberPointAllocationPointDetailResponse,
  MemberPointAllocationRegistrationAdjustResponse,
  MemberPointAllocationResponse,
  MemberPointDeductionListResponse
} from '@/models/services/responses/members/MemberPointAllocationListResponse'
import { MemberPointDeductionRequest } from '@/models/services/requests/members/MemberPointDeductionRequestConvertor'
import { MemberPointAllocationAdjustRegistrationDataModelRequest } from '@/models/services/requests/members/MemberPointUsageListRequest'
import { MemberPointAdjustmentListFormModel } from '@/models/views/members/memberWelfarePoint/MemberWelfarePointAdjustmentModel'

class MemberPointAllocationApi extends BaseApi {
  constructor() {
    super('member/bo/customer-companies')
  }

  async getMemberPointAllocation(customerKey: string, pointKey: string): Promise<MemberPointAllocationResponse> {
    return this.get(`${customerKey}/points/allocation/${pointKey}`)
  }

  async getMemberPointDeductionList(request: MemberPointDeductionRequest): Promise<MemberPointDeductionListResponse> {
    const { data, page: pageRes, ...otherRes } = await this.get(`${request.memberId}/points/deduction`, request.params)
    const resData: MemberPointDeductionListResponse = {
      data: data.map((it: MemberPointAdjustmentListFormModel, index: number) => {
        return {
          ...it,
          no: index + 1 + (request.params.pageNum - 1) * request.params.rowSize,
          id: it.pointKey
        }
      }),
      totalItems: pageRes?.totalCount,
      ...otherRes
    }
    return Promise.resolve(resData)
  }

  async getMemberPointAllocationList(request: MemberPointDeductionRequest): Promise<MemberPointDeductionListResponse> {
    const { data, page: pageRes, ...otherRes } = await this.get(`${request.memberId}/points/allocation`, request.params)
    const resData: MemberPointDeductionListResponse = {
      data: data.map((it: MemberPointAdjustmentListFormModel, index: number) => {
        return {
          ...it,
          no: index + 1 + (request.params.pageNum - 1) * request.params.rowSize,
          id: it.pointKey
        }
      }),
      totalItems: pageRes?.totalCount,
      ...otherRes
    }
    return Promise.resolve(resData)
  }

  async getPointDetail(customerKey: string, pointKey: string): Promise<MemberPointAllocationPointDetailResponse> {
    const { data, ...others } = await this.get(`${customerKey}/points/allocation/${pointKey}`)
    const reqData: MemberPointAllocationPointDetailResponse = {
      ...others,
      data: {
        customerKey: data?.customerKey,
        customerName: data?.customerName,
        pointKey: data?.pointKey,
        managementKind: data?.managementKind?.code,
        processCategory: data?.processCategory?.code,
        detailedCategory: data?.detailedCategory?.code,
        targetKind: data?.targetKind?.code,
        pointName: data?.pointName,
        pointAmount: data?.pointAmount,
        useStartDate: data?.useValidDate?.startDate,
        useEndDate: data?.useValidDate?.endDate,
        managerMemo: data?.managerMemo,
        processReason: data?.processReason,
        allocationDate: data?.allocationDate,
        adjustmentDate: data?.adjustmentDate,
        foMembers: data?.foMemberList.map((it: any) => ({
          pointMemberKey: it?.pointMemberKey,
          pointAmount: it?.pointAmount,
          managerMemo: it?.managerMemo,
          foMemberKey: it?.memberDetails?.memberKey,
          memberName: it?.memberDetails?.memberName,
          memberId: it?.memberDetails?.memberId,
          cellphone: it?.memberDetails?.cellphone,
          customerKey: it?.memberDetails?.customerDetails?.customerKey,
          customerName: it?.memberDetails?.customerDetails?.customerName
        })),
        foMemberCount: data?.foMemberCount,
        registerKey: data?.auditing?.registerKey,
        registerId: data?.auditing?.registerId,
        registerName: data?.auditing?.registerName,
        registeredDate: data?.auditing?.registeredDate,
        modifierKey: data?.auditing?.modifierKey,
        modifierId: data?.auditing?.modifierId,
        modifierName: data?.auditing?.modifierName,
        modifiedDate: data?.auditing?.modifiedDate
      }
    }
    return Promise.resolve(reqData)
  }

  async registerPointAdjust(
    customerKey: string,
    pointKey: string,
    data: MemberPointAllocationAdjustRegistrationDataModelRequest
  ): Promise<MemberPointAllocationRegistrationAdjustResponse> {
    return this.post(`${customerKey}/points/allocation/${pointKey}:adjust`, data)
  }

  getCustomerCompanyKeys(): Promise<MemberCustomerSelectResponse> {
    return this.get('keys')
  }
}

export const memberPointAllocationApi = new MemberPointAllocationApi()
