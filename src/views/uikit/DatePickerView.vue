<script setup lang="ts">
import { WelfareDateTimePicker } from '@/components'
import { DataType } from '@/models'
import { reactive } from 'vue'

const date = reactive({
  date: undefined
})
const date1 = reactive({
  date: undefined
})
const date2 = reactive({
  date: undefined
})
const date3 = reactive({
  date: undefined,
  disabled: true
})

const date4 = reactive({
  date: undefined
})
const date5 = reactive({
  date: undefined
})
const date6 = reactive({
  date: undefined
})
const date7 = reactive({
  date: undefined,
  disabled: true
})

const date8 = reactive<DataType>({
  date: undefined,
  size: 'small'
})
const date9 = reactive<DataType>({
  date: undefined,
  size: 'small'
})
const date10 = reactive<DataType>({
  date: undefined,
  size: 'small'
})
const date11 = reactive<DataType>({
  date: undefined,
  disabled: true,
  size: 'small'
})

const date12 = reactive<DataType>({
  date: undefined,
  size: 'small'
})
const date13 = reactive<DataType>({
  date: undefined,
  disabled: true,
  size: 'small'
})
</script>

<template>
  <div class="wf_container">
    <div class="wf_container-group">
      <WelfareDateTimePicker v-model="date.date" :type="'date'" :max-date="date1.date" />
      <WelfareDateTimePicker v-model="date1.date" :type="'date'" :min-date="date.date" />
      <WelfareDateTimePicker v-model="date2.date" :type="'date'" />
      <WelfareDateTimePicker v-model="date3.date" :type="'date'" :disabled="date3.disabled" />
    </div>
    <div class="wf_container-group">
      <div class="wf-date_picker-label wf-date_picker-label-col wf-mt-16">
        <label class="wf-text-col">text</label>
        <div class="wf-date_picker-label wf-date_picker-label-row">
          <label class="wf-text-row">text</label>
          <WelfareDateTimePicker v-model="date4.date" :type="'date'" />
        </div>
      </div>
      <div class="wf-date_picker-label wf-date_picker-label-col wf-mt-16">
        <label class="wf-text-col">text</label>
        <div class="wf-date_picker-label wf-date_picker-label-row">
          <label class="wf-text-row">text</label>
          <WelfareDateTimePicker v-model="date5.date" :type="'date'" />
        </div>
      </div>
      <div class="wf-date_picker-label wf-date_picker-label-col wf-mt-16">
        <label class="wf-text-col">text</label>
        <div class="wf-date_picker-label wf-date_picker-label-row">
          <label class="wf-text-row">text</label>
          <WelfareDateTimePicker v-model="date6.date" :type="'date'" />
        </div>
      </div>
      <div class="wf-date_picker-label wf-date_picker-label-col wf-mt-16">
        <label class="wf-text-col">text</label>
        <div class="wf-date_picker-label wf-date_picker-label-row">
          <label class="wf-text-row">text</label>
          <WelfareDateTimePicker v-model="date7.date" :type="'date'" :disabled="date7.disabled" />
        </div>
      </div>
    </div>
    <div class="wf_container-group">
      <WelfareDateTimePicker v-model="date8.date" :type="'date'" :size="date8.size" />
      <WelfareDateTimePicker v-model="date9.date" :type="'date'" :size="date9.size" />
      <WelfareDateTimePicker v-model="date10.date" :type="'date'" :size="date10.size" />
      <WelfareDateTimePicker v-model="date11.date" :type="'date'" :disabled="date11.disabled" :size="date11.size" />
    </div>
    <div class="wf_date-picker-validation">
      <WelfareDateTimePicker v-model="date12.date" :max-date="date13.date" />
      <span>~</span>
      <WelfareDateTimePicker v-model="date13.date" :min-date="date12.date" />
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/uikit/uikit-date-picker-view.css');
</style>
