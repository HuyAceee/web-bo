import OperatingTreeMenuNode from '@/components/operating/common/OperatingTreeMenuNode.vue'
import { WelfareSelectOptionType } from '@/models/uikit'
import {
  OperatingMenuPopupAction,
  OperatingTreeMenuNodeEmits,
  operatingExpanderActions
} from '@/models/views/operating/OperatingDepthManagementModel'
import { TreeNode } from 'primevue/tree'
import { Ref, onMounted, ref, watch } from 'vue'

export const useOperatingTreeMenu = (emits: OperatingTreeMenuNodeEmits, tree: Ref<TreeNode[]>) => {
  const selectedExpand = ref<WelfareSelectOptionType>()
  const isFirstExpanded = ref<boolean>(true)
  const wfTreeMenuNode = ref<InstanceType<typeof OperatingTreeMenuNode> | null>(null)

  const nodes = ref<TreeNode[]>([])
  const handleChangeModelValue = (val: WelfareSelectOptionType) => {
    selectedExpand.value = val
    if (val.value === operatingExpanderActions[0].value) {
      wfTreeMenuNode?.value?.handleShowMenuTree(true)
      wfTreeMenuNode?.value?.expandAll?.()
    } else {
      wfTreeMenuNode?.value?.handleShowMenuTree(false)
      wfTreeMenuNode?.value?.collapseAll?.()
    }
  }

  const handleActionMenuClick = (action: OperatingMenuPopupAction, targetRow: TreeNode) => {
    emits('action-menu-clicked', action, targetRow.value.node)
  }

  const addTopNode = () => {
    emits('action-menu-clicked', OperatingMenuPopupAction.ADD_CHILD, {})
  }

  const saveData = () => {
    emits('save-menu-data', nodes.value)
  }

  const handleMenuItemClick = (targetRow: TreeNode) => {
    emits('menu-item-selected', targetRow)
  }

  onMounted(() => {
    nodes.value = tree.value
    selectedExpand.value = operatingExpanderActions[0]
  })

  watch(tree, (val) => {
    nodes.value = val
    if (isFirstExpanded.value === true) {
      setTimeout(() => {
        wfTreeMenuNode.value?.expandAll?.()
      })
      isFirstExpanded.value = false
    }
  })

  return {
    selectedExpand,
    options: operatingExpanderActions,
    handleChangeModelValue,
    addTopNode,
    saveData,
    wfTreeMenuNode,
    nodes,
    handleMenuItemClick,
    handleActionMenuClick
  }
}
