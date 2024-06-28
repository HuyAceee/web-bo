import { DATA_TABLE_NUMBER_ITEMS_PAGE_50, PRODUCT_TICKET_PRODUCT_EDIT, ROW_SIZE_QUERY_PARAMS_MAX, onpenWindowWithQueryString } from '@/common'
import { useDeliverySellerInfoModal } from '@/composables/delivery/modal/useDeliverySellerInfoModal'
import { useProductSearchProductModal } from '@/composables/products/modal/modalSearch/useProductSearchProductModal'
import { useCheckBoxTable, useDataTablePagination, useModalConfirm, useModalNotification } from '@/composables/widgets'
import { defaultPageState } from '@/models'
import { DataTablePaginationResponseModel } from '@/models/services/responses/BaseModelResponse'
import { CategoriesStandardManagementEmits } from '@/models/views/categories/CategoriesDepthManagementModel'
import {
  CategoriesExhibitionStatusModel,
  CategoryExhibitionDspCategoryProductListModel,
  categoriesExhibitionDepth3ProductModelHeaderConfig
} from '@/models/views/categories/exhibition/CategoriesExhibitionDepth3ManagementModel'
import {
  CategoriesExhibitionDspCategoryDetailModel,
  CategoriesExhibitionLowDspCategoryListModel
} from '@/models/views/categories/exhibition/CategoriesExhibitionInDepth1CategoryModel'
import { ProductBeforeDiscountPromotionListModel } from '@/models/views/products/modal/ProductSearchProductModalModel'
import { productCategoryApi } from '@/services/api/products/category/ProductCategoryApi'
import { PageState } from 'primevue/paginator'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

interface CategoryExhibitionDepth3ManagementParamsModel {
  displayCategoryId?: string
  upperDisplayCategoryId?: string
  displayCategoryExposureOrder?: string
}

export const useCategoriesExhibitionDepth3ManagementTable = (emits: CategoriesStandardManagementEmits) => {
  const refTable = ref()
  const page = ref<PageState>(defaultPageState)
  const items = ref<CategoryExhibitionDspCategoryProductListModel[]>([])
  const lowDspCategoryList = ref<CategoriesExhibitionLowDspCategoryListModel[]>([])
  const categoryDetail = ref<CategoriesExhibitionDspCategoryDetailModel>({} as CategoriesExhibitionDspCategoryDetailModel)
  const route = useRoute()
  const { displayCategoryId = '' } = route.query as CategoryExhibitionDepth3ManagementParamsModel
  const displayCategoryIdRef = ref<string>(displayCategoryId ?? '')
  const { handleOpenModal } = useDeliverySellerInfoModal()
  const { openModal: openModalConfirm, closeModalByPop } = useModalConfirm()
  const { openModal: openNotification } = useModalNotification()
  const { openModal: openModalSearchProduct } = useProductSearchProductModal()

  const callbackAddProduct = (products: CategoryExhibitionDspCategoryProductListModel[]) => {
    const dataMapping: CategoryExhibitionDspCategoryProductListModel[] = products.map((product) => ({
      ...product,
      isSelected: false,
      isNew: true,
      id: product?.productKey.toString()
    }))
    items.value = [...dataMapping, ...items.value]
    handleFetchData()
  }

  const handleOpenModalAddProduct = () => {
    openModalSearchProduct(callbackAddProduct, items.value as unknown as ProductBeforeDiscountPromotionListModel[], true)
  }

  const getCategoryProductList = async (pageNum: number, displayCategoryId: string) => {
    try {
      const { data } = await productCategoryApi.getDspCategoryProductList({
        displayCategoryId,
        pageNum: pageNum + 1,
        rowSize: ROW_SIZE_QUERY_PARAMS_MAX
      })
      const dataMapping = data.map((item) => ({
        ...item,
        id: item.productKey?.toString()
      }))
      items.value = dataMapping
      handleFetchData()
    } catch (error) {
      /* empty */
    }
  }

  const handleFetchData = () => {
    fetchData({
      numberOfItems: page.value.rows,
      page: page.value.page
    })
  }

  const listId = computed(() => {
    return items.value?.map((item) => item?.productKey?.toString()) ?? []
  })

  const { listChecked, onRowSelected, onSelectAllChange, clearChecked } = useCheckBoxTable(listId)

  const handleGetData = (displayCategoryId: string) => {
    getCategoryProductList(page.value.page, displayCategoryId)
    // getLowDspCategoryList(displayCategoryId)
    // getDspCategoryDetail(displayCategoryId)
    // getDspCategoryExceptCompany(displayCategoryId)
  }

  onMounted(async () => {
    page.value = {
      ...page.value,
      rows: DATA_TABLE_NUMBER_ITEMS_PAGE_50
    }
    if (displayCategoryId) {
      handleGetData(displayCategoryId)
    }
  })

  watch(
    () => route?.query?.displayCategoryId,
    (newValue) => {
      displayCategoryIdRef.value = newValue as string
      const displayCategoryId = newValue as string
      // getDspCatList()
      emits('on-save-category', displayCategoryId)
      if (displayCategoryId) {
        handleGetData(displayCategoryIdRef.value)
      } else {
        items.value = []
        lowDspCategoryList.value = []
        categoryDetail.value = {} as CategoriesExhibitionDspCategoryDetailModel
      }
    },
    { deep: true }
  )

  const onPageChange = (pageState: PageState) => {
    page.value = pageState
    handleFetchData()
  }

  const onClickProductKey = (value?: CategoryExhibitionDspCategoryProductListModel) => {
    onpenWindowWithQueryString(PRODUCT_TICKET_PRODUCT_EDIT, {
      code: value?.productCode ?? '',
      classification: value?.productClassificationCode ?? ''
    })
  }

  const onClickSellerKey = (value?: CategoryExhibitionDspCategoryProductListModel) => {
    handleOpenModal?.(Number(value?.sellerKey))
  }

  const onDeleteRecords = async () => {
    try {
      if (!listChecked.value.length) return
      const itemsChecked = items.value.filter((item) => listChecked.value.includes(item.productKey.toString()))
      const isNewAll = !itemsChecked.find((item) => !item?.isNew)
      const isDisplay = itemsChecked.find((item) => item.representativeDisplayCategoryYn === CategoriesExhibitionStatusModel.DISPLAY)
      if (isNewAll) {
        items.value = items.value.filter((item) => !listChecked.value.includes(item.productKey.toString()))
        clearChecked()
        handleFetchData()
        return
      }
      if (!isDisplay) {
        openModalConfirm({
          content: '선택한 항목 삭제 시 전시상품 목록에서 삭제되고 카테고리에서 상품이 비전시됩니다. 계속 하시겠습니까?',
          onConfirm: async () => {
            try {
              closeModalByPop?.()
              const newItemsChecked = itemsChecked.filter((item) => item?.isNew)
              const newIds = newItemsChecked.map((item) => item?.id)
              items.value = items.value.filter((item) => !newIds.includes(item.productKey.toString()))
              const oldItemsChecked = itemsChecked.filter((item) => !item?.isNew)
              const boDspCategoryItemDeleteList = oldItemsChecked.map((item) => ({
                displayCategoryProductKey: item.displayCategoryProductKey
              }))
              await productCategoryApi.deleteCategoryProduct({
                boDspCategoryItemDeleteList
              })
              items.value = items.value.filter((item) => !listChecked.value.includes(item.productKey.toString()))
              clearChecked()
              refTable.value.clearCheckAll()
              handleFetchData()
            } catch (error) {
              /* empty */
            }
          }
        })
        return
      }
      openNotification({
        content: '선택한 항목 중 대표 전시 카테고리로 설정한 상품이 존재합니다.'
      })
    } catch (error) {
      /* empty */
    }
  }

  const onDeleteRecord = async (value: CategoryExhibitionDspCategoryProductListModel) => {
    try {
      if (value?.isNew) {
        items.value = items.value.filter((item) => item.productCode !== value.productCode)
        handleFetchData()
        return
      }
      if (value.representativeDisplayCategoryYn !== CategoriesExhibitionStatusModel.DISPLAY) {
        openModalConfirm({
          content: '선택한 상품 삭제 시 전시상품 목록에서 삭제되고 카테고리에서 상품이 비전시됩니다. 계속 하시겠습니까?',
          onConfirm: async () => {
            closeModalByPop?.()
            const boDspCategoryItemDeleteList = [
              {
                displayCategoryProductKey: value.displayCategoryProductKey
              }
            ]
            await productCategoryApi.deleteCategoryProduct({
              boDspCategoryItemDeleteList
            })
            items.value = items.value.filter((item) => item.productCode !== value.productCode)
            handleFetchData()
          }
        })
        return
      }
      openNotification({
        content: '선택한 상품이 대표 전시 카테고리로 저장되어 있어 삭제할 수 없습니다.'
      })
    } catch (error) {
      /* empty */
    }
  }

  const tableConfigs = computed(() => {
    return categoriesExhibitionDepth3ProductModelHeaderConfig({ onClickProductKey, onClickSellerKey })
  })

  const handleUpdateCategoryProduct = async (newItems: CategoryExhibitionDspCategoryProductListModel[]) => {
    try {
      const dataMapping = newItems.map((item) => ({
        modifiedBy: '',
        displayCategoryProductKey: item.displayCategoryProductKey,
        displayCategoryId: displayCategoryIdRef.value,
        productKey: item.productKey,
        representativeDisplayCategoryYn: item.representativeDisplayCategoryYn
      }))
      await productCategoryApi.updateCategoryProduct({
        boDspCategoryItemInsertList: dataMapping
      })
      getCategoryProductList(page.value.page, displayCategoryId)
      openNotification({
        content: '선택한 항목이 저장되었습니다.'
      })
    } catch (error) {
      /* empty */
    }
  }

  const onSaveProductCategory = async () => {
    const newItems = items.value.filter((item) => item?.isNew)
    if (!newItems.length) {
      openNotification({
        content: '전시상품 목록에 추가된 상품이 없습니다. 상품 추가 후 저장 해주세요.'
      })
      return
    }
    openModalConfirm({
      content: '선택한 항목을 해당 카테고리에 저장하시겠습니까? ',
      onConfirm: () => {
        closeModalByPop?.()
        handleUpdateCategoryProduct(newItems)
      }
    })
  }

  const getData = async (page: number, size: number) => {
    return {
      totalItems: items.value.length,
      data: items.value.slice(page * size, (page + 1) * size)
    } as DataTablePaginationResponseModel<CategoryExhibitionDspCategoryProductListModel>
  }

  const {
    items: pageItems,
    isLoading: isLoading,
    fetchDataWith: fetchData
  } = useDataTablePagination<CategoryExhibitionDspCategoryProductListModel>(getData)

  return {
    items,
    onPageChange,
    onRowSelected,
    onSelectAllChange,
    tableConfigs,
    refTable,
    handleOpenModalAddProduct,
    onSaveProductCategory,
    onDeleteRecord,
    onDeleteRecords,
    pageItems,
    isLoading,
    onClickSellerKey
  }
}
