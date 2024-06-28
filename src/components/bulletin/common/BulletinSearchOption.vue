<script lang="ts" setup>
import { WelfareInputText, WelfareSelect } from '@/components'

interface Option {
  label: string
  value: string
}

interface TNSearchOptionProps {
  options: Option[]
  onChangeInput: (value: string) => void
  onChangeSelect: (value: string) => void
  modelValueInput?: string
  modelValueSelect?: { label: string; value: string }
  handleReadOnlySearchWord: (value: boolean) => void
  isReadOnlySearchWord: boolean
}

const props = defineProps<TNSearchOptionProps>()

const renderDisable = () => {
  if (props.modelValueSelect) {
    return props.modelValueSelect.value === '사용안함'
  }
}
</script>
<template>
  <div class="wf_flex wf_items-center wf-space-x-4 wf_flex-1">
    <div class="select-box wf_w-180">
      <WelfareSelect @update:model-value="onChangeSelect" :modelValue="modelValueSelect" optionLabel="label" :options="options" small />
    </div>
    <div class="wf_flex-1 wf-text-box wf_textbox--h_40">
      <WelfareInputText
        @click="() => handleReadOnlySearchWord(false)"
        :readonly="isReadOnlySearchWord"
        size="small"
        :disabled="renderDisable()"
        :modelValue="modelValueInput"
        inputType="text"
        class="wrap-input"
        placeholder="최대 50개까지 입력 가능합니다. (,로 구분)"
        @update:model-value="onChangeInput"
      />
    </div>
  </div>
</template>
