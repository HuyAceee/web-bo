import { FORMAT_DATE_TIME_YYYY_MM_DD_HH_MM_SS, formatNumberDot, formatTime } from '@/common'
import { DeliveryTicketProductFilterTableRequest } from '@/models/services/requests/delivery/common/DeliveryTicketProductFilterTableRequest'
import { DeliveryCancelRequestRequest } from '@/models/services/requests/delivery/modal/DeliveryCancelRequestRequest'
import { DeliveryTicketProductListOrderStatusRequest } from '@/models/services/requests/delivery/ticketProductOrderManagement/DeliveryListOrderStatusRequest'
import { DeliveryOrderDetailTicketIssueRequestModel } from '@/models/services/requests/delivery/ticketProductOrderManagement/DeliveryOrderDetailRequest'
import { DeliveryTicketProductOrderStatusProductRequest } from '@/models/services/requests/delivery/ticketProductOrderManagement/DeliveryOrderStatusProductRequest'
import { BaseModelErrorResponse } from '@/models/services/responses/BaseModelResponse'
import {
  DeliveryTicketProductFilterTableResponse, DeliveryTicketProductFilterTableResponseConvertor,
} from '@/models/services/responses/delivery/common/DeliveryTicketProductFilterTableResponse'
import { DeliveryOrderCancelResponse } from '@/models/services/responses/delivery/modal/DeliveryCancelRequesResponse'
import { DeliveryCancelResponseModel } from '@/models/services/responses/delivery/modal/DeliveryCancelRequestModalResponse'
import { DeliveryReceiptResponseModel } from '@/models/services/responses/delivery/modal/DeliveryReceiptModalResponse'
import { DeliveryTicketProductListOrderStatusResponse } from '@/models/services/responses/delivery/ticketProductOrderManagement/DeliveryListOrderStatusResponse'
import { DeliveryOrderDetailTicketIssueResponse } from '@/models/services/responses/delivery/ticketProductOrderManagement/DeliveryOrderDetailResponse'
import { DeliveryTicketProductOrderStatusProductResponse } from '@/models/services/responses/delivery/ticketProductOrderManagement/DeliveryOrderStatusProductResponse'
import { renderStandardCategoriesName } from '@/models/views/delivery/common'
import { DeliveryTicketProductListOrderStatusModel } from '@/models/views/delivery/ticketProductOrderManagement/DeliveryTicketProductListOrderStatusModel'
import { DeliveryTicketProductOrderStatusProductModel } from '@/models/views/delivery/ticketProductOrderManagement/DeliveryTicketProductOrderStatusProductModel'
import { BaseApi } from '../BaseApi'

class DeliveryListOrderStatusApi extends BaseApi {
  constructor() {
    super('order/bo/orders/tickets')
  }

  async getList(params: DeliveryTicketProductListOrderStatusRequest): Promise<DeliveryTicketProductListOrderStatusResponse> {
    const { data, page: pageRes, ...otherRes } = await this.get(`overall`, params)
    const mappingData = (data as DeliveryTicketProductListOrderStatusModel[])?.map((item) => {
      const { receivers, ...otherItem } = item
      for (const key in otherItem) {
        if (!otherItem[key]) {
          otherItem[key] = '-'
        }
      }
      otherItem.orderQuantity = otherItem.orderQuantity ?? '-'
      otherItem.applePaymentAmount = otherItem.applePaymentAmount ?? '-'
      otherItem.samsungPayPaymentAmount = otherItem.samsungPayPaymentAmount ?? '-'
      otherItem.lPayPaymentAmount = otherItem.lPayPaymentAmount ?? '-'
      otherItem.phonePaymentAmount = otherItem.phonePaymentAmount ?? '-'
      const orderDate = otherItem.orderDate ? formatTime(otherItem.orderDate, FORMAT_DATE_TIME_YYYY_MM_DD_HH_MM_SS) : ''
      const productAmount = formatNumberDot(otherItem.productAmount)
      const immediateDiscountAmount = formatNumberDot(otherItem.immediateDiscountAmount)
      const couponDiscountAmount = formatNumberDot(otherItem.couponDiscountAmount)
      const lastPaymentAmount = formatNumberDot(otherItem.lastPaymentAmount)
      const welfarePointPaymentAmount = formatNumberDot(otherItem.welfarePointPaymentAmount)
      const creditCartPaymentAmount = formatNumberDot(otherItem.creditCartPaymentAmount)

      const receiverName = receivers.length > 1 ? receivers[0].name + ` 외 ${receivers.length - 1} 명` : receivers[0].name
      const receiverPhone = receivers.length > 1 ? receivers[0].phone + ` 외 ${receivers.length - 1} 개` : receivers[0].phone
      return {
        ...otherItem,
        productAmount,
        immediateDiscountAmount,
        couponDiscountAmount,
        lastPaymentAmount,
        welfarePointPaymentAmount,
        creditCartPaymentAmount,
        receiverName,
        receiverPhone,
        orderDate
      }
    })
    const resData: DeliveryTicketProductListOrderStatusResponse = {
      data: mappingData,
      totalItems: pageRes.totalCount,
      ...otherRes
    }
    return Promise.resolve(resData)
  }

  async getListByProduct(params: DeliveryTicketProductOrderStatusProductRequest): Promise<DeliveryTicketProductOrderStatusProductResponse> {
    const { data, page: pageRes, ...otherRes } = await this.get(`by-product`, params)
    const dataMapping = (data as DeliveryTicketProductOrderStatusProductModel[])?.map(
      (item: DeliveryTicketProductOrderStatusProductModel, index: number) => {
        return {
          ...item,
          standardCategoryName: renderStandardCategoriesName(item.standardCategories),
          no: index + 1
        }
      }
    )
    const resData: DeliveryTicketProductOrderStatusProductResponse = {
      data: dataMapping,
      totalItems: pageRes.totalCount,
      ...otherRes
    }
    return Promise.resolve(resData)
  }

  async getAllTicketList(params: DeliveryTicketProductFilterTableRequest): Promise<DeliveryTicketProductFilterTableResponse> {
    const { data = [], page: pageRes, ...otherRes } = await this.get('products/receivers/issued', params)
    const dataMapping = DeliveryTicketProductFilterTableResponseConvertor(data)
    const resData: DeliveryTicketProductFilterTableResponse = {
      data: dataMapping,
      totalItems: pageRes.totalCount,
      ...otherRes
    }
    return Promise.resolve(resData)
  }

  async getAllOrders(params: DeliveryTicketProductFilterTableRequest): Promise<DeliveryTicketProductFilterTableResponse> {
      const { data = [], page: pageRes, ...otherRes } = await this.get('products/receivers', params)
    const dataMapping = DeliveryTicketProductFilterTableResponseConvertor(data)
    const resData: DeliveryTicketProductFilterTableResponse = {
      data: dataMapping,
      totalItems: pageRes.totalCount,
      ...otherRes
    }
    return Promise.resolve(resData)
  }

  async getAllPurchaseConfirmList(params: DeliveryTicketProductFilterTableRequest): Promise<DeliveryTicketProductFilterTableResponse> {
    const { data = [], page: pageRes, ...otherRes } = await this.get('products/receivers/purchase-completed', params)
    const dataMapping = DeliveryTicketProductFilterTableResponseConvertor(data)
    const resData: DeliveryTicketProductFilterTableResponse = {
      data: dataMapping,
      totalItems: pageRes.totalCount,
      ...otherRes
    }
    return Promise.resolve(resData)
  }

  async confirmPurchase(key: string | number): Promise<BaseModelErrorResponse> {
    const response = await this.put(`products/receivers/${key}/status/purchase-complete`, null)
    return Promise.resolve(response)
  }

  async getCancelRequestByOrderKey(key: string | number): Promise<DeliveryCancelResponseModel> {
    const response = await this.get(`order-cancels/${key}`)
    return Promise.resolve(response)
  }

  async putTicketIssue(data: DeliveryOrderDetailTicketIssueRequestModel): Promise<DeliveryOrderDetailTicketIssueResponse> {
    return await this.put(`products/receivers/ticket-issue`, data)
  }

  async putOrderCancel(data: DeliveryCancelRequestRequest): Promise<DeliveryOrderCancelResponse> {
    return await this.put('order-cancels', data)
  }

  async getReceiptByOrderKey(key: string | number): Promise<DeliveryReceiptResponseModel> {
    return await this.get(`${key}/receipt`)
  }
}

export const deliveryListOrderStatusApi = new DeliveryListOrderStatusApi()
