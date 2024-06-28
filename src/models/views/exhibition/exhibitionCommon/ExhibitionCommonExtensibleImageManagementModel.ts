import { ExhibitionCommonExtendedImageListRequest } from '@/models/services/requests/exhibition/ExhibitionCommonExtensibleImageManagementRequest'
import { MergeColsTableConfigType, WelfareSelectOptionType } from '@/models'
import { CategoriesExhibitionProductClassificationModel } from '@/models/views/categories/exhibition/CategoriesExhibitionDepth3ManagementModel'
import { ExhibitionCommonExtendedImageListResponseModel } from '@/models/services/responses/exhibition/exhibitionCommon/ExhibitionCommonExtensibleImageManagementResponse'

export interface ExhibitionCommonExtensibleImageManagementFormModel
  extends Omit<ExhibitionCommonExtendedImageListRequest, 'searchPeriodType' | 'searchWordType'> {
  searchPeriodType: WelfareSelectOptionType
  searchWordType: WelfareSelectOptionType
}

export const exhibitionCommonExtensibleImageManagementProductClassificationOptions = [
  { label: '전체', value: null },
  { label: '배송형', value: CategoriesExhibitionProductClassificationModel.DELIVERY },
  { label: '티켓형', value: CategoriesExhibitionProductClassificationModel.TICKET }
]

export const exhibitionCommonExtensibleImageManagementTableConfig: MergeColsTableConfigType[] = [
  {
    header: 'No',
    field: 'rowNum',
    class: 'wf_col-100 ',
    required: false
  },
  {
    header: '상품코드',
    field: 'productKey',
    class: 'wf_col-180 ',
    required: false
  },
  {
    header: '상품명',
    field: 'productName',
    class: 'wf_col-180 ',
    required: false
  },
  {
    header: '판매상태',
    field: 'lastSaleStatusName',
    class: 'wf_col-180 ',
    required: false
  },
  {
    header: '전시여부',
    field: 'productDisplayYn',
    class: 'wf_col-180 ',
    required: false
  },
  {
    header: '확장형 이미지',
    field: 'imageFullPathName',
    class: 'wf_col-300 ',
    required: true
  },
  {
    header: '상품구분',
    field: 'productClassificationName',
    class: 'wf_col-180 ',
    required: false
  },
  {
    header: '판매사코드',
    field: 'sellerKey',
    class: 'wf_col-180 ',
    required: false
  },
  {
    header: '판매사',
    field: 'sellerName',
    class: 'wf_col-180 ',
    required: false
  },
  {
    header: '브랜드코드',
    field: 'brandKey',
    class: 'wf_col-180 ',
    required: false
  },
  {
    header: '브랜드',
    field: 'brandName',
    class: 'wf_col-180 ',
    required: false
  },
  {
    header: '등록자',
    field: 'createdByName',
    class: 'wf_col-180 ',
    required: false
  },
  {
    header: '등록일',
    field: 'createdDate',
    class: 'wf_col-180 ',
    required: false
  },
  {
    header: '수정자',
    field: 'lastModifiedByName',
    class: 'wf_col-180 ',
    required: false
  },
  {
    header: '수정일',
    field: 'lastModifiedDate',
    class: 'wf_col-180 ',
    required: false
  }
]

export interface ExhibitionCommonExtensibleImageManagementTableModel extends ExhibitionCommonExtendedImageListResponseModel {
  id?: number
  isSelected?: boolean
}
