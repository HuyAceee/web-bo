import { WelfareSelectOptionType } from '@/models/uikit'

export enum ProductTicketCategoryType {
  DSP = 'DSP',
  STD = 'STD'
}

export const ProductDataFieldFormTicketProductListlConfig = {
  listSelectProductType: [
    {
      options: [
        { label: '표준카테고리', value: ProductTicketCategoryType.DSP },
        { label: '전시카테고리', value: ProductTicketCategoryType.STD }
      ],
      field: 'standardCategorySelect',
      placeholder: '표준카테고리'
    }
  ],
  listInputFindProduct: [
    {
      title: '판매사',
      class: 'wf_w-176',
      field: 'findSellerInput',
      placeholder: '표준카테고리',
      labelButton: '조회',
      type: 'SELLER'
    },
    {
      title: 'MD',
      class: 'wf_w-176',
      field: 'findMdInput',
      placeholder: 'MD 조회',
      labelButton: '조회',
      type: 'MD'
    },
    {
      title: '브랜드',
      class: 'wf_w-176',
      field: 'findBrandInput',
      placeholder: '브랜드 조회',
      labelButton: '조회',
      type: 'BRAND'
    },
    {
      title: '모델명',
      class: 'wf_w-176',
      field: 'findModelInput',
      placeholder: '모델명 조회'
    }
  ],
  listCheckBoxExternalIntegration: {
    title: '외부연동 여부',
    field: 'externalIntegrationCheckBox',
    list: [
      {
        id: 'all',
        label: '전체',
        class: 'wf_w-52'
      },
      {
        id: 'Y',
        label: '직접등록',
        class: 'wf_w-52'
      },
      {
        id: 'N',
        label: '외부연동',
        class: 'wf_w-63'
      }
    ]
  },
  listCheckBoxTypes: [
    {
      title: '상품 유형',
      field: 'productTypeCheckBox',
      list: [
        {
          id: 'all',
          label: '전체',
          class: 'wf_w-52',
          value: 'ALL'
        },
        {
          id: '01',
          label: '일반 티켓',
          class: 'wf_w-52',
          value: 'TICKET_GENERAL'
        },
        {
          id: '02',
          label: '예약 티켓',
          class: 'wf_w-63',
          value: 'TICKET_RESERVATION'
        }
      ]
    },
    {
      title: '판매상태',
      field: 'salesStatusCheckBox',
      list: [
        {
          id: 'all',
          label: '전체',
          class: 'wf_w-52',
          value: ''
        },
        {
          id: '01',
          label: '판매중',
          class: 'wf_w-63',
          value: '01'
        },
        {
          id: '02',
          label: '판매일시중지',
          class: 'wf_w-96',
          value: '02'
        },
        {
          id: '03',
          label: '일시품절',
          class: 'wf_w-74',
          value: '03'
        },
        {
          id: '04',
          label: '품절',
          class: 'wf_w-52',
          value: '04'
        },
        {
          id: '05',
          label: '판매종료',
          class: 'wf_w-74',
          value: '05'
        }
      ]
    }
  ],
  listCheckBoxDevices: [
    {
      title: '전시 여부',
      field: 'exhibitionTypeCheckBox',
      list: [
        {
          id: 'all',
          label: '전체',
          class: 'wf_w-52',
          value: 'ALL'
        },
        {
          id: 'Y',
          label: '전시',
          class: 'wf_w-52',
          value: 'DISPLAY'
        },
        {
          id: 'N',
          label: '비전시',
          class: 'wf_w-63',
          value: 'NOT_DISPLAY'
        }
      ]
    },
    {
      title: '노출 채널',
      field: 'exposureChannelCheckBox',
      list: [
        {
          id: 'all',
          label: '전체',
          class: 'wf_w-52'
        },
        {
          id: '02',
          label: 'PC',
          class: 'wf_w-46'
        },
        {
          id: '03',
          label: '모바일',
          class: 'wf_w-63'
        }
      ]
    }
  ],
  optionProductDate: [
    { label: '상품등록일', value: 'REG' },
    { label: '최종수정일 ', value: 'MOD' }
  ],
  optionsProductListFilter: [
    { label: '사용안함', value: '1', id: 'all' },
    { label: '상품명', value: '2', id: 'productCode' },
    { label: '상품코드', value: '3', id: 'productName' },
    { label: '키워드', value: '4', id: 'keyWord' }
  ],
  listButtonDateFilter: [
    {
      label: '오늘',
      class: 'wf_w-176',
      value: 0
    },
    {
      label: '7일',
      class: 'wf_w-176',
      value: 6
    },
    {
      label: '1개월',
      class: 'wf_w-176',
      value: 29
    },
    {
      label: '3개월',
      class: 'wf_w-176',
      value: 89
    },
    {
      label: '1년',
      class: 'wf_w-176',
      value: 364
    }
  ],
  listCompanyChild: [
    { label: '회사 1', value: '01' },
    { label: '회사 2', value: '02' },
    { label: '회사 3', value: '03' },
    { label: '회사 4', value: '04' },
    { label: '회사 5', value: '05' },
    { label: '회사 6', value: '06' },
    { label: '회사 7', value: '07' }
  ]
}
export interface ProductTicketListForm {
  standardCategorySelect?: WelfareSelectOptionType
  primaryClassificationSelect?: WelfareSelectOptionType
  secondaryClassificationSelect?: WelfareSelectOptionType
  tertiaryClassificationSelect?: WelfareSelectOptionType
  subcontractKey?: string
  searchInput?: string
  findMdInput?: string
  productDateSelect?: WelfareSelectOptionType
  fromDate: string
  toDate: string
  productType?: string
  salesStatus?: string
  exhibitionType?: string
  exposureChannel?: string
  searchWord?: string
  externalIntegrationCheckBox?: string
  sellerKey?: string
  findBrandInput?: string
  searchWordType?: string
}
