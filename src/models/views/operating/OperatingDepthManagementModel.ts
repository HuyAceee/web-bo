import { WelfareSelectOptionType } from '@/models/uikit'
import { TreeNode, TreeProps, TreeSelectionKeys } from 'primevue/tree'

export const operatingMenuActions: WelfareSelectOptionType[] = [
  { label: '하위추가', value: 'addChild' },
  { label: '삭제', value: 'delete' },
  { label: '이동', value: 'moveUp' },
  { label: '이동', value: 'moveDown' }
]

export const operatingExpanderActions = [
  { label: '전체 펼침', value: '01' },
  { label: '접힘', value: '02' }
]
export const operatingExpanderActionsEnum = { ALL: '01', COLLAPSED: '02' }

export interface OperatingTreeMenuNodeProps {
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
export interface OperatingTreeMenuPopupContextEmits {
  (e: 'action-clicked', event: OperatingMenuPopupAction): void
}

export interface OperatingTreeMenuNodeEmits {
  (e: 'menu-item-selected', event: TreeNode): void
  (e: 'menu-item-unselected', event: TreeNode): void
  (e: 'save-menu-data', event: TreeNode[]): void
  (e: 'action-menu-clicked', event: OperatingMenuPopupAction, value: TreeNode): void
}
export interface OperatingManagementEmits {
  (e: 'on-save-category', event: string): void
}

export interface OperatingTreeMenuPopupProps {
  actions: WelfareSelectOptionType[]
  xPosition: number
  yPosition: number
}

export enum OperatingDeep {
  ONE = 1,
  TWO = 2,
  THREE = 3,
  FOUR = 4
}

export enum OperatingItemMoveDirection {
  UP = 'moveUp',
  DOWN = 'moveDown'
}
export enum OperatingMenuPopupAction {
  ADD_CHILD = 'addChild',
  DELETE = 'delete',
  MOVE_UP = 'moveUp',
  MOVE_DOWN = 'moveDown'
}
