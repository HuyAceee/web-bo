import { DeliveryIssuanceDelayInfoDetailProps } from '@/models/views/delivery/modal/DeliveryIssuanceDelayInfoDetailModel'
import { deliveryIssuanceDelayInfoDetailApi } from '@/services/api/delivery/DeliveryIssuanceDelayInfoDetailApi'
import { onMounted, ref } from 'vue'

export const useDeliveryIssuanceDelayInfoDetailModalLogic = (props: DeliveryIssuanceDelayInfoDetailProps) => {
  const issueDelayData = ref()

  onMounted(() => {
    getData()
  })
  const getData = () => {
    deliveryIssuanceDelayInfoDetailApi.getIssueDelay(props.receiverProductOrderKey).then((resData) => {
      issueDelayData.value = [
        {
          orderKey: resData.data?.orderKey,
          transactionNumber: resData.data?.transactionNumber,
          productOrderKey: resData.data?.productOrderKey,
          productName: resData.data?.productName,
          optionSmallName: resData.data?.optionSmallName
        }
      ]
    })
  }
  return { issueDelayData }
}
