<script setup lang="ts">
import { WelfareInputNumberEmits, WelfareInputNumberProps } from '@/models'
import InputNumber, { InputNumberInputEvent } from 'primevue/inputnumber'

const props = defineProps<WelfareInputNumberProps>()
const emit = defineEmits<WelfareInputNumberEmits>()
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
  input: (value: InputNumberInputEvent) => {    
    emit('input', value)
  },
  focusText: (e : Event) => {
    emit('focusText' , e)
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
            <InputNumber
              v-bind="props"
              :v-on="$emit || {}"
              :inputId="props.inputId"
              :useGrouping="props.useGrouping"
              :readonly="props.readonly"
              :modelValue="props?.modelValue"
              :placeholder="placeholder"
              :disabled="props.disabled"
              :min="props?.min"
              @keypress="emitEvents.handleKeyPress"
              @update:modelValue="emitEvents.updateModelValue"
              @input="emitEvents.input"
              @focus='emitEvents.focusText'
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

