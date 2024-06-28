<!-- BO_C0401_010101 -->

<script setup lang="ts">
import FormGroup from '@/components/widgets/form/FormGroup.vue'
import { DataTableContainer, WelfareRadio, WelfareMdButton } from '@/components'
import ProductSearchModalWithTableWrapper from '@/components/products/common/ProductSearchModalWithTableWrapper.vue'
import { ProductSearchType, DataHeaderPromotionProductTableModalConfig, productPromotionListSelectDateOptionsConfig } from '@/models'
import { PRODUCT_PROMOTION_PRODUCT_DETAIL } from '@/common'
import { handleRedirectLink } from '@/common/html'
import { useProductDiscountPromotionList } from '@/composables/products/promotion/useProductDiscountPromotionList'
import ComplaintGroupCheckBoxForm from '@/components/complaint/formFilterList/ComplaintGroupCheckBoxForm.vue'
import FormButtonHandleForm from '@/components/widgets/form/FormButtonHandleForm.vue'
import ProductGroupControlFilterForm from '@/components/products/deliveryProduct/formFilterList/ProductGroupControlFilterForm.vue'
import FormGroupTimeLinesFilterForm from '@/components/widgets/form/FormGroupTimeLinesFilterForm.vue'
const {
  searchSellerRef,
  items,
  values,
  refTable,
  totalItems,
  isLoading,
  onPageChange,
  setFieldValue,
  handleCheckBoxChange,
  getIsCheckBox,
  currentFilterDate,
  handleChangeCountDate,
  handleChangeValueSelect,
  handleResetFilter,
  listRadio,
  handleOpenPopupSearchSeller,
  progressYn,
  discountCouponYn,
  optionPmtSearchWordType,
  onSubmitForm,
  isDisableForm,
  formFilter,
  handleChangeFilterForm
} = useProductDiscountPromotionList()
</script>
<template>
  <div class="wf-container-box">
    <div class="wf-approval-body">
      <div class="wf-approval-border">
        <div class="wf-form-filter">
          <div id="wf-group-filer" class="wf-group-filter">
            <form id="wf_approval-group-filter" class="wf_flex wf_flex-col wf-mt-0">
              <div class="wf_flex wf_items-center">
                <FormGroup customClass="wf-space-x-20" is-rounded-top label="할인 구분">
                  <WelfareRadio
                    v-for="(item, index) in listRadio"
                    :key="index"
                    :model-value="values.discountPriceType"
                    :value="item.value"
                    :label="item.title"
                    name="discountPriceType"
                    @update:model-value="(value) => setFieldValue('discountPriceType', value)"
                    size="sm"
                    :disabled="isDisableForm"
                  />
                </FormGroup>
                <FormGroup customClass="wf_flex wf-space-x-4 wf_w-253 wf_items-center" is-border-left label="판매사">
                  <ProductSearchModalWithTableWrapper
                    ref="searchSellerRef"
                    @selectValue="
                      (value) => {
                        setFieldValue('sellerKey', value.code)
                      }
                    "
                    class="wf-product-base-info-search-label"
                    :type="ProductSearchType.SELLER"
                    placeholder-input="판매사 조회"
                    label-button="조회"
                    :disabled="isDisableForm"
                    @on-open-popup-search-member="handleOpenPopupSearchSeller"
                  />
                </FormGroup>
              </div>
              <div class="wf_flex wf_items-center">
                <FormGroup class="wf_flex-1" label="진행 상태">
                  <ComplaintGroupCheckBoxForm
                    :data="progressYn"
                    field="progressYn"
                    :get-is-check-box="getIsCheckBox"
                    @change-check-box="handleCheckBoxChange"
                    :disabled="isDisableForm"
                  />
                </FormGroup>
                <FormGroup class="wf_flex-1" is-border-left label="쿠폰 적용 여부">
                  <ComplaintGroupCheckBoxForm
                    :data="discountCouponYn"
                    field="discountCouponYn"
                    :get-is-check-box="getIsCheckBox"
                    @change-check-box="handleCheckBoxChange"
                    :disabled="isDisableForm"
                  />
                </FormGroup>
              </div>
              <FormGroupTimeLinesFilterForm
                label="기간"
                :current-active-date="currentFilterDate"
                @on-change-filter-date="handleChangeCountDate"
                :from-date="values.fromDate"
                :to-date="values.toDate"
                @on-change-date-from="(value) => handleChangeValueSelect('fromDate', value)"
                @on-change-date-to="(value) => handleChangeValueSelect('toDate', value)"
                :current-type-date-product-select="values.pmtSearchDateType"
                @on-select-type="(value) => handleChangeValueSelect('pmtSearchDateType', value)"
                :options-product-type-date="productPromotionListSelectDateOptionsConfig"
                :disabled="isDisableForm"
              />
            </form>
            <ProductGroupControlFilterForm
              :disabled="isDisableForm"
              :list-filters="optionPmtSearchWordType"
              @on-change-filter="handleChangeFilterForm"
              :current-filter="formFilter"
              fieldInput="pmtSearchWord"
              :searchWordModel="values.pmtSearchWord"
              @onchange-text="(field, val) => setFieldValue(field, val)"
            />
          </div>
          <FormButtonHandleForm @on-reset="handleResetFilter" @on-submit="onSubmitForm" />
        </div>
      </div>
      <div class="wf-table-wrapper" data-rows="50">
        <DataTableContainer
          :value="items"
          @page-change="onPageChange"
          :total-records="totalItems"
          :loading="isLoading"
          :column-configs="DataHeaderPromotionProductTableModalConfig"
          ref="refTable"
        >
          <template #title>
            <h6 class="wf_text-n-33">조회 결과 &nbsp;(총 {{ totalItems ?? 0 }}건)</h6>
          </template>
          <template #body-discountPromotionId="{ props }">
            <router-link class="wf_text-sub-02" target="_blank" :to="`${PRODUCT_PROMOTION_PRODUCT_DETAIL}/${props.data.discountPromotionKey}`">{{
              props.data.discountPromotionId
            }}</router-link>
          </template>
          <template #body-discountPromotionName="{ props }">
            <router-link class="wf_text-sub-02" target="_blank" :to="`${PRODUCT_PROMOTION_PRODUCT_DETAIL}/${props.data.discountPromotionKey}`">{{
              props.data.discountPromotionName
            }}</router-link>
          </template>
          <template #body-promotionPeriod="{ props }">
            <span> {{ props?.data.discountPromotionStartDateTime }} ~ {{ props?.data.discountPromotionEndDateTime }} </span>
          </template>
          <template #body-createdByName="{ props }">
            <span> {{ props?.data.createdByName }} {{ props?.data.createdBy ? `(${props?.data.createdBy})` : '' }} </span>
          </template>
          <template #body-view="{ props }">
            <WelfareMdButton
              @click="handleRedirectLink(`${PRODUCT_PROMOTION_PRODUCT_DETAIL}/${props.data.discountPromotionKey}`)"
              label="보기"
              buttonType="liner"
              buttonSize="small"
            />
          </template>
        </DataTableContainer>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/product/product-delivery-product-list.css');
</style>

<script lang="ts">
export default {
  name: 'ProductDiscountPromotionListPage'
}
</script>
