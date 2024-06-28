import { removeEmptyObjectProperties } from '@/common'
import { useLoading, useModal, useModalConfirm, useModalNotification } from '@/composables'
import { ProductStandardCategoryListItemModel } from '@/models/views/products/category/ProductCategoryModel'
import { productCategoryApi } from '@/services/api/products/category/ProductCategoryApi'
import CategoriesStandardMappingExhibitionPopup from '@/views/categories/standard/CategoriesStandardMappingExhibitionPopup.vue'
import { TreeNode } from 'primevue/tree'
import { Ref, ref } from 'vue'
import { useRoute } from 'vue-router'

interface CategoriesStandardMappingExhibitionPopupProps {
  closeModal?: () => void
  exhibitionMapData?: ProductStandardCategoryListItemModel[]
  onSelect: (value: TreeNode) => void
  onDeleteCat: (list?: TreeNode, callback?: () => void) => void
  // tree: TreeNode[]
}

export const useCategoriesStandardMappingExhibitionPopup = (exhibitionMapData?: Ref<ProductStandardCategoryListItemModel[]>) => {
  const modal = useModal<CategoriesStandardMappingExhibitionPopupProps>()
  const selectedNode = ref()
  const { setLoading } = useLoading()
  const route = useRoute()
  const standardCatId = route.query.id as string

  const { openModal: openModalConfirm, closeModalByPop: closeModalConfirm } = useModalConfirm()
  const { openModal: openModalNotification } = useModalNotification()

  const openModal = () => {
    modal.showModal?.({
      component: CategoriesStandardMappingExhibitionPopup,
      props: {
        onSelect: (value: TreeNode) => onSelect(value),
        onDeleteCat: (list?: TreeNode, callback?: () => void) => onDeleteCat(list, callback),
        closeModal: modal.closeModalByPop,
        exhibitionMapData: exhibitionMapData?.value
      }
    })
  }

  const onSelect = async (value: TreeNode) => {
    openModalConfirm({
      content: '저장 하시겠습니까?',
      onConfirm: async () => {
        try {
          const oldDspId = exhibitionMapData?.value?.map((it) => it.displayCategoryId)
          const newDspId = value?.map((it: ProductStandardCategoryListItemModel) => it.displayCategoryId)

          const listDelete = exhibitionMapData?.value?.filter((it: ProductStandardCategoryListItemModel) => !newDspId?.includes(it.displayCategoryId))

          const listAdd = value?.filter((it: ProductStandardCategoryListItemModel) => !oldDspId?.includes(it.displayCategoryId))
          setLoading?.(true)
          // deleteOldData
          if (listDelete && listDelete?.length > 0) {
            const preparedData = {
              boStdDspCatetoryDeleteList: listDelete?.map((it: ProductStandardCategoryListItemModel) => it.standardDisplayCategoryKey)
            }
            try {
              await productCategoryApi.deleteStdCategoryDetailPopup(preparedData)
            } catch (error) {
              // console.log(error)
            }
          }
          // add new data
          if (listAdd && listAdd?.length > 0) {
            const preparedData = {
              boStdDspCatetoryInsertList: listAdd.map((it: ProductStandardCategoryListItemModel) => {
                const item = {
                  standardDisplayCategoryKey: it.standardDisplayCategoryKey,
                  standardCategoryId: standardCatId,
                  displayCategoryId: it.displayCategoryId,
                  representativeDisplayCategoryYn: it.representativeDisplayCategoryYn
                }
                return removeEmptyObjectProperties(item)
              })
            }
            await productCategoryApi.editStdCategoryDetailPopup(preparedData)
          }
          selectedNode.value = value
        } catch (error) {
          // empty
        } finally {
          setLoading?.(false)
          closeModalConfirm?.()
          modal.closeModalByPop?.()
        }
      }
    })
  }
  const onDeleteCat = async (list?: TreeNode, callback?: () => void) => {
    if (!list?.value?.length) {
      openModalNotification({
        content: '선택된 전시 카테고리가 없습니다. '
      })
    } else {
      openModalConfirm({
        content: '선택한 전시 카테고리를 삭제 하시겠습니까?',
        onConfirm: async () => {
          callback?.()
          modal.closeModalByPop?.()
        }
      })
    }
  }

  return { ...modal, openModal, selectedNode }
}
