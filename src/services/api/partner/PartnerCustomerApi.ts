import {BaseApi} from "@/services/api/BaseApi";
import {
  CustomerCompanyAdminsMasterResponse
} from '@/models/services/responses/partner/PartnerCustomerCompanyAdminMasterResponse'
import {
  CustomerCompanyAdminsMasterExistsResponse
} from '@/models/services/responses/partner/PartnerCustomerCompanyAdminMasterExistsResponse'

class PartnerCustomerApi extends BaseApi {
	constructor() {
		super('member/bo/customer-companies')
	}

	async getAdminMaster(customerKey: string): Promise<CustomerCompanyAdminsMasterResponse> {
		const {data, ...otherRes} = await this.get(`${customerKey}/admins/master`)
		const resData: any = {
			data, ...otherRes
		}
		return Promise.resolve(resData)
	}

  async getAdminMasterExists(customerKey: string): Promise<CustomerCompanyAdminsMasterExistsResponse> {
    const {data, ...otherRes} = await this.get(`${customerKey}/admins/master:exists`)
    const resData: any = {
      data, ...otherRes
    }
    return Promise.resolve(resData)
  }
}
export const partnerCustomerApi = new PartnerCustomerApi()