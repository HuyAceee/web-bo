<script setup lang="ts">
interface FormGroupAutoHeightLabelProps {
  title: string
  required?: boolean
  isBorderBottom?: boolean
  isBorderLeft?: boolean
  isRoundedTop?: boolean
  isRoundedBottom?: boolean
  class?: string
}

defineProps<FormGroupAutoHeightLabelProps>()
</script>

<template>
  <div class="wf-tn-list-body-filter-row-last" :class="[$props.class, { 'wf_br-b': $props.isBorderBottom }]">
    <div
      class="tn-title-filter-row-bottom-container"
      :class="[{ 'wf-br-l-1': isBorderLeft }, { 'wf_br-tl_radius': isRoundedTop }, { 'wf_br-bl_radius': isRoundedBottom }]"
    >
      <p class="wf-body_02-semi wf_text-n-33">
        {{ $props.title }}
        <span v-if="$props.required" class="wf_text-sub-01">&nbsp;*</span>
      </p>
    </div>
    <div class="wf_flex wf_items-center tn-detail-row-field-title-container">
      <slot />
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/product/deliveryProduct/product-form-group.css');
</style>
