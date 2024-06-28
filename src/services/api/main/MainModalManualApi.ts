import { BaseApi } from '../BaseApi'
// import { MainManualResponse } from '@/models/services/responses/main/modal/MainManualResponse'

class ModalManualApi extends BaseApi {
  constructor() {
    super('operation/bo')
  }

  async getManual(): Promise<any> {
    return this.get('admin-manual/main', false)
  }
}

export const modalManualApi = new ModalManualApi()
