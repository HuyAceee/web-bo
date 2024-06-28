<script setup lang="ts">
import { WelfareTabFilled } from '@/components'
import { useCustomerDetail } from '@/composables/company/customerManagement/detail/useCustomerDetail'

const { currentActive, handleTabChange, tabData, tabPanelProps } = useCustomerDetail()
</script>

<template>
  <div class="wf-body-wrap-content">
    <WelfareTabFilled :wfTabPanelProps="tabPanelProps" :activeIndex="currentActive" @tab-change="handleTabChange">
      <template #wf-tab-text-content="{ tabIndex }">
        <component :key="tabIndex" :is="tabData[tabIndex].component" />
      </template>
    </WelfareTabFilled>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/company/customerManagement/company-customer-detail.css');
</style>

<script lang="ts">
export default {
  name: 'CompanyCustomerDetailPage'
}
</script>
