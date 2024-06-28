import { DataTableContainerConfigModel, WelfareSelectOptionType } from '@/models'

export const productDataTableRegisterOptionConfig: DataTableContainerConfigModel[] = [
  {
    header: '전시순서',
    field: 'no',
    class: 'table-row-99'
  },
  {
    header: '옵션 ID',
    field: 'optionId',
    class: 'table-row-120'
  },
  {
    header: '옵션 1',
    field: 'option',
    class: 'table-row-250'
  },
  {
    header: '옵션 2',
    field: 'option1',
    class: 'table-row-250'
  },
  {
    header: '옵션 3',
    field: 'option2',
    class: 'table-row-250'
  },
  {
    header: '옵션가격',
    field: 'optionPrice',
    class: 'table-row-120'
  },
  {
    header: '재고',
    field: 'inventory',
    class: 'table-row-120'
  },
  {
    header: '판매상태',
    field: 'salesStatus',
    class: 'table-row-120'
  },
  {
    header: '수정',
    field: 'action',
    class: 'table-row-67'
  }
]

export const productOptionsTypeRegisterConfig: WelfareSelectOptionType[] = [
  { label: '판매중', value: '01' },
  { label: '판매일시중지', value: '02' },
  { label: '일시품절', value: '03' },
  { label: '품절', value: '04' },
  { label: '판매종료', value: '05' }
]
