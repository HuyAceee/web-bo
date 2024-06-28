<!-- BO_C0501_010101 -->
<script setup lang="ts">
import { WelfareSelect, WelfareInputText, DataTableContainer, WelfareMdButton } from '@/components'
import FormGroup from '@/components/widgets/form/FormGroup.vue'
import FormButtonHandleForm from '@/components/widgets/form/FormButtonHandleForm.vue'
import ProductGroupCheckBoxForm from '@/components/products/deliveryProduct/formFilterList/ProductGroupCheckBoxForm.vue'
import ProductGroupControlFilterForm from '@/components/products/deliveryProduct/formFilterList/ProductGroupControlFilterForm.vue'
import { PRODUCT_BRAND_PRODUCT_EDIT, PRODUCT_BRAND_PRODUCT_REGISTRATION } from '@/common'
import { handleRedirectLink } from '@/common/html'
import { useProductTradeMarkList } from '@/composables/products/trademark/useProductTradeMarkList'
import { TradeMarkHeaderTableConfig } from '@/models/views/products/trademark/ProductTradeMarkModel'
import FormGroupTimeLinesFilterForm from '@/components/widgets/form/FormGroupTimeLinesFilterForm.vue'
const {
  listCheckBoxTypes,
  getIsCheckBox,
  handleCheckBoxChange,
  isDisabledFilter,
  listFormSelectProduct,
  values,
  handleChangeValueSelect,
  currentFilterDate,
  handleChangeCountDate,
  optionProductDate,
  onPageChange,
  optionsProductListFilter,
  handleChangeFilterForm,
  formFilter,
  handleResetFilter,
  listInputProduct,
  items,
  isLoading,
  totalItems,
  handleValidateIdInput,
  refTable,
  brandCode
} = useProductTradeMarkList()
</script>

<template>
  <div class="wf-container-box">
    <div class="wf-approval-body">
      <div class="wf-approval-border">
        <div class="wf-form-filter">
          <div id="wf-group-filer" class="wf-group-filter">
            <form id="wf_approval-group-filter" class="wf_flex wf_flex-col wf-mt-0">
              <div class="wf_flex wf_items-center">
                <FormGroup is-rounded-top class="wf_flex-1" customClass="wf-space-x-20" label="카테고리">
                  <WelfareSelect
                    :disabled="isDisabledFilter"
                    :modelValue="values?.[listFormSelectProduct.field]"
                    @update:modelValue="(value) => handleChangeValueSelect(listFormSelectProduct.field, value)"
                    class="wf_w-176"
                    optionLabel="label"
                    :options="listFormSelectProduct.options"
                    small
                  />
                </FormGroup>
                <div class="wf_flex-1">
                  <ProductGroupCheckBoxForm
                    is-border-left
                    :list-group-check-box="[listCheckBoxTypes]"
                    :get-is-check-box="getIsCheckBox"
                    :change-check-box="handleCheckBoxChange"
                    :disabled="isDisabledFilter"
                  />
                </div>
              </div>
              <div class="wf_flex wf_items-center">
                <FormGroup :label="listInputProduct[0].title">
                  <WelfareInputText
                    :disabled="isDisabledFilter"
                    :model-value="values[listInputProduct[0].field] ?? ''"
                    @update:model-value="(value) => handleChangeValueSelect(listInputProduct[0].field, value)"
                    placeholder=" "
                    class="wf_w-input--176"
                    size="small"
                  />
                </FormGroup>
                <FormGroup :label="listInputProduct[1].title" is-border-left>
                  <input
                    v-model="brandCode"
                    @input="handleValidateIdInput"
                    class="wf-custom-input-number"
                    placeholder=" "
                    :disabled="isDisabledFilter"
                  />
                </FormGroup>
              </div>
              <FormGroupTimeLinesFilterForm
                label="기간"
                :disabled="isDisabledFilter"
                :current-active-date="currentFilterDate"
                @on-change-filter-date="handleChangeCountDate"
                :from-date="values.fromDate"
                :to-date="values.toDate"
                @on-change-date-from="(value) => handleChangeValueSelect('fromDate', value)"
                @on-change-date-to="(value) => handleChangeValueSelect('toDate', value)"
                :current-type-date-product-select="values.productDateSelect"
                @on-select-type="(value) => handleChangeValueSelect('productDateSelect', value)"
                :options-product-type-date="optionProductDate"
                class-select="wf_w-120"
              />
            </form>
            <ProductGroupControlFilterForm
              :disabled="isDisabledFilter"
              :list-filters="optionsProductListFilter"
              @on-change-filter="handleChangeFilterForm"
              :current-filter="formFilter"
              class-select="wf_w-120"
            />
          </div>
          <FormButtonHandleForm @on-reset="handleResetFilter" />
        </div>
      </div>
      <div class="wf-table-wrapper" data-rows="50">
        <DataTableContainer
          :value="items"
          @page-change="onPageChange"
          :total-records="totalItems"
          :loading="isLoading"
          :column-configs="TradeMarkHeaderTableConfig"
          ref="refTable"
        >
          <template #title>
            <h6 class="wf_text-n-33">조회 결과 &nbsp;총 {{ totalItems }} 건</h6>
          </template>
          <template #buttons>
            <WelfareMdButton
              @click="handleRedirectLink(PRODUCT_BRAND_PRODUCT_REGISTRATION)"
              label="브랜드 등록"
              class="wf_w-84"
              buttonType="default"
            />
          </template>
          <template #body-id="{ props }">
            <span class="wf_text-n-33 wf_text-underline">
              {{ props.data.id }}
            </span>
          </template>
          <template #body-name="{ props }">
            <span class="wf_text-n-33 wf_text-underline">
              {{ props.data.name }}
            </span>
          </template>
          <template #body-logo="{ props }">
            <img alt="" :src="props.data.logo" />
          </template>
          <template #body-check="{ props }">
            <WelfareMdButton
              @click="handleRedirectLink(`${PRODUCT_BRAND_PRODUCT_EDIT}/${props.data.id}`)"
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

<script lang="ts">
export default {
  name: 'ProductTradeMarkProductListPage'
}
</script>

<style scoped>
@import url('@/assets/css/view/product/product-trademark-list.css');
</style>
