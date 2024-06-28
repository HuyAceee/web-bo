<script setup lang="ts">
import { computed } from 'vue'
import DashboardSessionTitleLink from './DashboardSessionTitleLink.vue'
interface DashboardQuestionProductModel {
  title: string
  link: string
  linkTitle: string
  items: {
    id: number
    title: string
    subTitle: string
    date: string
  }[]
}

interface DashboardQuestionProductProps {
  data: DashboardQuestionProductModel
  type?: 'blue'
}

const props = defineProps<DashboardQuestionProductProps>()

const cssType = computed(() => {
  return props.type ? 'wf-' + props.type : ''
})
</script>

<template>
  <div class="wf-frame1000002094 wf_flex-1-0-0 wf_flex wf_flex-col wf_items-center wf_justify-center wf_flex-1-0-0">
    <div class="wf-item wf-width-full wf_flex wf_flex-col wf_items-start wf-space-y-30">
      <div class="wf-frame1000002094-link wf-width-full">
        <DashboardSessionTitleLink :title="props.data.title" :link="props.data.link" :linkTitle="props.data.linkTitle" />
      </div>
      <div class="wf-item-body wf_flex wf_flex-col wf_items-start wf_align-self-stretch wf-space-y-30">
        <div
          v-for="item in props.data.items"
          v-bind:key="item.id"
          class="wf-item-body_item wf_flex wf_flex-col wf_items-start wf_align-self-stretch wf-space-y-12 wf-pointer"
        >
          <span class="wf-sub-text wf-body_03-mid" :class="cssType">{{ item.subTitle }}</span>
          <div class="wf-item-body_item-body wf_flex wf_items-start wf_justify-between wf_align-self-stretch wf-pr-2">
            <span class="wf-item-body_item-body-title wf-body_01-semi">{{ item.title }}</span>
            <span class="wf-item-body_item-body-time wf-body_03-mid">{{ item.date }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
