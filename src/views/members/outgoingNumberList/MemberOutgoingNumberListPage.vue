<!-- BO_B0305_010101 -->

<script setup lang="ts">
import { formatNumberDot } from '@/common'
import { DEFAULT_DATE_FORMAT_DOT } from '@/common/constant'
import { DataTablePaginationWithCheckbox, WelfareBigButton, WelfareDateTimePicker, WelfareInputText, WelfareMdButton } from '@/components/uikit'
import FormGroup from '@/components/widgets/form/FormGroup.vue'
import { useMemberOutgoingNumberList } from '@/composables/members/outgoingNumberList/useMemberOutgoingNumberList'
import { memberOutgoingNumberHeaderTableConfig } from '@/models/views/members/outgoingNumberList/MemberOutgoingNumberListModel'
import Column from 'primevue/column'

const {
  values,
  setFieldValue,
  handleResetFormFilter,
  items,
  isLoading,
  onPageChange,
  onRowSelected,
  onSelectAllChange,
  totalItems,
  refTable,
  memberOutgoingNumberListButtonDateConfig
} = useMemberOutgoingNumberList()
</script>

<template>
  <div class="wf-body-wrap-content">
    <form class="wf-space-y-30 wf_flex wf_flex-col wf-mt-0 wf-px-30 wf-pb-28 wf-mx--30 wf-btn-border-b--ncc">
      <div class="wf-btn-border--bg-color-line-gray wf_br-6">
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1" is-rounded-top label="발신 번호">
            <WelfareInputText
              :model-value="values.callingNumber"
              @update:model-value="(value) => setFieldValue('callingNumber', value)"
              class="wf_w-180"
              placeholder="“-” 없이 숫자만 입력"
              size="small"
            />
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1" :isBorderBottom="false" isRoundedBottom label="기간">
            <div class="wf_flex wf-space-x-6">
              <div class="wf_flex wf_items-center wf-space-x-4">
                <WelfareDateTimePicker :format="DEFAULT_DATE_FORMAT_DOT" :type="'date'" size="small" />
                <span class="wf-date_picker-double-text wf_text-n-33">~</span>
                <WelfareDateTimePicker :format="DEFAULT_DATE_FORMAT_DOT" :type="'date'" size="small" />
              </div>
              <div class="wf_flex wf_items-center wf-space-x-4 wf-approval-group-btn">
                <WelfareMdButton
                  v-for="(item, index) in memberOutgoingNumberListButtonDateConfig"
                  :key="index"
                  :label="item.label"
                  class="wf_w-55"
                  buttonType="neutral"
                  :class="{ active: index === item.value }"
                  buttonSize="small"
                />
              </div>
            </div>
          </FormGroup>
        </div>
      </div>

      <div class="wf_flex wf_justify-center wf_items-center wf-space-x-20">
        <WelfareBigButton label="초기화" buttonType="neatral" class="wf_button--ml" @on-click="handleResetFormFilter" />
        <WelfareBigButton label="조회" buttonType="default" />
      </div>
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
            <WelfareMdButton label="신규 추가" class="wf_w-72" buttonType="liner" />
            <WelfareMdButton label="선택 삭제" class="wf_w-72" buttonType="liner" />
            <WelfareMdButton label="엑셀다운로드" class="wf_w-93" buttonType="liner" />
          </div>
        </template>
        <template #columns>
          <Column
            v-for="(item, index) in memberOutgoingNumberHeaderTableConfig"
            :key="index"
            :field="item.field"
            :column-key="item.field"
            :header="item.header"
            :class="item.class"
          >
            <template #body="slotProps">
              <span>{{ slotProps.data[item.field] }}</span>
            </template>
          </Column>
          <Column key="button-action" columnKey="button-action" header="삭제" class="wf_m-w-126-not-important">
            <template #body>
              <WelfareMdButton label="삭제" buttonType="liner" buttonSize="small" />
            </template>
          </Column>
        </template>
      </DataTablePaginationWithCheckbox>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'MemberOutgoingNumberListPage'
}
</script>
