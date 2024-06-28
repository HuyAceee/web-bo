import { DataTablePaginationResponseModel } from '@/models/services/responses/BaseModelResponse'
import { DEFAULT_DATE_TIME_FORMAT, formatTime } from '@/common'
import { BaseApi } from '../BaseApi'
import { MemberSearchResponseModel } from '@/models/services/responses/members/MemberSearchResponse'
import { MemberCustomerCompaniesKeysResponse } from '@/models/services/responses/members/MemberCustomerCompaniesKeysResponse'
import { MemberRequestModel, MemberRequestTableModel, MemberSearchTableModel } from '@/models/views/members/modal/MemberRequestModel'
import { MemberSearchType } from '@/models/views/members/modal/MemberSearchTypeModel'

class MemberSearchApi extends BaseApi {
  constructor() {
    super('member')
  }

  async search(
    params: MemberRequestModel,
    searchType?: string
  ): Promise<DataTablePaginationResponseModel<MemberRequestTableModel | MemberSearchTableModel>> {
    const { data, page } = await this.get('bo/members/active', params)
    const resData = {
      data: data.map((it: MemberSearchResponseModel): MemberRequestTableModel | MemberSearchTableModel => {
        const registeredDate = formatTime(it?.auditing?.registeredDate, DEFAULT_DATE_TIME_FORMAT)

        if (searchType === MemberSearchType.REQUEST) {
          return {
            id: it?.memberKey?.toString(),
            memberName: it?.memberName,
            memberId: it?.memberId,
            genderCode: it?.genderCode,
            employeeNumber: it?.company.employeeNumber,
            rankName: it?.company.rankName,
            gradeCode: it?.gradeCode,
            customerKey: it?.company.customerKey,
            customerName: it?.company.customerName,
            companyLoadNameAddress: it?.company?.companyLoadNameAddress,
            marketingAgreeYn: it?.agreement?.marketingAgreeYn?.title,
            registeredDate: registeredDate,
            latestLoginDate: it?.latestLoginDate ? formatTime(it?.latestLoginDate, DEFAULT_DATE_TIME_FORMAT) : '',
            pointBalance: it?.pointBalance,
            managerMemo: it?.managerMemo ?? '',
            memberKey: it?.memberKey,
            cellphoneNumber: it?.cellphoneNumber,
            customerStatus: it?.company.customerStatus
          }
        } else {
          return {
            id: it?.memberKey,
            memberName: it?.memberName,
            memberId: it?.memberId,
            customerName: it?.company.customerName,
            employeeNumber: it?.company.employeeNumber,
            cellphoneNumber: it?.cellphoneNumber,
            marketingAgreeYn: it?.agreement?.marketingAgreeYn?.title,
            gradeCode: it?.gradeCode,
            accountStatusCode: it?.accountStatusCode,
            registeredDate: registeredDate,
            customerStatus: it?.company.customerStatus
          }
        }
      }),
      totalItems: page.totalCount
    }
    return Promise.resolve(resData)
  }

  async getCustomerKeys(): Promise<MemberCustomerCompaniesKeysResponse> {
    return this.get('bo/customer-companies/keys')
  }
}

export const memberSearchApi = new MemberSearchApi()
