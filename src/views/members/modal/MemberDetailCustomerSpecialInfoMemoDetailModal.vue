<!-- BO_B0101_020702_P -->

<script setup lang="ts">
import { HeaderModal } from '@/components'
import { MemberCustomerSpecialInfoModel, MemberDetailBaseModel } from '@/models'

export interface MemoDetailModalProps {
  member: MemberDetailBaseModel
  data: MemberCustomerSpecialInfoModel
}
type MemoDetailModalEmits = (e: 'onClose') => void

defineProps<MemoDetailModalProps>()
defineEmits<MemoDetailModalEmits>()
</script>

<template>
  <div class="wf_w-800 wf_bg-white">
    <HeaderModal title="관리자 메모 등록 상세" @close-modal="$emit('onClose')" />
    <div class="wf-px-20 wf-py-20">
      <div class="wf-mx--1 wf-btn-border--ncc wf_br-6">
        <div class="wf_flex wf_h-44 wf-btn-border-b--ncc">
          <div class="wf_w-150 wf_h-full wf_flex wf_items-center wf-px-15 wf_bg-bg-gray wf_br-tl--6">
            <span class="wf-body_02-semi wf_text-n-33">선택 회원명</span>
          </div>
          <div class="wf_flex-1 wf_h-full wf_flex wf_items-center wf-px-12 wf-btn-border-l--ncc wf-ml--1">
            <span class="wf-body_03-reg wf_text-n-33">{{ `${$props?.member?.name}(${$props.member.id})` }}</span>
          </div>
        </div>
        <div class="wf_flex wf_h-154 wf-btn-border-b--ncc">
          <div class="wf_w-150 wf_h-full wf_flex wf_items-center wf-px-15 wf_bg-bg-gray">
            <span class="wf-body_02-semi wf_text-n-33">내용</span>
          </div>
          <div class="wf_flex-1 wf_h-full wf-px-12 wf-py-14 wf-btn-border-l--ncc wf-ml--1">
            <div class="wf_h-full wf_overflow-y-auto">
              <p class="wf-body_03-reg wf_text-n-33 wf-whitespace-prewrap wf-word-break wf_leading-120">
                {{ $props?.data?.detail }}
              </p>
            </div>
          </div>
        </div>
        <div class="wf_flex wf_h-42">
          <div class="wf_w-150 wf_h-full wf_flex wf_items-center wf-px-15 wf_bg-bg-gray wf_br-bl--6">
            <span class="wf-body_02-semi wf_text-n-33">등록자</span>
          </div>
          <div class="wf_flex-1 wf_h-full wf_flex wf_items-center wf-px-12 wf-btn-border-l--ncc wf-ml--1">
            <span class="wf-body_03-reg wf_text-n-33">{{ `${$props?.data?.registerName}(${$props?.data?.registerId})` }}</span>
          </div>
          <div class="wf_w-150 wf_h-full wf_flex wf_items-center wf-px-15 wf_bg-bg-gray wf-btn-border-l--ncc">
            <span class="wf-body_02-semi wf_text-n-33">등록일자</span>
          </div>
          <div class="wf_flex-1 wf_h-full wf_flex wf_items-center wf-px-12 wf-btn-border-l--ncc wf-ml--1">
            <span class="wf-body_03-reg wf_text-n-33">{{ $props?.data?.registrationDate }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
