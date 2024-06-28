<script setup lang="ts">
import ProductTitle from '@/components/products/common/ProductTitle.vue'
import { ProductSalesSavingPromotionDataModel, ProductSavingPromotionTableConfig } from '@/models'
import DataTableContainer from '@/components/uikit/table/DataTableContainer.vue'

export interface ProductSavingPromotionProps {
  data?: ProductSalesSavingPromotionDataModel[]
  couponDetailsLink?: string
}

defineProps<ProductSavingPromotionProps>()
</script>

<template>
  <div class="wf-space-y-20">
    <ProductTitle title="적립금 프로모션" note="" class="wf-mb--16" />
    <div class="wf-product-discount">
      <DataTableContainer
        :value="data ?? []"
        :column-configs="ProductSavingPromotionTableConfig"
        no-data-label="등록된 적립금 프로모션이 없습니다."
        is-select-invisible
      >
        <template #body-id="{ props }">
          <router-link class="wf_text-sub-02" :to="couponDetailsLink ?? `#`" target="_blank">
            {{ props.data.id }}
          </router-link>
        </template>
        <template #body-name="{ props }">
          <router-link class="wf_text-sub-02" :to="couponDetailsLink ?? `#`" target="_blank">
            {{ props.data.name }}
          </router-link>
        </template>
        <template #body-fixedRate="{ props }">
          <p class="wf-width-full wf_text-right">{{ props.data.fixedRate }}</p>
        </template>
        <template #body-semen="{ props }">
          <p class="wf-width-full wf_text-right">{{ props.data.semen }}</p>
        </template>
        <template #body-expectedSavings="{ props }">
          <p class="wf-width-full wf_text-right">{{ props.data.expectedSavings }}</p>
        </template>
      </DataTableContainer>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/product/deliveryProduct/salesInfo/product-saving-promotion.css');
</style>