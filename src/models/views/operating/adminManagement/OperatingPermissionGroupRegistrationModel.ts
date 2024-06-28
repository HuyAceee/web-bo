export enum OptionsPermission {
  Y = 'Y',
  N = 'N'
}
export type OptionsPermissionType = 'Y' | 'N'

export const OptionsStatusOfUseGroupRole = [
  { value: OptionsPermission.Y, label: '사용' },
  { value: OptionsPermission.N, label: '미사용' }
]

export interface PermissionGroupType {
  key: number
  permissions: {
    read: boolean
    write: boolean
    approve: boolean
    personalInformationManagement: boolean
  }
}

export const defaultPermissions: PermissionGroupType['permissions'] = {
  read: false,
  write: false,
  approve: false,
  personalInformationManagement: false
}
export interface OperatingPermissionGroupForm {
  groupKey?: number
  groupUseYn: OptionsPermissionType
  groupName: string
  groupNameInput: string
  checkExistedGroupNameInput: boolean
  deptInfo: string
  menus: PermissionGroupType[]
}

export const getDefaultGroupRoleForm = (): OperatingPermissionGroupForm => ({
  groupUseYn: OptionsPermission.Y,
  groupName: 'MD그룹',
  deptInfo: '',
  groupNameInput: '',
  checkExistedGroupNameInput: true,
  menus: []
})

export enum GroupNameOptionsType {
  textInput = '0'
}
export const GroupNameOptions = [
  { value: 'MD그룹', label: 'MD그룹' },
  { value: 'CS그룹', label: 'CS그룹' },
  { value: '운영그룹', label: '운영그룹' },
  { value: '총무그룹', label: '총무그룹' },
  { value: '0', label: '직접입력' }
]
export const PermissionGroupRegistrationTooltip = `<div class="wf_flex wf_flex-col wf-gap-10 wf_text-left">
<p class="wf-body_04-reg wf_text-n-33">
-&nbsp;&nbsp;&nbsp;별표<span class="wf_text-sub-01">(*)</span>&nbsp;항목은 필수 입력 항목입니다.
</p>
<p class="wf-body_04-reg wf_text-n-33">-&nbsp;&nbsp;&nbsp;기업 선택 후 운영자의 권한을 구룹별로 설정 할 수 있습니다.</p>
</div>`
