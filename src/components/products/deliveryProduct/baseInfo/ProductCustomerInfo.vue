<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ProductSearchRecordModel, ProductSearchType, WelfareRadioProps } from '@/models'
import { WelfareMdButton, WelfareRadioGroup, WelfareTag } from '@/components/uikit'
import ProductSearchModalWithTableWrapper from '@/components/products/common/ProductSearchModalWithTableWrapper.vue'

interface ProductCustomerInfoProps {
  customerRegistration?: boolean
  keywordsCustomer: string[]
}

interface ProductCustomerInfoEmits {
  (e: 'changeKeywordCustomer', value: ProductSearchRecordModel): void
  (e: 'handleAddTagKeywordCustomer'): void
  (e: 'handleRemoveTagKeywordCustomer', idx: number): void
  (e: 'onChangeCustomerRegistration', value: boolean): void
}
const props = defineProps<ProductCustomerInfoProps>()
const emits = defineEmits<ProductCustomerInfoEmits>()

const options = reactive<WelfareRadioProps[]>([
  { label: '등록', value: true },
  { label: '미등록', value: false }
])

const searchCustomerRef = ref()
const handleAddTagKeywordCustomer = () => {
  emits('handleAddTagKeywordCustomer')
  searchCustomerRef.value.handleReset()
}
</script>

<template>
  <div class="wf_flex wf-btn-border--ncc wf_br-6 wf-mt-20">
    <div
      class="wf-body_02-semi wf_text-n-33 wf_br-tl--6 wf_br-bl--6 wf-btn-border-r--ncc wf_flex wf_items-center wf_justify-start wf-pl-14 wf-pr-11 wf-py-14 wf_w-150 wf_bg-bg-gray"
    >
      노출 제외 고객사
    </div>
    <div class="wf_text-sub-01 wf_flex wf_flex-1 wf_flex-col wf_justify-start wf-space-y-5 wf-px-12 wf-py-7 wf-pt-6 wf-body_03-reg">
      <div class="wf-py-7">
        <WelfareRadioGroup
          :model-value="props.customerRegistration"
          @update:model-value="(value) => emits('onChangeCustomerRegistration', value)"
          :options="options"
          size="sm"
        />
      </div>
      <div class="wf_flex wf_items-center wf-space-x-3">
        <ProductSearchModalWithTableWrapper
          :disabled="!props.customerRegistration"
          ref="searchCustomerRef"
          @selectValue="(value) => emits('changeKeywordCustomer', value)"
          class="wf-product-base-info-search"
          :type="ProductSearchType.CUSTOMER"
          placeholder-input="고객사 조회"
          label-button="조회"
        />
        <WelfareMdButton
          :disabled="!props.customerRegistration"
          label="등록"
          buttonType="liner"
          buttonSize="small"
          @on-click="handleAddTagKeywordCustomer"
        />
      </div>
      <div class="wf-btn-border--ncc wf_flex wf_items-center wf-product-base-tag-wrap wf_flex-wrap wf-pr-7 wf-pl-6 wf-py-5 wf_br-4 wf_min-h-49">
        <WelfareTag
          v-for="(keyword, idx) in props.keywordsCustomer"
          v-bind:key="idx + keyword"
          @click="() => emits('handleRemoveTagKeywordCustomer', idx)"
          >{{ keyword }}</WelfareTag
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/product/deliveryProduct/product-customer-info.css');
</style>
