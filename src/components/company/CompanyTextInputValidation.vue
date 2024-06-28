<script setup lang="ts">
import { WelfareInputText } from '@/components'
import { useCompanyTextInputValidation } from '@/composables/company/useCompanyTextInputValidation'
import { WelfareInputEmits, WelfareInputMaxLengthValidationProps } from '@/models'

const props = defineProps<WelfareInputMaxLengthValidationProps>()
const emits = defineEmits<WelfareInputEmits>()

const emitEvents = {
  updateModelValue: (value: any) => {
    emits('update:modelValue', value)
  }
}

const { acceptMaxLength } = useCompanyTextInputValidation(props, emits)
</script>

<template>
  <WelfareInputText
    v-bind="$props || {}"
    :v-on="$emit || {}"
    @keypress="(event) => acceptMaxLength(event, event.key)"
    :model-value="props.modelValue"
    @update:model-value="emitEvents.updateModelValue"
    @paste="
      (event: ClipboardEvent) => {
        if (props.onValidateContent && !props.onValidateContent(event.clipboardData?.getData('text/plain'))) {
          event.preventDefault()
        }
        acceptMaxLength(event, event.clipboardData?.getData('text/plain'))
      }
    "
    :max-length="undefined"
  />
</template>
