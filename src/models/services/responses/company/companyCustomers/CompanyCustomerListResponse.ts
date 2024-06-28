import { defaultDateTimeFormat } from '@/common'
import { BaseModelResponse, DataTablePaginationResponseModel } from '../../BaseModelResponse'
import { ContractDataFileModel } from '@/models/views/company/customerManagement/CompanyCustomerRegistrationModel'
import { CompanyAuditingModel, CompanyCustomerListDataTableModel } from '@/models/views/company/customerManagement/CompanyCustomerListModel'

export interface CompanyCustomerListResponse {
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
  auditing: CompanyAuditingModel
}

export interface Page {
  pageNum: number
  totalCount: number
}

export interface CompanyCustomerListListResponse extends DataTablePaginationResponseModel<CompanyCustomerListDataTableModel> {}
export interface CompanyCustomerUpdateResponse {
  code: string
  message: string
  data: {
    isUpdated: boolean
  }
}
export class CompanyCustomerListListResponseConvertor {
  static fromCompanyCustomerListResponse(data: CompanyCustomerListResponse, page: number, limit: number): CompanyCustomerListListResponse {
    const items: CompanyCustomerListDataTableModel[] = data.data.map((i, index) => ({
      ...i,
      id: i.customerKey,
      contractStartDate: i.contractStartDate ? defaultDateTimeFormat(i.contractStartDate) : '',
      contractEndDate: i.contractEndDate ? defaultDateTimeFormat(i.contractEndDate) : '',
      auditing: {
        ...i.auditing,
        registeredDate: i?.auditing?.registeredDate ? defaultDateTimeFormat(i?.auditing?.registeredDate) : ''
      },
      no: (page - 1) * limit + index + 1
    }))
    return {
      totalItems: data.page.totalCount,
      data: items
    }
  }
}

export interface ContractDataFileResponse extends BaseModelResponse<ContractDataFileModel> {}
