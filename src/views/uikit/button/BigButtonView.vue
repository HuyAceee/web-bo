<script setup>
import { WelfareBigButton } from '@/components'
</script>
<template>
  <div class="wf_container wf_container--big-button">
    <div class="wf_container-grid" style="--grid-columns: 1fr 1fr">
      <div class="wf_container-row wf_container-row--custom">
        <div class="wf_container-col wf_container-col--gap">
          <WelfareBigButton label="텍스트" buttonType="neatral" class="wf_button--ml" />
          <WelfareBigButton label="텍스트" buttonType="neatral" class="hover" />
          <WelfareBigButton label="텍스트" buttonType="neatral" class="active" />
          <WelfareBigButton label="텍스트" buttonType="neatral" disabled />
        </div>
        <div class="wf_container-col wf_container-col--gap">
          <WelfareBigButton label="텍스트" buttonType="default" />
          <WelfareBigButton label="텍스트" buttonType="default" class="hover" />
          <WelfareBigButton label="텍스트" buttonType="default" class="active" />
          <WelfareBigButton label="텍스트" buttonType="default" disabled />
        </div>
        <div class="wf_container-col wf_container-col--gap wf_container-col--ml">
          <WelfareBigButton label="텍스트" buttonType="cancel" />
          <WelfareBigButton label="텍스트" buttonType="cancel" class="hover" />
          <WelfareBigButton label="텍스트" buttonType="cancel" class="active" />
          <WelfareBigButton label="텍스트" buttonType="cancel" disabled />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/uikit/uikit-big-button-view.css');
</style>
