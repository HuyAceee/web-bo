import { isAllPropertyObjectEmpty } from '@/common'
import CategoriesTreeMenuNode from '@/components/categories/common/CategoriesTreeMenuNode.vue'
import { WelfareSelectOptionType } from '@/models/uikit'
import {
  CategoriesItemMoveDirection,
  CategoriesMenuPopupAction,
  CategoriesTreeMenuNodeEmits,
  categoriesExpanderActions
} from '@/models/views/categories/CategoriesDepthManagementModel'
import { DeliveryCategoryTypeModel } from '@/models/views/delivery/ticketProductOrderManagement/DeliveryTicketProductOrderStatusProductModel'
import { TreeNode } from 'primevue/tree'
import { Ref, onMounted, ref, watch } from 'vue'
import { DEFAULT_MENU_ORDER, checkDspCatByKey, useMenuItemSelected } from './common'

export const useCategoriesTreeMenu = (emits: CategoriesTreeMenuNodeEmits, tree: Ref<TreeNode[]>) => {
  const emptyDepth1Node: TreeNode = {
    key: '',
    label: '',
    data: '',
    icon: '',
    children: []
  }

  const selectedExpand = ref<WelfareSelectOptionType>()
  const isFirstExpanded = ref<boolean>(true)
  const wfTreeMenuNode = ref<InstanceType<typeof CategoriesTreeMenuNode> | null>(null)

  const { handleMenuItemSelected } = useMenuItemSelected()

  const nodes = ref<TreeNode[]>([])
  const handleChangeModelValue = (val: WelfareSelectOptionType) => {
    selectedExpand.value = val
    if (val.value === categoriesExpanderActions[0].value) {
      wfTreeMenuNode?.value?.handleShowMenuTree(true)
      wfTreeMenuNode?.value?.expandAll?.()
    } else {
      wfTreeMenuNode?.value?.handleShowMenuTree(false)
      wfTreeMenuNode?.value?.collapseAll?.()
    }
  }

  const addTopNode = () => {
    const hasNewNode = isAllPropertyObjectEmpty(nodes.value[nodes.value.length - 1])
    if (hasNewNode) {
      return
    }
    const nodeToAdd = {
      ...emptyDepth1Node,
      upperStandardCategoryId: '',
      standardCategoryDepth: 1,
      standardCategoryDisplayOrder: nodes.value.length + 1
    }

    if (nodes.value?.[0]?.standardCategoryId) {
      nodes.value = [nodeToAdd, ...nodes.value]
    } else {
      return
    }

    if (nodes.value.length && checkDspCatByKey(nodes.value[nodes.value.length - 1].standardCategoryId)) {
      handleMenuItemSelected(nodeToAdd, DeliveryCategoryTypeModel.DISPLAY)
    } else {
      handleMenuItemSelected(nodeToAdd)
    }
  }

  const saveData = () => {
    emits('save-menu-data', nodes.value)
  }

  const handleActionMenuClick = (action: CategoriesMenuPopupAction, targetRow: TreeNode) => {
    if (action === CategoriesMenuPopupAction.MOVE_UP) {
      const newTree = moveNode(nodes.value, targetRow.value.node, CategoriesItemMoveDirection.UP)
      nodes.value = newTree
    } else if (action === CategoriesMenuPopupAction.MOVE_DOWN) {
      const newTree = moveNode(nodes.value, targetRow.value.node, CategoriesItemMoveDirection.DOWN)
      nodes.value = newTree
    } else if (action === CategoriesMenuPopupAction.ADD_CHILD) {
      addEmptyNodeToChildren(nodes.value, targetRow.value.node)
    } else {
      // delete
      emits('action-menu-clicked', CategoriesMenuPopupAction.DELETE, targetRow)
    }
  }
  const handleMenuItemClick = (targetRow: TreeNode) => {
    emits('menu-item-selected', targetRow)
  }

  const findNode = (nodes: TreeNode[], nodeId?: string): TreeNode | undefined => {
    if (nodes) {
      for (const node of nodes) {
        if (node.key === nodeId) {
          return node
        }
        if (node.children) {
          const found = findNode(node.children, nodeId)
          if (found) {
            return found
          }
        }
      }
    }
    return undefined
  }

  const addEmptyNodeToChildren = (tree: TreeNode[], node: TreeNode) => {
    const rootCopy = [...tree]
    const parentNode = findNode(rootCopy, node.key)
    const lastChildNode = parentNode!.children!.length > 0 ? parentNode!.children![parentNode!.children!.length - 1] : emptyDepth1Node
    const nodeToAdd = {
      ...emptyDepth1Node,
      upperStandardCategoryId: node.standardCategoryId,
      standardCategoryDepth: node.standardCategoryDepth + 1,
      standardCategoryDisplayOrder: lastChildNode?.standardCategoryDisplayOrder + 1 || DEFAULT_MENU_ORDER
    }

    if (nodes.value.length && checkDspCatByKey(nodes.value[0].standardCategoryId)) {
      handleMenuItemSelected(nodeToAdd, DeliveryCategoryTypeModel.DISPLAY)
    } else {
      handleMenuItemSelected(nodeToAdd)
    }
    parentNode!.children!.push(nodeToAdd)
    wfTreeMenuNode.value?.expandNodeWithoutChildren?.(node)
    return rootCopy
  }

  const moveNode = (tree: TreeNode[], currentNode: TreeNode, direction: CategoriesItemMoveDirection): TreeNode[] => {
    const rootCopy = [...tree]

    const nodeToMove = findNode(rootCopy, currentNode.key)

    if (!nodeToMove) {
      return tree
    }

    const parentNode = findNode(rootCopy, nodeToMove.upperStandardCategoryId)
    if (!parentNode?.children) {
      const currentIndex = rootCopy.findIndex((node) => node.standardCategoryId === currentNode.standardCategoryId)
      // we sort the parent content in descending order base on standardCategoryDisplayOrder,
      // so if the node move down it has to has index > 1
      // if the node move up it has to has index < length - 1
      if (
        (direction === CategoriesItemMoveDirection.UP && currentIndex > 0) ||
        (direction === CategoriesItemMoveDirection.DOWN && currentIndex < rootCopy.length - 1)
      ) {
        const adjacentIndex = direction === CategoriesItemMoveDirection.UP ? currentIndex - 1 : currentIndex + 1
        //
        ;[rootCopy[currentIndex].standardCategoryDisplayOrder, rootCopy[adjacentIndex].standardCategoryDisplayOrder] = [
          // rootCopy[adjacentIndex].standardCategoryDisplayOrder,
          // rootCopy[currentIndex].standardCategoryDisplayOrder
          adjacentIndex - 1,
          currentIndex + 1
        ]
        ;[rootCopy[currentIndex], rootCopy[adjacentIndex]] = [rootCopy[adjacentIndex], rootCopy[currentIndex]]
      }
      // Return the original tree if the parent node is not found
      return rootCopy
    }

    // Find the index of the node to move
    const currentIndex = parentNode.children.findIndex((node) => node.standardCategoryId === currentNode.standardCategoryId)
    // Check if the node can be moved in the specified direction

    // we sort the parent content in ascending order base on standardCategoryDisplayOrder,
    // so if the node move up it has to has index > 1
    // if the node move down it has to has index < length - 1
    if (
      (direction === CategoriesItemMoveDirection.UP && currentIndex > 0) ||
      (direction === CategoriesItemMoveDirection.DOWN && currentIndex < parentNode.children.length - 1)
    ) {
      const adjacentIndex = direction === CategoriesItemMoveDirection.UP ? currentIndex - 1 : currentIndex + 1
      // Swap order field
      ;[parentNode.children[currentIndex].standardCategoryDisplayOrder, parentNode.children[adjacentIndex].standardCategoryDisplayOrder] = [
        parentNode.children[adjacentIndex].standardCategoryDisplayOrder,
        parentNode.children[currentIndex].standardCategoryDisplayOrder
      ]
      // Swap the node with its adjacent node
      ;[parentNode.children[currentIndex], parentNode.children[adjacentIndex]] = [
        parentNode.children[adjacentIndex],
        parentNode.children[currentIndex]
      ]
    } else {
      // Return the original tree if the node cannot be moved
      return tree
    }

    return rootCopy
  }

  onMounted(() => {
    nodes.value = tree.value
    selectedExpand.value = categoriesExpanderActions[0]
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
    options: categoriesExpanderActions,
    handleChangeModelValue,
    addTopNode,
    saveData,
    wfTreeMenuNode,
    nodes,
    handleActionMenuClick,
    handleMenuItemClick
  }
}
