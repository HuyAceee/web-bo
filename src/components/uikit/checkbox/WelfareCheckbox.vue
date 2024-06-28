<script setup lang="ts">
import IconCheckbox from '@/components/icons/IconCheckbox.vue'
import { WelfareCheckboxEmits, WelfareCheckboxProps } from '@/models'
import Checkbox, { CheckboxContext } from 'primevue/checkbox'
withDefaults(defineProps<WelfareCheckboxProps>(), {
  size: 'md',
  binary: true
})
defineEmits<WelfareCheckboxEmits>()
const getCheckboxPT = (size: 'sm' | 'md' = 'md') => ({
  root: {
    class: ['p-checkbox', { 'p-checkbox-sm': size === 'sm' }]
  },
  input: ({ context }: { context: CheckboxContext }) => ({
    class: ['p-checkbox-box', { 'p-checkbox-box-checked': context.checked, 'p-checkbox-box-disabled': context.disabled }]
  })
})
</script>

<template>
  <label class="p-checkbox-container">
    <Checkbox
      v-bind="$props"
      :aria-checked="$props.modelValue"
      :model-value="$props.modelValue"
      @input="(value) => $emit('update:modelValue', value)"
      @click.prevent="(event) => $emit('click', event)"
      @change.prevent="(event) => $emit('change', event)"
      @update:page="(value) => $emit('update:page', value)"
      :pt="getCheckboxPT($props.size)"
    >
      <template v-slot:icon>
        <IconCheckbox class="p-checkbox-icon" />
      </template>
    </Checkbox>
    <span
      v-if="!!$props.label"
      class="p-checkbox-label"
      :class="{ 'p-checkbox-label-sm': $props.size === 'sm', 'p-checkbox-label-disabled': $props.disabled }"
    >
      {{ $props.label }}
    </span>
  </label>
</template>
