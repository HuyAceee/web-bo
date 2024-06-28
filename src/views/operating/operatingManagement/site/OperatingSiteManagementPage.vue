<!-- BO_M0101_010101/BO_M0101_020101/BO_M0101_030101/BO_M0101_040101 -->
<script setup lang="ts">
import { WelfareTabFilled } from '@/components'
import { useOperatingMenuSite } from '@/composables/operating/operatingManagement/site/useOperatingMenuSite'
const { currentActive, handleTabChange, tabData, tabPanelProps } = useOperatingMenuSite()
</script>
<template>
  <div class="wf-body-wrap-content">
    <WelfareTabFilled :wfTabPanelProps="tabPanelProps" :activeIndex="currentActive" @tab-click="handleTabChange" class="site-manager-cpntainer">
      <template #wf-tab-text-content="{ tabIndex }">
        <component :key="tabIndex" :is="tabData[tabIndex].component" />
      </template>
    </WelfareTabFilled>
  </div>
</template>
<style scoped>
@import url('@/assets/css/view/operating/operating-management/operating-site-manage.css');
</style>
<script lang="ts">
export default {
  name: 'OperatingSiteManagementPage'
}
</script>
