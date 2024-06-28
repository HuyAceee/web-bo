<!-- BO_E0206_010101 -->
<script setup lang="ts">
import { WelfareBigButton, WelfareCheckbox, WelfareInputText, WelfareInputTextWithValidation, WelfareMdButton, WelfareSelect } from '@/components'
import MemberSearchWithTableWrapperModal from '@/components/members/modal/MemberSearchWithTableWrapperModal.vue'
import ProductSearchModalWrapper from '@/components/products/common/ProductSearchModalWrapper.vue'
import ProductSearchModalWithTableWrapper from '@/components/products/common/ProductSearchModalWithTableWrapper.vue'
import FormGroup from '@/components/widgets/form/FormGroup.vue'
import { useDeliveryTicketProductPurchaseConfirmList } from '@/composables/delivery/ticketProductOrderManagement/useDeliveryTicketProductPurchaseConfirmList'
import { ProductSearchRecordModel, ProductSearchType } from '@/models'
import DeliverySearchProductWrapper from '@/components/delivery/common/DeliverySearchProductWrapper.vue'
import DeliveryBaseTable from '@/components/delivery/ticketProductOrderManagement/DeliveryBaseTable.vue'
import { deliveryListSelectDatePurchaseConfirmListOptions } from '@/models/views/delivery/ticketProductOrderManagement/DeliveryTicketProductListOrderStatusModel'
import {
  deliveryProductTypeOptions,
  deliveryCategoryTypeOptions
} from '@/models/views/delivery/ticketProductOrderManagement/DeliveryTicketProductOrderStatusProductModel'
import {
  deliveryOrderStatusPurchaseConfirmListOptions,
  deliveryKeywordSearchTicketListOptions
} from '@/models/views/delivery/ticketProductOrderManagement/DeliveryTicketProductTicketListModel'
import FormGroupTimeLinesFilterForm from '@/components/widgets/form/FormGroupTimeLinesFilterForm.vue'
import { MemberSearchType } from '@/models/views/members/modal/MemberSearchTypeModel'

const {
  values,
  setFieldValue,
  onPageChange,
  listChecked,
  onRowSelected,
  onSelectAllChange,
  items,
  isLoading,
  refTable,
  currentFilterDate,
  handleChangeCountDate,
  onSubmit,
  onDownload,
  getIsCheckBox,
  handleCheckBoxChange,
  categoryDepth1,
  categoryDepth2,
  categoryDepth3,
  handleResetForm,
  searchSellerKeyRef,
  searchMDKeyRef,
  handleOpenPopupSearchMember,
  handleOpenPopupSearchSeller,
  sellerCompanies,
  tableConfigs,
  searchProductKeyRef,
  handleOpenPopupSearchProduct,
  isDisabledClaimStatus,
  deliveryClaimStatusOptions,
  searchMemberKeyRef,
  searchCustomerKeyRef,
  handleOpenPopupSearchCustomer,
  handleChangeKeywordFilter,
  handleInputFieldChange,
  placeholderKeywordSearch
} = useDeliveryTicketProductPurchaseConfirmList()
</script>

<template>
  <div>
    <div class="wf-p-30 wf-space-y-29">
      <div class="wf-btn-border--bg-color-line-gray wf_br-6">
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-11" is-rounded-top label="주문코드">
            <WelfareInputText
              class="wf_w-180"
              size="small"
              placeholder="주문코드 조회"
              :disabled="!!values.keywordSearchType"
              :model-value="values.orderKey"
              @update:model-value="(value) => setFieldValue('orderKey', value)"
            />
          </FormGroup>
          <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-12" is-border-left label="고객사">
            <ProductSearchModalWithTableWrapper
              ref="searchCustomerKeyRef"
              @selectValue="
                (value) => {
                  setFieldValue('customerKey', value.code)
                }
              "
              class="wf-product-base-info-search"
              placeholder-input="고객사 조회"
              label-button="조회"
              :type="ProductSearchType.CUSTOMER"
              :disabled="!!values.keywordSearchType"
              is-disabled-on-empty-search-text
              @on-open-popup-search-member="handleOpenPopupSearchCustomer"
            />
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1 wf-form-group-small" custom-class="wf-pb-1 wf-pl-11" label="회원">
            <MemberSearchWithTableWrapperModal
              ref="searchMemberKeyRef"
              @selectValue="
                (value) => {
                  setFieldValue('memberKey', value.memberKey)
                }
              "
              class="wf-product-base-info-search"
              placeholder-input="회원조회"
              label-button="조회"
              :type="MemberSearchType.NORMAL"
              :disabled="!!values.keywordSearchType"
              is-disabled-on-empty-search-text
              @on-open-popup-search-member="handleOpenPopupSearchMember"
            />
          </FormGroup>
          <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-11 wf-pr-9" is-border-left label="주문자">
            <WelfareInputText
              class="wf_w-180"
              size="small"
              placeholder="주문자명 조회"
              :disabled="!!values.keywordSearchType"
              :model-value="values.ordererName"
              @update:model-value="(value) => setFieldValue('ordererName', value)"
            />
          </FormGroup>
          <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-11 wf-pr-10" is-border-left label="수령자">
            <WelfareInputText
              class="wf_w-180"
              size="small"
              placeholder="수령자명 조회"
              :disabled="!!values.keywordSearchType"
              :model-value="values.receiverName"
              @update:model-value="(value) => setFieldValue('receiverName', value)"
            />
          </FormGroup>
          <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-11 wf-pr-10" is-border-left label="수령자 휴대폰">
            <WelfareInputTextWithValidation
              class="wf_w-180"
              size="small"
              placeholder="수령자 휴대폰 번호 조회"
              :disabled="!!values.keywordSearchType"
              name="receiverPhoneNumber"
              inputType="number"
            />
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-11" label="카테고리">
            <WelfareSelect
              class="wf_w-180"
              optionLabel="label"
              option-value="value"
              small
              disabled
              placeholder="표준카테고리"
              :options="deliveryCategoryTypeOptions"
              :model-value="values.categoryType"
              @update:model-value="(value) => setFieldValue('categoryType', value)"
            />
            <WelfareSelect
              class="wf_w-180 wf-ml-6"
              optionLabel="label"
              option-value="value"
              small
              placeholder="1차 분류"
              :disabled="!!values.keywordSearchType"
              :options="categoryDepth1"
              :model-value="values.categoryDepthId1"
              @update:model-value="(value) => setFieldValue('categoryDepthId1', value)"
            />
            <WelfareSelect
              class="wf_w-180 wf-ml-4"
              optionLabel="label"
              option-value="value"
              small
              placeholder="2차 분류"
              :disabled="!values.categoryDepthId1 || !!values.keywordSearchType"
              :options="categoryDepth2"
              :model-value="values.categoryDepthId2"
              @update:model-value="(value) => setFieldValue('categoryDepthId2', value)"
            />
            <WelfareSelect
              class="wf_w-180 wf-ml-4"
              optionLabel="label"
              option-value="value"
              small
              :disabled="!values.categoryDepthId2 || !!values.keywordSearchType"
              placeholder="3차 분류"
              :options="categoryDepth3"
              :model-value="values.categoryDepthId3"
              @update:model-value="(value) => setFieldValue('categoryDepthId3', value)"
            />
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-11" label="상품">
            <DeliverySearchProductWrapper
              ref="searchProductKeyRef"
              @selectValue="
                (value) => {
                  setFieldValue('productKey', value.productKey)
                }
              "
              placeholder-input="회원조회"
              label-button="조회"
              :disabled="!!values.keywordSearchType"
              is-disabled-on-empty-search-text
              @on-open-popup-search-member="handleOpenPopupSearchProduct"
            />
          </FormGroup>
          <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-11" label="판매사" is-border-left>
            <ProductSearchModalWithTableWrapper
              ref="searchSellerKeyRef"
              @selectValue="
                (value) => {
                  setFieldValue('sellerKey', value.code)
                }
              "
              class="wf-product-base-info-search"
              :type="ProductSearchType.SELLER"
              placeholder-input="판매사 조회"
              label-button="조회"
              :disabled="!!values.keywordSearchType"
              is-disabled-on-empty-search-text
              @on-open-popup-search-member="handleOpenPopupSearchSeller"
            />
            <WelfareSelect
              class="wf_w-180 wf-ml-6"
              optionLabel="label"
              option-value="value"
              small
              :disabled="!values.sellerKey"
              placeholder="하위업체 전체"
              :options="sellerCompanies"
              :model-value="values.subcontractKey"
              @update:model-value="(value) => setFieldValue('subcontractKey', value)"
            />
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-10" label="상품 유형">
            <div class="wf-approval-body-filter-group-checkbox wf-space-x-21 wf_flex">
              <div v-for="(_item, _index) in deliveryProductTypeOptions.list" :key="_index">
                <WelfareCheckbox
                  size="sm"
                  :model-value="getIsCheckBox('productType', _item.id)"
                  :label="_item.label"
                  :disabled="!!values.keywordSearchType"
                  @update:model-value="(value) => handleCheckBoxChange('productType', value, _item.id)"
                />
              </div>
            </div>
          </FormGroup>
          <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-12 wf-pr-9" is-border-left label="MD">
            <ProductSearchModalWrapper
              class="wf-product-base-info-search"
              :type="ProductSearchType.MD"
              placeholder-input="MD 조회"
              label-button="조회"
              :disabled="!!values.keywordSearchType"
              ref="searchMDKeyRef"
              is-disabled-on-empty-search-text
              @selectValue="(value: ProductSearchRecordModel) => setFieldValue('mdKey', value.code)"
            />
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-11" label="주문상태">
            <WelfareSelect
              class="wf_w-180"
              optionLabel="label"
              option-value="value"
              small
              placeholder="전체"
              :disabled="!!values.keywordSearchType"
              :options="deliveryOrderStatusPurchaseConfirmListOptions"
              :model-value="values.orderStatus"
              @update:model-value="(value) => setFieldValue('orderStatus', value)"
            />
          </FormGroup>
          <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-11" label="클레임 상태" is-border-left>
            <WelfareSelect
              class="wf_w-180"
              optionLabel="label"
              option-value="value"
              small
              placeholder="전체"
              :disabled="!!values.keywordSearchType || isDisabledClaimStatus"
              :options="deliveryClaimStatusOptions"
              :model-value="values.claimStatus"
              @update:model-value="(value) => setFieldValue('claimStatus', value)"
            />
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroupTimeLinesFilterForm
            class="wf_h-44 wf-pl-"
            label="기간"
            ref="refTable"
            is-border-bottom
            is-rounded-bottom
            :disabled-select-option="!!values.keywordSearchType"
            select-placeholder="결제일"
            :disabled="!!values.keywordSearchType"
            :current-active-date="currentFilterDate"
            :from-date="values.fromDate"
            :to-date="values.toDate"
            :current-type-date-product-select="values.dateSelect"
            :options-product-type-date="deliveryListSelectDatePurchaseConfirmListOptions"
            @on-change-date-from="(value) => setFieldValue('fromDate', value)"
            @on-change-date-to="(value) => setFieldValue('toDate', value)"
            @on-select-type="(value) => setFieldValue('dateSelect', value)"
            @on-change-filter-date="handleChangeCountDate"
          />
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-11" is-rounded-top label="검색어" :isBorderBottom="false" isRoundedBottom>
            <WelfareSelect
              class="wf_w-180 wf-mr-6"
              optionLabel="label"
              option-value="value"
              small
              placeholder="사용안함"
              :options="deliveryKeywordSearchTicketListOptions"
              :model-value="values.keywordSearchType"
              @update:model-value="(value) => handleChangeKeywordFilter(value)"
            />
            <WelfareInputText
              class="w-full"
              size="small"
              :placeholder="placeholderKeywordSearch"
              @input="handleInputFieldChange"
              :disabled="!values.keywordSearchType"
              :model-value="values.keywords"
              @update:model-value="(value) => setFieldValue('keywords', value)"
            />
          </FormGroup>
        </div>
      </div>
      <div class="wf_flex wf_justify-center wf-gap-x-20">
        <WelfareBigButton label="초기화" button-type="neatral" @on-click="() => handleResetForm()" />
        <WelfareBigButton label="조회" button-type="default" @on-click="() => onSubmit()" />
      </div>
    </div>
    <div class="wf-line"></div>
    <div class="wf-p-30">
      <DeliveryBaseTable
        :total-items="items?.length"
        :items="items"
        :column-configs="tableConfigs"
        :list-checked="listChecked"
        :is-loading="isLoading"
        @page-change="onPageChange"
        @row-selected="onRowSelected"
        @select-all-change="onSelectAllChange"
      >
        <template #buttons>
          <WelfareMdButton label="취소신청" class="wf_w-69" buttonType="liner" />
          <WelfareMdButton label="엑셀다운로드" class="wf_w-93" buttonType="liner" @on-click="() => onDownload()" />
        </template>
      </DeliveryBaseTable>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'DeliveryTicketProductListOfPurchaseConfirmationPage'
}
</script>

<style scoped>
@import url('@/assets/css/view/delivery/delivery-ticket-product-list-order-status.css');
</style>
