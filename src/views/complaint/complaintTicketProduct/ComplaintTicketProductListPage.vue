<!-- BO_F0201_010101 -->
<script setup lang="ts">
import { WelfareBigButton, WelfareInputText, DataTableContainer, WelfareMdButton, WelfareSelect } from '@/components'
import FormGroup from '@/components/widgets/form/FormGroup.vue'
import ProductSearchModalWithTableWrapper from '@/components/products/common/ProductSearchModalWithTableWrapper.vue'
import { useComplaintTicketProductList } from '@/composables/complaint/complaintTicketProduct/useComplaintTicketProductList'
import ProductGroupControlFilterForm from '@/components/products/deliveryProduct/formFilterList/ProductGroupControlFilterForm.vue'
import {
  complaintHeaderFieldTableTicketProductListConfig,
  complaintSelectDateOptionsConfig,
  complaintKeywordSearchOptionsConfig
} from '@/models/views/complaint/complaintTicketProduct/ComplaintTicketProductListModel'
import { ProductSearchType } from '@/models'
import ComplaintGroupCheckBoxForm from '@/components/complaint/formFilterList/ComplaintGroupCheckBoxForm.vue'
import MemberSearchWithTableWrapperModal from '@/components/members/modal/MemberSearchWithTableWrapperModal.vue'
import FormGroupTimeLinesFilterForm from '@/components/widgets/form/FormGroupTimeLinesFilterForm.vue'
import { MemberSearchType } from '@/models/views/members/modal/MemberSearchTypeModel'
import { FORMAT_DATE_YYYY_MM_DD_HH_mm_ss, formatNumberDot, formatTime } from '@/common'
const {
  searchMemberRef,
  searchCustomerRef,
  searchSellerRef,
  sellerCompanies,
  values,
  refTable,
  claimType,
  getIsCheckBox,
  handleCheckBoxChange,
  setFieldValue,
  items,
  totalItems,
  onPageChange,
  isLoading,
  currentFilterDate,
  handleChangeCountDate,
  handleChangeValueSelect,
  handleOpenPopupSearchMember,
  handleOpenPopupSearchCustomer,
  handleOpenPopupSearchSeller,
  handleResetFilter,
  isDisableForm,
  onSubmitForm,
  onDownloadExcel,
  onClickClaimKey,
  onClickOrderKey,
  onClickMemberKey,
  onClickOpenModalNoticeComingSoon,
  handleChangeFilterForm,
  formFilter
} = useComplaintTicketProductList()
</script>
<template>
  <div class="wf_border-page">
    <div class="complaint-container-form">
      <div class="wf-btn-border--bg-color-line-gray wf_br-6">
        <form id="wf_approval-group-filter" class="wf_flex wf_flex-col wf-mt-0">
          <div class="wf_flex wf_items-center">
            <FormGroup class="wf_flex-1" is-rounded-top label="클레임 유형">
              <ComplaintGroupCheckBoxForm
                :data="claimType"
                field="claimType"
                :get-is-check-box="getIsCheckBox"
                @change-check-box="handleCheckBoxChange"
                :disabled="isDisableForm"
              />
            </FormGroup>
            <FormGroup class="wf_flex-1" is-border-left label="클레임 코드">
              <WelfareInputText
                :model-value="values.claimKey"
                placeholder=""
                class="wf_w-180"
                size="small"
                :disabled="isDisableForm"
                @update:model-value="(value) => setFieldValue('claimKey', value)"
              />
            </FormGroup>
          </div>
          <div class="wf_flex wf_flex-row wf_items-center">
            <div class="wf_flex wf_flex-row wf_flex-1">
              <FormGroup class="wf-complaint-w-input wf_flex-1" label="회원">
                <MemberSearchWithTableWrapperModal
                  ref="searchMemberRef"
                  @selectValue="
                    (value) => {
                      setFieldValue('orderMemberKey', value.memberKey)
                    }
                  "
                  class="wf-product-base-info-search wf_w-full"
                  placeholder-input="선택"
                  label-button="조회"
                  :type="MemberSearchType.NORMAL"
                  :disabled="isDisableForm"
                  @on-open-popup-search-member="handleOpenPopupSearchMember"
                />
              </FormGroup>
              <FormGroup class="wf-complaint-w-input wf_flex-1" is-border-left label="고객사">
                <ProductSearchModalWithTableWrapper
                  ref="searchCustomerRef"
                  @selectValue="
                    (value) => {
                      setFieldValue('customerKey', value.code)
                    }
                  "
                  class="wf-product-base-info-search"
                  placeholder-input="고객사 조회"
                  label-button="조회"
                  :type="ProductSearchType.CUSTOMER"
                  :disabled="isDisableForm"
                  @on-open-popup-search-member="handleOpenPopupSearchCustomer"
                />
              </FormGroup>
            </div>
            <div class="wf_flex wf_flex-row wf_flex-1">
              <FormGroup custom-class="wf-pr-8" class="wf_flex-1" is-border-left label="주문 코드">
                <WelfareInputText
                  :disabled="isDisableForm"
                  :model-value="values.orderKey"
                  placeholder=""
                  class="wf_w-180"
                  size="small"
                  @update:model-value="(value) => setFieldValue('orderKey', value)"
                />
              </FormGroup>
              <FormGroup custom-class="wf-pr-8" class="wf_flex-1" is-border-left label="주문자명">
                <WelfareInputText
                  :disabled="isDisableForm"
                  :model-value="values.orderer"
                  placeholder=""
                  class="wf_w-180"
                  size="small"
                  @update:model-value="(value) => setFieldValue('orderer', value)"
                />
              </FormGroup>
            </div>
          </div>
          <FormGroup class="wf_flex-1" label="판매사">
            <ProductSearchModalWithTableWrapper
              ref="searchSellerRef"
              @selectValue="
                (value) => {
                  setFieldValue('sellerKey', value.code)
                }
              "
              class="wf-product-base-info-search-label"
              :type="ProductSearchType.SELLER"
              placeholder-input="전체"
              label-button="조회"
              :disabled="isDisableForm"
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
          <FormGroupTimeLinesFilterForm
            label="기간"
            :disabled="isDisableForm"
            :current-active-date="currentFilterDate"
            @on-change-filter-date="handleChangeCountDate"
            :from-date="values.fromDate"
            :to-date="values.toDate"
            @on-change-date-from="(value) => handleChangeValueSelect('fromDate', value)"
            @on-change-date-to="(value) => handleChangeValueSelect('toDate', value)"
            :current-type-date-product-select="values.periodSearchType"
            @on-select-type="(value) => handleChangeValueSelect('periodSearchType', value)"
            :options-product-type-date="complaintSelectDateOptionsConfig"
          />
        </form>
        <ProductGroupControlFilterForm
          :disabled="isDisableForm"
          :list-filters="complaintKeywordSearchOptionsConfig"
          @on-change-filter="handleChangeFilterForm"
          :current-filter="formFilter"
          fieldInput="keyword"
          :searchWordModel="values.keyword"
          @onchange-text="(field, val) => setFieldValue(field, val)"
        />
      </div>
      <div class="wf-mt-27">
        <div class="wf_flex wf_items-center wf_justify-center wf-space-x-20">
          <WelfareBigButton type="reset" label="초기화" buttonType="neatral" @on-click="() => handleResetFilter()" />
          <WelfareBigButton label="조회" buttonType="default" @click="onSubmitForm" />
        </div>
      </div>
    </div>
    <hr class="wf_break-line-gray" />
    <div class="wf-px-30 wf-py-30">
      <DataTableContainer
        ref="refTable"
        :value="items"
        :loading="isLoading"
        :total-records="totalItems"
        :column-configs="complaintHeaderFieldTableTicketProductListConfig"
        @page-change="onPageChange"
        no-data-label="리스트가 없습니다"
      >
        <template #title>
          <h6 class="wf_text-n-33">조회 결과 &nbsp;(총 {{ totalItems ?? 0 }}건)</h6>
        </template>
        <template #buttons>
          <div class="wf-space-x-6 wf_flex">
            <WelfareMdButton @click="onDownloadExcel" label="엑셀 다운로드" class="wf_w-93" buttonType="liner" />
          </div>
        </template>
        <template #body-claimKey="{ props }">
          <span
            class="wf_flex wf_justify-center wf-underline wf_w-full wf-body_03-reg wf-pointer wf_text-sub-02"
            @click="() => onClickClaimKey(props?.data)"
          >
            {{ props.data.claimKey }}
          </span>
        </template>
        <template #body-orderKey="{ props }">
          <span
            class="wf_flex wf_justify-center wf-underline wf_w-full wf-body_03-reg wf-pointer wf_text-sub-02"
            @click="() => onClickOrderKey(props?.data)"
          >
            {{ props.data.orderKey }}
          </span>
        </template>
        <template #body-sellerKey="{ props }">
          <span
            class="wf_flex wf_justify-center wf-underline wf_w-full wf-body_03-reg wf-pointer wf_text-sub-02"
            @click="onClickOpenModalNoticeComingSoon"
          >
            {{ props.data.sellerKey }}
          </span>
        </template>
        <template #body-memberKey="{ props }">
          <span
            class="wf_flex wf_justify-center wf-underline wf_w-full wf-body_03-reg wf-pointer wf_text-sub-02"
            @click="onClickMemberKey(props.data.memberKey)"
          >
            {{ props.data.memberKey }}
          </span>
        </template>
        <template #body-companyKey="{ props }">
          <span
            class="wf_flex wf_justify-center wf-underline wf_w-full wf-body_03-reg wf-pointer wf_text-sub-02"
            @click="onClickOpenModalNoticeComingSoon"
          >
            {{ props.data.companyKey }}
          </span>
        </template>
        <template #body-lastPaymentAmount="{ props }">
          <span>
            {{ formatNumberDot(props.data.lastPaymentAmount) ?? '' }}
          </span>
        </template>
        <template #body-cancelFee="{ props }">
          <span>
            {{ formatNumberDot(props.data.cancelFee) ?? '' }}
          </span>
        </template>
        <template #body-lastRefundAmount="{ props }">
          <span>
            {{ formatNumberDot(props.data.lastRefundAmount) ?? '' }}
          </span>
        </template>
        <template #body-paymentDatetime="{ props }">
          <span>
            {{ formatTime(props.data.paymentDatetime, FORMAT_DATE_YYYY_MM_DD_HH_mm_ss) ?? '' }}
          </span>
        </template>
        <template #body-claimApplyDatetime="{ props }">
          <span>
            {{ formatTime(props.data.claimApplyDatetime, FORMAT_DATE_YYYY_MM_DD_HH_mm_ss) ?? '' }}
          </span>
        </template>
      </DataTableContainer>
    </div>
  </div>
  <div class=""></div>
</template>
<script lang="ts">
export default {
  name: 'ComplaintTicketProductListPage'
}
</script>
<style scoped>
@import url('@/assets/css/view/complaint/complaint-ticket-prod-list.css');
</style>
