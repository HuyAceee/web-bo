import { DataTableContainerConfigModel, WelfareRadioProps } from '@/models'
import { ExhibitionApplyChannelType } from '@/models/views/exhibition/modal/ExhibitionCornerConnectionModalModel'

export const exhibitionTemplateManagementStatusOptions: WelfareRadioProps[] = [
  { label: '전시', value: 'Y' },
  { label: '비전시', value: 'N' }
]

export const exhibitionTemplateManagementAppChannelOptions: WelfareRadioProps[] = [
  { label: '전체', value: ExhibitionApplyChannelType.ALL },
  { label: 'PC', value: ExhibitionApplyChannelType.PC },
  { label: '모바일', value: ExhibitionApplyChannelType.MO }
]

export type ExhibitionTemplateManagementFormType = 'create' | 'modify'

export interface ExhibitionTemplateManagementOptionModel {
  label?: string
  trueValue?: string
  falseValue?: string
  name?: string
  disabled?: boolean
}

export const exhibitionTemplateManagementOptions: ExhibitionTemplateManagementOptionModel[] = [
  { label: '상품', trueValue: 'Y', falseValue: 'N', name: 'templateAttributeProductYn' },
  { label: '배너', trueValue: 'Y', falseValue: 'N', name: 'templateAttributeBannerYn' },
  { label: '상품그룹', trueValue: 'Y', falseValue: 'N', name: 'templateAttributeProductGroupYn' },
  { label: '특가', trueValue: 'Y', falseValue: 'N', name: 'templateAttributeSpecialPriceYn' },
  { label: '텍스트', trueValue: 'Y', falseValue: 'N', name: 'templateAttributeTextYn' }
]

export type ExhibitionTemplateManagementType =
  | 'templateAttributeProductYn'
  | 'templateAttributeBannerYn'
  | 'templateAttributeProductGroupYn'
  | 'templateAttributeSpecialPriceYn'
  | 'templateAttributeTextYn'

export interface ExhibitionTemplateManagementTableModel {
  rowNum?: number
  templateKey?: number
  templateName?: string
  templateAttributeProductYn?: string
  templateAttributeBannerYn?: string
  templateAttributeProductGroupYn?: string
  templateAttributeSpecialPriceYn?: string
  templateAttributeTextYn?: string
  displayYn?: string
  applyChannelTypeName?: string
  createdByName?: string
  createdDate?: string
  lastModifiedByName?: string
  lastModifiedDate?: string
}

export interface ExhibitionTemplateManagementModel extends Omit<ExhibitionTemplateManagementTableModel, 'rowNum' | 'applyChannelTypeName'> {
  imageName?: string
  imagePathName?: string
  imageDeleteYn?: string
  imageAltName?: string
  templateRemarkContents?: string
  applyChannelType?: string
}

export const exhibitionTemplateManagementTableConfig: DataTableContainerConfigModel[] = [
  {
    header: 'No.',
    field: 'rowNum',
    class: 'wf_m-w-150 '
  },
  {
    header: '템플릿코드',
    field: 'templateKey',
    class: 'wf_m-w-150 '
  },
  {
    header: '템플릿명',
    field: 'templateName',
    class: 'wf_m-w-150 '
  },
  {
    header: '상품',
    field: 'templateAttributeProductYn',
    class: 'wf_m-w-150 '
  },
  {
    header: '배너',
    field: 'templateAttributeBannerYn',
    class: 'wf_m-w-150 '
  },
  {
    header: '상품그룹',
    field: 'templateAttributeProductGroupYn',
    class: 'wf_m-w-150 '
  },
  {
    header: '특가',
    field: 'templateAttributeSpecialPriceYn',
    class: 'wf_m-w-150 '
  },
  {
    header: '텍스트',
    field: 'templateAttributeTextYn',
    class: 'wf_m-w-150 '
  },
  {
    header: '전시여부',
    field: 'displayYn',
    class: 'wf_m-w-150 '
  },
  {
    header: '적용채널',
    field: 'applyChannelTypeName',
    class: 'wf_m-w-150 '
  },
  {
    header: '등록자',
    field: 'createdByName',
    class: 'wf_m-w-200 '
  },
  {
    header: '등록일자',
    field: 'createdDate',
    class: 'wf_m-w-150 '
  },
  {
    header: '수정자',
    field: 'lastModifiedByName',
    class: 'wf_m-w-200 '
  },
  {
    header: '수정일자',
    field: 'lastModifiedDate',
    class: 'wf_m-w-150 '
  }
]
