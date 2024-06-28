<script setup lang="ts">
import { WelfareInputText } from '@/components/uikit'
import { TEXTAREA_NUMBER_200 } from '@/common'
import { useNotificationMaxLength } from '@/composables'
import TextareaCount from '@/components/widgets/textInput/TextareaCount.vue'

interface ProductDeliveryMoreInfoProps {
  manufacturingCompany?: string
  origin?: string
}

interface ProductDeliveryMoreInfoEmits {
  (e: 'onChangeManufacturingCompany', value: string): void
  (e: 'onChangeOrigin', value: string): void
}

const props = withDefaults(defineProps<ProductDeliveryMoreInfoProps>(), {
  manufacturingCompany: '',
  origin: ''
})
const emits = defineEmits<ProductDeliveryMoreInfoEmits>()

const { isReadOnly: readOnlyText, handelChange: handelChangeText } = useNotificationMaxLength({
  emit: (value: string) => {
    emits('onChangeManufacturingCompany', value)
  }
})

const { isReadOnly: readOnlyTextarea, handelChange: handelChangeTextarea } = useNotificationMaxLength({
  emit: (value: string) => {
    emits('onChangeOrigin', value)
  },
  length: TEXTAREA_NUMBER_200
})
</script>

<template>
  <div class="wf_flex wf-btn-border-b--ncc wf_h-44">
    <div
      class="wf-body_02-semi wf_text-n-33 wf_br-tl--6 wf-btn-border-r--ncc wf_flex wf_items-center wf_justify-start wf_h-44 wf-pl-14 wf-pr-11 wf-py-14 wf-btn-border-b--ncc wf_w-150 wf_bg-bg-gray"
    >
      제조사
    </div>
    <div class="wf_text-sub-01 wf_flex wf_items-center wf_justify-start wf_h-44 wf-pl-11 wf-pr-11 wf-pb-7 wf-pt-4 wf-body_03-reg">
      <WelfareInputText
        :model-value="props.manufacturingCompany"
        :readonly="readOnlyText"
        @update:model-value="handelChangeText"
        size="small"
        inputType="text"
        class="wf_w-180"
        placeholder="한글 기준 30자 이내로 입력"
      />
    </div>
  </div>
  <div class="wf_flex wf-btn-border-b--ncc">
    <div
      class="wf-btn-border-r--ncc wf_flex wf_items-start wf_justify-start wf_flex-shrink-0 wf-pl-14 wf-pr-11 wf-py-14 wf_w-150 wf_bg-bg-gray wf-body_02-semi wf_text-n-33"
    >
      원산지
    </div>
    <div class="w-full wf_flex wf_flex-col wf-width-full wf_justify-start wf-pl-11 wf-space-y-6 wf-pr-11 wf-py-7 wf-body_03-reg">
      <TextareaCount
        :model-value="props.origin"
        :readonly="readOnlyTextarea"
        @update:model-value="handelChangeTextarea"
        placeholder="한글 기준 200자 이내로 입력해 주세요."
        class="wf-wrap-textarea-full"
        :max="TEXTAREA_NUMBER_200"
      />
    </div>
  </div>
</template>
