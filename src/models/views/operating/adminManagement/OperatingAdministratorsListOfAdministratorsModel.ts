import { ID_CHECKBOX_ALL } from '@/common'
import { WelfareSelectOptionType } from '@/models/uikit'
export interface OperatingAdministratorsFormModel {
  authorityGroupKey?: string
  isActive?: OperatingPermissionUseStatusModel
  startDate?: string
  endDate?: string
  searchType?: OperatingManagerSearchType
  searchWord?: string
  durationItem?: string
  dateSelect?: WelfareSelectOptionType
  fromDate?: string
  toDate?: string
}

export interface OperatingAuditingInformationModel {
  modifiedDate: string
  modifierId: string
  modifierKey: number
  modifierName: string
  registerId: string
  registerKey: number
  registerName: string
  registeredDate: string
}
export interface OperatingAdministratorsTableModel {
  authorityGroupKey: number
  authorityGroupName: string
  isActive: OperatingActiveType
  managerId: string
  managerKey: number
  managerName: string
  auditing: OperatingAuditingInformationModel
}

export const OperatingDataFieldFormListConfig = {
  statusOfUse: {
    field: 'isActive',
    list: [
      {
        id: ID_CHECKBOX_ALL,
        label: '전체',
        class: 'wf_w-52'
      },
      {
        id: 'Y',
        label: '사용',
        class: 'wf_w-52'
      },
      {
        id: 'N',
        label: '미사용',
        class: 'wf_w-63'
      }
    ]
  },
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
  dataHeaderAdministratorsTableModalConfig: [
    {
      header: 'No.',
      field: 'no',
      class: 'wf_m-w-64 '
    },
    {
      header: '관리자 코드',
      field: 'managerKey',
      class: 'wf_m-w-90 '
    },
    {
      header: '관리자명',
      field: 'managerName',
      class: 'wf_m-w-200 '
    },
    {
      header: '아이디',
      field: 'managerId',
      class: 'wf_m-w-200 '
    },
    {
      header: '권한 그룹코드',
      field: 'authorityGroupKey',
      class: 'wf_m-w-120 '
    },
    {
      header: '권한 그룹명',
      field: 'authorityGroupName',
      class: 'wf_m-w-120 '
    },
    {
      header: '등록자',
      field: 'registerName',
      class: 'wf_m-w-250 '
    },
    {
      header: '등록 일시',
      field: 'registeredDate',
      class: 'wf_m-w-200 '
    },
    {
      header: '사용 상태',
      field: 'active',
      class: 'wf_m-w-100 '
    },
    {
      header: '수정',
      field: 'editing',
      class: 'wf_m-w-64'
    }
  ]
}
export enum OperatingAdministratorKeywordSearchModel {
  NO_USE = '',
  PROMOTION_NAME = 'promotionName',
  PROMOTION_ID = 'promotionId'
}

export const OperatingAdministratorKeywordSearchOptionsConfig = [
  { label: '사용안함', value: OperatingAdministratorKeywordSearchModel.NO_USE },
  { label: '프로모션명', value: OperatingAdministratorKeywordSearchModel.PROMOTION_NAME },
  { label: '프로모션코드', value: OperatingAdministratorKeywordSearchModel.PROMOTION_ID }
]

export enum OperatingPermissionUseStatusModel {
  ALL = '',
  USED = 'Y',
  UNUSED = 'N'
}

export const operatingPermisstionOptions = [
  {
    label: '전체',
    value: ''
  }
]

export enum OperatingActiveType {
  ACTIVATED = 'Y',
  DEACTIVATED = 'N'
}

export const operatingActiveTypeOptions = [
  { label: '사용', value: OperatingActiveType.ACTIVATED },
  { label: '미사용', value: OperatingActiveType.DEACTIVATED }
]

export enum OperatingDateDurationItemModel {
  REGISTRATION_DATE = 'REG',
  LAST_MODIFIED_DATE = 'MOD',
  LOGIN_DATE = 'LGN',
  MENU_VIEW_DATE = 'MN_VEW'
}

export enum OperatingManagerSearchType {
  UNDEFINED = '',
  AUTHORITY_GROUP_NAME = 'AUTHO_GROUP_NM',
  AUTHORITY_GROUP_ATIN = 'AUTHO_GROUP_ATIN',
  MANAGER_NAME = 'MNGR_NM',
  MANAGER_KEY = 'MNGR_ATIN',
  MANAGER_ID = 'MNGR_ID',
  REGISTER_ID = 'RGTR_ID',
  REGISTER_NAME = 'RGTR_NM',
  VIEWED_MENU = 'VIEW_MN',
  IP_ADDRESS = 'IP_ADDR'
}

export const operatingManagerSearchTypeOptions = [
  { label: '사용안함', value: OperatingManagerSearchType.UNDEFINED },
  { label: '권한그룹명', value: OperatingManagerSearchType.AUTHORITY_GROUP_NAME },
  { label: '관리자명', value: OperatingManagerSearchType.MANAGER_NAME },
  { label: '관리자키', value: OperatingManagerSearchType.MANAGER_KEY },
  { label: '관리자 아이디', value: OperatingManagerSearchType.MANAGER_ID },
  { label: '등록자 아이디', value: OperatingManagerSearchType.REGISTER_ID },
  { label: '등록자명', value: OperatingManagerSearchType.REGISTER_NAME }
]

export const operatingListSelectDateOrderDetailOptions = [
  { label: '등록일', value: OperatingDateDurationItemModel.REGISTRATION_DATE },
  { label: '최종수정일', value: OperatingDateDurationItemModel.LAST_MODIFIED_DATE }
]

export interface OperatingAuthorityGroupsNameModel {
  groupKey: number
  groupName: string
}
