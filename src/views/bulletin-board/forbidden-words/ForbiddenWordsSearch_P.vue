<script setup lang="ts">
import { icCloseModal } from '@/assets'
import { WelfareInputText, WelfareMdButton } from '@/components/uikit'

type ForbiddenWordsSearchProps = {
    isReadonly: boolean
    wordSearch?: string
    onConfirm: () => void
    onCancel: () => void
    handleSearch?: ((value: any) => any)
    changeReadonlySearch:(value: boolean) => void
}

const props = defineProps<ForbiddenWordsSearchProps>()

</script>
<template>
  <div class="wf_bb-forbidden-word_p wf_bg-white wf_border-radius-4">
    <div class="wf_flex wf_justify-between wf-btn-border-3b--ncc wf-p-20">
      <p class="wf-sub_tit_01">금칙어 등록</p>
      <img :src="icCloseModal" alt="close" class="wf-pointer" @click="props.onCancel"/>
    </div>
    <div class="wf-p-20 wf_bb-gap_20 wf_flex-col wf_flex wf_justify-center">
      <WelfareInputText
        :readonly="isReadonly"
        :modelValue="wordSearch"
        placeholder="30자 이내로 입력해 주세요."
        @update:model-value="handleSearch"
        class="wf_tn-flex-1"
        @click="() => changeReadonlySearch(false)"
      />
      <div class="wf_flex wf_justify-center tn-bb-size-container">
          <WelfareMdButton label="등록" buttonType="liner" class="wf_w-120 wf_h-40" @click="props.onCancel" />
        <WelfareMdButton label="등록" buttonType="default" class="wf_w-120 wf_h-40" @click="props.onConfirm" />
      </div>
    </div>
  </div>
</template>
