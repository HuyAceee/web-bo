export const productDataFieldApprovalFromModelConfig = {
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
      title: '판매상태',
      field: 'salesStatusCheckBox',
      list: [
        {
          id: 'all',
          label: '전체',
          class: 'wf_w-52'
        },
        {
          id: 'sale',
          label: '판매중',
          class: 'wf_w-63'
        },
        {
          id: 'sales_pause',
          label: '판매일시중지',
          class: 'wf_w-96'
        },
        {
          id: 'temporarily_out_of_stock',
          label: '일시품절',
          class: 'wf_w-74'
        },
        {
          id: 'sold_out',
          label: '품절',
          class: 'wf_w-52'
        },
        {
          id: 'sales_discontinued',
          label: '판매중지',
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
  ]
}
