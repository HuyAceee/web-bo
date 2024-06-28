<!-- BO_B0203_010101 -->

<script setup lang="ts">
import ProductSearchModalWithTableWrapper from '@/components/products/common/ProductSearchModalWithTableWrapper.vue'
import { WelfareDateTimePicker, WelfareInputText, WelfareMdButton, WelfareSelect } from '@/components/uikit'
import FormGroup from '@/components/widgets/form/FormGroup.vue'
import { ProductDataFieldFormApprovalProductListConfig, ProductSearchType } from '@/models'
import FormButtonHandleForm from '@/components/widgets/form/FormButtonHandleForm.vue'
import { useMemberPointUsageList } from '@/composables/members/pointUsageList/useMemberPointUsageList'
import MemberCustomerInfoTable from '@/components/members/pointUsageList/MemberCustomerInfoTable.vue'
import MemberPointUsageListTable from '@/components/members/pointUsageList/MemberPointUsageListTable.vue'
import { DEFAULT_DATE_FORMAT_DOT } from '@/common'
import ProductGroupControlFilterForm from '@/components/products/deliveryProduct/formFilterList/ProductGroupControlFilterForm.vue'
import {
  memberAccountStatusOptions,
  memberEmploymentStatusOptions,
  memberWelfareKeywordSearchTypeOptions
} from '@/models/views/members/pointUsageList/MemberPointUsageListModel'

const {
  activeDetailedSearch,
  values,
  setFieldValue,
  handleResetForm,
  currentFilterDate,
  handleChangeCountDate,
  items,
  isLoading,
  onPageChange,
  onRowSelected,
  onSelectAllChange,
  totalItems,
  refTable,
  onShowMemberWelfarePointUsageDetailsModal,
  handlesSubmitForm,
  searchCompanyCoderRef,
  customerInformationData,
  onDownLoadExcel,
  handleChangeFilterForm,
  loadingCustomerInfo
} = useMemberPointUsageList()
</script>

<template>
  <div class="wf-body-wrap-content">
    <form class="wf-space-y-30 wf_flex wf_flex-col wf-mt-0 wf-px-30 wf-pb-28 wf-mx--30 wf-btn-border-b--ncc">
      <div class="wf-btn-border--bg-color-line-gray wf_br-6">
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1" is-rounded-top label="고객사(고객사 코드)" required>
            <ProductSearchModalWithTableWrapper
              ref="searchCompanyCoderRef"
              @selectValue="
                (value) => {
                  setFieldValue('customerKey', value?.code)
                }
              "
              :disabled="!activeDetailedSearch"
              class="wf-product-base-info-search"
              :type="ProductSearchType.CUSTOMER"
              placeholder-input="고객사 조회"
              label-button="조회"
              :reverse-search-text="true"
            />
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1" custom-class="wf-pl-9 wf-pr-10" label="회원명">
            <WelfareInputText
              :model-value="values.memberName"
              @update:model-value="(value) => setFieldValue('memberName', value)"
              class="wf_w-180"
              :disabled="!activeDetailedSearch"
              placeholder="회원명 입력"
              size="small"
            />
          </FormGroup>
          <FormGroup label="회원코드" class="wf-w-121" custom-class="wf-pl-9 wf-pr-10" is-border-left>
            <WelfareInputText
              :model-value="values.memberKey"
              @update:model-value="(value) => setFieldValue('memberKey', value)"
              :disabled="!activeDetailedSearch"
              class="wf_w-180"
              placeholder="회원코드 입력"
              size="small"
              inputType="number"
            />
          </FormGroup>
          <FormGroup label="재직상태" class="wf-w-121" custom-class="wf-pl-9 wf-pr-10" is-border-left>
            <WelfareSelect
              :model-value="values.employmentStatus"
              @update:model-value="(value) => setFieldValue('employmentStatus', value)"
              :disabled="!activeDetailedSearch"
              class="wf_w-180"
              option-label="label"
              option-value="value"
              :options="memberEmploymentStatusOptions"
              placeholder="전체"
              small
            />
          </FormGroup>
          <FormGroup label="계정상태" class="wf-w-121" custom-class="wf-pl-9 wf-pr-10" is-border-left>
            <WelfareSelect
              :model-value="values.accountStatus"
              @update:model-value="(value) => setFieldValue('accountStatus', value)"
              :disabled="!activeDetailedSearch"
              :options="memberAccountStatusOptions"
              option-label="label"
              option-value="value"
              class="wf_w-180"
              placeholder="전체"
              small
            />
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup label="회원등록일" custom-class="wf-pl-11">
            <div class="wf_flex wf_items-center wf-space-x-4 wf-py-6">
              <WelfareDateTimePicker
                :model-value="values.fromDate"
                @update:model-value="(value) => setFieldValue('fromDate', value)"
                :format="DEFAULT_DATE_FORMAT_DOT"
                :disabled="!activeDetailedSearch"
                :type="'date'"
                size="small"
              />
              <span class="wf-pl-2 wf-pr-1 wf_text-n-33">~</span>
              <WelfareDateTimePicker
                :model-value="values.toDate"
                @update:model-value="(value) => setFieldValue('toDate', value)"
                :format="DEFAULT_DATE_FORMAT_DOT"
                :disabled="!activeDetailedSearch"
                :type="'date'"
                size="small"
              />
            </div>
            <div class="wf_flex wf_items-center wf-space-x-4 wf-ml-6">
              <WelfareMdButton
                v-for="(item, index) in ProductDataFieldFormApprovalProductListConfig.listButtonDateFilter"
                :key="index"
                :label="item.label"
                :disabled="!activeDetailedSearch"
                class="wf_w-55"
                buttonType="neutral"
                buttonSize="small"
                :class="{ active: currentFilterDate === item.value }"
                @click="handleChangeCountDate(item.value)"
              />
            </div>
          </FormGroup>
        </div>
        <ProductGroupControlFilterForm
          :disabled="!activeDetailedSearch"
          :list-filters="memberWelfareKeywordSearchTypeOptions"
          :current-filter="values.searchType"
          @on-change-filter="handleChangeFilterForm"
          field-input="searchTerm"
          :search-word-model="values.searchTerm"
          @onchange-text="(field: string, val: string) => setFieldValue(field, val)"
          placeholder="최대 50개까지 입력 가능합니다. (,로 구분)"
        />
      </div>
      <FormButtonHandleForm @on-reset="handleResetForm" @on-submit="handlesSubmitForm" />
    </form>

    <!-- DataTable -->
    <div class="wf-pt-30 wf-w-full wf_flex wf_flex-col">
      <MemberCustomerInfoTable :items="customerInformationData" @on-download-excel="onDownLoadExcel" :loading="loadingCustomerInfo"/>
      <MemberPointUsageListTable
        class="wf-mt-4"
        ref="refTable"
        :value="items"
        :loading="isLoading"
        :total-records="totalItems"
        @page-change="onPageChange"
        @row-checked-change="onRowSelected"
        @select-all-change="onSelectAllChange"
        @show-modal-detail="onShowMemberWelfarePointUsageDetailsModal"
      />
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/member/member-point-usage-list.css');
</style>

<script lang="ts">
export default {
  name: 'MemberPointUsageListPage'
}
</script>
