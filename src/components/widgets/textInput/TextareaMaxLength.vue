<script setup lang="ts">
import { WelfareTextarea } from '@/components/uikit'
import { useInputValidationMaxLength } from '@/composables/widgets/input/useInputValidationMaxLength'
import { InputValidationMaxLengthProps, WelfareTextareaEmits } from '@/models'

const props = defineProps<InputValidationMaxLengthProps>()
const emits = defineEmits<WelfareTextareaEmits>()

const { inputElement, currentText, onKeyPress } = useInputValidationMaxLength(props)
</script>

<template>
  <WelfareTextarea
    ref="inputElement"
    v-bind="props"
    v-model="currentText"
    :readonly="props.readonly"
    @update:model-value="(value) => emits('update:modelValue', value)"
    @keypress="onKeyPress"
    :placeholder="placeholder"
    :disabled="props.disabled"
    :maxLength="props.maxLength"
  />
</template>
