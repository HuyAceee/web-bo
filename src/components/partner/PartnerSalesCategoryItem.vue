<script setup lang="ts">
import { PartnerSalesCategoryItemFieldType, PartnerSalesCategoryItemModel } from '@/models/views/partner/PartnerListModel'
import { WelfareInputText, WelfareMdButton, WelfareRadio } from '../uikit'
import WelfareSelect from '../uikit/select/WelfareSelect.vue'
import { usePartnerSalesCategory } from '@/composables/partner/usePartnerSalesCategory'
import TextInputWithMaxLengthCharacters from '../widgets/textInput/TextInputWithMaxLengthCharacters.vue'

interface PartnerSalesCategoryItemProps {
  listSalesCategory: PartnerSalesCategoryItemModel[]
}

export type PartnerSalesCategoryItemEmits = (e: 'on-change', value: PartnerSalesCategoryItemModel[]) => void

const props = defineProps<PartnerSalesCategoryItemProps>()
const emit = defineEmits<PartnerSalesCategoryItemEmits>()

const { listSalesCategory, salesCategoryOptions, isEmptyLastSalesCategory, handleDeleteSalesCategory, handleAddNewSalesCategory, handleChange, setListValue } =
  usePartnerSalesCategory(props, emit)

defineExpose({
  setListValue
})
</script>

<template>
  <div class="wf_flex wf_flex-col wf_w-full wf-mr--12 wf-ml--12 wf-mt--7 wf-mb--6">
    <div
      class="wf_flex wf_items-center wf-space-x-20 wf-px-12 wf-pt-6 wf-pb-6"
      :class="[{ 'wf_br-b': index != listSalesCategory.length - 1 }]"
      v-for="(item, index) in listSalesCategory"
      :key="index + item.id"
    >
      <div class="wf_flex wf_items-center wf-space-x-20">
        <WelfareRadio
          :model-value="item.representative"
          :value="true"
          :label="'대표'"
          name="category-representative"
          size="sm"
          @update:modelValue="(value) => handleChange(index, PartnerSalesCategoryItemFieldType.representative, value)"
        />
        <WelfareSelect
          class="wf_m-w-180"
          optionLabel="standardCategoryName"
          small
          placeholder="판매 카테고리 선택"
          :options="salesCategoryOptions"
          :model-value="item.category"
          @update:modelValue="(value) => handleChange(index, PartnerSalesCategoryItemFieldType.category, value)"
        />
        <div class="wf_flex wf_items-center wf-space-x-12">
          <span class="wf-body_03-reg wf_text-n-33">담당 MD</span>
          <WelfareInputText size="small" disabled :modelValue="item.md" inputType="text" class="wf_w-180" placeholder="정메가 (BOA25680)" />
        </div>
        <div class="wf_flex wf_items-center wf-space-x-13">
          <span class="wf-body_03-reg wf_text-n-33">계약 마진율</span>
          <TextInputWithMaxLengthCharacters
            hidden-warning
            :is-number-input-type="true"
            size="small"
            :disabled="!item.category"
            :modelValue="item.contractMarginRate"
            @update:modelValue="(value) => handleChange(index, PartnerSalesCategoryItemFieldType.contractMarginRate, value)"
            inputType="text"
            class="wf_w-180"
            placeholder="카테고리를 선택해 주세요."
          />
          <span class="wf-body_03-reg wf_text-n-33">%</span>
        </div>
        <div class="wf_flex wf_items-center wf-space-x-4">
          <WelfareMdButton
            class=""
            label="삭제"
            :disabled="$props.listSalesCategory.length === 1"
            buttonType="liner"
            @on-click="() => handleDeleteSalesCategory(index)"
            buttonSize="small"
          />
          <WelfareMdButton
            class=""
            label="추가"
            :disabled="index < listSalesCategory.length - 1 || isEmptyLastSalesCategory"
            buttonType="default"
            @on-click="handleAddNewSalesCategory"
            buttonSize="small"
          />
        </div>
      </div>
    </div>
  </div>
</template>
