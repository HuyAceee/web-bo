import { DataTableContainerConfigModel } from '@/models'

export const ProductDataFieldFormApprovalProductListConfig = {
  listSelectProductType: [
    {
      options: [
        { label: '표준카테고리', value: '1' },
        { label: '전시카테고리', value: '2' }
      ],
      field: 'standardCategorySelect',
      placeholder: '표준카테고리'
    },
    {
      options: [
        { label: '전체', value: '1' },
        { label: '1차 분류', value: '2' }
      ],
      field: 'primaryClassificationSelect',
      placeholder: '1차 분류'
    },
    {
      options: [
        { label: '전체', value: '1' },
        { label: '2차 분류', value: '2' }
      ],
      field: 'secondaryClassificationSelect',
      placeholder: '2차 분류'
    },
    {
      options: [
        { label: '전체', value: '1' },
        { label: '3차 분류', value: '2' }
      ],
      field: 'tertiaryClassificationSelect',
      placeholder: '3차 분류'
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
        id: 'direct_registration',
        label: '직접등록',
        class: 'wf_w-52'
      },
      {
        id: 'external_linkage',
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
          class: 'wf_w-52'
        },
        {
          id: 'common',
          label: '일반',
          class: 'wf_w-52'
        },
        {
          id: 'installation_type',
          label: '설치형',
          class: 'wf_w-63'
        }
      ]
    },
    {
      title: '과세 구분',
      field: 'salesStatusCheckBox',
      list: [
        {
          id: 'all',
          label: '전체',
          class: 'wf_w-52'
        },
        {
          id: 'sale',
          label: '과세',
          class: 'wf_w-63'
        },
        {
          id: 'sales_pause',
          label: '면세',
          class: 'wf_w-96'
        },
        {
          id: 'temporarily_out_of_stock',
          label: '영세',
          class: 'wf_w-74'
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
          class: 'wf_w-52'
        },
        {
          id: 'common',
          label: '전시',
          class: 'wf_w-52'
        },
        {
          id: 'installation_type',
          label: '비전시',
          class: 'wf_w-63'
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
          id: 'pc',
          label: 'PC',
          class: 'wf_w-46'
        },
        {
          id: 'mobile',
          label: '모바일',
          class: 'wf_w-63'
        }
      ]
    }
  ],
  listRadioRequestClassification: {
    title: '요청 구분',
    field: 'requestClassification',
    list: [
      {
        label: '신규 등록',
        value: 'new_registration'
      },
      {
        label: '상품 수정',
        value: 'edit_product'
      }
    ]
  },
  listRadioSaveTemporarily: {
    title: '임시저장 여부',
    field: 'saveTemporarily',
    list: [
      {
        label: 'Yes',
        value: 'yes'
      },
      {
        label: 'No',
        value: 'no'
      }
    ]
  },
  listCheckboxApprovalStatus: {
    title: '승인상태',
    field: 'approvalStatusCheckBox',
    list: [
      {
        id: 'all',
        label: '전체',
        class: 'wf_w-52'
      },
      {
        id: 'sale',
        label: '상품등록중',
        class: 'wf_w-63'
      },
      {
        id: 'sales_pause',
        label: '승인대기',
        class: 'wf_w-96'
      },
      {
        id: 'temporarily_out_of_stock',
        label: '승인철회',
        class: 'wf_w-74'
      },
      {
        id: 'sold_out',
        label: '승인반려',
        class: 'wf_w-52'
      }
    ]
  },
  optionProductDate: [
    { label: '상품등록일', value: '1' },
    { label: '최종수정일 ', value: '2' }
  ],
  optionsProductListFilter: [
    { label: '사용안함', value: '1' },
    { label: '상품명', value: '2' },
    { label: '상품코드', value: '3' },
    { label: '키워드', value: '4' }
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
    { label: '회사 1', value: '1' },
    { label: '회사 2', value: '2' },
    { label: '회사 3', value: '3' },
    { label: '회사 4', value: '4' },
    { label: '회사 5', value: '5' },
    { label: '회사 6', value: '6' },
    { label: '회사 7', value: '7' }
  ]
}

export const headerFieldTableApproval: DataTableContainerConfigModel[] = [
  {
    header: '외부연동 여부',
    field: 'integration',
    class: 'wf_m-w-120 '
  },
  {
    header: '상품유형',
    field: 'product_type',
    class: 'wf_m-w-80 '
  },
  {
    header: '요청구분',
    field: 'request_type',
    class: 'wf_m-w-80 '
  },
  {
    header: '임시저장 여부',
    field: 'save_temporarily',
    class: 'wf_m-w-120 '
  },
  {
    header: '전시여부',
    field: 'exhibition_status',
    class: 'wf_m-w-80 '
  },
  {
    header: '노출채널',
    field: 'exposure_channel',
    class: 'wf_m-w-80 '
  },
  {
    header: '판매가',
    field: 'price',
    class: 'wf_m-w-120 wf_text-sub-02 wf_justify-end'
  },
  {
    header: '과세 구분',
    field: 'tax_classification',
    class: 'wf_m-w-100 '
  },
  {
    header: '표준카테고리',
    field: 'standard_category',
    class: 'wf_m-w-200 wf_justify-start'
  },
  {
    header: '전시카테고리',
    field: 'exhibition_category',
    class: 'wf_m-w-200 wf_justify-start'
  },
  {
    header: '판매사',
    field: 'seller',
    class: 'wf_m-w-150  wf_text-sub-02 wf_text-underline cursor-pointer'
  },
  {
    header: '하위업체',
    field: 'sub_company',
    class: 'wf_m-w-150 '
  },
  {
    header: '브랜드',
    field: 'brand',
    class: 'wf_m-w-150 '
  },
  {
    header: '모델명',
    field: 'model_name',
    class: 'wf_m-w-150 '
  },
  {
    header: '상품등록일',
    field: 'product_registration_date',
    class: 'wf_m-w-150 '
  },
  {
    header: '상품수정일',
    field: 'product_modification_date',
    class: 'wf_m-w-150 '
  },
  {
    header: '상품등록자',
    field: 'registrant',
    class: 'wf_m-w-150 '
  },
  {
    header: '승인상태',
    field: 'approver_status',
    class: 'wf_m-w-150 '
  },
  {
    header: '승인 요청일',
    field: 'approver_request_date',
    class: 'wf_m-w-150 '
  },
  {
    header: '상품승인자',
    field: 'approver',
    class: 'wf_m-w-150 '
  }
]

export interface ApprovalTableDataModel {
  id: string
  product_code: string
  product_name: string
  integration: string
  product_type: string
  request_type: string
  save_temporarily: string
  exhibition_status: string
  exposure_channel: string
  price: string
  tax_classification: string
  standard_category: string
  exhibition_category: string
  seller: string
  sub_company: string
  brand: string
  model_name: string
  product_registration_date: string
  product_modification_date: string
  registrant: string
  approver: string
  approver_request_date: string
  approver_status: string
  approval_management: string
  isSelected: boolean
  productKey?: string
}
