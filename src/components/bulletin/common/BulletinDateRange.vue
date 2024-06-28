<script setup lang="ts">
import { DAYS_PER_MONTH, DAYS_PER_THREE_MONTH, DAYS_PER_WEEK, DAYS_PER_YEAR, FORMAT_DATE_YYYY_MM_DD } from '@/common';
import { WelfareDateTimePicker, WelfareMdButton } from '@/components'
import { DateTimePickerProps } from '@/models'

interface TNDateRangeProps extends DateTimePickerProps {
  onChangeDateFrom: (value: string) => void
  onChangeDateTo: (value: string) => void
  onChangeFilterDate: (number: number) => void
  currentActiveDate?: number
  fromDate: string
  toDate: string
}

defineProps<TNDateRangeProps>()

const optionButton = [
  { label: '오늘', id: 1, value: 0 },
  { label: '7일', id: 2, value: DAYS_PER_WEEK },
  { label: '1개월', id: 3, value: DAYS_PER_MONTH },
  { label: '3개월', id: 4, value: DAYS_PER_THREE_MONTH },
  { label: '1년', id: 5, value: DAYS_PER_YEAR }
]
</script>

<template>
  <div class="wf_flex wf_items-center wf-space-x-6">
    <div class="wf_flex wf_items-center wf-space-x-4">
      <WelfareDateTimePicker
        :disabled="disabled"
        :modelValue="fromDate"
        @update:model-value="onChangeDateFrom"
        :format="FORMAT_DATE_YYYY_MM_DD"
        :type="'date'"
        size="small"
      />
      <p class="wf-body_01-reg wf_w-11">~</p>
      <WelfareDateTimePicker
        :disabled="disabled"
        :modelValue="toDate"
        @update:model-value="onChangeDateTo"
        :format="FORMAT_DATE_YYYY_MM_DD"
        :type="'date'"
        size="small"
      />
    </div>
    <div class="wf_flex wf-space-x-4" v-if="currentActiveDate !== undefined">
      <WelfareMdButton
        :disabled="disabled"
        v-for="option of optionButton"
        :key="option.id"
        :label="option.label"
        buttonType="neutral"
        :class="{ active: currentActiveDate === option.value }"
        @click="onChangeFilterDate(option.value)"
        buttonSize="small"
        class="wf_w-55"
      />
    </div>
  </div>
</template>
