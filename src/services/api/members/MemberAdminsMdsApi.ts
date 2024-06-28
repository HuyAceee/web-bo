import { MemberAdminsMdsResponse } from '@/models/services/responses/members/MemberAdminsMdsResponse'
import { BaseApi } from '../BaseApi'

class MemberAdminsMdsApi extends BaseApi {
  constructor() {
    super('member')
  }

  async search(searchWord: string): Promise<MemberAdminsMdsResponse> {
    return this.get('bo/admins/mds', { searchWord: searchWord })
  }
}

export const memberAdminsMdsApi = new MemberAdminsMdsApi()
