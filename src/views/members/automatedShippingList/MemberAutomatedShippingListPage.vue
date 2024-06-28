<!-- BO_B0302_010101 -->

<script setup lang="ts">
import { formatNumberDot } from '@/common'
import { DataTablePaginationWithCheckbox, WelfareInputText, WelfareMdButton, WelfareRadioGroup, WelfareSelect } from '@/components/uikit'
import FormGroup from '@/components/widgets/form/FormGroup.vue'
import Column from 'primevue/column'
import FormButtonHandleForm from '@/components/widgets/form/FormButtonHandleForm.vue'
import { useMemberAutomatedShippingList } from '@/composables/members/automatedShippingList/useMemberAutomatedShippingList'
import {
  memberListSelectDateOptionsConfig,
  memberOptionsIsUseConfig,
  memberOptionsShippingCategoryConfig
} from '@/models/services/responses/members/MemberAutomatedShippingListModel'
import {
  memberAutomatedShippingHeaderTableFirstConfig,
  memberAutomatedShippingHeaderTableSecondConfig,
  memberAutomatedShippingHeaderTableThirdConfig
} from '@/models/views/members/automatedShippingList/MemberAutomatedShippingListModel'
import FormGroupTimeLinesFilterForm from '@/components/widgets/form/FormGroupTimeLinesFilterForm.vue'

const {
  values,
  setFieldValue,
  handleResetFormFilter,
  currentFilterDate,
  handleChangeCountDate,
  items,
  isLoading,
  onPageChange,
  onRowSelected,
  onSelectAllChange,
  totalItems,
  refTable
} = useMemberAutomatedShippingList()
</script>

<template>
  <div class="wf-body-wrap-content">
    <form class="wf-space-y-30 wf_flex wf_flex-col wf-mt-0 wf-px-30 wf-pb-28 wf-mx--30 wf-btn-border-b--ncc">
      <div class="wf-btn-border--bg-color-line-gray wf_br-6">
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1 wf_flex-shrink-0" is-rounded-top label="발송 구분">
            <div class="wf-pb-1 wf-ml--2">
              <WelfareRadioGroup
                :model-value="values.shippingCategory"
                @update:model-value="(value) => setFieldValue('shippingCategory', value)"
                :options="memberOptionsShippingCategoryConfig"
                size="sm"
              />
            </div>
          </FormGroup>
          <FormGroup class="wf_flex-1 wf-pl-150" is-border-left label="발송 템플릿">
            <div class="wf-pb-1">
              <WelfareSelect
                :model-value="values.customer"
                @update:model-value="(value) => setFieldValue('customer', value)"
                class="wf_w-180"
                :placeholder="'선택'"
                optionLabel="label"
                :options="[]"
                small
              />
            </div>
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1" label="사용 여부">
            <div class="wf-pb-1 wf-ml--2">
              <WelfareRadioGroup
                :model-value="values.isUse"
                @update:model-value="(value) => setFieldValue('isUse', value)"
                :options="memberOptionsIsUseConfig"
                size="sm"
              />
            </div>
          </FormGroup>
        </div>
        <FormGroupTimeLinesFilterForm
          class=""
          customClass="wf-pb-1"
          :is-border-bottom="true"
          label="기간"
          :current-active-date="currentFilterDate"
          @on-change-filter-date="handleChangeCountDate"
          :from-date="values.fromDate"
          :to-date="values.toDate"
          @on-change-date-from="(value) => setFieldValue('fromDate', value)"
          @on-change-date-to="(value) => setFieldValue('toDate', value)"
          :current-type-date-product-select="values.dateSelect"
          @on-select-type="(value) => setFieldValue('dateSelect', value)"
          :options-product-type-date="memberListSelectDateOptionsConfig"
        />
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1" customClass="wf-pr-9" :isBorderBottom="false" isRoundedBottom label="검색어">
            <div class="wf_flex wf-space-x-6 wf_w-full wf-pb-1 wf-ml--2">
              <WelfareSelect
                :model-value="values.customer"
                @update:model-value="(value) => setFieldValue('customer', value)"
                class="wf_w-180"
                :placeholder="'템플릿 제목'"
                optionLabel="label"
                :options="[]"
                small
              />
              <div class="wf_flex-1">
                <WelfareInputText
                  :model-value="values.keyword"
                  @update:model-value="(value) => setFieldValue('keyword', value)"
                  class="wf_w-full"
                  placeholder="검색어 입력"
                  size="small"
                />
              </div>
            </div>
          </FormGroup>
        </div>
      </div>

      <FormButtonHandleForm @on-reset="handleResetFormFilter" />
    </form>

    <!-- DataTable -->
    <div class="wf-pt-30">
      <DataTablePaginationWithCheckbox
        ref="refTable"
        :value="items"
        :loading="isLoading"
        :total-records="totalItems"
        @page-change="onPageChange"
        @row-checked-change="onRowSelected"
        @select-all-change="onSelectAllChange"
      >
        <template #title>
          <h6 class="wf_text-n-33">조회 결과 &nbsp;총 {{ formatNumberDot(totalItems) }} 건</h6>
        </template>
        <template #buttons>
          <div class="wf-space-x-6 wf_flex">
            <WelfareMdButton label="등록" class="wf_w-45" buttonType="default" />
            <WelfareMdButton label="엑셀다운로드" class="wf_w-93" buttonType="liner" />
          </div>
        </template>
        <template #columns>
          <Column
            v-for="(item, index) in memberAutomatedShippingHeaderTableFirstConfig"
            :key="index"
            :column-key="item.field"
            :field="item.field"
            :header="item.header"
            :class="item.class"
          >
            <template #body="slotProps">
              <span>{{ slotProps.data[item.field] }}</span>
            </template>
          </Column>
          <Column key="shippingStatusSuccess" columnKey="shippingStatusSuccess" header="성공" class="wf_m-w-64" field="shippingStatusSuccess">
            <template #body="slotProps">
              <span>{{ slotProps.data.shippingStatusSuccess }}</span>
            </template>
          </Column>
          <Column key="shippingStatusFailure" columnKey="shippingStatusFailure" header="성공" class="wf_m-w-64" field="shippingStatusFailure">
            <template #body="slotProps">
              <span>{{ slotProps.data.shippingStatusFailure }}</span>
            </template>
          </Column>
          <Column
            v-for="item in memberAutomatedShippingHeaderTableSecondConfig"
            :column-key="item.field"
            :key="item.field"
            :field="item.field"
            :header="item.header"
            :class="item.class"
          >
            <template #body="slotProps">
              <span>{{ slotProps.data[item.field] }}</span>
            </template>
          </Column>
          <Column key="deliveryResult" columnKey="deliveryResult" header="발송결과" class="wf_m-w-120">
            <template #body>
              <WelfareMdButton label="보기" buttonType="liner" buttonSize="small" />
            </template>
          </Column>
          <Column
            v-for="item in memberAutomatedShippingHeaderTableThirdConfig"
            :key="item.field"
            :column-key="item.field"
            :field="item.field"
            :header="item.header"
            :class="item.class"
          >
            <template #body="slotProps">
              <span>{{ slotProps.data[item.field] }}</span>
            </template>
          </Column>
        </template>
      </DataTablePaginationWithCheckbox>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'MemberAutomatedShippingListPage'
}
</script>
