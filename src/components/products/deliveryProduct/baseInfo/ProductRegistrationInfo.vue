<script setup lang="ts">
import { DEFAULT_DATETIME_FORMAT_DOT, getDateByFormat } from '@/common'
import { WelfareSelect, WelfareTextarea } from '@/components/uikit'
import { WelfareSelectOptionType } from '@/models'

interface ProductRegistrationInfoProps {
  productStatus: string
  registrant?: string
  registrantName?: string
  approver?: string
  approverName?: string
  modifier?: string
  modifierName?: string
  lastSavedTime: string
  lastApprovalFinishedTime: string
  lastChangeSavedTime: string
  reasonRefused?: string
  selectStatusSell: WelfareSelectOptionType | undefined
  optionsStatusSell?: WelfareSelectOptionType[]
}

interface ProductRegistrationInfoEmits {
  (e: 'onChangeSelectStatusSell', value: WelfareSelectOptionType): void
}
const props = withDefaults(defineProps<ProductRegistrationInfoProps>(), {
  registrant: '',
  approver: '',
  modifier: ''
})
const emits = defineEmits<ProductRegistrationInfoEmits>()

const formatDate = (time: string) => {
  return time ? getDateByFormat(time, DEFAULT_DATETIME_FORMAT_DOT) : '-'
}

const getUser = (name: string, userId?: string) => {
  return name ? `(${name}) ${userId}` : '-'
}
</script>

<template>
  <div class="wf_flex wf_flex-col wf-btn-border--bg-color-line-gray wf_br-6 wf-mt-20">
    <div class="wf_flex wf-btn-border-b--ncc wf_h-44">
      <div
        class="wf-body_02-semi wf_text-n-33 wf_br-tl--6 wf-btn-border-r--ncc wf_flex wf_items-center wf_justify-start wf_h-44 wf-pl-14 wf-pr-11 wf-py-14 wf-btn-border-b--ncc wf_w-150 wf_bg-bg-gray"
      >
        승인상태
      </div>
      <div class="wf_text-sub-01 wf_flex wf_items-center wf_justify-start wf_h-44 wf-pl-11 wf-pr-11 wf-pb-14 wf-pt-12 wf-body_03-reg">
        {{ props.productStatus }}
      </div>
    </div>
    <div class="wf_flex wf-btn-border-b--ncc">
      <div
        class="wf-btn-border-r--ncc wf_flex wf_items-center wf_justify-start wf_flex-shrink-0 wf-pl-14 wf-pr-11 wf-py-14 wf_w-150 wf_bg-bg-gray wf-body_02-semi wf_text-n-33"
      >
        반려 사유
      </div>
      <div class="w-full wf_flex wf_items-center wf_justify-start wf-pl-10 wf-pr-10 wf-py-6 wf-body_03-reg">
        <WelfareTextarea :placeholder="props.reasonRefused" disabled class="wf-wrap-textarea-full" />
      </div>
    </div>
    <div class="wf_flex wf-btn-border-b--ncc wf_h-44">
      <div class="wf_flex wf_flex-1">
        <div
          class="wf-btn-border-r--ncc wf_flex wf_items-center wf_justify-start wf_h-44 wf-pl-14 wf-pr-11 wf-py-14 wf-btn-border-b--ncc wf-body_02-semi wf_text-n-33 wf_w-150 wf_bg-bg-gray wf-body_02-semi wf_text-n-33"
        >
          등록자
        </div>
        <div
          class="wf_flex wf_items-center wf_justify-start wf_h-44 wf-pl-11 wf-pr-11 wf-pb-14 wf-pt-10 wf-body_03-reg wf_text--14 wf-w-550 wf_text-n-33"
        >
          {{ getUser(props.registrant, props.registrantName) }}
        </div>
      </div>
      <div class="wf_flex wf_flex-1">
        <div
          class="wf-btn-border-l--ncc wf-btn-border-r--ncc wf_flex wf_items-center wf_justify-start wf_h-44 wf-pl-14 wf-pr-11 wf-py-14 wf-btn-border-b--ncc wf-body_02-semi wf_text-n-33 wf_w-150 wf_bg-bg-gray"
        >
          등록 일시
        </div>
        <div class="wf_flex wf_items-center wf_justify-start wf_h-44 wf-pl-11 wf-pr-11 wf-pb-14 wf-pt-10 wf-body_03-reg wf_text--14 wf_text-n-33">
          {{ formatDate(props.lastSavedTime) }}
        </div>
      </div>
    </div>
    <div class="wf_flex wf-btn-border-b--ncc wf_h-44">
      <div class="wf_flex wf_flex-1">
        <div
          class="wf-btn-border-r--ncc wf_flex wf_items-center wf_justify-start wf_h-44 wf-pl-14 wf-pr-11 wf-py-14 wf-btn-border-b--ncc wf-body_02-semi wf_text-n-33 wf_w-150 wf_bg-bg-gray wf-body_02-semi wf_text-n-33"
        >
          승인자
        </div>
        <div
          class="wf_flex wf_items-center wf_justify-start wf_h-44 wf-pl-11 wf-pr-11 wf-pb-14 wf-pt-10 wf-body_03-reg wf_text--14 wf-w-550 wf_text-n-33"
        >
          {{ getUser(props.approver, props.approverName) }}
        </div>
      </div>
      <div class="wf_flex wf_flex-1">
        <div
          class="wf-btn-border-l--ncc wf-btn-border-r--ncc wf_flex wf_items-center wf_justify-start wf_h-44 wf-pl-14 wf-pr-11 wf-py-14 wf-btn-border-b--ncc wf-body_02-semi wf_text-n-33 wf_w-150 wf_bg-bg-gray"
        >
          승인 일시
        </div>
        <div class="wf_flex wf_items-center wf_justify-start wf_h-44 wf-pl-11 wf-pr-11 wf-pb-14 wf-pt-10 wf-body_03-reg wf_text--14 wf_text-n-33">
          {{ formatDate(props.lastApprovalFinishedTime) }}
        </div>
      </div>
    </div>
    <div class="wf_flex wf-btn-border-b--ncc wf_h-44">
      <div class="wf_flex wf_flex-1">
        <div
          class="wf-btn-border-r--ncc wf_flex wf_items-center wf_justify-start wf_h-44 wf-pl-14 wf-pr-11 wf-py-14 wf-btn-border-b--ncc wf-body_02-semi wf_text-n-33 wf_w-150 wf_bg-bg-gray wf-body_02-semi wf_text-n-33"
        >
          수정자
        </div>
        <div
          class="wf_flex wf_items-center wf_justify-start wf_h-44 wf-pl-11 wf-pr-11 wf-pb-14 wf-pt-10 wf-body_03-reg wf_text--14 wf-w-550 wf_text-n-33"
        >
          {{ getUser(props.modifier, props.modifierName) }}
        </div>
      </div>
      <div class="wf_flex wf_flex-1">
        <div
          class="wf-btn-border-l--ncc wf-btn-border-r--ncc wf_flex wf_items-center wf_justify-start wf_h-44 wf-pl-14 wf-pr-11 wf-py-14 wf-btn-border-b--ncc wf-body_02-semi wf_text-n-33 wf_w-150 wf_bg-bg-gray"
        >
          수정 일시
        </div>
        <div class="wf_flex wf_items-center wf_justify-start wf_h-44 wf-pl-11 wf-pr-11 wf-pb-14 wf-pt-10 wf-body_03-reg wf_text--14 wf_text-n-33">
          {{ formatDate(props.lastChangeSavedTime) }}
        </div>
      </div>
    </div>
    <div class="wf_flex wf_h-42">
      <div
        class="wf_br-bl--6 wf-btn-border-r--ncc wf_flex wf_items-center wf_justify-start wf-pl-14 wf-pr-11 wf-py-14 wf_w-150 wf-body_02-semi wf_text-n-33 wf_bg-bg-gray wf_h-42"
      >
        판매상태&nbsp;<span class="wf_text-sub-01">*</span>
      </div>
      <div class="wf_flex wf_items-center wf_justify-start wf_h-42 wf-pl-11 wf-pr-11 wf-py-14">
        <WelfareSelect
          :modelValue="props.selectStatusSell"
          :onUpdate:modelValue="(value) => emits('onChangeSelectStatusSell', value)"
          class="wf_w-180"
          placeholder="판매중"
          optionLabel="label"
          :options="props.optionsStatusSell"
          small
        />
      </div>
    </div>
  </div>
</template>
