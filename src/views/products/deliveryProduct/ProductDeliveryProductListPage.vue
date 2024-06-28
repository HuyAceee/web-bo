<!-- BO_C0101_010101 -->

<script setup lang="ts">
import { WelfareSelect, WelfareInputText } from '@/components'
import FormGroup from '@/components/widgets/form/FormGroup.vue'
import FormButtonHandleForm from '@/components/widgets/form/FormButtonHandleForm.vue'
import { ProductDataHeaderTableModel } from '@/models'
import ProductGroupCheckBoxForm from '@/components/products/deliveryProduct/formFilterList/ProductGroupCheckBoxForm.vue'
import ProductGroupControlFilterForm from '@/components/products/deliveryProduct/formFilterList/ProductGroupCheckBoxForm.vue'
import ProductGroupInputCompanyForm from '@/components/products/deliveryProduct/formFilterList/ProductGroupCheckBoxForm.vue'
import ProductSearchModalWrapper from '@/components/products/common/ProductSearchModalWrapper.vue'
import { PRODUCT_DELIVERY_PRODUCT_EDIT, PRODUCT_DELIVERY_REGISTRATION } from '@/common'
import { useProductDeliveryProductList } from '@/composables/products/deliveryProduct/useProductDeliveryProductList'
import ProductTableDataDeliveryList from '@/components/products/deliveryProduct/deliveryListTable/ProductTableDataDeliveryList.vue'
import FormGroupTimeLinesFilterForm from '@/components/widgets/form/FormGroupTimeLinesFilterForm.vue'

const {
  currentFilterDate,
  handleChangeFilterForm,
  handleChangeValueSelect,
  handleCheckBoxChange,
  getIsCheckBox,
  listCheckBoxDevices,
  listCheckBoxTypes,
  listFormSelectProduct,
  listInputFindProduct,
  values,
  isDisabledFilter,
  optionsProductListFilter,
  formFilter,
  optionProductDate,
  setFieldValue,
  handleResetFilter,
  handleChangeCountDate,
  componentSearch,
  mdSearch,
  brandSearch,
  items,
  onPageChange,
  totalItems,
  onRowSelected,
  onSelectAllChange,
  handleClickStopSell,
  isLoading,
  handleDownloadFileClick,
  handleShowInfoSeller,
  handleStopOnlySeller,
  listCheckBoxExternalIntegration,
  refTable,
  listCompanyChild
} = useProductDeliveryProductList()
</script>
<template>
  <div class="wf-container-box">
    <div class="wf-approval-body">
      <div class="wf-approval-border">
        <div class="wf-form-filter">
          <div id="wf-group-filer" class="wf-group-filter">
            <form id="wf_approval-group-filter" class="wf_flex wf_flex-col wf-mt-0">
              <FormGroup label="카테고리" customClass="wf-space-x-4" :isRoundedTop="true">
                <div v-for="(_item, _index) in listFormSelectProduct" :key="_index" :class="_item.class">
                  <WelfareSelect
                    :disabled="isDisabledFilter"
                    :modelValue="values?.[_item.field]"
                    @update:modelValue="(value) => handleChangeValueSelect(_item.field, value)"
                    class="wf_w-180"
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
                  customClass="wf_flex-1 wf_flex wf-space-x-4 wf_w-200 wf_items-center"
                  is-border-left
                  :label="listInputFindProduct[1].title"
                >
                  <ProductSearchModalWrapper
                    class="wf_w-228"
                    v-if="listInputFindProduct[1].type"
                    :type="listInputFindProduct[1].type"
                    :disabled="isDisabledFilter"
                    :label-button="listInputFindProduct[1].labelButton"
                    @select-value="(value) => setFieldValue(listInputFindProduct[1].field, value)"
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
                <div class="wf_flex wf_items-center wf_flex-1">
                  <FormGroup customClass="wf_flex-1 wf_flex wf-space-x-4  wf_items-center" is-border-left :label="listInputFindProduct[2].title">
                    <ProductSearchModalWrapper
                      class="wf_w-176"
                      v-if="listInputFindProduct[2].type"
                      :type="listInputFindProduct[2].type"
                      :label-button="listInputFindProduct[2].labelButton"
                      :disabled="isDisabledFilter"
                      @select-value="(value) => setFieldValue(listInputFindProduct[1].field, value)"
                      ref="brandSearch"
                    />
                  </FormGroup>
                  <FormGroup
                    customClass="wf_flex-1 wf_flex wf-space-x-4  wf_items-center wf_w-auto"
                    isBorderLeft
                    :label="listInputFindProduct[3].title"
                  >
                    <WelfareInputText
                      :disabled="isDisabledFilter"
                      :model-value="`${values[listInputFindProduct[3].field] ?? ''}`"
                      @update:model-value="(value) => setFieldValue(listInputFindProduct[3].field, value)"
                      size="small"
                      inputType="text"
                      :placeholder="listInputFindProduct[3].placeholder"
                    />
                  </FormGroup>
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
            </form>
            <ProductGroupControlFilterForm
              :disabled="isDisabledFilter"
              :list-filters="optionsProductListFilter"
              @on-change-filter="handleChangeFilterForm"
              :current-filter="formFilter"
            />
          </div>
          <FormButtonHandleForm @on-reset="handleResetFilter" />
        </div>
      </div>
      <div class="wf-table-wrapper" data-rows="50">
        <ProductTableDataDeliveryList
          ref="refTable"
          :data="items"
          :loading="isLoading"
          :total-element="totalItems"
          @page-change="onPageChange"
          @row-checked-change="onRowSelected"
          @select-all-change="onSelectAllChange"
          @on-stop-all-sell="handleClickStopSell"
          @download-file="handleDownloadFileClick"
          @show-info-seller="handleShowInfoSeller"
          @stop-seller-by-id="handleStopOnlySeller"
          :data-header-table-modal="ProductDataHeaderTableModel"
          :link-edit="PRODUCT_DELIVERY_PRODUCT_EDIT"
          :link-register="PRODUCT_DELIVERY_REGISTRATION"
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
  name: 'ProductDeliveryProductListPage'
}
</script>
