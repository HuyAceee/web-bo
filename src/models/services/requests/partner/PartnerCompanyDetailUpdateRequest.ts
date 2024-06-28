import { YnOptions } from '@/models'

export interface PartnerCompanyDetailUpdateRequest {
  company: {
    sellerStatus: YnOptions
  },
}