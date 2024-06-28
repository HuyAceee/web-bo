<!-- BO_C0607_010101_P -->
<script setup lang="ts">
import { TEXT_MAX_NUMBER_40 } from '@/common'
import { HeaderModal, WelfareMdButton, WelfareInputText, TextInputValidationMaxBytes } from '@/components'
import FormGroup from '@/components/widgets/form/FormGroup.vue'
import { useProductsRegisterImage } from '@/composables/products/modal/registerImage/useProductsRegisterImage'
import { ProductRegisterFileProps, ProductRegisterFileEmits } from '@/models'

const props = defineProps<ProductRegisterFileProps>()
const emits = defineEmits<ProductRegisterFileEmits>()

const { checkValidImage, defaultValue, altText, closeModalByPop, handleChooseImage, handleChangeAlt } = useProductsRegisterImage(props, emits)
</script>
<template>
  <div class="wf-bg">
    <div class="wf-main-popup">
      <HeaderModal :title="'이미지 등록'" @close-modal="closeModalByPop" />
      <div class="wf-body-popup">
        <div class="wf_flex wf_flex-col">
          <div class="wf-btn-border--bg-color-line-gray wf_br-6">
            <FormGroup label="이미지 등록" is-rounded-top class="wf_justify-center">
              <div class="wf_flex wf-space-x-3 wf_justify-center">
                <WelfareInputText
                  v-model="defaultValue"
                  placeholder="5MB 이하의 이미지 등록 가능"
                  class="wrap-input-180 wf-validation-box-red wf-h-30 text-input-style wf-body_03-reg"
                  :readonly="defaultValue.length > 0"
                />
                <WelfareMdButton class="wf-bt-w-44" :button-size="'small'" label="찾기" buttonType="liner" @on-click="handleChooseImage" />
              </div>
            </FormGroup>
            <FormGroup label="alt 텍스트" class="custom-form-group-end-border">
              <div class="wf_flex wf-tr-match-parent">
                <TextInputValidationMaxBytes
                  v-model="altText"
                  placeholder="한글기준 20자 이내로 입력"
                  class="wf-tr-match-parent wf-validation-box-red wf-h-30 text-input-style wf-body_03-reg"
                  @update:model-value="(value) => handleChangeAlt(value)"
                  :max-bytes="TEXT_MAX_NUMBER_40"
                />
              </div>
            </FormGroup>
          </div>

          <span class="text-warning wf-body_04-reg">이미지 형식 : jpg, gif, png/ 사이즈 : 0000x0000 (px)/ 용량 : 5MB 이하</span>
          <div class="wf_flex wf_items-center wf_justify-center wf-space-x-4">
            <WelfareMdButton label="취소" buttonType="cancel" class="wf_w-120" @on-click="closeModalByPop" />
            <WelfareMdButton label="확인" buttonType="default" class="wf_w-120" @on-click="() => checkValidImage('square')" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
@import url('@/assets/css/view/product/modal/registerImage');
</style>
