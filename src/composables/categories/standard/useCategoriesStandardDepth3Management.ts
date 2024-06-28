import { isAllPropertyObjectEmpty } from '@/common'
import { useLoading } from '@/composables/common/useLoading'
import { useModalConfirm, useModalNotification } from '@/composables/widgets'
import { ProductStandardCategoryListItemModel } from '@/models'
import { ProductStandardCategoryDetailRequest } from '@/models/services/requests/products/category/ProductCategoryRequest'
import { CategoriesDeep, CategoriesStandardManagementEmits } from '@/models/views/categories/CategoriesDepthManagementModel'
import { ProductStandardCategoryDetailModel } from '@/models/views/products/category/ProductCategoryModel'
import { productTicketApi } from '@/services/api/products/ProductTicketApi'
import { productCategoryApi } from '@/services/api/products/category/ProductCategoryApi'
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { DEFAULT_MENU_DEPTH, DEFAULT_MENU_ORDER, getCategoryStandardManagementRoute } from './../common'
import { useCategoriesStandardMappingExhibitionPopup } from './../useCategoriesStandardMappingExhibitionPopup'
export const useCategoriesStandardDepth3Management = (emits: CategoriesStandardManagementEmits) => {
  const { setLoading } = useLoading()
  const { openModal: openModalConfirm, closeModalByPop: closeModalConfirm } = useModalConfirm()
  const { openModal: openModalNotification, closeModalByPop: closeModalNotification } = useModalNotification()

  const route = useRoute()
  const router = useRouter()
  const exhibitionMapData = ref<ProductStandardCategoryListItemModel[]>([])
  const categoryName = ref<string>('')
  const detailStdCat = ref<ProductStandardCategoryDetailModel>()

  const getStdCatList = async () => {
    try {
      setLoading?.(true)
      if (route.query?.id) {
        const { data } = await productTicketApi.getStandardCategoryList({ standardCategoryId: route.query.id as string })
        const { data: detailsStdCat } = await productCategoryApi.getStdCategoryDetail({ standardCategoryId: route.query.id as string })
        exhibitionMapData.value = data
        detailStdCat.value = detailsStdCat
        categoryName.value = detailsStdCat?.standardCategoryName
      }
    } catch (error) {
      // empty
    } finally {
      setLoading?.(false)
    }
  }
  const { openModal: openMappingExhibitionModal, selectedNode } = useCategoriesStandardMappingExhibitionPopup(exhibitionMapData)
  const handleChangeCategoryName = (value: string) => {
    categoryName.value = value
  }

  const handleAddStdCat = async () => {
    if (!categoryName.value) {
      openModalNotification({
        content: '( <span class="wf_text-sub-01">*</span> ) 표시는 필수입력항목입니다.'
      })
      return
    }
    try {
      const query = route.query
      let preparedData: ProductStandardCategoryDetailRequest
      setLoading?.(true)
      if (route.query.id) {
        preparedData = {
          standardCategoryId: detailStdCat.value?.standardCategoryId,
          standardCategoryName: categoryName.value,
          upperStandardCategoryId: detailStdCat.value?.upperStandardCategoryId,
          chargeMdKey: detailStdCat.value?.chargeMdKey,
          standardCategoryDepth: detailStdCat.value?.standardCategoryDepth,
          standardCategoryDisplayOrder: detailStdCat.value?.standardCategoryDisplayOrder
        }
      } else {
        preparedData = {
          standardCategoryId: detailStdCat.value?.standardCategoryId,
          standardCategoryName: categoryName.value,
          chargeMdKey: detailStdCat.value?.chargeMdKey,
          upperStandardCategoryId: query.upperStandardCategoryId as string,
          standardCategoryDepth: query.standardCategoryDepth ? parseInt(query.standardCategoryDepth as string) : DEFAULT_MENU_DEPTH,
          standardCategoryDisplayOrder: query.standardCategoryDisplayOrder
            ? parseInt(query.standardCategoryDisplayOrder as string)
            : DEFAULT_MENU_ORDER
        }
      }
      const { data } = await productCategoryApi.putStdCategory(preparedData)

      emits('on-save-category', 'save')

      let hasReturnCategoryID: string = ''

      if (data?.standardCategoryId) hasReturnCategoryID = data?.standardCategoryId
      openModalNotification({
        content: '저장 되었습니다.',
        onAccept: async () => {
          if (hasReturnCategoryID) {
            const redirectRoute = getCategoryStandardManagementRoute(CategoriesDeep.THREE.toString(), hasReturnCategoryID)
            await getStdCatList()
            router.push(redirectRoute)
          } else {
            await getStdCatList()
          }
          closeModalNotification?.()
        }
      })
    } catch (error) {
      // empty
    } finally {
      setLoading?.(false)
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
      await getStdCatList()
      setLoading?.(false)
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
      shouldDelete = !isAllPropertyObjectEmpty(exhibitionMapData.value)
    }

    if (shouldDelete) {
      openModalNotification({
        content: '전시 카테고리 맵핑 정보가 존재합니다. 해제 후 삭제 해주세요.'
      })
    } else {
      const message = '카테고리를 삭제 하시겠습니까?'
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

  const handleDeleteCat = async () => {
    try {
      setLoading?.(true)
      await confirmAndDeleteCategory()
    } catch (error) {
      // empty
    } finally {
      await getStdCatList()
      setLoading?.(false)
    }
  }

  const resetFieldsValue = () => {
    categoryName.value = ''
    exhibitionMapData.value = []
    detailStdCat.value = undefined
  }

  watch(selectedNode, (value) => {
    exhibitionMapData.value = value.value
    getStdCatList()
  })

  onMounted(() => {
    const id = route.query?.id as string
    const depth = route.query?.depth as string
    if (!route?.query?.id) return
    if (Number(depth) !== CategoriesDeep.THREE) return
    if (!id) {
      resetFieldsValue()
    }
    getStdCatList()
  })

  watch(
    () => route?.query?.id,
    (newRoute) => {
      const depth = route.query?.depth as string
      if (Number(depth) !== CategoriesDeep.THREE) return
      if (!newRoute) {
        resetFieldsValue()
      }
      getStdCatList()
    },
    { deep: true }
  )

  return {
    exhibitionMapData,
    handleAddStdCat,
    detailStdCat,
    handleDeleteCat,
    handleChangeCategoryName,
    openMappingExhibitionModal,
    resetFieldsValue,
    categoryName
  }
}
