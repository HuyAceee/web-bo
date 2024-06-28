<script setup lang="ts">
import { WelfareSwitch } from '@/components'
</script>

<template>
  <div class="wf_container wf_container--custom">
    <div>
      <WelfareSwitch />
    </div>
    <div class="wf-mt-15">
      <WelfareSwitch :modelValue="true" />
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/uikit/uikit-switch-view.css');
</style>
