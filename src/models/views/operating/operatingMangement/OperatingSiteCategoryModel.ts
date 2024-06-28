import { DataTableContainerConfigModel } from '@/models/uikit'
import { TreeNode } from 'primevue/tree'
export enum OptionsSiteForm {
  Y = 'Y',
  N = 'N'
}
export type OptionsTypeSiteForm = 'Y' | 'N'
export interface OperatingSiteFormModel {
  menuKey?: number
  menuId?: string
  parentMenuKey?: number
  menuName: string
  menuExhibitionStatus: OptionsTypeSiteForm
  personalInformationInclude: OptionsTypeSiteForm
  subMenuActive: OptionsTypeSiteForm
  checkMenuIdExisted: boolean
}
export interface OperatingSiteCategoryListItemModel extends Omit<TreeNode, 'children'> {
  exhibitionActive: string
  menuDepth: number
  menuKey: number
  menuId: string
  menuName: string
  menuOrder: number
  parentMenuKey: number
  personalInformationIncluded: string
  subMenus: OperatingSiteCategoryListItemModel[]
  children: OperatingSiteCategoryListItemModel[]
}
export interface OperatingSiteCategoryTreeListItemModel extends Omit<TreeNode, 'children'> {
  key: number
  data: {
    exhibitionActive: string
    menuDepth: number
    menuKey: number
    menuId: string
    menuName: string
    menuOrder: number
    parentMenuKey: number
    personalInformationIncluded: string
    subMenus: OperatingSiteCategoryListItemModel[]
  }
  children: OperatingSiteCategoryTreeListItemModel[]
}

export interface OperatingSiteManagementEmits {
  (e: 'on-save-site', event: string): void
}

export interface OperatingSiteCategoryDetailModel {
  menuDepth: number
  menuExhibitionStatus: OptionsTypeSiteForm
  menuKey: number
  menuId: string
  menuName: string
  menuOrder: number
  parentMenuKey: number
  parentMenuName: string
  personalInformationInclude: OptionsTypeSiteForm
  subMenuActive: OptionsTypeSiteForm
  auditing: {
    modifiedDate: string
    modifierId: number | null
    modifierKey: number
    modifierName: string
    registerId: null
    registerKey: number
    registerName: string
    registeredDate: string
  }
  subSiteMenu: OperatingSiteCategoryDetailModel[]
}

export const operatingSiteManagementHeaderConfig: DataTableContainerConfigModel[] = [
  {
    header: '하위 메뉴명',
    field: 'menuName',
    class: 'wf_m-w-244'
  },
  {
    header: '하위 메뉴 ID',
    field: 'menuKey',
    class: 'wf_m-w-244'
  },
  {
    header: '레벨',
    field: 'menuDepth',
    class: 'wf_m-w-244'
  },
  {
    header: '전시 여부',
    field: 'exhibitionActive',
    class: 'wf_m-w-244',
    render: (value) => (value === OptionsSiteForm.Y ? '전시' : '비전시')
  }
]

export const defaultSiteCategoryFormValue = (): OperatingSiteFormModel => ({
  menuName: '',
  personalInformationInclude: OptionsSiteForm.Y,
  subMenuActive: OptionsSiteForm.Y,
  menuExhibitionStatus: OptionsSiteForm.Y,
  menuId: '',
  checkMenuIdExisted: false
})
