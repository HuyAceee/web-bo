<script setup lang="ts">
import { numberRegex } from '@/common'
import { WelfareInputNumber } from '@/components/uikit'
import { useModalNotification } from '@/composables'
import { WelfareInputNumberEmits, WelfareInputNumberProps } from '@/models'
import { InputNumberInputEvent } from 'primevue/inputnumber'

interface Props extends WelfareInputNumberProps {
  shouldCheckPressKey?: boolean
  messageWarning?: string
  formatValue?: boolean
}
const props = defineProps<Props>()
const emit = defineEmits<WelfareInputNumberEmits>()
const emitEvents = {
  updateModelValue : (value: any) => {    
     emit('update:modelValue', value)
  },
  clickIconRight: (e: Event) => {
    emit('clickIconRight', e)
  },
  input: (value: InputNumberInputEvent) => {    
    emit('input', value)
  },
  focusText: (e : Event) => {
    emit('focusText' , e)
  }

}
const { openModal: openNotificationModal } = useModalNotification()

const openWarningKeyPress = () => {
  openNotificationModal({
    content: props.messageWarning ?? '숫자만 입력 해주세요.'
  })
}

const handleError = (event: KeyboardEvent) => {
  const isNumber = numberRegex.test(event.key)
  event.preventDefault()
  if (!isNumber && props.shouldCheckPressKey) {
    openWarningKeyPress()
    ;(document.activeElement as HTMLInputElement).blur()
  }
}

</script>
<template>
  <WelfareInputNumber
    v-bind="props"
    :inputId="props.formatValue ? 'integeronly' : 'withoutgrouping'"
    :useGrouping="!props.formatValue"
    :readonly="props.readonly"
    :modelValue="props?.modelValue"
    :placeholder="placeholder"
    :disabled="props.disabled"
    @keypress="handleError"
    @click-icon-right="emitEvents.clickIconRight"
    @input="emitEvents.input"
    @update:model-value="emitEvents.updateModelValue"
    @focus-text='emitEvents.focusText'
  />
</template>

