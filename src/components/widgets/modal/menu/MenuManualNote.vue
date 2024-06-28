<script setup lang="ts">
interface MenuManualNoteProps {
  list: string[]
}
defineProps<MenuManualNoteProps>()
</script>
<template>
  <div class="wf-frame1000002348">
    <div class="wf-frame1000002348-wrap wf_flex wf_flex-col wf_items-start wf_align-self-stretch wf-space-y-6">
      <div v-for="(text, index) in list" :key="index" class="wf-frame1000002176 wf-space-x-4 wf-body_04-mid">
        <span>&#x2022;</span>
        <span v-text="text"></span>
      </div>
    </div>
  </div>
</template>
