import { PaginationModelRequest } from '@/models/services/requests/PaginationModelRequest'
import { BaseApi } from '../BaseApi'
import { ComplaintOrderCancelListFormModel } from '@/models/views//complaint/complaintOrderCancel/ComplaintOrderCancelModel'
import { ComplaintOrderCancelListRequest } from '@/models/services/requests/complaint/complaintOrderCancel/ComplaintOrderCancelListRequest'
import { ComplaintTicketProductListRequest } from '@/models/services/requests/complaint/complaintTicketProduct/ComplaintTicketProductListRequest'
import { ComplainOrderCancelModalPutDataRequest } from '@/models/services/requests/complaint/modal/ComplainOrderCancelModalRequest'
import { ComplaintCancellationFeeChangeModalRequest } from '@/models/services/requests/complaint/modal/ComplaintCancellationFeeChangeModalRequest'
import { ComplaintCancellationFeeChangeModalResponse } from '@/models/services/responses/complaint/common/ComplaintCancellationFeeChangeModalResponse'
import { ComplaintOrderCancelModalResponse } from '@/models/services/responses/complaint/common/ComplaintOrderCancelModalResponse'
import { ComplaintOrderCancelListResponse } from '@/models/services/responses/complaint/complaintOrderCancel/ComplaintOrderCancelListResponse'
import { ComplaintTicketProductListResponse } from '@/models/services/responses/complaint/complaintTicketProduct/ComplaintTicketProductListResponse'
import { ComplaintTypeEnum } from '@/models/views/complaint/complaintTicketProduct/ComplaintTicketProductListModel'
import { FORMAT_DATE_DOT_YYYY_MM_DD_hh_mm, formatNumberDot, formatTime, renderLabelEnum } from '@/common'
class ComplaintOrderCancelApi extends BaseApi {
  constructor() {
    super('order/bo')
  }

  getComplaintTicketProdList(request: Partial<ComplaintTicketProductListRequest & PaginationModelRequest>) {
    return new Promise<ComplaintTicketProductListResponse>((resolve, reject) => {
      this.get('claims/tickets', request)
        .then((res) => {
          const dataWithIndex = res.data.map((item: any, index: any) => ({
            index: index + 1,
            ...item,
            claimType: renderLabelEnum(ComplaintTypeEnum, item.claimType)
          }))
          resolve({
            totalItems: res?.page?.totalCount,
            data: dataWithIndex
          })
        })
        .catch((res) => {
          reject(res)
        })
    })
  }

  getOrderCancelList(request: ComplaintOrderCancelListRequest & PaginationModelRequest) {
    return new Promise<ComplaintOrderCancelListResponse>((resolve, reject) => {
      this.get('claims/tickets/order-cancels', request)
        .then((res) => {
          resolve({
            totalItems: res?.page?.totalCount,
            data: res.data.map((item: ComplaintOrderCancelListFormModel, index: number) => {
              const no = index + 1 + (request.pageNum - 1) * request.pageNum
              const subcontract = item.subcontract ?? '-'
              const lastPaymentAmount = formatNumberDot(Number(item.lastPaymentAmount ?? 0)) + ' 원'
              const cancelFee = formatNumberDot(Number(item.cancelFee ?? 0)) + ' 원'
              const lastRefundAmount = formatNumberDot(Number(item.lastRefundAmount ?? 0)) + ' 원'
              const claimApproveDatetime = item.claimApproveDatetime ? formatTime(item.claimApproveDatetime, FORMAT_DATE_DOT_YYYY_MM_DD_hh_mm) : '-'
              const claimWithdrawalDatetime = item.claimWithdrawalDatetime
                ? formatTime(item.claimWithdrawalDatetime, FORMAT_DATE_DOT_YYYY_MM_DD_hh_mm)
                : '-'
              const claimApplierName = item.claimApplierName + `(${item.claimApplierKey})`
              const claimHandlerName = item.claimHandlerName ? item.claimHandlerName + `(${item.claimHandlerKey})` : '-'
              return {
                ...item,
                no: no,
                id: item.claimProductKey,
                subcontract,
                lastPaymentAmount,
                cancelFee,
                lastRefundAmount,
                claimApproveDatetime,
                claimWithdrawalDatetime,
                claimApplierName,
                claimHandlerName,
                detailReason: item.detailReason
              }
            })
          })
        })
        .catch((res) => {
          reject(res)
        })
    })
  }

  putDisposalTicketRequest(claimProductKey: string[]): Promise<ComplaintOrderCancelModalResponse> {
    return this.put('claims/tickets/order-cancels/disuse', { claimProductKey })
  }

  putOrderCancelWithdrawalReason(data: ComplainOrderCancelModalPutDataRequest): Promise<ComplaintOrderCancelModalResponse> {
    return this.put('claims/tickets/order-cancels/withdrawal', data)
  }

  putComplaintCancellationFee(data: ComplaintCancellationFeeChangeModalRequest): Promise<ComplaintCancellationFeeChangeModalResponse> {
    return this.put('claims/tickets/order-cancels/cancellation-fee', data)
  }
}

export const complaintOrderCancelApi = new ComplaintOrderCancelApi()
  