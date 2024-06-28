<script lang="ts" setup>
import { TEXTAREA_NUMBER_200 } from '@/common';
import {WelfareTextarea } from '@/components'
import { WelfareTextareaEmits, WelfareTextareaProps } from '@/models';

interface TNInputUpdateValueProps extends WelfareTextareaProps {
  maxlength?: number
}

const props = withDefaults(defineProps<TNInputUpdateValueProps>(), {
  maxlength: TEXTAREA_NUMBER_200
})

const emit = defineEmits<WelfareTextareaEmits>()

const emitEvent = (value: any) => {
  emit('update:modelValue', value)
}

const renderValueLength = () => {
  return `${new TextEncoder().encode(props.modelValue).length}/${props.maxlength} bytes`
}
</script>

<template>
  <div class="wf-tn-input-update-container">
    <WelfareTextarea  v-bind="props" inputType="text"  @update:modelValue="emitEvent" />
    <p class="wf_text-n-33 wf-body_04-reg">
      {{ renderValueLength() }}
    </p>
  </div>
</template>
