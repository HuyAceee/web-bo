<!-- BO_C0304_040101 -->
<script setup lang="ts">
import ProductTableTotal from '@/components/products/deliveryProduct/deliveryProdRegister/ProductTableTotal.vue'
import ProductTitle from '@/components/products/common/ProductTitle.vue'
import ProductBottomButton from '@/components/products/common/ProductBottomButton.vue'
import { ProductRegisterValueOptionType } from '@/models'
import ProductTableRowSelectOptions from '@/components/products/deliveryProduct/deliveryProdRegister/ProductTableRowSelectOptions.vue'
import ProductTableOptionsContent from '@/components/products/deliveryProduct/deliveryProdRegister/ProductTableOptionsContent.vue'
import { useProductDeliveryApprovalOptionDetail } from '@/composables/products/approval/deliveryProduct/useProductDeliveryApprovalOptionDetail'
import { productBaseInfoType } from '@/models/views/products/common/ProductTypeModel'

const {
  valueType,
  valueOption,
  dataMultipleValue,
  totalCount,
  updateValueType,
  updateValueOption,
  editValueType,
  deleteValueType,
  updateValueTotalCount,
  openCancelModal,
  openTemporaryStorageModal,
  openSaveModal,
  onClickApproval,
  openConfirmApproval,
  openApprovalReject,
  countTotalOption,
  lastProductProgressStatusCode,
  checkDataNull,
  productKey,
  productRequestKey,
  productCode,
  productName,
  typeOptionValue,
  handleRefuseApprovalByIdAction,
  handleApprovalByIdAction
} = useProductDeliveryApprovalOptionDetail(productBaseInfoType.approval_ticket)
</script>

<template>
  <div>
    <div>
      <ProductTitle title="옵션/재고정보" />
      <ProductTableRowSelectOptions
        isShowOption
        :value-option="valueOption"
        @update-value-type="updateValueType"
        @update-value-option="updateValueOption"
        :typeRegisterOption="valueType.length !== 0 ? typeOptionValue : undefined"
        :value-type="valueType"
        :data-multiple-value="dataMultipleValue"
        :base-info-type="productBaseInfoType.approval_ticket"
        :product-key="productKey"
        :product-request-key="productRequestKey"
        :product-code="productCode"
        :product-name="productName"
      />
      <ProductTableOptionsContent
        :value-type="valueType"
        v-if="valueOption === ProductRegisterValueOptionType.use"
        @edit-value-type="editValueType"
        @delete-value-type="deleteValueType"
        @update-value-total="countTotalOption"
        :product-progress-status-code="lastProductProgressStatusCode"
        :check-data-null="checkDataNull"
      />
      <ProductTableTotal
        :disabled="valueOption === ProductRegisterValueOptionType.use"
        :total-count="totalCount"
        @update-value-total="updateValueTotalCount"
      />
    </div>
    <ProductBottomButton
      v-if="lastProductProgressStatusCode === '01'"
      @on-cancel-click="openCancelModal"
      @on-approval-finished-click="openConfirmApproval"
      @on-approval-reject-click="openApprovalReject"
      @on-save-click="openSaveModal"
      @on-temporary-click="openTemporaryStorageModal"
      @on-approval-click="onClickApproval"
      previewDisabled
      temporaryDisabled
      approvalDisabled
    />
    <ProductBottomButton
      v-else
      @on-cancel-click="openCancelModal"
      @on-approval-finished-click="handleApprovalByIdAction"
      @on-approval-reject-click="handleRefuseApprovalByIdAction"
      @on-save-click="openSaveModal"
      previewDisabled
      :temporaryDisabled="true"
      :approval-finished="true"
    />
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/product/deliveryProduct/deliveryProdRegister/product-delivery-prod-register.css');
</style>
