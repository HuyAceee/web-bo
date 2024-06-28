<script setup lang="ts">
import { formatNumberDot } from '@/common'
import ProductTitle from '@/components/products/common/ProductTitle.vue'
import { DataTableContainer } from '@/components/uikit'
import { ProductSalesDiscountPromotionDataModel, ProductDiscountPromotionHeaderTableConfig } from '@/models'
export interface ProductDiscountPromotionProps {
  data?: ProductSalesDiscountPromotionDataModel[]
  discountDetailsLink?: string
}
defineProps<ProductDiscountPromotionProps>()
</script>

<template>
  <div class="wf-space-y-20">
    <ProductTitle title="할인 프로모션" />

    <div class="wf-product-discount">
      <DataTableContainer is-select-invisible :columnConfigs="ProductDiscountPromotionHeaderTableConfig" :value="$props.data">
        <template #body-id="{ props }">
          <slot name="row-id" :id="props.data.id" :link="$props.discountDetailsLink"></slot>
        </template>
        <template #body-name="{ props }">
          <slot name="row-promotion-name" :id="props.data.id" :promotionName="props.data.name" :link="$props.discountDetailsLink"></slot>
        </template>
        <template #body-price="{ props }">
          <span>{{ props?.data?.price ? formatNumberDot(props?.data?.price) : '' }}</span>
        </template>
        <template #body-discountPrice="{ props }">
          <span>{{ props?.data?.discountPrice ? formatNumberDot(props?.data?.discountPrice) : '' }}</span>
        </template>
      </DataTableContainer>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/product/deliveryProduct/salesInfo/product-saving-promotion.css');
</style>
