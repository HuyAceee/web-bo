<script setup lang="ts">
import { DataTableContainer, WelfareCheckbox, WelfareMdButton } from '@/components/uikit'
import { TextInputNumber, TextInputValidationMaxBytes } from '@/components/widgets'
import { ProductDataHeaderRegisterOptionalConfig, ProductDataValueModel, ProductDateRowKey, ProductOptionsDeliveryInfo } from '@/models'
import ProductDateRow from './ProductDateRow.vue'
import { reactive } from 'vue'
import ProductActionRow from '../ProductActionRow.vue'
import { TEXT_MAX_NUMBER_30 } from '@/common'

interface Props {
  dataOptional: ProductOptionsDeliveryInfo[] | undefined
  dataOptionalRequired: ProductOptionsDeliveryInfo[] | undefined
  dataOptionalData: ProductOptionsDeliveryInfo[] | undefined
  dataValue: ProductDataValueModel
}

interface Emits {
  (e: 'increase-row', index: number): void
  (e: 'decrease-row', index: number): void
  (e: 'increase-row-required', index: number): void
  (e: 'decrease-row-required', index: number): void
  (e: 'decrease-row-data', index: number): void
  (e: 'handle-map-data'): void
  (e: 'handle-check-all'): void
  (e: 'delete-multiple-record'): void
  (
    e: 'handle-change-date',
    {
      key,
      value
    }: {
      key: ProductDateRowKey
      value: string
    }
  ): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const dataValueReactive = reactive(props.dataValue)
const emitsEvent = {
  increaseRow: (index: number) => {
    emits('increase-row', index)
  },
  decreaseRow: (index: number) => {
    emits('decrease-row', index)
  },
  increaseRowRequired: (index: number) => {
    emits('increase-row-required', index)
  },
  decreaseRowRequired: (index: number) => {
    emits('decrease-row-required', index)
  },
  decreaseRowData: (index: number) => {
    emits('decrease-row-data', index)
  },
  handleMapData: () => {
    emits('handle-map-data')
  },
  handleCheckAll: () => {
    emits('handle-check-all')
  },
  deleteMultipleRecord: () => {
    emits('delete-multiple-record')
  },
  handleChangeDate: ({ key, value }: { key: ProductDateRowKey; value: string }) => {
    emits('handle-change-date', { key, value })
  }
}
</script>
<template>
  <div class="wf-wrapper-data-list wf_modal-popup-body wf_modal-optional-popup-body-max-height">
    <div class="wf_modal-popup-table-horizontal">
      <div class="wf_modal-popup-table-row wf_flex">
        <div class="wf_modal-popup-table-title">
          <p class="wf-body_02-semi wf_text-n-33">옵션 1<span class="wf_text-sub-01">*</span></p>
        </div>
        <div class="wf_modal-popup-table-content wf_flex-1">
          <ProductDateRow :beginDate="dataValue.beginDate" :endDate="dataValue.endDate" @update-date="emitsEvent.handleChangeDate" class="wf-pb-1" />
        </div>
      </div>
    </div>
    <div class="wf_modal-popup-table-horizontal">
      <div class="wf_modal-popup-table-row wf_flex">
        <div class="wf_modal-popup-table-title">
          <p class="wf-body_02-semi wf_text-n-33">옵션 2<span class="wf_text-sub-01">*</span></p>
        </div>
        <div class="wf_modal-popup-table-content wf_flex-1">
          <div class="wf-list-option-wrapper wf-custom-scrollbar product-modal-optional-custom-max-table" :class="{ 'wf-pr-4': (props.dataOptional || []).length > 5 }">
            <div class="wf-list-option-row" v-for="(item, index) in dataOptional" :key="index">
              <TextInputNumber name="" class="wf-text-no" size="small" placeholder="00" v-model="item.no" should-check-press-key format-value />
              <TextInputValidationMaxBytes
                class="wf-text-option wf_flex-1"
                :max-bytes="TEXT_MAX_NUMBER_30"
                name=""
                size="small"
                placeholder="옵션을 입력해 주세요."
                v-model="item.option1"
              />
              <ProductActionRow @increase-row="() => emitsEvent.increaseRow(index)" @decrease-row="() => emitsEvent.decreaseRow(index)" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="wf_modal-popup-table-horizontal">
      <div class="wf_modal-popup-table-row wf_flex">
        <div class="wf_modal-popup-table-title">
          <WelfareCheckbox size="sm" label="옵션 3" v-model="dataValueReactive.checkOption" required />
        </div>
        <div class="wf_modal-popup-table-content wf_flex-1">
          <div class="wf-list-option-wrapper wf-custom-scrollbar product-modal-optional-custom-max-table" :class="{ 'wf-pr-4': (props.dataOptionalRequired || []).length > 5 }">
            <div class="wf-list-option-row" v-for="(item, index) in dataOptionalRequired" :key="index">
              <TextInputNumber
                name=""
                class="wf-text-no"
                size="small"
                placeholder="00"
                v-model="item.noOption3"
                :disabled="!dataValue.checkOption"
                should-check-press-key
                format-value
              />
              <TextInputValidationMaxBytes
                class="wf-text-option wf_flex-1"
                :max-bytes="TEXT_MAX_NUMBER_30"
                name=""
                size="small"
                placeholder="옵션을 입력해 주세요."
                v-model="item.option2"
                :disabled="!dataValue.checkOption"
              />
              <ProductActionRow
                @increase-row="() => emitsEvent.increaseRowRequired(index)"
                @decrease-row="() => emitsEvent.decreaseRowRequired(index)"
                :disabled="!dataValue.checkOption"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="wf-wrapper-action-map-data">
      <WelfareMdButton label="적용" buttonType="default" class="wf_w-120" @on-click="emitsEvent.handleMapData" />
    </div>
  </div>
  <div class="wf-wrapper-action-table">
    <span class="wf-body_01-semi">예약 옵션</span>
    <WelfareMdButton
      label="삭제"
      buttonType="liner"
      :button-size="'small'"
      @on-click="emitsEvent.deleteMultipleRecord"
      :disabled="!(props.dataOptionalData || []).length"
    />
  </div>
  <DataTableContainer isSelectInvisible :value="dataOptionalData" :column-configs="ProductDataHeaderRegisterOptionalConfig">
    <template #header-selected="{}">
      <WelfareCheckbox
        size="sm"
        v-model="dataValueReactive.checkAll"
        @click="emitsEvent.handleCheckAll"
        :disabled="!(props.dataOptionalData || []).length"
      />
    </template>
    <template #body-selected="{ props }">
      <WelfareCheckbox size="sm" v-model="props.data.selected" />
    </template>
    <template #body-optionId="{ props }">
      {{ props.data.optionId || '-' }}
    </template>
    <template #body-option="{ props }">
      {{ props.data.option || '-' }}
    </template>
    <template #body-option1="{ props }">
      {{ props.data.option1 || '-' }}
    </template>
    <template #body-option2="{ props }">
      {{ props.data.option2 || '-' }}
    </template>
    <template #header-option="{ props }">
      {{ props }}
    </template>
    <template #header-option1="{ props }">
      {{ props }}
    </template>
    <template #header-option2="{ props }">
      {{ props }}
    </template>
    <template #body-action="{ props }">
      <ProductActionRow @decrease-row="() => emitsEvent.decreaseRowData(props.index)" hidden-increase />
    </template>
  </DataTableContainer>
</template>

<style scoped>
@import url('@/assets/css/view/product/modal/register/product-modal-representative.css');
</style>
