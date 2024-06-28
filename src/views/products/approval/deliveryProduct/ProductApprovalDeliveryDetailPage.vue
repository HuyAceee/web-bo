<script setup lang="ts">
import ProductBottomButton from '@/components/products/common/ProductBottomButton.vue'
import ProductTitle from '@/components/products/common/ProductTitle.vue'
import ProductShippingInfoTable from '@/components/products/deliveryProduct/deliveryInfo/ProductShippingInfoTable.vue'
import ProductReturnInfoTable from '@/components/products/deliveryProduct/deliveryInfo/ProductReturnInfoTable.vue'
import ProductExchangeInfoTable from '@/components/products/deliveryProduct/deliveryInfo/ProductExchangeInfoTable.vue'
import { useProductDeliveryApprovalShipDetail } from '@/composables/products/approval/deliveryProduct/useProductDeliveryApprovalShipDetail'
import { productBaseInfoType } from '@/models/views/products/common/ProductTypeModel'
const {
  openCancelModal,
  openTemporaryStorageModal,
  openSaveModal,
  onClickApproval,
  openApprovalReject,
  openConfirmApproval,
  isSaveSuccess,
  approvalValue,
  deliveryInfoValue
} = useProductDeliveryApprovalShipDetail(productBaseInfoType.approval_delivery)
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
      @on-approval-finished-click="openConfirmApproval"
      @on-approval-reject-click="openApprovalReject"
      :approval-visible="false"
      approval-finished
      save-disabled
      temporary-disabled
    />
  </div>
</template>
