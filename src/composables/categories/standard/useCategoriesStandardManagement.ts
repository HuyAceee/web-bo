import { getArrayDifferentItemsByProperty, getFirstNumberFromString } from '@/common'
import CategoriesTreeMenu from '@/components/categories/common/CategoriesTreeMenuNode.vue'
import { useLoading } from '@/composables/common/useLoading'
import { useModalConfirm, useModalNotification } from '@/composables/widgets'
import { ProductStandardCategoryListItemModel } from '@/models'
import { ProductStdCategorySeqDspRequest } from '@/models/services/requests/products/category/ProductCategoryRequest'
import { ProductCategoryListResponseConverter, ProductTreeMenuConverter } from '@/models/services/responses/products/category/ProductCategoryResponse'
import { CategoriesDeep } from '@/models/views/categories/CategoriesDepthManagementModel'
import { ProductStandardCategoryDetailModel } from '@/models/views/products/category/ProductCategoryModel'
import { productTicketApi } from '@/services/api/products/ProductTicketApi'
import { productCategoryApi } from '@/services/api/products/category/ProductCategoryApi'
import { TreeNode } from 'primevue/tree'
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getCategoryStandardManagementRoute, useMenuItemSelected } from './../common'
export const useCategoriesStandardManagement = () => {
  const nodes = ref<TreeNode[]>([])
  const { setLoading } = useLoading()
  const { openModal: openModalConfirm, closeModalByPop: closeModalConfirm } = useModalConfirm()
  const { openModal: openModalNotification } = useModalNotification()
  const wfTreeMenu = ref<InstanceType<typeof CategoriesTreeMenu> | null>(null)
  const router = useRouter()
  const route = useRoute()
  const detailStdCat = ref<ProductStandardCategoryDetailModel>()
  let oldTreeArray: ProductStandardCategoryListItemModel[] = []

  const { handleMenuItemSelected } = useMenuItemSelected()

  const depth = ref<string>()
  const getStdCatListMenu = async () => {
    try {
      setLoading?.(true)
      const { data } = await productCategoryApi.getCategoryList()
      const tree = ProductCategoryListResponseConverter.buildTreesFromStdCategoriesArray(data)
      nodes.value = tree
      oldTreeArray = data
    } catch (error) {
      // empty
    } finally {
      setLoading?.(false)
    }
  }
  const handleSaveMenuData = async (value: TreeNode[]) => {
    const newArr: Omit<TreeNode, 'children'>[] = ProductTreeMenuConverter.flatTreeToOriginalArray<TreeNode>(value)

    const diff: Omit<TreeNode, 'children'>[] = getArrayDifferentItemsByProperty<Omit<TreeNode, 'children'>>(
      oldTreeArray,
      newArr,
      'standardCategoryId',
      'standardCategoryDisplayOrder'
    )

    const newData = diff.map((it) => {
      return {
        standardCategoryId: it.standardCategoryId,
        standardCategoryDepth: it.standardCategoryDepth,
        standardCategoryDisplayOrder: it.standardCategoryDisplayOrder
      }
    })
    if (!newData.length) {
      openModalNotification({
        content: '순서가 변경된 카테고리가 없습니다.'
      })
      return
    }

    const preparedData: ProductStdCategorySeqDspRequest = {
      boStdCategoryDspSeqList: newData
    }

    try {
      await productCategoryApi.editStdCategorySeqDsp(preparedData)
      openModalNotification({
        content: '변경한 순서가 저장 되었습니다.',
        onAccept: async () => {
          try {
            await getStdCatListMenu()
            closeModalConfirm?.()
          } catch (error) {
            // empty
          }
        }
      })
    } catch (error) {
      // empty
    }
  }

  const handleCallApiDeleteCat = async (id?: string) => {
    try {
      setLoading?.(true)
      if (id) {
        await productCategoryApi.deleteStdCategoryDetail({ standardCategoryId: id })
      } else {
        await productCategoryApi.deleteStdCategoryDetail({ standardCategoryId: detailStdCat.value?.standardCategoryId })
      }
    } catch (error) {
      //
    } finally {
      await getStdCatListMenu()
      setLoading?.(false)
      const redirectRoute = getCategoryStandardManagementRoute(CategoriesDeep.ONE.toString())
      router.push(redirectRoute)
    }
  }

  const hasMappingInfo = async (categoryId: string) => {
    try {
      const { data } = await productTicketApi.getStandardCategoryList({ standardCategoryId: categoryId })
      return data.length > 0
    } catch (error) {
      // empty
    }
  }

  const confirmAndDeleteCategory = async (id?: string) => {
    let shouldDelete

    if (id) {
      try {
        shouldDelete = await hasMappingInfo(id)
      } catch (error) {
        return
      }
    } else {
      // shouldDelete = !isAllPropertyObjectEmpty(exhibitionMapData.value)
    }

    if (shouldDelete) {
      openModalNotification({
        content: '전시 카테고리 맵핑 정보가 존재합니다. 해제 후 삭제 해주세요.'
      })
    } else {
      const depth = id ? getFirstNumberFromString(id) : undefined
      const message =
        depth === CategoriesDeep.THREE ? '카테고리를 삭제 하시겠습니까?' : '카테고리 삭제 시 하위 카테고리도 모두 삭제됩니다. 삭제 하시겠습니까?'
      openModalConfirm({
        content: message,
        onConfirm: async () => {
          closeModalConfirm?.()
          try {
            await handleCallApiDeleteCat(id)
          } catch (error) {
            //empty
          }
        }
      })
    }
  }

  const handleDeleteCatMenu = async (node: TreeNode) => {
    try {
      const categoryId = node.value.node?.standardCategoryId
      await confirmAndDeleteCategory(categoryId)
    } catch (error) {
      // empty
    }
  }

  const handleChangeMenuData = () => {
    getStdCatListMenu()
  }

  onMounted(() => {
    depth.value = route.query?.depth as string
    getStdCatListMenu()
  })

  watch(
    () => route,
    (newRoute) => {
      depth.value = newRoute.query?.depth as string
    },
    { deep: true }
  )

  return {
    nodes,
    handleSaveMenuData,
    handleMenuItemSelected,
    handleDeleteCatMenu,
    wfTreeMenu,
    depth,
    handleChangeMenuData
  }
}
