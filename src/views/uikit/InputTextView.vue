<script setup lang="ts">
import { ref } from 'vue'
import { WelfareInputText } from '@/components'
import IconSelect from '@/components/icons/IconSelect.vue'
const defaultInputTextFirst = ref('텍스트')
const defaultInputTextSecond = ref('텍스트')
const defaultSmallInputTextFirst = ref('텍스트')
const defaultSmallInputTextSecond = ref('텍스트')
const defaultLabelInputTextFirst = ref('텍스트')
const defaultLabelInputTextSecond = ref('텍스트')
const defaultSmallLabelInputTextFirst = ref('텍스트')
const defaultSmallLabelInputTextSecond = ref('텍스트')
</script>

<template>
  <div class="wf_textbox--container wf-space-x-77">
    <div class="wf-mt-31 wf-space-y-51">
      <WelfareInputText inputType="text" class="wrap-input" placeholder="텍스트" />
      <WelfareInputText inputType="text" class="wrap-input wf-text-box-active" placeholder="텍스트" />
      <WelfareInputText class="wrap-input" v-model="defaultInputTextFirst" placeholder="텍스트" />
      <WelfareInputText class="wrap-input" disabled placeholder="텍스트" />
      <WelfareInputText class="wrap-input wf-text-box-negative" v-model="defaultInputTextSecond" placeholder="텍스트" />
    </div>
    <div class="wrap-input wf-space-y-5">
      <WelfareInputText labelTop="text" labelLeft="text" labelBottomLeft="text" inputType="text" class="wrap-input" placeholder="텍스트" />
      <WelfareInputText labelTop="text" labelLeft="text" labelBottomLeft="text" class="wrap-input wf-text-box-active" placeholder="텍스트" />
      <WelfareInputText
        labelTop="text"
        labelLeft="text"
        labelBottomLeft="text"
        class="wrap-input"
        v-model="defaultLabelInputTextFirst"
        placeholder="텍스트"
      />
      <WelfareInputText labelTop="text" labelLeft="text" labelBottomLeft="text" class="wrap-input" disabled placeholder="텍스트" />
      <WelfareInputText
        labelTop="text"
        labelLeft="text"
        labelBottomLeft="text"
        class="wrap-input wf-text-box-negative wf-validation-box-red"
        v-model="defaultLabelInputTextSecond"
        placeholder="텍스트"
      />
    </div>
  </div>
  <div class="wf_textbox--container wf-space-x-65">
    <div class="wrap-input wf-mt-27 wf-space-y-61">
      <WelfareInputText size="small" inputType="text" class="wrap-input" placeholder="텍스트" />
      <WelfareInputText size="small" inputType="text" class="wrap-input wf-text-box-active" placeholder="텍스트" />
      <WelfareInputText size="small" class="wrap-input" v-model="defaultSmallInputTextFirst" placeholder="텍스트" />
      <WelfareInputText size="small" class="wrap-input" disabled placeholder="텍스트" />
      <WelfareInputText size="small" class="wrap-input wf-text-box-negative" v-model="defaultSmallInputTextSecond" placeholder="텍스트" />
    </div>
    <div class="">
      <div class="wrap-input-mt">
        <WelfareInputText
          size="small"
          class="wrap-input"
          labelTop="text"
          labelLeft="text"
          labelBottomLeft="text"
          inputType="text"
          placeholder="텍스트"
        />
      </div>
      <div class="wf-ml-12 wf-mt-81 wf_flex wf_flex-col wf-space-y-17">
        <WelfareInputText
          size="small"
          labelTop="text"
          labelLeft="text"
          labelBottomLeft="text"
          inputType="text"
          class="wrap-input wf-text-box-active"
          placeholder="텍스트"
        />
        <WelfareInputText
          size="small"
          labelTop="text"
          labelLeft="text"
          labelBottomLeft="text"
          class="wrap-input"
          v-model="defaultSmallLabelInputTextFirst"
          placeholder="텍스트"
        />
        <WelfareInputText size="small" labelTop="text" labelLeft="text" labelBottomLeft="text" class="wrap-input" disabled placeholder="텍스트" />
        <WelfareInputText
          size="small"
          labelTop="text"
          labelLeft="text"
          labelBottomLeft="text"
          class="wrap-input wf-text-box-negative wf-validation-box-red"
          v-model="defaultSmallLabelInputTextSecond"
          placeholder="텍스트"
        />
        <!-- inputType is type of input element -->
        <!-- using input with icon -->
        <WelfareInputText :icon="IconSelect" inputType="text" class="wrap-input" placeholder="텍스트" />
      </div>
    </div>
  </div>
</template>
<style scoped>
@import url('@/assets/css/view/uikit/uikit-input-text-view.css');
</style>
