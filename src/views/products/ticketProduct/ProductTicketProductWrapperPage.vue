<script setup lang="ts">
import { WelfareTabFilled } from '@/components'
import { useProductTicketCommon } from '@/composables/products/ticketProduct/useProductTicketCommon'
import { useProductTicketRegistration } from '@/composables/products/ticketProduct/useProductTicketRegistration'
const { dataValue, categoryData } = useProductTicketCommon()
const { currentActive, handleTabChange, tabData, tabPanelProps } = useProductTicketRegistration()
</script>

<template>
  <div class="wf-product-menu-wrap">
    <WelfareTabFilled :lazy="true" :wfTabPanelProps="tabPanelProps" :activeIndex="currentActive" @tab-change="handleTabChange">
      <template #wf-tab-text-content="{ tabIndex }">
        <component :key="tabIndex" :is="tabData[tabIndex].component" :data="dataValue" :category="categoryData" />
      </template>
    </WelfareTabFilled>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/product/ticketProduct/product-ticket-product-wrapper.css');
</style>

<script lang="ts">
export default {
  name: 'ProductTicketProductWrapperPage'
}
</script>
