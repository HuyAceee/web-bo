<script lang="ts" setup>
import { WelfareRadio } from '@/components'
import { WelfareRadioProps } from '@/models'
interface Option {
  value: string
  label: string
  name: string
}

export interface WelfareTNRadioGroupProps extends WelfareRadioProps {
  options: Option[]
  onChange: (value: string) => void
  modelValue: string
}

defineProps<WelfareTNRadioGroupProps>()
</script>
<template>
  <div class="wf_items-center table-news-filter-button-container">
    <div v-for="option of options" :key="option.value">
      <WelfareRadio
        :disabled="disabled"
        :model-value="modelValue"
        :value="option.value"
        :label="option.label"
        :name="option.name"
        size="sm"
        @update:modelValue="onChange"
      />
    </div>
  </div>
</template>
