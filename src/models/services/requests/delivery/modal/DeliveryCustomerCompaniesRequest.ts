import { PaginationModelRequest } from '@/models/services/requests/PaginationModelRequest'
import { DEFAULT_DATE_FORMAT, formatTime } from '@/common'
import { DeliverySellerAndCustomerSearchModel } from '@/models/views/delivery/modal/DeliverySellerAndCustomerSearchModel'

export class DeliveryCustomerCompaniesConvertor {
  static from(customer: DeliverySellerAndCustomerSearchModel, page: number, size: number): DeliveryCustomerCompaniesRequest {
    return {
      pageNum: page,
      rowSize: size,
      customerKey: customer?.searchCode && customer?.searchCode,
      customerName: customer?.searchName,
      customerStatus: customer?.status.value,
      contractStatus: customer?.contractStatus.value,
      startDate: formatTime(customer?.searchStartDate, DEFAULT_DATE_FORMAT),
      endDate: formatTime(customer?.searchEndDate, DEFAULT_DATE_FORMAT),
      corpRegNum: customer?.searchRegisterCode,
      bizRegNum: customer?.searchBusinessRegistrationNumber
    }
  }
}

export interface DeliveryCustomerCompaniesRequest extends PaginationModelRequest {
  customerKey: string
  customerName: string
  customerStatus: string
  contractStatus: string
  startDate: string
  endDate: string
  corpRegNum: string
  bizRegNum: string
}
