import { CategoriesDeep } from '@/models/views/categories/CategoriesDepthManagementModel'
import { CATEGORY_EXHIBITION_DEPTH, getFirstNumberFromString } from '@/common'
import { useModalConfirm, useModalNotification } from '@/composables'
import { EmployeeStatusEnum, ProductRegisterValueOptionType } from '@/models'
import {
  ProductDspCategoryExceptCompanyRequest,
  ProductDspCategoryImageDeleteRequest,
  ProductDspCategoryManageRequest
} from '@/models/services/requests/products/category/ProductCategoryRequest'
import { CategoriesStandardManagementEmits } from '@/models/views/categories/CategoriesDepthManagementModel'
import {
  CategoriesExhibitionDataImageModel,
  CategoriesExhibitionDspCategoryDepthTypeModel,
  CategoriesExhibitionDspCategoryDetailModel,
  CategoriesExhibitionLowDspCategoryListModel
} from '@/models/views/categories/exhibition/CategoriesExhibitionInDepth1CategoryModel'
import { productCategoryApi } from '@/services/api/products/category/ProductCategoryApi'
import { onMounted, reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
export const useCategoriesExhibitionDepth1Management = (emits: CategoriesStandardManagementEmits, disableCallApiOnMount: boolean) => {
  const emptyDepthValue = {
    displayCategoryDepthName: '',
    upperDisplayCategoryId: '',
    upperDisplayCategoryName: '',
    displayCategoryId: '',
    displayCategoryName: '',
    displayCategoryImagePathName: '',
    displayCategoryImageName: '',
    displayCategoryImageOriginName: '',
    displayCategoryImageAltName: '',
    displayCategoryExposureYn: ProductRegisterValueOptionType.use,
    displayCategoryDepth: CategoriesExhibitionDspCategoryDepthTypeModel.DSP_CATE_DEPTH_1,
    displayCategoryExposureOrder: undefined,
    displayExcludedCompanyYn: ''
  }
  const value = reactive<CategoriesExhibitionDspCategoryDetailModel>(emptyDepthValue)
  const isLoading = ref(false)
  const valueCategoryList = reactive<CategoriesExhibitionLowDspCategoryListModel[]>([])
  const displayCategoryDepth = ref<CategoriesExhibitionDspCategoryDepthTypeModel>(CategoriesExhibitionDspCategoryDepthTypeModel.DSP_CATE_DEPTH_1)
  const productCount = ref<number>(0)
  const route = useRoute()
  const router = useRouter()
  const displayCategoryId = route?.query?.displayCategoryId as string
  const { openModal: openNotificationModal, closeModalByPop: closeModalByPopNotification } = useModalNotification()
  const { openModal: openConfirmModal } = useModalConfirm()

  const handleUpdateImage = (dataImage: CategoriesExhibitionDataImageModel) => {
    value.displayCategoryImageAltName = dataImage.alt
    if (dataImage.newData) {
      value.displayCategoryImagePathName = dataImage.newData.dirFileName
      value.displayCategoryImageName = dataImage.newData.displayCategoryImageName
      value.displayCategoryImageOriginName = dataImage.newData.displayCategoryImageOriginName
    }
  }
  const handleUpdateExposureOption = (valueOption: ProductRegisterValueOptionType) => {
    value.displayCategoryExposureYn = valueOption
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

  const updateDspCategoryManage = () => {
    const exposureYn =
      value.displayCategoryExposureYn && value.displayCategoryExposureYn === ProductRegisterValueOptionType.use
        ? EmployeeStatusEnum.Y
        : EmployeeStatusEnum.N

    const request: ProductDspCategoryManageRequest = {
      displayCategoryId: value.displayCategoryId,
      displayCategoryDepth: value.displayCategoryDepth,
      displayCategoryImageAltName: value.displayCategoryImageAltName,
      displayCategoryImageOriginName: value.displayCategoryImageOriginName,
      displayCategoryImagePathName: value.displayCategoryImagePathName,
      displayCategoryName: value.displayCategoryName,
      displayCategoryImageName: value.displayCategoryImageName,
      upperDisplayCategoryId: value.upperDisplayCategoryId,
      displayCategoryExposureOrder: route?.query?.displayCategoryExposureOrder
        ? parseInt(route?.query?.displayCategoryExposureOrder as string)
        : value.displayCategoryExposureOrder,
      displayCategoryExposureYn: exposureYn
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
                query: { ...route.query, displayCategoryId: res.data.displayCategoryId, depth: CategoriesDeep.ONE }
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

  const removeImage = (displayCategoryImagePathName: string, displayCategoryImageName: string, displayCategoryId: string) => {
    const request: ProductDspCategoryImageDeleteRequest = { displayCategoryImagePathName, displayCategoryImageName, displayCategoryId }
    productCategoryApi
      .removeImageCategory(request)
      .then((res) => {
        if (res.data.sucessMessage) {
          openNotificationModal({
            content: '이미지가 삭제 되었습니다.'
          })
          value.displayCategoryImagePathName = ''
          value.displayCategoryImageName = ''
          value.displayCategoryImageOriginName = ''
          value.displayCategoryImageAltName = ''
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

  const getDspCategoryDetail = (displayCategoryId: string) => {
    const request: ProductDspCategoryExceptCompanyRequest = { displayCategoryId }
    productCategoryApi
      .getDspCategoryDetail(request)
      .then((res) => {
        const data = res.data
        const exposureYn =
          data.displayCategoryExposureYn && data.displayCategoryExposureYn === EmployeeStatusEnum.Y
            ? ProductRegisterValueOptionType.use
            : ProductRegisterValueOptionType.notUsed

        value.displayCategoryDepth = data.displayCategoryDepth
        value.displayCategoryDepthName = data.displayCategoryDepthName
        value.displayCategoryExposureOrder = data.displayCategoryExposureOrder
        value.displayCategoryExposureYn = exposureYn
        value.displayCategoryId = data.displayCategoryId
        value.displayCategoryImageAltName = data.displayCategoryImageAltName
        value.displayCategoryImageName = data.displayCategoryImageName
        value.displayCategoryImageOriginName = data.displayCategoryImageOriginName
        value.displayCategoryImagePathName = data.displayCategoryImagePathName
        value.displayCategoryName = data.displayCategoryName
        value.displayExcludedCompanyYn = data.displayExcludedCompanyYn
        value.upperDisplayCategoryId = data.upperDisplayCategoryId
      })
      .catch(() => {
        // empty
      })
  }

  const removeDspCategoryDelete = (displayCategoryId?: string) => {
    const request: ProductDspCategoryExceptCompanyRequest = { displayCategoryId: displayCategoryId ?? '' }
    productCategoryApi
      .removeDspCategoryDelete(request)
      .then(async (res) => {
        if (res.data.sucessMessage) {
          openNotificationModal({
            content: res.data.sucessMessage,
            onAccept: () => {
              resetValue()
              router.push({ path: `${CATEGORY_EXHIBITION_DEPTH}`, query: { ...route.query, displayCategoryId: '', depth: CategoriesDeep.ONE } })
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
    if (!value.displayCategoryName || !value.displayCategoryExposureYn) {
      openNotificationModal({ content: '( * )표시는 필수입력항목입니다.' })
    } else {
      updateDspCategoryManage()
    }
  }

  const handleRemoveDspCategory = () => {
    if (value.displayCategoryId !== '') {
      openConfirmModal({
        content: '카테고리 삭제 시 하위 카테고리도 모두 삭제됩니다. 삭제 하시겠습니까?',
        onConfirm: () => {
          removeDspCategoryDelete(value.displayCategoryId)
          closeModalByPopNotification?.()
        }
      })
    }
  }

  const handleRemoveImage = (displayCategoryImagePathName: string, displayCategoryImageName: string, displayCategoryId: string) => {
    openConfirmModal({
      content: '이미지를 삭제 하시겠습니까?',
      onConfirm: () => {
        removeImage(displayCategoryImagePathName, displayCategoryImageName, displayCategoryId)
        closeModalByPopNotification?.()
      }
    })
  }

  const resetValue = () => {
    value.displayCategoryDepthName = ''
    value.upperDisplayCategoryId = ''
    value.upperDisplayCategoryName = ''
    value.displayCategoryId = ''
    value.displayCategoryName = ''
    value.displayCategoryImagePathName = ''
    value.displayCategoryImageName = ''
    value.displayCategoryImageOriginName = ''
    value.displayCategoryImageAltName = ''
    value.displayCategoryExposureYn = ProductRegisterValueOptionType.use
    value.displayCategoryDepth = CategoriesExhibitionDspCategoryDepthTypeModel.DSP_CATE_DEPTH_1
    value.displayCategoryExposureOrder = undefined
    value.displayExcludedCompanyYn = ''
    valueCategoryList.splice(0, valueCategoryList.length)
  }

  watch(
    () => route.query?.displayCategoryId,
    (v) => {
      const id = v as string
      const depth = id ? getFirstNumberFromString(id) : undefined
      if (!id) return
      if (depth !== CategoriesDeep.ONE) return

      if (id) {
        getLowDspCategoryList(id)
        getDspCategoryDetail(id)
      } else {
        resetValue()
      }
    }
  )
  watch(
    () => route.query?.displayCategoryExposureOrder,
    (v) => {
      const displayCategoryExposureOrder = v as string
      if (displayCategoryExposureOrder) {
        resetValue()
      }
    }
  )

  onMounted(() => {
    const id = route.query?.displayCategoryId as string
    const depth = id ? getFirstNumberFromString(id) : undefined

    if (!route?.query?.displayCategoryId) return
    if (depth !== CategoriesDeep.ONE) return
    if (disableCallApiOnMount) return

    if (displayCategoryId) {
      getLowDspCategoryList(displayCategoryId)
      getDspCategoryDetail(displayCategoryId)
    } else {
      resetValue()
    }
  })
  return {
    value,
    valueCategoryList,
    handleUpdateImage,
    handleUpdateExposureOption,
    handleRemoveImage,
    updateDspCategoryManage,
    handleRemoveDspCategory,
    onSaveDspCategoryManage,
    displayCategoryDepth,
    isLoading,
    productCount
  }
}
