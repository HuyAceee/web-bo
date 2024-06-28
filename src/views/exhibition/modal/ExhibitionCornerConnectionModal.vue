<!-- BO_I0102_040301_P -->
<script setup lang="ts">
import { HeaderModal, WelfareMdButton } from '@/components'
import { useExhibitionCornerConnectionActionModal } from '@/composables/exhibition/modal/useExhibitionCornerConnectionActionModal'
import ExhibitionCornerBasicInfoModal from '@/components/exhibition/modal/exhibition/ExhibitionCornerBasicInfoModal.vue'
import ExhibitionCornerExhibitionInfoModal from '@/components/exhibition/modal/exhibition/ExhibitionCornerExhibitionInfoModal.vue'

interface ExhibitionCornerConnectionModalProps {
  onClose?: () => void
}

defineProps<ExhibitionCornerConnectionModalProps>()

const { values, setFieldValue, commonOption, setCommonOption } = useExhibitionCornerConnectionActionModal()
</script>

<template>
  <div class="display-corner-connection-modal">
    <HeaderModal title="코너 연결 관리" @close-modal="$props.onClose" />
    <div class="wf-p-20 wf-pr-14 wf-width-full wf_flex wf_flex-col wf-modal-scroll scrollbar-custom">
      <ExhibitionCornerBasicInfoModal :values="values" @set-field-value="setFieldValue" />
      <ExhibitionCornerExhibitionInfoModal
        type-pc
        :values="values"
        @set-field-value="setFieldValue"
        :common-option="commonOption"
        @set-common-option="setCommonOption"
      />
      <ExhibitionCornerExhibitionInfoModal :values="values" :common-option="commonOption" @set-field-value="setFieldValue" />
      <div class="wf-action-wrapper wf-mt-20">
        <WelfareMdButton button-type="cancel" label="닫기" class="wf_w-120" @on-click="$props.onClose" />
        <WelfareMdButton button-type="default" label="저장" class="wf_w-120" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/exhibition/modal/exhibition-corner-connection-modal.css');
</style>
