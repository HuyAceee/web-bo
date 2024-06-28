<!-- BO_B0101_020703_P -->

<script setup lang="ts">
import { TEXTAREA_NUMBER_200, formatTextLength } from '@/common'
import { HeaderModal, WelfareMdButton, WelfareTextarea } from '@/components'
import { useModalNotification } from '@/composables/widgets'
import { MemberDetailBaseModel } from '@/models'
import { computed, ref } from 'vue'

export interface MemoRegistrationModalEmits {
  (e: 'onClose'): void
  (e: 'onSave', memberKey: string, message: string): void
}
interface MemoRegistrationModalProps {
  member: MemberDetailBaseModel
}

const { openModal: openNotification, closeModalByPop } = useModalNotification()

const message = ref('')
const readonlyMessage = ref(false)

const showPopupCheckLength = (value: any) => {
  if (value.length > TEXTAREA_NUMBER_200) {
    readonlyMessage.value = true
    openNotification?.({
      content: '한글 기준 200자 이내로 입력 해주세요.',
      onAccept: () => {
        closeModalByPop?.()
        readonlyMessage.value = false
      }
    })
    return value.slice(0, TEXTAREA_NUMBER_200)
  }
  return value
}

const onChangeMessage = () => {
  message.value = showPopupCheckLength(message.value)
}

const props = defineProps<MemoRegistrationModalProps>()
defineEmits<MemoRegistrationModalEmits>()
const labelRightComputed = computed(() => formatTextLength(message.value))
const statusSaveButton = computed(() => !message.value.length)
const memberComputed = computed(() => (props?.member?.id ? `${props?.member?.name}(${props?.member?.id})` : ''))
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
            <span class="wf-body_03-reg wf_text-n-33">{{ memberComputed }}</span>
          </div>
        </div>
        <div class="wf_flex wf_h-150">
          <div class="wf_w-150 wf_h-full wf_flex wf_items-center wf-px-15 wf_bg-bg-gray wf_br-bl--6">
            <span class="wf-body_02-semi wf_text-n-33">내용</span>
          </div>
          <div class="wf_flex-1 wf_h-full wf_flex wf-px-12 wf-py-6 wf-btn-border-l--ncc wf-ml--1">
            <WelfareTextarea
              size="small"
              class="w-full wf_i-h-120"
              :label-bottom-right="labelRightComputed"
              v-model="message"
              placeholder="상세 사유 입력"
              :readonly="readonlyMessage"
              @input="onChangeMessage"
            />
          </div>
        </div>
      </div>
      <div class="wf-mt-20">
        <WelfareMdButton
          class="wf_w-120 wf-mx-auto"
          label="등록"
          button-type="liner"
          @on-click="$emit('onSave', member.memberKey, message)"
          :disabled="statusSaveButton"
        />
      </div>
    </div>
  </div>
</template>
