<script setup lang="ts">
import { WelfareMdButton, WelfareDateTimePicker } from '@/components'
import FormGroup from '@/components/widgets/form/FormGroup.vue'
import { ProductDataFieldFormDeliveryProductListModel, ButtonDateModel } from '@/models'
import { DEFAULT_DATE_FORMAT_DOT } from '@/common'

interface FormGroupTimeLinesFilterFormProps {
  label: string
  disabled?: boolean
  currentActiveDate?: number
  fromDate?: string
  toDate?: string
  isRoundedBottom?: boolean
  isBorderBottom?: boolean
  class?: string
  customClass?: string
  optionDateButton?: ButtonDateModel[]
  disabledSelectOption?: boolean
  selectPlaceholder?: string
}

interface FormGroupTimeLinesFilterFormEmits {
  (e: 'onChangeDateFrom', value: string): 'void'
  (e: 'onChangeDateTo', value: string): 'void'
  (e: 'onChangeFilterDate', number: number): 'void'
}

const emits = defineEmits<FormGroupTimeLinesFilterFormEmits>()

const listEmits = {
  onChangeDateFrom: (value: string) => {
    emits('onChangeDateFrom', value)
  },
  onChangeDateTo: (value: string) => {
    emits('onChangeDateTo', value)
  },
  onChangeFilterDate: (value: number) => {
    emits('onChangeFilterDate', value)
  }
}

withDefaults(defineProps<FormGroupTimeLinesFilterFormProps>(), {
  label: '기간',
  disabled: false,
  isBorderBottom: true,
  isRoundedBottom: false,
  disabledSelectOption: false
})
const listButtonDate = ProductDataFieldFormDeliveryProductListModel.listButtonDateFilter
</script>

<template>
  <FormGroup
    :label="label"
    :is-border-bottom="isBorderBottom"
    :is-rounded-bottom="isRoundedBottom"
    :class="$props.class"
    :customClass="'wf-space-x-6 ' + $props.customClass"
  >
    <div class="wf_flex wf_items-center wf-space-x-4">
      <WelfareDateTimePicker
        :disabled="disabled"
        :modelValue="fromDate"
        @update:model-value="listEmits.onChangeDateFrom"
        :format="DEFAULT_DATE_FORMAT_DOT"
        :type="'date'"
        size="small"
      />
      <span class="wf-date_picker-double-text wf_text-n-33">~</span>
      <WelfareDateTimePicker
        :disabled="disabled"
        :modelValue="toDate"
        @update:model-value="listEmits.onChangeDateTo"
        :format="DEFAULT_DATE_FORMAT_DOT"
        :type="'date'"
        size="small"
      />
    </div>
    <div class="wf_flex wf_items-center wf-space-x-4 wf-approval-group-btn">
      <WelfareMdButton
        :disabled="disabled"
        v-for="(item, index) in ($props.optionDateButton ? $props.optionDateButton : listButtonDate)"
        :key="index"
        :label="item.label"
        class="wf_w-55"
        buttonType="neutral"
        :class="{ active: currentActiveDate === item.value }"
        @click="listEmits.onChangeFilterDate(item.value)"
        buttonSize="small"
      />
    </div>
  </FormGroup>
</template>
<script lang="ts">
export default {
  name: 'FormGroupTimeLinesWithOutSelectForm'
}
</script>