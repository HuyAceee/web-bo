<script setup>
import { WelfareCheckbox } from '@/components/uikit'
import { ref } from 'vue'

const value1 = ref('')
const value2 = ref('')
const value3 = ref('')
const value4 = ref('')
const value5 = ref(true)
const value6 = ref(true)
const value7 = ref(true)
const value8 = ref(true)
</script>

<template>
  <div class="container gap-y-14">
    <!-- state default -->
    <div class="row-wrap">
      <!-- default size: md -->
      <WelfareCheckbox v-model="value1" />

      <!-- label?: string -->
      <WelfareCheckbox v-model="value2" class="ml-36" label="text" />

      <!-- size: sm -->
      <WelfareCheckbox v-model="value3" class="ml-93" size="sm" />

      <WelfareCheckbox v-model="value4" class="ml-40" size="sm" label="text" />
    </div>

    <!-- state checked -->
    <div class="row-wrap">
      <WelfareCheckbox v-model="value5" />

      <WelfareCheckbox v-model="value6" class="ml-36" label="text" />

      <WelfareCheckbox v-model="value7" class="ml-93" size="sm" />

      <WelfareCheckbox v-model="value8" class="ml-40" size="sm" label="text" />
    </div>

    <!-- state disabled -->
    <div class="row-wrap">
      <WelfareCheckbox disabled />

      <WelfareCheckbox class="ml-36" disabled label="text" />

      <WelfareCheckbox class="ml-93" disabled size="sm" />

      <WelfareCheckbox class="ml-40" disabled size="sm" label="text" />
    </div>

    <!-- state checked disabled -->
    <div class="row-wrap">
      <WelfareCheckbox :model-value="true" disabled />

      <WelfareCheckbox class="ml-36" :model-value="true" disabled label="text" />

      <WelfareCheckbox class="ml-93" :model-value="true" disabled size="sm" />

      <WelfareCheckbox class="ml-40" :model-value="true" disabled size="sm" label="text" />
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/uikit/uikit-check-box-view.css');
</style>
