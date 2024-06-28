<script setup lang="ts">
import { computed } from 'vue';
import { WelfareBigButton } from '@/components'

interface DashboardParameterOverviewModel {
  title: string
  value: string
  unit: string
  items: {
    id: number
    name: string
    value: string
  }[]
}

interface DashboardParameterOverviewProps {
  data: DashboardParameterOverviewModel
  type?: 'orange' | 'blue'
}

const props = defineProps<DashboardParameterOverviewProps>()

const cssType = computed(() => {
  return props.type ? "wf-" + props.type : ''
})

</script>

<template>
  <div class="wf-parameter-overview wf-item wf_flex wf_flex-col wf_items-start wf_justify-between">
    <div class="wf-item-content wf_flex wf_flex-col wf_items-start wf_align-self-stretch wf-space-y-20">
      <div class="wf-item-content_top wf_flex wf_flex-col wf_items-start wf_align-self-stretch wf-space-y-12">
        <span class="wf-title wf-body_03-mid">{{props.data.title}}</span>
        <div class="wf-item-content_top-value wf_flex wf_items-start wf_justify-between wf_align-self-stretch wf-space-x-6">
          <h1 class="wf-item-content_top-value-number" :class="cssType">{{props.data.value}}</h1>
          <h2 class="wf-item-content_top-value-text wf-line-height-36 wf-mr-2">{{props.data.unit}}</h2>
        </div>
      </div>
      <div class="wf-div-border-center"></div>
      <div class="wf-item-content_bottom wf_flex wf_flex-col wf_items-start wf_align-self-stretch wf-space-y-12">
        <div v-for="item in props.data.items" v-bind:key="item.id" class="wf-item-content_bottom-item wf_flex wf_items-start wf_justify-between wf_align-self-stretch wf-body_03-mid">
          <span>{{item.name}}</span>
          <span>{{item.value}}</span>
        </div>
      </div>
    </div>
    <WelfareBigButton label="더보기" buttonType="neatral" class="wf_button--ml wf-width-full"/>
  </div>
</template>
