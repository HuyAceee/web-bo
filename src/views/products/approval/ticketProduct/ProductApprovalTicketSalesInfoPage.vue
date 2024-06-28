<!-- BO_C0304_030101 -->
<script setup lang="ts">
import { PRODUCT_PROMOTION_DETAIL } from '@/common'
import ProductSalesInformation from '@/components/products/deliveryProduct/salesInfo/ProductSalesInformation.vue'
import ProductSavingPromotion from '@/components/products/deliveryProduct/salesInfo/ProductSavingPromotion.vue'
import ProductPricingInformation from '@/components/products/deliveryProduct/salesInfo/ProductPricingInformation.vue'
import ProductCouponPromotion from '@/components/products/deliveryProduct/salesInfo/ProductCouponPromotion.vue'
import ProductDiscountPromotion from '@/components/products/deliveryProduct/salesInfo/ProductDiscountPromotion.vue'
import { useProductApprovalSalesInformationBase } from '@/composables/products/common/useProductApprovalSalesInformationBase'
import ProductBottomButton from '@/components/products/common/ProductBottomButton.vue'
import { PRODUCT_STATUS_ENUM } from '@/models/views/products/common/ProductTypeModel'
const {
  statusLastProductProgressStatusCode,
  contractMarginRate,
  query,
  discountPromotionData,
  couponPromotionData,
  savingPromotionData,
  onSave,
  onCancel,
  // onTemporary,
  handleUpdateContractMarginRateYN,
  handleRefuseApprovalByIdAction,
  handleApprovalByIdAction
} = useProductApprovalSalesInformationBase()
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
        :contractMarginRateYN="query.contractMarginRateYN"
        @update:contractMarginRateYN="
          (e) => {
            handleUpdateContractMarginRateYN(e)
          }
        "
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
      <ProductBottomButton
        v-if="statusLastProductProgressStatusCode === PRODUCT_STATUS_ENUM.PRODUCT_REGISTRATION_IN_PROGRESS"
        @on-cancel-click="onCancel"
        @on-save-click="onSave"
        previewDisabled
        temporaryDisabled
        approvalDisabled
      />
      <ProductBottomButton
        v-else
        @on-cancel-click="onCancel"
        @on-approval-finished-click="handleApprovalByIdAction"
        @on-approval-reject-click="handleRefuseApprovalByIdAction"
        @on-save-click="onSave"
        previewDisabled
        temporaryDisabled
        :save-disabled="true"
        :approval-finished="true"
      />
    </div>
  </div>
</template>
