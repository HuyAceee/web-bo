import { WelfareSelectOptionType } from '@/models'
import { MainContractInfoResponseModel } from '@/models/services/responses/main/modal/MainContractInfoResponse'

export interface MainContractInfoProps {
  onClose: () => void
  data: MainContractInfoResponseModel[]
}

export enum MainCompanyChargerType {
  SHIPMENT = '01',
  CS = '02',
  SETTLEMNT = '03',
  SALES = '04',
  PRODUCT = '05',
  CONTRACT = '06',
  TECHNICAL = '07'
}

export const mainCompanyChargerTypeCommonCodeName: WelfareSelectOptionType[] = [
  {
    label: '배송',
    value: MainCompanyChargerType.SHIPMENT
  },
  {
    label: 'CS',
    value: MainCompanyChargerType.CS
  },
  {
    label: '정산',
    value: MainCompanyChargerType.SETTLEMNT
  },
  {
    label: '영업',
    value: MainCompanyChargerType.SALES
  },
  {
    label: '상품',
    value: MainCompanyChargerType.PRODUCT
  },
  {
    label: '계약',
    value: MainCompanyChargerType.CONTRACT
  },
  {
    label: '기술',
    value: MainCompanyChargerType.TECHNICAL
  }
]
