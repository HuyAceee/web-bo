<script setup lang="ts">
import { WelfareTabOutline } from '@/components'
import { TabViewChangeEvent, TabViewClickEvent } from 'primevue/tabview'
import { ref } from 'vue'

/**
 * Props for the tab view component.
 */
const currentActive = ref(0)

/**
 * Props for the tab panel component.
 */
const tabProps = [
  { header: 'active', disabled: false },
  { header: 'default', disabled: false },
  { header: 'default', disabled: false },
  { header: 'default', disabled: false },
  { header: 'default', disabled: false },
  { header: 'default', disabled: false },
  { header: 'hover', disabled: false },
  { header: 'disable', disabled: true }
]

/**
 * Handles the tab change event.
 * @param {TabViewChangeEvent} event - The event object.
 */

const handleTabChanged = (event: TabViewChangeEvent) => {
  console.log('Received tab-change event!', event)
  currentActive.value = event.index
}
/**
 * Handles the tab click event.
 * @param {TabViewClickEvent} event - The event object.
 */
const handleTabClicked = (event: TabViewClickEvent) => {
  console.log('Received tab-click event!', event)
  // event?.index
}
</script>

<template>
  <div class="wf_container wf_container-flex">
    <WelfareTabOutline @tab-change="handleTabChanged" @tab-click="handleTabClicked" :activeIndex="currentActive" :wfTabPanelProps="tabProps">
      <template #wf-tab-text-content="{ tabIndex }">
        <div>The tab {{ tabIndex }} content</div>
      </template>
    </WelfareTabOutline>
  </div>
</template>
