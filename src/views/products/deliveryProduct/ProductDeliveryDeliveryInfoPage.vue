<!-- BO_C0102_050101 -->
<script setup lang="ts">
import ProductTitle from '@/components/products/common/ProductTitle.vue'
import ProductBottomButton from '@/components/products/common/ProductBottomButton.vue'
import ProductExchangeInfoTable from '@/components/products/deliveryProduct/deliveryInfo/ProductExchangeInfoTable.vue'
import ProductReturnInfoTable from '@/components/products/deliveryProduct/deliveryInfo/ProductReturnInfoTable.vue'
import ProductShippingInfoTable from '@/components/products/deliveryProduct/deliveryInfo/ProductShippingInfoTable.vue'
import { useProductDeliveryInfo } from '@/composables/products/deliveryInfo/useProductDeliveryInfo'

const { openCancelModal, openTemporaryStorageModal, openSaveModal, onClickApproval, isSaveSuccess, approvalValue, deliveryInfoValue } =
  useProductDeliveryInfo()
</script>

<template>
  <div>
    <ProductTitle title="배송 정보" />
    <ProductShippingInfoTable :delivery-info-value="deliveryInfoValue" />
    <div class="wf-mt-30">
      <ProductTitle title="반품 정보" />
      <ProductReturnInfoTable :delivery-info-value="deliveryInfoValue" />
    </div>
    <div class="wf-mt-29">
      <ProductTitle title="교환 정보" />
      <ProductExchangeInfoTable :delivery-info-value="deliveryInfoValue" />
    </div>
    <ProductBottomButton
      @on-cancel-click="openCancelModal"
      @on-temporary-click="openTemporaryStorageModal"
      @on-save-click="openSaveModal"
      @on-approval-click="onClickApproval"
      :approval-disabled="!isSaveSuccess"
      :preview-disabled="!approvalValue"
    />
  </div>
</template>
