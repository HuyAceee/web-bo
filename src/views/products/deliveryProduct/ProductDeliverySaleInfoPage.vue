<!-- BO_C0102_030101 -->
<script setup lang="ts">
import ProductSalesInformation from '@/components/products/deliveryProduct/salesInfo/ProductSalesInformation.vue'
import ProductBottomButton from '@/components/products/common/ProductBottomButton.vue'
import ProductCouponPromotion from '@/components/products/deliveryProduct/salesInfo/ProductCouponPromotion.vue'
import ProductDiscountPromotion from '@/components/products/deliveryProduct/salesInfo/ProductDiscountPromotion.vue'
import ProductPricingInformation from '@/components/products/deliveryProduct/salesInfo/ProductPricingInformation.vue'
import { useProductSalesInformation } from '@/composables/products/deliveryProduct/useProductSalesInformation'

const { contractMarginRate, query, discountPromotionData, couponPromotionData, onApprove, onSave, onCancel, onPreview, onTemporary } =
  useProductSalesInformation()
</script>

<template>
  <div>
    <div class="wf-space-y-30">
      <ProductSalesInformation
        v-model:tax="query.tax"
        v-model:adultCertified="query.adultCertified"
        v-model:startDate="query.startDate"
        v-model:endDate="query.endDate"
        v-model:unlimited="query.unlimited"
      />
      <ProductPricingInformation
        :contractMarginRate="contractMarginRate"
        :tax="query.tax"
        v-model:sellingPrice="query.sellingPrice"
        v-model:marginRate="query.marginRate"
      />
      <ProductDiscountPromotion :data="discountPromotionData" />
      <ProductCouponPromotion :data="couponPromotionData" />
      <ProductBottomButton
        :preview-disabled="true"
        :approval-disabled="true"
        @on-preview-click="onPreview"
        @on-cancel-click="onCancel"
        @on-temporary-click="onTemporary"
        @on-save-click="onSave"
        @on-approval-click="onApprove"
      />
    </div>
  </div>
</template>
