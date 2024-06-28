<!-- BO_C0604_010101_P -->
<script setup lang="ts">
import { DataTableContainer, WelfareDateTimePicker, WelfareInputTextWithValidation, WelfareMdButton, WelfareSelect } from '@/components'
import { ProductDataFieldFormApprovalProductListConfig, ProductSearchModalProps } from '@/models'
import { DEFAULT_DATE_FORMAT_DOT } from '@/common'
import { useProductModalSearchWithTableLogic } from '@/composables/products/modal/modalSearch/useProductModalSearchWithTableLogic'
import IconCloseRounded from '@/components/icons/IconCloseRounded.vue'

const props = defineProps<ProductSearchModalProps>()

const {
  searchResults,
  handleSearch,
  handleSelectValue,
  modalSearchMetaInfo,
  onRowSelect,
  handleResetForm,
  values,
  setFieldValue,
  onPageChange,
  currentFilterDate,
  handleChangeCountDate,
  isLoading,
  totalSearchItems,
  tableCols,
  handleSelectCustomDate
} = useProductModalSearchWithTableLogic(props)
</script>

<template>
  <div class="product-search-modal-with-table">
    <div class="wf-modal-header">
      <p class="wf-sub_tit_01 wf_text-n-33">{{ modalSearchMetaInfo.searchTitle }}</p>
      <IconCloseRounded @click="$props.onCancel" />
    </div>
    <div class="wf-modal-body wf-body_04-mid wf-space-y-20">
      <div class="wf_flex wf_flex-col wf_product-modal-search-form">
        <div class="wf_flex wf_flex-row wf_h-44 wf_product-border-bottom wf_product-border-bottom-ncc">
          <div class="wf_flex wf_flex-row wf_flex-grow-1 wf_w-full">
            <div
              class="wf-body_02-semi wf_bg-bg-gray wf_flex wf_items-center wf_text-n-33 wf-px-14 wf_product-border-radius-top-left wf_product-border-right-ncc wf_product-min-w-150"
            >
              {{ modalSearchMetaInfo.formFields.code }}
            </div>
            <div class="wf-pb-7 wf-pt-6 wf-px-11">
              <WelfareInputTextWithValidation
                size="small"
                inputType="text"
                class="wrap-input wf_w-180"
                :placeholder="modalSearchMetaInfo.formFields.codePlaceHolder"
                name="searchCode"
              />
            </div>
          </div>
          <div class="wf_flex wf_flex-row wf_flex-grow-1 wf_w-full">
            <div
              class="wf-body_02-semi wf-body_02-semi wf_bg-bg-gray wf_flex wf_items-center wf_text-n-33 wf-px-14 wf_product-min-w-150 wf_product-border-left-ncc"
            >
              {{ modalSearchMetaInfo.formFields.name }}
            </div>
            <div class="wf-pb-7 wf-pt-6 wf-px-11 wf_product-border-left-ncc">
              <WelfareInputTextWithValidation
                size="small"
                inputType="text"
                class="wrap-input wf_w-180"
                :placeholder="modalSearchMetaInfo.formFields.namePlaceHolder"
                name="searchName"
              />
            </div>
          </div>
          <div class="wf_flex wf_flex-row wf_flex-grow-1 wf_w-full">
            <div class="wf-body_02-semi wf_bg-bg-gray wf_flex wf_items-center wf_text-n-33 wf-px-14 wf_product-min-w-150 wf_product-border-left-ncc">
              {{ modalSearchMetaInfo.formFields.status }}
            </div>
            <div class="wf-pb-7 wf-pt-6 wf-px-11 wf_product-border-left-ncc">
              <WelfareSelect
                :modelValue="values.status"
                @update:modelValue="(value) => setFieldValue('status', value)"
                class="wf_w-180"
                placeholder="전체"
                optionLabel="label"
                :options="modalSearchMetaInfo.formFields.statusOptions"
                small
                :class="'wf_w-180'"
              />
            </div>
          </div>
        </div>
        <div class="wf_flex wf_flex-row wf_h-44 wf_product-border-bottom wf_product-border-bottom-ncc">
          <div class="wf_flex wf_flex-row wf_flex-grow-1 w-full">
            <div class="wf-body_02-semi wf_bg-bg-gray wf_flex wf_items-center wf_text-n-33 wf-px-14 wf_product-border-right-ncc wf_product-min-w-150">
              {{ modalSearchMetaInfo.formFields.registerCode }}
            </div>
            <div class="wf-pb-7 wf-pt-6 wf-px-11">
              <WelfareInputTextWithValidation
                size="small"
                inputType="number"
                class="wrap-input wf_w-180"
                :placeholder="modalSearchMetaInfo.formFields.registerCodePlaceHolder"
                name="searchBusinessRegistrationNumber"
              />
            </div>
          </div>
          <div class="wf_flex wf_flex-row wf_flex-grow-1 w-full">
            <div class="wf-body_02-semi wf_bg-bg-gray wf_flex wf_items-center wf_text-n-33 wf-px-14 wf_product-min-w-150 wf_product-border-left-ncc">
              {{ modalSearchMetaInfo.formFields.businessRegistrationNumber }}
            </div>
            <div class="wf-pb-7 wf-pt-6 wf-px-11 wf_product-border-left-ncc">
              <WelfareInputTextWithValidation
                size="small"
                inputType="number"
                class="wrap-input wf_w-180"
                :placeholder="modalSearchMetaInfo.formFields.businessRegistrationNumberPlaceHolder"
                name="searchRegisterCode"
              />
            </div>
          </div>
          <div class="wf_flex wf_flex-row wf_flex-grow-1 w-full">
            <div class="wf-body_02-semi wf_bg-bg-gray wf_flex wf_items-center wf_text-n-33 wf-px-14 wf_product-min-w-150 wf_product-border-left-ncc">
              {{ modalSearchMetaInfo.formFields.contractStatus }}
            </div>
            <div class="wf-pb-7 wf-pt-6 wf-px-11 wf_product-border-left-ncc">
              <WelfareSelect
                :modelValue="values.contractStatus"
                @update:modelValue="(value) => setFieldValue('contractStatus', value)"
                class="wf_w-180"
                placeholder="전체"
                optionLabel="label"
                :options="modalSearchMetaInfo.formFields.contractStatusOptions"
                small
                :class="'wf_w-180'"
              />
            </div>
          </div>
        </div>

        <div class="wf_flex wf_flex-row wf_h-42">
          <div
            class="wf-body_02-semi wf_bg-bg-gray wf_flex wf_items-center wf_text-n-33 wf-px-14 wf_product-border-radius-bottom-left wf_product-min-w-150 wf_product-border-right-ncc"
          >
            {{ modalSearchMetaInfo.formFields.regDate }}
          </div>
          <div class="wf_flex wf_items-center wf-space-x-4 wf-py-6 wf-pl-11">
            <WelfareDateTimePicker
              :modelValue="values.searchStartDate"
              @update:model-value="(val) => handleSelectCustomDate('searchStartDate', val)"
              :format="DEFAULT_DATE_FORMAT_DOT"
              :type="'date'"
              size="small"
            />
            <span class="wf-pl-2 wf-pr-4 wf_text-n-33">~</span>
            <WelfareDateTimePicker
              :modelValue="values.searchEndDate"
              @update:model-value="(val) => handleSelectCustomDate('searchEndDate', val)"
              :format="DEFAULT_DATE_FORMAT_DOT"
              :type="'date'"
              size="small"
            />
          </div>
          <div class="wf_flex wf_items-center wf-space-x-4 wf-ml-6">
            <WelfareMdButton
              v-for="(item, index) in ProductDataFieldFormApprovalProductListConfig.listButtonDateFilter"
              @click="handleChangeCountDate(item.value)"
              :key="index"
              :label="item.label"
              class="wf_w-55"
              buttonType="neutral"
              :class="{ active: currentFilterDate === item.value }"
              buttonSize="small"
            />
          </div>
        </div>
      </div>
      <div class="wf_flex wf_flex-row wf_justify-center wf-space-x-4 wf_flex-grow wf_w-full wf_product-border-bottom-sub-gray wf-pb-20">
        <WelfareMdButton class="wf_w-120" :label="'초기화'" buttonType="liner" @onClick="handleResetForm" />
        <WelfareMdButton class="wf_w-120" :label="'조회'" buttonType="default" @onClick="handleSearch" />
      </div>
      <!-- table -->
      <div class="wf_product-search-table">
        <DataTableContainer
          ref="refTable"
          :value="searchResults"
          :total-records="totalSearchItems"
          :loading="isLoading"
          :column-configs="tableCols"
          @page-change="onPageChange"
          @rowClick="onRowSelect"
          no-data-label="조회내용이 없습니다."
          row-hover
        >
          <template #title>
            <p>
              <span class="wf-body_01-semi">조회결과&nbsp; </span>
              <span class="wf-body_01-mid wf_text-n-8-f">(총 {{ totalSearchItems ?? 0 }}건)</span>
            </p>
          </template>
          <template #buttons>
            <div class="">
              <WelfareMdButton
                label="선택등록"
                buttonType="liner"
                buttonSize="small"
                class="w-66 wf_color-button--blue"
                @onClick="handleSelectValue"
              />
            </div>
          </template>
        </DataTableContainer>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/product/common/product-search-modal-table.css');
@import url('@/assets/css/widgets/dataTable/data-table-container.css');
</style>
