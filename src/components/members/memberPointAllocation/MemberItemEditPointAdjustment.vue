<script setup lang="ts">
import { WelfareInputNumber, WelfareSelect } from '@/components'
import { ref } from 'vue'

const selectItems = ref()
const inputNumber = ref()

const optionSelect = [
  { label: '회원명', value: '1' },
  { label: '회원코드', value: '2' }
]
</script>

<template>
  <WelfareSelect class="wf_m-w-50" optionLabel="label" small v-model="selectItems" :options="optionSelect" />
  <WelfareInputNumber
    size="small"
    class="wf_flex wf-width-full wf-ml-6"
    placeholder="숫자만 입력"
    :model-value="inputNumber"
    @update:model-value="
      (value) => {
        inputNumber.value = value
      }
    "
  />
</template>

<style scoped>
@import url('@/assets/css/view/member/member-point-adjustment-registration.css');
</style>