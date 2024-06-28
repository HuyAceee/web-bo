<script setup lang="ts">
import { WelfareTabFilled } from '@/components'
import { useProductApprovalTicketWrapper } from '@/composables/products/approval/ticketProduct/useProductApprovalTicketWrapper'

const { currentActive, handleTabChange, tabData, tabPanelProps } = useProductApprovalTicketWrapper()
</script>

<template>
  <div class="wf-product-menu-wrap">
    <WelfareTabFilled :wfTabPanelProps="tabPanelProps" :activeIndex="currentActive" @tab-change="handleTabChange" :lazy="true">
      <template #wf-tab-text-content="{ tabIndex }">
        <component :key="tabIndex" :is="tabData[tabIndex].component" />
      </template>
    </WelfareTabFilled>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/product/product-approve-ticket-product.css');
</style>

<script lang="ts">
export default {
  name: 'ProductApprovalTicketWrapperPage'
}
</script>
