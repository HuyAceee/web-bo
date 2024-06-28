import { productContractStatus, productSellerStatus } from '@/models'
import { DEFAULT_DATE_FORMAT_DOT, formatTime } from '@/common'
import { BaseApi } from '../BaseApi'
import { DeliverySellerCompaniesRequest } from '@/models/services/requests/delivery/modal/DeliverySellerCompaniesRequest'
import {
  DeliverySellerCompaniesResponseModel,
  DeliverySellerCompaniesSearchResponseModel
} from '@/models/services/responses/delivery/DeliverySellerCompaniesResponse'
import { DataTablePaginationResponseModel } from '@/models/services/responses/BaseModelResponse'
import { DeliverySellerAndCustomerSearchTableModel } from '@/models/views/delivery/modal/DeliverySellerAndCustomerSearchModel'

export class DeliverySellerCompaniesApi extends BaseApi {
  constructor() {
    super('member')
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async search(_params: DeliverySellerCompaniesRequest): Promise<DataTablePaginationResponseModel<DeliverySellerAndCustomerSearchTableModel>> {
    const { data, page } = await this.get('bo/seller-companies:search', _params)
    const resData = {
      data: data.map((it: DeliverySellerCompaniesSearchResponseModel): DeliverySellerAndCustomerSearchTableModel => {
        const contactStatus = productContractStatus.find((item) => item.value === it?.contractStatus)?.label ?? ''
        const sellerStatus = productSellerStatus.find((item) => item.value === it?.sellerStatus)?.label ?? ''
        return {
          id: it?.sellerKey,
          name: it?.sellerName,
          sellerKey: it?.sellerKey,
          status: sellerStatus,
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

  async searchAllSellers(): Promise<DeliverySellerCompaniesResponseModel> {
    return this.get('bo/seller-companies')
  }
}

export const deliverySellerCompaniesApi = new DeliverySellerCompaniesApi()
