<script setup lang="ts">
import { WelfareInputText } from '@/components'
import { WelfareInputMaxLengthValidationProps } from '@/models'
import { useInputValidationMaxLength } from '@/composables/widgets/input/useInputValidationMaxLength'

const props = defineProps<WelfareInputMaxLengthValidationProps>()
const { currentText, onKeyPress, inputElement } = useInputValidationMaxLength(props)
</script>

<template>
  <WelfareInputText
    ref="inputElement"
    v-bind="props"
    :v-on="$emit || {}"
    v-model="currentText"
    @update:model-value="(value) => $emit('update:modelValue', value)"
    @keypress="onKeyPress"
  />
</template>
