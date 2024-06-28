import { CATEGORY_EXHIBITION_DEPTH, getArrayDifferentItemsByProperty, getFirstNumberFromString } from '@/common'
import CategoriesTreeMenu from '@/components/categories/common/CategoriesTreeMenuNode.vue'
import { useModalConfirm, useModalNotification } from '@/composables/widgets'
import { ProductStandardCategoryListItemModel } from '@/models'
import {
  ProductDspCategoryExceptCompanyRequest,
  ProductDspCategoryManageSeqRequest
} from '@/models/services/requests/products/category/ProductCategoryRequest'
import { ProductCategoryListResponseConverter, ProductTreeMenuConverter } from '@/models/services/responses/products/category/ProductCategoryResponse'
import { CategoriesDeep } from '@/models/views/categories/CategoriesDepthManagementModel'
import {
  CategoriesExhibitionDspCategoryDepthTypeModel,
  CategoriesExhibitionDspCategoryListModel
} from '@/models/views/categories/exhibition/CategoriesExhibitionInDepth1CategoryModel'
import { productCategoryApi } from '@/services/api/products/category/ProductCategoryApi'
import { TreeNode } from 'primevue/tree'
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
export const useCategoriesExhibitionInDepthManagement = () => {
  const nodes = ref<TreeNode[]>([])
  const router = useRouter()
  const route = useRoute()
  let oldTreeArray: ProductStandardCategoryListItemModel[] = []
  const { openModal: openNotificationModal, closeModalByPop } = useModalNotification()
  const { openModal: openConfirmModal } = useModalConfirm()
  const wfTreeMenu = ref<InstanceType<typeof CategoriesTreeMenu> | null>(null)
  const depth = ref<string>()
  const getDspCatList = async () => {
    try {
      const { data } = await productCategoryApi.getDspCategoryList()
      const dataCovert: ProductStandardCategoryListItemModel[] = data.map((it: CategoriesExhibitionDspCategoryListModel) => {
        return {
          standardCategoryId: it.displayCategoryId,
          upperStandardCategoryId: it.upperDisplayCategoryId,
          standardCategoryName: it.displayCategoryName,
          standardCategoryDepth: it.displayCategoryDepth,
          productCount: it.productCount,
          standardCategoryPathName: it.displayCategoryPathName,
          standardCategoryPathId: it.displayCategoryPathId,
          standardCategoryDisplayOrder: it.displayCategoryExposureOrder
        }
      })
      const tree = ProductCategoryListResponseConverter.buildTreesFromStdCategoriesArray(dataCovert)
      nodes.value = tree
      oldTreeArray = dataCovert
    } catch (error) {
      // empty
    }
  }

  const handleChangeMenuData = () => {
    getDspCatList()
  }

  const handleSaveMenuData = (value: TreeNode[]) => {
    const newArr: Omit<TreeNode, 'children'>[] = ProductTreeMenuConverter.flatTreeToOriginalArray<TreeNode>(value)
    const diff: Omit<TreeNode, 'children'>[] = getArrayDifferentItemsByProperty<Omit<TreeNode, 'children'>>(
      oldTreeArray,
      newArr,
      'standardCategoryId',
      'standardCategoryDisplayOrder'
    )
    const newData = diff.map((it) => {
      return {
        displayCategoryId: it.standardCategoryId,
        displayCategoryDepth: it.standardCategoryDepth,
        displayCategoryExposureOrder: it.standardCategoryDisplayOrder
      }
    })

    if (!newData.length) {
      openNotificationModal({
        content: '순서가 변경된 카테고리가 없습니다.'
      })
    } else {
      const request: ProductDspCategoryManageSeqRequest = {
        boDspCategoryExpsrSeqList: newData
      }

      productCategoryApi
        .updateDspCategoryManageSeq(request)
        .then(async (res) => {
          if (res.data.sucessMessage) {
            openNotificationModal({
              content: '변경한 순서가 저장 되었습니다.',
              onAccept: async () => {
                try {
                  await getDspCatList()
                  closeModalByPop?.()
                } catch (error) {
                  // empty
                }
              }
            })
          } else if (res.data.errMessage) {
            openNotificationModal({
              content: res.data.errMessage
            })
          }
        })
        .catch(() => {
          // show error
        })
    }
  }

  const handleMenuItemSelected = (value: TreeNode) => {
    const displayCategoryDepth = value.standardCategoryDepth
    const displayCategoryId = value.standardCategoryId
    const upperDisplayCategoryId = value.upperStandardCategoryId
    const displayCategoryExposureOrder = value.standardCategoryDisplayOrder
    if (displayCategoryDepth === CategoriesExhibitionDspCategoryDepthTypeModel.DSP_CATE_DEPTH_1) {
      if (displayCategoryId) {
        router.push({ path: `${CATEGORY_EXHIBITION_DEPTH}`, query: { depth: CategoriesDeep.ONE, displayCategoryId } })
      } else {
        router.push({ path: `${CATEGORY_EXHIBITION_DEPTH}`, query: { depth: CategoriesDeep.ONE, displayCategoryExposureOrder } })
      }
    } else if (displayCategoryDepth === CategoriesExhibitionDspCategoryDepthTypeModel.DSP_CATE_DEPTH_2) {
      if (displayCategoryId) {
        router.push({ path: `${CATEGORY_EXHIBITION_DEPTH}`, query: { depth: CategoriesDeep.TWO, displayCategoryId, upperDisplayCategoryId } })
      } else {
        router.push({
          path: `${CATEGORY_EXHIBITION_DEPTH}`,
          query: { depth: CategoriesDeep.TWO, upperDisplayCategoryId, displayCategoryExposureOrder }
        })
      }
    } else if (displayCategoryDepth === CategoriesExhibitionDspCategoryDepthTypeModel.DSP_CATE_DEPTH_3) {
      if (displayCategoryId) {
        router.push({
          path: `${CATEGORY_EXHIBITION_DEPTH}`,
          query: { depth: CategoriesDeep.THREE, displayCategoryId, upperDisplayCategoryId, displayCategoryExposureOrder }
        })
      } else {
        router.push({
          path: `${CATEGORY_EXHIBITION_DEPTH}`,
          query: { depth: CategoriesDeep.THREE, upperDisplayCategoryId, displayCategoryExposureOrder }
        })
      }
    }
  }

  const removeDspCategoryDelete = (displayCategoryId?: string) => {
    const request: ProductDspCategoryExceptCompanyRequest = { displayCategoryId: displayCategoryId ?? '' }
    productCategoryApi
      .removeDspCategoryDelete(request)
      .then(async (res) => {
        if (res.data.sucessMessage) {
          openNotificationModal({
            content: res.data.sucessMessage
          })
          try {
            await getDspCatList()
          } catch (error) {
            // show error
          }
        } else if (res.data.errMessage) {
          openNotificationModal({
            content: res.data.errMessage
          })
        }
      })
      .catch(() => {
        // empty
      })
  }

  const confirmAndDeleteCategory = async (id?: string) => {
    if (id) {
      const depth = id ? getFirstNumberFromString(id) : undefined
      const message =
        depth === CategoriesDeep.THREE ? '카테고리를 삭제 하시겠습니까?' : '카테고리 삭제 시 하위 카테고리도 모두 삭제됩니다. 삭제 하시겠습니까?'
      openConfirmModal({
        content: message,
        onConfirm: async () => {
          closeModalByPop?.()
          try {
            removeDspCategoryDelete(id)
          } catch (error) {
            //empty
          }
        }
      })
    } else {
      //
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

  const handleMenuItemUnSelected = (value: TreeNode) => {
    console.log(value)
  }

  onMounted(() => {
    depth.value = route.query?.depth as string
    getDspCatList()
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
    handleMenuItemSelected,
    handleSaveMenuData,
    handleMenuItemUnSelected,
    getDspCatList,
    handleDeleteCatMenu,
    wfTreeMenu,
    depth,
    handleChangeMenuData
  }
}
