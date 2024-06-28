import { PRODUCT_TICKET_PRODUCT_LIST } from '@/common'
import { useModalConfirm, useModalNotification } from '@/composables'
import { ProductTicketOptionTab, productTicketApprovalStatus } from '@/models/views'
import { productTicketDetailInfoApi } from '@/services/api/products/tickets/ProductTicketDetailInfoApi'
import { reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductTicketRegistration } from '../useProductTicketRegistration'
import {
  ProductTicketDetailIssuedInfoRequest,
  ProductTicketIssuedManageRequest
} from '@/models/services/requests/products/ticket/ProductIssuedInfoRequest'
import {
  ProductApprovalTicketItemIssuedManageRequest,
  ProductApprovalTicketItemOptionDetailRequest
} from '@/models/services/requests/products/approval/ProductApprovalTicketItemOptionDetailRequest'
import { ProductTicketDetailBasicInfoProps } from '@/models/services/responses/products/ticket/ProductTicketBaseInfoResponse'

export const useProductReleaseInformation = (props?: ProductTicketDetailBasicInfoProps) => {
  const state = reactive({
    defaultValueReturnPeriod: '',
    defaultValueReturnInformation: '',
    defaultValueReturn: '',
    isPopupShowing: false,
    isStatusPreview: false,
    isStatusApproval: false,
    ticketTypeName: '',
    productKey: 0,
    deliveryFeePolicyTypeName: '',
    previewDisabled: false,
    saveDisabled: false
  })
  const lastProductProgressStatusCode = ref<string>('')
  const lastProductProgressStatusName = ref<string>('')

  const { openModal } = useModalNotification()
  const { openModal: openModalConfirm } = useModalConfirm()
  const route = useRoute()
  const router = useRouter()
  const code = route?.query?.code
  const classification = route?.query?.classification
  const productRequestKeyRoute = route?.query?.productRequestKey
  const productRequestKey = ref<number>(0)
  const productKey = ref<number>(0)
  const { tabData } = useProductTicketRegistration()

  const openConfirmCancel = () => {
    openModalConfirm({
      content: '상품등록을 취소할 경우 입력한 정보는 저장되지 않습니다. 계속하시겠습니까?',
      onConfirm() {
        router.push(PRODUCT_TICKET_PRODUCT_LIST)
      }
    })
  }

  const openNotificationSaveTemporary = () => {
    openModal?.({
      content: '입력한 정보가 저장되었습니다.'
    })
  }

  const openNotificationSave = () => {
    if (state.defaultValueReturnPeriod === '' || state.defaultValueReturnInformation === '' || state.defaultValueReturn === '') {
      openModal?.({
        content: '<p><span class="wf_text-sub-01">(*)</span>표시는 필수입력항목입니다.</p>'
      })
    } else {
      if (lastProductProgressStatusCode.value === productTicketApprovalStatus.awaitingApproval) {
        openModal?.({
          content: '현재 승인 대기중인 상품이 존재합니다.'
        })
      } else {
        if (code && classification) {
          updateIssuedManage()
        } else if (productRequestKeyRoute) {
          updateItemRequestDetailIssuedMange()
        }
      }
    }
  }

  const onPreviewClick = () => {
    // There are currently no pages linked to
  }

  const handleNextTab = () => {
    router.push({
      query: {
        ...route.query,
        tab: tabData[ProductTicketOptionTab.TAB_MORE_INFORMATION].name
      }
    })
  }

  const changeStatusApproval = () => {
    state.isStatusPreview = false
    state.isStatusApproval = true
  }

  const checkStatusButton = (progressStatusCode: string) => {
    lastProductProgressStatusCode.value = progressStatusCode
    productKey.value = props?.data?.productKey ?? 0
    if (progressStatusCode === productTicketApprovalStatus.approvalCompleted) {
      state.previewDisabled = true
      state.saveDisabled = true
    } else if (progressStatusCode !== productTicketApprovalStatus.registration) {
      state.saveDisabled = true
      state.previewDisabled = false
    } else if (progressStatusCode == productTicketApprovalStatus.approvalWithdrawal) {
      state.saveDisabled = true
      state.previewDisabled = false
    } else if (progressStatusCode === productTicketApprovalStatus.rejectedApproval) {
      state.saveDisabled = true
      state.previewDisabled = false
    } else if (progressStatusCode === productTicketApprovalStatus.awaitingApproval) {
      state.saveDisabled = false
      state.previewDisabled = false
    }
  }

  const getIssuedInfo = (productClassificationCode: string, productCode: string) => {
    if (productClassificationCode && productCode) {
      const request: ProductTicketDetailIssuedInfoRequest = { productClassificationCode, productCode }
      productTicketDetailInfoApi
        .getIssuedInfo(request)
        .then((res) => {
          const data = res.data
          state.productKey = data.productKey
          state.ticketTypeName = data.ticketTypeName
          state.deliveryFeePolicyTypeName = data.deliveryFeePolicyTypeName
          state.defaultValueReturnPeriod = data.exchangeReturnPeriodContents
          state.defaultValueReturnInformation = data.exchangeReturnWarningContents
          state.defaultValueReturn = data.exchangeReturnContents
          checkStatusButton(data.lastProductProgressStatusCode)
        })
        .catch(() => {})
    }
  }

  const updateIssuedManage = () => {
    const request: ProductTicketIssuedManageRequest = {
      exchangeReturnPeriodContents: state.defaultValueReturnPeriod,
      exchangeReturnContents: state.defaultValueReturn,
      exchangeReturnWarningContents: state.defaultValueReturnInformation,
      productKey: state.productKey
    }
    productTicketDetailInfoApi
      .updateIssuesInfo(request)
      .then((res) => {
        if (res.data.errMessage) {
          openModal?.({
            content: res.data.errMessage
          })
        } else if (res.data.sucessMessage) {
          openModal?.({
            content: res.data.sucessMessage,
            onAccept: handleNextTab
          })
        }
      })
      .catch(() => {})
  }

  const getItemRequestDetailIssuedInfo = (productReqeustKey: number) => {
    const request: ProductApprovalTicketItemOptionDetailRequest = { productReqeustKey }
    productTicketDetailInfoApi
      .getItemRequestDetailIssuedInfo(request)
      .then((res) => {
        const data = res.data
        state.defaultValueReturn = data.exchangeReturnContents
        state.defaultValueReturnInformation = data.exchangeReturnWarningContents
        state.defaultValueReturnPeriod = data.exchangeReturnPeriodContents
        state.ticketTypeName = data.ticketTypeName
        state.deliveryFeePolicyTypeName = data.deliveryFeePolicyTypeName
        productRequestKey.value = data.productReqeustKey
        lastProductProgressStatusCode.value = data.lastProductProgressStatusCode
        productKey.value = data.productKey
        checkStatusButton(data.lastProductProgressStatusCode)
      })
      .catch(() => {})
  }

  const updateItemRequestDetailIssuedMange = () => {
    const request: ProductApprovalTicketItemIssuedManageRequest = {
      productReqeustKey: productRequestKey.value,
      productKey: productKey.value,
      exchangeReturnWarningContents: state.defaultValueReturnInformation,
      exchangeReturnContents: state.defaultValueReturn,
      exchangeReturnPeriodContents: state.defaultValueReturnPeriod
    }
    productTicketDetailInfoApi
      .updateItemRequestIssuedManage(request)
      .then((res) => {
        if (res.data.errMessage) {
          openModal?.({
            content: res.data.errMessage
          })
        } else if (res.data.sucessMessage) {
          openModal?.({
            content: res.data.sucessMessage,
            onAccept: handleNextTab
          })
        }
      })
      .catch(() => {})
  }

  watch(
    () => props?.data,
    () => {
      if (productRequestKeyRoute) {
        getItemRequestDetailIssuedInfo(Number(productRequestKeyRoute))
      } else {
        lastProductProgressStatusCode.value = props?.data?.lastProductProgressStatusCode ?? ''
        lastProductProgressStatusName.value = props?.data?.lastProductProgressStatusName ?? ''
        if (props?.data?.lastProductProgressStatusCode === productTicketApprovalStatus?.approvalCompleted) {
          state.previewDisabled = true
        }
        const code = props?.data.productCode ?? ''
        const classificationCode = props?.data?.productClassificationCode ?? ''
        getIssuedInfo(classificationCode, code)
      }
    },
    { immediate: true }
  )

  return {
    state,
    openConfirmCancel,
    openNotificationSaveTemporary,
    openNotificationSave,
    changeStatusApproval,
    onPreviewClick
  }
}
