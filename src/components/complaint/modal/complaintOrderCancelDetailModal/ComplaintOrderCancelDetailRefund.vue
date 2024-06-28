<script lang="ts" setup>
import { DataTableContainer } from '@/components'
import FormGroup from '@/components/widgets/form/FormGroup.vue'
import {
  CompaintRefundTextContent,
  ComplaintOrderCancelDetailFormModel,
  ComplaintOrderCancelTableDetailInfoConfig,
  ComplaintOrderCancelTableRestorationConfig
} from '@/models/views/complaint/modal/ComplaintOrderCancelDetailModel'
import {
  DeliveryIssuanceRewardPointProcessTypeModel,
  deliveryRewardPointProcessTypeCodeName
} from '@/models/views/delivery/modal/DeliveryIssuanceDelayInfoModel'
import { FORMAT_DATE_YYYY_MM_DD_HH_mm_ss, formatTime } from '@/common'
import { useComingSoonModal } from '@/composables/widgets/modal/useComingSoonModal'

interface ComplaintOrderCancelDetailRequestTableProps {
  dataOrderCancel?: ComplaintOrderCancelDetailFormModel
}

const { openComingSoonModal } = useComingSoonModal()

const showModalNotification = () => {
  openComingSoonModal()
}

defineProps<ComplaintOrderCancelDetailRequestTableProps>()
</script>

<template>
  <div class="wf_flex wf_flex-row wf_justify-between">
    <p class="wf-body_01-semi wf-pb-12 wf-mt-20">환불방법</p>
    <p class="wf-body_04-reg wf_text-sub-01 wf-pb-12 wf-mt-20">* 주문시 사용하신 결제수단으로 환불됩니다.</p>
  </div>
  <div class="wf-group-filter wf_h-120">
    <div class="wf_flex wf_flex-col wf-mt-0">
      <div class="wf_flex wf_flex-row">
        <div class="wf-width-full">
          <FormGroup label="환불방법 안내" class="wf_h-118" is-rounded-top :is-border-bottom="false" is-rounded-bottom>
            <div class="wf-space-y-3">
              <p v-for="(item, index) in CompaintRefundTextContent" :key="index" class="wf-body_03-mid">
                {{ item.title }} <span class="wf-body_03-reg">:&nbsp;&nbsp; {{ item.content }}</span>
              </p>
            </div>
          </FormGroup>
        </div>
      </div>
    </div>
  </div>

  <DataTableContainer
    class="wf-mt-20"
    :value="dataOrderCancel?.ticketProductRewardPoints ?? []"
    is-select-invisible
    :loading="false"
    :column-configs="ComplaintOrderCancelTableDetailInfoConfig"
    ref="tableRef"
  >
    <template #title>
      <p class="wf-body_01-semi wf-pb-12">적립금 처리 내역</p>
    </template>
    <template #body-no="{ props }">
      {{ props?.index + 1 }}
    </template>
    <template #body-rewardPoint="{ props }">
      {{ DeliveryIssuanceRewardPointProcessTypeModel.SAVING_CANCEL !== props?.data?.rewardPointProcessType ? props?.data?.rewardPoint : '' }}
    </template>
    <template #body-rewardPointProcessType="{ props }">
      {{ deliveryRewardPointProcessTypeCodeName.find((item) => item.value === props?.data?.rewardPointProcessType)?.label }}
    </template>
    <template #body-rewardPointProcessDatetime="{ props }">
      {{
        DeliveryIssuanceRewardPointProcessTypeModel.SAVING_CANCEL !== props?.data?.rewardPointProcessType
          ? props?.data?.rewardPointProcessDatetime && formatTime(props?.data?.rewardPointProcessDatetime, FORMAT_DATE_YYYY_MM_DD_HH_mm_ss)
          : ''
      }}
    </template>
  </DataTableContainer>
  <DataTableContainer
    class="wf-mt-20"
    :value="dataOrderCancel?.ticketProductCoupons ?? []"
    is-select-invisible
    :loading="false"
    :column-configs="ComplaintOrderCancelTableRestorationConfig"
  >
    <template #title>
      <p class="wf-body_01-semi wf-pb-12">복원 쿠폰 정보</p>
    </template>
    <template #body-couponKey="{ props }">
      <p @click="showModalNotification" class="wf_text-sub-02 cursor-pointer wf_text-underline">
        {{ props?.data?.couponKey }}
      </p>
    </template>
    <template #body-validDate="{ props }">
      {{
        (props?.data?.validStartDate && formatTime(props?.data?.validStartDate, FORMAT_DATE_YYYY_MM_DD_HH_mm_ss)) +
        ' - ' +
        (props?.data?.validEndDate && formatTime(props?.data?.validEndDate, FORMAT_DATE_YYYY_MM_DD_HH_mm_ss))
      }}
    </template>
    <template #body-processDatetime="{ props }">
      {{ props?.data?.processDatetime && formatTime(props?.data?.processDatetime, FORMAT_DATE_YYYY_MM_DD_HH_mm_ss) }}
    </template>
  </DataTableContainer>
</template>

<style scoped>
@import url('@/assets/css/view/complaint/modal/complaint-order-cancel-modal.css');
</style>
