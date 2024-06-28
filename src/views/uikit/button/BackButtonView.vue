<script setup>
import { WelfareBackButton } from '@/components'
</script>

<template>
  <div class="back_btn-ctn">
    <div class="back_btn-ctn-item">
      <WelfareBackButton buttonType="left" />
      <WelfareBackButton buttonType="right" />
    </div>
    <div class="back_btn-ctn-item">
      <WelfareBackButton buttonType="left" is-active />
      <WelfareBackButton buttonType="right" is-active />
    </div>
  </div>
</template>
<style scoped>
@import url('@/assets/css/view/uikit/uikit-back-button-view.css');
</style>
