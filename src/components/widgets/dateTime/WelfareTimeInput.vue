<script setup lang="ts">
import WelfareInputMask from '@/components/uikit/input/WelfareInputMask.vue'
import { WelfareTimeInputEmits, WelfareTimeInputProps } from '@/models'
import { useTimeInput } from '@/composables/widgets/dateTimePicker/useTimeInput'

const props = defineProps<WelfareTimeInputProps>()
const emits = defineEmits<WelfareTimeInputEmits>()

const emitsEvent = {
  updateModelValue: (value: any, resetValue: () => void) => {
    emits('update:modelValue', value, resetValue)
  }
}

const { pressTimeKey, modelValue, updateModelValue, handleKeyBackspace } = useTimeInput(props, emitsEvent)
</script>

<template>
  <WelfareInputMask
    v-bind="$props"
    v-on="emits || {}"
    class="wf_w-76"
    :modelValue="modelValue"
    mask="99 : 99"
    placeholder="00 : 00"
    @update:model-value="(value) => updateModelValue(value)"
    size="small"
    @keypress="pressTimeKey"
    @keydown="handleKeyBackspace"
  />
</template>

<style scoped>
@import url('@/assets/css/view/uikit/uikit-date-time-picker-view.css');
@import url('@/assets/css/widgets/dateTime/common-time-input.css');
</style>
