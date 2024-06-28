import { getFirstNumberFromString } from '@/common'
import { useLoading } from '@/composables/common/useLoading'
import { useModalConfirm, useModalNotification } from '@/composables/widgets'
import { ProductStandardCategoryDetailRequest } from '@/models/services/requests/products/category/ProductCategoryRequest'
import { ProductStandardCategoryDetailModel, ProductStandardCategoryListItemModel } from '@/models/views'
import { CategoriesDeep, CategoriesStandardManagementEmits } from '@/models/views/categories/CategoriesDepthManagementModel'
import { productCategoryApi } from '@/services/api/products/category/ProductCategoryApi'
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getCategoryStandardManagementRoute } from '../common'
import { DEFAULT_MENU_DEPTH, DEFAULT_MENU_ORDER } from './../common'
export const useCategoriesStandardDepth2Management = (emits: CategoriesStandardManagementEmits) => {
  const route = useRoute()
  const categoryName = ref<string>('')
  const exhibitionMapData = ref<ProductStandardCategoryListItemModel[]>([])
  const dataStdDetail = ref<ProductStandardCategoryDetailModel>()
  const router = useRouter()

  const { setLoading } = useLoading()
  const { openModal: openModalConfirm, closeModalByPop: closeModalConfirm } = useModalConfirm()
  const { openModal: openModalNotification, closeModalByPop } = useModalNotification()
  const getStdCatList = async () => {
    try {
      setLoading?.(true)
      if (route.query?.id) {
        const { data } = await productCategoryApi.getLowCategoryList({ standardCategoryId: route.query?.id as string })
        const { data: detailsStdCat } = await productCategoryApi.getStdCategoryDetail({ standardCategoryId: route.query?.id as string })
        exhibitionMapData.value = data
        dataStdDetail.value = detailsStdCat
        categoryName.value = detailsStdCat?.standardCategoryName
      }
    } catch (error) {
      // empty
    } finally {
      setLoading?.(false)
    }
  }
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
      setLoading?.(true)
      const query = route.query
      let preparedData: ProductStandardCategoryDetailRequest
      if (route.query.id) {
        preparedData = {
          standardCategoryId: dataStdDetail.value?.standardCategoryId,
          standardCategoryName: categoryName.value,
          upperStandardCategoryId: dataStdDetail.value?.upperStandardCategoryId,
          chargeMdKey: dataStdDetail.value?.chargeMdKey,
          standardCategoryDepth: dataStdDetail.value?.standardCategoryDepth,
          standardCategoryDisplayOrder: dataStdDetail.value?.standardCategoryDisplayOrder
        }
      } else {
        preparedData = {
          standardCategoryId: dataStdDetail.value?.standardCategoryId,
          standardCategoryName: categoryName.value,
          chargeMdKey: dataStdDetail.value?.chargeMdKey ?? 0,
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
            const redirectRoute = getCategoryStandardManagementRoute(CategoriesDeep.TWO.toString(), hasReturnCategoryID)
            await getStdCatList()
            router.push(redirectRoute)
          } else {
            await getStdCatList()
          }
          closeModalByPop?.()
        }
      })
    } catch (error) {
      // empty
    } finally {
      setLoading?.(false)
    }
  }
  const handleDeleteCat = () => {
    const cateID = route.query?.id as string
    if (cateID) removeDspCategoryDeleteConfirm(cateID)
  }
  const removeDspCategoryDeleteConfirm = (id: string) => {
    const depth = id ? getFirstNumberFromString(id) : undefined
    const message =
      depth === CategoriesDeep.THREE ? '카테고리를 삭제 하시겠습니까?' : '카테고리 삭제 시 하위 카테고리도 모두 삭제됩니다. 삭제 하시겠습니까?'
    openModalConfirm({
      content: message,
      onConfirm: () => {
        if (id) removeDspCategoryDelete(id)
        closeModalConfirm?.()
      }
    })
  }
  const removeDspCategoryDelete = async (id: string) => {
    try {
      setLoading?.(true)
      await productCategoryApi.deleteStdCategoryDetail({ standardCategoryId: id })
    } catch (error) {
      //
    } finally {
      await getStdCatList()
      setLoading?.(false)
    }
  }

  const resetFieldsValue = () => {
    categoryName.value = ''
    exhibitionMapData.value = []
  }

  watch(
    () => route?.query?.id,
    (newRoute) => {
      const depth = route.query?.depth as string
      if (Number(depth) !== CategoriesDeep.TWO) return
      if (!newRoute) {
        resetFieldsValue()
        getStdCatList()
      } else {
        getStdCatList()
      }
    },
    { deep: true }
  )

  onMounted(() => {
    const id = route.query?.id as string
    const depth = route.query?.depth as string
    if (!route?.query?.id) return
    if (Number(depth) !== CategoriesDeep.TWO) return
    if (id) {
      resetFieldsValue()
    }
    getStdCatList()
  })

  return {
    dataStdDetail,
    exhibitionMapData,
    handleChangeCategoryName,
    handleAddStdCat,
    handleDeleteCat,
    categoryName
  }
}
