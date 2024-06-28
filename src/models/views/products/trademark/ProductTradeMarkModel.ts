export const ProductDataFieldFormTradeMarkProductListConfig = {
  listSelectTradeMarkType: {
    options: [
      { label: '전체', value: '1' },
      { label: '표준카테고리', value: '2' },
      { label: '전시카테고리', value: '3' }
    ],
    field: 'trademarkSelect',
    placeholder: '표준카테고리',
    title: '카테고리'
  },
  listCheckBoxExhibition: {
    title: '전시 여부',
    field: 'productTypeCheckBox',
    list: [
      {
        id: 'all',
        label: '전체',
        class: 'wf_w-52'
      },
      {
        id: 'exhibition',
        label: '전시',
        class: 'wf_w-52'
      },
      {
        id: 'vision',
        label: '비전시',
        class: 'wf_w-63'
      }
    ]
  },
  listInputFindProduct: [
    {
      title: '브랜드 명',
      class: 'wf_w-176',
      field: 'brand'
    },
    {
      title: '브랜드 코드',
      class: 'wf_w-176',
      field: 'brandCode'
    }
  ],
  optionProductDate: [
    { label: '등록일', value: '1' },
    { label: '수정일 ', value: '2' }
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
  optionsProductListFilter: [
    { label: '사용안함', value: '1' },
    { label: '브랜드명', value: '2' },
    { label: '브랜드코드', value: '3' }
  ]
}

export const TradeMarkHeaderTableConfig = [
  {
    header: '브랜드코드',
    field: 'id',
    class: 'wf_m-w-100 wf_justify-start'
  },
  {
    header: '브랜드명',
    field: 'name',
    class: 'wf_m-w-231 wf_justify-start'
  },
  {
    header: '브랜드 이미지',
    field: 'logo',
    class: 'wf_m-w-100 '
  },
  {
    header: '카테고리',
    field: 'type',
    class: 'wf_m-w-231 wf_justify-start'
  },
  {
    header: '상품 개수',
    field: 'number',
    class: 'wf_m-w-120 '
  },
  {
    header: '전시 여부',
    field: 'exhibition',
    class: 'wf_m-w-100 '
  },
  {
    header: '등록일',
    field: 'registration_date',
    class: 'wf_m-w-150 '
  },
  {
    header: '수정일',
    field: 'modification_date',
    class: 'wf_m-w-150 '
  },
  {
    header: '등록자',
    field: 'registrant',
    class: 'wf_m-w-150 '
  },
  {
    header: '조회',
    field: 'check',
    class: 'view-column'
  }
]

export interface TradeMarkModel {
  id: string
  name: string
  logo: string
  type: string
  number: number
  exhibition: string
  registration_date: string
  modification_date: string
  registrant: string
  check: string
}
