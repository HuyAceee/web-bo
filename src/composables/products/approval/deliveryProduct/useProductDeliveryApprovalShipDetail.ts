import { deepEqualObject } from '@/common'
import { useModalConfirm, useModalNotification } from '@/composables'
import { useProductRedirectLink } from '@/composables/products/common/useProductRedirectLink'
import { reactive, ref } from 'vue'
import { ProductDeliveryInfoProps } from '@/composables/products/deliveryInfo/useProductDeliveryInfo'
import router from '@/router'
import { useProductReasonApproval } from '@/composables/products/modal/reasonProductApproval/useProductReasonApproval'

const defaultProductApprovalInfo = {
  shipAddressName: '1',
  shipInfo: '',
  returnAddressName: '1',
  returnPeriod: '',
  returnInfo: '',
  exchangeAddressName: '1',
  exchangePeriod: '',
  exchangeInfo: ''
}
export const useProductDeliveryApprovalShipDetail = (type: string) => {
  const isSaveSuccess = ref<boolean>(false)
  const approvalValue = ref<boolean>(false)
  const deliveryInfoValue = reactive<ProductDeliveryInfoProps>(defaultProductApprovalInfo)
  const { onShowModal } = useProductReasonApproval()
  const { redirectCancelLink } = useProductRedirectLink(type)
  let deliveryInfoSave = {}

  const { openModal: openConfirmModal, closeModalByPop } = useModalConfirm()
  const { openModal: openNotificationModal } = useModalNotification()

  const openCancelModal = () => {
    openConfirmModal({
      content: '상품등록을 취소할 경우 입력한 정보는 저장되지 않습니다. 계속하시겠습니까?',
      onConfirm() {
        router.push(redirectCancelLink.value)
      }
    })
  }

  const openTemporaryStorageModal = () => {
    openNotificationModal({
      content: '입력한 정보가 저장되었습니다.'
    })
  }

  const openSaveModal = () => {
    openNotificationModal({
      content: '배송정보 입력이 완료되었습니다.'
    })
    isSaveSuccess.value = true
    deliveryInfoSave = { ...deliveryInfoValue }
  }

  const onClickApproval = () => {
    if (!deepEqualObject(deliveryInfoSave, deliveryInfoValue)) {
      openNotificationModal({
        content: '입력한 정보를 저장 완료한 후 승인요청 해주세요'
      })
    } else {
      openNotificationModal({
        content: '입력한 정보가 수정되었습니다.'
      })
      approvalValue.value = true
    }
  }

  const openApprovalReject = () => {
    openConfirmModal({
      content: '반려된 상품은 승인요청이 있기 전까지 재승인할 수 없습니다. 선택한 상품을 반려 처리 하시겠습니까?',
      onConfirm: () => {
        // Show modal ProductReasonRejectApprovalModal
        closeModalByPop?.()
        onShowModal()
      }
    })
  }

  const openConfirmApproval = () => {
    openConfirmModal({
      content: '선택한 상품을 승인 하시겠습니까?',
      onConfirm: () => {
        closeModalByPop?.()
        showNotificationConfirmYesApproval()
      }
    })
  }
  const showNotificationConfirmYesApproval = () => {
    openNotificationModal({
      content: '선택한 상품이 승인완료 되었습니다.'
    })
  }

  return {
    isSaveSuccess,
    approvalValue,
    openCancelModal,
    openTemporaryStorageModal,
    openSaveModal,
    onClickApproval,
    deliveryInfoValue,
    openApprovalReject,
    openConfirmApproval
  }
}
