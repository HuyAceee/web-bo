<!-- BO_C0202_040101 -->
<script setup lang="ts">
import ProductTableTotal from '@/components/products/deliveryProduct/deliveryProdRegister/ProductTableTotal.vue'
import ProductTitle from '@/components/products/common/ProductTitle.vue'
import ProductBottomButton from '@/components/products/common/ProductBottomButton.vue'
import { ProductRegisterValueOptionType } from '@/models'
import ProductTableRowSelectOptions from '@/components/products/deliveryProduct/deliveryProdRegister/ProductTableRowSelectOptions.vue'
import ProductTableOptionsContent from '@/components/products/deliveryProduct/deliveryProdRegister/ProductTableOptionsContent.vue'
import { useProductDeliveryProdRegister } from '@/composables/products/deliveryProdRegister/useProductDeliveryProdRegister'
import { ProductTicketDetailBasicInfoProps } from '@/models/services/responses/products/ticket/ProductTicketBaseInfoResponse'
import { productBaseInfoType } from '@/models/views/products/common/ProductTypeModel'

const props = defineProps<ProductTicketDetailBasicInfoProps>()
const {
  valueType,
  valueOption,
  approvalValue,
  updateValueType,
  updateValueOption,
  editValueType,
  deleteValueType,
  totalCount,
  updateValueTotalCount,
  openCancelModal,
  openTemporaryStorageModal,
  openSaveModal,
  onClickApproval,
  dataMultipleValue,
  countTotalOption,
  productKey,
  typeOptionValue,
  lastProductProgressStatusCode,
  onPreviewClick,
  checkDataNull,
  productRequestKey
} = useProductDeliveryProdRegister(productBaseInfoType.ticket, props)
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
        :type-register-option="valueType.length !== 0 ? typeOptionValue : undefined"
        :value-type="valueType"
        :data-multiple-value="dataMultipleValue"
        :base-info-type="productBaseInfoType.ticket"
        :product-key="productKey"
        :product-request-key="productRequestKey"
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
      @on-cancel-click="openCancelModal"
      @on-temporary-click="openTemporaryStorageModal"
      @on-save-click="openSaveModal"
      @on-approval-click="onClickApproval"
      @on-preview-click="onPreviewClick"
      :approval-disabled="true"
      :preview-disabled="!approvalValue"
      :temporaryVisible="false"
    />
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/product/deliveryProduct/deliveryProdRegister/product-delivery-prod-register.css');
</style>
