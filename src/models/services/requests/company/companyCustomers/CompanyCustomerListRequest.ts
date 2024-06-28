import { PaginationModelRequest } from '@/models/services/requests/PaginationModelRequest'
import { CompanyCustomerListFormModel } from '@/models/views/company/customerManagement/CompanyCustomerListModel'
import { DEFAULT_DATE_FORMAT, formatTime } from '@/common'

export interface CompanyCustomerListRequest extends PaginationModelRequest {
  contractStatus?: string
  customerStatus?: string
  customerKey?: string
  customerName?: string
  startDate?: string
  endDate?: string
  searchType?: string
  searchWord?: string
}
export class CompanyCustomerListRequestConvertor {
  static from(
    { fromDate, toDate, contractStatus, customerStatus, customerName, customerKey, searchType, searchWord }: CompanyCustomerListFormModel,
    page: number,
    numberOfItems: number
  ): CompanyCustomerListRequest {
    return {
      rowSize: numberOfItems,
      pageNum: page + 1,
      startDate: fromDate ? formatTime(fromDate, DEFAULT_DATE_FORMAT) : '',
      endDate: toDate ? formatTime(toDate, DEFAULT_DATE_FORMAT) : '',
      contractStatus,
      customerStatus,
      customerName,
      searchType: searchType?.value,
      searchWord,
      customerKey
    }
  }
}
