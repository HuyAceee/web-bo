<script setup lang="ts">
import { WelfareSelect, WelfareMdButton } from '@/components'
import FormGroup from '@/components/widgets/form/FormGroup.vue'
import { WelfareSelectOptionType, ProductDataFieldFormDeliveryProductListModel, ButtonDateModel } from '@/models'
import { DEFAULT_DATE_FORMAT_DOT } from '@/common'
import { useFormGroupTimeLinesFilterForm } from '@/composables/widgets/dateTimePicker/useFormGroupTimeLinesFilterForm'
import DateTimePicker from '@/components/widgets/dateTimePicker/DateTimePicker.vue'
export interface FormGroupTimeLinesFilterFormProps {
  label: string
  disabled?: boolean
  currentTypeDateProductSelect?: WelfareSelectOptionType
  optionsProductTypeDate?: WelfareSelectOptionType[]
  currentActiveDate?: number
  fromDate?: string
  toDate?: string
  classSelect?: string
  isRoundedBottom?: boolean
  isBorderBottom?: boolean
  class?: string
  customClass?: string
  optionDateButton?: ButtonDateModel[]
  disabledSelectOption?: boolean
  selectPlaceholder?: string
  hiddenSelectOption?: boolean
  required?: boolean
}

interface FormGroupTimeLinesFilterFormEmits {
  (e: 'onSelectType', value: WelfareSelectOptionType): void

  (e: 'onChangeDateFrom', value: string): void

  (e: 'onChangeDateTo', value: string): void

  (e: 'onChangeFilterDate', number: number): void
}

const emits = defineEmits<FormGroupTimeLinesFilterFormEmits>()

const listEmits = {
  onSelectType: (value: WelfareSelectOptionType) => {
    emits('onSelectType', value)
  },
  onChangeDateFrom: (value: string) => {
    emits('onChangeDateFrom', value)
  },
  onChangeDateTo: (value: string) => {
    emits('onChangeDateTo', value)
  },
  onChangeFilterDate: (value: number) => {
    resetSelectSimple()
    emits('onChangeFilterDate', value)
  }
}

const props = withDefaults(defineProps<FormGroupTimeLinesFilterFormProps>(), {
  classSelect: 'wf_w-180',
  label: '기간',
  disabled: false,
  isBorderBottom: true,
  isRoundedBottom: false,
  disabledSelectOption: false,
  hiddenSelectOption: false,
  required: false
})
const listButtonDate = ProductDataFieldFormDeliveryProductListModel.listButtonDateFilter

const { handleChooseEndDate, handleChooseStartDate, resetSelectSimple } = useFormGroupTimeLinesFilterForm(props, listEmits)
</script>

<template>
  <FormGroup
    :required="required"
    :label="label"
    :is-border-bottom="isBorderBottom"
    :is-rounded-bottom="isRoundedBottom"
    :class="$props.class"
    :customClass="'wf-space-x-6 ' + $props.customClass"
  >
    <WelfareSelect
      v-if="!hiddenSelectOption"
      :disabled="disabled || disabledSelectOption"
      :modelValue="currentTypeDateProductSelect"
      @update:modelValue="listEmits.onSelectType"
      :class="classSelect"
      optionLabel="label"
      :options="optionsProductTypeDate"
      small
      :placeholder="selectPlaceholder"
    />
    <div class="wf_flex wf_items-center wf-space-x-4">
      <DateTimePicker
        :disabled="disabled"
        :modelValue="fromDate"
        @update:model-value="handleChooseStartDate"
        :format="DEFAULT_DATE_FORMAT_DOT"
        :type="'date'"
        size="small"
      />
      <span class="wf-date_picker-double-text wf_text-n-33">~</span>
      <DateTimePicker
        :disabled="disabled"
        :modelValue="toDate"
        @update:model-value="handleChooseEndDate"
        :format="DEFAULT_DATE_FORMAT_DOT"
        :type="'date'"
        size="small"
      />
    </div>
    <div class="wf_flex wf_items-center wf-space-x-4 wf-approval-group-btn">
      <WelfareMdButton
        :disabled="disabled"
        v-for="(item, index) in $props.optionDateButton ? $props.optionDateButton : listButtonDate"
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
