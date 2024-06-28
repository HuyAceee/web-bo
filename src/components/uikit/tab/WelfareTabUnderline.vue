<script setup lang="ts">
import { WelfareTabEmits, WelfareTabSlots, WelfareTabUnderlineProps } from '@/models'
import TabPanel, { TabPanelProps } from 'primevue/tabpanel'
import TabView, { TabViewChangeEvent, TabViewClickEvent, TabViewPassThroughOptions } from 'primevue/tabview'

const props = withDefaults(defineProps<WelfareTabUnderlineProps>(), {
  lazy: false
})
const emit = defineEmits<WelfareTabEmits>()
defineSlots<WelfareTabSlots>()
const emitEvent = {
  handleTabChange: (event: TabViewChangeEvent) => {
    emit('tab-change', event)
  },
  handleTabClick: (event: TabViewClickEvent) => {
    emit('tab-click', event)
  }
}

const panelClass = (props: TabPanelProps, parent: TabViewPassThroughOptions, index: number) => {
  return [
    {
      'wf-active': (parent as { state: { d_activeIndex: number } }).state.d_activeIndex === index
    }
  ]
}
</script>

<template>
  <TabView
    @tab-change="emitEvent.handleTabChange"
    @tab-click="emitEvent.handleTabClick"
    v-bind="props"
    :unstyled="true"
    :lazy="true"
    :pt="{
      root: {
        class: ' '
      },
      nav: {
        class:
          'wf-tab-underline wf_flex wf_items-center wf_justify-center wf_align-self-stretch  ' +
          (props.activeSmall ? ' wf-tab-underline-active-sm wf-space-x-6' : 'wf-space-x-12')
      },
      inkBar: {
        class: 'wf-tab-ink-hidden'
      }
    }"
  >
    <TabPanel
      v-for="(tab, index) in wfTabPanelProps"
      :key="index"
      v-bind="tab"
      :pt="{
        header: {
          class: 'wf-tab-underline-item wf-body_03-reg'
        },
        content: {
          class: 'wf-tab-underline-contents'
        },
        headerAction: ({ props, parent }) => ({
          class: panelClass(props, parent, index)
        })
      }"
    >
      <!-- TabPanelSlots -->
      <template #header></template>
      <slot name="wf-tab-text-content" v-bind="{ tabIndex: index }"></slot>
    </TabPanel>
  </TabView>
</template>
