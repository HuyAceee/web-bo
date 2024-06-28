<!-- BO_C0202_070101 -->
<script setup lang="ts">
import { PRODUCT_TICKET_REGISTRATION } from '@/common'
import { WelfareRadioGroup, WelfareSelect } from '@/components'
import ProductBottomButton from '@/components/products/common/ProductBottomButton.vue'
import { productDeliveryDetailInputOptions } from '@/models/views'
import { useRoute } from 'vue-router'
import ProductInfoProvisionNoticeTable from '@/components/products/common/ProductInfoProvisionNoticeTable.vue'
import { useProductTicketProvisionInformation } from '@/composables/products/ticketProduct/provisionInfo/useProductTicketProvisionInformation'
import { ProductTicketDetailBasicInfoProps, ProductTicketNoticeProvidingType } from '@/models/services/responses/products/ticket/ProductTicketBaseInfoResponse'

const props = defineProps<ProductTicketDetailBasicInfoProps>()

const route = useRoute()

const getHookType = (): ProductTicketNoticeProvidingType | undefined => {
  if (route.path === PRODUCT_TICKET_REGISTRATION) {
    return ProductTicketNoticeProvidingType.Register
  }

  return undefined
}

const {
  categoriesOptionsComputed,
  isDisableApproval,
  values,
  setFormData,
  onIncreaseItem,
  onDeleteItem,
  openConfirmCancel,
  onSaveClick,
  onPreviewClick,
  onApprovalClick,
  handleChangeCategory,
  handleChangeInputMethod
} = useProductTicketProvisionInformation(props, { type: getHookType() })
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
              @update:modelValue="(value) => handleChangeInputMethod(value)"
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
              @update:modelValue="(value) => handleChangeCategory(value)"
              :options="categoriesOptionsComputed"
              class="wf_w-180"
              option-label="label"
              option-value="value"
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
      :temporary-visible="false"
      :preview-disabled="false"
      :approval-disabled="isDisableApproval"
      @on-preview-click="onPreviewClick"
      @on-cancel-click="openConfirmCancel"
      @on-save-click="onSaveClick"
      @on-approval-click="onApprovalClick"
    />
  </div>
</template>
<style scoped>
@import url('@/assets/css/view/product/deliveryProduct/product-approval-list.css');
</style>
