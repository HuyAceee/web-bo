import { getArrayDifferentItemsByProperty } from '@/common'
import OperatingTreeMenu from '@/components/operating/common/OperatingTreeMenuNode.vue'
import { useLoading } from '@/composables/common/useLoading'
import { useModalConfirm, useModalNotification } from '@/composables/widgets'
import { OperatingSiteCategoryResponseConverter } from '@/models/services/responses/operating/site/OperatingSiteCategoryResponse'
import { ProductTreeMenuConverter } from '@/models/services/responses/products/category/ProductCategoryResponse'
import { OperatingItemMoveDirection, OperatingMenuPopupAction } from '@/models/views/operating/OperatingDepthManagementModel'
import { OperatingSiteCategoryListItemModel, OptionsSiteForm } from '@/models/views/operating/operatingMangement/OperatingSiteCategoryModel'
import { operatingSiteBoCategoryApi } from '@/services/api/operating/site/OperatingSiteManagementApi'
import { TreeNode } from 'primevue/tree'
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export const useOperatingSiteManagement = () => {
  const { openModal: openModalConfirm, closeModalByPop: closeModalConfirm } = useModalConfirm()
  const nodes = ref<OperatingSiteCategoryListItemModel[]>([])
  let oldNodes: OperatingSiteCategoryListItemModel[] = []
  const { setLoading } = useLoading()
  const { openModal: openModalNotification, closeModalByPop } = useModalNotification()
  const wfTreeMenu = ref<InstanceType<typeof OperatingTreeMenu> | null>(null)
  const router = useRouter()
  const route = useRoute()
  const menuKey = ref<string>()
  const parentMenuKey = ref<string>()
  const tab = ref<string>('')

  const handleMenuItemSelected = (value: TreeNode) => {
    const menuKey = value.menuKey
    router.push({ query: { tab: tab.value, menuKey } })
  }

  const handleActionMenuClick = (action: OperatingMenuPopupAction, value: TreeNode) => {
    if (action === OperatingMenuPopupAction.ADD_CHILD) {
      router.push({ query: { tab: tab.value, parentMenuKey: value.menuKey || 0 } })
    } else if (action === OperatingMenuPopupAction.MOVE_UP) {
      const newTree = moveNode(nodes.value, value, OperatingItemMoveDirection.UP)
      nodes.value = newTree as any
    } else if (action === OperatingMenuPopupAction.MOVE_DOWN) {
      const newTree = moveNode(nodes.value, value, OperatingItemMoveDirection.DOWN)
      nodes.value = newTree as any
    } else if (action === OperatingMenuPopupAction.DELETE) {
      handleDeleteSite(value as OperatingSiteCategoryListItemModel)
    }
  }

  const handleDeleteSite = async (value: OperatingSiteCategoryListItemModel) => {
    if (value.menuKey) {
      if (value?.subMenus?.length) {
        openModalNotification({
          content: '하위 메뉴가 존재하는 경우 삭제 할 수 없습니다.'
        })
        return
      }
      if (value?.exhibitionActive === OptionsSiteForm.Y) {
        openModalNotification({
          content: '전시 상태에서 삭제할 수 없습니다.'
        })
        return
      }
      try {
        openModalConfirm({
          content: '메뉴를 삭제할 경우 복구할 수 없습니다. 정말로 삭제하시겠습니까?',
          onConfirm: async () => {
            closeModalConfirm?.()
            try {
              value.menuKey && (await operatingSiteBoCategoryApi.deleteSite(value.menuKey))
              router.replace({ query: { tab: tab.value } })
            } catch (error) {
              //empty
            }
          }
        })
      } catch (error) {
        return
      }
    }
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

  const moveNode = (tree: TreeNode[], currentNode: TreeNode, direction: OperatingItemMoveDirection): TreeNode[] => {
    const rootCopy = [...tree]

    const nodeToMove = findNode(rootCopy, currentNode.key)

    if (!nodeToMove) {
      return tree
    }

    const parentNode = findNode(rootCopy, nodeToMove.parentMenuKey)
    if (!parentNode?.children) {
      const currentIndex = rootCopy.findIndex((node) => node.menuKey === currentNode.menuKey)
      // we sort the parent content in descending order base on menuOrder,
      // so if the node move down it has to has index > 1
      // if the node move up it has to has index < length - 1
      if (
        (direction === OperatingItemMoveDirection.UP && currentIndex > 0) ||
        (direction === OperatingItemMoveDirection.DOWN && currentIndex < rootCopy.length - 1)
      ) {
        const adjacentIndex = direction === OperatingItemMoveDirection.UP ? currentIndex - 1 : currentIndex + 1
        ;[rootCopy[currentIndex].menuOrder, rootCopy[adjacentIndex].menuOrder] = [rootCopy[adjacentIndex].menuOrder, rootCopy[currentIndex].menuOrder]
        ;[rootCopy[currentIndex], rootCopy[adjacentIndex]] = [rootCopy[adjacentIndex], rootCopy[currentIndex]]
      }
      // Return the original tree if the parent node is not found
      return rootCopy
    }

    // Find the index of the node to move
    const currentIndex = parentNode.children.findIndex((node) => node.menuKey === currentNode.menuKey)
    // Check if the node can be moved in the specified direction

    // we sort the parent content in ascending order base on menuOrder,
    // so if the node move up it has to has index > 1
    // if the node move down it has to has index < length - 1
    if (
      (direction === OperatingItemMoveDirection.UP && currentIndex > 0) ||
      (direction === OperatingItemMoveDirection.DOWN && currentIndex < parentNode.children.length - 1)
    ) {
      const adjacentIndex = direction === OperatingItemMoveDirection.UP ? currentIndex - 1 : currentIndex + 1
      // Swap order field
      ;[parentNode.children[currentIndex].menuOrder, parentNode.children[adjacentIndex].menuOrder] = [
        parentNode.children[adjacentIndex].menuOrder,
        parentNode.children[currentIndex].menuOrder
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

  const getStdCatListMenu = async () => {
    try {
      setLoading?.(true)
      const { data } = await operatingSiteBoCategoryApi.getSiteList()
      const tree = OperatingSiteCategoryResponseConverter.buildTreesFromStdOperatingArray(data, menuKey.value, parentMenuKey.value)
      nodes.value = tree
      oldNodes = ProductTreeMenuConverter.flatTreeToOriginalArray<TreeNode>(tree) as any
    } catch (error) {
      // empty
    } finally {
      setLoading?.(false)
    }
  }

  const handleSaveMenuData = async (value: TreeNode[]) => {
    const newArr: Omit<TreeNode, 'children'>[] = ProductTreeMenuConverter.flatTreeToOriginalArray<TreeNode>(value)
    const diff: Omit<TreeNode, 'children'>[] = getArrayDifferentItemsByProperty<Omit<TreeNode, 'children'>>(oldNodes, newArr, 'menuKey', 'menuOrder')

    const newData = diff.map((it) => {
      return {
        menuKey: it.menuKey,
        changeOrder: it.menuOrder
      }
    })

    if (!newData.length) {
      openModalNotification({
        content: '순서가 변경된 카테고리가 없습니다.'
      })
      return
    }
    try {
      setLoading(true)
      await operatingSiteBoCategoryApi.updateOrder({ changeList: newData })
      openModalNotification({
        content: '변경한 순서가 저장 되었습니다.',
        onAccept: async () => {
          try {
            await getStdCatListMenu()
            closeModalByPop?.()
          } catch (error) {
            // empty
          }
        }
      })
    } catch (error) {
      // empty
    } finally {
      setLoading(false)
    }
  }

  const handleChangeMenuData = () => {
    getStdCatListMenu()
  }

  const scrollTo = (key: any) => {
    if (key === undefined) {
      return
    }
    setTimeout(() => {
      const ele = document.getElementById('tree-node-' + key)
      ele?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 500)
  }

  onMounted(() => {
    menuKey.value = route.query?.menuKey as string
    parentMenuKey.value = route.query?.parentMenuKey as string
    tab.value = (route.query?.tab as string) || ''
    getStdCatListMenu()
  })

  watch(
    () => route.query,
    (value) => {
      menuKey.value = value.menuKey as string
      parentMenuKey.value = value.parentMenuKey as string
      tab.value = (value.tab as string) || ''
      const tree = OperatingSiteCategoryResponseConverter.buildTreesFromStdOperatingArray(nodes.value, menuKey.value, parentMenuKey.value)
      nodes.value = tree
    },
    { deep: true }
  )
  watch(
    () => nodes.value,
    () => {
      scrollTo(menuKey.value)
      scrollTo(parentMenuKey.value)
    },
    { deep: true }
  )

  return {
    tab,
    handleActionMenuClick,
    nodes,
    handleSaveMenuData,
    handleMenuItemSelected,
    wfTreeMenu,
    handleChangeMenuData
  }
}
