<script setup lang="ts">
import { WelfareInputText } from '@/components'
import { useTextInputMaxLengthValidation } from '@/composables/widgets/input/useTextInputMaxLengthValidation'
import { WelfareInputEmits, WelfareInputMaxLengthValidationProps } from '@/models'

const props = defineProps<WelfareInputMaxLengthValidationProps>()
const emits = defineEmits<WelfareInputEmits>()

const emitEvents = {
  updateModelValue: (value: any) => {
    emits('update:modelValue', value)
  }
}

const { acceptMaxLength, maxLengthInput } = useTextInputMaxLengthValidation(props, emits)
</script>

<template>
  <WelfareInputText
    v-bind="$props || {}"
    :v-on="$emit || {}"
    @keypress="acceptMaxLength"
    :model-value="props.modelValue"
    @update:model-value="emitEvents.updateModelValue"
    :max-length="maxLengthInput"
  />
</template>
