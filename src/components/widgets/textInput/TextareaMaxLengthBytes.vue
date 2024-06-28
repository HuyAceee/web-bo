<script setup lang="ts">
import { WelfareTextarea } from '@/components/uikit'
import { useInputValidationMaxBytes } from '@/composables/widgets/input/useInputValidationMaxBytes'
import { InputValidationMaxBytesProps, WelfareTextareaEmits } from '@/models'

const props = defineProps<InputValidationMaxBytesProps>()
defineEmits<WelfareTextareaEmits>()

const { countLabelRight, currentText, inputElement, maxLengthRef, onKeyPress } = useInputValidationMaxBytes(props)
</script>

<template>
  <WelfareTextarea
    ref="inputElement"
    v-bind="props"
    :label-bottom-right="countLabelRight"
    v-model="currentText"
    @update:model-value="(value) => $emit('update:modelValue', value)"
    @keypress="onKeyPress"
    :max-length="maxLengthRef"
  />
</template>
