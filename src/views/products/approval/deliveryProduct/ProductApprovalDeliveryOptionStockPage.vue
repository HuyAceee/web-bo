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
  isSaveSuccess,
  approvalValue,
  typeRegisterOption,
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
  countTotalOption
} = useProductDeliveryApprovalOptionDetail(productBaseInfoType.approval_delivery)
</script>

<template>
  <div>
    <div>
      <ProductTitle title="옵션/재고정보" />
      <ProductTableRowSelectOptions
        :value-option="valueOption"
        @update-value-type="updateValueType"
        @update-value-option="updateValueOption"
        :typeRegisterOption="typeRegisterOption"
        :value-type="valueType"
        :data-multiple-value="dataMultipleValue"
      />
      <ProductTableOptionsContent
        :value-type="valueType"
        v-if="valueOption === ProductRegisterValueOptionType.use"
        @edit-value-type="editValueType"
        @delete-value-type="deleteValueType"
        @update-value-total="countTotalOption"
      />
      <ProductTableTotal
        :disabled="valueOption === ProductRegisterValueOptionType.use"
        :total-count="totalCount"
        @update-value-total="updateValueTotalCount"
      />
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
    />
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/product/deliveryProduct/deliveryProdRegister/product-delivery-prod-register.css');
</style>
