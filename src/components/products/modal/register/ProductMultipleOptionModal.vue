<script setup lang="ts">
import { DataTableContainer, WelfareCheckbox } from '@/components/uikit'
import { TextInputNumber, TextInputValidationMaxBytes } from '@/components/widgets'
import { ProductDataHeaderRegisterMultipleOptionConfig, ProductOptionsDeliveryInfo } from '@/models'
import { ref, watch } from 'vue'
import ProductActionRow from './ProductActionRow.vue'

interface Props {
  data?: ProductOptionsDeliveryInfo[]
  checkOption?: boolean
}

interface Emits {
  (e: 'increase-row', index: number): void
  (e: 'decrease-row', index: number): void
  (e: 'update-check-option', value: boolean): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const checkOptionRef = ref(props.checkOption)

const emitsEvent = {
  increaseRow: (index: number) => {
    emits('increase-row', index)
  },
  decreaseRow: (index: number) => {
    emits('decrease-row', index)
  },
  updateCheckOption: (value: boolean) => {
    emits('update-check-option', value)
  }
}

watch(checkOptionRef, (value) => {
  emitsEvent.updateCheckOption(value)
})
</script>

<template>
  <DataTableContainer isSelectInvisible :value="props.data" :column-configs="ProductDataHeaderRegisterMultipleOptionConfig">
    <template #body-no="{ props }">
      <div class="wf-px-4">
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
    <template #body-option1="{ props }">
      <div class="wf-px-2 wf-tr-match-parent">
        <TextInputValidationMaxBytes
            v-model="props.data.option1"
            size="small"
            placeholder="소옵션을 입력해 주세요"
            class="wf_flex-1"
            :max-bytes="30"
          />
      </div>
    </template>
    <template #body-option2="{ props }">
      <div class="wf-px-2 wf-tr-match-parent">
        <TextInputValidationMaxBytes
            v-model="props.data.option2"
            size="small"
            placeholder="옵션을 입력해 주세요."
            class="wf_flex-1"
            :max-bytes="30"
            :disabled="!checkOptionRef"
          />
      </div>
    </template>
    <template #header-option="{ props }">
      {{ props }}
      <span class="wf_text-sub-01">*</span>
    </template>
    <template #header-option1="{ props }">
      {{ props }}
      <span class="wf_text-sub-01">*</span>
    </template>
    <template #header-option2="{ props }">
      <div><WelfareCheckbox size="sm" v-model="checkOptionRef" /></div>
      {{ props }}
    </template>
    <template #body-action="{ props }">
      <ProductActionRow @increase-row="() => emitsEvent.increaseRow(props.index)" @decrease-row="() => emitsEvent.decreaseRow(props.index)" />
    </template>
  </DataTableContainer>
</template>
