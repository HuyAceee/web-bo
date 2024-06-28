<script setup lang="ts">
interface DashboardSessionTitleProps {
  title: string
  subTitle?: string
}

const props = defineProps<DashboardSessionTitleProps>()
</script>

<template>
  <div class="wf-main-session-title wf_flex wf_items-center wf_justify-center wf-space-x-4">
    <h6 class="wf-title wf-mt--4 ">{{ props.title }}</h6>
    <span v-if="props.subTitle" class="wf-sub-title wf-body_01-reg">({{props.subTitle}})</span>
  </div>
</template>


