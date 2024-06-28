<script setup lang="ts">
import { WelfareInputMaskEmits, WelfareInputMaskProps } from '@/models'
import InputMask from 'primevue/inputmask'

const props = withDefaults(defineProps<WelfareInputMaskProps>(), {
  autoClear: true
})
const emit = defineEmits<WelfareInputMaskEmits>()
const emitEvents = {
  updateModelValue: (value: any) => {
    emit('update:modelValue', value)
  },
  handleClickIconRight: (e: Event) => {
    emit('clickIconRight', e)
  },
  handleKeyPress: (event: KeyboardEvent) => {
    emit('keypress', event)
  },
  handleKeyDown: (event: KeyboardEvent) => {
    emit('keydown', event)
  }
}
</script>
<template>
  <div class="wf-text-box">
    <label class="wf-text-box-label wf-text-box-label-vertical">
      <span v-if="props.labelTop" class="wf-w-26 wf-text-box-label-text" :class="props.size === 'small' && 'wf-text-box-label-text-sm'">{{
        props.labelTop
      }}</span>
      <div class="wf-text-box-label-horizontal-group">
        <span v-if="props.labelLeft" class="wf-w-26 wf-text-box-label-text" :class="props.size === 'small' && 'wf-text-box-label-text-sm'">{{
          props.labelLeft
        }}</span>
        <div class="wf-text-box-control">
          <div class="wf-input-with-icon" :class="props.size === 'small' && 'text-input-number-h-30'">
            <InputMask
              v-bind="props"
              :v-on="$emit || {}"
              :inputId="props.inputId"
              :readonly="props.readonly"
              :modelValue="props?.modelValue"
              :placeholder="placeholder"
              :disabled="props.disabled"
              @update:modelValue="emitEvents.updateModelValue"
              @keypress="emitEvents.handleKeyPress"
              @keydown="emitEvents.handleKeyDown"
              :autoClear="props?.autoClear"
            />
            <slot name="icon">
              <button type="button" v-on:click="emitEvents.handleClickIconRight">
                <component :is="props.icon" v-if="props.icon" class="wf-icon-input-text wf-pointer" />
              </button>
            </slot>
          </div>
          <div class="wf_justify-between wf_flex">
            <small v-if="props.labelBottomLeft" class="wf-text-box-message left">{{ props.labelBottomLeft }}</small>
            <small v-if="props.labelBottomRight" class="wf-text-box-message right">{{ props.labelBottomRight }}</small>
          </div>
        </div>
      </div>
    </label>
  </div>
</template>

