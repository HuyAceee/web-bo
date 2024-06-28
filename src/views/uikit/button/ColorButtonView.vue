<script setup>
import { WelfareColorButton } from '@/components'
</script>
<template>
  <div class="wf_container wf_container--color-button">
    <div class="wf_container-grid" style="--grid-columns: 1fr 1fr">
      <div class="wf_container-row">
        <div class="wf_container-col">
          <WelfareColorButton label="텍스트" buttonType="red" />
          <WelfareColorButton label="텍스트" buttonType="red" class="hover" />
          <WelfareColorButton label="텍스트" buttonType="red" class="active" />
          <WelfareColorButton label="텍스트" buttonType="red" disabled />
        </div>
        <div class="wf_container-col">
          <WelfareColorButton label="텍스트" buttonType="green" />
          <WelfareColorButton label="텍스트" buttonType="green" class="hover" />
          <WelfareColorButton label="텍스트" buttonType="green" class="active" />
          <WelfareColorButton label="텍스트" buttonType="green" disabled />
        </div>
        <div class="wf_container-col">
          <WelfareColorButton label="텍스트" buttonType="blue" />
          <WelfareColorButton label="텍스트" buttonType="blue" class="hover" />
          <WelfareColorButton label="텍스트" buttonType="blue" class="active" />
          <WelfareColorButton label="텍스트" buttonType="blue" disabled />
        </div>
      </div>

      <div class="wf_container-row wf_container-row--custom">
        <div class="wf_container-col wf_container-col--custom">
          <WelfareColorButton label="텍스트" buttonType="red" buttonSize="small" />
          <WelfareColorButton label="텍스트" buttonType="red" class="hover" buttonSize="small" />
          <WelfareColorButton label="텍스트" buttonType="red" buttonSize="small" class="active" />
          <WelfareColorButton label="텍스트" buttonType="red" disabled buttonSize="small" />
        </div>
        <div class="wf_container-col wf_container-col--custom">
          <WelfareColorButton label="텍스트" buttonType="green" buttonSize="small" />
          <WelfareColorButton label="텍스트" buttonType="green" class="hover" buttonSize="small" />
          <WelfareColorButton label="텍스트" buttonType="green" buttonSize="small" class="active" />
          <WelfareColorButton label="텍스트" buttonType="green" disabled buttonSize="small" />
        </div>
        <div class="wf_container-col wf_container-col--custom">
          <WelfareColorButton label="텍스트" buttonType="blue" buttonSize="small" />
          <WelfareColorButton label="텍스트" buttonType="blue" class="hover" buttonSize="small" />
          <WelfareColorButton label="텍스트" buttonType="blue" buttonSize="small" class="active" />
          <WelfareColorButton label="텍스트" buttonType="blue" disabled buttonSize="small" />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
@import url('@/assets/css/view/uikit/uikit-color-button-view.css');
</style>
