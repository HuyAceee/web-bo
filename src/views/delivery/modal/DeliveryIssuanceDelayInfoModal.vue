<!-- BO_E0203_040101_P -->
<script setup lang="ts">
import { DataTablePaginationWithCheckbox, HeaderModal, TextareaMaxLengthBytes, WelfareMdButton, WelfareSelect } from '@/components'
import FormGroup from '@/components/widgets/form/FormGroup.vue'
import { formatTextLength } from '@/common'
import Column from 'primevue/column'
import { useDeliveryIssuanceDelayInfoModalLogic } from '@/composables/delivery/modal/useDeliveryIssuanceDelayInfoModalLogic'
import DeliveryHint from '@/components/delivery/modal/DeliveryHint.vue'
import { deliveryCancelSellTableHeaderConfig } from '@/models/views/delivery/modal/DeliveryCancelSellModel'
import {
  deliveryIssuanceDelayInfoHint,
  DeliveryIssuanceDelayInfoProps,
  deliveryReasonForDelayInIssuanceSelectOption
} from '@/models/views/delivery/modal/DeliveryIssuanceDelayInfoModel'

const props = defineProps<DeliveryIssuanceDelayInfoProps>()
const { onSelectAllChange, onRowSelected, issueDelayTargets, values, setFieldValue, onRegister, tableRef } =
  useDeliveryIssuanceDelayInfoModalLogic(props)
</script>

<template>
  <div class="issuance-delay-info-modal wf_text-n-33">
    <HeaderModal title="발급 지연 안내" @close-modal="props.onClose" />
    <div class="wf-p-20 wf-width-full wf_flex wf_flex-col">
      <DeliveryHint :data="deliveryIssuanceDelayInfoHint" />
      <div class="wf-body_01-semi wf-mt-22">발급 지연 안내 주문 선택</div>
      <DataTablePaginationWithCheckbox
        ref="tableRef"
        :value="issueDelayTargets"
        @select-all-change="onSelectAllChange"
        @row-checked-change="onRowSelected"
        no-data-label="조회내용이 없습니다."
        class="wf-mt--4"
        :loading="false"
        is-select-invisible
      >
        <template #columns>
          <Column
            v-for="header in deliveryCancelSellTableHeaderConfig"
            :key="header.field"
            :column-key="header.field"
            :header="header.header"
            :field="header.field"
            :class="header.class"
          >
            <template #body="slotProps">
              <p
                v-if="
                  [
                    'receiverProductOrderKey',
                    'transactionNumber',
                    'productKey',
                    'productOrderKey',
                    'productName',
                    'orderStatus',
                    'claimStatus'
                  ].includes(header.field) && slotProps.data?.[header.field]
                "
                class="wf-text_link"
                :class="slotProps.data?.isDisabled ? 'column-disable-bg' : ''"
              >
                {{ slotProps.data?.[header.field] }}
              </p>
              <p v-else-if="slotProps.data?.[header.field]" :class="slotProps.data?.isDisabled ? 'column-disable-bg' : ''">
                {{ slotProps.data?.[header.field] }}
              </p>
              <p v-else :class="slotProps.data?.isDisabled ? 'column-disable-bg' : ''">-</p>
            </template>
          </Column>
        </template>
      </DataTablePaginationWithCheckbox>
      <div class="wf-btn-border--bg-color-line-gray wf_br-6 wf-mt--7">
        <div class="wf_flex wf_items-center">
          <FormGroup custom-class="wf-pd-unset wf-pl-10" label="발급 지연 사유" is-rounded-top is-rounded-bottom>
            <WelfareSelect
              placeholder="발급지연 사유를 선택해 주세요."
              small
              class="wf-w-986"
              option-label="label"
              :options="deliveryReasonForDelayInIssuanceSelectOption"
              :modelValue="values.issueDelayReason"
              @update:modelValue="(value) => setFieldValue('issueDelayReason', value)"
            />
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup
            custom-class="wf-pd-unset wf-pl-10"
            label="안내 메모"
            class="wf-h-151"
            is-rounded-top
            is-rounded-bottom
            :is-border-bottom="false"
          >
            <TextareaMaxLengthBytes
              :modelValue="values.reasonContents"
              @update:model-value="(value) => setFieldValue('reasonContents', value)"
              class="wf-introduction"
              placeholder="구매자에게 전달할 메모입니다."
              label-bottom-left="* 안내 메모는 구매자에게 노출됩니다. 신중하게 작성해 주세요."
              :label-bottom-right="formatTextLength(values.reasonContents, 500)"
              :max-bytes="500"
            />
          </FormGroup>
        </div>
      </div>
      <div class="wf_flex wf_flex-row wf_justify-center wf-space-x-4 wf_flex-grow wf_w-full wf-mt-20">
        <WelfareMdButton class="wf_w-120" label="닫기" button-type="cancel" @on-click="props.onClose()" />
        <WelfareMdButton class="wf_w-120" label="발급지연안내 등록" button-type="default" @on-click="onRegister" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/delivery/modal/delivery-issuance-delay-info-modal.css');
@import url('@/assets/css/widgets/dataTable/data-table-container.css');
</style>
