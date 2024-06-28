<script setup lang="ts">
import { CloseTabPayload, WelfareSingeTabEmits, WelfareTabProps, WelfareTabSlots } from '@/models'
import TabPanel, { TabPanelProps } from 'primevue/tabpanel'
import TabView, { TabViewChangeEvent, TabViewClickEvent, TabViewPassThroughOptions } from 'primevue/tabview'
import { useScrollMouseHorizontal } from '@/composables'
import IconClose from '@/components/icons/IconClose.vue'
// import { useRouter } from 'vue-router'
// const router = useRouter()

const props = withDefaults(defineProps<WelfareTabProps>(), {
  lazy: false
})

const emit = defineEmits<WelfareSingeTabEmits>()

defineSlots<WelfareTabSlots>()

const emitEvent = {
  handleTabChange: (event: TabViewChangeEvent) => {
    emit('tab-change', event)
    // handle change route here
  },
  handleTabClick: (event: TabViewClickEvent) => {
    emit('tab-click', event)
  },
  handleCloseTab: (closeTabPayload: CloseTabPayload) => {
    if (closeTabPayload.isTabDisabled === false) {
      emit('tab-close', closeTabPayload)
    }
  }
}

const panelClass = (panelProps: TabPanelProps, parent: TabViewPassThroughOptions, index: number) => {
  return [
    {
      'wf_single-tab__item--active': props.activeIndex === index,
      'wf_single-tab__item--disabled': panelProps.disabled === true
    }
  ]
}
useScrollMouseHorizontal('.wf_single-tab-tablist')
</script>
<template>
  <TabView
    @tab-change="emitEvent.handleTabChange"
    @tab-click="emitEvent.handleTabClick"
    v-bind="props"
    :unstyled="true"
    :pt="{
      root: {
        class: 'wf_single-tab-group'
      },
      nav: {
        class: 'wf_single-tab-tablist hidden-scrollbar',
        id: 'wf_single-tab-tablist'
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
          class: 'wf_single-tab__item'
        },
        content: {
          class: 'wf_single-tab-contents'
        },
        headerAction: ({ props, parent }) => {
          return {
            class: panelClass(props, parent, index)
          }
        }
      }"
    >
      <!-- TabPanelSlots -->
      <template #header>
        <IconClose @click="() => emitEvent.handleCloseTab({ tabIndex: index, isTabDisabled: tab.disabled })" />
      </template>
      <slot name="wf-tab-text-content" v-bind="{ tabIndex: index }"></slot>
    </TabPanel>
  </TabView>
</template>
