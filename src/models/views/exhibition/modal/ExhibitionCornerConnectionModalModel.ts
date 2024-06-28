export enum ExhibitionCornerExhibitionStatus {
  DISPLAY = 'Y',
  NOT_DISPLAY = 'N'
}

export enum ExhibitionApplyChannelType {
  ALL = 'all',
  COMMON = 'common',
  PC = 'pc',
  MO = 'mo',
  MO_WEB = 'moWeb'
}

export enum ExhibitionGnbLinkType {
  NO_LINK = 'noLink',
  LINK_URL = 'linkUrl',
  EXHIBITION = 'exhibition',
  EVENT = 'event',
  PRODUCT = 'product',
  PROMOTION = 'promotion',
  EXTERNAL = 'external'
}

export const ExhibitionGnbLinkTypeTextValue = [
  {
    label: '링크 없음',
    value: ExhibitionGnbLinkType.NO_LINK
  },
  {
    label: '링크 사용',
    value: ExhibitionGnbLinkType.LINK_URL
  },
  {
    label: '기획전',
    value: ExhibitionGnbLinkType.EXHIBITION
  },
  {
    label: '이벤트',
    value: ExhibitionGnbLinkType.EVENT
  },
  {
    label: '상품',
    value: ExhibitionGnbLinkType.PRODUCT
  }
  //confirm sb
  // {
  //   label: '프로모션',
  //   value: ExhibitionGnbLinkType.PROMOTION
  // },
  // {
  //   label: '외부 링크',
  //   value: ExhibitionGnbLinkType.EXTERNAL
  // }
]

export const ExhibitionGnbLinkTypePlaceholder = {
  [ExhibitionGnbLinkType.EXHIBITION]: {
    key: '기획전코드',
    name: '기획전명'
  },
  [ExhibitionGnbLinkType.EVENT]: {
    key: '이벤트코드',
    name: '이벤트명'
  },
  [ExhibitionGnbLinkType.PRODUCT]: {
    key: '상품코드',
    name: '상품명'
  },
}

export interface ExhibitionCornerConnectionModalValueModel {
  cornerNumber?: string
  cornerName?: string
  exhibitionHallCategoryCode?: string
  exhibitionHallCategoryName?: string
  cornerNameInput: string
  exhibitionStatus?: string
  displayOrder: string
  ApplicableChannel?: string
  fromDate: string
  toDate: string
  mainTitlePc?: string
  subTitlePc?: string
  imageTextPc?: string
  imagePc?: string
  imageAltPc?: string
  typeLinkPc?: string
  promoCodePc?: string
  promotionNamePc?: string
  mainTitleMobile?: string
  subTitleMobile?: string
  imageTextMobile?: string
  imageMobile?: string
  imageAltMobile?: string
  typeLinkMobile?: string
  promoCodeMobile?: string
  promotionNameMobile?: string

  [key: string]: any
}

export const exhibitionCornerConnectionModalModelConfig = {
  displayCornerBasicInfo: {
    row1: [
      {
        label: '코너번호',
        field: 'cornerNumber'
      },
      {
        label: '코너명',
        field: 'cornerName'
      }
    ],
    row2: [
      {
        label: '전시관 카테고리 코드',
        field: 'exhibitionHallCategoryCode'
      },
      {
        label: '전시관 카테고리명',
        field: 'exhibitionHallCategoryName'
      }
    ],
    row3: [
      {
        label: '코너명',
        field: 'cornerNameInput',
        placeholder: ''
      },
      {
        label: '클레임 상태',
        field: 'exhibitionStatus',
        options: [
          { label: '전시', value: ExhibitionCornerExhibitionStatus.DISPLAY },
          { label: '비전시', value: ExhibitionCornerExhibitionStatus.NOT_DISPLAY }
        ]
      }
    ],
    row4: [
      {
        label: '전시 순서',
        field: 'displayOrder',
        placeholder: ''
      },
      {
        label: '적용 채널',
        field: 'ApplicableChannel',
        options: [
          { label: '전체', value: ExhibitionApplyChannelType.ALL },
          { label: 'PC', value: ExhibitionApplyChannelType.PC },
          { label: '모바일', value: ExhibitionApplyChannelType.MO }
        ]
      }
    ],
    row5: [
      {
        label: '전시 시작',
        field: 'fromDate'
      },
      {
        label: '전시 종료',
        field: 'toDate'
      }
    ]
  },
  cornerExhibitionPcInformation: {
    row1: {
      label: '메인 타이틀',
      field: 'mainTitlePc',
      placeholder: ''
    },
    row2: {
      label: '서브 타이틀',
      field: 'subTitlePc',
      placeholder: ''
    },
    row3: {
      label: '서브 타이틀',
      field: 'imageTextPc',
      placeholder: '최대 20자 이내 입력'
    },
    row4: {
      label: '이미지',
      field: 'imagePc',
      placeholder: ''
    },
    row5: {
      label: '이미지',
      field: 'imageAltPc',
      placeholder: '한글기준 20자 이내로 입력 가능'
    },
    row6: [
      {
        label: '랜딩 URL',
        field: 'typeLinkPc',
        options: [
          { label: '링크 사용', value: ExhibitionGnbLinkType.LINK_URL },
          { label: '기획전', value: ExhibitionGnbLinkType.EXHIBITION },
          { label: '이벤트', value: ExhibitionGnbLinkType.EVENT },
          { label: '상품', value: ExhibitionGnbLinkType.PRODUCT },
          { label: '프로모션', value: ExhibitionGnbLinkType.PROMOTION },
          { label: '외부 링크', value: ExhibitionGnbLinkType.EXTERNAL },
          { label: '링크 없음', value: ExhibitionGnbLinkType.NO_LINK }
        ]
      },
      {
        label: '랜딩 URL',
        field: 'promoCodePc',
        placeholder: '프로모션 코드'
      },
      {
        label: '랜딩 URL',
        field: 'promotionNamePc',
        placeholder: '프로모션명'
      }
    ]
  },
  cornerExhibitionMobileInformation: {
    row1: {
      label: '메인 타이틀',
      field: 'mainTitleMobile',
      placeholder: ''
    },
    row2: {
      label: '서브 타이틀',
      field: 'subTitleMobile',
      placeholder: ''
    },
    row3: {
      label: '서브 타이틀',
      field: 'imageTextMobile',
      placeholder: '최대 20자 이내 입력'
    },
    row4: {
      label: '이미지',
      field: 'imageMobile',
      placeholder: ''
    },
    row5: {
      label: '이미지',
      field: 'imageAltMobile',
      placeholder: '한글기준 20자 이내로 입력 가능'
    },
    row6: [
      {
        label: '랜딩 URL',
        field: 'typeLinkMobile',
        options: [
          { label: '링크 사용', value: ExhibitionGnbLinkType.LINK_URL },
          { label: '기획전', value: ExhibitionGnbLinkType.EXHIBITION },
          { label: '이벤트', value: ExhibitionGnbLinkType.EVENT },
          { label: '상품', value: ExhibitionGnbLinkType.PRODUCT },
          { label: '프로모션', value: ExhibitionGnbLinkType.PROMOTION },
          { label: '외부 링크', value: ExhibitionGnbLinkType.EXTERNAL },
          { label: '링크 없음', value: ExhibitionGnbLinkType.NO_LINK }
        ]
      },
      {
        label: '랜딩 URL',
        field: 'promoCodeMobile',
        placeholder: '프로모션 코드'
      },
      {
        label: '랜딩 URL',
        field: 'promotionNameMobile',
        placeholder: '프로모션명'
      }
    ]
  }
}
