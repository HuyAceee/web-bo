<!-- BO_C0302_010101 -->
<script setup lang="ts">
import ProductBaseInfo from '@/components/products/deliveryProduct/baseInfo/ProductBaseInfo.vue'
import ProductRegistrationInfo from '@/components/products/deliveryProduct/baseInfo/ProductRegistrationInfo.vue'
import ProductTitle from '@/components/products/common/ProductTitle.vue'
import ProductBottomButton from '@/components/products/common/ProductBottomButton.vue'
import ProductMoreInfo from '@/components/products/common/ProductMoreInfo.vue'
import ProductCustomerInfo from '@/components/products/deliveryProduct/baseInfo/ProductCustomerInfo.vue'
import ProductDeliveryMoreInfo from '@/components/products/deliveryProduct/baseInfo/ProductDeliveryMoreInfo.vue'
import { useProductBaseInfo } from '@/composables/products/common/useProductBaseInfo'
import { WelfareSelectOptionType } from '@/models'
import { productApprovalStatus, productBaseInfoType } from '@/models/views/products/common/ProductTypeModel'

const optionsTypeProduct: WelfareSelectOptionType[] = [
  { label: '일반', value: '1' },
  { label: '설치형', value: '2' }
]

const {
  values,
  handleChangeValueField,
  // Base Info
  optionsSelectSeller,
  keywordProductBase,
  onChangeKeywordProductBase,
  handleAddTagKeywordBase,
  handleRemoveTagKeywordBase,
  onChangeBrandSearch,
  onChangeSellerSearch,

  // Customer information
  changeKeywordCustomer,
  handleAddTagKeywordCustomer,
  handleRemoveTagKeywordCustomer,
  handleChangeIsMinimumMaximumPurchaseQuantity,
  // Button Bottom
  openConfirmCancel,
  openNotificationSaveTemporary,
  openNotificationSave,
  openNotificationApproval,
  openApprovalReject,
  openConfirmApproval
} = useProductBaseInfo(productBaseInfoType.approval_delivery, optionsTypeProduct)
</script>

<template>
  <div class="wf-space-y-30 wf-mt--1 wf-mr--2">
    <!-- 기본정보 - Base information -->
    <div class="">
      <ProductTitle title="기본정보" />
      <ProductBaseInfo
        :externalIntegration="values.externalIntegration"
        :productCode="values.productCode"
        :productName="values.productName"
        :productNameI18="values.productNameI18"
        :selectTypeProduct="values.selectTypeProduct"
        :selectSeller="values.selectSeller"
        :optionsTypeProduct="optionsTypeProduct"
        labelTypeProduct="일반"
        :optionsSelectSeller="optionsSelectSeller"
        :keywordProductBase="keywordProductBase"
        :keywordsProductBase="values.productKeywords"
        :sellerSearch="values.seller"
        :brandSearch="values.brand"
        :productCodeSeller="values.productCodeSeller"
        :nameModel="values.nameModel"
        @onChangeKeywordProductBase="onChangeKeywordProductBase"
        @handleAddTagKeywordBase="handleAddTagKeywordBase"
        @handleRemoveTagKeywordBase="handleRemoveTagKeywordBase"
        @onChangeProductName="(value: any) => handleChangeValueField('productName', value)"
        @onChangeProductNameI18="(value: any) => handleChangeValueField('productNameI18', value)"
        @onChangeSelectTypeProduct="(value: any) => handleChangeValueField('selectTypeProduct', value)"
        @onChangeSelectSeller="(value: any) => handleChangeValueField('selectSeller', value)"
        @onChangeProductCodeSeller="(value: any) => handleChangeValueField('productCodeSeller', value)"
        @onChangeNameModel="(value: any) => handleChangeValueField('nameModel', value)"
        @onChangeBrandSearch="onChangeBrandSearch"
        @onChangeSellerSearch="onChangeSellerSearch"
      />
    </div>
    <!-- 추가정보 - More information -->
    <div>
      <ProductTitle title="추가정보" />
      <ProductMoreInfo
        :registerProductReview="values.registerProductReview"
        :qaRegistration="values.qaRegistration"
        :giveAGift="values.giveAGift"
        :minimumPurchaseQuantity="values.minimumPurchaseQuantity"
        :maximumPurchaseQuantity="values.maximumPurchaseQuantity"
        :isMinimumPurchaseQuantity="values.isMinimumPurchaseQuantity"
        :isMaximumPurchaseQuantity="values.isMaximumPurchaseQuantity"
        @onChangeRegisterProductReview="(value: any) => handleChangeValueField('registerProductReview', value)"
        @onChangeQaRegistration="(value: any) => handleChangeValueField('qaRegistration', value)"
        @onChangeGiveAGift="(value: any) => handleChangeValueField('giveAGift', value)"
        @onChangeMinimumPurchaseQuantity="(value: any) => handleChangeValueField('minimumPurchaseQuantity', value)"
        @onChangeMaximumPurchaseQuantity="(value: any) => handleChangeValueField('maximumPurchaseQuantity', value)"
        @onChangeIsMinimumPurchaseQuantity="
          (value: any) => handleChangeIsMinimumMaximumPurchaseQuantity(value, 'isMinimumPurchaseQuantity', 'minimumPurchaseQuantity')
        "
        @onChangeIsMaximumPurchaseQuantity="
          (value: any) => handleChangeIsMinimumMaximumPurchaseQuantity(value, 'isMaximumPurchaseQuantity', 'maximumPurchaseQuantity')
        "
      >
        <template #moreInfo>
          <ProductDeliveryMoreInfo
            :manufacturingCompany="values.manufacturingCompany"
            :origin="values.origin"
            @onChangeManufacturingCompany="(value: any) => handleChangeValueField('manufacturingCompany', value)"
            @onChangeOrigin="(value: any) => handleChangeValueField('origin', value)"
          />
        </template>
      </ProductMoreInfo>
    </div>
    <!-- 고객사 정보 - Customer information -->
    <div>
      <ProductTitle title="고객사 정보" />
      <ProductCustomerInfo
        :customerRegistration="values.customerRegistration"
        :keywordsCustomer="values.customerKeywords"
        @changeKeywordCustomer="changeKeywordCustomer"
        @handleAddTagKeywordCustomer="handleAddTagKeywordCustomer"
        @handleRemoveTagKeywordCustomer="handleRemoveTagKeywordCustomer"
        @onChangeCustomerRegistration="(value: any) => handleChangeValueField('customerRegistration', value)"
      />
    </div>
    <!-- 등록정보 - Registration information -->
    <div>
      <ProductTitle title="등록정보" />
      <ProductRegistrationInfo
        :productStatus="values.productStatus"
        :lastSavedTime="values.lastSavedTime"
        :lastApprovalFinishedTime="values.lastApprovalFinishedTime"
        :lastChangeSavedTime="values.lastChangeSavedTime"
        :selectStatusSell="values.selectStatusSell"
        :reason-refused="values.productRequestProcessReason"
        @onChangeSelectStatusSell="(value: any) => handleChangeValueField('selectStatusSell', value)"
      />
    </div>
    <div class="">
      <ProductBottomButton
        @on-cancel-click="openConfirmCancel"
        @on-temporary-click="openNotificationSaveTemporary"
        @on-save-click="openNotificationSave"
        @on-approval-click="openNotificationApproval"
        @on-approval-reject-click="openApprovalReject"
        @on-approval-finished-click="openConfirmApproval"
        :previewDisabled="values.productStatus !== productApprovalStatus.approvalCompleted"
        temporaryDisabled
        saveDisabled
        approvalFinished
      />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ProductDeliveryExhibitionBaseInfoPage'
}
</script>
