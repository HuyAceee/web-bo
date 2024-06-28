import { useForm } from 'vee-validate'
import { BaseModelErrorResponse } from '@/models/services/responses/BaseModelResponse'
import { string } from 'yup'
import { useCheckBoxTable, useModalConfirm, useModalNotification } from '@/composables'
import { computed, onMounted, ref } from 'vue'
import { deliveryIssueDelayTargetsApi } from '@/services/api/delivery/DeliveryIssueDelayTargetsApi'
import { renderLabelEnum } from '@/common'
import { DeliveryCancelSellModel, DeliveryOrderProcessStatusModel } from '@/models/views/delivery/modal/DeliveryCancelSellModel'
import {
  DeliveryIssuanceDelayInfoProps,
  DeliveryIssueDelayTargetsTableModel,
  deliveryOrderProcessStatusCommonCodeName,
  DeliveryIssuanceDelayInfoModel
} from '@/models/views/delivery/modal/DeliveryIssuanceDelayInfoModel'
import { useProductModalErrorResultInfo } from '../useProductModalErrorResultInfo'

export const useDeliveryIssuanceDelayInfoModalLogic = (props: DeliveryIssuanceDelayInfoProps) => {
  const { values, setFieldValue } = useForm<DeliveryIssuanceDelayInfoModel>({
    validationSchema: {
      issueDelayReason: string()
    }
  })
  const issueDelayTargets = ref<DeliveryIssueDelayTargetsTableModel[]>()
  const listId = computed(() => {
    return issueDelayTargets.value?.map((item: DeliveryIssueDelayTargetsTableModel) => item.id.toString()) ?? []
  })
  const { onRowSelected, onSelectAllChange } = useCheckBoxTable(listId)
  const tableRef = ref()
  const notificationModal = useModalNotification()
  const confirmModal = useModalConfirm()
  const errorInfoModal = useProductModalErrorResultInfo()

  const loadData = () => {
    deliveryIssueDelayTargetsApi.getIssueDelayTargets(props.receiverProductOrderKeys).then((resData) => {
      issueDelayTargets.value = resData.data.map((it: DeliveryCancelSellModel): DeliveryIssueDelayTargetsTableModel => {
        const orderStatus = renderLabelEnum(deliveryOrderProcessStatusCommonCodeName, it?.orderStatus ? it?.orderStatus : '')
        const claimStatus = renderLabelEnum(deliveryOrderProcessStatusCommonCodeName, it?.claimStatus ? it?.claimStatus : '')
        return {
          ...it,
          id: it?.receiverProductOrderKey,
          orderStatus: orderStatus,
          claimStatus: claimStatus,
          isSelected: !isCancelSell(it?.orderStatus) || !isCancelSell(it?.claimStatus),
          isDisabled: isCancelSell(it?.orderStatus) || isCancelSell(it?.claimStatus)
        }
      })

      tableRef.value?.selectAllItem()
    })
  }

  const onRegister = () => {
    confirmModal.openModal({
      content: '<p>선택한 주문에 대해 발급지연 안내를 하시겠습니까?</p>',
      onConfirm() {
        registerNotificationOfDelayedRelease()
      }
    })
  }

  const registerNotificationOfDelayedRelease = () => {
    const promises: Promise<BaseModelErrorResponse>[] = []
    const error: number[] = []
    const requestIds: number[] = []
    if (issueDelayTargets.value) {
      for (const target of issueDelayTargets.value) {
        requestIds.push(target.receiverProductOrderKey)
        promises.push(
          deliveryIssueDelayTargetsApi.putIssueDelay(target.receiverProductOrderKey, {
            reasonContents: values.reasonContents,
            issueDelayReason: values.issueDelayReason?.value
          })
        )
      }
    }

    Promise.allSettled(promises).then((value) => {
      for (const [index, it] of value.entries()) {
        if (it.status === 'rejected') {
          error.push(requestIds[index])
        }
      }
      const success = requestIds.length - error.length
      if (error.length > 0) {
        informationOnIssuanceDelayFailed(error.length, success, error)
      } else {
        informationOnIssuanceDelaySuccess()
      }
    })
  }

  const informationOnIssuanceDelaySuccess = () => {
    notificationModal.openModal({
      content: '<p>발급지연 안내에 성공하였습니다</p><p>결제일로부터 3일 이내에 티켓발급 처리가</p><p>필요합니다.</p>',
      onAccept() {
        notificationModal.closeAllModal?.()
      }
    })
  }

  const informationOnIssuanceDelayFailed = (error: number, success: number, errorIds: number[]) => {
    notificationModal.openModal({
      content: '<p>발급지연 안내에 실패하였습니다.</p><p>발급 지연이 가능한 상태인지 재확인해 주세요.</p>',
      onAccept() {
        errorInfoModal.onShowModal(
          [
            {
              errorLabel: '실패 내역',
              errorContent: errorIds.join(', ')
            }
          ],
          [
            { content: `발급지연 안내 결과 ${success}개 성공, ${error}개 실패하였습니다.` },
            { content: '발급 지연이 가능한 상태인지 재확인해 주세요.' }
          ]
        )
      }
    })
  }

  const isCancelSell = (status?: string | null) => {
    return (
      status === DeliveryOrderProcessStatusModel.ISSUE_COMPLETE ||
      status === DeliveryOrderProcessStatusModel.ORDER_CANCEL ||
      status === DeliveryOrderProcessStatusModel.SALE_CANCEL ||
      status === DeliveryOrderProcessStatusModel.DISUSE_FAIL ||
      status === DeliveryOrderProcessStatusModel.REFUND_FAIL ||
      status === DeliveryOrderProcessStatusModel.REFUND_COMPLETE
    )
  }

  onMounted(() => {
    loadData()
  })

  return { values, onRowSelected, onSelectAllChange, issueDelayTargets, setFieldValue, onRegister, tableRef }
}
