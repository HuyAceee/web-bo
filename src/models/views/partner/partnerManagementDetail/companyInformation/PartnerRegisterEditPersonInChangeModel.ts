export enum PartnerCompanyChargerType {
  SHIPMENT = '01',
  CS = '02',
  SETTLEMENT = '03',
  SALES = '04',
  PRODUCT = '05',
  CONTRACT = '06',
  TECHNICAL = '07'
}

export const PartnerCompanyChargerTypeOptions = [
  { label: '배송', value: PartnerCompanyChargerType.SHIPMENT },
  { label: 'CS', value: PartnerCompanyChargerType.CS },
  { label: '정산', value: PartnerCompanyChargerType.SETTLEMENT },
  { label: '영업', value: PartnerCompanyChargerType.SALES },
  { label: '상품', value: PartnerCompanyChargerType.PRODUCT },
  { label: '계약', value: PartnerCompanyChargerType.CONTRACT },
  { label: '기술', value: PartnerCompanyChargerType.TECHNICAL }
]

export enum PartnerDisplayYnModel {
  DISPLAY = 'Y',
  NON_DISPLAY = 'N'
}

export const PartnerDisplayYnOptions = [
  {
    label: '노출',
    value: PartnerDisplayYnModel.DISPLAY
  },
  {
    label: '비노출',
    value: PartnerDisplayYnModel.NON_DISPLAY
  }
]

export const PartnerExhibitionStatusOptions = [
  { value: 'Y', label: '노출' },
  { value: 'N', label: '비노출' }
]