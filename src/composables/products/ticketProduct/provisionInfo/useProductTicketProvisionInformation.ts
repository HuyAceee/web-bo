import { PRODUCT_APPROVAL_TICKET_PRODUCT_LIST, PRODUCT_TICKET_PRODUCT_LIST } from '@/common/router'
import { useLoading, useModal } from '@/composables/common'
import { useModalConfirm, useModalNotification } from '@/composables/widgets'
import { productTicketApprovalStatus } from '@/models'
import { ProductDeliveryDetailsDataRow, productDeliveryDetailsMockEmptyDataRow, ProductProvisionInputMethodType } from '@/models/views'
import { productTicketApi } from '@/services/api/products/ProductTicketApi'
import { productTicketProvisionInformationApi } from '@/services/api/products/tickets/ProductTicketProvisionInformationApi'
import { useForm } from 'vee-validate'
import { computed, ref, watch } from 'vue'
import { array, number, object, string } from 'yup'
import { useRoute, useRouter } from 'vue-router'
import { productTicketItemApi } from '@/services/api/products/tickets/ProductTicketItemApi'
import ProductReasonRejectApprovalModal from '@/views/products/modal/reasonProductApproval/ProductReasonRejectApprovalModal.vue'
import {
  ProductItemDetailDisplayInfoModel,
  ProductTicketDataNoticeProvidingProps,
  ProductTicketDetailNoticeProvidingInfoModel,
  ProductTicketNoticeProvidingType
} from '@/models/services/responses/products/ticket/ProductTicketBaseInfoResponse'
import { ProductTicketStandardCategoryModel } from '@/models/services/responses/products/ticket/ProductTicketListResponse'
import { PRODUCT_STATUS_ENUM } from '@/models/views/products/common/ProductTypeModel'

interface ProductTicketProvisionBaseInitValue {
  dataList: ProductDeliveryDetailsDataRow[]
  radioSelectInputDataOption: ProductProvisionInputMethodType
  selectedCategory: string
}

interface ProductTicketProvisionInformationConfigs {
  type: ProductTicketNoticeProvidingType
}

export const useProductTicketProvisionInformation = (
  props: ProductTicketDetailNoticeProvidingInfoModel,
  configs?: ProductTicketProvisionInformationConfigs
) => {
  const { setLoading } = useLoading()
  // TODO: add funcs for register when type is register
  const { type = ProductTicketNoticeProvidingType.Edit } = configs ?? {}

  const { openModal: openConfirm, closeModalByPop: closeModalConfirm } = useModalConfirm()
  const { openModal: openModalNotification, closeModalByPop } = useModalNotification()

  const router = useRouter()
  const route = useRoute()
  const productData = ref<ProductTicketDataNoticeProvidingProps>()
  const categoryData = ref<ProductItemDetailDisplayInfoModel>()
  const isDisableApproval = ref(true)
  const initialData = ref()

  const basicProvisionData = ref()
  const currentProvisionData = ref()
  const categoriesData = ref<ProductTicketStandardCategoryModel[]>([])

  const productApprovalTableRef = ref()

  const baseInitValue = {
    dataList: { ...initialData.value },
    radioSelectInputDataOption: ProductProvisionInputMethodType.FETCH,
    selectedCategory: ''
  }

  const categoriesOptionsComputed = computed(() =>
    categoriesData.value.map((item) => {
      return { label: item.standardCategoryName, value: item.standardCategoryId }
    })
  )

  const initValue = computed(() => {
    return baseInitValue
  })

  const schema = object().shape({
    dataList: array()
      .of(
        object().shape({
          order: number().required(),
          item: string().max(500).required(),
          description: string().max(1000).required()
        })
      )
      .strict(),
    radioSelectInputDataOption: string().required(),
    selectedCategory: string().required()
  })

  const { values, setFieldValue, setValues, validate } = useForm<ProductTicketProvisionBaseInitValue>({
    validationSchema: schema,
    initialValues: initValue.value
  })

  const onIncreaseItem = () => {
    const newData = [...values.dataList, { ...productDeliveryDetailsMockEmptyDataRow }]
    setFieldValue('dataList', newData)
  }

  const setFormData = (index: number, field: keyof ProductDeliveryDetailsDataRow, value: string) => {
    setFieldValue(`dataList.${index}.${field}`, value)
  }

  const handleChangeInputMethod = (value: any) => {
    if (type === ProductTicketNoticeProvidingType.Register) {
      // TODO: Add register logic
      setFieldValue('radioSelectInputDataOption', value)
      if (value === ProductProvisionInputMethodType.FETCH) {
        setFieldValue('dataList', basicProvisionData.value)
      }
    }
    if (type === ProductTicketNoticeProvidingType.Edit || type === ProductTicketNoticeProvidingType.EditApproval) {
      setFieldValue('radioSelectInputDataOption', value)
    }
  }

  const getCurrentProvisionData = async (productKey: number, productCode?: string) => {
    try {
      setLoading?.(true)
      let resData

      if (type === ProductTicketNoticeProvidingType.EditApproval) {
        resData = await productTicketProvisionInformationApi.getDetailApprovalInformation({ productReqeustKey: productKey })
        getCategoriesData(resData?.categoryId, 3)
      } else {
        resData = await productTicketProvisionInformationApi.getDetailInformation({
          productKey: productKey,
          productCode: productCode
        })
      }
      currentProvisionData.value = resData
      const tempData = resData?.data?.length
        ? resData?.data?.map((item: ProductDeliveryDetailsDataRow) => ({ ...item }))
        : [{ ...productDeliveryDetailsMockEmptyDataRow }]
      setValues({
        ...values,
        dataList: tempData,
        selectedCategory: resData.categoryId,
        radioSelectInputDataOption: resData.inputType
      })
    } catch {
      setValues({ dataList: [{ ...productDeliveryDetailsMockEmptyDataRow }] })
      productTicketItemApi
        .getItemRequestDetailDisplayInfo({ productReqeustKey: productKey?.toString() })
        .then((res) => {
          if (res.data?.chargeMdKey) {
            productTicketApi
              .getStandardCategory(1, { chargeMdKey: res.data?.chargeMdKey?.toString() })
              .then((data) => {
                categoriesData.value = data.data
              })
              .catch(() => {
                //error
              })
          }
        })
        .catch(() => {
          //error
        })
    } finally {
      setLoading?.(false)
    }
  }

  const getCategoriesData = async (categoryIdDepth1: string, depth?: number) => {
    try {
      if (categoryIdDepth1) {
        const params = { upperStandardCategoryId: categoryIdDepth1 }
        const { data } = await productTicketApi.getStandardCategory(depth ?? 2, params)
        categoriesData.value = data
      }
    } catch (error) {
      /* empty */
    }
  }

  const handleChangeCategory = (value: string) => {
    if (value !== values.selectedCategory) {
      openConfirm({
        content: '<p>상품분류를 변경하면 항목이 초기화됩니다.</p> <p>계속 하시겠습니까?</p>',
        onConfirm: () => {
          closeModalByPop?.()
          setFieldValue('selectedCategory', value)
        }
      })
    }
  }

  const onDeleteItem = (index: number) => {
    const newData = [...values.dataList]
    newData.splice(index, 1)
    setFieldValue('dataList', newData)
  }

  const onPreviewClick = () => {}

  const openConfirmCancel = () => {
    openConfirm({
      content: '상품등록을 취소할 경우 입력한 정보는 저장되지 않습니다. 계속하시겠습니까?',
      onConfirm: () => {
        closeModalConfirm?.()
        switch (type) {
          case ProductTicketNoticeProvidingType.EditApproval:
            router.push(PRODUCT_APPROVAL_TICKET_PRODUCT_LIST)
            break
          default:
            router.push(PRODUCT_TICKET_PRODUCT_LIST)
        }
      }
    })
  }

  const onSaveClick = async () => {
    const { errors: e } = await validate()
    if (Object.keys(e).length !== 0) {
      openModalNotification?.({
        content: '( <span class="wf_text-sub-01">*</span> ) 표시는 필수입력항목입니다.',
        buttonLabel: '확인'
      })
    } else {
      handleSaveConfirm()
    }
  }

  const onApprovalClick = async () => {
    openConfirm({
      content: '선택한 상품을 승인 하시겠습니까?',
      onConfirm: () => {
        closeModalConfirm?.()
        if (route.query.productRequestKey) {
          setLoading?.(true)
          productTicketApi
            .itemRequestApproval({
              boTempItemApprovalRequestBodyList: [
                {
                  productReqeustKey: route.query.productRequestKey as string
                }
              ]
            })
            .then(() => {
              router.push(PRODUCT_APPROVAL_TICKET_PRODUCT_LIST)
            })
            .catch(() => {})
            .finally(() => {
              setLoading?.(false)
            })
        }
      }
    })
  }

  const showSuccessNotificationSave = (message?: string) => {
    openModalNotification?.({
      content: message ?? '상품정보제공고시 정보 입력이 완료되었습니다.',
      onAccept: () => {
        closeModalByPop?.()
      }
    })
  }

  const handleSaveConfirm = async () => {
    try {
      setLoading?.(true)
      let reqData = {}
      switch (type) {
        case ProductTicketNoticeProvidingType.EditApproval:
          if (currentProvisionData.value?.productReqeustKey) {
            reqData = {
              ...values,
              productReqeustKey: currentProvisionData?.value?.productReqeustKey,
              productKey: currentProvisionData.value?.productKey
            }
          } else {
            reqData = {
              ...values,
              productReqeustKey: route.query.productRequestKey
            }
          }
          productTicketProvisionInformationApi
            .putApprovalProvision(reqData)
            .then((res) => {
              showSuccessNotificationSave(res?.data?.sucessMessage)
              isDisableApproval.value = false
            })
            .catch(() => {})
          break
        case ProductTicketNoticeProvidingType.Register:
          if (route.query.productRequestKey) {
            reqData = { ...values, productReqeustKey: route.query.productRequestKey }
            productTicketProvisionInformationApi
              .putRequestProvision(reqData)
              .then((res) => {
                showSuccessNotificationSave(res?.data?.sucessMessage)
              })
              .catch(() => {})
            isDisableApproval.value = false
          }
          break
        case ProductTicketNoticeProvidingType.Edit:
        default:
          reqData = { ...values, productKey: currentProvisionData.value.productKey }
          productTicketProvisionInformationApi
            .putProvision(reqData)
            .then((res) => {
              showSuccessNotificationSave(res?.data?.sucessMessage)
              isDisableApproval.value = false
            })
            .catch(() => {})
      }
    } catch (error) {
      /* empty */
    } finally {
      setLoading?.(false)
    }
  }

  const { handleRefuseApprovalById, handleApprovalById } = useHandleApprovalTicketProductActionButton()

  const handleRefuseApprovalByIdAction = () => {
    if (props.data.productRequestKey) {
      handleRefuseApprovalById(
        props.data.productRequestKey.toString(),
        currentProvisionData.value.productKey,
        currentProvisionData.value.lastProductProgressStatusCode,
        () => {
          currentProvisionData.value.lastProductProgressStatusCode = PRODUCT_STATUS_ENUM.APPROVAL_REJECTED
        }
      )
    }
  }

  const handleApprovalByIdAction = () => {
    if (props.data.productRequestKey) {
      handleApprovalById(
        props.data.productRequestKey.toString(),
        currentProvisionData.value.productKey,
        currentProvisionData.value.lastProductProgressStatusCode,
        () => {
          currentProvisionData.value.lastProductProgressStatusCode = PRODUCT_STATUS_ENUM.APPROVAL_COMPLETED
        }
      )
    }
  }

  // watch props.category: set categoriesData
  watch(
    () => props?.category,
    (category) => {
      categoryData.value = category
      let standardCategoryId
      switch (type) {
        case ProductTicketNoticeProvidingType.EditApproval:
          standardCategoryId = route.query.standardCategoryId?.toString()
          break
        default:
          standardCategoryId = category?.standardCategoryIdDepth1
          break
      }

      if (standardCategoryId) {
        getCategoriesData(standardCategoryId)
      }
    },
    { immediate: true }
  )

  // watch props.data: set currentProvisionData
  watch(
    () => props?.data,
    (data) => {
      productData.value = data
      const { productKey, productCode, productRequestKey } = data
      switch (type) {
        case ProductTicketNoticeProvidingType.EditApproval:
          if (productRequestKey) {
            getCurrentProvisionData(productRequestKey)
          }
          break
        default:
          if (productKey && productCode) {
            getCurrentProvisionData(productKey, productCode)
          }
          break
      }
    },
    { immediate: true }
  )

  // watch route.query: set default data when type is register
  watch(
    () => route.query,
    async (routeQueries) => {
      const { productRequestKey } = routeQueries
      if (type === ProductTicketNoticeProvidingType.Register && productRequestKey) {
        // getDetail
        const { data } = await productTicketItemApi.getItemRequestDetailDisplayInfo({ productReqeustKey: productRequestKey as string })
        if (data.standardCategoryId) {
          const { data: basicData } = await productTicketProvisionInformationApi.getBasicProvision(data.standardCategoryId)
          basicProvisionData.value = basicData.length > 0 ? basicData : [{ ...productDeliveryDetailsMockEmptyDataRow }]
          setFieldValue('dataList', basicProvisionData.value)
        }
        if (data.standardCategoryIdDepth1) {
          getCategoriesData(data.standardCategoryIdDepth1)
        }
      }
    },
    { immediate: true }
  )

  return {
    categoriesOptionsComputed,
    onIncreaseItem,
    onDeleteItem,
    openConfirmCancel,
    onApprovalClick,
    values,
    currentProvisionData,
    setFormData,
    onSaveClick,
    onPreviewClick,
    setFieldValue,
    isDisableApproval,
    productApprovalTableRef,
    handleChangeCategory,
    handleChangeInputMethod,
    handleRefuseApprovalById: handleRefuseApprovalByIdAction,
    handleApprovalById: handleApprovalByIdAction
  }
}

export const useHandleApprovalTicketProductActionButton = () => {
  const { openModal } = useModalNotification()
  const { openModal: openModalConfirm, closeModalByPop } = useModalConfirm()
  const { replaceModal } = useModal()

  const handleSubmitApproval = async (IdItem: string, productKey: string, type: string, reasonRefuse?: string) => {
    const dataSend = {
      productReqeustKey: IdItem,
      productKey: productKey ?? '',
      productRequestProgressStatus: type,
      productRequestProcessReason: reasonRefuse ?? '',
      etcMemoCnts: ''
    }
    const preparedRequest =
      type === PRODUCT_STATUS_ENUM.APPROVAL_REJECTED
        ? {
            boTempItemRejectRequestBodyList: [dataSend]
          }
        : {
            boTempItemApprovalRequestBodyList: [dataSend]
          }
    if (type === PRODUCT_STATUS_ENUM.APPROVAL_REJECTED) {
      return await productTicketApi.itemRequestReject(preparedRequest)
    } else {
      return await productTicketApi.itemRequestApproval(preparedRequest)
    }
  }

  const handleCompleteApprovalStatus = (
    idChecked: string,
    productKey: string,
    typeApproval: string,
    reasonRefuse?: string,
    callback?: () => void
  ) => {
    handleSubmitApproval(idChecked, productKey, typeApproval, reasonRefuse)
      .then((res) => {
        callback?.()
        openModal?.({
          buttonLabel: '확인',
          content: res?.data?.sucessMessage
        })
      })
      .catch(() => {})
  }

  const handleShowPopupReason = (idChecked: string, productKey: string, callback?: () => void) => {
    replaceModal?.({
      component: ProductReasonRejectApprovalModal,
      props: {
        usingApiMessage: true
      },
      events: {
        onClose: closeModalByPop,
        onSave: (reasonRefuse: string) => {
          handleCompleteApprovalStatus(idChecked, productKey, PRODUCT_STATUS_ENUM.APPROVAL_REJECTED, reasonRefuse, callback)
        }
      }
    })
  }
  const handleMessageRefuseApproval = (iHas: boolean, idChecked: string, productKey: string, message: string, callback?: () => void) => {
    if (iHas) {
      openModal?.({
        buttonLabel: '확인',
        content: message
      })
      return
    }
    openModalConfirm({
      content: '반려된 상품은 승인요청이 있기 전까지 재승인할 수 없습니다. 선택한 상품을 반려 처리 하시겠습니까?',
      buttonCancelLabel: '취소',
      buttonConfirmLabel: '확인',
      onConfirm: () => {
        handleShowPopupReason(idChecked, productKey, callback)
      }
    })
  }

  const handleMessageApproval = (iHas: boolean, idChecked: string, productKey: string, message: string, callback?: () => void) => {
    if (iHas) {
      openModal?.({
        buttonLabel: '확인',
        content: message
      })
      return
    }
    openModalConfirm({
      content: '선택한 상품을 승인 하시겠습니까?',
      buttonCancelLabel: '취소',
      buttonConfirmLabel: '확인',
      onConfirm: async () => {
        closeModalByPop?.()
        handleCompleteApprovalStatus(idChecked, productKey, PRODUCT_STATUS_ENUM.APPROVAL_COMPLETED, message, callback)
      }
    })
  }

  const handleRefuseApprovalById = (id: string, productKey: string, lastProductProgressStatusCode: string, callback?: () => void) => {
    const isRejected = lastProductProgressStatusCode === productTicketApprovalStatus.rejectedApproval
    handleMessageRefuseApproval(isRejected, id, productKey, '이미 반려 처리되었습니다.', callback)
  }

  const handleApprovalById = (id: string, productKey: string, lastProductProgressStatusCode: string, callback?: () => void) => {
    const isApproval = lastProductProgressStatusCode === productTicketApprovalStatus.approvalCompleted
    handleMessageApproval(isApproval, id, productKey, '이미 승인완료되었습니다.', callback)
  }
  return {
    handleRefuseApprovalById,
    handleApprovalById
  }
}
