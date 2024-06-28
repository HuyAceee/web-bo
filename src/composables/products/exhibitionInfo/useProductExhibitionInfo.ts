import { useProductRequestKeyQuery, useProductRedirectLink, useProductCodeQuery } from '@/composables/products/common/useProductRedirectLink'
import {
  PRODUCT_DELIVERY_EXHIBITION_STORAGE_KEY,
  PRODUCT_DELIVERY_EXHIBITION_STORAGE_TEMPORARY_KEY,
  PRODUCT_TICKET_EXHIBITION_STORAGE_KEY,
  PRODUCT_TICKET_EXHIBITION_STORAGE_TEMPORARY_KEY,
  deepEqualObject,
  isAllPropertyObjectEmpty,
  isInteger
} from '@/common'
import { ModalNotification } from '@/components/widgets'
import { useLoading, useModal, useModalConfirm, useModalNotification, useStorage } from '@/composables'
import { useProductReasonApproval } from '@/composables/products/modal/reasonProductApproval/useProductReasonApproval'
import { ProductSearchRecordModel, ProductTab, WelfareSelectOptionType, YnOptions } from '@/models'
import { productTicketApi } from '@/services/api/products/ProductTicketApi'
import { productTicketItemApi } from '@/services/api/products/tickets/ProductTicketItemApi'
import ProductReasonRejectApprovalModal from '@/views/products/modal/reasonProductApproval/ProductReasonRejectApprovalModal.vue'
import { useForm } from 'vee-validate'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useHandleApprovalTicketProductActionButton } from '../ticketProduct/provisionInfo/useProductTicketProvisionInformation'
import {
  ProductExhibitionInfoFormModel,
  ProductTicketDetailInfoRequestConverter,
  ProductTicketRequestDetailInfoRequestConverter
} from '@/models/services/responses/products/ticket/ProductTicketBaseInfoResponse'
import { ProductTicketCategoryDspModel } from '@/models/services/responses/products/ticket/ProductTicketListResponse'
import { productApprovalStatus, productBaseInfoType } from '@/models/views/products/common/ProductTypeModel'

const optionsStatus = [
  { label: '전시', value: true },
  { label: '비전시', value: false }
]
const radioUnset = -1

const emptyForm: ProductExhibitionInfoFormModel = {
  productStatus: '',
  exhibitionStatus: false,
  devices: [''],
  startTime: '',
  endTime: '',
  exhibitionCategories: [],
  radioGroupCategories: radioUnset,
  md: ''
}

export const useProductExhibitionInfo = (type: string) => {
  const refExhibition = ref()
  const productStatus = ref()
  const query = useProductCodeQuery()
  const productKeyQuery = useProductRequestKeyQuery()
  const { handleRefuseApprovalById, handleApprovalById } = useHandleApprovalTicketProductActionButton()

  const optionsSelectFirst = ref<WelfareSelectOptionType[]>([])
  const optionsSelectSecond = ref<WelfareSelectOptionType[]>([])
  const optionsSelectThird = ref<WelfareSelectOptionType[]>([])
  const router = useRouter()
  const { onShowModal } = useProductReasonApproval()
  const { openModal: openModalConfirm, closeModalByPop: closeModalConfirm } = useModalConfirm()
  const { openModal: openModalNotification, closeModalByPop: closeModalNotification } = useModalNotification()
  const { replaceModal, closeModalByPop: closeModalShowReason } = useModal()
  const route = useRoute()
  const selectedMd = ref('')

  const { setLoading } = useLoading()

  const [savedValues, setSavedValues] = useStorage<ProductExhibitionInfoFormModel>(
    type == productBaseInfoType.delivery ? PRODUCT_DELIVERY_EXHIBITION_STORAGE_KEY : PRODUCT_TICKET_EXHIBITION_STORAGE_KEY
  )
  const [, setSavedTemporaryValues] = useStorage<ProductExhibitionInfoFormModel>(
    type == productBaseInfoType.delivery ? PRODUCT_DELIVERY_EXHIBITION_STORAGE_TEMPORARY_KEY : PRODUCT_TICKET_EXHIBITION_STORAGE_TEMPORARY_KEY
  )
  const productRequestKeyParams = {
    productReqeustKey: route.query.productRequestKey as string
  }
  const productCodeParams = { productCode: route.query.code as string, productClassificationCode: route.query.classification as string }

  const forwardQuery = isAllPropertyObjectEmpty(productRequestKeyParams) ? query : productKeyQuery

  const { redirectSavedLink, redirectCancelLink } = useProductRedirectLink(type, ProductTab.SALES, forwardQuery)
  const getDetailDisplayInfo = async () => {
    try {
      setLoading?.(true)
      // edit
      if (
        (type === productBaseInfoType.approval_ticket || type === productBaseInfoType.ticket) &&
        isAllPropertyObjectEmpty(productRequestKeyParams)
      ) {
        const { data } = await productTicketItemApi.getItemDetailsDisplayInfo(productCodeParams)
        const transformData = ProductTicketDetailInfoRequestConverter.from(data)
        const activeExhibition =
          transformData.boItemDspCategoryList?.findIndex((it) => it.representativeDisplayCategoryYn === YnOptions.Y) ?? undefined
        const initData = { ...transformData, radioGroupCategories: activeExhibition }
        setValues(initData)
        setSavedValues(initData)
        selectedMd.value = initData?.md
      } else if (!isAllPropertyObjectEmpty(productRequestKeyParams)) {
        const { data } = await productTicketItemApi.getItemRequestDetailDisplayInfo(productRequestKeyParams)
        const transformData = ProductTicketRequestDetailInfoRequestConverter.from(data)
        const activeExhibition =
          transformData.boItemDspCategoryList?.findIndex((it) => it.representativeDisplayCategoryYn === YnOptions.Y) ?? undefined
        setValues({ ...transformData, radioGroupCategories: activeExhibition })
        setSavedValues({ ...transformData, radioGroupCategories: activeExhibition })
        selectedMd.value = transformData?.md
      }
    } catch (e) {
      // setLoading?.(false)
    } finally {
      setLoading?.(false)
    }
  }

  onMounted(() => {
    if (!isAllPropertyObjectEmpty(productRequestKeyParams) || !isAllPropertyObjectEmpty(productCodeParams)) {
      getDetailDisplayInfo()
    }
    handleChangeCategory()
  })

  const productApprovalStatusByRoute = computed(() => {
    if ((route.query.status as string) === productApprovalStatus.approvalCompleted) {
      return productApprovalStatus.approvalCompleted
    }

    if (route.params.id) {
      return productApprovalStatus.awaitingApproval
    }

    return ''
  })

  const { setFieldValue, values, setValues, resetForm } = useForm<ProductExhibitionInfoFormModel>({
    initialValues: emptyForm
  })

  const handleChangeValueField = (field: keyof ProductExhibitionInfoFormModel, value: any) => {
    setFieldValue(field, value)
  }

  const handleResetForm = () => {
    resetForm()
  }

  const onPreviewClick = () => {
    // const route = PRODUCT_TICKET_PRODUCT_EDIT + '?' + query
    // window.open(route, '_blank');
  }

  const handelAddCategory = async () => {
    if (values.selectFirst && values.selectSecond && values.selectThird) {
      const { data } = await productTicketApi.getStandardCategoryList({ standardCategoryId: values.selectThird.value })
      const apiResponseItemDspCategoryList = data.map((it) => {
        return {
          // standardDisplayCategoryKey: it.standardDisplayCategoryKey,
          standardCategoryId: it.standardCategoryId,
          displayCategoryId: it?.displayCategoryId,
          displayCategoryIdDepth1: it?.displayCategoryIdDepth1,
          displayCategoryNameDepth1: it?.displayCategoryNameDepth1,
          displayCategoryIdDepth2: it?.displayCategoryIdDepth2,
          displayCategoryNameDepth2: it?.displayCategoryNameDepth2,
          displayCategoryIdDepth3: it?.displayCategoryIdDepth3,
          displayCategoryNameDepth3: it?.displayCategoryNameDepth3,
          displayCategoryPathName: it?.displayCategoryPathName,
          representativeDisplayCategoryYn: it?.representativeDisplayCategoryYn
        }
      })

      const apiExhibitionCategories = apiResponseItemDspCategoryList.map((it) => it?.displayCategoryPathName)

      setFieldValue('boItemDspCategoryList', apiResponseItemDspCategoryList)

      if (values.radioGroupCategories === radioUnset) {
        setFieldValue('radioGroupCategories', 0)
      }

      setFieldValue('exhibitionCategories', apiExhibitionCategories)
      // setFieldValue('selectFirst', undefined)
      // setFieldValue('selectSecond', undefined)
      // setFieldValue('selectThird', undefined)
      // optionsSelectSecond.value = []
      // optionsSelectThird.value = []
    }
  }

  const handelDeleteCategory = (idx: number) => {
    const categories = [...values.exhibitionCategories]
    categories.splice(idx, 1)
    if (categories.length === 0) {
      setFieldValue('radioGroupCategories', radioUnset)
    } else {
      const newSelection = idx - 1 < 0 ? 0 : idx - 1
      setFieldValue('radioGroupCategories', newSelection)
    }
    setFieldValue('exhibitionCategories', categories)

    setFieldValue(
      'boItemDspCategoryList',
      values.boItemDspCategoryList?.filter((item, id) => id !== idx)
    )
  }

  const onChangeMDSearch = (value: ProductSearchRecordModel) => {
    setFieldValue('md', `${value.name} (${value.code})`)
    selectedMd.value = value.code ? value.code.toString() : ''
  }

  /* Button bottom */
  const openConfirmCancel = () => {
    openModalConfirm({
      content: '상품등록을 취소할 경우 입력한 정보는 저장되지 않습니다. 계속하시겠습니까?',
      onConfirm: () => {
        router.push(redirectCancelLink.value)
      }
    })
  }

  const openNotificationSaveTemporary = () => {
    openModalNotification({
      content: '입력한 정보가 저장되었습니다.'
    })
    setSavedTemporaryValues({ ...values })
  }

  const isProductExhibitionValid = () => {
    let isValid = true
    // validate
    if (values?.devices?.length === 0) isValid = false
    if (!values?.startTime) isValid = false
    if (!values?.endTime) isValid = false
    if (!values?.md) isValid = false
    if (values?.exhibitionCategories?.length === 0) isValid = false
    if (values?.radioGroupCategories === radioUnset) isValid = false
    if (values?.md?.length === 0) isValid = false

    return isValid
  }

  const handleChangeCategory = async () => {
    if (selectedMd.value && isInteger(selectedMd.value)) {
      // current md does not have standard category
      try {
        const { data } = await productTicketApi.getStandardCategory(1, { chargeMdKey: selectedMd.value })
        optionsSelectFirst.value = data.map((it: ProductTicketCategoryDspModel) => {
          return {
            label: it.standardCategoryName ?? '',
            value: it.standardCategoryId
          }
        })
      } catch {
        optionsSelectFirst.value = []
      }
    }
  }
  watch(
    () => selectedMd.value,
    () => {
      handleChangeCategory()
    }
  )
  watch(
    () => values.selectFirst?.value,
    async (newValue) => {
      if (!newValue) {
        optionsSelectSecond.value = []
        optionsSelectThird.value = []
        return
      }
      try {
        const { data } = await productTicketApi.getStandardCategory(2, { upperStandardCategoryId: newValue })
        optionsSelectSecond.value = data.map((it: ProductTicketCategoryDspModel) => {
          return {
            label: it.standardCategoryName ?? '',
            value: it.standardCategoryId
          }
        })
        optionsSelectThird.value = []
      } catch {
        optionsSelectSecond.value = []
        optionsSelectThird.value = []
      }
    },
    { immediate: true }
  )
  watch(
    () => values.selectSecond?.value,
    async (newValue) => {
      if (!newValue) {
        optionsSelectThird.value = []
        return
      }
      try {
        const { data } = await productTicketApi.getStandardCategory(3, { upperStandardCategoryId: newValue })
        optionsSelectThird.value = data.map((it: ProductTicketCategoryDspModel) => {
          return {
            label: it.standardCategoryName ?? '',
            value: it.standardCategoryId
          }
        })
      } catch {
        optionsSelectThird.value = []
      }
    },
    { immediate: true }
  )

  const openNotificationSave = () => {
    if (productApprovalStatusByRoute.value == productApprovalStatus.approvalCompleted) {
      if (!deepEqualObject({ ...values }, { ...savedValues?.value })) {
        openModalNotification({
          content: '승인완료 후 수정할 수 없는 항목입니다. [수정불가항목]'
        })
        setValues({ ...values })
        refExhibition?.value.handleResetDevices(emptyForm.devices)
      }
      return
    }

    if (productStatus.value == productApprovalStatus.awaitingApproval) {
      openModalNotification({
        content: '현재 승인 대기중인 상품이 존재합니다.'
      })
      setValues({ ...savedValues?.value })
      return
    }

    if (!isProductExhibitionValid()) {
      openModalNotification({
        content: '<p><span class="wf_text-sub-01">( * )</span>표시는 필수입력항목입니다.</p>'
      })
    } else if (productStatus.value == productApprovalStatus.registration) {
      openModalNotification({
        content: '입력한 정보가 수정되었습니다.',
        onAccept: () => {
          router.push(redirectSavedLink.value)
        }
      })
      setSavedValues({ ...values })
    } else {
      handleSubmit()
        .then((result) => {
          openModalNotification({
            content: result.data.sucessMessage,
            onAccept: () => {
              router.push(redirectSavedLink.value)
            }
          })
        })
        .catch(() => {
          setValues({ ...savedValues?.value })
        })
      // setFieldValue('productStatus', productApprovalStatus.registration)
      // setSavedValues({ ...values })
    }
  }

  const handleSubmit = () => {
    if ((type === productBaseInfoType.approval_ticket || type === productBaseInfoType.ticket) && isAllPropertyObjectEmpty(productRequestKeyParams)) {
      const preparedData = ProductTicketDetailInfoRequestConverter.fromDataToRequest(values)
      return productTicketItemApi.putItemDisplayManage(preparedData)
    } else {
      const productRequestKeyWithParam = Number(route.query.productRequestKey)
      const preparedDataRequestItem = ProductTicketRequestDetailInfoRequestConverter.fromDataToRequest(values)
      return productTicketItemApi.putItemRequestDisplayManage(productRequestKeyWithParam, preparedDataRequestItem)
    }
  }
  const openNotificationApproval = () => {
    let isValid = true
    if (!deepEqualObject({ ...values }, { ...savedValues?.value })) isValid = false

    if (!isValid) {
      openModalNotification({
        content: '입력한 정보를 저장 완료한 후 승인요청 해주세요.'
      })
    } else {
      if (productStatus.value == productApprovalStatus.registration) {
        handleSubmit()
        openModalNotification({
          content: '입력한 정보가 수정되었습니다.'
        })
      }
      setFieldValue('productStatus', productApprovalStatus.awaitingApproval)
      setSavedValues({ ...values })
    }
  }

  const openConfirmApprovalReject = () => {
    openModalConfirm({
      content: '반려된 상품은 승인요청이 있기 전까지 재승인할 수 없습니다. 선택한 상품을 반려 처리 하시겠습니까?',
      buttonCancelLabel: '취소',
      buttonConfirmLabel: '확인',
      onConfirm: () => {
        handleShowPopupReason()
      }
    })
  }

  const openConfirmApproval = () => {
    if (!isProductExhibitionValid()) {
      openModalNotification({
        content: '<p><span class="wf_text-sub-01">( * )</span>표시는 필수입력항목입니다.</p>'
      })
    } else {
      openModalConfirm({
        content: '선택한 상품을 승인 하시겠습니까?',
        onCancel() {
          closeModalConfirm?.()
        },
        onConfirm() {
          closeModalConfirm?.()
          openModalNotification?.({
            content: '선택한 상품이 승인완료 되었습니다.'
          })
        }
      })
    }
  }

  const handleShowPopupReason = () => {
    replaceModal?.({
      component: ProductReasonRejectApprovalModal,
      events: {
        onClose: closeModalShowReason,
        onSave: (value: string) => {
          if (!value.trim()) {
            openModalNotification({
              content: '반려 사유를 입력 해주세요.',
              buttonLabel: '확인'
            })
            return
          }
          replaceModal?.({
            component: ModalNotification,
            props: {
              content: '선택한 상품이 반려 되었습니다.',
              buttonLabel: '확인',
              onAccept: () => {
                closeModalNotification?.()
              }
            }
          })
        }
      }
    })
  }

  const handleApproval = () => {
    openModalConfirm({
      content: '선택한 상품을 승인 하시겠습니까?',
      onCancel() {
        closeModalConfirm?.()
      },
      onConfirm() {
        closeModalConfirm?.()
        openModalNotification?.({
          content: '선택한 상품이 승인완료 되었습니다.'
        })
      }
    })
  }

  const handleReject = () => {
    openModalConfirm({
      content: '반려된 상품은 승인요청이 있기 전까지 재승인할 수 없습니다. 선택한 상품을 반려 처리 하시겠습니까?',
      onCancel() {
        closeModalConfirm?.()
      },
      onConfirm() {
        closeModalConfirm?.()
        onShowModal()
      }
    })
  }

  const handleRefuseApprovalByIdAction = () => {
    if (values.productRequestKey && values) {
      handleRefuseApprovalById(
        values.productRequestKey?.toString() ?? '',
        values.productKey?.toString() ?? '',
        values.lastProductProgressStatusCode?.toString() ?? '',
        () => {
          getDetailDisplayInfo()
        }
      )
    }
  }

  const handleApprovalByIdAction = () => {
    if (values.productRequestKey && values) {
      handleApprovalById(
        values.productRequestKey?.toString() ?? '',
        values.productKey?.toString() ?? '',
        values.lastProductProgressStatusCode?.toString() ?? '',
        () => {
          getDetailDisplayInfo()
        }
      )
    }
  }

  return {
    values,
    refExhibition,
    handleChangeValueField,
    handleResetForm,

    optionsStatus,
    handelAddCategory,
    handelDeleteCategory,
    onChangeMDSearch,

    // Button Bottom
    openConfirmCancel,
    openNotificationSaveTemporary,
    openNotificationSave,
    openNotificationApproval,
    openConfirmApproval,
    openConfirmApprovalReject,
    handleApproval,
    handleReject,
    optionsSelectFirst,
    optionsSelectSecond,
    optionsSelectThird,
    onPreviewClick,
    handleRefuseApprovalByIdAction,
    handleApprovalByIdAction
  }
}
