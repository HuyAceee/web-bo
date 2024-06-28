<!-- BO_C0609_010101_P -->
<script setup lang="ts">
import { ref } from 'vue'
import { HeaderModal } from '@/components/widgets'
import { WelfareMdButton } from '@/components/uikit'
import { TEXTAREA_NUMBER_1000 } from '@/common'
import { useModalNotification, useNotificationMaxLength } from '@/composables'
import TextareaCount from '@/components/widgets/textInput/TextareaCount.vue'
const { openModal: openModalNotification, closeModalByPop, closeAllModal } = useModalNotification()

const emit = defineEmits(['onClose', 'onSave'])
const props = defineProps<{
  usingApiMessage?: boolean
}>()
const textRef = ref('')

const handleSave = () => {
  if (textRef.value.length === 0) {
    openModalNotification?.({
      content: `반려 사유를 입력 해주세요.`,
      onAccept: () => closeModalByPop?.()
    });
  } else {
    const onSaveHandler = () => {
      closeAllModal?.();
      emit('onSave', textRef.value);
    };
    if (props.usingApiMessage) {
      closeAllModal?.();
      onSaveHandler();
    } else {
      openModalNotification?.({
        content: `선택한 상품이 반려 되었습니다.`,
        onAccept: onSaveHandler
      });
    }
  }
};

const { isReadOnly: readOnlyTextarea, handelChange: handelChangeTextarea } = useNotificationMaxLength({
  emit: (value: string) => {
    textRef.value = value
  },
  length: TEXTAREA_NUMBER_1000,
  message: '한글 기준 500자 이내로 입력 해주세요.'
})
</script>

<template>
  <div class="wf-manager-info">
    <HeaderModal :title="'반려 사유'" @close-modal="() => emit('onClose')" />
    <div class="wf_body wf-reason-product-approval-body wf_flex wf_flex-col wf_justify-between wf-p-20 wf-width-full">
      <TextareaCount
        :model-value="textRef"
        :readonly="readOnlyTextarea"
        :max="TEXTAREA_NUMBER_1000"
        @update:model-value="handelChangeTextarea"
        placeholder="반려사유를 입력해 주세요."
        class="wf-reason-product-approval-textarea"
      />
      <div class="wf_flex wf_justify-center wf_items-center wf-space-x-4">
        <WelfareMdButton @click="() => emit('onClose')" label="닫기" buttonType="cancel" class="wf-reason-product-approval-button" />
        <WelfareMdButton @click="handleSave" label="저장" buttonType="default" class="wf-reason-product-approval-button" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/product/modal/product-modal-reason-product-approval.css');
</style>
