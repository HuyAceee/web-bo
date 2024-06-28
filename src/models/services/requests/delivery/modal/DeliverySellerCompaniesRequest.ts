import { DeliverySellerAndCustomerSearchModel } from '@/models/views/delivery/modal/DeliverySellerAndCustomerSearchModel'
import { PaginationModelRequest } from '@/models/services/requests/PaginationModelRequest'
import { DEFAULT_DATE_FORMAT, formatTime } from '@/common'

export class DeliverySellerCompaniesConvertor {
  static from(seller: DeliverySellerAndCustomerSearchModel, page: number, size: number): DeliverySellerCompaniesRequest {
    return {
      pageNum: page,
      rowSize: size,
      sellerKey: seller?.searchCode,
      sellerName: seller?.searchName,
      sellerStatus: seller.status.value,
      contractStatus: seller?.contractStatus.value,
      startDate: formatTime(seller?.searchStartDate, DEFAULT_DATE_FORMAT),
      endDate: formatTime(seller?.searchEndDate, DEFAULT_DATE_FORMAT),
      corpRegNum: seller?.searchRegisterCode,
      bizRegNum: seller?.searchBusinessRegistrationNumber
    }
  }
}

export interface DeliverySellerCompaniesRequest extends PaginationModelRequest {
  sellerKey: string
  sellerName: string
  sellerStatus: string
  contractStatus: string
  startDate: string
  endDate: string
  corpRegNum: string
  bizRegNum: string
}
