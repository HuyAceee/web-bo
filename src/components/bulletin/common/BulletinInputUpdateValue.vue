<script lang="ts" setup>
import { TEXT_MAX_NUMBER_60 } from '@/common'
import { WelfareInputText } from '@/components'
import { WelfareInputEmits, WelfareInputProps } from '@/models'

interface TNInputUpdateValueProps extends WelfareInputProps {
  maxlength?: number
  modelValue?: string
}

const props = withDefaults(defineProps<TNInputUpdateValueProps>(), {
  maxlength: TEXT_MAX_NUMBER_60
})

const emit = defineEmits<WelfareInputEmits>()

const emitEvent = (value: any) => {
  emit('update:modelValue', value)
}

const renderValueLength = () => {
  return `${new TextEncoder().encode(props.modelValue).length}/${props.maxlength} bytes`
}
</script>

<template>
  <div class="wf-tn-input-update-container">
    <WelfareInputText v-bind="props" inputType="text" @update:modelValue="emitEvent" />
    <p class="wf_text-n-33 wf-body_04-reg">
      {{ renderValueLength() }}
    </p>
  </div>
</template>
