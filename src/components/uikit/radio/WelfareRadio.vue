<script setup lang="ts">
import RadioButton from 'primevue/radiobutton'
import { WelfareRadioEmits, WelfareRadioProps } from '@/models'
import { getRadioButtonPT } from './radio'

withDefaults(defineProps<WelfareRadioProps>(), {
  size: 'md'
})
defineEmits<WelfareRadioEmits>()
</script>

<template>
  <label class="p-radiobutton-container">
    <RadioButton
      v-bind="$props"
      :model-value="$props.modelValue"
      @update:model-value="(value: any) => $emit('update:modelValue', value)"
      @click.prevent="(event) => $emit('click', event)"
      @change.prevent="(event) => $emit('change', event)"
      :pt="getRadioButtonPT($props.size)"
    />
    <span
      v-if="!!$props.label"
      class="p-radiobutton-label"
      :class="{ 'p-radiobutton-label-sm': $props.size === 'sm', 'p-radiobutton-label-disabled': $props.disabled }"
    >
      {{ $props.label }}
    </span>
  </label>
</template>
