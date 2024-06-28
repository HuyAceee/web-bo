<!-- BO_C0303_010101 -->

<script setup lang="ts">
import { PRODUCT_TICKET_APPROVAL_PRODUCT } from '@/common'
import { WelfareRadio, WelfareSelect } from '@/components'
import FormGroup from '@/components/widgets/form/FormGroup.vue'
import FormButtonHandleForm from '@/components/widgets/form/FormButtonHandleForm.vue'
import ProductGroupCheckBoxForm from '@/components/products/deliveryProduct/formFilterList/ProductGroupCheckBoxForm.vue'
import ProductSearchModalWrapper from '@/components/products/common/ProductSearchModalWrapper.vue'
import { productHeaderFieldTableTicketApprovalConfig } from '@/models'
import { useProductApprovalTicketList } from '@/composables/products/ticketProduct/useProductApprovalTicketList'
import ProductTableDataApprovalList from '@/components/products/deliveryProduct/deliveryListTable/ProductTableDataApprovalList.vue'
import ProductGroupInputCompanyForm from '@/components/products/deliveryProduct/formFilterList/ProductGroupInputCompanyForm.vue'
import ProductGroupControlFilterForm from '@/components/products/deliveryProduct/formFilterList/ProductGroupControlFilterForm.vue'
import FormGroupTimeLinesFilterForm from '@/components/widgets/form/FormGroupTimeLinesFilterForm.vue'

const {
  currentFilterDate,
  handleChangeFilterForm,
  handleChangeValueSelect,
  handleCheckBoxChange,
  getIsCheckBox,
  listCheckBoxDevices,
  listCheckBoxTypes,
  listInputFindProduct,
  values,
  isDisabledFilter,
  optionsProductListFilter,
  formFilter,
  optionProductDate,
  setFieldValue,
  handleResetFilter,
  handleChangeCountDate,
  listCheckboxApprovalStatus,
  listCheckBoxExternalIntegration,
  listRadioRequestClassificationChanged,
  listRadioSaveTemporarily,
  items,
  totalItems,
  onPageChange,
  onRowSelected,
  onSelectAllChange,
  isLoading,
  handleShowInfoSeller,
  handleClickRefuseApprovalList,
  handleRefuseApprovalById,
  refTable,
  handleClickApprovalProductList,
  handleApprovalById,
  componentSearch,
  mdSearch,
  listCompanyChild,
  productCategoryForm,
  handleSearch
} = useProductApprovalTicketList()
</script>
<template>
  <div class="wf-container-box">
    <div class="wf-approval-body">
      <div class="wf-approval-border">
        <div class="wf-form-filter">
          <div id="wf-group-filer" class="wf-group-filter">
            <form id="wf_approval-group-filter" class="wf_flex wf_flex-col wf-mt-0">
              <FormGroup label="카테고리" customClass="wf-space-x-4" :isRoundedTop="true">
                <div v-for="(_item, _index) in productCategoryForm" :key="_index">
                  <WelfareSelect
                    :disabled="isDisabledFilter"
                    :modelValue="values?.[_item.field]"
                    @update:modelValue="(value) => handleChangeValueSelect(_item.field, value)"
                    class="wf_w-180"
                    :placeholder="_item.placeholder"
                    optionLabel="label"
                    :options="_item.options"
                    small
                  />
                </div>
              </FormGroup>
              <div class="wf_flex wf_items-center">
                <ProductGroupInputCompanyForm
                  :data-field="listInputFindProduct[0]"
                  :company-child="values.companyChild"
                  :disabled="isDisabledFilter"
                  :list-company-child="listCompanyChild"
                  :curren-value-input="values[listInputFindProduct[0].field]"
                  @input-value="(value) => setFieldValue(listInputFindProduct[0].field, value)"
                  @select-value="(value) => handleChangeValueSelect('companyChild', value)"
                  ref="componentSearch"
                />
                <FormGroup
                  customClass="wf_flex-1 wf_flex wf-space-x-4 wf_w-300 wf_items-center"
                  is-border-left
                  :label="listInputFindProduct[1].title"
                >
                  <ProductSearchModalWrapper
                    class="wf_w-228"
                    v-if="listInputFindProduct[1].type"
                    :type="listInputFindProduct[1].type"
                    :disabled="isDisabledFilter"
                    :label-button="listInputFindProduct[1].labelButton"
                    @select-value="(value) => handleChangeValueSelect(listInputFindProduct[1].field, value)"
                    ref="mdSearch"
                  />
                </FormGroup>
              </div>
              <div class="wf_flex wf_items-center">
                <div class="wf_flex-1">
                  <ProductGroupCheckBoxForm
                    :list-group-check-box="[listCheckBoxExternalIntegration]"
                    :get-is-check-box="getIsCheckBox"
                    :change-check-box="handleCheckBoxChange"
                    :disabled="isDisabledFilter"
                  />
                </div>
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
              />
              <ProductGroupCheckBoxForm
                v-for="(list, index) in [listCheckBoxTypes, listCheckBoxDevices]"
                :key="index"
                :list-group-check-box="list"
                :get-is-check-box="getIsCheckBox"
                :change-check-box="handleCheckBoxChange"
                :disabled="isDisabledFilter"
              />
              <div class="wf_flex wf_items-center">
                <div class="wf_flex-1 wf_flex wf_items-center">
                  <FormGroup
                    v-for="(item, index) in [listRadioRequestClassificationChanged, listRadioSaveTemporarily]"
                    :is-border-left="index !== 0"
                    :key="index"
                    class="wf_flex-1"
                    customClass="wf-space-x-20"
                    :label="item.title"
                  >
                    <WelfareRadio
                      v-for="(_item, index) in item.list"
                      :key="index"
                      :disabled="isDisabledFilter"
                      :model-value="values[item.field]"
                      :value="_item.value"
                      :label="_item.label"
                      name="requestClassification"
                      @update:model-value="(value) => setFieldValue(item.field, value)"
                      size="sm"
                    />
                  </FormGroup>
                </div>
                <div class="wf_flex-1">
                  <ProductGroupCheckBoxForm
                    :list-group-check-box="[listCheckboxApprovalStatus]"
                    :get-is-check-box="getIsCheckBox"
                    :change-check-box="handleCheckBoxChange"
                    :disabled="isDisabledFilter"
                    :isBorderLeft="true"
                  />
                </div>
              </div>
            </form>
            <ProductGroupControlFilterForm
              :disabled="isDisabledFilter"
              :list-filters="optionsProductListFilter"
              @on-change-filter="handleChangeFilterForm"
              :current-filter="formFilter"
              fieldInput="searchWord"
              :searchWordModel="values.searchWord"
              @onchange-text="(field, val) => setFieldValue(field, val)"
            />
          </div>
          <FormButtonHandleForm @on-reset="handleResetFilter" @on-submit="handleSearch" />
        </div>
      </div>
      <div class="wf-table-wrapper" data-rows="50">
        <ProductTableDataApprovalList
          ref="refTable"
          :data="items"
          :loading="isLoading"
          :total-element="totalItems"
          @page-change="onPageChange"
          @row-checked-change="onRowSelected"
          @select-all-change="onSelectAllChange"
          @show-info-seller="handleShowInfoSeller"
          @refuse-approval-list="handleClickRefuseApprovalList"
          @refuse-approval-by-id="handleRefuseApprovalById"
          @approval-list="handleClickApprovalProductList"
          @approval-by-id="handleApprovalById"
          :data-header-table-modal="productHeaderFieldTableTicketApprovalConfig"
          :link="PRODUCT_TICKET_APPROVAL_PRODUCT"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/product/product-delivery-product-list.css');
</style>

<script lang="ts">
export default {
  name: 'ProductTicketProductApprovalListPage'
}
</script>
