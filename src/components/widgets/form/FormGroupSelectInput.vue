<script setup lang="ts">
import { WelfareInputText, WelfareSelect } from '@/components'
import { WelfareSelectOptionType } from '@/models'

interface FormGroupSelectInputProps {
  select?: any
  selectOptions?: WelfareSelectOptionType[]
  optionLabel?: string
  optionValue?: string
  selectPlaceholder?: string
  selectDisabled?: boolean
  selectClass?: string
  input?: any
  inputPlaceholder?: string
  maxLengthInput?: number
  inputDisabled?: boolean
  inputType?: string
}

interface FormGroupSelectInputEmits {
  (e: 'update:select', value: any): void

  (e: 'update:input', value: any): void

  (e: 'keypress', event: any): void
}

withDefaults(defineProps<FormGroupSelectInputProps>(), { selectClass: 'wf_w-180' })
defineEmits<FormGroupSelectInputEmits>()
</script>

<template>
  <div class="wf_flex wf-space-x-6">
    <WelfareSelect
      :model-value="$props.select"
      @update:model-value="(value) => $emit('update:select', value)"
      :options="$props.selectOptions"
      :option-label="$props?.optionLabel"
      :option-value="$props?.optionValue"
      :placeholder="$props.selectPlaceholder"
      :disabled="$props.selectDisabled"
      :class="$props.selectClass"
      small
    />
    <WelfareInputText
      :model-value="$props.input"
      :input-type='inputType'
      @update:model-value="(value) => $emit('update:input', value)"
      @keypress="(event) => $emit('keypress', event)"
      :placeholder="$props.inputPlaceholder"
      :disabled="$props.inputDisabled"
      class="wf_flex-1"
      size="small"
      :max-length="$props.maxLengthInput"
    />
  </div>
</template>
