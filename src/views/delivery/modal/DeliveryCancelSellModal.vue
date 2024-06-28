<!-- BO_E0203_030101_P -->
<script setup lang="ts">
import { HeaderModal, WelfareMdButton, WelfareSelect, TextareaMaxLengthBytes, DataTablePaginationWithCheckbox } from '@/components'
import FormGroup from '@/components/widgets/form/FormGroup.vue'
import {
  deliveryCancelSellInfoHint,
  deliveryCancelSellTableHeaderConfig,
  DeliveryCancelSellModalProps,
  deliveryCancelSellClaimReasonSelectOption
} from '@/models/views/delivery/modal/DeliveryCancelSellModel'
import { formatTextLength } from '@/common'
import Column from 'primevue/column'
import { useDeliveryCancelSellModalLogic } from '@/composables/delivery/modal/useDeliveryCancelSellModalLogic'
import DeliveryHint from '@/components/delivery/modal/DeliveryHint.vue'
const props = defineProps<DeliveryCancelSellModalProps>()
const { cancelSellListData, onRowSelected, onSelectAllChange, submitSaleCancel, tableRef, values, setFieldValue } =
  useDeliveryCancelSellModalLogic(props)
</script>

<template>
  <div class="cancel-cell-modal">
    <HeaderModal title="판매 취소" @close-modal="props.onCancel" />
    <div class="wf-p-20 wf-width-full wf_flex wf_flex-col">
      <DeliveryHint :data="deliveryCancelSellInfoHint" />
      <div class="wf-mt-22 wf-body_01-semi">판매취소 주문 선택</div>
      <DataTablePaginationWithCheckbox
        ref="tableRef"
        :value="cancelSellListData"
        v-on:select-all-change="onSelectAllChange"
        v-on:row-checked-change="onRowSelected"
        :loading="false"
        is-select-invisible
        class="table-custom"
      >
        <template #columns>
          <Column
            v-for="column in deliveryCancelSellTableHeaderConfig"
            :key="column?.field"
            :column-key="column.field"
            class="wf-nowrap"
            :class="column?.class"
          >
            <template #header>
              {{ column.header }}
            </template>
            <template #body="slotProps">
              <span
                v-if="column?.isClick"
                class="wf-underline wf_w-full wf-body_03-reg wf-pointer wf_text-sub-02 text-center"
                :class="slotProps.data?.isDisabled ? 'column-disable-bg' : ''"
              >
                {{ slotProps.data?.[column.field] }}</span
              >
              <p v-else :class="slotProps.data?.isDisabled ? 'column-disable-bg' : ''">
                {{ slotProps.data?.[column.field] ?? '-' }}
              </p>
            </template>
          </Column>
        </template>
      </DataTablePaginationWithCheckbox>
      <div class="wf-btn-border--bg-color-line-gray wf_br-6 wf-mt--7">
        <div class="wf_flex wf_items-center">
          <FormGroup custom-class="wf-pd-unset wf-pl-10" label="판매취소 사유" is-rounded-top is-rounded-bottom>
            <WelfareSelect
              placeholder="발급지연 사유를 선택해 주세요."
              small
              class="wf-w-986"
              option-label="label"
              option-value="value"
              :options="deliveryCancelSellClaimReasonSelectOption"
              :modelValue="values.issueDelayReason"
              @update:modelValue="(value) => setFieldValue('issueDelayReason', value)"
            />
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup
            custom-class="wf-pd-unset wf-pl-10 pl-13"
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
        <WelfareMdButton class="wf_w-120" label="닫기" button-type="cancel" @onClick="props.onCancel" />
        <WelfareMdButton class="wf_w-120" label="취소신청" button-type="default" @on-click="submitSaleCancel" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/delivery/modal/delivery-cancel-sell.css');
</style>
