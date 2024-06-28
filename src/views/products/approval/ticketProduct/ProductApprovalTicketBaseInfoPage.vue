<!-- BO_C0304_010101 -->
<script setup lang="ts">
import ProductBottomButton from '@/components/products/common/ProductBottomButton.vue'
import ProductMoreInfo from '@/components/products/common/ProductMoreInfo.vue'
import ProductTitle from '@/components/products/common/ProductTitle.vue'
import ProductBaseInfo from '@/components/products/deliveryProduct/baseInfo/ProductBaseInfo.vue'
import ProductCustomerInfo from '@/components/products/deliveryProduct/baseInfo/ProductCustomerInfo.vue'
import ProductRegistrationInfo from '@/components/products/deliveryProduct/baseInfo/ProductRegistrationInfo.vue'
import ProductTicketMoreInfo from '@/components/products/ticketProduct/ProductTicketMoreInfo.vue'
import { useProductBaseInfo } from '@/composables/products/common/useProductBaseInfo'
import { SelectOptionModel, WelfareSelectOptionType, YnOptions, productStatusSell } from '@/models'
import { PRODUCT_STATUS_ENUM, productBaseInfoType } from '@/models/views/products/common/ProductTypeModel'

const optionsTypeProduct: WelfareSelectOptionType[] = [
  { label: '일반 티켓', value: '03' },
  { label: '예약 티켓', value: '04' }
]

const optionsTypeTicket: WelfareSelectOptionType[] = [
  { label: '모바일티켓', value: '01' },
  { label: '바우처', value: '02' }
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
  // More information
  changeKeywordCustomer,
  handleAddTagKeywordCustomer,
  handleRemoveTagKeywordCustomer,
  handleChangeIsMinimumMaximumPurchaseQuantity,
  // Button Bottom
  openConfirmCancel,
  openNotificationSaveTemporary,
  openNotificationSave,
  openNotificationApproval,
  onPreviewClick,
  handleApprovalByIdAction,
  handleRefuseApprovalByIdAction,
  handleChangeExpiration
} = useProductBaseInfo(productBaseInfoType.approval_ticket, optionsTypeProduct, optionsTypeTicket)
</script>

<template>
  <div class="wf-space-y-30 wf-mt--1 wf-mr--2">
    <!-- 기본정보 - Base information -->
    <div class="">
      <ProductTitle title="기본정보" />
      <ProductBaseInfo
        :type="productBaseInfoType.ticket"
        :external-integration="values.externalIntegration"
        :productCode="values.productCode"
        :productName="values.productName"
        :productNameI18="values.productNameI18"
        :selectTypeProduct="values.selectTypeProduct"
        :selectSeller="values.selectSeller"
        :lowSellerKey="values.lowSellerKey"
        :optionsTypeProduct="optionsTypeProduct"
        labelTypeProduct="일반 티켓"
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
        @onChangeSelectTypeProduct="(value: SelectOptionModel) => handleChangeValueField('selectTypeProduct', value)"
        @onChangeSelectSeller="(value: SelectOptionModel) => handleChangeValueField('selectSeller', value)"
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
          <ProductTicketMoreInfo
            :startTime="values.startTime"
            :endTime="values.endTime"
            :selectTypeTicket="values.selectTypeTicket"
            :optionsTypeTicket="optionsTypeTicket"
            :radioPassType="values.ticketPassType"
            :radioCancel="values.ticketCancelPossibleType"
            :radioRule="values.ticketUseRuleType"
            :optionsExpiration="values.ticketValidityDateYn"
            @onChangeStartTime="(value) => handleChangeValueField('startTime', value)"
            @onChangeEndTime="(value) => handleChangeValueField('endTime', value)"
            @onChangeSelectTypeTicket="(value: SelectOptionModel) => handleChangeValueField('selectTypeTicket', value)"
            @onChangeTicketPassType="(value: SelectOptionModel) => handleChangeValueField('ticketPassType', value)"
            @onChangeTicketCancelPossibleType="(value: SelectOptionModel) => handleChangeValueField('ticketCancelPossibleType', value)"
            @onChangeTicketUseRuleType="(value: SelectOptionModel) => handleChangeValueField('ticketUseRuleType', value)"
            @onChangeOptionsExpiration="(value: YnOptions) => handleChangeExpiration(value)"
          />
          <!-- <div class="wf_flex wf_flex-col">
            <div class="wf_flex wf-btn-border-b--ncc wf_h-44">
              <div class="wf_flex wf_flex-1">
                <div
                  class="wf-btn-border-r--ncc wf_flex wf_items-center wf_justify-start wf_h-44 wf-pl-14 wf-pr-11 wf-py-14 wf-btn-border-b--ncc wf-body_02-semi wf_text-n-33 wf_w-150 wf_bg-bg-gray"
                >
                  제조사
                </div>
                <div class="wf_flex wf_items-center wf_justify-start wf_h-44 wf-pl-11 wf-pr-11 wf-py-14 wf-body_03-reg wf_text--14 wf_flex-1-0-0">
                  <div class="wf_flex wf_items-center wf-space-x-4 wf_flex-1">
                    <WelfareInputText
                    size="small"
                    inputType="text"
                    class="wf_flex wf_flex-1-0-0"
                    placeholder="한글 기준 30자 이내로 입력"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="wf_flex wf-btn-border-b--ncc wf_h-152">
              <div class="wf_flex wf-width-full wf-height-full">
                <FormGroup :label="'원산지'" class="wf_h-152 wf_items-start">
                  <WelfareTextarea
                    :labelBottomRight="`${values.productCodeSeller?.length ?? 0}/200 bytes`"
                    maxlength="200"
                    class="text-area-h-120 wf-width-full"
                    placeholder="한글 기준 200자 이내로 입력해 주세요."
                    />
                </FormGroup>
              </div>
            </div>
          </div> -->
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
        :lastSavedTime="values.createdDate"
        :lastApprovalFinishedTime="values.lastApprovalFinishedTime"
        :lastChangeSavedTime="values.lastSavedTime"
        :selectStatusSell="values.selectStatusSell"
        :optionsStatusSell="productStatusSell"
        :registrant="values.createdBy"
        :registrantName="values.createdByName"
        :modifier="values.lastModifiedBy"
        :modifierName="values.lastModifiedByName"
        :approver="values.lastProductApprovedBy"
        :approverName="values.lastProductApprovedByName"
        :reason-refused="values.productRequestProcessReason"
        @onChangeSelectStatusSell="(value: SelectOptionModel) => handleChangeValueField('selectStatusSell', value)"
      />
    </div>
    <div class="">
      <ProductBottomButton
        v-if="!values.lastProductProgressStatusCode"
        :approvalDisabled="true"
        :preview-disabled="false"
        @on-preview-click="onPreviewClick"
        @on-cancel-click="openConfirmCancel"
        @on-temporary-click="openNotificationSaveTemporary"
        @on-save-click="openNotificationSave"
        @on-approval-click="openNotificationApproval"
      />
      <ProductBottomButton
        v-else-if="values.lastProductProgressStatusCode == PRODUCT_STATUS_ENUM.PRODUCT_REGISTRATION_IN_PROGRESS"
        @on-cancel-click="openConfirmCancel"
        @on-save-click="openNotificationSave"
        previewDisabled
        temporaryDisabled
        approvalDisabled
      />
      <ProductBottomButton
        v-else
        @on-cancel-click="openConfirmCancel"
        @on-approval-finished-click="handleApprovalByIdAction"
        @on-approval-reject-click="handleRefuseApprovalByIdAction"
        @on-save-click="openNotificationSave"
        previewDisabled
        temporaryDisabled
        :save-disabled="true"
        :approval-finished="true"
      />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'DeliveryProductBaseInfo'
}
</script>
