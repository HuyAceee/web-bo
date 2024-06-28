<!-- BO_O0301_010101 -->
<script lang="ts" setup>
import { WelfareInputText } from '@/components'
import CompanyCustomerListDataTable from '@/components/company/CompanyCustomerListDataTable.vue'
import FormButtonHandleForm from '@/components/widgets/form/FormButtonHandleForm.vue'
import FormGroup from '@/components/widgets/form/FormGroup.vue'
import FormGroupTimeLinesWithOutSelectFilterForm from '@/components/widgets/form/FormGroupTimeLinesWithOutSelectFilterForm.vue'
import ProductGroupControlFilterForm from '@/components/products/deliveryProduct/formFilterList/ProductGroupControlFilterForm.vue'
import { useCompanyAdministratorAccessHistory } from '@/composables/company/coManagerMonitoring/useCompanyAdministratorAccessHistory'
import { ProductSearchType } from '@/models'
import ProductSearchModalWithTableWrapper from '@/components/products/common/ProductSearchModalWithTableWrapper.vue'

const {
  values,
  setFieldValue,
  handleChangeCountDate,
  currentFilterDate,
  optionsListFilter,
  listSelectDate,
  handleResetFormFilter,
  handleSubmitFormFilter,
  items,
  isLoading,
  onPageChange,
  onRowSelected,
  onSelectAllChange,
  totalItems,
  isListCheckedEmpty,
  refTable,
  onDownload,
  listTextInput,
  isDisabledFilter,
  searchType,
  handleChangeFilterForm,
  promptUpdateAdministratorAccessHistoryStatus,
  customerSearchWrapper
} = useCompanyAdministratorAccessHistory()
</script>

// TODO: Temp template, change when task on plan
<template>
  <div class="wf-container-box">
    <div class="wf-approval-body">
      <div class="wf-approval-border">
        <div class="wf-form-filter">
          <div id="wf-group-filer" class="wf-group-filter">
            <form id="wf_approval-group-filter" class="wf_flex wf_flex-col wf-mt-0">
              <div class="wf_flex wf_items-center">
                <FormGroup
                  class="wf_flex-1"
                  :class="input.class"
                  v-for="(input, index) in listTextInput"
                  :key="index"
                  :is-border-left="index !== 0"
                  :label="input.label"
                >
                  <WelfareInputText
                    class="wf_max-w-212 wf_w-180"
                    :disabled="isDisabledFilter"
                    :placeholder="input.placeholder"
                    :model-value="values[input.field]"
                    @update:model-value="(value) => setFieldValue(input.field, value)"
                    size="small"
                  />
                </FormGroup>
                <FormGroup :hide-label="true" label="" class="wf_flex-2"></FormGroup>
              </div>
              <div class="wf_flex wf_items-center">
                <FormGroup
                  class="wf_flex-1"
                  :class="input.class"
                  v-for="(input, index) in listTextInput"
                  :key="index"
                  :is-border-left="index !== 0"
                  :label="input.label"
                >
                  <WelfareInputText
                    class="wf_max-w-212 wf_w-180"
                    :disabled="isDisabledFilter"
                    :placeholder="input.placeholder"
                    :model-value="values[input.field]"
                    @update:model-value="(value) => setFieldValue(input.field, value)"
                    size="small"
                  />
                </FormGroup>
              </div>
              <div class="wf_flex wf_items-center">
                <FormGroup class="wf_flex-1" label="고객사">
                  <ProductSearchModalWithTableWrapper
                    ref="customerSearchWrapper"
                    :type="ProductSearchType.CUSTOMER"
                    :reverse-search-text="true"
                    @select-value="
                      (value) => {
                        setFieldValue('customerKey', value.code)
                      }
                    "
                    placeholder-input="전체"
                    label-button="검색"
                    :is-disabled-on-empty-search-text="true"
                  />
                </FormGroup>
                <FormGroup
                  class="wf_flex-1"
                  :class="input.class"
                  v-for="(input, index) in listTextInput"
                  :key="index"
                  :is-border-left="true"
                  :label="input.label"
                >
                  <WelfareInputText
                    class="wf_max-w-212 wf_w-180"
                    :disabled="isDisabledFilter"
                    :placeholder="input.placeholder"
                    :model-value="values[input.field]"
                    @update:model-value="(value) => setFieldValue(input.field, value)"
                    size="small"
                  />
                </FormGroup>
                <FormGroup :hide-label="true" label="" class="wf_flex-1"></FormGroup>
              </div>
              <FormGroupTimeLinesWithOutSelectFilterForm
                :disabled="isDisabledFilter"
                :is-border-bottom="true"
                :is-rounded-bottom="true"
                label="등록일"
                :current-active-date="currentFilterDate"
                @on-change-filter-date="handleChangeCountDate"
                :from-date="values.fromDate"
                :to-date="values.toDate"
                @on-change-date-from="(value) => setFieldValue('fromDate', value)"
                @on-change-date-to="(value) => setFieldValue('toDate', value)"
                :current-type-date-product-select="values.dateSelect"
                :options-product-type-date="listSelectDate.options"
              />
              <ProductGroupControlFilterForm
                :disabled="isDisabledFilter"
                :list-filters="optionsListFilter"
                @on-change-filter="handleChangeFilterForm"
                :current-filter="searchType"
                fieldInput="searchWord"
                :searchWordModel="values.searchWord"
                placeholder="최대 50개까지 입력 가능합니다. (,로 구분)"
                @onchange-text="(field, val) => setFieldValue(field, val)"
              />
            </form>
          </div>
          <FormButtonHandleForm @on-reset="handleResetFormFilter()" @on-submit="handleSubmitFormFilter()" />
        </div>
      </div>
      <CompanyCustomerListDataTable
        ref="refTable"
        :data="items"
        @row-checked-change="onRowSelected"
        @select-all-change="onSelectAllChange"
        :total-element="totalItems"
        @page-change="onPageChange"
        :loading="isLoading"
        :isListCheckedEmpty="isListCheckedEmpty"
        @downloadFile="onDownload"
        @change-status="promptUpdateAdministratorAccessHistoryStatus"
      />
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/company/coManagerMonitoring/company-administrator-access-history.css');
</style>

<script lang="ts">
export default {
  name: 'CompanyAdministratorAccessHistoryPage'
}
</script>
