export enum OptionsAdminPermission {
  Y = 'Y',
  N = 'N'
}
export type OptionsAdminPermissionType = 'Y' | 'N'

export const OptionsStatusOfUseAdminRegis = [
  { value: OptionsAdminPermission.Y, label: '사용' },
  { value: OptionsAdminPermission.N, label: '미사용' }
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

export interface OperatingAdminPermissionRegisForm {
  managerKey?: number
  authorityGroupKey?: number
  isActive: OptionsAdminPermissionType
  managerId: string
  checkManagerIdExisted?: boolean
  managerName: string
  password: string
  phone: string
  checkPhoneExisted?: boolean
  email: string
  checkEmailExisted?: boolean
  deptInfo: string
  auditing?: {
    registerKey: number
    registerId: string
    registerName: string
    registeredDate: string
    modifierKey: number
    modifierId: string
    modifierName: string
    modifiedDate: string
  }
}

export const getDefaultAdminPermissionRegisForm = (): OperatingAdminPermissionRegisForm => ({
  isActive: OptionsAdminPermission.Y,
  managerId: '',
  checkManagerIdExisted: true,
  managerName: '',
  password: '',
  phone: '',
  checkPhoneExisted: true,
  email: '',
  checkEmailExisted: true,
  deptInfo: ''
})

export const AdministratorRegistrationTooltip = `<div class="wf_flex wf_flex-col wf-gap-10 wf_text-left">
<p class="wf-body_04-reg wf_text-n-33">
-&nbsp;&nbsp;&nbsp;별표<span class="wf_text-sub-01">(*)</span>&nbsp;항목은 필수 입력 항목입니다.
</p>
<p class="wf-body_04-reg wf_text-n-33">-&nbsp;&nbsp;&nbsp;권한 그룹의 권한은 권한그룹 관리 메뉴에서 설정 가능합니다.</p>
</div>`
