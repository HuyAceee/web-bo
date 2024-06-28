import { computed, onMounted, ref } from 'vue'
import { useModalNotification, useModalConfirm, useModal } from '@/composables'
import { PRODUCT_APPROVAL_TICKET_PRODUCT_LIST } from '@/common'
import ProductReasonRejectApprovalModal from '@/views/products/modal/reasonProductApproval/ProductReasonRejectApprovalModal.vue'
import { ModalNotification } from '@/components/widgets'
import { useRoute, useRouter } from 'vue-router'
import { ProductTicketOptionTab, productTicketApprovalStatus } from '@/models'
import { productTicketDetailInfoApi } from '@/services/api/products/tickets/ProductTicketDetailInfoApi'
import { useProductApprovalTicketWrapper } from '../useProductApprovalTicketWrapper'
import { useHandleApprovalTicketProductActionButton } from '@/composables/products/ticketProduct/provisionInfo/useProductTicketProvisionInformation'
import {
  ProductApprovalTicketItemIssuedManageRequest,
  ProductApprovalTicketItemOptionDetailRequest
} from '@/models/services/requests/products/approval/ProductApprovalTicketItemOptionDetailRequest'
import { PRODUCT_STATUS_ENUM } from '@/models/views/products/common/ProductTypeModel'

export const useProductApprovalTicketReleaseInfo = () => {
  const { openModal: openModalNotification, closeModalByPop } = useModalNotification()
  const { openModal: openModalConfirm, closeModalByPop: closeModalConfirm } = useModalConfirm()
  const { replaceModal, closeModalByPop: closeModalShowReason } = useModal()
  const router = useRouter()
  const defaultValueReturnPeriod = ref<string>('')
  const defaultValueReturnInformation = ref<string>('')
  const defaultValueReturn = ref<string>('')
  const ticketTypeName = ref<string>('')
  const deliveryFeePolicyTypeName = ref<string>('')
  const productRequestKey = ref<number>(0)
  const isPopupShowing = ref(false)
  const lastProductProgressStatusCode = ref<string>('')
  const productKey = ref<number>(0)
  const route = useRoute()
  const { tabData } = useProductApprovalTicketWrapper()

  const openConfirmCancel = () => {
    openModalConfirm({
      content: '상품등록을 취소할 경우 입력한 정보는 저장되지 않습니다. 계속하시겠습니까?',
      onConfirm() {
        router.push(PRODUCT_APPROVAL_TICKET_PRODUCT_LIST)
      }
    })
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
    if (defaultValueReturnPeriod.value === '' || defaultValueReturnInformation.value === '' || defaultValueReturn.value === '') {
      openModalNotification?.({
        content: '<p><span class="wf_text-sub-01">(*)</span>기본정보 입력이 완료되었습니다.</p>'
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
                closeModalByPop?.()
              }
            }
          })
        }
      }
    })
  }

  const openNotificationSave = () => {
    if (defaultValueReturnPeriod.value === '' || defaultValueReturnInformation.value === '' || defaultValueReturn.value === '') {
      openModalNotification?.({
        content: '<p><span class="wf_text-sub-01">(*)</span>표시는 필수입력항목입니다.</p>'
      })
    } else {
      if (lastProductProgressStatusCode.value === productTicketApprovalStatus.awaitingApproval) {
        openModalNotification?.({
          content: '현재 승인 대기중인 상품이 존재합니다.'
        })
      }
      if (lastProductProgressStatusCode.value === productTicketApprovalStatus.approvalCompleted) {
        openModalNotification?.({
          content: '승인완료 후 수정할 수 없는 항목입니다. [수정불가항목].'
        })
      } else {
        updateItemRequestDetailIssuedMange()
      }
    }
  }

  const handleNextTab = () => {
    router.push({
      query: {
        ...route.query,
        tab: tabData[ProductTicketOptionTab.TAB_MORE_INFORMATION].name
      }
    })
  }

  const isPreviewDisabled = computed(() => lastProductProgressStatusCode.value === productTicketApprovalStatus.approvalCompleted)

  const getItemRequestDetailIssuedInfo = (productReqeustKey: number) => {
    const request: ProductApprovalTicketItemOptionDetailRequest = { productReqeustKey }
    productTicketDetailInfoApi.getItemRequestDetailIssuedInfo(request).then((res) => {
      const data = res.data
      defaultValueReturn.value = data.exchangeReturnContents
      defaultValueReturnInformation.value = data.exchangeReturnWarningContents
      defaultValueReturnPeriod.value = data.exchangeReturnPeriodContents
      ticketTypeName.value = data.ticketTypeName
      deliveryFeePolicyTypeName.value = data.deliveryFeePolicyTypeName
      productRequestKey.value = data.productReqeustKey
      lastProductProgressStatusCode.value = data.lastProductProgressStatusCode
      productKey.value = data.productKey
    })
  }

  const updateItemRequestDetailIssuedMange = () => {
    const request: ProductApprovalTicketItemIssuedManageRequest = {
      productReqeustKey: productRequestKey.value,
      productKey: productKey.value,
      exchangeReturnWarningContents: defaultValueReturnInformation.value,
      exchangeReturnContents: defaultValueReturn.value,
      exchangeReturnPeriodContents: defaultValueReturnPeriod.value
    }
    productTicketDetailInfoApi.updateItemRequestIssuedManage(request).then((res) => {
      if (res.data.errMessage) {
        openModalNotification?.({
          content: res.data.errMessage
        })
      } else if (res.data.sucessMessage) {
        openModalNotification?.({
          content: res.data.sucessMessage,
          onAccept: handleNextTab
        })
      }
    })
  }

  const { handleRefuseApprovalById, handleApprovalById } = useHandleApprovalTicketProductActionButton()

  const handleRefuseApprovalByIdAction = () => {
    if (productRequestKey.value) {
      handleRefuseApprovalById(productRequestKey.value?.toString(), productKey.value?.toString(), lastProductProgressStatusCode.value, () => {
        lastProductProgressStatusCode.value = PRODUCT_STATUS_ENUM.APPROVAL_REJECTED
      })
    }
  }

  const handleApprovalByIdAction = () => {
    if (productRequestKey.value) {
      handleApprovalById(productRequestKey.value?.toString(), productKey.value?.toString(), lastProductProgressStatusCode.value, () => {
        lastProductProgressStatusCode.value = PRODUCT_STATUS_ENUM.APPROVAL_COMPLETED
      })
    }
  }

  const onPreviewClick = () => {
    // There are currently no pages linked to
  }

  onMounted(() => {
    getItemRequestDetailIssuedInfo(Number(route?.query?.productRequestKey))
  })

  return {
    defaultValueReturnPeriod,
    defaultValueReturnInformation,
    defaultValueReturn,
    isPopupShowing,
    openConfirmCancel,
    openConfirmApproval,
    openConfirmApprovalReject,
    openNotificationSave,
    ticketTypeName,
    deliveryFeePolicyTypeName,
    isPreviewDisabled,
    onPreviewClick,
    handleRefuseApprovalByIdAction,
    handleApprovalByIdAction,
    lastProductProgressStatusCode
  }
}
