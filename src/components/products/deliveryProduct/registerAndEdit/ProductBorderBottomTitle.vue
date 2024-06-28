<script setup lang="ts">
interface ProductBorderBottomTitleProps {
  isRequired?: boolean
}
defineProps<ProductBorderBottomTitleProps>()
</script>

<template>
  <div class="wf_flex wf-space-x-4 wf-re-product-group-title">
    <p class="wf-sub_tit_01 wf__text-color--33"><slot></slot></p>
    <span class="wf-text-sub_01" v-if="isRequired">*</span>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/product/deliveryProduct/deliveryProdRegister/product-border-bottom-title.css');
</style>
