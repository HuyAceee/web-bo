<script setup lang="ts">
import { FORMAT_DATE_YYYY_MM_DD, handleGetTimeLines } from '@/common'
import { WelfareDateTimePicker, WelfareMdButton } from '@/components'
import { onMounted, ref } from 'vue'
import { useModalNotification } from '@/composables'

enum EDateFilter {
  LAST_DAY = 'lastday',
  LAST_WEEK = 'lastweek',
  LAST_MONTH = 'lastmonth',
  LAST_QUARTER = 'lastquarter',
  LAST_YEAR = 'lastyear',
  CUSTOM = 'custom'
}

interface FormGroupDateFilterProps {
  startDate?: any
  endDate?: any
  default?: EDateFilter
  disabled?: boolean
}

interface FormGroupDateFilterEmits {
  (e: 'update:startDate', value: any): void

  (e: 'update:endDate', value: any): void
}

const listButton = [
  {
    label: '오늘',
    value: EDateFilter.LAST_DAY
  },
  {
    label: '7일',
    value: EDateFilter.LAST_WEEK
  },
  {
    label: '1개월',
    value: EDateFilter.LAST_MONTH
  },
  {
    label: '3개월',
    value: EDateFilter.LAST_QUARTER
  },
  {
    label: '1년',
    value: EDateFilter.LAST_YEAR
  }
]

const props = defineProps<FormGroupDateFilterProps>()
const emit = defineEmits<FormGroupDateFilterEmits>()

const handleReset = () => {
  handleChange(props.default)
}

defineExpose({ handleReset })

const btnSelected = ref<EDateFilter>()
const { openModal } = useModalNotification()

onMounted(() => {
  const { currentDateString, lastCustomDayString } = handleGetTimeLines(6, FORMAT_DATE_YYYY_MM_DD)
  emit('update:startDate', lastCustomDayString)
  emit('update:endDate', currentDateString)
  handleChange(props.default)
})

const handleChange = (_case?: EDateFilter) => {
  btnSelected.value = _case || EDateFilter.LAST_WEEK
  let days = 0
  switch (_case) {
    case EDateFilter.LAST_DAY:
      days = 1
      break
    case EDateFilter.LAST_WEEK:
      days = 6
      break
    case EDateFilter.LAST_MONTH:
      days = 29
      break
    case EDateFilter.LAST_QUARTER:
      days = 89
      break
    case EDateFilter.LAST_YEAR:
      days = 364
      break
    default:
  }

  if (days) {
    const { currentDateString, lastCustomDayString } = handleGetTimeLines(days, FORMAT_DATE_YYYY_MM_DD)
    emit('update:startDate', lastCustomDayString)
    emit('update:endDate', currentDateString)
  }
}

const handleChooseStartDate = (value: string) => {
  if (props.startDate < value) {
    openModal({
      content: '시작일은 종료일보다 뒤로 설정할 수 없습니다.'
    })
    return
  }
  emit('update:startDate', value)
}

const handleChooseEndDate = (value: string) => {
  if (props.endDate > value) {
    openModal({
      content: '종료일은 시작일보다 앞으로 설정할 수 없습니다. '
    })
    return
  }
  emit('update:endDate', value)
}
</script>

<template>
  <div class="wf_flex wf-space-x-6">
    <div class="wf_flex wf_items-center wf-space-x-4">
      <WelfareDateTimePicker
        :model-value="$props.startDate"
        @update:model-value="handleChooseStartDate"
        size="small"
        format="YYYY.MM.DD"
        :disabled="$props.disabled"
      />
      <span class="wf_text-n-33">~</span>
      <WelfareDateTimePicker
        :model-value="$props.endDate"
        @update:model-value="handleChooseEndDate"
        size="small"
        format="YYYY.MM.DD"
        :disabled="$props.disabled"
      />
    </div>
    <div class="wf_flex wf_items-center wf-space-x-4">
      <WelfareMdButton
        v-for="(item, index) in listButton"
        :key="index"
        class="wf_w-55"
        button-size="small"
        :label="item.label"
        buttonType="neutral"
        :class="{ active: btnSelected === item.value }"
        @on-click="() => handleChange(item.value)"
        :disabled="$props.disabled"
      />
    </div>
  </div>
</template>
