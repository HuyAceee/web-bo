<script setup lang="ts">
import { WelfareTabFilled } from '@/components'
import { useRoute } from 'vue-router'

import { usePartnerManagementDetail } from '@/composables/partner/partnerManagementDetail/usePartnerManagementDetail'

const route = useRoute()
const sellerKey = route.query.id as string
const { currentActive, tabData, handleTabChange, tabPanelProps } = usePartnerManagementDetail()
</script>

<template>
  <div class="wf-body-wrap-content wf_text-n-33">
    <WelfareTabFilled :wfTabPanelProps="tabPanelProps" :activeIndex="currentActive" @tab-change="handleTabChange">
      <template #wf-tab-text-content="{ tabIndex }">
        <component :key="tabIndex" :is="tabData[tabIndex].component" :seller-key="sellerKey" />
      </template>
    </WelfareTabFilled>
  </div>
</template>
<script lang="ts">
export default {
  name: 'PartnerManagementDetailPage'
}
</script>
<style scoped>
@import url('@/assets/css/view/partner/partner-detail/partner-detail-main.css');
</style>
