import { MockDataMemberPointUsageCustomerListDataTable,  } from '@/assets/mockData'
import { DEFAULT_DATE_TIME_FORMAT, FORMAT_DATE_TIME_YYYY_MM_DD_HH_MM_SS, formatTime } from '@/common'
import { PaginationModelRequest } from '@/models/services/requests/PaginationModelRequest'
import {
  MemberPointAllocationAdjustmentListRequest,
  MemberPointUsageListRequest,
  MemberRegistrationPointAllocationAdjustmentRequest
} from '@/models/services/requests/members/MemberPointUsageListRequest'
import { DataTablePaginationResponseModel } from '@/models/services/responses/BaseModelResponse'
import {
  DeliveryPointAllocationAdjustmentListResponse,
  MemberRegistrationPointAllocationAdjustmentResponse,
  MemberUsagePointCustomerCompaniesResponse,
  MemberUsagePointDetailResponse,
  MemberUsagePointHistoriesResponse
} from '@/models/services/responses/members/MemberPointUsageListResponse'
import { BaseApi } from '../BaseApi'
import { MemberFoInfoResponse } from '@/models/services/responses/members/MemberFoInfoResponse'
import {
  MemberPointUsageDetailsDataTableModel,
  MemberPointUsageListDataTableModel,
  MemberPointUsageListModel
} from '@/models/views/members/pointUsageList/MemberPointUsageListModel'
import { MemberPUCustomerListDataTableModel } from '@/models/views/members/pointUsageList/MemberPointUsageCustomerListModel'

class MemberPointUsageListApi extends BaseApi {
  constructor() {
    super('member/bo')
  }

  getPointUsageList(request: MemberPointUsageListRequest) {
    return new Promise<DataTablePaginationResponseModel<MemberPointUsageListDataTableModel>>((resolve, reject) => {
      this.get('members', request).then((res) => {
        const itemData = (res?.data ?? []).map((it: MemberPointUsageListModel) => {
          return {
            companyCode: it.company.customerKey,
            customer: it.company.customerName,
            memberKey: it.memberKey,
            nameEmployee: it.memberName,
            employmentStatus: it.company.holdingOfficeYn.title,
            accountStatus: it.accountStatusCode,
            gradeCode: it.gradeCode,
            welfarePointsAvailable:it.pointBalance,
            welfarePointsScheduledToExpire: it.extinctionScheduledPoint,
            memberRegistrationDate: formatTime(it.auditing.registeredDate, FORMAT_DATE_TIME_YYYY_MM_DD_HH_MM_SS)
          }
        })
        resolve({
          totalItems: res?.page?.totalCount,
          data: itemData
        })
      }).catch((error)=>{
        reject(error)
      })
    })
  }
  getPointUsageDetailTable(memberKey: string, params: PaginationModelRequest) {
    return new Promise<DataTablePaginationResponseModel<MemberPointUsageDetailsDataTableModel>>((resolve, reject) => {
      this.get(`members/${memberKey}/points/used`, params)
        .then((res) => {
          const dataResult = res?.data.map((item: any, index: any) => ({
            index: index + 1,
            processDate: formatTime(item?.processDate ?? '', DEFAULT_DATE_TIME_FORMAT),
            memberName: `${item?.foMemberName ?? ''} ` + (item?.foMemberKey ? `(${item?.foMemberKey})` : ''),
            pointKey: item?.pointKey,
            pointName: item?.pointName,
            useKindName: item?.useKind?.title,
            pointAmount: item?.pointAmount,
            useValidDateUsing:
              (item?.useValidDate?.startDate ? formatTime(item?.useValidDate?.startDate, DEFAULT_DATE_TIME_FORMAT) : '') +
              ' ~ ' +
              (item?.useValidDate?.endDate ? formatTime(item?.useValidDate?.endDate, DEFAULT_DATE_TIME_FORMAT) : ''),
            orderKey: item?.order?.orderKey,
            customerName: `${item?.customerName ?? ''} ` + (item?.customerKey ? `(${item?.customerKey})` : '')
          }))
          resolve({
            totalItems: res?.page?.totalCount,
            data: dataResult
          })
        })
        .catch((res) => {
          reject(res)
        })
    })
  }

  getPointUsageCustomerList(request: MemberPointUsageListRequest) {
    return new Promise<DataTablePaginationResponseModel<MemberPUCustomerListDataTableModel>>((resolve) => {
      setTimeout(() => {
        const items: any[] = []
        const maxItemInPage = request.pageNum * request.rowSize + request.rowSize

        for (let i = request.pageNum * request.rowSize; i < maxItemInPage; i++) {
          const index = i
          items.push({
            ...MockDataMemberPointUsageCustomerListDataTable,
            customerCompanyCode: MockDataMemberPointUsageCustomerListDataTable.customerCompanyCode + index
          })
        }
        resolve({
          totalItems: 3128,
          data: items
        })
      })
    })
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getCustomerInformation(customerKey: string): Promise<MemberUsagePointCustomerCompaniesResponse> {
    return this.get(`customer-companies/${customerKey}/point`)
  }

  async getPointSllocationAdjustmentList(
    customerKey: string,
    params: MemberPointAllocationAdjustmentListRequest
  ): Promise<DeliveryPointAllocationAdjustmentListResponse> {
    const { data, page: pageRes, ...otherRes } = await this.get(`customer-companies/${customerKey}/points/allocation`, params)
    const resData: DeliveryPointAllocationAdjustmentListResponse = {
      data,
      totalItems: pageRes.totalCount,
      ...otherRes
    }
    return Promise.resolve(resData)
  }

  async postPointAllocationAdjustmentList(
    customerKey: string | number,
    data: MemberRegistrationPointAllocationAdjustmentRequest
  ): Promise<MemberRegistrationPointAllocationAdjustmentResponse> {
    return await this.post(`customer-companies/${customerKey}/points/allocation`, data)
  }

  async getUsagePointDetail(customerKey: string | number, pointKey: string | number): Promise<MemberUsagePointDetailResponse> {
    return await this.get(`customer-companies/${customerKey}/points/allocation/${pointKey}`)
  }

  async postUsagePointAdjust(customerKey: string | number, pointKey: string | number): Promise<MemberUsagePointDetailResponse> {
    return await this.get(`customer-companies/${customerKey}/points/allocation/${pointKey}`)
  }

  async getUsagePointHistories(customerKey: string | number, pointKey: string | number): Promise<MemberUsagePointHistoriesResponse> {
    return await this.get(`customer-companies/${customerKey}/points/allocation/${pointKey}/histories`)
  }

  async getFoMemberInfo(memberKey: string): Promise<MemberFoInfoResponse> {
    return this.get(`members/${memberKey}`)
  }
}

export const memberPointUsageListApi = new MemberPointUsageListApi()
