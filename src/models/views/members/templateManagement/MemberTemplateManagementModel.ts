// import { DataTableContainerConfigModel, WelfareSelectOptionType } from '@/models'
import { DataTableContainerConfigModel, WelfareSelectOptionType } from '@/models'

export interface MemberTemplateManagementFormModel {
  shippingDirectoryLevel: string
  listRegistered: WelfareSelectOptionType
  templateStatus: string
  searchSelect: WelfareSelectOptionType
  inputSearch: string
}
export const memberTemplateManagementFormConfig = {
  listRadioShippingDirectoryLevel: {
    label: '발송 구분',
    field: 'shippingDirectoryLevel',
    options: [
      { label: '전체', value: '1' },
      { label: '알림톡', value: '2' },
      { label: '문자', value: '3' },
      { label: '앱푸시', value: '4' },
      { label: '이메일', value: '5' }
    ]
  },
  listSelectRow1: {
    label: '발신번호/채널',
    field: 'listRegistered',
    options: [
      { label: '발신번호', value: '1' },
      { label: '채널', value: '2' }
    ]
  },
  listRadioTemplateStatus: {
    label: '템플릿 상태',
    field: 'templateStatus',
    options: [
      { label: '전체', value: '1' },
      { label: '저장완료', value: '2' },
      { label: '등록요청', value: '3' },
      { label: '등록완료', value: '4' },
      { label: '반려', value: '5' }
    ]
  },
  listSelectRow3: {
    label: '검색어',
    field: 'searchSelect',
    options: [
      { label: '전체', value: '전체' },
      { label: '템플릿 ID', value: '템플릿 ID' },
      { label: '템플릿제목', value: '템플릿제목' }
    ]
  },
  listInputRow3: [
    {
      placeholder: '검색어 입력',
      label: '검색어',
      field: 'inputSearch'
    }
  ]
}

export const memberTemplateManagementFieldTableConfig: DataTableContainerConfigModel[] = [
  {
    header: 'No. ',
    field: 'id',
    class: 'wf_m-w-100'
  },
  {
    header: '발송구분',
    field: 'shippingClassification',
    class: 'wf_m-w-150'
  },
  {
    header: '발신번호/채널',
    field: 'typeRegistered',
    class: 'wf_m-w-150'
  },
  {
    header: '템플릿 ID',
    field: 'templateId',
    class: 'wf_m-w-200'
  },
  {
    header: '템플릿 제목',
    field: 'templateTitle',
    class: 'wf_m-w-250 '
  },
  {
    header: '최근 업데이트 일시',
    field: 'registration_date',
    class: 'wf_m-w-200'
  },
  {
    header: '템플릿 상태',
    field: 'templateStatus',
    class: 'wf_m-w-200'
  },
  {
    header: '삭제',
    field: 'delete',
    class: 'wf_m-w-150'
  }
]

export interface MemberTemplateManagementDataTableModel {
  id: string
  shippingClassification: string
  typeRegistered: string
  templateId: string
  templateTitle: string
  registration_date: string
  templateStatus: string
  delete: string
}
