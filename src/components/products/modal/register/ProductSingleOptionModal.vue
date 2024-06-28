<script setup lang="ts">
import { DataTableContainer } from '@/components'
import { TextInputNumber, TextInputValidationMaxBytes } from '@/components/widgets'
import { ProductDataHeaderRegisterSingleOptionConfig, ProductOptionsDeliveryInfo } from '@/models'
import ProductActionRow from './ProductActionRow.vue'

interface Props {
  data?: ProductOptionsDeliveryInfo[]
}

interface Emits {
  (e: 'increase-row', index: number): void
  (e: 'decrease-row', index: number): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const emitsEvent = {
  increaseRow: (index: number) => {
    emits('increase-row', index)
  },
  decreaseRow: (index: number) => {
    emits('decrease-row', index)
  }
}
</script>

<template>
  <DataTableContainer isSelectInvisible :value="props.data" :column-configs="ProductDataHeaderRegisterSingleOptionConfig">
    <template #body-no="{ props }">
      <div class="wf-px-4 wf-pr-4 wf_w-69">
        <TextInputNumber name="" size="small" placeholder="00" v-model="props.data.no" should-check-press-key format-value />
      </div>
    </template>
    <template #body-optionId="{ props }">
      {{ props.data.optionId || '-' }}
    </template>
    <template #body-option="{ props }">
      <div class="wf-px-2 wf-tr-match-parent">
        <TextInputValidationMaxBytes
            v-model="props.data.option"
            size="small"
            placeholder="소옵션을 입력해 주세요."
            class="wf_flex-1"
            :max-bytes="30"
          />
      </div>
    </template>
    <template #header-option="{ props }">
      {{ props }}
      <span class="wf_text-sub-01">*</span>
    </template>
    <template #body-action="{ props }">
      <ProductActionRow @increase-row="() => emitsEvent.increaseRow(props.index)" @decrease-row="() => emitsEvent.decreaseRow(props.index)" />
    </template>
  </DataTableContainer>
</template>
