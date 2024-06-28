<script setup lang="ts">
import { icInfoCircle } from '@/assets'
import OverlayPanel from 'primevue/overlaypanel'
import { ref } from 'vue'

export interface FormGroupProps {
  label: string
  customClass?: string
  class?: string
  isBorderLeft?: boolean
  isRoundedTop?: boolean
  isRoundedBottom?: boolean
  isBorderBottom?: boolean
  required?: boolean
  noteTitle?: string
  noteArray?: string[]
  hideLabel?: boolean
}
withDefaults(defineProps<FormGroupProps>(), {
  isBorderBottom: true,
  hideLabel: false
})

const op = ref()

const toggle = (event: any) => {
  op.value.toggle(event)
}

const hide = () => {
  op.value.hide()
}
</script>

<template>
  <div class="wf_flex wf_items-center wf-group-h-44 wf_width-full" :class="[{ 'wf_br-b': isBorderBottom }, $props.class]">
    <div
      v-if="!hideLabel"
      class="wf_flex wf_filter-title wf_items-center wf_w-150"
      :class="[
        { 'wf_filter-note': noteArray },
        { 'wf-br-l-1': isBorderLeft },
        { 'wf_br-tl_radius': isRoundedTop },
        { 'wf_br-bl_radius': isRoundedBottom }
      ]"
    >
      <span class="wf-body_02-semi wf_text-n-33">
        {{ label }}
        <span v-if="required" class="wf_text-sub-01"
          >&nbsp;*<span class="wf-body_04-reg">{{ noteTitle ?? '' }}</span></span
        >
      </span>
      <img class="wf-ml-6 wf-pointer" alt="" :src="icInfoCircle" @mouseenter="toggle" @click="toggle" v-if="noteArray" />
      <OverlayPanel ref="op" appendTo="body" @mouseleave="hide">
        <div class="wf_flex wf_flex-col wf-gap-10 wf-caption">
          <div v-for="(item, index) in noteArray" v-bind:key="index" class="wf_flex wf-nowrap">
            <div class="wf-mr-4 wf_w-6">-</div>
            {{ item }}
          </div>
        </div>
      </OverlayPanel>
    </div>
    <div class="wf_flex wf_items-center wf_filter-body" :class="customClass">
      <slot></slot>
    </div>
    <div></div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/product/deliveryProduct/product-form-group.css');
</style>
