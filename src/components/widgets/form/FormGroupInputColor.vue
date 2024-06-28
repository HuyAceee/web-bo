<script setup lang="ts">
import { WelfareInputText } from '@/components/uikit'
interface FormGroupInputColorProps {
  modelValue?: string
  gap?: number
  size?: 'sm' | 'lg'
  disabled?: boolean
  classInput?: string
  classColor?: string
  placeholder?: string
}

interface FormGroupInputColorEmits {
  (e: 'update:modelValue', value: string): void
}

withDefaults(defineProps<FormGroupInputColorProps>(), { gap: 6, size: 'sm', classInput: 'wf_w-180', classColor: 'wf_w-80' })
defineEmits<FormGroupInputColorEmits>()
</script>

<template>
  <div class="wf_flex" :class="[`wf-space-x-${gap}`]">
    <WelfareInputText
      :class="$props.classInput"
      :size="$props.size == 'sm' ? 'small' : 'large'"
      :disabled="$props.disabled"
      :placeholder="$props.placeholder || ' '"
      :modelValue="$props.modelValue"
      @update:modelValue="(value) => $emit('update:modelValue', value)"
    />
    <div>
      <input
        class="p-inputtext p-input-color wf_h-full"
        :class="$props.classColor"
        type="color"
        :disabled="$props.disabled"
        :value="$props.modelValue"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      />
    </div>
  </div>
</template>
