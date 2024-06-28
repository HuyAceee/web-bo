import { productContractStatus, productSellerStatus } from '@/models'
import { DEFAULT_DATE_FORMAT_DOT, formatTime } from '@/common'
import { BaseApi } from '../BaseApi'
import { MemberCustomerSearchRequest } from '@/models/services/requests/members/MemberCustomerSearchRequest'
import { DeliveryCustomerCompaniesResponse } from '@/models/services/responses/delivery/DeliveryCustomerCompaniesResponse'
import { DataTablePaginationResponseModel } from '@/models/services/responses/BaseModelResponse'
import { DeliverySellerAndCustomerSearchTableModel } from '@/models/views/delivery/modal/DeliverySellerAndCustomerSearchModel'

class MemberCustomerSearchApi extends BaseApi {
  constructor() {
    super('member')
  }

  async search(params: MemberCustomerSearchRequest): Promise<DataTablePaginationResponseModel<DeliverySellerAndCustomerSearchTableModel>> {
    const { data, page } = await this.get('bo/customer-companies:search', params)
    const resData = {
      data: data.map((it: DeliveryCustomerCompaniesResponse): DeliverySellerAndCustomerSearchTableModel => {
        const contactStatus = productContractStatus.find((item) => item.value === it?.contractStatus)?.label ?? ''
        const customerStatus = productSellerStatus.find((item) => item.value === it?.customerStatus)?.label ?? ''

        return {
          id: it?.customerKey,
          customerKey: it?.customerKey,
          name: it?.customerName,
          status: customerStatus,
          registrationCode: it?.bizRegNum,
          companyRegistrationCode: it?.corpRegNum,
          contractStatus: contactStatus,
          startContractDate: formatTime(it?.contractStartDate, DEFAULT_DATE_FORMAT_DOT),
          endContractDate: formatTime(it?.contractEndDate, DEFAULT_DATE_FORMAT_DOT),
          registrationDate: formatTime(it?.auditing?.registeredDate, DEFAULT_DATE_FORMAT_DOT)
        }
      }),
      totalItems: page.totalCount
    }
    return Promise.resolve(resData)
  }
}

export const memberCustomerSearchApi = new MemberCustomerSearchApi()
