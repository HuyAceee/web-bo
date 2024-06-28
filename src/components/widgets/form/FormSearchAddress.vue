<script setup lang="ts">
import { WelfareCloseIcon, WelfareInputText, WelfareMdButton } from '@/components/uikit'
import { useFormSearchAddress } from '@/composables'
import { FormAddressEmits, FormAddressProps } from '@/models'

const props = defineProps<FormAddressProps>()
const emits = defineEmits<FormAddressEmits>()

const {
  closeDaumPostcode,
  detailAddressRef,
  wfDaumLayer,
  postcode,
  address,
  detailAddress,
  extraAddress,
  handleClickOutside,
  isDisplayIframe,
  handleExecDaumPostcode,
  updateDetailAddress
} = useFormSearchAddress(props, emits)

const handleReset = () => {
  postcode.value = ''
  address.value = ''
  detailAddress.value = ''
  extraAddress.value = ''
}

defineExpose({
  handleReset
})
</script>

<template>
  <div class="wf_flex wf_flex-col wf-space-y-10 wf-mb-10 wf-width-full">
    <div class="overlay" v-show="isDisplayIframe" @click="handleClickOutside">
      <div ref="wfDaumLayer" class="wf-search-address-modal">
        <div class="wf_flex wf_flex-row wf_items-center wf_search-address-header">
          <p>우편번호/주소 찾기</p>
          <WelfareCloseIcon @click="closeDaumPostcode" alt="닫기 버튼" class="wf_search-address-close" />
        </div>
      </div>
    </div>
    <div class="wf_flex wf_items-center wf-space-x-4">
      <div class="wf-search-input-wrapper">
        <WelfareInputText :model-value="postcode" size="small" inputType="text" class="wf_w-180" placeholder="우편주소" />
        <div class="wf-el-overlay" @click="handleExecDaumPostcode"></div>
      </div>
      <WelfareMdButton label="우편번호 찾기" buttonType="liner" buttonSize="small" @click="handleExecDaumPostcode" />
    </div>
    <div class="wf_flex wf_items-center wf-space-x-4 wf-width-full">
      <WelfareInputText
        ref="detailAddressRef"
        @update:model-value="updateDetailAddress"
        :model-value="detailAddress"
        size="small"
        inputType="text"
        class="wf_flex-1"
        placeholder="상세주소"
      />
    </div>
    <div class="wf_flex wf_items-center wf-space-x-4 wf-width-full">
      <WelfareInputText :model-value="extraAddress" size="small" inputType="text" class="wf_flex-1" placeholder="도로명" />
    </div>
    <div class="wf_flex wf_items-center wf-space-x-4 wf-width-full">
      <WelfareInputText :model-value="address" size="small" inputType="text" class="wf_flex-1" placeholder="지명" />
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/widgets/form/welfare-form-address.css');
</style>
