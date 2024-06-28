<!-- BO_C0611_010101_P -->
<script setup lang="ts">
import { HeaderModal, WelfareMdButton, WelfareInputText } from '@/components'
import { useProductsRegisterImage } from '@/composables/products/modal/registerImage/useProductsRegisterImage'
import { ProductRegisterFileProps, ProductRegisterFileEmits } from '@/models'

const props = defineProps<ProductRegisterFileProps>()
const emits = defineEmits<ProductRegisterFileEmits>()

const { checkValidImage, defaultValue, closeModalByPop, handleChooseImage } = useProductsRegisterImage(props, emits)
</script>
<template>
  <div class="wf-bg">
    <div class="wf-main-popup">
      <HeaderModal :title="'이미지 등록'" @close-modal="closeModalByPop" />
      <div class="wf-body-popup">
        <div class="wf_flex wf_flex-col wf-space-y-20">
          <div class="wf_flex wf-space-x-6">
            <WelfareInputText
              labelBottomLeft="이미지 형식 : jpg, gif, png/ 사이즈 : 1200x0000 (px)/ 용량 : 5MB 이하"
              v-model="defaultValue"
              placeholder="5MB 이하의 이미지 파일만 등록할 수 있습니다."
              class="wrap-input wf-validation-box-red"
              :disabled="defaultValue.length > 0"
            />
            <WelfareMdButton class="wf-bt-w-69" label="찾아보기" buttonType="liner" @on-click="handleChooseImage" />
          </div>
          <div class="wf_flex wf_items-center wf_justify-center wf-space-x-4">
            <WelfareMdButton label="취소" buttonType="cancel" class="wf_w-120" @on-click="closeModalByPop" />
            <WelfareMdButton label="확인" buttonType="default" class="wf_w-120" @on-click="() => checkValidImage('pcBanner')" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
@import url('@/assets/css/view/product/modal/registerImage');
</style>
