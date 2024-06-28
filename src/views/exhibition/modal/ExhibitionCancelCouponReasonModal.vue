<!-- BO_H0101_030101_P -->
<script setup lang="ts">
import { HeaderModal, TextareaMaxLengthBytes, WelfareMdButton } from '@/components'
import { formatTextLength } from '@/common'
import { useExhibitionCancelCouponReasonModalLogic } from '@/composables/exhibition/modal/useExhibitionCancelCouponReasonModalLogic'
import { ExhibitionCancelCouponReasonModalProps } from '@/models/views/exhibition/modal/ExhibitionCancelCouponReasonModalModel'

const props = defineProps<ExhibitionCancelCouponReasonModalProps>()
const { reasonContents, onRegister } = useExhibitionCancelCouponReasonModalLogic(props)
</script>

<template>
  <div class="exhibition-cancel-coupon-modal wf_text-n-33">
    <HeaderModal title="쿠폰 강제종료" @close-modal="props.onClose" />
    <div class="wf-modal-body wf-body_04-mid">
      <TextareaMaxLengthBytes
        v-model="reasonContents"
        size="small"
        placeholder="강제 종료 사유를 입력해 주세요."
        class="wrap-input-textarea wrap-input-padding-row-9-12 textarea-h-200"
        label-bottom-left="&nbsp;"
        :label-bottom-right="formatTextLength(reasonContents, 200)"
        :max-bytes="200"
      />
      <div class="wf_flex wf_flex-row wf_justify-center wf-space-x-4 wf_flex-grow wf_w-full wf-mt-20">
        <WelfareMdButton class="wf_w-120" label="닫기" button-type="cancel" @on-click="props.onClose()" />
        <WelfareMdButton class="wf_w-120" label="저장" button-type="default" @on-click="onRegister" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/exhibition/modal/exhibition-cancel-coupon-reason-modal.css');
</style>
