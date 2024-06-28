<script setup lang="ts">
import { ref } from 'vue'
import { WelfareInputText, WelfareTextarea } from '@/components'
const defaultInputText1 = ref('텍스트')
const defaultInputText2 = ref('텍스트')
const defaultInputText3 = ref('텍스트')
const defaultInputText4 = ref('텍스트')
const defaultInputText5 = ref('텍스트')
const defaultInputText6 = ref('텍스트')
const defaultInputTextNegative1 = ref('텍스트')
const defaultInputTextNegative2 = ref('텍스트')
const defaultInputTextNegative3 = ref('텍스트')
const defaultInputTextNegative4 = ref('텍스트')
const defaultInputTextNegative5 = ref('텍스트')
const defaultInputTextNegative6 = ref('텍스트')
const defaultInputTextSmall1 = ref('텍스트')
const defaultInputTextSmall2 = ref('텍스트')
const defaultInputTextSmall3 = ref('텍스트')
const defaultInputTextSmall4 = ref('텍스트')
const defaultInputTextSmall5 = ref('텍스트')
const defaultInputTextSmall6 = ref('텍스트')
const defaultInputTextNegativeSmall1 = ref('텍스트')
const defaultInputTextNegativeSmall2 = ref('텍스트')
const defaultInputTextNegativeSmall3 = ref('텍스트')
const defaultInputTextNegativeSmall4 = ref('텍스트')
const defaultInputTextNegativeSmall5 = ref('텍스트')
const defaultInputTextNegativeSmall6 = ref('텍스트')
</script>
<template>
  <!-- inputType is type of input element -->
  <div class="wf_textbox--root">
    <div class="wf_textbox--container">
      <div class="wf-mr-89 wf-space-y-22">
        <WelfareInputText labelBottomLeft="text" labelBottomRight="text" class="wrap-input-text-box-388" placeholder="텍스트" />
        <WelfareInputText labelBottomLeft="text" labelBottomRight="text" class="wrap-input-text-box-388 wf-text-box-active" placeholder="텍스트" />
        <WelfareInputText
          labelBottomLeft="text"
          labelBottomRight="text"
          class="wrap-input-text-box-388"
          v-model="defaultInputText1"
          placeholder="텍스트"
        />
        <WelfareInputText labelBottomLeft="text" labelBottomRight="text" class="wrap-input-text-box-388" disabled placeholder="텍스트" />
        <WelfareInputText
          labelBottomLeft="text"
          labelBottomRight="text"
          class="wrap-input-text-box-388 wf-text-box-negative"
          v-model="defaultInputTextNegative1"
          placeholder="텍스트"
        />
      </div>
      <div class="wf-mr-160 wf-mt--6 wf-space-y-40">
        <WelfareInputText
          labelTop="text"
          labelLeft="text"
          labelBottomLeft="text"
          labelBottomRight="text"
          class="wrap-input-text-box-300 wrap-input-padding-row-10-12"
          placeholder="텍스트"
        />
        <WelfareInputText
          labelTop="text"
          labelLeft="text"
          labelBottomLeft="text"
          labelBottomRight="text"
          class="wrap-input-text-box-300 wf-text-box-active wrap-input-padding-row-10-12"
          placeholder="텍스트"
        />
        <WelfareInputText
          labelTop="text"
          labelLeft="text"
          labelBottomLeft="text"
          labelBottomRight="text"
          class="wrap-input-text-box-300 wrap-input-padding-row-10-12"
          v-model="defaultInputText2"
          placeholder="텍스트"
        />
        <WelfareInputText
          labelTop="text"
          labelLeft="text"
          labelBottomLeft="text"
          labelBottomRight="text"
          class="wrap-input-text-box-300 wrap-input-padding-row-10-12"
          disabled
          placeholder="텍스트"
        />
        <WelfareInputText
          labelTop="text"
          labelLeft="text"
          labelBottomLeft="text"
          labelBottomRight="text"
          class="wrap-input-text-box-300 wf-text-box-negative wrap-input-padding-row-10-12"
          v-model="defaultInputTextNegative2"
          placeholder="텍스트"
        />
      </div>
      <div class="wf-mr-89 wf-space-y-38">
        <WelfareTextarea labelBottomLeft="text" labelBottomRight="text" class="wrap-textarea-388" placeholder="텍스트" />
        <WelfareTextarea labelBottomLeft="text" labelBottomRight="text" class="wrap-textarea-388 wf-text-box-active" placeholder="텍스트" />
        <WelfareTextarea labelBottomLeft="text" labelBottomRight="text" class="wrap-textarea-388" v-model="defaultInputText3" placeholder="텍스트" />
        <WelfareTextarea disabled labelBottomLeft="text" labelBottomRight="text" class="wrap-textarea-388" placeholder="텍스트" />
        <WelfareTextarea
          labelBottomLeft="text"
          labelBottomRight="text"
          class="wrap-textarea-388 wf-text-box-negative"
          v-model="defaultInputTextNegative3"
          placeholder="텍스트"
        />
      </div>
      <div class="wf-mr-246 wf-mt--15 wf-space-y-45">
        <WelfareTextarea
          labelTop="text"
          labelLeft="text"
          labelBottomLeft="text"
          labelBottomRight="text"
          class="wrap-textarea-300"
          placeholder="텍스트"
        />
        <WelfareTextarea
          labelTop="text"
          labelLeft="text"
          labelBottomLeft="text"
          labelBottomRight="text"
          class="wrap-textarea-300 wf-text-box-active"
          placeholder="텍스트"
        />
        <WelfareTextarea
          labelTop="text"
          labelLeft="text"
          labelBottomLeft="text"
          labelBottomRight="text"
          class="wrap-textarea-300"
          v-model="defaultInputText4"
          placeholder="텍스트"
        />
        <WelfareTextarea
          disabled
          labelTop="text"
          labelLeft="text"
          labelBottomLeft="text"
          labelBottomRight="text"
          class="wrap-textarea-300"
          placeholder="텍스트"
        />
        <WelfareTextarea
          labelTop="text"
          labelLeft="text"
          labelBottomLeft="text"
          labelBottomRight="text"
          class="wrap-textarea-300 wf-text-box-negative"
          v-model="defaultInputTextNegative4"
          placeholder="텍스트"
        />
      </div>
      <div class="wf-mr-61">
        <WelfareTextarea labelBottomLeft="text" labelBottomRight="text" class="wrap-textarea-388-h-200" placeholder="텍스트" />
        <WelfareTextarea
          labelBottomLeft="text"
          labelBottomRight="text"
          class="wrap-textarea-388-h-200 wf-text-box-active wf-mt-42"
          placeholder="텍스트"
        />
        <WelfareTextarea
          labelBottomLeft="text"
          labelBottomRight="text"
          class="wrap-textarea-388-h-200 wf-mt-52"
          v-model="defaultInputText5"
          placeholder="텍스트"
        />
        <WelfareTextarea disabled labelBottomLeft="text" labelBottomRight="text" class="wrap-textarea-388-h-200 wf-mt-51" placeholder="텍스트" />
        <WelfareTextarea
          labelBottomLeft="text"
          labelBottomRight="text"
          class="wrap-textarea-388-h-200 wf-text-box-negative wf-mt-19"
          v-model="defaultInputTextNegative5"
          placeholder="텍스트"
        />
      </div>
      <div class="wf-mt-1 wf-space-y-33">
        <WelfareTextarea
          labelTop="text"
          labelLeft="text"
          labelBottomLeft="text"
          labelBottomRight="text"
          class="wrap-textarea-300-h-200"
          placeholder="텍스트"
        />
        <WelfareTextarea
          labelTop="text"
          labelLeft="text"
          labelBottomLeft="text"
          labelBottomRight="text"
          class="wrap-textarea-300-h-200 wf-text-box-active"
          placeholder="텍스트"
        />
        <WelfareTextarea
          labelTop="text"
          labelLeft="text"
          labelBottomLeft="text"
          labelBottomRight="text"
          class="wrap-textarea-300-h-200"
          v-model="defaultInputText6"
          placeholder="텍스트"
        />
        <WelfareTextarea
          disabled
          labelTop="text"
          labelLeft="text"
          labelBottomLeft="text"
          labelBottomRight="text"
          class="wrap-textarea-300-h-200"
          placeholder="텍스트"
        />
        <WelfareTextarea
          labelTop="text"
          labelLeft="text"
          labelBottomLeft="text"
          labelBottomRight="text"
          class="wrap-textarea-300-h-200 wf-text-box-negative"
          v-model="defaultInputTextNegative6"
          placeholder="텍스트"
        />
      </div>
    </div>
    <div class="wf_textbox--container-small wf-mt-10">
      <div class="wf-mr-89 wf-space-y-32">
        <WelfareInputText size="small" labelBottomLeft="text" labelBottomRight="text" class="wrap-input-text-box-388" placeholder="텍스트" />
        <WelfareInputText
          size="small"
          labelBottomLeft="text"
          labelBottomRight="text"
          class="wrap-input-text-box-388 wf-text-box-active"
          placeholder="텍스트"
        />
        <WelfareInputText
          size="small"
          labelBottomLeft="text"
          labelBottomRight="text"
          class="wrap-input-text-box-388"
          v-model="defaultInputTextSmall1"
          placeholder="텍스트"
        />
        <WelfareInputText size="small" labelBottomLeft="text" labelBottomRight="text" class="wrap-input-text-box-388" disabled placeholder="텍스트" />
        <WelfareInputText
          size="small"
          labelBottomLeft="text"
          labelBottomRight="text"
          class="wrap-input-text-box-388 wf-text-box-negative"
          v-model="defaultInputTextNegativeSmall1"
          placeholder="텍스트"
        />
      </div>
      <div class="wf-mr-163 wf-mt--6 wf-space-y-52">
        <WelfareInputText
          size="small"
          labelTop="text"
          labelLeft="text"
          labelBottomLeft="text"
          labelBottomRight="text"
          class="wrap-input-text-box-300 wrap-input-padding-row-10-12 wf-w-23"
          placeholder="텍스트"
        />
        <WelfareInputText
          size="small"
          labelTop="text"
          labelLeft="text"
          labelBottomLeft="text"
          labelBottomRight="text"
          class="wrap-input-text-box-300 wrap-input-padding-row-10-12 wf-text-box-active wf-w-23"
          placeholder="텍스트"
        />
        <WelfareInputText
          size="small"
          labelTop="text"
          labelLeft="text"
          labelBottomLeft="text"
          labelBottomRight="text"
          class="wrap-input-text-box-300 wrap-input-padding-row-10-12 wf-w-23"
          v-model="defaultInputTextSmall2"
          placeholder="텍스트"
        />
        <WelfareInputText
          size="small"
          labelTop="text"
          labelLeft="text"
          labelBottomLeft="text"
          labelBottomRight="text"
          class="wrap-input-text-box-300 wrap-input-padding-row-10-12 wf-w-23"
          disabled
          placeholder="텍스트"
        />
        <WelfareInputText
          size="small"
          labelTop="text"
          labelLeft="text"
          labelBottomLeft="text"
          labelBottomRight="text"
          class="wrap-input-text-box-300 wrap-input-padding-row-10-12 wf-text-box-negative wf-w-23"
          v-model="defaultInputTextNegativeSmall2"
          placeholder="텍스트"
        />
      </div>
      <div class="wf-mr-89 wf-space-y-38">
        <WelfareTextarea size="small" labelBottomLeft="text" labelBottomRight="text" class="wrap-textarea-388" placeholder="텍스트" />
        <WelfareTextarea
          size="small"
          labelBottomLeft="text"
          labelBottomRight="text"
          class="wrap-textarea-388 wf-text-box-active"
          placeholder="텍스트"
        />
        <WelfareTextarea
          size="small"
          labelBottomLeft="text"
          labelBottomRight="text"
          class="wrap-textarea-388"
          v-model="defaultInputTextSmall3"
          placeholder="텍스트"
        />
        <WelfareTextarea size="small" disabled labelBottomLeft="text" labelBottomRight="text" class="wrap-textarea-388" placeholder="텍스트" />
        <WelfareTextarea
          size="small"
          labelBottomLeft="text"
          labelBottomRight="text"
          class="wrap-textarea-388 wf-text-box-negative"
          v-model="defaultInputTextNegativeSmall3"
          placeholder="텍스트"
        />
      </div>
      <div class="wf-mt--15 wf-space-y-47 wf-mr-225">
        <WelfareTextarea
          size="small"
          labelTop="text"
          labelLeft="text"
          labelBottomLeft="text"
          labelBottomRight="text"
          class="wrap-textarea-300 wf-w-23"
          placeholder="텍스트"
        />
        <WelfareTextarea
          size="small"
          labelTop="text"
          labelLeft="text"
          labelBottomLeft="text"
          labelBottomRight="text"
          class="wrap-textarea-300 wf-text-box-active wf-w-23"
          placeholder="텍스트"
        />
        <WelfareTextarea
          size="small"
          labelTop="text"
          labelLeft="text"
          labelBottomLeft="text"
          labelBottomRight="text"
          class="wrap-textarea-300 wf-w-23"
          v-model="defaultInputTextSmall4"
          placeholder="텍스트"
        />
        <WelfareTextarea
          size="small"
          disabled
          labelTop="text"
          labelLeft="text"
          labelBottomLeft="text"
          labelBottomRight="text"
          class="wrap-textarea-300 wf-w-23"
          placeholder="텍스트"
        />
        <WelfareTextarea
          size="small"
          labelTop="text"
          labelLeft="text"
          labelBottomLeft="text"
          labelBottomRight="text"
          class="wrap-textarea-300 wf-text-box-negative wf-w-23"
          v-model="defaultInputTextNegativeSmall4"
          placeholder="텍스트"
        />
      </div>
      <div class="wf-mr-85">
        <WelfareTextarea size="small" labelBottomLeft="text" labelBottomRight="text" class="wrap-textarea-388-h-200" placeholder="텍스트" />
        <WelfareTextarea
          size="small"
          labelBottomLeft="text"
          labelBottomRight="text"
          class="wrap-textarea-388-h-200 wf-text-box-active wf-mt-56"
          placeholder="텍스트"
        />
        <WelfareTextarea
          size="small"
          labelBottomLeft="text"
          labelBottomRight="text"
          class="wrap-textarea-388-h-200 wf-mt-38"
          v-model="defaultInputTextSmall5"
          placeholder="텍스트"
        />
        <WelfareTextarea
          size="small"
          disabled
          labelBottomLeft="text"
          labelBottomRight="text"
          class="wrap-textarea-388-h-200 wf-mt-36"
          placeholder="텍스트"
        />
        <WelfareTextarea
          size="small"
          labelBottomLeft="text"
          labelBottomRight="text"
          class="wrap-textarea-388-h-200 wf-text-box-negative wf-mt-31"
          v-model="defaultInputTextNegativeSmall5"
          placeholder="텍스트"
        />
      </div>
      <div class="wf-mt-1 wf-space-y-35">
        <WelfareTextarea
          size="small"
          labelTop="text"
          labelLeft="text"
          labelBottomLeft="text"
          labelBottomRight="text"
          class="wrap-textarea-300-h-200 wf-w-23"
          placeholder="텍스트"
        />
        <WelfareTextarea
          size="small"
          labelTop="text"
          labelLeft="text"
          labelBottomLeft="text"
          labelBottomRight="text"
          class="wrap-textarea-300-h-200 wf-text-box-active wf-w-23"
          placeholder="텍스트"
        />
        <WelfareTextarea
          size="small"
          labelTop="text"
          labelLeft="text"
          labelBottomLeft="text"
          labelBottomRight="text"
          class="wrap-textarea-300-h-200 wf-w-23"
          v-model="defaultInputTextSmall6"
          placeholder="텍스트"
        />
        <WelfareTextarea
          size="small"
          disabled
          labelTop="text"
          labelLeft="text"
          labelBottomLeft="text"
          labelBottomRight="text"
          class="wrap-textarea-300-h-200 wf-w-23"
          placeholder="텍스트"
        />
        <WelfareTextarea
          size="small"
          labelTop="text"
          labelLeft="text"
          labelBottomLeft="text"
          labelBottomRight="text"
          class="wrap-textarea-300-h-200 wf-text-box-negative wf-w-23"
          v-model="defaultInputTextNegativeSmall6"
          placeholder="텍스트"
        />
      </div>
    </div>
  </div>
</template>
<style scoped>
@import url('@/assets/css/view/uikit/uikit-text-box-view.css');
</style>
