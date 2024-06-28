import { DataTableContainerConfigModel } from '@/models/uikit'

export interface ProductDataValueModel {
  beginDate: string
  endDate: string
  checkOption: boolean
  checkAll?: boolean
}

export const ProductDataHeaderRegisterSingleOptionConfig: DataTableContainerConfigModel[] = [
  {
    header: 'No',
    field: 'no',
    class: 'wf_m-w-70'
  },
  {
    header: '옵션 ID',
    field: 'optionId',
    class: 'wf_m-w-192'
  },
  {
    header: '옵션',
    field: 'option',
    class: 'wf_m-w-787'
  },
  {
    header: '추가/삭제',
    field: 'action',
    class: 'wf_m-w-111'
  }
]

export const ProductDataHeaderRegisterMultipleOptionConfig: DataTableContainerConfigModel[] = [
  {
    header: 'No',
    field: 'no',
    class: 'wf_m-w-70'
  },
  {
    header: '옵션 ID',
    field: 'optionId',
    class: 'wf_m-w-192'
  },
  {
    header: '옵션 1',
    field: 'option',
    class: 'wf_m-w-262_33'
  },
  {
    header: '옵션 2',
    field: 'option1',
    class: 'wf_m-w-262_33'
  },
  {
    header: '옵션 3',
    field: 'option2',
    class: 'wf_m-w-262_33'
  },
  {
    header: '추가/삭제',
    field: 'action',
    class: 'wf_m-w-111'
  }
]

export const ProductDataHeaderRegisterOptionalConfig: DataTableContainerConfigModel[] = [
  {
    header: '',
    field: 'selected',
    class: 'wf_m-w-44'
  },
  {
    header: '옵션 ID',
    field: 'optionId',
    class: 'wf_m-w-192'
  },
  {
    header: '옵션 1',
    field: 'option',
    class: 'wf_m-w-271'
  },
  {
    header: '옵션 2',
    field: 'option1',
    class: 'wf_m-w-271'
  },
  {
    header: '옵션 3',
    field: 'option2',
    class: 'wf_m-w-271'
  },
  {
    header: '삭제',
    field: 'action',
    class: 'wf_m-w-111'
  }
]
