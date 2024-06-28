import { useModalConfirm, useModalNotification, useCheckBoxTable } from '@/composables'
import { deliveryCancelSellModalApi } from '@/services/api/delivery/DeliveryCancelSellModalApi'
import { ref, computed, onMounted } from 'vue'
import { useForm } from 'vee-validate'
import { renderLabelEnum } from '@/common'
import { string } from 'yup'
import { DeliveryHintModel } from '@/models/views/delivery/modal/DeliveryHintModel'
import {
  deliveryCancelSellHint,
  DeliveryCancelSellModalProps,
  DeliveryCancelSellModel,
  DeliveryCancelSellContainModel,
  deliveryFailureList,
  DeliveryOrderProcessStatusModel,
  DeliveryCancelSellInfoModel
} from '@/models/views/delivery/modal/DeliveryCancelSellModel'
import { deliveryOrderProcessStatusCommonCodeName } from '@/models/views/delivery/modal/DeliveryIssuanceDelayInfoModel'
import { useProductModalErrorResultInfo } from '../useProductModalErrorResultInfo'
export const useDeliveryCancelSellModalLogic = (props: DeliveryCancelSellModalProps) => {
  const { onShowModal: onShowModalError } = useProductModalErrorResultInfo()
  const claimDetailReason = ref<string>()
  const reasonContents = ref<string>()
  const notificationModal = useModalNotification()
  const confirmModal = useModalConfirm()
  const cancelSellListData = ref<DeliveryCancelSellContainModel[]>([])
  const tableRef = ref()
  const { values, setFieldValue } = useForm<DeliveryCancelSellInfoModel>({
    validationSchema: {
      issueDelayReason: string(),
      reasonContents: string()
    }
  })
  const listId = computed(() => {
    return cancelSellListData.value?.map((item: DeliveryCancelSellContainModel) => item.id.toString()) ?? []
  })
  const { listChecked, onRowSelected, onSelectAllChange } = useCheckBoxTable(listId)

  const submitSaleCancel = () => {
    confirmModal.openModal({
      content: '선택한 주문에 대해 발급지연 안내를 하시겠습니까?',
      onConfirm() {
        pushDataCancelSell()
      }
    })
  }
  // const emptyFeeNotify = () => {
  //   notificationModal.openModal({
  //     content: '<p>먼저 원하는 주문을 선택 후</p><p>[판매취소] 버튼을 클릭해 주세요.</p>'
  //   })
  // }

  // const tooHighFeeNotify = async () => {
  //   confirmModal.openModal({
  //     content: '선택한 주문에 대해 발급지연 안내를 하시겠습니까?',
  //     onConfirm() {
  //       pushDataCancelSell()
  //     }
  //   })
  // }
  const pushDataCancelSell = () => {
    const receiverProductOrderKeys = cancelSellListData.value.filter((x) => x.isSelected).map((item) => item.receiverProductOrderKey)
    if (props.orderKey) {
      deliveryCancelSellModalApi
        .putCancelSell(props.orderKey, receiverProductOrderKeys, values?.issueDelayReason ?? '', values?.reasonContents ?? '')
        .then(() => {
          notificationModal.openModal({
            content: '<p>판매취소 신청에 성공하였습니다.</p><p>[클레임관리]에서 다음 업무를 진행해 주세요.</p>',
            onAccept() {
              confirmModal?.closeAllModal?.()
            }
          })
        })
        .catch(() => {
          if (deliveryFailureList?.length > 0 && deliveryFailureList?.length <= receiverProductOrderKeys.length) {
            const failureRes: DeliveryHintModel[] = [
              {
                content: '판매취소 신청 결과 ' + deliveryFailureList?.length + ' 개 실패하였습니다.',
                isEmphasize: false
              }
            ]
            const deliveryCancelSellHintData: DeliveryHintModel[] = [...failureRes, ...deliveryCancelSellHint]
            onShowModalError?.(deliveryFailureList, deliveryCancelSellHintData)
          } else confirmModal?.closeModalByPop?.()
        })
    }
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
  const loadData = async () => {
    deliveryCancelSellModalApi.getDetailCancelSell(props.receiverProductOrderKeys).then((res) => {
      const dataCancelSell: DeliveryCancelSellModel[] = res.data
      cancelSellListData.value = dataCancelSell.map((it: DeliveryCancelSellModel): DeliveryCancelSellContainModel => {
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
      listChecked.value = cancelSellListData.value.filter((item) => !item.isDisabled).map((item) => item.receiverProductOrderKey.toString())
      tableRef.value?.selectAllItem()
    })
  }
  onMounted(() => {
    loadData()
  })
  return {
    values,
    setFieldValue,
    submitSaleCancel,
    cancelSellListData,
    onRowSelected,
    onSelectAllChange,
    listChecked,
    claimDetailReason,
    reasonContents,
    tableRef
  }
}
