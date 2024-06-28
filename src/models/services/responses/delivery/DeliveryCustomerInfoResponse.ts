import { DeliveryCustomerFullInfoModel, DeliveryCustomerInfoModel } from '@/models/views/delivery/modal/DeliveryCustomerInfoModel'
import { BaseModelResponse } from '../BaseModelResponse'
import { DeliverySubSellerSimpleModel } from '@/models/views/delivery/modal/DeliverySellerAndCustomerSearchModel'

export interface DeliveryCustomerInfoResponse extends BaseModelResponse<DeliveryCustomerInfoModel> {}

export interface DeliveryCustomerFullInfoResponse extends BaseModelResponse<DeliveryCustomerFullInfoModel> {}

export interface DeliverySubSellerSimpleResponse extends BaseModelResponse<DeliverySubSellerSimpleModel[]> {}
