<!--
  DESCRIPTION: This component is a tab view that displays content for each tab. It uses PrimeVue's TabView and TabPanel components.
  USAGE:
  - The component takes these props:
    - TabViewProps
    - TabPanelProps
  - The component emits two events:
    - tab-change: Emitted when the active tab is changed.
    - tab-click: Emitted when a tab is clicked.
  - The component renders a TabView component with TabPanel components as its children.
  - Each TabPanel component has a header and content. The *#header* displays the title of the tab, and the content displays component in slot".
-->
<script setup lang="ts">
import { WelfareTabEmits, WelfareTabProps, WelfareTabSlots } from '@/models'
import TabPanel, { TabPanelProps } from 'primevue/tabpanel'
import TabView, { TabViewChangeEvent, TabViewClickEvent, TabViewPassThroughOptions } from 'primevue/tabview'
const props = withDefaults(defineProps<WelfareTabProps>(), {
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
      /**
       * [TabViewPassThroughOptions](https://primevue.org/tabview/) does not have a *state* property as the docs mention, so we have to cast it to an object that does.
       */
      'wf_text-tab__item--active': (parent as { state: { d_activeIndex: number } }).state.d_activeIndex === index,
      'wf_text-tab__item--disabled': props.disabled === true
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
        class: 'wf-px-20 wf-py-10'
      },
      nav: {
        class: 'wf_text-tab wf-space-x-20'
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
          class: 'wf_text-tab__item wf_text-tab__break'
        },
        content: {
          class: 'wf_tab-contents'
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
