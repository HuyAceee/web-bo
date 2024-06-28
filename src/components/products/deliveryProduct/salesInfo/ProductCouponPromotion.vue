<script setup lang="ts">
import ProductTitle from '@/components/products/common/ProductTitle.vue'
import { DataTableContainer } from '@/components/uikit'
import { ProductCouponPromotionHeaderTableConfig, ProductSalesCouponPromotionDataModel } from '@/models'
export interface ProductCouponPromotionProps {
  data?: ProductSalesCouponPromotionDataModel[]
  couponDetailsLink?: string
}
defineProps<ProductCouponPromotionProps>()
</script>

<template>
  <div class="wf-space-y-20">
    <ProductTitle title="쿠폰 프로모션" note="※쿠폰은 할인 프로모션 이후 적용됩니다." />

    <div class="wf-product-discount">
      <DataTableContainer is-select-invisible :columnConfigs="ProductCouponPromotionHeaderTableConfig" :value="$props.data">
        <template #body-id="{ props }">
          <slot name="row-id" :id="props.data.id" :link="$props.couponDetailsLink"></slot>
        </template>
        <template #body-name="{ props }">
          <slot name="row-promotion-name" :id="props.data.id" :promotionName="props.data.name" :link="$props.couponDetailsLink"></slot>
        </template>
      </DataTableContainer>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/product/deliveryProduct/salesInfo/product-saving-promotion.css');
</style>
