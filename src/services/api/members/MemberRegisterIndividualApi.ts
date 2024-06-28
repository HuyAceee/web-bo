import { MemberCustomerRegisterIndividualResponse } from '@/models/services/responses/members/MemberRegisterIndividualResponse'
import { BaseApi } from '../BaseApi'
import { MemberCustomerRegisterIndividualRequest } from '@/models/services/requests/members/MemberRegisterIndividualRequest'

class MemberRegisterIndividualApi extends BaseApi {
  constructor() {
    super('member')
  }

  saveIndividualMember(data: MemberCustomerRegisterIndividualRequest, isShowModal = true): Promise<MemberCustomerRegisterIndividualResponse> {
    return this.post('bo/members', data, {}, isShowModal)
  }
}

export const memberRegisterIndividualApi = new MemberRegisterIndividualApi()
