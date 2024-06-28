<script setup lang="ts">
import { TextareaMaxLength, WelfareMdButton } from '@/components'
export interface ComplaintBaseModalWrapperProps {
  title: string
  subTitle: string
  placeholder: string
  fieldInput: string
  closeLabel: string
  submitLabel: string
}
interface ComplaintBaseModalWrapperEmits {
  (e: 'onChangeInput', value: string): void
  (e: 'on-close'): void
  (e: 'on-submit'): void
}

const emits = defineEmits<ComplaintBaseModalWrapperEmits>()
const eventEmit = {
  setFieldValueInput: (value: string) => {
    emits('onChangeInput', value)
  },
  handleClose: () => {
    emits('on-close')
  },
  handleSubmit: () => {
    emits('on-submit')
  }
}

const props = defineProps<ComplaintBaseModalWrapperProps>()
</script>
<template>
  <div class="wf-modal-body wf-body_04-mid">
    <div class="wf-search-tips wf-space-y-6 wf-mb-20">
      <p class="wf-list-style wf_text-n-33">{{ props.title }}</p>
      <p class="wf-list-style wf_text-n-33">{{ props.subTitle }}</p>
    </div>
    <p class="wf-body_01-semi wf_text-n-33 wf-mb-12">| 주문취소 철회 사유</p>
    <TextareaMaxLength
      size="small"
      class="wrap-input-textarea wrap-input-padding-row-9-12 wf-textarea-h-200"
      label-bottom-left="&nbsp;"
      :label-bottom-right="`${props?.fieldInput?.length ?? 0}/200 bytes`"
      :model-value="props.fieldInput"
      @update:model-value="
        (value: string) => {
          eventEmit.setFieldValueInput(value)
        }
      "
      :placeholder="props.placeholder"
      :max-length="200"
    />
    <div class="wf_flex wf_flex-row wf_justify-center wf-space-x-4 wf-mt-21 wf_flex-grow wf_w-full">
      <WelfareMdButton class="wf_w-120" :label="props.closeLabel" buttonType="cancel" @click="eventEmit.handleClose" />
      <WelfareMdButton class="wf_w-120" :label="props.submitLabel" buttonType="default" @click="eventEmit.handleSubmit" />
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/complaint/modal/complaint-modal.css');
</style>