import { DAYS_PER_MONTH, DAYS_PER_THREE_MONTH, DAYS_PER_YEAR } from '@/common/constant'
import { WelfareSelectOptionType } from '@/models'

export const productListButtonDate = [
  {
    label: '오늘',
    class: 'wf_w-176',
    value: 0
  },
  // {
  //   label: '7일',
  //   class: 'wf_w-176',
  //   value: DAYS_PER_WEEK
  // },
  {
    label: '1개월',
    class: 'wf_w-176',
    value: DAYS_PER_MONTH
  },
  {
    label: '3개월',
    class: 'wf_w-176',
    value: DAYS_PER_THREE_MONTH
  },
  {
    label: '1년',
    class: 'wf_w-176',
    value: DAYS_PER_YEAR
  }
  // {
  //   label: '직접입력',
  //   class: 'wf_w-176',
  //   value: -1
  // }
]

export const productSellerStatus: WelfareSelectOptionType[] = [
  { label: '전체', value: 'All' },
  { label: '활성', value: 'Y' },
  { label: '비활성', value: 'N' }
]
export const productContractStatus: WelfareSelectOptionType[] = [
  { label: '전체', value: 'All' },
  { label: '계약 중', value: '01' },
  { label: '계약 예정', value: '02' },
  { label: '계약 종료', value: '03' }
]

export const productModalSearchMeta = {
  MD: {
    placeholderInput: 'MD명을 검색해 주세요.'
  },
  SELLER: {
    placeholderInput: '판매사를 검색해 주세요.'
  },
  CUSTOMER: {
    placeholderInput: '고객사를 검색해 주세요.'
  },
  BRAND: {
    placeholderInput: '브랜드명을 검색해 주세요.'
  }
}

export const productModalSearchMDMeta = {
  searchTitle: '담당 MD 검색',
  searchInfo: '담당 MD를 검색하실 수 있습니다.',
  tableCodeTitle: 'MD 코드',
  tableNameTitle: 'MD 명',
  placeholderInput: 'MD명을 검색해 주세요.',
  searchEndPoint: ''
}
export const productModalSearchBrandMeta = {
  searchTitle: '브랜드 검색',
  searchInfo: '브랜드를 검색하실 수 있습니다.',
  tableCodeTitle: '브랜드코드',
  tableNameTitle: '브랜드명',
  placeholderInput: '브랜드명을 검색해 주세요.',
  searchEndPoint: ''
}

export const productModalSearchSellerMeta = {
  searchTitle: '판매사 검색',
  searchInfo: '여러 조회 조건을 통해 판매사를 검색할 수 있습니다.',
  tableCodeTitle: '판매사 코드',
  tableNameTitle: '판매사 명',
  searchEndPoint: '',
  formFields: {
    code: '판매사 코드',
    codePlaceHolder: '판매사코드 조회',
    name: '판매사명',
    namePlaceHolder: '판매사명 조회',
    registerCode: '사업자등록번호',
    registerCodePlaceHolder: '사업자등록번호 조회',
    businessRegistrationNumber: '법인등록번호',
    businessRegistrationNumberPlaceHolder: '법인등록번호 조회',
    status: '판매사 상태',
    statusOptions: productSellerStatus,
    contractStatus: '계약상태',
    contractStatusOptions: productContractStatus,
    regDate: '판매사 등록일'
  }
}
export const productModalSearchCustomerMeta = {
  searchTitle: '고객사 검색',
  searchInfo: '여러 조회 조건을 통해 고객사를 검색할 수 있습니다.',
  tableCodeTitle: '고객사코드',
  tableNameTitle: '고객사명',
  searchEndPoint: '',
  formFields: {
    code: '고객사 코드',
    codePlaceHolder: '고객사코드 조회',
    name: '고객사명',
    namePlaceHolder: '고객사명 조회',
    registerCode: '사업자등록번호',
    registerCodePlaceHolder: '사업자등록번호 조회',
    businessRegistrationNumber: '법인등록번호',
    businessRegistrationNumberPlaceHolder: '법인등록번호 조회',
    status: '고객사 상태',
    statusOptions: productSellerStatus,
    contractStatus: '계약상태',
    contractStatusOptions: productContractStatus,
    regDate: '고객사 등록일'
  }
}

export const ProductSearchModalHeaderTableConfig = [
  {
    header: 'MD 코드',
    field: 'code',
    class: 'wf_m-w-100'
  },
  {
    header: 'MD 명',
    field: 'name',
    class: 'wf_m-w-313'
  }
]

export const BrandSearchModalHeaderTableConfig = [
  {
    header: '브랜드코드',
    field: 'code',
    class: 'wf_m-w-100'
  },
  {
    header: '브랜드명',
    field: 'name',
    class: 'wf_m-w-313'
  }
]
