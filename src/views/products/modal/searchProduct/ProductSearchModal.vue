<!-- BO_C0610_010101_P -->
<script setup lang="ts">
import Column from 'primevue/column'
import { DataTablePaginationWithCheckbox, HeaderModal, WelfareInputText, WelfareMdButton, WelfareSelect } from '@/components'

import { ProductSearchItemModalProps } from '@/models'
import { useProductSearchItemModalLogic } from '@/composables/products/modal/modalSearch/useProductSearchItemModalLogic'
import { ProductSearchProductModalModelTableConfig } from '@/models/views/products/modal/ProductSearchProductModalModel'
import { deliverySearchDateType } from '@/models/views/delivery/modal/DeliverySearchProductModel'
import FormGroupDateFilter from '@/components/widgets/form/FormGroupDateFilter.vue'
import FormGroupSelectInput from '@/components/widgets/form/FormGroupSelectInput.vue'

const props = defineProps<ProductSearchItemModalProps>()
const {
  query,
  groupDateRef,
  productClassification,
  salesStatusOptions,
  approvalStatusOptions,
  codeSearchOptions,
  codeSearchEnabled,
  tableRef,
  isLoading,
  items,
  totalItems,
  onPageChange,
  onSelectAllChange,
  onRowCheckedChange,
  handleReset,
  handleSearch,
  handleConfirm
} = useProductSearchItemModalLogic(props)
</script>

<template>
  <div class="wf_w-1200 wf_br-4 wf_bg-white">
    <HeaderModal title="상품 검색" @close-modal="$props.onCancel" />
    <div class="wf-px-20 wf-py-20">
      <div class="wf-btn-border--ncc wf_br-6">
        <div class="wf_flex wf_h-44 wf-btn-border-b--ncc">
          <div class="wf_w-150 wf_h-full wf_flex wf_items-center wf-px-15 wf_bg-bg-gray wf_br-tl--6 wf-pb-1">
            <span class="wf-body_02-semi wf_text-n-33">상품 구분</span>
          </div>
          <div class="wf_flex-1 wf_h-full wf_flex wf_items-center wf-px-12 wf-btn-border-l--ncc wf-ml--1 wf-pb-1">
            <div class="wf_w-180 wf-ml--1">
              <WelfareSelect
                :disabled="codeSearchEnabled"
                v-model="query.productClassificationCode"
                :options="productClassification"
                optionLabel="label"
                small
                placeholder=""
              />
            </div>
          </div>
          <div class="wf_w-150 wf_h-full wf_flex wf_items-center wf-px-15 wf-btn-border-l--ncc wf_bg-bg-gray wf-pb-1">
            <span class="wf-body_02-semi wf_text-n-33">담당 MD</span>
          </div>
          <div class="wf_flex-1 wf_h-full wf_flex wf_items-center wf-px-12 wf-btn-border-l--ncc wf-ml--1 wf-pb-1">
            <div class="wf_w-180 wf-ml--1">
              <WelfareInputText :disabled="codeSearchEnabled" v-model="query.chargeMdKey" size="small" placeholder="" />
            </div>
          </div>
          <div class="wf_w-150 wf_h-full wf_flex wf_items-center wf-px-15 wf-btn-border-l--ncc wf_bg-bg-gray wf-pb-1">
            <span class="wf-body_02-semi wf_text-n-33">상품명</span>
          </div>
          <div class="wf_flex-1 wf_h-full wf_flex wf_items-center wf-px-12 wf-btn-border-l--ncc wf-ml--1 wf-pb-1">
            <div class="wf_w-180 wf-ml--1">
              <WelfareInputText :disabled="codeSearchEnabled" v-model="query.productName" size="small" placeholder="" />
            </div>
          </div>
        </div>
        <div class="wf_flex wf_h-44 wf-btn-border-b--ncc">
          <div class="wf_w-150 wf_h-full wf_flex wf_items-center wf-px-15 wf_bg-bg-gray wf-pb-1">
            <span class="wf-body_02-semi wf_text-n-33">상품 코드</span>
          </div>
          <div class="wf_flex-1 wf_h-full wf_flex wf_items-center wf-px-12 wf-btn-border-l--ncc wf-ml--1 wf-pb-1">
            <div class="wf_w-180 wf-ml--1">
              <WelfareInputText :disabled="codeSearchEnabled" v-model="query.productCode" size="small" placeholder="" />
            </div>
          </div>
          <div class="wf_w-150 wf_h-full wf_flex wf_items-center wf-px-15 wf-btn-border-l--ncc wf_bg-bg-gray wf-pb-1">
            <span class="wf-body_02-semi wf_text-n-33">판매 상태</span>
          </div>
          <div class="wf_flex-1 wf_h-full wf_flex wf_items-center wf-px-12 wf-btn-border-l--ncc wf-ml--1 wf-pb-1">
            <div class="wf_w-180 wf-ml--1">
              <WelfareSelect
                :disabled="true"
                v-model="query.lastProductSalesStatusCode"
                :options="salesStatusOptions"
                optionLabel="label"
                small
                placeholder=""
              />
            </div>
          </div>
          <div class="wf_w-150 wf_h-full wf_flex wf_items-center wf-px-15 wf-btn-border-l--ncc wf_bg-bg-gray wf-pb-1">
            <span class="wf-body_02-semi wf_text-n-33">승인 상태</span>
          </div>
          <div class="wf_flex-1 wf_h-full wf_flex wf_items-center wf-px-12 wf-btn-border-l--ncc wf-ml--1 wf-pb-1">
            <div class="wf_w-180 wf-ml--1">
              <WelfareSelect
                :disabled="true"
                v-model="query.lastProductProgressStatusCode"
                :options="approvalStatusOptions"
                optionLabel="label"
                small
                placeholder=""
              />
            </div>
          </div>
        </div>
        <div class="wf_flex wf_h-44 wf-btn-border-b--ncc">
          <div class="wf_w-150 wf_h-full wf_flex wf_items-center wf-px-15 wf_bg-bg-gray wf-pb-1">
            <span class="wf-body_02-semi wf_text-n-33">기간</span>
          </div>
          <div class="wf_flex-1 wf_h-full wf_flex wf_items-center wf-px-12 wf-btn-border-l--ncc wf-ml--1 wf-pb-1">
            <div class="wf_w-full wf-mx--1 wf_flex wf-space-x-6">
              <WelfareSelect
                :disabled="codeSearchEnabled"
                v-model="query.searchDateType"
                :options="deliverySearchDateType"
                optionLabel="label"
                class="wf_w-180"
                small
              />
              <FormGroupDateFilter
                ref="groupDateRef"
                v-model:start-date="query.fromDate"
                v-model:end-date="query.toDate"
                :disabled="codeSearchEnabled"
              />
            </div>
          </div>
        </div>
        <div class="wf_flex wf_h-42">
          <div class="wf_w-150 wf_h-full wf_flex wf_items-center wf-px-15 wf_bg-bg-gray wf_br-bl--6 wf-pb-1">
            <span class="wf-body_02-semi wf_text-n-33">상품코드 검색</span>
          </div>
          <div class="wf_flex-1 wf_h-full wf_flex wf_items-center wf-px-12 wf-btn-border-l--ncc wf-ml--1 wf-pb-1">
            <div class="wf_w-full wf-mx--1">
              <FormGroupSelectInput
                v-model:select="query.codeSearch"
                :selectOptions="codeSearchOptions"
                optionLabel="label"
                select-placeholder="사용안함"
                :input-disabled="!codeSearchEnabled"
                v-model:input="query.codeQuery"
                :max-length-input="50"
                input-placeholder="최대 50개까지 입력 가능합니다. 쉼표(,)로 구분해 주세요."
              />
            </div>
          </div>
        </div>
      </div>
      <div class="wf-my-20 wf_flex wf_justify-center wf-space-x-4">
        <WelfareMdButton type="reset" class="wf_w-120" button-type="cancel" label="초기화" @onClick="handleReset" />
        <WelfareMdButton type="button" class="wf_w-120" button-type="default" label="조회" @onClick="handleSearch" />
      </div>

      <div class="wf_product-border-bottom-ncc wf-mb-21"></div>

      <!-- table -->
      <div class="wf_product-search-table">
        <DataTablePaginationWithCheckbox
          :value="items"
          :loading="isLoading"
          :totalRecords="totalItems"
          v-on:page-change="onPageChange"
          v-on:select-all-change="onSelectAllChange"
          v-on:row-checked-change="onRowCheckedChange"
          no-data-label="조회내용이 없습니다."
          ref="tableRef"
        >
          <template #title>
            <p class="wf_text-n-33 wf-body_01-semi">
              상품 목록 &nbsp;<span class="wf-body_01-semi text-number-product-list">(총 {{ totalItems ?? 0 }} 건)</span>
            </p>
          </template>
          <template #buttons>
            <WelfareMdButton label="선택등록" buttonType="liner" buttonSize="small" class="w-66 wf_color-button--blue" @onClick="handleConfirm" />
          </template>
          <template #columns>
            <Column
              v-for="column in ProductSearchProductModalModelTableConfig"
              :key="column.field"
              :column-key="column.field"
              class="wf-nowrap"
              :class="column?.class"
            >
              <template #header>
                {{ column.header }}
              </template>
              <template #body="slotProps">
                <p>
                  {{ slotProps.data?.[column.field] }}
                </p>
              </template>
            </Column>
          </template>
        </DataTablePaginationWithCheckbox>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url(@/assets/css/view/product/modal/searchModal/product-search-product-modal.css);
</style>
