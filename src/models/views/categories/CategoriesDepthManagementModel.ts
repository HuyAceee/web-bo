import { WelfareSelectOptionType } from '@/models/uikit'
import { TreeNode, TreeProps, TreeSelectionKeys } from 'primevue/tree'

export const categoriesMenuActions: WelfareSelectOptionType[] = [
  { label: '하위추가', value: 'addChild' },
  { label: '삭제', value: 'delete' },
  { label: '이동', value: 'moveUp' },
  { label: '이동', value: 'moveDown' }
]

export const categoriesExpanderActions = [
  { label: '전체 펼침', value: '01' },
  { label: '접힘', value: '02' }
]
export const categoriesExpanderActionsEnum = { ALL: '01', COLLAPSED: '02' }

export interface CategoriesTreeMenuNodeProps {
  selectable?: boolean
  hasContextMenu?: boolean
  tree?: any
  rootName?: string
  title?: string
  selectionMode?: TreeProps['selectionMode']
  showHeader?: boolean
  closeModal?: () => void
  onSelect?: (node: TreeNode[]) => void
  selectedKey?: TreeSelectionKeys
  showProductCount?: boolean
  hasWrapper?: boolean
  expandedMode?: string
}
export interface CategoriesTreeMenuPopupContextEmits {
  (e: 'action-clicked', event: CategoriesMenuPopupAction): void
}

export interface CategoriesTreeMenuNodeEmits {
  (e: 'menu-item-selected', event: TreeNode): void
  (e: 'menu-item-unselected', event: TreeNode): void
  (e: 'save-menu-data', event: TreeNode[]): void
  (e: 'action-menu-clicked', event: CategoriesMenuPopupAction, value: TreeNode): void
}
export interface CategoriesStandardManagementEmits {
  (e: 'on-save-category', event: string): void
}
export interface CategoriesDspManagementEmits extends CategoriesStandardManagementEmits {
  (e: 'on-change-dsp-select', event: string): void
}

export interface CategoriesTreeMenuPopupProps {
  actions: WelfareSelectOptionType[]
  xPosition: number
  yPosition: number
}

export enum CategoriesDeep {
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4
}

export enum CategoriesItemMoveDirection {
  UP = 'moveUp',
  DOWN = 'moveDown'
}
export enum CategoriesMenuPopupAction {
  ADD_CHILD = 'addChild',
  DELETE = 'delete',
  MOVE_UP = 'moveUp',
  MOVE_DOWN = 'moveDown'
}
