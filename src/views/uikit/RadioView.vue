<script setup lang="ts">
import {
  WelfareRadio
  // WelfareRadioGroup
} from '@/components/uikit'
// import { WelfareRadioProps } from '@/models'
import {
  // reactive,
  ref
} from 'vue'

// const radio = ref('one')
// const options = reactive<WelfareRadioProps[]>([
//   { value: 'zero' },
//   { label: 'One', value: 'one' },
//   { label: 'Two', value: 'two' },
//   { label: 'Three (disabled)', value: 'three', disabled: true }
// ])
const value1 = ref('')
const value2 = ref('')
const value3 = ref('')
const value4 = ref('')
const value5 = ref('test')
const value6 = ref('test')
const value7 = ref('test')
const value8 = ref('test')
// const valueGroup = ref('')
</script>

<template>
  <!-- group radio -->
  <div class="container gap-y-20">
    <!-- state default -->
    <div class="row-wrap">
      <WelfareRadio v-model="value1" name="radio" value="test" />

      <WelfareRadio v-model="value2" class="ml-27" value="test" label="text" name="radio-la" />

      <WelfareRadio v-model="value3" class="ml-109" value="test" name="radio-sm" size="sm" />

      <WelfareRadio v-model="value4" class="ml-31" value="test" label="text" name="radio-la-sm" size="sm" />
    </div>

    <!-- state checked -->
    <div class="row-wrap">
      <WelfareRadio v-model="value5" value="test" name="radio-ck" />

      <WelfareRadio v-model="value6" value="test" class="ml-27" label="text" name="radio-la-ck" />

      <WelfareRadio v-model="value7" value="test" class="ml-109" name="radio-sm-ck" size="sm" />

      <WelfareRadio v-model="value8" value="test" class="ml-31" label="text" name="radio-la-sm-ck" size="sm" />
    </div>

    <!-- state disabled -->
    <div class="row-wrap">
      <WelfareRadio value="test" name="radio-di" disabled />

      <WelfareRadio value="test" label="text" class="ml-27" name="radio-la-di" disabled />

      <WelfareRadio value="test" class="ml-109" name="radio-sm-di" disabled size="sm" />

      <WelfareRadio value="test" label="text" class="ml-31" name="radio-la-sm-di" disabled size="sm" />
    </div>

    <!-- state checked disabled -->
    <div class="row-wrap">
      <WelfareRadio model-value="test" value="test" name="radio-ck-di" disabled />

      <WelfareRadio model-value="test" value="test" label="text" class="ml-27" name="radio-la-ck-di" disabled />

      <WelfareRadio model-value="test" value="test" class="ml-109" name="radio-sm-ck-di" disabled size="sm" />

      <WelfareRadio model-value="test" value="test" label="text" class="ml-31" name="radio-la-sm-ck-di" disabled size="sm" />
    </div>
  </div>

  <!-- Radio List -->
</template>

<style scoped>
@import url('@/assets/css/view/uikit/uikit-radio-view.css');
</style>
