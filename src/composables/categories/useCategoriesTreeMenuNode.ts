import { ProductStandardCategoryListModel } from '@/models/services/responses/products/ticket/ProductTicketListResponse'
import {
  CategoriesMenuPopupAction,
  CategoriesTreeMenuNodeEmits,
  CategoriesTreeMenuNodeProps,
  categoriesExpanderActionsEnum,
  categoriesMenuActions
} from '@/models/views/categories/CategoriesDepthManagementModel'
import { TreeExpandedKeys, TreeNode, TreeSelectionKeys } from 'primevue/tree'
import { Ref, onMounted, ref, watch, computed } from 'vue'

export const useCategoriesTreeMenuNode = (
  emits: CategoriesTreeMenuNodeEmits,
  tree: Ref<TreeNode[]>,
  treeSelectionKeys?: TreeSelectionKeys,
  props?: CategoriesTreeMenuNodeProps
) => {
  const nodes = ref<TreeNode[]>([])
  const expandedKeys = ref<TreeExpandedKeys>({})
  const selectedKey = ref<TreeSelectionKeys>()
  const showMenu = ref(false)
  const menuXPosition = ref(0)
  const menuYPosition = ref(0)
  const targetRow = ref<TreeNode>()
  const showMenuTree = ref(true)
  const contextMenuActions = categoriesMenuActions
  const contextMenuLeafActions = categoriesMenuActions.slice(1, categoriesMenuActions.length)

  const itemProps = computed(() => {
    return props?.selectedKey
  })

  const expandAll = () => {
    for (const node of nodes.value) {
      expandNode(node)
    }
    expandedKeys.value = { ...expandedKeys.value }
  }
  const collapseAll = () => {
    expandedKeys.value = {}
  }

  const onNodeSelect = (node: TreeNode) => {
    emits('menu-item-selected', node)
  }

  const onNodeUnselect = (node: TreeNode) => {
    emits('menu-item-unselected', node)
  }

  const expandNode = (node: TreeNode) => {
    if (node.children?.length) {
      if (node.key) {
        expandedKeys.value[node.key] = true
      }
      for (const child of node.children) {
        expandNode(child)
      }
    }
  }
  const expandNodeWithoutChildren = (node: TreeNode) => {
    if (node.children?.length) {
      if (node.key) {
        expandedKeys.value[node.key] = true
      }
    }
  }

  const toggleShowMenuTree = () => {
    showMenuTree.value = !showMenuTree.value
  }
  const handleShowMenuTree = (value: boolean) => {
    showMenuTree.value = value
  }

  const isLeaf = (node: TreeNode) => {
    return node.standardCategoryDepth === 3
  }

  const showContextMenu = (event: MouseEvent, props: any) => {
    event.preventDefault()
    event.stopPropagation()
    console.log(props)

    targetRow.value = props
    showMenu.value = true
    menuXPosition.value = event.clientX
    menuYPosition.value = event.clientY
  }

  const closeContextMenu = (e: MouseEvent) => {
    e.stopPropagation()
    showMenu.value = false
  }

  const handleActionMenuClick = (action: CategoriesMenuPopupAction) => {
    showMenu.value = false
    emits('action-menu-clicked', action, targetRow)
  }

  const buildSelectedMap = (data: ProductStandardCategoryListModel[]) => {
    const selectedTreeMap = new Map()
    const d = data?.map((it: ProductStandardCategoryListModel) => {
      let idPath: string[] = []
      if (it?.displayCategoryPathId) {
        idPath = it?.displayCategoryPathId.split(',')
      }
      return {
        displayCategoryIdDepth1: it?.displayCategoryIdDepth1 || idPath[0]?.trim(),
        displayCategoryIdDepth2: it?.displayCategoryIdDepth2 || idPath[1]?.trim(),
        displayCategoryIdDepth3: it?.displayCategoryIdDepth3 || idPath[2]?.trim()
      }
    })
    d?.forEach((obj: any) => {
      Object.keys(obj).forEach((key) => {
        const id = obj[key]
        selectedTreeMap.set(id, { checked: true, partialChecked: true })
      })
    })
    return selectedTreeMap
  }

  onMounted(() => {
    nodes.value = tree.value
    const data = buildSelectedMap(itemProps.value as any)
    selectedKey.value = Object.fromEntries(data)
    if (props?.expandedMode === categoriesExpanderActionsEnum.ALL) {
      expandAll()
    }
  })

  watch(tree, (val) => {
    nodes.value = val
  })

  watch(
    () => itemProps.value,
    (val) => {
      const data = buildSelectedMap(val as any)
      selectedKey.value = Object.fromEntries(data)
    }
  )

  return {
    nodes,
    showMenu,
    contextMenuActions,
    closeContextMenu,
    handleActionMenuClick,
    showContextMenu,
    expandedKeys,
    menuXPosition,
    menuYPosition,
    onNodeSelect,
    onNodeUnselect,
    selectedKey,
    toggleShowMenuTree,
    showMenuTree,
    contextMenuLeafActions,
    isLeaf,
    targetRow,
    expandAll,
    collapseAll,
    handleShowMenuTree,
    expandNode,
    expandNodeWithoutChildren
  }
}
