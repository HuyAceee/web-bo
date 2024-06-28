import { CompanyBaseApi } from '../CompanyBaseApi'
import { AdministratorAccessHistoryListRequest } from '@/models/services/requests/company/coManagerMonitoring/CompanyAdministratorAccessHistoryListRequest'
import {
  AdministratorAccessHistoryListListResponse,
  AdministratorAccessHistoryListListResponseConvertor,
  AdministratorAccessHistoryUpdateResponse
} from '@/models/services/responses/company/coManagerMonitoring/CompanyAdministratorAccessHistoryListResponse'
import { ECustomerStatus } from '@/models/views/company/coManagerMonitoring/CompanyAdministratorAccessHistoryListModel'

// TODO: Temp API
class CompanyAdministratorAccessHistoryListApi extends CompanyBaseApi {
  getAdministratorAccessHistoryList(request: AdministratorAccessHistoryListRequest) {
    return new Promise<AdministratorAccessHistoryListListResponse>((resolve) => {
      this.get('customer-companies', request).then((data) => {
        resolve(AdministratorAccessHistoryListListResponseConvertor.fromAdministratorAccessHistoryListResponse(data as any, request.pageNum, request.rowSize))
      })
    })
  }

  async updateAdministratorAccessHistoryStatus(customerStatus: ECustomerStatus, customerKeyList: number[]) {
    return this.put(`customer-companies/status`, { customerStatus, customerKeyList }) as Promise<AdministratorAccessHistoryUpdateResponse>
  }
}
export const companyAdministratorAccessHistoryListApi = new CompanyAdministratorAccessHistoryListApi()
