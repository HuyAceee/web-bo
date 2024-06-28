<script setup lang="ts">
import { ref } from 'vue'
import { WelfareInputText } from '@/components'

const defaultInputTextFirst = ref('텍스트')
const defaultInputTextSecond = ref('텍스트')
const defaultInputTextThird = ref('텍스트')
const defaultInputTextFour = ref('텍스트')

const defaultSmallInputTextFirst = ref('텍스트')
const defaultSmallInputTextSecond = ref('텍스트')
const defaultSmallInputTextThird = ref('텍스트')
const defaultSmallInputTextFour = ref('텍스트')
</script>
<template>
  <div class="wf_textbox--container wf-space-x-37">
    <div class="wf-space-y-16">
      <WelfareInputText
        labelBottomLeft="text"
        inputType="text"
        v-model="defaultInputTextFirst"
        class="wrap-input wf-text-box-negative wf-validation-box-red"
        placeholder="텍스트"
      />
      <WelfareInputText
        labelBottomLeft="text"
        inputType="text"
        v-model="defaultInputTextSecond"
        class="wrap-input wf-validation-box-blue"
        placeholder="텍스트"
      />
      <WelfareInputText
        labelBottomLeft="text"
        inputType="text"
        v-model="defaultInputTextThird"
        class="wrap-input wf-validation-box-n-33"
        placeholder="텍스트"
      />
      <WelfareInputText
        labelBottomLeft="text"
        inputType="text"
        v-model="defaultInputTextFour"
        class="wrap-input wf-validation-box-green"
        placeholder="텍스트"
      />
    </div>
    <div class="wf-space-y-26">
      <WelfareInputText
        size="small"
        labelBottomLeft="text"
        inputType="text"
        v-model="defaultSmallInputTextFirst"
        class="wrap-input wf-text-box-negative wf-validation-box-red"
        placeholder="텍스트"
      />
      <WelfareInputText
        size="small"
        labelBottomLeft="text"
        inputType="text"
        v-model="defaultSmallInputTextSecond"
        class="wrap-input wf-validation-box-blue"
        placeholder="텍스트"
      />
      <WelfareInputText
        size="small"
        labelBottomLeft="text"
        inputType="text"
        v-model="defaultSmallInputTextThird"
        class="wrap-input wf-validation-box-n-33"
        placeholder="텍스트"
      />
      <WelfareInputText
        size="small"
        labelBottomLeft="text"
        inputType="text"
        v-model="defaultSmallInputTextFour"
        class="wrap-input wf-validation-box-green"
        placeholder="텍스트"
      />
    </div>
  </div>
</template>
<style scoped>
@import url('@/assets/css/view/uikit/uikit-input-text-validation-view.css');
</style>
