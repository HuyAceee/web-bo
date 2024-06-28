import { PaginationModelRequest } from '@/models/services/requests/PaginationModelRequest'
import { AdministratorAccessHistoryListFormModel } from '@/models/views/company/coManagerMonitoring/CompanyAdministratorAccessHistoryListModel'
import { DEFAULT_DATE_FORMAT, formatTime } from '@/common'

export interface AdministratorAccessHistoryListRequest extends PaginationModelRequest {
  contractStatus?: string
  customerStatus?: string
  customerKey?: string
  customerName?: string
  startDate?: string
  endDate?: string
  searchType?: string
  searchWord?: string
}
export class AdministratorAccessHistoryListRequestConvertor {
  static from(
    { fromDate, toDate, contractStatus, customerStatus, customerName, customerKey, searchType, searchWord }: AdministratorAccessHistoryListFormModel,
    page: number,
    numberOfItems: number
  ): AdministratorAccessHistoryListRequest {
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
