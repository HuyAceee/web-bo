import { CATEGORY_EXHIBITION_DEPTH, DATA_TABLE_NUMBER_ITEMS_PAGE_50, getFirstNumberFromString } from '@/common'
import { useLoading } from '@/composables/common'
import { useModalConfirm, useModalNotification } from '@/composables/widgets'
import { YnOptions, defaultPageState } from '@/models'
import { CategoriesDeep } from '@/models/views/categories/CategoriesDepthManagementModel'
import {
  CategoriesExhibitionRegisterStatusModel,
  CategoriesExhibitionStatusModel,
  CategoryExhibitionDspCategoryDetailFormModel,
  CategoryExhibitionDspCategoryProductListModel,
  CategorySearchRecordModel
} from '@/models/views/categories/exhibition/CategoriesExhibitionDepth3ManagementModel'
import {
  CategoriesExhibitionDspCategoryDetailModel,
  CategoriesExhibitionLowDspCategoryListModel
} from '@/models/views/categories/exhibition/CategoriesExhibitionInDepth1CategoryModel'
import { productCategoryApi } from '@/services/api/products/category/ProductCategoryApi'
import { PageState } from 'primevue/paginator'
import { useForm } from 'vee-validate'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { CategoriesDspManagementEmits } from '@/models/views/categories/CategoriesDepthManagementModel'

interface CategoryExhibitionDepth3ManagementParamsModel {
  displayCategoryId?: string
  upperDisplayCategoryId?: string
  displayCategoryExposureOrder?: string
}

export const useCategoriesExhibitionDepth3Management = (emits: CategoriesDspManagementEmits) => {
  const searchCustomerRef = ref()
  const keywordCustomer = ref('')
  const page = ref<PageState>(defaultPageState)
  const items = ref<CategoryExhibitionDspCategoryProductListModel[]>([])
  const boDspCatExpsrExclEntInsertList = ref<(string | number)[]>([])
  const customerSelected = ref<number>(0)
  const lowDspCategoryList = ref<CategoriesExhibitionLowDspCategoryListModel[]>([])
  const categoryDetail = ref<CategoriesExhibitionDspCategoryDetailModel>({} as CategoriesExhibitionDspCategoryDetailModel)
  const route = useRoute()
  const router = useRouter()
  const {
    displayCategoryId = '',
    upperDisplayCategoryId = '',
    displayCategoryExposureOrder = ''
  } = route.query as CategoryExhibitionDepth3ManagementParamsModel
  const displayCategoryIdRef = ref<string>(displayCategoryId ?? '')
  const { setLoading } = useLoading()
  const { openModal: openModalConfirm, closeModalByPop } = useModalConfirm()
  const { openModal: openNotification, closeModalByPop: closeModalByPopNotification } = useModalNotification()

  const initialValuesForm: CategoryExhibitionDspCategoryDetailFormModel = {
    displayCategoryName: '',
    displayCategoryExposureYn: CategoriesExhibitionStatusModel.DISPLAY,
    boDspCatExpsrExclEntInsertList: [],
    displayExcludedCompanyYn: CategoriesExhibitionRegisterStatusModel.UN_REISTER
  }

  const getLowDspCategoryList = async (displayCategoryId: string) => {
    try {
      const { data } = await productCategoryApi.getLowDspCategoryList({ displayCategoryId })
      lowDspCategoryList.value = data
    } catch (error) {
      /* empty */
    }
  }

  const getDspCategoryDetail = async (displayCategoryId: string) => {
    try {
      const { data } = await productCategoryApi.getDspCategoryDetail({ displayCategoryId })
      categoryDetail.value = data
      const { displayCategoryName, displayCategoryExposureYn, displayExcludedCompanyYn } = data
      setFieldValue('displayCategoryName', displayCategoryName ?? '')
      setFieldValue('displayCategoryExposureYn', (displayCategoryExposureYn as CategoriesExhibitionStatusModel) ?? '')
      setFieldValue('displayExcludedCompanyYn', (displayExcludedCompanyYn as CategoriesExhibitionRegisterStatusModel) ?? '')
    } catch (error) {
      /* empty */
    }
  }

  const getDspCategoryExceptCompany = async (displayCategoryId: string) => {
    try {
      const { data } = await productCategoryApi.getDspCategoryExceptCompany({ displayCategoryId })
      const dataSelected = data?.map((item) => item.customerKey) ?? []
      boDspCatExpsrExclEntInsertList.value = dataSelected
      const dataMapping = data.map((item) => `(${item.customerKey}) ${item.customerName}`)
      setFieldValue('boDspCatExpsrExclEntInsertList', dataMapping ?? [])
    } catch (error) {
      /* empty */
    }
  }

  const { values, setFieldValue, resetForm } = useForm<CategoryExhibitionDspCategoryDetailFormModel>({
    initialValues: initialValuesForm
  })

  const handleGetData = (displayCategoryId: string) => {
    // getCategoryProductList(page.value.page, displayCategoryId)
    getLowDspCategoryList(displayCategoryId)
    getDspCategoryDetail(displayCategoryId)
    getDspCategoryExceptCompany(displayCategoryId)
  }

  onMounted(async () => {
    page.value = {
      ...page.value,
      rows: DATA_TABLE_NUMBER_ITEMS_PAGE_50
    }
    const id = route.query?.displayCategoryId as string
    const depth = id ? getFirstNumberFromString(id) : undefined
    if (!route?.query?.displayCategoryId) return
    if (depth !== CategoriesDeep.THREE) return

    if (displayCategoryId) {
      handleGetData(displayCategoryId)
    }
  })

  watch(
    () => route?.query?.displayCategoryId,
    (newValue) => {
      displayCategoryIdRef.value = newValue as string
      const id = newValue as string
      const depth = id ? getFirstNumberFromString(id) : undefined
      if (!route?.query?.displayCategoryId) return
      if (depth !== CategoriesDeep.THREE) return

      emits('on-save-category', id)
      if (id) {
        handleGetData(displayCategoryIdRef.value)
      } else {
        resetForm()
        items.value = []
        lowDspCategoryList.value = []
        categoryDetail.value = {} as CategoriesExhibitionDspCategoryDetailModel
      }
    }
  )

  const handleRemoveTagKeywordCustomer = (idx: number) => {
    const oldKeywords = [...(values.boDspCatExpsrExclEntInsertList ?? [])]
    oldKeywords.splice(idx, 1)
    const oldBoDspCatExpsrExclEntInsertList = [...boDspCatExpsrExclEntInsertList.value]
    oldBoDspCatExpsrExclEntInsertList.splice(idx, 1)
    boDspCatExpsrExclEntInsertList.value = oldBoDspCatExpsrExclEntInsertList
    setFieldValue('boDspCatExpsrExclEntInsertList', oldKeywords)
  }

  const changeKeywordCustomer = (value: CategorySearchRecordModel) => {
    customerSelected.value = value.code
    keywordCustomer.value = `(${value.code}) ${value.name}`
  }

  const handleAddTagKeywordCustomer = () => {
    if (values.boDspCatExpsrExclEntInsertList?.includes(keywordCustomer.value.trim())) {
      searchCustomerRef.value.handleReset()
      return
    }
    if (keywordCustomer.value.trim().length > 0) {
      setFieldValue('boDspCatExpsrExclEntInsertList', [...(values.boDspCatExpsrExclEntInsertList ?? []), keywordCustomer.value])
      boDspCatExpsrExclEntInsertList.value = [...boDspCatExpsrExclEntInsertList.value, customerSelected.value]
      keywordCustomer.value = ''
      searchCustomerRef.value.handleReset()
    }
  }

  const handleSubmitForm = async () => {
    try {
      if (!values.displayCategoryName) {
        openNotification({
          content: '<p><span class="wf_text-sub-01">( * )</span> 표시는 필수입력항목입니다.</p>'
        })
        return
      }
      const hasN = lowDspCategoryList.value.find((item) => item.representativeDisplayCategoryYn === CategoriesExhibitionStatusModel.NOT_DISPLAY)
      if (values.displayCategoryExposureYn === CategoriesExhibitionStatusModel.DISPLAY && !!hasN) {
        openNotification({
          content: '대표 전시카테고리는 비전시 할 수 없습니다.'
        })
        return
      }
      setLoading?.(true)
      const boDspCatExpsrExclEntInsertListMapping = boDspCatExpsrExclEntInsertList.value.map((item) => ({
        customerKey: Number(item)
      }))
      const payload = {
        ...values,
        displayCategoryDepth: 3,
        upperDisplayCategoryId,
        displayCategoryId: displayCategoryIdRef.value,
        displayCategoryExposureOrder: Number(displayCategoryExposureOrder),
        boDspCatExpsrExclEntInsertList: boDspCatExpsrExclEntInsertListMapping
      }
      const { data } = await productCategoryApi.updateDspCategoryManage(payload)
      openNotification({
        content: '저장 되었습니다.',
        onAccept() {
          router.push({
            path: `${CATEGORY_EXHIBITION_DEPTH}`,
            query: { ...route.query, displayCategoryId: data.displayCategoryId, depth: CategoriesDeep.THREE }
          })
          closeModalByPopNotification?.()
          // getDspCatList()
          emits('on-save-category', data.displayCategoryId)
        }
      })
    } catch (err) {
      /* empty */
    } finally {
      setLoading?.(false)
    }
  }

  const handleDeleteCategory = () => {
    const hasOldItems = items.value.find((item) => !item?.isNew)
    if (hasOldItems) {
      openNotification({
        content: '상품이 등록된 카테고리는 삭제 불가합니다.'
      })
      return
    }
    if (displayCategoryIdRef.value !== '') {
      openModalConfirm({
        content: '카테고리를 삭제 하시겠습니까?',
        onConfirm: async () => {
          try {
            closeModalByPop?.()
            await productCategoryApi.removeDspCategoryDelete({ displayCategoryId: displayCategoryIdRef.value })
            router.push({ path: `${CATEGORY_EXHIBITION_DEPTH}`, query: { ...route.query, displayCategoryId: '', depth: CategoriesDeep.THREE } })
          } catch (error) {
            /* empty */
          }
        }
      })
    }
  }

  const isDisabled = computed(() => {
    return values.displayCategoryExposureYn === CategoriesExhibitionStatusModel.DISPLAY
  })

  watch(
    () => values.displayCategoryExposureYn,
    (val) => {
      emits('on-change-dsp-select', val || YnOptions.N)
    }
  )

  return {
    values,
    setFieldValue,
    handleSubmitForm,
    changeKeywordCustomer,
    handleAddTagKeywordCustomer,
    searchCustomerRef,
    handleRemoveTagKeywordCustomer,
    lowDspCategoryList,
    handleDeleteCategory,
    categoryDetail,
    isDisabled
  }
}
