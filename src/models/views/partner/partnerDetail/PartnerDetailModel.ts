import { WelfareSelectOptionType, YnOptions } from '@/models'

export const partnerDetailTabOptions = [
  { value: '', label: '기업정보' },
  { value: 'contract', label: '계약정보' },
  { value: 'transport', label: '배송정보' },
  { value: 'sub-company', label: '하위업체' }
]

export const partnerCompanyDetailActiveOptions = [
  { value: YnOptions.Y, label: '활성' },
  { value: YnOptions.N, label: '비활성' }
]
export const partnerCompanyCategoryOptions = [
  { value: '01', label: '개인 사업자' },
  { value: '02', label: '법인 사업자' }
]
export const partnerCompanyApiStatusOptions = [
  { value: YnOptions.Y, label: '사용' },
  { value: YnOptions.N, label: '사용안함' }
]
export const partnerCompanyPermissionOptions = [
  { value: YnOptions.Y, label: '판매권한 신청하지 않음' },
  { value: YnOptions.N, label: '판매권한 신청' }
]
export const partnerCompanyAttachmentTypeOptions: WelfareSelectOptionType[] = [
  { value: '01', label: '사업자등록증' },
  { value: '02', label: '회사소개서' },
  { value: '03', label: '계약서' },
  { value: '04', label: '계좌 사본' },
  { value: '05', label: '건강기능식품 관련' },
  { value: '06', label: '의료기기 관련' },
  { value: '07', label: '전통주 관련' },
  { value: '08', label: '수입식품 관련 (구매대행)' },
  { value: '09', label: '화장품 관련 (구매대행)' }
]
export const CompanyChargerTypeLabel: Record<string, string> = {
  '01': '배송',
  '02': 'CS',
  '03': '정산',
  '04': '영업',
  '05': '상품',
  '06': '계약',
  '07': '기술'
}

export enum CompanyChargerTypeEnum {
  SHIPMENT = '01',
  CS = '02',
  SETTLEMENT = '03',
  SALES = '04',
  PRODUCT = '05',
  CONTRACT = '06',
  TECHNICAL = '07'
}

export interface PartnerCompanyDetailTabProps {
  sellerKey: string
}

export interface PartnerCompanyDetailTabParams extends PartnerCompanyDetailTabProps {
  clearCheckAll?: () => void
  scrollToTop?: () => void
}

export interface PartnerCompanyChargerTableForm {
  id: number
  chargerName: string
  chargerPosition: string
  chargerPhone: string
  chargerEmail: string
  chargerType: string
  chargerKey: number
  auditing: {
    registerKey: number
    registerName: string
    registeredDate: string
    modifierKey: number
    modifierName: string
    modifiedDate: string
  }
}
