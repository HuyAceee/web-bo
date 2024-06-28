<script setup lang="ts">
import { WelfareTabFilled } from '@/components'
import { useProductDeliveryRegistration } from '@/composables/products/deliveryProduct/useProductDeliveryRegistration'

const { currentActive, handleTabChange, tabData, tabPanelProps } = useProductDeliveryRegistration()
</script>

<template>
  <div class="wf-product-menu-wrap">
    <WelfareTabFilled :wfTabPanelProps="tabPanelProps" :activeIndex="currentActive" @tab-change="handleTabChange">
      <template #wf-tab-text-content="{ tabIndex }">
        <component :key="tabIndex" :is="tabData[tabIndex].component" />
      </template>
    </WelfareTabFilled>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/product/deliveryProduct/product-delivery-product.css');
</style>

<script lang="ts">
export default {
  name: 'ProductDeliveryProductWrapperPage'
}
</script>
