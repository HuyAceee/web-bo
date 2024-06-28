<script setup lang="ts">
import { WelfareCloseIcon, WelfareInputText, WelfareMdButton } from '@/components/uikit'
import { useFormSearchAddress } from '@/composables'
import { FormAddressEmits, FormAddressProps } from '@/models'

const props = defineProps<FormAddressProps>()
const emits = defineEmits<FormAddressEmits>()

const {
  closeDaumPostcode,
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
  <div class="wf-width-full wf-space-y-6">
    <div class="overlay" v-show="isDisplayIframe" @click="handleClickOutside">
      <div ref="wfDaumLayer" class="wf-search-address-modal">
        <div class="wf_flex wf_flex-row wf_items-center wf_search-address-header">
          <p>우편번호/주소 찾기</p>
          <WelfareCloseIcon @click="closeDaumPostcode" alt="닫기 버튼" class="wf_search-address-close" />
        </div>
      </div>
    </div>
    <div class="wf_flex wf-mb-9 wf-mt-3">
      <WelfareInputText
        :model-value="postcode"
        placeholder="우편주소"
        class="wf_w-180 wf-mr-6"
        size="small"
        @click="handleExecDaumPostcode"
        :disabled="true"
      />
      <WelfareMdButton label="우편번호 찾기" class="wf_w-90" buttonSize="small" buttonType="liner" @click="handleExecDaumPostcode" />
    </div>
    <WelfareInputText
      :model-value="address"
      placeholder="우편번호 찾기를 이용해 주세요."
      :disabled="true"
      class="wf-width-full wf-mt-10"
      size="small"
    />
    <div class="wf_flex wf_items-center wf-space-x-4 wf-width-full wf-mt-10">
      <WelfareInputText
        ref="detailAddressRef"
        @update:model-value="updateDetailAddress"
        :model-value="detailAddress"
        size="small"
        inputType="text"
        class="wf_flex-1"
        placeholder="상세주소를 입력해 주세요."
      />
    </div>
    <div class="wf_flex wf_items-center wf-mb-9 wf-mt-9 wf-mb-4">
      <span class="wf_h-18 wf_w-53 wf_text-_12 wf_text-n-52 wf-btn-border--bg-color-line-gray wf_border-radius-2 wf_text-center wf_spacing--1 wf-pt-2"
        >지번 주소</span
      >
      <span :model-value="extraAddress" class="wf-pl-8 wf_text-n-33 wf-body_03-reg wf-ml-6 wf-mt-2">
        {{ extraAddress ? extraAddress : '도로명' }}
      </span>
    </div>
  </div>
</template>
<style scoped>
@import url('@/assets/css/widgets/form/welfare-form-address.css');
</style>
