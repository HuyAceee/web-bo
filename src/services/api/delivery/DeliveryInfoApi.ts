import { DeliverySellerInfoResponse } from '@/models/services/responses/delivery/DeliverySellerInfoResponse'
import { BaseApi } from '../BaseApi'
import { DeliveryCustomerFullInfoResponse, DeliveryCustomerInfoResponse, DeliverySubSellerSimpleResponse } from '@/models/services/responses/delivery/DeliveryCustomerInfoResponse'

class DeliveryInfoApi extends BaseApi {
  constructor() {
    super('member')
  }

  async getSellerInfo(sellerKey: number): Promise<DeliverySellerInfoResponse> {
    return this.get(`bo/seller-companies/${sellerKey}/simple`)
  }

  async getCustomerInfo(customerKey: number): Promise<DeliveryCustomerInfoResponse> {
    return this.get(`bo/customer-companies/${customerKey}/simple`)
  }
  async getSubSellerSimpleInfo(sellerKey: number): Promise<DeliverySubSellerSimpleResponse> {
    return this.get(`bo/seller-companies/${sellerKey}/admins/sub-sellers/simple`)
  }
  async getCustomerFullInfo(customerKey: number): Promise<DeliveryCustomerFullInfoResponse> {
    return this.get(`bo/customer-companies/${customerKey}`)
  }
}

export const deliveryInfoApi = new DeliveryInfoApi()
