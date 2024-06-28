<script setup lang="ts">
import { WelfareTabText } from '@/components'
import { TabViewChangeEvent, TabViewClickEvent } from 'primevue/tabview'
import { ref } from 'vue'

/**
 * Props for the tab view component.
 */
const currentActive = ref(2)

/**
 * Props for the tab panel component.
 */
const tabPanelProps = [
  { header: '기업정보', disabled: false, pt: {} },
  { header: '마케팅 활용 동의', disabled: true, pt: {} },
  { header: '마케팅 활용 동의', disabled: false, pt: {} }
]

/**
 * Handles the tab change event.
 * @param {TabViewChangeEvent} event - The event object.
 */

const handleTabChange = (event: TabViewChangeEvent) => {
  // console.log('Received tab-change event!', event)
  currentActive.value = event.index
}
/**
 * Handles the tab click event.
 * @param {TabViewClickEvent} event - The event object.
 */
const handleTabClick = (event: TabViewClickEvent) => {
  // console.log('Received tab-click event!', event)
  event?.index
}
</script>

<template>
  <div class="wf_container">
    <WelfareTabText @tab-change="handleTabChange" @tab-click="handleTabClick" :activeIndex="currentActive" :wfTabPanelProps="tabPanelProps">
      <template #wf-tab-text-content="{ tabIndex }">
        <div>Tab {{ tabIndex }} content</div>
      </template>
    </WelfareTabText>
  </div>
</template>
