<!-- BO_C0608_010101_P -->
<script setup lang="ts">
import {
  CommonTable,
  CommonTableContentCell,
  CommonTableRow,
  CommonTableTitleCell,
  HeaderModal,
  TextInputValidationMaxBytes,
  WelfareInputText,
  WelfareMdButton
} from '@/components'
import { useProductRegisterVideo } from '@/composables/products/modal/registerVideo/useProductRegisterVideo'
import { ProductRegisterFileEmits, ProductRegisterFileProps } from '@/models'
import { TEXT_MAX_NUMBER_40 } from '@/common'

const props = defineProps<ProductRegisterFileProps>()
const emits = defineEmits<ProductRegisterFileEmits>()
const { defaultValue, handleChooseVideo, closeModalByPop, checkValidVideo, altVideoNameRef } = useProductRegisterVideo(props, emits)
</script>
<template>
  <div class="wf-bg">
    <div class="wf-main-popup">
      <HeaderModal title="동영상 등록" @close-modal="closeModalByPop" />
      <div class="wf-p-20 wf-width-full wf_flex wf_flex-col">
        <CommonTable>
          <CommonTableRow height="44">
            <CommonTableTitleCell title="이미지 등록" is-first-col class="wf_w-130" />
            <CommonTableContentCell>
              <WelfareInputText v-model="defaultValue" class="wf_w-180" size="small" readonly />
              <WelfareMdButton class="wf-ml-4" button-size="small" label="찾아보기" buttonType="liner" @on-click="handleChooseVideo" />
            </CommonTableContentCell>
          </CommonTableRow>
          <CommonTableRow height="44" is-last-row>
            <CommonTableTitleCell title="alt 텍스트" is-first-col class="wf_w-130" />
            <CommonTableContentCell>
              <TextInputValidationMaxBytes
                input-type="text"
                :max-bytes="TEXT_MAX_NUMBER_40"
                v-model="altVideoNameRef"
                class="wf-width-full"
                size="small"
                placeholder="한글기준 20자 이내로 입력 해주세요."
              />
            </CommonTableContentCell>
          </CommonTableRow>
        </CommonTable>
        <div class="wf-mt-10 wf-body_04-reg wf_text-sub-01">250MB 이하의 동영상 파일만 등록할 수 있습니다./ -동영상 형식: mp4/ -용량: 250MB 이하</div>
        <div class="wf_flex wf_items-center wf_justify-center wf-space-x-4 wf-mt-20">
          <WelfareMdButton label="취소" buttonType="cancel" class="wf_w-120" @on-click="closeModalByPop" />
          <WelfareMdButton label="확인" buttonType="default" class="wf_w-120" @on-click="checkValidVideo" />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
@import url('@/assets/css/view/product/modal/registerImage');
</style>
