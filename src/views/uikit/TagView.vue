<script setup lang="ts">
import { WelfareTag } from '@/components'
</script>

<template>
  <div class="wf_container wf_container--custom">
    <div>
      <WelfareTag>text</WelfareTag>
    </div>
    <div class="wf-mt-20">
      <WelfareTag class="wf-tag-hover">text</WelfareTag>
    </div>
    <div class="wf-mt-20">
      <WelfareTag class="wf-tag-hover wf-tag-active">text</WelfareTag>
    </div>
    <div class="wf-mt-20">
      <WelfareTag class="wf-tag-hover wf-tag-active">text</WelfareTag>
    </div>
    <div class="wf-mt-20">
      <WelfareTag disabled> text</WelfareTag>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/uikit/uikit-tag-view.css');
</style>
