<script setup lang="ts">
import { formatNumberDot } from '@/common'
import {
  CommonTable,
  CommonTableContentCell,
  CommonTableRow,
  CommonTableTitleCell,
  DataTableContainer,
  WelfareInputText,
  WelfareMdButton,
  WelfareSelect
} from '@/components'
import ProductBorderBottomTitle from '@/components/products/deliveryProduct/registerAndEdit/ProductBorderBottomTitle.vue'
import FormGroupSelectInput from '@/components/widgets/form/FormGroupSelectInput.vue'
import { useMemberPointAdjustmentTable } from '@/composables/members/welfarePointAllocation/useMemberPointAdjustmentTable'
import {
  MemberPointAdjustmentProps,
  MemberPointAdjustmentTableUpdateConfig
} from '@/models/views/members/memberWelfarePoint/MemberWelfarePointAdjustmentModel'

const props = defineProps<MemberPointAdjustmentProps>()
defineExpose({
  getResultData: () => getResultData(),
  reset: () => handleReset()
})

const {
  searchTypeOptions,
  insertTypeOptions,
  insertAllTypeOptions,
  query,
  onChangeQuery,
  disableQueryInsert,
  tableRef,
  page,
  values,
  setFieldValue,
  items,
  totalItems,
  isLoading,
  onPageChange,
  handleInsert,
  handleReset,
  onReset,
  onExport,
  getPoint,
  getResultData,
  onKeyPressNumber,
  acceptMaxKeyWordsQuery
} = useMemberPointAdjustmentTable(props)
</script>

<template>
  <ProductBorderBottomTitle class="wf-mb-20 wf-pb-10">배정 대상 회원</ProductBorderBottomTitle>
  <CommonTable>
    <CommonTableRow height="42" is-last-row>
      <CommonTableTitleCell title="검색어" is-first-col />
      <CommonTableContentCell>
        <FormGroupSelectInput
          class="wf_w-full"
          :select-options="searchTypeOptions"
          option-label="label"
          option-value="value"
          input-placeholder="쉼표(,)구분하여 검색어 입력"
          :select="query.type"
          :input="query.query"
          @keypress="acceptMaxKeyWordsQuery"
          @update:input="(value) => onChangeQuery('query', value)"
          @update:select="(value) => onChangeQuery('type', value)"
        />
      </CommonTableContentCell>
    </CommonTableRow>
  </CommonTable>

  <div class="wf-mt-14">
    <DataTableContainer
      :value="items"
      @page-change="onPageChange"
      :total-records="totalItems"
      :loading="isLoading"
      :column-configs="MemberPointAdjustmentTableUpdateConfig"
      ref="tableRef"
    >
      <template #title>
        <h6 class="wf_text-n-33">조회 결과 &nbsp;총 {{ totalItems }} 건</h6>
      </template>
      <template #body-inputPoint="{ props }">
        <FormGroupSelectInput
          class="wf_w-full"
          select-class="wf_w-100"
          :select-options="insertTypeOptions"
          option-label="label"
          option-value="value"
          select-placeholder="선택"
          input-placeholder="숫자만 입력"
          :select="values?.formData[props?.index + page.page * page.rows]?.type"
          :input="values?.formData[props?.index + page.page * page.rows]?.point"
          @keypress="onKeyPressNumber"
          @update:select="(value) => setFieldValue(`formData.${props?.index + page.page * page.rows}.type`, value)"
          @update:input="(value) => setFieldValue(`formData.${props?.index + page.page * page.rows}.point`, value)"
        />
      </template>
      <template #body-pointAfter="{ props }">
        <span>{{
          formatNumberDot(
            Number(props.data?.pointAmount) +
              Number(
                getPoint(
                  values?.formData?.[page.page * page.rows + props.index]?.type,
                  values?.formData?.[page.page * page.rows + props.index]?.point
                )
              )
          )
        }}</span>
      </template>
      <template #body-pointAmount="{ props }">
        <span>{{ formatNumberDot(props.data?.pointAmount) ?? 0 }}</span>
      </template>
      <template #body-inputNote="{ props }">
        <WelfareInputText
          size="small"
          class="wf_flex wf-width-full wf-ml-6"
          placeholder="메모 입력"
          :model-value="values?.formData[props?.index + page.page * page.rows]?.note"
          @update:model-value="(value) => setFieldValue(`formData.${props?.index + page.page * page.rows}.note`, value)"
        />
      </template>
      <template #buttons>
        <div class="wf-space-x-6 wf_flex wf_justify-center wf_items-center">
          <WelfareSelect
            class="wf_w-180"
            optionLabel="label"
            option-value="value"
            placeholder="일괄 조정 선택"
            :options="insertAllTypeOptions"
            :model-value="query.insertType"
            @update:model-value="(value) => onChangeQuery('insertType', value)"
          />
          <WelfareInputText
            class="wf_w-180 wf--h-input-40"
            :disabled="disableQueryInsert"
            text-align="right"
            placeholder="숫자만 입력"
            :model-value="query.insertValue"
            @keypress.enter="handleInsert"
            @keypress="onKeyPressNumber"
            @update:model-value="(value) => onChangeQuery('insertValue', value)"
          />
          <WelfareMdButton @on-click="onReset" label="초기화" class="wf_w-57" buttonType="liner" />
          <WelfareMdButton @on-click="onExport" label="엑셀 다운로드" class="wf_w-96" buttonType="liner" />
        </div>
      </template>
    </DataTableContainer>
  </div>
</template>
