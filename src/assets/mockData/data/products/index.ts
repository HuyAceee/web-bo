import { MZ_Product_01, MZ_Product_02, MZ_Product_03, MZ_Product_04, MZ_Product_05, tradeMark } from '@/assets/images'
export * from './deliveryProduct'
import {
  ProductHeaderTableOptionModel,
  ProductRegisterSingleOptionModel,
  ProductSelectOptionModel,
  ProductVendorInformationModel,
  ProductWarningModel
} from '@/models'
import MockDataDeliveryListTable from './delivery-product-list-data-table.json'
import MockApprovalProductListTable from './approval-product-list-data-table.json'
import MockProductSearchTableData from './search-modal-data.json'
import MockProductSearchItemData from './product-search.json'

export {
  MockDataDeliveryListTable,
  MockApprovalProductListTable,
  MockProductSearchTableData,
  MockProductSearchItemData
}

export const vendorInformation: ProductVendorInformationModel = {
  sellerCode: 'S1234',
  nameOfSellingCompany: '우리뜰생협',
  salesDirectory: ['식품 > 신선 채소류 > 유기농', '패션 > 여성패션 > 액세서리'],
  masterAccount: '정우리',
  businessNumber: '111-87-555075',
  companyRegistrationNumber: '100037-345677811',
  representative: '김우리',
  workplace: '경기 포천시 동아리길 35',
  phoneNumber: '010-1234-1234'
}

export const registerOption: ProductRegisterSingleOptionModel = {
  productCode: '100000000001',
  productName: '티셔츠'
}

export const warningList: ProductWarningModel[] = [
  {
    label: '옵션 등록 시 유의사항',
    contentList: [
      '단일 옵션 선택 후 옵션 속성값에 행 추가하여 옵션을 입력 해주세요.',
      '순서를 위/아래로 수정해 최우선 노출 옵션을 조정 해주세요.',
      '저장을 완료하면 ‘옵션 등록’ 영역에 입력한 정보가 저장됩니다.',
      '저장완료 후 복수 옵션으로 변경할 수 없습니다.',
      '저장완료 후 단일 ↔ 복수 옵션 변경은 전체 삭제 후 가능합니다.'
    ]
  },
  {
    label: '복수 등록 시 유의사항',
    contentList: [
      '복수 옵션 선택 후 옵션 속성값에 행 추가하여 옵션1, 옵션2, 옵션3(선택사항)을 입력 해주세요.',
      '순서를 위/아래로 수정해 최우선 노출 옵션을 조정 해주세요.',
      '저장을 완료하면 ‘옵션 등록’ 영역에 입력한 정보가 저장됩니다.',
      '저장완료 후 단일 옵션으로 변경할 수 없습니다.',
      '저장완료 후 복수 ↔ 단일 옵션 변경은 전체 삭제 후 가능합니다.'
    ]
  },
  {
    label: '예약 등록 시 유의사항',
    contentList: [
      '예약 옵션 선택 후 옵션1 속성값에서 시작일과 종료일을 선택해주세요.',
      '날짜 선택 후 옵션 속성값에 행 추가하여 옵션2, 옵션3(선택사항)을 입력 해주세요. ',
      '순서를 위/아래로 수정해 최우선 노출 옵션을 조정 해주세요.',
      '저장을 완료하면 ‘옵션 등록’ 영역에 입력한 정보가 저장됩니다.',
      '저장완료 후 단일, 복수 옵션으로 변경할 수 없습니다.',
      '저장완료 후 옵션 변경은 전체 삭제 후 가능합니다.'
    ]
  }
]

export const headerRepresentative: ProductHeaderTableOptionModel[] = [
  {
    label: '번호'
  },
  {
    label: '대표 여부 ',
    required: true
  },
  {
    label: '파일명',
    flex: 1
  },
  {
    label: '등록'
  }
]

export const headerRepresentativeVideo: ProductHeaderTableOptionModel[] = [
  {
    label: '번호'
  },
  {
    label: '파일명',
    flex: 1
  },
  {
    label: '등록'
  }
]

export const selectOptions: ProductSelectOptionModel[] = [
  {
    label: '단일옵션',
    value: 'single',
    path: ''
  },
  {
    label: '복수옵션',
    value: 'multiple',
    path: ''
  },
  {
    label: '예약 옵션',
    value: 'optional',
    path: ''
  }
]

export const messageRequired = '<p><span class="wf_text-sub-01">(*)</span>표시는 필수입력항목입니다.</p>'

export const notificationsImage: ProductWarningModel[] = [
  {
    label: '상품 대표 이미지 등록 시 유의사항',
    contentList: [
      '대표 이미지를 포함해 총 5개를 등록할 수 있습니다.',
      '대표 이미지는 삭제할 수 없습니다.',
      '이미지 형식: jpg, gif, png / 사이즈: 000x000px / 용량: 5MB 이하'
    ]
  },
  {
    label: '이미지 제작 시 유의사항',
    contentList: ['이미지 사이즈는 반드시 규격사이즈로 제작해 주세요.', '이미지 해상도 : 최소 00ppi(dpi)']
  }
]

export const notificationsVideo: ProductWarningModel[] = [
  {
    label: '동영상 등록 시 유의사항',
    contentList: [
      '동영상은 총 1개를 등록할 수 있습니다.',
      '동영상이 등록된 경우 대표 이미지보다 우선 순위로 노출됩니다.',
      '동영상 형식: mp4 / 용량: 250MB 이하'
    ]
  }
]

export const dataTableImageMock = [
  {
    name: 'MZ_Product_01.png',
    url: MZ_Product_01
  },
  {
    name: 'MZ_Product_01.png',
    url: MZ_Product_02
  },
  {
    name: 'MZ_Product_01.png',
    url: MZ_Product_03
  },
  {
    name: 'MZ_Product_01.png',
    url: MZ_Product_04
  },
  {
    name: 'MZ_Product_01.png',
    url: MZ_Product_05
  }
]

export const dataTableVideoMock = [
  {
    name: 'MZ_Product_01.mp4',
    url: 'https://www.w3schools.com/tags/movie.mp4'
  }
]

export const MockProductTradeMarkListTable = {
  id: '000001',
  name: '브랜드명 01',
  logo: tradeMark,
  type: '패션의류',
  number: '100',
  exhibition: '전시',
  registration_date: '2023.06.01',
  modification_date: '2023.06.01',
  registrant: '메기admin (10067)',
  check: 'string'
}

export const tableRegisterOptionTitleMock: string[] = ['단일 옵션', '복수 옵션', '예약 옵션 설정']
