import { deepEqualObject } from '@/common'
import { useModalConfirm, useModalNotification } from '@/composables'
import { reactive, ref } from 'vue'

export interface ProductDeliveryInfoProps {
  shipAddressName: string
  shipInfo: string
  returnAddressName: string
  returnPeriod: string
  returnInfo: string
  exchangeAddressName: string
  exchangePeriod: string
  exchangeInfo: string
}

const defaultDeliveryInfo = {
  shipAddressName: '1',
  shipInfo: '',
  returnAddressName: '1',
  returnPeriod: '',
  returnInfo: '',
  exchangeAddressName: '1',
  exchangePeriod: '',
  exchangeInfo: ''
}
export const useProductDeliveryInfo = () => {
  const isSaveSuccess = ref<boolean>(false)
  const approvalValue = ref<boolean>(false)
  const deliveryInfoValue = reactive<ProductDeliveryInfoProps>(defaultDeliveryInfo)
  let deliveryInfoSave = {}

  const { openModal: openConfirmModal } = useModalConfirm()
  const { openModal: openNotificationModal } = useModalNotification()

  const openCancelModal = () => {
    openConfirmModal({
      content: '상품등록을 취소할 경우 입력한 정보는 저장되지 않습니다. 계속하시겠습니까?'
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

  return {
    isSaveSuccess,
    approvalValue,
    openCancelModal,
    openTemporaryStorageModal,
    openSaveModal,
    onClickApproval,
    deliveryInfoValue
  }
}
