import { YnOptions } from '@/models/common'
import { DEFAULT_DATE_FORMAT_DOT, formatTime } from '@/common'
import { productContractStatus } from '@/models'
import { BaseApi } from '../BaseApi'
import { MemberSellerSearchRequest } from '@/models/services/requests/members/MemberSellerSearchRequest'
import { ProductSearchSelllerResponse } from '@/models/services/responses/common/ProductSearchResponse'

class MemberSellerSearchApi extends BaseApi {
  constructor() {
    super('member')
  }

  async search(params: MemberSellerSearchRequest): Promise<ProductSearchSelllerResponse> {
    const { data } = await this.get('bo/seller-companies:search', params)
    let dataRecord = 0
    const resData = {
      data: data
        // .filter((it: any) => {
        //   return it.SellerStatus === 'Y' || it.SellerStatus === 'N'
        // })
        .map((it: any) => {
          dataRecord++
          let contactStatus
          productContractStatus.forEach((item) => {
            if (it.contractStatus === item.value) {
              contactStatus = item.label
            }
          })

          return {
            code: it.sellerKey,
            name: it.sellerName,
            status: it.sellerStatus === YnOptions.Y ? '활성' : '비활성',
            registrationCode: it.bizRegNum,
            companyRegistrationCode: it.corpRegNum,
            contractStatus: contactStatus,
            startContractDate: formatTime(it.contractStartDate, DEFAULT_DATE_FORMAT_DOT),
            endContractDate: formatTime(it.contractEndDate, DEFAULT_DATE_FORMAT_DOT),
            registrationDate: formatTime(it.createdDate, DEFAULT_DATE_FORMAT_DOT)
          }
        }),
      totalItems: dataRecord
    }
    return Promise.resolve(resData)
  }
}

export const memberSellerSearchApi = new MemberSellerSearchApi()
