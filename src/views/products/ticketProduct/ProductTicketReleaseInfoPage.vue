<!-- BO_C0202_050101 -->
<script setup lang="ts">
import ProductTitle from '@/components/products/common/ProductTitle.vue'
import ProductBottomButton from '@/components/products/common/ProductBottomButton.vue'
import { TextareaMaxLengthBytes } from '@/components'
import { useProductReleaseInformation } from '@/composables/products/ticketProduct/releaseInfo/useProductReleaseInformation'
import { ProductTicketDetailBasicInfoProps } from '@/models/services/responses/products/ticket/ProductTicketBaseInfoResponse'

const props = defineProps<ProductTicketDetailBasicInfoProps>()
const { state, openConfirmCancel, openNotificationSaveTemporary, openNotificationSave, changeStatusApproval, onPreviewClick } =
  useProductReleaseInformation(props)
</script>
<template>
  <div class="wf-space-y-30">
    <div class="wf-space-y-20">
      <ProductTitle title="발급 정보" />
      <div class="border-round-md">
        <div class="wf-h-44 flex-box">
          <div
            class="wf-row-first-label wf-row-font-first-label wf_flex wf_justify-flex-start wf_items-center wf_bg-bg-gray border-radius-top-left border-radius-bottom-left wf-w-150"
          >
            발급방법
          </div>
          <div class="wf-row-second-label wf-row-font-second-label wf-w-label-second-50 wf_flex wf_justify-flex-start wf_items-center">
            {{ state.ticketTypeName }}
          </div>
          <div class="wf-row-first-label wf-row-font-first-label border-left wf_flex wf_justify-flex-start wf_items-center wf_bg-bg-gray wf-w-150">
            배송비 정책
          </div>
          <div class="wf-row-second-label wf-row-font-second-label wf-w-label-second-50 wf_flex wf_justify-flex-start wf_items-center">
            {{ state.deliveryFeePolicyTypeName }}
          </div>
        </div>
      </div>
    </div>
    <div class="wf-space-y-20">
      <ProductTitle title="교환/반품 정보" />
      <div class="border-round-md">
        <div class="wf-h-152 flex-box">
          <div
            class="wf-row-first-label wf-row-font-first-label wf_flex wf_justify-flex-start wf_items-center wf_bg-bg-gray border-radius-top-left wf-w-150 bd_b"
          >
            교환/반품 기간&nbsp;<span class="wf_text-sub-01">*</span>
          </div>
          <div class="wf-row-second-textarea wf-row-font-second-label wf-w-label-second-100 wf_flex wf_justify-flex-start wf_items-center bd_b">
            <TextareaMaxLengthBytes
              class="wrap-input-textarea wrap-input-padding-row-9-12"
              :max-bytes="1000"
              v-model="state.defaultValueReturnPeriod"
              placeholder="한글 기준 500자 이내로 입력 해 주세요."
            />
          </div>
        </div>
        <div class="wf-h-152 flex-box">
          <div
            class="wf-row-first-label wf-row-font-first-label wf_flex wf_justify-flex-start wf_items-center wf_bg-bg-gray border-radius-top-left wf-w-150 bd_b"
          >
            교환/반품 안내&nbsp;<span class="wf_text-sub-01">*</span>
          </div>
          <div class="wf-row-second-textarea wf-row-font-second-label wf-w-label-second-100 wf_flex wf_justify-flex-start wf_items-center bd_b">
            <TextareaMaxLengthBytes
              class="wrap-input-textarea wrap-input-padding-row-9-12"
              :max-bytes="1000"
              v-model="state.defaultValueReturnInformation"
              placeholder="한글 기준 500자 이내로 입력 해 주세요."
            />
          </div>
        </div>
        <div class="wf-h-150 flex-box">
          <div
            class="wf-row-first-label wf-row-font-first-label wf_flex wf_justify-flex-start wf_items-center wf_bg-bg-gray border-radius-bottom-left wf-w-150"
          >
            교환/ 반품 불가 안내&nbsp;<span class="wf_text-sub-01">*</span>
          </div>
          <div class="wf-row-second-textarea wf-row-font-second-label wf-w-label-second-100 wf_flex wf_justify-flex-start wf_items-center">
            <TextareaMaxLengthBytes
              class="wrap-input-textarea wrap-input-padding-row-9-12"
              :max-bytes="1000"
              v-model="state.defaultValueReturn"
              placeholder="한글 기준 500자 이내로 입력 해 주세요."
            />
          </div>
        </div>
      </div>
    </div>
    <div>
      <ProductBottomButton
        @on-cancel-click="openConfirmCancel"
        @on-temporary-click="openNotificationSaveTemporary"
        @on-save-click="openNotificationSave"
        @on-approval-click="changeStatusApproval"
        @on-preview-click="onPreviewClick"
        :previewDisabled="!state.previewDisabled"
        :approvalDisabled="true"
        :temporaryVisible="false"
      />
    </div>
  </div>
</template>
<style scoped>
@import url('@/assets/css/view/product/ticketProduct/registration/release-information');
</style>
