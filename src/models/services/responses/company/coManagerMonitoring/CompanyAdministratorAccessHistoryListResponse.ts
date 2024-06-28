import { defaultDateTimeFormat } from '@/common'
import { CompanyAuditing, AdministratorAccessHistoryListDataTableModel } from '@/models/views/company/coManagerMonitoring/CompanyAdministratorAccessHistoryListModel'
import { DataTablePaginationResponseModel } from '../../BaseModelResponse'

export interface AdministratorAccessHistoryListResponse {
  code: string
  message: string
  data: CustomerCompany[]
  page: Page
}

export interface CustomerCompany {
  customerKey: number
  customerName: string
  customerStatus: string
  contractStatus: string
  contractStartDate: string
  contractEndDate: string
  auditing: CompanyAuditing
}

export interface Page {
  pageNum: number
  totalCount: number
}

export interface AdministratorAccessHistoryListListResponse extends DataTablePaginationResponseModel<AdministratorAccessHistoryListDataTableModel> {}
export interface AdministratorAccessHistoryUpdateResponse {
  code: string
  message: string
  data: {
    isUpdated: boolean
  }
}
export class AdministratorAccessHistoryListListResponseConvertor {
  static fromAdministratorAccessHistoryListResponse(data: AdministratorAccessHistoryListResponse, page: number, limit: number): AdministratorAccessHistoryListListResponse {
    const items: AdministratorAccessHistoryListDataTableModel[] = data.data.map((i, index) => ({
      ...i,
      id: i.customerKey,
      contractStartDate: i.contractStartDate ? defaultDateTimeFormat(i.contractStartDate) : '',
      contractEndDate: i.contractEndDate ? defaultDateTimeFormat(i.contractEndDate) : '',
      auditing: {
        ...i.auditing,
        registeredDate: i?.auditing?.registeredDate ? defaultDateTimeFormat(i?.auditing?.registeredDate) : ''
      },
      No: (page - 1) * limit + index + 1
    }))
    return {
      totalItems: data.page.totalCount,
      data: items
    }
  }
}
