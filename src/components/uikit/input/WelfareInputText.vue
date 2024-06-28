<script setup lang="ts">
import { WelfareInputEmits, WelfareInputExpose, WelfareInputProps } from '@/models'
import InputText from 'primevue/inputtext'
import { ref } from 'vue'

const { textAlign, ...props } = withDefaults(defineProps<WelfareInputProps>(), { textAlign: 'left' })
defineEmits<WelfareInputEmits>()

const containerRef = ref()

const addEventListener = (event: string, listener: (event: Event) => void) => {
  const input = containerRef.value?.querySelector('.p-inputtext') as Element
  input?.addEventListener(event, listener, { passive: true })
}

const removeEventListener = (event: string, listener: (event: Event) => void) => {
  const input = containerRef.value?.querySelector('.p-inputtext') as Element
  input?.removeEventListener(event, listener)
}

defineExpose<WelfareInputExpose>({
  addEventListener: addEventListener,
  removeEventListener: removeEventListener
})
</script>

<template>
  <div class="wf-text-box">
    <label class="wf-text-box-label wf-text-box-label-vertical">
      <span v-if="$props.labelTop" class="wf-w-26 wf-text-box-label-text" :class="$props.size === 'small' && 'wf-text-box-label-text-sm'">{{
        $props.labelTop
      }}</span>
      <div class="wf-text-box-label-horizontal-group">
        <span v-if="$props.labelLeft" class="wf-w-26 wf-text-box-label-text" :class="$props.size === 'small' && 'wf-text-box-label-text-sm'">{{
          $props.labelLeft
        }}</span>
        <div class="wf-text-box-control">
          <div ref="containerRef" class="wf-input-with-icon">
            <InputText
              ref="input"
              v-bind="props"
              :type="$props.inputType"
              :class="$props.size === 'small' && 'small'"
              :modelValue="$props?.modelValue as string"
              :readonly="$props.readonly"
              :maxLength="$props.maxLength"
              :placeholder="$props.placeholder"
              :disabled="$props.disabled"
              @keydown="($event) => $emit('keydown', $event)"
              @update:modelValue="(value) => $emit('update:modelValue', value)"
              @keypress.stop="(event) => $emit('keypress', event)"
              @blur="(event) => $emit('blur', event)"
              :pt="{
                root: {
                  class: [{ 'wf-text-box-right': textAlign === 'right' }]
                }
              }"
            />
            <slot name="icon">
              <button type="button" v-on:click="(event) => $emit('clickIconRight', event)">
                <component :is="$props.icon" v-if="$props.icon" class="wf-icon-input-text wf-pointer" /></button
            ></slot>
          </div>
          <div class="wf_justify-between wf_flex">
            <small v-if="$props.labelBottomLeft" class="wf-text-box-message left">{{ $props.labelBottomLeft }}</small>
            <small v-if="$props.labelBottomRight" class="wf-text-box-message right">{{ $props.labelBottomRight }}</small>
          </div>
        </div>
      </div>
    </label>
  </div>
</template>
