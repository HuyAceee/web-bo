div
<script setup lang="ts">
import ProductTitle from '@/components/products/common/ProductTitle.vue'
import { WelfareCheckbox, WelfareInputText } from '@/components/uikit'
import { ProductPricingInformationEmits, ProductPricingInformationProps, ProductPricingInformationTableConfig } from '@/models'
import { DataTableContainer } from '@/components'
import { useProductPricingInformation } from '@/composables/products/deliveryProduct/useProductPricingInformation'
const props = defineProps<ProductPricingInformationProps>()

defineEmits<ProductPricingInformationEmits>()

const { acceptNumber, compute, acceptMaxMarginRate } = useProductPricingInformation(props)
</script>

<template>
  <div class="wf-space-y-20">
    <ProductTitle title="가격정보" note="" class="wf-mb--16" />
    <div>
      <div class="wf-product-discount">
        <DataTableContainer :value="[{}]" :column-configs="ProductPricingInformationTableConfig" is-select-invisible>
          <template #header-sellingPrice>
            <p>판매가(VAT 포함) <span class="wf_text-sub-01">*</span></p>
          </template>
          <template #header-marginRate>
            <div class="wf_flex wf_items-center wf-space-x-6">
              <WelfareCheckbox
                :model-value="$props.contractMarginRateYN"
                @update:model-value="
                  (value) => {
                    $emit('update:contractMarginRateYN', value)
                  }
                "
                size="sm"
              />
              <span>상품 마진율 (%)</span>
            </div>
          </template>
          <template #body-sellingPrice>
            <div class="wf_w-180">
              <WelfareInputText
                :model-value="props?.sellingPrice"
                @update:model-value="(value) => $emit('update:sellingPrice', value)"
                @keypress="acceptNumber"
                text-align="right"
                size="small"
              />
            </div>
          </template>
          <template #body-marginRate>
            <div class="wf_w-180">
              <WelfareInputText
                :model-value="props?.marginRate"
                @update:model-value="(value) => $emit('update:marginRate', value)"
                @keypress="
                  (event) => {
                    acceptNumber(event)
                    acceptMaxMarginRate(event)
                  }
                "
                :disabled="!$props.contractMarginRateYN"
                text-align="right"
                size="small"
              />
            </div>
          </template>
          <template #body-productMargin>
            <div class="wf_w-full wf_flex wf_justify-end">
              {{ compute.productMargin }}
            </div>
          </template>
          <template #body-contractMarginRate>
            <div class="wf_w-full wf_flex wf_justify-end">
              {{ props?.contractMarginRate }}
            </div>
          </template>
          <template #body-contractMargin>
            <div class="wf_w-full wf_flex wf_justify-end">
              {{ compute.contractMargin }}
            </div>
          </template>
        </DataTableContainer>
      </div>
    </div>
  </div>
</template>
<style scoped>
@import url('@/assets/css/view/product/deliveryProduct/salesInfo/product-saving-promotion.css');
</style>
