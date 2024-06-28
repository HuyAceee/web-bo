import { WelfareRadioProps } from '@/models'
import { ExhibitionCornerManagementDetailRegisterCornerListRequestModel } from '@/models/services/requests/exhibition/modal/ExhibitionCornerManagementDetailRequest'

export const exhibitionCornerManagementAreaAddYnOptions: WelfareRadioProps[] = [
  {
    label: '가능',
    value: 'Y'
  },
  {
    label: '불가능',
    value: 'N'
  }
]

export const exhibitionCornerManagementDetailsTableConfig = [
  { header: 'No.', field: 'rowNum', class: 'wf_m-w-60' },
  { header: '구분', field: 'classDivision', class: 'wf_m-w-60' },
  { header: '전시관 카테고리', field: 'className', class: 'wf_m-w-120' },
  { header: '코너번호', field: 'cornerKey', class: 'wf_m-w-70' },
  { header: '코너명', field: 'cornerName', class: 'wf_m-w-80' },
  { header: '적용채널', field: 'applyChannelTypeName', class: 'wf_m-w-60' }
]

export interface ExhibitionCornerManagementDetailsProps {
  onClose: (() => void) | undefined
  templateKey: number
  applyChannelType: string
  fileName?: string
  filePathName?: string
}

export interface ExhibitionCornerManagementListCornerTable {
  templateKey: number
  customerId: string
  lclassCode: string
  sclassCode: string
  cornerName: string
  areaAddYn: string
}

export interface ExhibitionCornerManagementDetailCornerRegisterForm extends ExhibitionCornerManagementDetailRegisterCornerListRequestModel {
  cornerKey?: number
}
