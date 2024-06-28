import { BaseApi } from '../BaseApi'
import { MainContractInfoResponse } from '@/models/services/responses/main/modal/MainContractInfoResponse'

class MainContractInfoApi extends BaseApi {
  constructor() {
    super('member')
  }

  async getChargersRepresentative(): Promise<MainContractInfoResponse> {
    return this.get('bo/seller-companies/chargers:representative')
  }
}

export const mainContractInfoApi = new MainContractInfoApi()
