<script setup lang="ts">
import { WelfareSelectOptionType } from '@/models'
import { WelfareInputText, WelfareSelect } from '@/components'
import FormGroup from '@/components/widgets/form/FormGroup.vue'
import { useModalNotification } from '@/composables'
import { TEXT_MAX_NUMBER_50 } from '@/common'

export interface ProductGroupControlFilterFormProps {
  currentFilter: WelfareSelectOptionType
  listFilters: WelfareSelectOptionType[]
  placeholder?: string
  disabled: boolean
  label?: string
  classSelect?: string
  searchWordModel?: string
  fieldInput: string
}

interface ProductGroupControlFilterFormEmits {
  (e: 'onChangeFilter', value: WelfareSelectOptionType): void

  (e: 'onchangeText', field: string, value: string): void
}

const emits = defineEmits<ProductGroupControlFilterFormEmits>()

const props = withDefaults(defineProps<ProductGroupControlFilterFormProps>(), {
  placeholder: '최대 50개까지 입력 가능합니다.',
  label: '검색어',
  classSelect: 'wf_w-180'
})

const { openModal, closeModalByPop } = useModalNotification()
let isNotify = true

const eventEmit = {
  setFieldValueInput: (field: string, value: string) => {
    emits('onchangeText', field, value)
  }
}

const handleInputFieldChange = (e: any) => {
  const arrayValue = e.target.value.split(',')
  if (arrayValue.length > TEXT_MAX_NUMBER_50 && isNotify) {
    ;(document.activeElement as HTMLInputElement).blur()
    isNotify = false
    openModal({
      content: '최대 50개까지 입력 가능합니다.',
      onAccept() {
        isNotify = true
        closeModalByPop?.()
        eventEmit.setFieldValueInput(props.fieldInput, arrayValue.splice(0, TEXT_MAX_NUMBER_50).join())
      }
    })
  }
}
</script>

<template>
  <FormGroup label="검색어" customClass="wf-space-x-6 wf_br-b-0" isRoundedBottom :isBorderBottom="false" class="wf_h-42">
    <WelfareSelect
      :modelValue="props.currentFilter"
      @update:modelValue="(value) => emits('onChangeFilter', value)"
      :class="classSelect"
      optionLabel="label"
      :options="listFilters"
      small
    />
    <div class="wf_flex-1">
      <WelfareInputText
        :model-value="props.searchWordModel"
        :disabled="!disabled"
        @input="handleInputFieldChange"
        size="small"
        :placeholder="placeholder"
        @update:model-value="(value) => eventEmit.setFieldValueInput(props.fieldInput, value)"
      />
    </div>
  </FormGroup>
</template>
