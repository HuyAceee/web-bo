<script setup lang="ts">
import { WelfareTabSingle } from '@/components'
import { CloseTabPayload } from '@/models'
import { TabViewChangeEvent, TabViewClickEvent } from 'primevue/tabview'
import { ref } from 'vue'
// import { useRouter } from 'vue-router'

/**
 * Props for the tab view component.
 */
const currentActive = ref(0)

// const router = useRouter()
/**
 * Props for the tab panel component.
 */
const tabPanelProps = ref([
  { header: 'active', disabled: false },
  { header: 'default', disabled: false },
  { header: 'hover', disabled: false },
  { header: 'disabled', disabled: true }
])

/**
 * Handles the tab change event.
 * @param {TabViewChangeEvent} event - The event object.
 */

const handleTabChange = (event: TabViewChangeEvent) => {
  // console.log('Received tab-change event!', event)
  const li = event.originalEvent?.target as HTMLLIElement
  if (!li.closest('svg')) {
    currentActive.value = event.index
  }
  // Replace with the desired route path
  // router.push({ path: '/htmllist/uikit/tabSingle/#' })
}
/**
 * Handles the tab click event.
 * @param {TabViewClickEvent} event - The event object.
 */
const handleTabClick = (event: TabViewClickEvent) => {
  console.log('Received tab-click event!', event)
  // event?.index
}
/**
 * Handles the tab click event.
 * @param { CloseTabPayload }
 */
const handleCloseTab = (tabClosePayload: CloseTabPayload) => {
  // console.log('Received tab-close event!', tabClosePayload)
  tabPanelProps.value = tabPanelProps.value.filter((_, index) => index !== tabClosePayload.tabIndex)

  if (tabClosePayload.tabIndex === currentActive.value) {
    for (let i = tabPanelProps.value.length - 1; i >= 0; i--) {
      if (tabPanelProps.value[i].disabled === false) {
        currentActive.value = i
        break
      }
    }
  }
  // Replace with the active route path
  // if(tabClosePayload.tabIndex === currentActive.value) {
  // router.push({ path: '/htmllist/uikit/tabSingle/#' })
  // }
}
</script>

<template>
  <div class="wf_container wf_bg-white wf_container-flex">
    <WelfareTabSingle
      @tab-change="handleTabChange"
      @tab-click="handleTabClick"
      @tab-close="handleCloseTab"
      :activeIndex="currentActive"
      :wfTabPanelProps="tabPanelProps"
    >
      <template #wf-tab-text-content="{ tabIndex }">
        <div>Tab {{ tabIndex }} content</div>
      </template>
    </WelfareTabSingle>
  </div>
</template>
