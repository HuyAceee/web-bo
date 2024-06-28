<!-- BO_E0203_020201_P -->
<script setup lang="ts">
import { HeaderModal, TextInputWithMaxLengthCharacters, WelfareMdButton } from '@/components'
import FormGroup from '@/components/widgets/form/FormGroup.vue'
import { DeliveryCancellationFeeChangeProps } from '@/models/views/delivery/modal/DeliveryCancellationFeeChangeModel'
import { useDeliveryCancellationFeeChangeModalLogic } from '@/composables/delivery/modal/useDeliveryCancellationFeeChangeModalLogic'
import { acceptNumberKey, formatNumberDot } from '@/common'

const props = defineProps<DeliveryCancellationFeeChangeProps>()
const { changedFee, handlerChangeFee } = useDeliveryCancellationFeeChangeModalLogic(props)
</script>

<template>
  <div class="wf-order-cancellation-fee-change">
    <HeaderModal title="취소 수수료 변경" @close-modal="props.onCancel" />
    <div class="wf-p-20 wf-width-full wf_flex wf_flex-col wf-space-y-20">
      <div class="cancellation-fee-hint wf-body_04-mid wf_flex wf_flex-col">
        <div class="wf_rep-notification--content-row">
          <div class="wf_dot wf_bg-black"></div>
          해당 티켓의 변경 수수료를 입력해 주세요.
        </div>
        <div class="wf_rep-notification--content-row wf_text-sub-01">
          <div class="wf_dot wf_bg-f9"></div>
          취소수수료는 최종결제금액을 초과할 수 없습니다.
        </div>
      </div>
      <div class="wf-btn-border--bg-color-line-gray wf_br-6">
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1" is-rounded-top is-rounded-bottom label="취소 수수료" custom-class="wf-body_03-reg wf_text-n-33 wf_width-full"
            >{{ formatNumberDot(props.cancellationFee) ?? 0 }}&nbsp;원
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup
            class="wf_flex-1 wf-h-42"
            is-rounded-bottom
            :isBorderBottom="false"
            label="변경 취소 수수료"
            required
            custom-class="wf-body_03-reg wf_text-n-33 wf-gap-3"
          >
            <TextInputWithMaxLengthCharacters
              v-model="changedFee"
              @keypress="acceptNumberKey"
              class="wf-ml--1 wf_w-180"
              size="small"
              placeholder="숫자만 입력해 주세요."
              :max-length="7"
              :hidden-warning="true"
            />&nbsp;원
          </FormGroup>
        </div>
      </div>
      <div class="wf_flex wf_flex-row wf_justify-center wf-space-x-4 wf_flex-grow wf_w-full">
        <WelfareMdButton class="wf_w-120" label="변경" buttonType="cancel" @onClick="props.onCancel" />
        <WelfareMdButton class="wf_w-120" label="변경" buttonType="default" @on-click="handlerChangeFee" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/order/modal/order-cancellation-fee-change.css');
</style>
