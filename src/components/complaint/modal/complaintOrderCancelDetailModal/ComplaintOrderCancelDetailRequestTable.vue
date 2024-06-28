<script lang="ts" setup>
import { DataTableContainer, WelfareMdButton } from '@/components'
import { PRODUCT_TICKET_REGISTRATION } from '@/common'
import { useComplaintCancellationFeeChangeWrapperModal } from '@/composables/complaint/modal/useComplaintCancellationFeeChangeWrapperModal'
import { computed, Ref } from 'vue'
import {
  ComplaintOrderCancelDetailFormModel,
  ComplaintOrderCancelTableInfoConfig,
  ComplaintOrderCancelTableInfoModel
} from '@/models/views/complaint/modal/ComplaintOrderCancelDetailModel'

interface ComplaintOrderCancelDetailRequestTableProps {
  dataOrderCancel?: ComplaintOrderCancelDetailFormModel
}

interface ComplaintOrderCancelDetailRequestTableEmits {
  (e: 'submitSuccess'): void
}

const emits = defineEmits<ComplaintOrderCancelDetailRequestTableEmits>()

const emitEvent = {
  onSubmitSuccess: () => {
    emits('submitSuccess')
  }
}

const props = defineProps<ComplaintOrderCancelDetailRequestTableProps>()

const { openModal } = useComplaintCancellationFeeChangeWrapperModal()

const openModalSubmit = () => {
  if (props?.dataOrderCancel?.claimKey && props?.dataOrderCancel?.claimTicketDetails?.[0]?.cancelFeeAmount) {
    openModal(
      props?.dataOrderCancel?.claimKey?.toString(),
      props?.dataOrderCancel?.claimTicketDetails?.[0]?.cancelFeeAmount?.toString(),
      emitEvent.onSubmitSuccess
    )
  }
}

const dataTable: Ref<ComplaintOrderCancelTableInfoModel[]> = computed(() => {
  return props.dataOrderCancel
    ? [
        {
          orderKey: props?.dataOrderCancel?.orderProductKey,
          productKey: props?.dataOrderCancel?.productKey,
          productName: props?.dataOrderCancel?.productName,
          optionLargeName:
            (props?.dataOrderCancel?.optionLargeName ?? '-') +
            '/' +
            (props?.dataOrderCancel?.optionMediumName ?? '-') +
            '/' +
            (props?.dataOrderCancel?.optionSmallName ?? '-')
        }
      ]
    : []
})
</script>

<template>
  <DataTableContainer
    class="wf-mt-20"
    :value="dataTable"
    is-select-invisible
    :loading="false"
    :column-configs="ComplaintOrderCancelTableInfoConfig"
    ref="tableRef"
  >
    <template #title>
      <p class="wf-body_01-semi">클레임 상품정보</p>
    </template>

    <template #body-productKey>
      <router-link
        :to="{ path: `${PRODUCT_TICKET_REGISTRATION}`, query: { productKey: dataOrderCancel?.productKey } }"
        target="_blank"
        class="wf-body_03-reg wf_text-sub-02 wf-underline wf-pointer"
      >
        {{ dataOrderCancel?.productKey }}
      </router-link>
    </template>

    <template #buttons>
      <div class="wf-space-x-6 wf_flex wf_justify-center wf_items-center">
        <WelfareMdButton label="취소수수료 변경" button-size="small" class="wf_w-102" buttonType="liner" @on-click="openModalSubmit" />
      </div>
    </template>
  </DataTableContainer>
</template>

<style scoped>
@import url('@/assets/css/view/complaint/modal/complaint-order-cancel-modal.css');
</style>
