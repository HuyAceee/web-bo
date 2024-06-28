<script setup lang="ts">
import { WelfareTabFilled } from '@/components'
import { TabViewChangeEvent, TabViewClickEvent } from 'primevue/tabview'
import { ref } from 'vue'

/**
 * Props for the tab view component.
 */
const currentActive = ref(0)

/**
 * Props for the tab panel component.
 */
const tabPanelProps = [
  { header: 'active', disabled: false },
  { header: 'default', disabled: false },
  { header: 'hover', disabled: false },
  { header: 'disable', disabled: true },
  { header: 'default', disabled: false },
  { header: 'default', disabled: false },
  { header: 'default', disabled: false },
  { header: 'default', disabled: false }
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
  console.log('Received tab-click event!', event)
  // event?.index
}
</script>

<template>
  <div class="wf_container wf_bg-white wf_container-flex">
    <WelfareTabFilled @tab-change="handleTabChange" @tab-click="handleTabClick" :activeIndex="currentActive" :wfTabPanelProps="tabPanelProps">
      <template #wf-tab-text-content="{ tabIndex }">
        <div>Tab {{ tabIndex }} content</div>
      </template>
    </WelfareTabFilled>
  </div>
</template>
