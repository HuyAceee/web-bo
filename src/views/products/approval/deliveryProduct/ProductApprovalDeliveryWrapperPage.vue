<script setup lang="ts">
import { WelfareTabFilled } from '@/components/uikit'
import { useProductApprovalDeliveryWrapper } from '@/composables/products/approval/deliveryProduct/useProductApprovalDeliveryWrapper'

const { currentActive, handleTabChange, tabData, tabPanelProps } = useProductApprovalDeliveryWrapper()
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
@import url('@/assets/css/view/product/deliveryProduct/product-approve-delivery.css');
</style>

<script lang="ts">
export default {
  name: 'ProductApprovalDeliveryWrapperPage'
}
</script>
