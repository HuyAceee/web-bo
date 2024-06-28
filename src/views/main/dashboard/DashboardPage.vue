<!-- BO_A0201_010101 -->
<script setup lang="ts">
import { WelfareContentHeader } from '@/components'
import { DEFAULT_DATE_FORMAT_DOT, formatTime } from '@/common'
import { defaultColor } from '@/common/color'
import { useDashboard } from '@/composables/main/dashboard/useDashboard'
import DashboardParameterOverview from '@/components/main/dashboard/DashboardParameterOverview.vue'
import DashboardAmountOrder from '@/components/main/dashboard/DashboardAmountOrder.vue'
import DashboardOrderInfo from '@/components/main/dashboard/DashboardOrderInfo.vue'
import DashboardQuestionProduct from '@/components/main/dashboard/DashboardQuestionProduct.vue'
import DashboardAnnouncement from '@/components/main/dashboard/DashboardAnnouncement.vue'
import IconReload from '@/components/icons/IconReload.vue'
const { now, data, headerProps, getTypeParameterOverview, lastRefreshTime, reloadData } = useDashboard()
</script>
<template>
  <div></div>
  <WelfareContentHeader v-bind="headerProps" isBigHeader>
    <template #wf-header-ic>
      <h2 class="wf-tab-title-time">{{ formatTime(now, DEFAULT_DATE_FORMAT_DOT) }}</h2>
      <IconReload class="wf-my-10 wf-pointer" :width="32" :height="32" :color="defaultColor._e5e" @click="reloadData" />
    </template>
  </WelfareContentHeader>
  <div class="wf-frame1000002102-wrap" :key="lastRefreshTime">
    <div class="wf-frame1000002102">
      <div class="wf-frame1000002068 wf_flex-1-0-0 wf-width-full wf_flex wf_items-center wf_justify-between wf_align-self-stretch wf-space-x-70">
        <DashboardParameterOverview v-bind:key="i" v-for="(poItem, i) in data.parameterOverview" :data="poItem" :type="getTypeParameterOverview(i)" />
      </div>

      <div class="wf-frame1000002080 wf_flex wf_items-center wf_justify-center">
        <div class="wf-frame1000002092 wf_width-full wf_flex-1-0-0 wf_flex wf_items-start wf-space-x-72">
          <DashboardAmountOrder :data="data.orderAmount" />
          <DashboardOrderInfo :data="data.orderInfo" />
        </div>
      </div>

      <div class="wf-wrap-frame-94-96 wf_flex wf_items-start wf-mt-4">
        <DashboardQuestionProduct :data="data.questionProduct[0]" />
        <DashboardQuestionProduct class="wf-wrap-frame-94-96-second" :data="data.questionProduct[1]" type="blue" />
      </div>

      <DashboardAnnouncement title="서비스 점검 시간 안내해 드립니다. (2003.07.14 00시 ~ 06시)" date="23.06.30" />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'DashboardPage'
}
</script>
