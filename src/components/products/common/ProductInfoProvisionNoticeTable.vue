<script setup lang="ts">
import { DataTableContainer, TextInputNumber, WelfareMdButton } from '@/components'
import { ProductDeliveryDetailsDataRow, WelfareDataTableProps } from '@/models'
import { productInfoProvisionNoticeHeaderTableConfig } from '@/models/views/products/common/ProductInfoProvisionNoticeTableModel'
import TextareaMaxLengthBytes from '@/components/widgets/textInput/TextareaMaxLengthBytes.vue'

export interface ProductInfoProvisionNoticeTableProps extends WelfareDataTableProps {
  data: ProductDeliveryDetailsDataRow[] | undefined
}

export interface ProductInfoProvisionNoticeTableEmits {
  (e: 'setFormData', index: number, field: keyof ProductDeliveryDetailsDataRow, value: any): void

  (e: 'onIncreaseItem'): void

  (e: 'onDeleteItem', index: number): void
}

defineProps<ProductInfoProvisionNoticeTableProps>()
defineEmits<ProductInfoProvisionNoticeTableEmits>()
</script>
<template>
  <div ref="parentRef">
    <DataTableContainer
      class="wf-mt-20 wf-product-info-provision-notice-table"
      :value="$props.data"
      is-select-invisible
      :loading="false"
      :column-configs="productInfoProvisionNoticeHeaderTableConfig"
      ref="tableRef"
    >
      <template #[`header-${header.field}`] v-for="(header, i) in productInfoProvisionNoticeHeaderTableConfig" v-bind:key="i">
        <p class="wf-body_02-semi wf_flex wf_justify-center">
          {{ header.header }} <span class="wf_text-sub-01" v-if="header.required">*&nbsp;</span>
        </p>
      </template>
      <template #body-order="{ props }">
        <TextInputNumber
          placeholder="00"
          format-value
          should-check-press-key
          :max-length="2"
          size="small"
          class="inp-number wf_justify-center"
          :modelValue="props?.data?.order"
          @update:modelValue="(val: any) => $emit('setFormData', props.index, 'order', val)"
        />
      </template>
      <template #body-item="{ props }">
        <TextareaMaxLengthBytes
          placeholder="한글 기준 250자 이내로 입력해 주세요."
          class="inp-content-des"
          :model-value="props?.data?.item"
          @update:modelValue="(val: any) => $emit('setFormData', props.index, 'item', val)"
          should-check-press-key
          message-warning='한글 기준 250자 이내로 입력 해주세요.'
          :max-bytes="500"
          hidden-lablel-right
        />
      </template>
      <template #body-description="{ props }">
        <TextareaMaxLengthBytes
          placeholder="한글 기준 500자 이내로 입력 해 주세요."
          class="inp-content-des"
          :modelValue="props.data.description"
          message-warning='한글 기준 500자 이내로 입력 해주세요.'
          @update:modelValue="(val: any) => $emit('setFormData', props.index, 'description', val)"
          should-check-press-key
          hidden-lablel-right
          :max-bytes="1000"
        />
      </template>
      <template #body-button="{ props }">
        <div class="wf_flex wf_flex-row wf-ml-4 action-btn wf_items-center">
          <WelfareMdButton label="추가" buttonType="neutral" class="wf-mr-4" button-size="small" @click="() => $emit('onIncreaseItem')" />
          <WelfareMdButton
            label="삭제"
            buttonType="neutral"
            button-size="small"
            @click="() => $emit('onDeleteItem', props.index)"
            :disabled="$props.data?.length === 1"
          />
        </div>
      </template>
    </DataTableContainer>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/product/deliveryProduct/product-approval-list.css');
@import url('@/assets/css/view/product/common/product-info-provision-notice-table.css');
</style>