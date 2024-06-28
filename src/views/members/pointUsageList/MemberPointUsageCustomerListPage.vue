<!-- BO_B0203_020101 -->

<script setup lang="ts">
import { DataTableContainer, WelfareInputText, WelfareSelect } from '@/components/uikit'
import FormGroup from '@/components/widgets/form/FormGroup.vue'
import FormButtonHandleForm from '@/components/widgets/form/FormButtonHandleForm.vue'
import { useMemberPointUsageCustomerList } from '@/composables/members/pointUsageList/useMemberPointUsageCustomerList'
import MemberCustomerCompanyTotalTable from '@/components/members/pointUsageList/MemberCustomerCompanyTotalTable.vue'
import FormGroupTimeLinesFilterForm from '@/components/widgets/form/FormGroupTimeLinesFilterForm.vue'
import { memberPUCustomerListHeaderTableConfig } from '@/models/views/members/pointUsageList/MemberPointUsageCustomerListModel'
// import MemberPointUsageCustomerTable from '@/components/members/pointUsageList/MemberPointUsageCustomerTable.vue'
const {
  values,
  setFieldValue,
  handleResetFormFilter,
  currentFilterDate,
  handleChangeCountDate,
  memberPointUsageCustomerTotalPointOptions,
  memberPointUsageCustomerSearchOptions,
  items,
  isLoading,
  onPageChange,
  onRowSelected,
  onSelectAllChange,
  totalItems,
  refTable,
  handleSubmitForm,
  dataExport,
  sumItems,
  isDisable
} = useMemberPointUsageCustomerList()
</script>
<template>
  <div class="wf-body-wrap-content">
    <form class="wf-space-y-30 wf_flex wf_flex-col wf-mt-0 wf-px-30 wf-pb-28 wf-mx--30 wf-btn-border-b--ncc">
      <div class="wf-btn-border--bg-color-line-gray wf_br-6">
        <div class="wf_flex wf_items-center">
          <FormGroup is-rounded-top label="고객사" class="custom-form-group-pd">
            <div class="wf_flex wf_items-center wf-space-x-4">
              <WelfareInputText
                :model-value="`${values.customer}`"
                @update:model-value="(value) => setFieldValue('customer', value)"
                class="wf_w-full"
                placeholder="고객사 입력"
                size="small"
                input-type="number"
                :disabled="isDisable"
              />
            </div>
          </FormGroup>
          <FormGroup label="고객사 코드" is-border-left class="custom-form-group-pd">
            <WelfareInputText
              :model-value="`${values.customerCode}`"
              @update:model-value="(value) => setFieldValue('customerCode', value)"
              class="wf_w-full"
              placeholder="고객사 코드 입력"
              size="small"
              input-type="number"
              :disabled="isDisable"
            />
          </FormGroup>
          <FormGroup label="고객사 상태" is-border-left class="custom-form-group-pd">
            <WelfareSelect
              :model-value="values.customerStatus"
              @update:model-value="(value) => setFieldValue('customerStatus', value.value)"
              class="wf_w-180"
              :placeholder="'총 보유포인트'"
              optionLabel="label"
              :options="memberPointUsageCustomerTotalPointOptions"
              :disabled="isDisable"
              small
            />
          </FormGroup>
          <FormGroup label="계약 상태" is-border-left class="custom-form-group-pd">
            <WelfareSelect
              :model-value="values.contractStatus"
              @update:model-value="(value) => setFieldValue('contractStatus', value.value)"
              class="wf_w-180"
              :placeholder="'총 보유포인트'"
              optionLabel="label"
              :options="memberPointUsageCustomerTotalPointOptions"
              :disabled="isDisable"
              small
            />
          </FormGroup>
        </div>
        <FormGroupTimeLinesFilterForm
          label="고객사 등록일"
          class=""
          customClass="wf-pb-1 wf-custom-filter-date"
          :is-border-bottom="true"
          :is-rounded-bottom="false"
          :current-active-date="currentFilterDate"
          @on-change-filter-date="handleChangeCountDate"
          :from-date="values.fromDate"
          :to-date="values.toDate"
          @on-change-date-from="(value) => setFieldValue('fromDate', value)"
          @on-change-date-to="(value) => setFieldValue('toDate', value)"
          :disabled-select-option="true"
          :hidden-select-option="true"
          :disabled="isDisable"
        />
        <div class="wf_flex wf_items-center wf_w-full">
          <FormGroup class="wf_flex-1 wf_w-full" is-rounded-bottom :is-border-bottom="false" label="검색어">
            <div class="wf_flex wf_items-center wf-space-x-4 wf_w-full">
              <WelfareSelect
                :model-value="values.searchType"
                @update:model-value="(value) => setFieldValue('searchType', value.value)"
                class="wf_w-180"
                :placeholder="'회원 보유 복지포인트'"
                optionLabel="label"
                :options="memberPointUsageCustomerSearchOptions"
                small
              />
              <WelfareInputText
                :model-value="values.keyword"
                @update:model-value="(value) => setFieldValue('keyword', value)"
                class="wf_w-full"
                placeholder="검색어 입력"
                size="small"
                :disabled="!isDisable"
                :max-length="50"
              />
            </div>
          </FormGroup>
        </div>
      </div>

      <FormButtonHandleForm @on-reset="handleResetFormFilter" @on-submit="handleSubmitForm" />
    </form>

    <!-- DataTable -->
    <div class="wf-pt-30 wf-w-full wf_flex wf_flex-col wf-space-y-2">
      <MemberCustomerCompanyTotalTable :items="sumItems" :data-download="dataExport" />
      <DataTableContainer
        class="wf-member-point-usage-list"
        ref="refTable"
        :value="items"
        :loading="isLoading"
        :total-records="totalItems"
        @page-change="onPageChange"
        @row-checked-change="onRowSelected"
        @select-all-change="onSelectAllChange"
        :column-configs="memberPUCustomerListHeaderTableConfig"
      >
        <template #title>
          <h6 class="wf_text-n-33">조회 결과 &nbsp;(총 {{ totalItems ?? 0 }} 건)</h6>
        </template>
      </DataTableContainer>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/member/member-point-usage-list.css');
</style>

<script lang="ts">
export default {
  name: 'MemberPointUsageCustomerListPage'
}
</script>
