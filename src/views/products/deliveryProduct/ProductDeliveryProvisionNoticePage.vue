<!-- BO_C0102_070101 -->

<script setup lang="ts">
import { WelfareRadioGroup, WelfareSelect } from '@/components'
import ProductBottomButton from '@/components/products/common/ProductBottomButton.vue'
import { WelfareSelectOptionType } from '@/models/uikit'
import { productDeliveryDetailInputOptions, productDeliveryDetailSelectOptions } from '@/models/views'
import ProductInfoProvisionNoticeTable from '@/components/products/common/ProductInfoProvisionNoticeTable.vue'
import { useProductDeliveryProvisionInformation } from '@/composables/products/deliveryProduct/useProductDeliveryProvisionInformation'

const {
  onIncreaseItem,
  onDeleteItem,
  values,
  setFieldValue,
  setFormData,
  openConfirmCancel,
  onSaveClick,
  onPreviewClick,
  onApprovalClick,
  isDisableApproval,
  onTemporarySaveClick
} = useProductDeliveryProvisionInformation()
</script>

<template>
  <div class="">
    <div class="wf_flex wf_flex-col wf-btn-border--bg-color-line-gray wf_br-6 wf_mb-30">
      <div class="wf_flex wf_h-42">
        <div class="wf_flex wf_flex-1">
          <div
            class="wf-btn-border-r--ncc wf_br-tl--6 wf_br-bl--6 wf_flex wf_items-center wf_justify-start wf_h-42 wf-pl-14 wf-pr-11 wf-py-14 wf-body_02-semi wf_text-n-33 wf_w-150 wf_bg-bg-gray wf-body_02-semi wf_text-n-33"
          >
            입력 방식&nbsp;<span class="wf_text-sub-01">*</span>
          </div>
          <div class="wf_flex wf_items-center wf_justify-start wf_h-42 wf-pl-11 wf-pr-11 wf-body_03-reg wf_text--14 wf-w-550">
            <WelfareRadioGroup
              :options="productDeliveryDetailInputOptions"
              :modelValue="values.radioSelectInputDataOption"
              @update:modelValue="(val) => setFieldValue('radioSelectInputDataOption', val)"
              size="sm"
            />
          </div>
        </div>
        <div class="wf_flex wf_flex-1">
          <div
            class="wf-btn-border-l--ncc wf-btn-border-r--ncc wf_flex wf_items-center wf_justify-start wf_h-42 wf-pl-14 wf-pr-11 wf-py-14 wf-body_02-semi wf_text-n-33 wf_w-150 wf_bg-bg-gray"
          >
            상품 분류&nbsp;<span class="wf_text-sub-01">*</span>
          </div>
          <div class="wf_flex wf_items-center wf_justify-start wf_h-42 wf-pl-12 wf-pr-11 wf-body_03-reg wf_text--14">
            <WelfareSelect
              placeholder="가공식품"
              :modelValue="values.selectedCategory"
              @update:modelValue="(val: WelfareSelectOptionType) => setFieldValue('selectedCategory', val.value)"
              :options="productDeliveryDetailSelectOptions"
              class="wf_w-180"
              option-label="label"
              small
            />
          </div>
        </div>
      </div>
    </div>

    <div class="wf_product_border-b-3 wf-pb-10 wf-mb--16">
      <p class="wf-sub_tit_01 wf__text-color--33">상품정보제공고시<span class="wf_text-sub-01"> *</span></p>
    </div>

    <ProductInfoProvisionNoticeTable
      :data="values.dataList ?? []"
      @setFormData="(index, field, val) => setFormData(index, field, val)"
      @onIncreaseItem="onIncreaseItem"
      @onDeleteItem="onDeleteItem"
    />
    <ProductBottomButton
      :preview-disabled="!$route.params.id"
      :approval-disabled="isDisableApproval"
      @on-preview-click="onPreviewClick"
      @on-cancel-click="openConfirmCancel"
      @on-temporary-click="onTemporarySaveClick"
      @on-save-click="onSaveClick"
      @on-approval-click="onApprovalClick"
    />
  </div>
</template>
<style scoped>
@import url('@/assets/css/view/product/deliveryProduct/product-approval-list.css');
</style>
