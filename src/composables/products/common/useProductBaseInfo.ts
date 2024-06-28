import {
  PRODUCT_DELIVERY_BASE_STORAGE_KEY,
  PRODUCT_DELIVERY_BASE_STORAGE_TEMPORARY_KEY,
  PRODUCT_TICKET_BASE_STORAGE_KEY,
  PRODUCT_TICKET_BASE_STORAGE_TEMPORARY_KEY,
  deepEqualObject,
  isAllPropertyObjectEmpty,
  isInteger
} from '@/common'
import { useLoading, useStorage } from '@/composables/common'
import { useProductReasonApproval } from '@/composables/products/modal/reasonProductApproval/useProductReasonApproval'
import { useModalConfirm, useModalNotification } from '@/composables/widgets'
import { ProductBaseInfoFormModel, ProductSearchRecordModel, WelfareSelectOptionType, productStatusSell } from '@/models'
import { YnOptions, defaultFormRadioValue } from '@/models/common'
import { productTicketDetailInfoApi } from '@/services/api/products/tickets/ProductTicketDetailInfoApi'
import { useForm } from 'vee-validate'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getProductRegistrationRedirectLink, useProductCodeQuery, useProductRedirectLink, useProductRequestKeyQuery } from './useProductRedirectLink'
import { deliveryInfoApi } from '@/services/api/delivery/DeliveryInfoApi'
import { useHandleApprovalTicketProductActionButton } from '../ticketProduct/provisionInfo/useProductTicketProvisionInformation'
import { ProductProcessRequestType } from '@/models/services/requests/products/approval/ProductTicketApprovalListRequest'
import {
  ProductTicketDetailBasicInfoExceptCompanyModel,
  ProductTicketDetailBasicInfoRequestConverter,
  ProductTicketDetailBasicInfoResponseConverter
} from '@/models/services/responses/products/ticket/ProductTicketBaseInfoResponse'
import { DeliverySubSellerSimpleModel } from '@/models/views/delivery/modal/DeliverySellerAndCustomerSearchModel'
import { productApprovalStatus, productBaseInfoType } from '@/models/views/products/common/ProductTypeModel'

export const useProductBaseInfo = (type: string, optionsTypeProduct?: WelfareSelectOptionType[], optionsTypeTicket?: WelfareSelectOptionType[]) => {
  const router = useRouter()
  const route = useRoute()
  const query = useProductCodeQuery()
  const productKeyQuery = useProductRequestKeyQuery()
  const forwardQuery = type === productBaseInfoType.approval_ticket ? productKeyQuery : query
  const subSeller = ref<WelfareSelectOptionType[]>([])
  const { openModal: openModalConfirm, closeModalByPop } = useModalConfirm()
  const { openModal: openModalNotification } = useModalNotification()
  const { value: reasonText, onShowModal } = useProductReasonApproval()
  const { redirectSavedLink, redirectCancelLink } = useProductRedirectLink(type, undefined, forwardQuery)
  const { setLoading } = useLoading()

  const [savedValues, setSavedValues] = useStorage<ProductBaseInfoFormModel>(
    type == productBaseInfoType.delivery ? PRODUCT_DELIVERY_BASE_STORAGE_KEY : PRODUCT_TICKET_BASE_STORAGE_KEY
  )
  const [, setSavedTemporaryValues] = useStorage<ProductBaseInfoFormModel>(
    type == productBaseInfoType.delivery ? PRODUCT_DELIVERY_BASE_STORAGE_TEMPORARY_KEY : PRODUCT_TICKET_BASE_STORAGE_TEMPORARY_KEY
  )

  const emptyForm: ProductBaseInfoFormModel = {
    lastSavedTime: '',
    lastApprovalFinishedTime: '',
    lastChangeSavedTime: '',
    externalIntegration: '-',
    selectTypeProduct: optionsTypeProduct ? optionsTypeProduct[0] : undefined,
    productCode: '',
    productCodeSeller: '',
    productName: '',
    productNameI18: '',
    productStatus: '-',
    selectStatusSell: productStatusSell[0],
    seller: '',
    selectSeller: undefined,
    brand: '',
    productKeywords: [],
    registerProductReview: YnOptions.Y,
    qaRegistration: YnOptions.Y,
    giveAGift: YnOptions.Y,
    minimumPurchaseQuantity: '',
    maximumPurchaseQuantity: '',
    isMinimumPurchaseQuantity: false,
    isMaximumPurchaseQuantity: false,
    manufacturingCompany: '',
    ticketType: '',
    ticketPassType: defaultFormRadioValue,
    customerRegistration: true,
    customerKeywords: [],
    selectTypeTicket: optionsTypeTicket ? optionsTypeTicket[0] : undefined,
    startTime: '',
    endTime: '',
    ticketCancelPossibleType: defaultFormRadioValue,
    ticketUseRuleType: defaultFormRadioValue,
    ticketValidityDateYn: YnOptions.N,
    lastModifiedBy: '',
    lastModifiedByName: '',
    createdBy: '',
    createdByName: '',
    lastProductApprovedBy: '',
    lastProductApprovedByName: '',
    classification: '',
    productType: '',
    createdDate: '',
    key: undefined,
    sellerKey: undefined,
    lowSellerKey: undefined,
    excludedCompanyYn: '',
    lastProductSalesStatusCode: '',
    productRequestProcessReason: ''
  }

  const productBaseInfoData = ref<ProductBaseInfoFormModel>({ ...emptyForm })

  const productRequestKeyParams = {
    productReqeustKey: route.query.productRequestKey as string
  }
  const productCodeParams = { productCode: route.query.code as string, productClassificationCode: route.query.classification as string }
  const fetchDetailsTicketData = async () => {
    if ((type === productBaseInfoType.approval_ticket || type === productBaseInfoType.ticket) && isAllPropertyObjectEmpty(productCodeParams)) {
      if (!isAllPropertyObjectEmpty(productRequestKeyParams)) {
        try {
          setLoading?.(true)

          const { data } = await productTicketDetailInfoApi.getBasicRequestDetailInfo(productRequestKeyParams)

          const { data: exceptCompany } = await productTicketDetailInfoApi.getBasicRequestDetailInfoExceptCompany(productRequestKeyParams)

          const transformData = ProductTicketDetailBasicInfoResponseConverter.from(data)

          const { data: subSellerData } = await deliveryInfoApi.getSubSellerSimpleInfo(data.sellerKey)

          subSeller.value = subSellerData.map((it: DeliverySubSellerSimpleModel) => {
            return {
              label: it.subSellerName,
              value: it.managerKey
            }
          })
          const selectedSubSeller = subSeller.value.find((it) => it.value === transformData.lowSellerKey)
          setValues({
            ...transformData,
            seller: `(${transformData.sellerKey}) ${transformData.sellerName}`,
            selectSeller: selectedSubSeller,
            customerKeywords: exceptCompany?.map((it: ProductTicketDetailBasicInfoExceptCompanyModel) => `(${it.customerKey}) ${it.customerName}`)
          })
          setSavedValues({ ...values })
        } catch (e) {
          // setLoading?.(false)
        } finally {
          setLoading?.(false)
        }
      }
    } else if (!isAllPropertyObjectEmpty(productCodeParams)) {
      try {
        setLoading?.(true)
        const { data } = await productTicketDetailInfoApi.getBasicDetailInfo(productCodeParams)

        const { data: exceptCompany } = await productTicketDetailInfoApi.getBasicDetailInfoExceptCompany(productCodeParams)

        const transformData = ProductTicketDetailBasicInfoResponseConverter.from(data)

        const { data: subSellerData } = await deliveryInfoApi.getSubSellerSimpleInfo(data.sellerKey)

        subSeller.value = subSellerData.map((it: DeliverySubSellerSimpleModel) => {
          return {
            label: it.subSellerName,
            value: it.managerKey
          }
        })
        const selectedSubSeller = subSeller.value.find((it) => it.value === transformData.lowSellerKey)
        setValues({
          ...transformData,
          seller: `(${transformData.sellerKey}) ${transformData.sellerName}`,
          selectSeller: selectedSubSeller,
          customerKeywords: exceptCompany?.map((it: ProductTicketDetailBasicInfoExceptCompanyModel) => `(${it.customerKey}) ${it.customerName}`)
        })

        setSavedValues({ ...values })
      } catch (e) {
        // setLoading?.(false)
      } finally {
        setLoading?.(false)
      }
    }
  }

  onMounted(() => {
    fetchDetailsTicketData()
  })

  const productApprovalStatusByRoute = computed(() => {
    if ((route.query.status as string) === productApprovalStatus.approvalCompleted) {
      setSavedValues({ ...productBaseInfoData })
      return productApprovalStatus.approvalCompleted
    }

    if (route.params.id) {
      setSavedValues({ ...productBaseInfoData })
      return productApprovalStatus.awaitingApproval
    }
    return ''
  })

  const getProductData = () => {
    if (productApprovalStatusByRoute.value === productApprovalStatus.approvalCompleted) {
      return productBaseInfoData
    }
    if (productApprovalStatusByRoute.value === productApprovalStatus.awaitingApproval) {
      return productBaseInfoData
    }
    // if (savedTemporaryValues?.value) {
    //   return savedTemporaryValues.value
    // }
    // if (savedValues?.value) {
    //   return savedValues.value
    // }
    return emptyForm
  }

  const { setFieldValue, values, setValues, resetForm } = useForm<ProductBaseInfoFormModel>({
    initialValues: getProductData()
  })

  const handleChangeValueField = (field: keyof ProductBaseInfoFormModel, value: any) => {
    setFieldValue(field, value)
  }

  const handleResetForm = () => {
    resetForm()
  }
  const handleChangeExpiration = (value: YnOptions) => {
    handleChangeValueField('ticketValidityDateYn', value)
    if (value === YnOptions.N) {
      handleChangeValueField('startTime', '')
      handleChangeValueField('endTime', '')
    }
  }

  const handleChangeIsMinimumMaximumPurchaseQuantity = (
    value: any,
    fieldBoolean: keyof ProductBaseInfoFormModel,
    fieldText: keyof ProductBaseInfoFormModel
  ) => {
    if (!value) {
      handleChangeValueField(fieldText, '')
    }
    handleChangeValueField(fieldBoolean, value)
  }

  /* Base info data */
  const keywordProductBase = ref('')
  const onChangeKeywordProductBase = (value: string) => {
    keywordProductBase.value = value
  }

  const handleAddTagKeywordBase = () => {
    if (keywordProductBase.value.trim().length > 0) {
      if (values.productKeywords.length && values.productKeywords.length < 10) {
        setFieldValue('productKeywords', [...values.productKeywords, keywordProductBase.value])
      } else if (values.productKeywords.length >= 10) {
        openModalNotification({
          content: '키워드는 10개까지 등록 가능합니다.'
        })
      } else {
        setFieldValue('productKeywords', [keywordProductBase.value])
      }
      keywordProductBase.value = ''
    }
  }

  const handleRemoveTagKeywordBase = (idx: number) => {
    const oldKeywords = [...values.productKeywords]
    oldKeywords.splice(idx, 1)
    setFieldValue('productKeywords', oldKeywords)
  }

  const onChangeBrandSearch = (value: ProductSearchRecordModel) => {
    setFieldValue('brand', `(${value.code}) ${value.name}`)
  }

  const onChangeSellerSearch = (value: ProductSearchRecordModel) => {
    setFieldValue('seller', `(${value.code}) ${value.name}`)
  }

  /* Customer information */
  const keywordCustomer = ref('')

  const changeKeywordCustomer = (value: ProductSearchRecordModel) => {
    keywordCustomer.value = `(${value.code}) ${value.name}`
  }

  const handleAddTagKeywordCustomer = () => {
    if (keywordCustomer.value.trim().length > 0) {
      setFieldValue('customerKeywords', [...values.customerKeywords, keywordCustomer.value])
      keywordCustomer.value = ''
    }
  }

  const handleRemoveTagKeywordCustomer = (idx: number) => {
    const oldKeywords = [...values.customerKeywords]
    oldKeywords.splice(idx, 1)
    setFieldValue('customerKeywords', oldKeywords)
  }

  const onPreviewClick = () => {
    // const route = PRODUCT_TICKET_PRODUCT_EDIT + '?' + query
    // window.open(route, '_blank');
  }

  /* Registration info data */
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

  // check required field for product delivery
  const isDeliveryProductValid = () => {
    let isValid = true
    if (!values.selectTypeProduct) isValid = false
    if (!values.productName) isValid = false
    if (!values.seller) isValid = false
    // if (!values.selectSeller) isValid = false
    if (!values.brand) isValid = false
    if (!values.selectStatusSell) isValid = false
    if (values.isMinimumPurchaseQuantity && values.minimumPurchaseQuantity && values.minimumPurchaseQuantity.length == 0) isValid = false
    if (values.isMaximumPurchaseQuantity && values.maximumPurchaseQuantity && values.maximumPurchaseQuantity.length == 0) isValid = false

    return isValid
  }

  // check required field for product ticket
  const isTicketProductValid = () => {
    let isValid = true
    if (!values.selectTypeProduct) isValid = false
    if (!values.productName) isValid = false
    if (!values.seller) isValid = false
    // if (!values.selectSeller) isValid = false
    if (!values.selectStatusSell) isValid = false
    if (values.ticketValidityDateYn === YnOptions.Y) {
      if (!values.startTime) isValid = false
      if (!values.endTime) isValid = false
    }
    if (!values.selectTypeTicket) isValid = false
    return isValid
  }

  // submit data
  const openNotificationSave = () => {
    if (productApprovalStatusByRoute.value == productApprovalStatus.approvalCompleted) {
      if (!deepEqualObject({ ...values }, { ...savedValues?.value })) {
        openModalNotification({
          content: '승인완료 후 수정할 수 없는 항목입니다. [수정불가항목]'
        })
        setValues({ ...productBaseInfoData.value })
      }
      return
    }

    if (values.productStatus === productApprovalStatus.awaitingApproval) {
      openModalNotification({
        content: '현재 승인 대기중인 상품이 존재합니다.'
      })
      setValues({ ...savedValues?.value })
      return
    }

    const isValid =
      type === productBaseInfoType.ticket || type === productBaseInfoType.approval_ticket ? isTicketProductValid() : isDeliveryProductValid()

    if (!isValid) {
      openModalNotification({
        content: '<p><span class="wf_text-sub-01">(*)</span>기본정보 입력이 완료되었습니다.</p>'
      })
    } else if (values.productStatus == productApprovalStatus.registration) {
      openModalNotification({
        content: '입력한 정보가 수정되었습니다.',
        onAccept: () => {
          router.push(redirectSavedLink.value)
        }
      })
      setFieldValue('lastChangeSavedTime', new Date().toString())
      setSavedValues({ ...values })
      // if it has request key, edit it
    } else if (
      type === productBaseInfoType.approval_ticket ||
      (!isAllPropertyObjectEmpty(productRequestKeyParams) && isAllPropertyObjectEmpty(productCodeParams))
    ) {
      const preparedData = ProductTicketDetailBasicInfoRequestConverter.from(values, ProductProcessRequestType.UPDATE)
      productTicketDetailInfoApi
        .putItemRequestBasicManage(preparedData)
        .then((res) => {
          if (!res.data.errMessage) {
            openModalNotification({
              content: res.data.sucessMessage,
              onAccept: () => {
                const redirectWithRequestKeyParams = getProductRegistrationRedirectLink(res.data.productReqeustKey)
                router.push(redirectWithRequestKeyParams)
              }
            })
          }
        })
        .catch(() => {
          setValues({ ...savedValues?.value })
        })
      // create
    } else if (type === productBaseInfoType.ticket && isAllPropertyObjectEmpty(productCodeParams)) {
      const preparedData = ProductTicketDetailBasicInfoRequestConverter.from(values, ProductProcessRequestType.CREATION)
      productTicketDetailInfoApi
        .putItemRequestBasicManage(preparedData)
        .then((res) => {
          if (!res.data.errMessage) {
            openModalNotification({
              content: res.data.sucessMessage,
              onAccept: () => {
                const redirectWithRequestKeyParams = getProductRegistrationRedirectLink(res.data.productReqeustKey)
                router.push(redirectWithRequestKeyParams)
              }
            })
          }
        })
        .catch(() => {
          setValues({ ...savedValues?.value })
        })
      // edit with product code
    } else {
      const preparedData = ProductTicketDetailBasicInfoRequestConverter.from(values)
      productTicketDetailInfoApi
        .putItemBasicManage(preparedData)
        .then((res) => {
          if (!res.data.errMessage) {
            openModalNotification({
              content: res.data.sucessMessage,
              onAccept: () => {
                router.push(redirectSavedLink.value)
              }
            })
          }
        })
        .catch(() => {
          setValues({ ...savedValues?.value })
        })
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
      if (values.productStatus == productApprovalStatus.registration && !!values.lastChangeSavedTime) {
        openModalNotification({
          content: '입력한 정보가 수정되었습니다.'
        })
      }
      setFieldValue('productStatus', productApprovalStatus.awaitingApproval)
      setSavedValues({ ...values })
    }
  }

  const openApprovalReject = () => {
    if (values.productStatus == productApprovalStatus.rejectedApproval) {
      openModalNotification({
        content: '이미 반려 처리되었습니다.'
      })
    } else {
      openModalConfirm({
        content: '반려된 상품은 승인요청이 있기 전까지 재승인할 수 없습니다. 선택한 상품을 반려 처리 하시겠습니까?',
        onConfirm: () => {
          // Show modal ProductReasonRejectApprovalModal
          closeModalByPop?.()
          onShowModal()
        }
      })
    }
  }

  const openConfirmApproval = () => {
    if (values.productStatus == productApprovalStatus.approvalCompleted) {
      openModalNotification({
        content: '이미 승인완료되었습니다.'
      })
    } else {
      openModalConfirm({
        content: '선택한 상품을 승인 하시겠습니까?',
        onConfirm: () => {
          closeModalByPop?.()
          setFieldValue('productStatus', productApprovalStatus.approvalCompleted)
          setFieldValue('lastApprovalFinishedTime', new Date().toString())
          showNotificationConfirmYesApproval()
        }
      })
    }
  }

  const showNotificationConfirmYesApproval = () => {
    openModalNotification({
      content: '선택한 상품이 승인완료 되었습니다.'
    })
  }

  watch(reasonText, (newText) => {
    if (newText && newText.length > 0) setFieldValue('productStatus', productApprovalStatus.rejectedApproval)
  })

  // for registration / change seller
  watch(
    () => values.seller,
    async (key) => {
      if (key) {
        try {
          const sellerKey = isInteger(key) ? key : key.split('(')[1]
          const { data: subSellerData } = await deliveryInfoApi.getSubSellerSimpleInfo(parseInt(sellerKey))
          subSeller.value = subSellerData.map((it: DeliverySubSellerSimpleModel) => {
            return {
              label: it.subSellerName,
              value: it.managerKey
            }
          })
        } catch (error) {
          /* empty */
        }
      }
    }
  )

  const { handleRefuseApprovalById, handleApprovalById } = useHandleApprovalTicketProductActionButton()
  const handleApprovalByIdAction = () => {
    if (values.productRequestKey && values) {
      handleApprovalById(
        values.productRequestKey?.toString() ?? '',
        values.productKey?.toString() ?? '',
        values.lastProductProgressStatusCode?.toString() ?? '',
        () => {
          fetchDetailsTicketData()
        }
      )
    }
  }

  const handleRefuseApprovalByIdAction = () => {
    if (values.productRequestKey && values) {
      handleRefuseApprovalById(
        values.productRequestKey?.toString() ?? '',
        values.productKey?.toString() ?? '',
        values.lastProductProgressStatusCode?.toString() ?? '',
        () => {
          fetchDetailsTicketData()
        }
      )
    }
  }

  return {
    values,
    setFieldValue,
    handleResetForm,
    handleChangeValueField,
    // Base Info
    optionsSelectSeller: subSeller,
    keywordProductBase,
    onChangeKeywordProductBase,
    handleAddTagKeywordBase,
    handleRemoveTagKeywordBase,
    onChangeBrandSearch,
    onChangeSellerSearch,
    // Customer information
    changeKeywordCustomer,
    handleAddTagKeywordCustomer,
    handleRemoveTagKeywordCustomer,
    handleChangeIsMinimumMaximumPurchaseQuantity,
    // Button Bottom
    openConfirmCancel,
    openNotificationSaveTemporary,
    openNotificationSave,
    openNotificationApproval,
    openApprovalReject,
    openConfirmApproval,
    onPreviewClick,
    handleApprovalByIdAction,
    handleRefuseApprovalByIdAction,
    handleChangeExpiration
  }
}
