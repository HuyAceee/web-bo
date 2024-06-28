import { CATEGORY_EXHIBITION_DEPTH, getFirstNumberFromString } from '@/common'
import { useModalConfirm, useModalNotification } from '@/composables/widgets'
import { ProductSearchRecordModel } from '@/models'
import {
  ProductDspCategoryExceptCompanyRequest,
  ProductDspCategoryManageRequest
} from '@/models/services/requests/products/category/ProductCategoryRequest'
import { CategoriesDeep, CategoriesStandardManagementEmits } from '@/models/views/categories/CategoriesDepthManagementModel'
import {
  CategoriesExhibitionBoDspCatExpsrExclEntInsertListModel,
  CategoriesExhibitionDspCategoryDepthTypeModel,
  CategoriesExhibitionDspCategoryDetailModel,
  CategoriesExhibitionDspCategoryExceptCompanyModel,
  CategoriesExhibitionLowDspCategoryListModel
} from '@/models/views/categories/exhibition/CategoriesExhibitionInDepth1CategoryModel'
import { CategoriesExhibitionStatusModel } from '@/models/views/categories/exhibition/CategoriesExhibitionInDepth2CategoryModel'
import { productCategoryApi } from '@/services/api/products/category/ProductCategoryApi'
import { onMounted, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export const useCategoriesExhibitionDepth2Management = (emits: CategoriesStandardManagementEmits) => {
  const values = reactive<CategoriesExhibitionDspCategoryDetailModel>({
    displayCategoryDepthName: '',
    upperDisplayCategoryId: '',
    upperDisplayCategoryName: '',
    displayCategoryId: '',
    displayCategoryName: '',
    displayCategoryExposureYn: CategoriesExhibitionStatusModel.DISPLAY,
    displayCategoryDepth: CategoriesExhibitionDspCategoryDepthTypeModel.DSP_CATE_DEPTH_2,
    displayCategoryExposureOrder: undefined,
    displayExcludedCompanyYn: CategoriesExhibitionStatusModel.DISPLAY
  })
  const searchCustomerRef = ref()
  const valueCompany = ref<CategoriesExhibitionDspCategoryExceptCompanyModel[]>([])
  const valueSelectedCompany = ref<CategoriesExhibitionDspCategoryExceptCompanyModel>()
  const valueCategoryList = reactive<CategoriesExhibitionLowDspCategoryListModel[]>([])
  const route = useRoute()
  const router = useRouter()
  const upperDisplayCategoryId = route?.query?.upperDisplayCategoryId as string
  const displayCategoryId = route?.query?.displayCategoryId as string
  const displayCategoryExposureOrder = route?.query?.displayCategoryExposureOrder as string
  const isLoading = ref(false)
  const { openModal: openNotificationModal, closeModalByPop: closeModalByPopNotification } = useModalNotification()
  const { openModal: openConfirmModal } = useModalConfirm()
  const getDspCategoryDetail = (displayCategoryId: string) => {
    const request: ProductDspCategoryExceptCompanyRequest = { displayCategoryId }
    productCategoryApi
      .getDspCategoryDetail(request)
      .then((res) => {
        const data = res.data
        values.displayCategoryDepth = data.displayCategoryDepth
        values.displayCategoryDepthName = data.displayCategoryDepthName
        values.displayCategoryExposureOrder = data.displayCategoryExposureOrder
        values.displayCategoryExposureYn = data.displayCategoryExposureYn
        values.displayCategoryId = data.displayCategoryId
        values.displayCategoryName = data.displayCategoryName
        values.displayExcludedCompanyYn = data.displayExcludedCompanyYn
        values.upperDisplayCategoryId = data.upperDisplayCategoryId
        values.upperDisplayCategoryName = data.upperDisplayCategoryName
      })
      .catch(() => {
        // empty
      })
  }

  const getLowDspCategoryList = (displayCategoryId: string) => {
    isLoading.value = true
    const request: ProductDspCategoryExceptCompanyRequest = { displayCategoryId }
    productCategoryApi
      .getLowDspCategoryList(request)
      .then((res) => {
        valueCategoryList.splice(0, valueCategoryList.length, ...res.data)
      })
      .catch(() => {
        // show error
      })
      .finally(() => {
        isLoading.value = false
      })
  }

  const getDspCategoryExceptCompany = (displayCategoryId: string) => {
    const request: ProductDspCategoryExceptCompanyRequest = { displayCategoryId }
    productCategoryApi
      .getDspCategoryExceptCompany(request)
      .then((res) => {
        valueCompany.value = res.data
      })
      .catch(() => {
        // empty
      })
  }

  const handleSelectedCompany = (value: ProductSearchRecordModel) => {
    const data: CategoriesExhibitionDspCategoryExceptCompanyModel = { customerKey: value.code, customerName: value.name }
    valueSelectedCompany.value = data
  }

  const handlePushCompany = () => {
    const index = valueCompany.value.findIndex((it) => it.customerKey === valueSelectedCompany.value?.customerKey)
    if (valueSelectedCompany.value && index < 0) {
      valueCompany.value.push(valueSelectedCompany.value)
    }
    searchCustomerRef.value?.handleReset()
  }
  const handleRemoveItemCompany = (index: number) => {
    valueCompany.value.splice(index, 1)
  }

  const handleSetFieldCompanyYn = (value: CategoriesExhibitionStatusModel) => {
    values.displayExcludedCompanyYn = value
  }

  const handleSetFieldExposureYn = (value: CategoriesExhibitionStatusModel) => {
    values.displayCategoryExposureYn = value
  }

  const updateDspCategoryManage = () => {
    const boDspCatExpsrExclEntInsertList: CategoriesExhibitionBoDspCatExpsrExclEntInsertListModel[] = valueCompany.value.map((it) => {
      return {
        customerKey: it.customerKey
      }
    })

    const request: ProductDspCategoryManageRequest = {
      displayCategoryId: values.displayCategoryId,
      displayCategoryDepth: values.displayCategoryDepth,
      displayCategoryName: values.displayCategoryName,
      upperDisplayCategoryId: upperDisplayCategoryId,
      displayCategoryExposureOrder: values.displayCategoryExposureOrder ?? Number(displayCategoryExposureOrder),
      displayCategoryExposureYn: values.displayCategoryExposureYn,
      displayExcludedCompanyYn: values.displayExcludedCompanyYn,
      boDspCatExpsrExclEntInsertList
    }

    productCategoryApi
      .updateDspCategoryManage(request)
      .then(async (res) => {
        if (res.data.sucessMessage) {
          openNotificationModal({
            content: '저장 되었습니다.',
            onAccept: () => {
              router.push({
                path: `${CATEGORY_EXHIBITION_DEPTH}`,
                query: { ...route.query, displayCategoryId: res.data.displayCategoryId, depth: CategoriesDeep.TWO }
              })
              closeModalByPopNotification?.()
              emits('on-save-category', res.data.displayCategoryId)
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

  const removeDspCategoryDelete = () => {
    const request: ProductDspCategoryExceptCompanyRequest = { displayCategoryId: values.displayCategoryId ?? '' }
    productCategoryApi
      .removeDspCategoryDelete(request)
      .then((res) => {
        if (res.data.sucessMessage) {
          openNotificationModal({
            content: res.data.sucessMessage,
            onAccept: () => {
              resetValue()
              router.push({ path: `${CATEGORY_EXHIBITION_DEPTH}`, query: { ...route.query, displayCategoryId: '', depth: CategoriesDeep.TWO } })
              closeModalByPopNotification?.()
              emits('on-save-category', res.data.displayCategoryId)
            }
          })
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

  const onSaveDspCategoryManage = () => {
    if (!values.displayCategoryName || !values.displayCategoryExposureYn) {
      openNotificationModal({ content: '( * )표시는 필수입력항목입니다.' })
    } else {
      updateDspCategoryManage()
    }
  }

  const handleRemoveDspCategory = () => {
    if (values.displayCategoryId !== '') {
      openConfirmModal({
        content: '카테고리 삭제 시 하위 카테고리도 모두 삭제됩니다. 삭제 하시겠습니까?',
        onConfirm: () => {
          removeDspCategoryDelete()
          closeModalByPopNotification?.()
        }
      })
    }
  }

  const resetValue = () => {
    values.displayCategoryDepthName = ''
    values.upperDisplayCategoryId = ''
    values.upperDisplayCategoryName = ''
    values.displayCategoryId = ''
    values.displayCategoryName = ''
    values.displayCategoryExposureYn = CategoriesExhibitionStatusModel.DISPLAY
    values.displayCategoryDepth = CategoriesExhibitionDspCategoryDepthTypeModel.DSP_CATE_DEPTH_2
    values.displayCategoryExposureOrder = Number(displayCategoryExposureOrder)
    values.displayExcludedCompanyYn = CategoriesExhibitionStatusModel.DISPLAY
    valueCategoryList.splice(0, valueCategoryList.length)
  }

  watch(
    () => route,
    (v) => {
      const id = v?.query?.displayCategoryId as string
      const depth = id ? getFirstNumberFromString(id) : undefined
      if (depth !== CategoriesDeep.TWO) return
      if (!id) return
      if (id) {
        getDspCategoryDetail(id)
        getDspCategoryExceptCompany(id)
        getLowDspCategoryList(id)
      } else {
        resetValue()
      }

      const displayCategoryExposureOrder = v?.query?.upperDisplayCategoryId as string
      if (displayCategoryExposureOrder) {
        resetValue()
      }
    },
    { deep: true }
  )

  onMounted(() => {
    const id = route.query?.displayCategoryId as string
    const depth = id ? getFirstNumberFromString(id) : undefined
    if (!route?.query?.displayCategoryId) return
    if (depth !== CategoriesDeep.TWO) return

    if (displayCategoryId) {
      getLowDspCategoryList(displayCategoryId)
      getDspCategoryDetail(displayCategoryId)
      getDspCategoryExceptCompany(displayCategoryId)
    }
  })

  return {
    values,
    valueCompany,
    valueCategoryList,
    isLoading,
    searchCustomerRef,
    handleSelectedCompany,
    handlePushCompany,
    handleRemoveItemCompany,
    handleSetFieldCompanyYn,
    handleSetFieldExposureYn,
    onSaveDspCategoryManage,
    handleRemoveDspCategory
  }
}
