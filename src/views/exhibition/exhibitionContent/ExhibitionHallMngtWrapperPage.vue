<!-- BO_I0102_020101 -->
<script setup lang="ts">
import { WelfareTabOutline } from '@/components'
import ExhibitionHallMngtCategoryNav from '@/components/exhibition/exhibitionContent/ExhibitionHallMngtCategoryNav.vue'
import ExhibitionHallMngtCommon from '@/components/exhibition/exhibitionContent/ExhibitionHallMngtCommon.vue'
import { useExhibitionHallMngtWrapper } from '@/composables/exhibition/exhibitionContent/useExhibitionMngtHallWrapper'
import { ref } from 'vue'

const useExhibitionHallMngt = () => {
  const data = ref()

  const getData = (newData: any) => {
    data.value = newData
  }

  return { data, getData }
}

const { data, getData } = useExhibitionHallMngt()
const { currentActive, tabData, tabPanelProps, handleTabChange } = useExhibitionHallMngtWrapper()
</script>

<template>
  <div class="wf_border-page wf-px-30 wf-py-30">
    <div class="wf_flex wf-mx--1 wf-space-x-20">
      <div class="wf_w-406 wf_flex-shrink-0">
        <ExhibitionHallMngtCategoryNav :data="data" @get-data="(data) => getData(data)" />
      </div>
      <div class="wf_flex-1">
        <ExhibitionHallMngtCommon :data="data" />
        <div class="wf-mt-30">
          <WelfareTabOutline :wfTabPanelProps="tabPanelProps" :activeIndex="currentActive" @tab-change="handleTabChange">
            <template #wf-tab-text-content="{ tabIndex }">
              <component class="wf-mt--10" :key="tabIndex" :is="tabData[tabIndex].component" />
            </template>
          </WelfareTabOutline>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ExhibitionHallMngtWrapperPage'
}
</script>

<style scoped>
@import url('@/assets/css/view/exhibition/common/exhibition-common.css');
</style>
