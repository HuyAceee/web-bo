import { BaseApi } from '../BaseApi'
import { MemberListRequest } from '@/models/services/requests/members/MemberListRequest'
import { MemberDeliveryAddressDeleteDataRequest } from '@/models/services/requests/members/MemberListDeliveryAddressRequest'
import { MemberSellerCompanyRequest } from '@/models/services/requests/members/MemberSellerCompanyRequest'
import { MemberListListResponse, MemberListListResponseConvertor } from '@/models/services/responses/members/MemberListResponse'
import { MemberListDeliveryAddressResponse } from '@/models/services/responses/members/MemberListDeliveryAddressResponse'
import { BaseModelErrorResponse } from '@/models/services/responses/BaseModelResponse'
import { MemberSellerCompanyResponse } from '@/models/services/responses/members/MemberSellerCompanyResponse'
class MemberListApi extends BaseApi {
  constructor() {
    super('member/bo')
  }
  getMemberListList(request: MemberListRequest) {
    return new Promise<MemberListListResponse>((resolve) => {
      this.get('members', request).then((data) => {
        resolve(MemberListListResponseConvertor.fromMemberListResponse(data))
      })
    })
  }

  getMemberDeliveryAddressList(memberId: string) {
    return new Promise<MemberListDeliveryAddressResponse>((resolve, reject) => {
      this.get(`members/${memberId}/delivery-address`)
      .then((res) => {
        const dataDeliveryAddress = res?.data.map((item: any, id: any) => ({
          id: id + 1,
          ...item
        }))
        resolve({
          totalItems: res?.page?.totalCount,
          data: dataDeliveryAddress
        })
      })
      .catch((res) =>{
        reject(res)
      })
    })
  }

  async deleteListDeliveryAddress(data: MemberDeliveryAddressDeleteDataRequest): Promise<BaseModelErrorResponse> {
    const reqData = { deliveryAddressKeys: data.deliveryAddressIds }
    return this.delete('members/delivery-address', reqData)
  }

  async getSellerCompanyBySellerKey(params: MemberSellerCompanyRequest): Promise<MemberSellerCompanyResponse> {
    const { data, page: pageRes, ...otherRes } = await this.get(`seller-companies/${params?.sellerKey}/admins/sub-sellers/simple`, null)
    const resData: MemberSellerCompanyResponse = {
      data,
      totalItems: pageRes?.totalCount,
      ...otherRes
    }
    return Promise.resolve(resData)
  }
}
export const memberListApi = new MemberListApi()
