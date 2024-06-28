<script setup lang="ts">
import { DEFAULT_DATE_TIME_FORMAT } from '@/common'
import { WelfareDateTimePicker } from '@/components'
import { DateTimePickerSizeType } from '@/models'
import { reactive } from 'vue'

interface DataType {
  date?: string
  format?: string
  size?: DateTimePickerSizeType
  disabled?: boolean
}
const date = reactive({
  date: undefined
})
const date1 = reactive({
  date: undefined,
  format: DEFAULT_DATE_TIME_FORMAT
})
const date2 = reactive({
  date: undefined,
  format: DEFAULT_DATE_TIME_FORMAT
})
const date3 = reactive({
  date: undefined,
  disabled: true,
  format: DEFAULT_DATE_TIME_FORMAT
})

const date4 = reactive({
  date: undefined,
  format: DEFAULT_DATE_TIME_FORMAT
})
const date5 = reactive({
  date: undefined,
  format: DEFAULT_DATE_TIME_FORMAT
})
const date6 = reactive({
  date: undefined,
  format: DEFAULT_DATE_TIME_FORMAT
})
const date7 = reactive({
  date: undefined,
  format: DEFAULT_DATE_TIME_FORMAT,
  disabled: true
})

const date8 = reactive<DataType>({
  date: undefined,
  format: DEFAULT_DATE_TIME_FORMAT,
  size: 'small'
})
const date9 = reactive<DataType>({
  date: undefined,
  format: DEFAULT_DATE_TIME_FORMAT,
  size: 'small'
})
const date10 = reactive<DataType>({
  date: undefined,
  format: DEFAULT_DATE_TIME_FORMAT,
  size: 'small'
})
const date11 = reactive<DataType>({
  date: undefined,
  format: DEFAULT_DATE_TIME_FORMAT,
  disabled: true,
  size: 'small'
})
const date12 = reactive<DataType>({
  date: undefined,
  format: DEFAULT_DATE_TIME_FORMAT,
})
const date13 = reactive<DataType>({
  date: undefined,
  format: DEFAULT_DATE_TIME_FORMAT,
})
</script>

<template>
  <div class="wf_container">
    <div class="wf_container-group">
      <WelfareDateTimePicker v-model="date.date" :type="'date-time'" :max-date="date1.date" />
      <WelfareDateTimePicker v-model="date1.date" :format="date1.format" :min-date="date.date" />
      <WelfareDateTimePicker v-model="date2.date" :format="date2.format" />
      <WelfareDateTimePicker v-model="date3.date" :format="date3.format" :disabled="date3.disabled" />
    </div>
    <div class="wf_container-group">
      <div class="wf-date_picker-label wf-date_picker-label-col wf-mt-16">
        <label class="wf-text-col">text</label>
        <div class="wf-date_picker-label wf-date_picker-label-row">
          <label class="wf-text-row">text</label>
          <WelfareDateTimePicker v-model="date4.date" :format="date4.format" />
        </div>
      </div>
      <div class="wf-date_picker-label wf-date_picker-label-col wf-mt-16">
        <label class="wf-text-col">text</label>
        <div class="wf-date_picker-label wf-date_picker-label-row">
          <label class="wf-text-row">text</label>
          <WelfareDateTimePicker v-model="date5.date" :format="date5.format" />
        </div>
      </div>
      <div class="wf-date_picker-label wf-date_picker-label-col wf-mt-16">
        <label class="wf-text-col">text</label>
        <div class="wf-date_picker-label wf-date_picker-label-row">
          <label class="wf-text-row">text</label>
          <WelfareDateTimePicker v-model="date6.date" :format="date6.format" />
        </div>
      </div>
      <div class="wf-date_picker-label wf-date_picker-label-col wf-mt-16">
        <label class="wf-text-col">text</label>
        <div class="wf-date_picker-label wf-date_picker-label-row">
          <label class="wf-text-row">text</label>
          <WelfareDateTimePicker v-model="date7.date" :format="date7.format" :disabled="date7.disabled" />
        </div>
      </div>
    </div>
    <div class="wf_container-group">
      <WelfareDateTimePicker v-model="date8.date" :size="date8.size" :format="date8.format" />
      <WelfareDateTimePicker v-model="date9.date" :size="date9.size" :format="date9.format" />
      <WelfareDateTimePicker v-model="date10.date" :size="date10.size" :format="date10.format" />
      <WelfareDateTimePicker v-model="date11.date" :disabled="date11.disabled" :size="date11.size" :format="date11.format" />
    </div>
    <div class="wf_date-time-picker-validation">
      <WelfareDateTimePicker v-model="date12.date" :format="date12.format"  :max-date="date13.date" />
      <span>~</span>
      <WelfareDateTimePicker v-model="date13.date" :format="date13.format" :min-date="date12.date" />
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/uikit/uikit-date-time-picker-view.css');
</style>
