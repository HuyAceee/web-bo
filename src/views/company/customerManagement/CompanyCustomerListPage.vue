<!-- BO_O0101_010101 -->
<script lang="ts" setup>
import { WelfareCheckbox, WelfareInputText, WelfareRadio } from '@/components'
import CompanyCustomerListDataTable from '@/components/company/CompanyCustomerListDataTable.vue'
import ProductGroupControlFilterForm from '@/components/products/deliveryProduct/formFilterList/ProductGroupControlFilterForm.vue'
import FormButtonHandleForm from '@/components/widgets/form/FormButtonHandleForm.vue'
import FormGroup from '@/components/widgets/form/FormGroup.vue'
import FormGroupTimeLinesWithOutSelectFilterForm from '@/components/widgets/form/FormGroupTimeLinesWithOutSelectFilterForm.vue'
// import { useModal } from '@/composables'
import { useCompanyCustomerList } from '@/composables/company/customerManagement/useCompanyCustomerList'
// import CompanyReviewContractModal from '../modal/CompanyReviewContractModal.vue'

const {
  values,
  setFieldValue,
  handleChangeCountDate,
  currentFilterDate,
  listCheckboxContractStatus,
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
  getIsCheckBox,
  handleCheckBoxChange,
  listRadioCustomerStatus,
  listTextInput,
  isDisabledFilter,
  searchType,
  handleChangeFilterForm,
  promptUpdateCompanyCustomerStatus
} = useCompanyCustomerList()

// const { showModal, closeModalByPop } = useModal()

// const handleShowModal = () => {
//   showModal?.({
//     component: CompanyReviewContractModal,
//     props: {
//       data: {
//         contractKey: 60,
//         customerKey: 1,
//         contractStartDate: '2023-11-01T00:00:00',
//         contractEndDate: '2023-11-03T23:59:59',
//         contractStatus: '03',
//         settlementDate: '07',
//         contractRegDate: '2023-10-01',
//         contractFileOriginName: '03.part_Member(MB)_물리_ERD_v1.05_최종_231205.pdf',
//         contractFileSize: 173148,
//         contractFileDownloadLink: '/member/bo/customer-companies/files/contract/860aede4-e0ec-4a6f-9e60-f52288f5e488?attachmentType=03'
//       }
//     },
//     events: {
//       close: closeModalByPop
//     }
//   })
// }
</script>

<template>
  <div class="wf-container-box">
    <div class="wf-approval-body">
      <div class="wf-approval-border">
        <div class="wf-form-filter">
          <div id="wf-group-filer" class="wf-group-filter">
            <form id="wf_approval-group-filter" class="wf_flex wf_flex-col wf-mt-0">
              <div class="wf_flex wf_items-center">
                <FormGroup class="wf_flex-1" :label="listCheckboxContractStatus.title" :is-rounded-top="true">
                  <div class="wf-approval-body-filter-group-checkbox wf-space-x-20 wf_flex">
                    <div v-for="(_item, _index) in listCheckboxContractStatus.list" :key="_index">
                      <WelfareCheckbox
                        :disabled="isDisabledFilter"
                        :model-value="getIsCheckBox(listCheckboxContractStatus.field, _item.id)"
                        @update:model-value="(value) => handleCheckBoxChange(listCheckboxContractStatus.field, value, _item.id)"
                        size="sm"
                        :label="_item.label"
                      />
                    </div>
                  </div>
                </FormGroup>
                <FormGroup is-border-left class="wf_flex-1" customClass="wf-space-x-20" :label="listRadioCustomerStatus.label">
                  <WelfareRadio
                    v-for="(_item, index) in listRadioCustomerStatus.options"
                    :disabled="isDisabledFilter"
                    :key="index"
                    :model-value="values[listRadioCustomerStatus.field]"
                    :value="_item.value"
                    :label="_item.label"
                    name="requestClassification"
                    @update:model-value="(value) => setFieldValue(listRadioCustomerStatus.field, value)"
                    size="sm"
                  />
                </FormGroup>
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
                <FormGroup :hide-label="true" label="" class="wf_flex-2"></FormGroup>
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
          <FormButtonHandleForm @on-reset="handleResetFormFilter()" @on-submit="handleSubmitFormFilter" />
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
        @download-file="onDownload"
        @change-status="promptUpdateCompanyCustomerStatus"
      />
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/company/customerManagement/company-customer-list.css');
</style>

<script lang="ts">
export default {
  name: 'CompanyCustomerListPage'
}
</script>
