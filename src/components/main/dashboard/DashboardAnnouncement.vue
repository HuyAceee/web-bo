<script setup lang="ts">

interface DashboardAnnouncementProps {
  title: string
  date: string
}

const props = defineProps<DashboardAnnouncementProps>()

</script>

<template>
  <div class="wf-wrap-announcement wf_flex wf_flex-col wf_items-start wf_align-self-stretch wf-space-y-6">
    <div class="wf-frame1000002082 wf_flex wf_items-center wf_align-self-stretch wf-space-x-10">
      <a class="wf-frame1000002109 wf_flex wf_items-center wf-space-x-10">
        <span class="wf-body_03-semi">공지</span>
      </a>
      <div class="wf-frame1000002110 wf_flex wf_items-center wf_justify-between wf_flex-1-0-0">
        <span class="wf-text-left wf-body_03-semi wf-mt--4">{{props.title}}</span>
        <span class="wf-text-right wf-body_03-mid wf-mr--4 wf-mt--4">{{props.date}}</span>
      </div>
    </div>
  </div>
</template>
