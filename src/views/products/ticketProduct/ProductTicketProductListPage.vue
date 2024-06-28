<!-- BO_C0201_010101 -->

<script setup lang="ts">
import { WelfareSelect } from '@/components'
import FormGroup from '@/components/widgets/form/FormGroup.vue'
import FormButtonHandleForm from '@/components/widgets/form/FormButtonHandleForm.vue'
import { ProductDataHeaderTicketProductTableModalConfig, ProductSearchType } from '@/models'
import ProductGroupCheckBoxForm from '@/components/products/deliveryProduct/formFilterList/ProductGroupCheckBoxForm.vue'
import ProductSearchModalWrapper from '@/components/products/common/ProductSearchModalWrapper.vue'
import ProductSearchModalWithTableWrapper from '@/components/products/common/ProductSearchModalWithTableWrapper.vue'
import { PRODUCT_TICKET_PRODUCT_EDIT, PRODUCT_TICKET_REGISTRATION } from '@/common'
import { useProductTicketList } from '@/composables/products/ticketProduct/useProductTicketList'
import ProductTableDataDeliveryList from '@/components/products/deliveryProduct/deliveryListTable/ProductTableDataDeliveryList.vue'
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
  listFormSelectProduct,
  listInputFindProduct,
  values,
  isDisabledFilter,
  optionsProductListFilter,
  formFilter,
  optionProductDate,
  handleResetFilter,
  handleChangeCountDate,
  listCheckBoxExternalIntegration,
  onPageChange,
  onRowSelected,
  onSelectAllChange,
  isLoading,
  items,
  totalItems,
  handleClickStopSell,
  handleStopOnlySeller,
  handleDownloadFileClick,
  handleShowInfoSeller,
  refTable,
  mdSearch,
  setFieldValue,
  refreshData,
  selectOptionCategoryDepth1,
  selectOptionCategoryDepth2,
  selectOptionCategoryDepth3,
  sellerCompanies,
  searchSellerRef,
  handleOpenPopupSearchSeller
} = useProductTicketList()
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
                    :placeholder="_item.placeholder"
                    optionLabel="label"
                    :options="_item.options"
                    small
                  />
                </div>
                <WelfareSelect
                  :disabled="isDisabledFilter"
                  :modelValue="values.primaryClassificationSelect"
                  @update:modelValue="(item) => handleChangeValueSelect('primaryClassificationSelect', item.value)"
                  class="wf_w-180"
                  placeholder="1차 분류"
                  optionLabel="label"
                  :options="selectOptionCategoryDepth1"
                  small
                />
                <WelfareSelect
                  :disabled="isDisabledFilter"
                  :modelValue="values.primaryClassificationSelect"
                  @update:modelValue="(item) => handleChangeValueSelect('secondaryClassificationSelect', item)"
                  class="wf_w-180"
                  placeholder="2차 분류"
                  optionLabel="label"
                  :options="selectOptionCategoryDepth2"
                  small
                />
                <WelfareSelect
                  :disabled="isDisabledFilter"
                  :modelValue="values.primaryClassificationSelect"
                  @update:modelValue="(item) => handleChangeValueSelect('tertiaryClassificationSelect', item.value)"
                  class="wf_w-180"
                  placeholder="3차 분류"
                  optionLabel="label"
                  :options="selectOptionCategoryDepth3"
                  small
                />
              </FormGroup>
              <div class="wf_flex wf_items-center">
                <FormGroup class="wf_flex-1" label="판매사">
                  <ProductSearchModalWithTableWrapper
                    ref="searchSellerRef"
                    @selectValue="
                      (value: any) => {
                        setFieldValue('sellerKey', value.code)
                      }
                    "
                    class="wf-product-base-info-search-label"
                    :type="ProductSearchType.SELLER"
                    placeholder-input="전체"
                    label-button="조회"
                    :disabled="isDisabledFilter"
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
                <div class="wf_flex-1">
                  <FormGroup customClass="wf_flex wf-space-x-4 wf_items-center" :label="listInputFindProduct[1].title" is-border-left>
                    <ProductSearchModalWrapper
                      class="wf_w-228"
                      v-if="listInputFindProduct[1].type"
                      :type="listInputFindProduct[1].type"
                      :label-button="listInputFindProduct[1].labelButton"
                      :disabled="isDisabledFilter"
                      @select-value="(value) => handleChangeValueSelect('findMdInput', value)"
                      ref="mdSearch"
                    />
                  </FormGroup>
                </div>
              </div>
              <div class="wf_flex-1">
                <ProductGroupCheckBoxForm
                  :list-group-check-box="[listCheckBoxExternalIntegration]"
                  :get-is-check-box="getIsCheckBox"
                  :change-check-box="handleCheckBoxChange"
                  :disabled="isDisabledFilter"
                />
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
              :search-word-model="values.searchWord"
              field-input="searchWord"
              @onchange-text="setFieldValue"
            />
          </div>
          <FormButtonHandleForm @on-reset="handleResetFilter" @on-submit="refreshData" />
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
          :data-header-table-modal="ProductDataHeaderTicketProductTableModalConfig"
          :link-edit="PRODUCT_TICKET_PRODUCT_EDIT"
          :link-register="PRODUCT_TICKET_REGISTRATION"
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
  name: 'ProductTicketProductListPage'
}
</script>
