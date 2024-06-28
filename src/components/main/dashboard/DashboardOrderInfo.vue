<script setup lang="ts">
import { WelfareTabUnderline } from '@/components'
import { TabViewChangeEvent } from 'primevue/tabview'
import { ref } from 'vue'
import DashboardSessionTitle from './DashboardSessionTitle.vue'
import DashboardOrderInfoItem from './DashboardOrderInfoItem.vue'

type DashboardOrderInfoTabModel = {
  title: string
  value: string
}

interface DashboardOrderInfoModel {
  tab1: DashboardOrderInfoTabModel[][]
  tab2: DashboardOrderInfoTabModel[][]
}

interface DashboardOrderInfoProps {
  data: DashboardOrderInfoModel
}

const props = defineProps<DashboardOrderInfoProps>()

const currentActive = ref(0)

const tabPanelProps = [
  { header: '주문배송', disabled: false, pt: {} },
  { header: '클레임정보', disabled: false, pt: {} }
]

const handleTabChange = (event: TabViewChangeEvent) => {
  currentActive.value = event.index
}
</script>

<template>
  <div class="wf-dashboard-order-info wf_flex wf_flex-col wf_items-center">
    <div class="wf-frame1000002113 wf-frame1000002113-title wf-width-full wf_flex wf_items-center wf_justify-between wf-ml--2 wf-pt-3">
      <DashboardSessionTitle title="주문/배송・클레임 정보 " subTitle="건" />
    </div>
    <div class="wf-width-full wf-frame1000002081">
      <WelfareTabUnderline
        class="wf-tab-underline-header-end"
        @tab-change="handleTabChange"
        :activeIndex="currentActive"
        :wfTabPanelProps="tabPanelProps"
        activeSmall
      >
        <template v-slot:wf-tab-text-content>
          <div v-if="currentActive === 0">
            <DashboardOrderInfoItem :data="props.data.tab1" />
          </div>
          <div v-if="currentActive === 1">
            <DashboardOrderInfoItem class="wf-dashboard-tab-second" :data="props.data.tab2" />
          </div>
        </template>
      </WelfareTabUnderline>
    </div>
  </div>
</template>
