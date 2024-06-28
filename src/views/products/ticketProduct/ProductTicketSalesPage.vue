<!-- BO_C0202_030101 -->
<script setup lang="ts">
import { PRODUCT_PROMOTION_DETAIL } from '@/common'
import ProductSalesInformation from '@/components/products/deliveryProduct/salesInfo/ProductSalesInformation.vue'
import ProductSavingPromotion from '@/components/products/deliveryProduct/salesInfo/ProductSavingPromotion.vue'
import ProductBottomButton from '@/components/products/common/ProductBottomButton.vue'
import ProductCouponPromotion from '@/components/products/deliveryProduct/salesInfo/ProductCouponPromotion.vue'
import ProductDiscountPromotion from '@/components/products/deliveryProduct/salesInfo/ProductDiscountPromotion.vue'
import ProductPricingInformation from '@/components/products/deliveryProduct/salesInfo/ProductPricingInformation.vue'
import { useProductSalesTicketUpdate } from '@/composables/products/ticketProduct/baseInfo/useProductSalesTicketUpdate'
import { PRODUCT_STATUS_ENUM } from '@/models/views/products/common/ProductTypeModel'
const {
  contractMarginRate,
  query,
  discountPromotionData,
  couponPromotionData,
  savingPromotionData,
  onApprove,
  onSave,
  onCancel,
  onPreview,
  onTemporary
} = useProductSalesTicketUpdate()
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
        v-model:contractMarginRateYN="query.marginRateModificationYn"
      />
      <ProductDiscountPromotion :data="discountPromotionData" :discountDetailsLink="PRODUCT_PROMOTION_DETAIL">
        <template #row-id="slotProps">
          <td class="wf_col-grow wf_justify-center wf_text-underline">
            <router-link class="wf_text-sub-02" target="_blank" :to="`${slotProps.link}/${slotProps.id}`">{{ slotProps.id }}</router-link>
          </td>
        </template>
        <template #row-promotion-name="slotProps">
          <td class="wf_col-grow wf_justify-center wf_text-underline">
            <router-link class="wf_text-sub-02" target="_blank" :to="`${slotProps.link}/${slotProps.id}`">{{ slotProps.promotionName }}</router-link>
          </td>
        </template>
      </ProductDiscountPromotion>

      <ProductCouponPromotion :data="couponPromotionData" :couponDetailsLink="''">
        <template #row-id="slotProps">
          <td class="wf_col-grow wf_justify-center wf_text-underline">
            <router-link class="wf_text-sub-02" target="_blank" :to="`${slotProps.link}/${slotProps.id}`">{{ slotProps.id }}</router-link>
          </td>
        </template>
        <template #row-promotion-name="slotProps">
          <td class="wf_col-grow wf_justify-center wf_text-underline">
            <router-link class="wf_text-sub-02" target="_blank" :to="`${slotProps.link}/${slotProps.id}`">{{ slotProps.promotionName }}</router-link>
          </td>
        </template></ProductCouponPromotion
      >

      <ProductSavingPromotion :data="savingPromotionData" :couponDetailsLink="''">
        <template #row-id="slotProps">
          <td class="wf_col-grow wf_justify-center wf_text-underline">
            <router-link class="wf_text-sub-02" target="_blank" :to="`${slotProps.link}/${slotProps.id}`">{{ slotProps.id }}</router-link>
          </td>
        </template>
        <template #row-promotion-name="slotProps">
          <td class="wf_col-grow wf_justify-center wf_text-underline">
            <router-link class="wf_text-sub-02" target="_blank" :to="`${slotProps.link}/${slotProps.id}`">{{ slotProps.promotionName }}</router-link>
          </td>
        </template>
      </ProductSavingPromotion>

      <!-- <ProductBottomButton
        :preview-disabled="true"
        :approval-disabled="true"
        :temporary-visible="false"
        @on-preview-click="onPreview"
        @on-cancel-click="onCancel"
        @on-temporary-click="onTemporary"
        @on-save-click="onSave"
        @on-approval-click="onApprove"
      /> -->

      <ProductBottomButton
        v-if="
          (query.productCode || query.productRequestKey) &&
          query.lastProductProgressStatusCode === PRODUCT_STATUS_ENUM.PRODUCT_REGISTRATION_IN_PROGRESS
        "
        :preview-disabled="true"
        :save-disabled="false"
        :approvalDisabled="true"
        :temporary-disabled="true"
        :temporary-visible="false"
        @on-preview-click="onPreview"
        @on-cancel-click="onCancel"
        @on-temporary-click="onTemporary"
        @on-save-click="onSave"
        @on-approval-click="onApprove"
      />
      <ProductBottomButton
        v-else-if="(query.productCode || query.productRequestKey) && query.lastProductProgressStatusCode === PRODUCT_STATUS_ENUM.APPROVAL_PENDING"
        :approvalDisabled="true"
        :preview-disabled="true"
        :temporary-disabled="true"
        :temporary-visible="false"
        @on-preview-click="onPreview"
        @on-cancel-click="onCancel"
        @on-temporary-click="onTemporary"
        @on-save-click="onSave"
        @on-approval-click="onApprove"
      />
      <ProductBottomButton
        v-else-if="(query.productCode || query.productRequestKey) && query.lastProductProgressStatusCode === PRODUCT_STATUS_ENUM.APPROVAL_COMPLETED"
        :approvalDisabled="true"
        :preview-disabled="true"
        :temporary-disabled="true"
        :temporary-visible="false"
        @on-preview-click="onPreview"
        @on-cancel-click="onCancel"
        @on-temporary-click="onTemporary"
        @on-save-click="onSave"
        @on-approval-click="onApprove"
      />
      <ProductBottomButton
        v-else
        :approval-disabled="true"
        :preview-disabled="true"
        :temporary-disabled="true"
        :temporary-visible="false"
        @on-preview-click="onPreview"
        @on-cancel-click="onCancel"
        @on-temporary-click="onTemporary"
        @on-save-click="onSave"
        @on-approval-click="onApprove"
      />
    </div>
  </div>
</template>
