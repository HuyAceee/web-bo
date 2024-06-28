<script setup lang="ts">
import { WelfareDateTimePicker } from '@/components/uikit'
import { useModalNotification } from '@/composables'
import { ProductDateRowKey } from '@/models/views'
import { ref, watch } from 'vue'

interface Props {
  beginDate: string
  endDate: string
}

interface Emits {
  (e: 'update-date', value: { key: ProductDateRowKey; value: string }): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()
const beginDateRef = ref<string>(props.beginDate)
const endDateRef = ref<string>(props.endDate)

const { openModal } = useModalNotification()

watch([beginDateRef, endDateRef], () => {
  emits('update-date', { key: 'beginDate', value: beginDateRef.value })
  emits('update-date', { key: 'endDate', value: endDateRef.value })
  if (beginDateRef.value && endDateRef.value && beginDateRef.value > endDateRef.value) {
    openModal({ content: '시간이 잘못되었습니다. 다시 선택해주세요' })
    endDateRef.value = ''
  }
})
</script>

<template>
  <WelfareDateTimePicker v-model="beginDateRef" size="small" />
  <span class="wf-feetback">~</span>
  <WelfareDateTimePicker v-model="endDateRef" size="small" />
</template>
