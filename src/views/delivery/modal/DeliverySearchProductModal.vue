<script setup lang="ts">
import { DataTableContainer, HeaderModal, WelfareDateTimePicker, WelfareInputText, WelfareMdButton, WelfareSelect } from '@/components'
import FormGroup from '@/components/widgets/form/FormGroup.vue'
import { DEFAULT_DATE_FORMAT_DOT, DEFAULT_TABLE_SELECT_OPTIONS } from '@/common'
import { ProductDataFieldFormApprovalProductListConfig } from '@/models'
import { useDeliverySearchProductModalLogic } from '@/composables/delivery/modal/useDeliverySearchProductModalLogic'
import {
  DeliverySearchProductProps,
  deliveryDisplayStatus,
  deliverySaleStatus,
  deliverySearchDateType,
  deliverySearchProductTableHeaderConfig,
  deliveryProductClassification
} from '@/models/views/delivery/modal/DeliverySearchProductModel'
import { deliveryCategoryTypeOptions } from '@/models/views/delivery/ticketProductOrderManagement/DeliveryTicketProductOrderStatusProductModel'

const props = defineProps<DeliverySearchProductProps>()
const {
  values,
  handleResetForm,
  handleSearch,
  setFieldValue,
  searchResults,
  totalSearchItems,
  isLoading,
  onPageChange,
  onRowSelect,
  handleSelectValue,
  categoryDepth1,
  categoryDepth2,
  categoryDepth3,
  currentFilterDate,
  handleChangeCountDate,
  sellerSelectOptions
} = useDeliverySearchProductModalLogic(props)
</script>

<template>
  <div class="order-search-product">
    <HeaderModal title="상품 검색 " @close-modal="props.onClose" />
    <div class="wf-p-20 wf-width-full wf_flex wf_flex-col wf-space-y-20">
      <div class="wf-btn-border--bg-color-line-gray wf_br-6">
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1" is-rounded-top is-rounded-bottom label="카테고리" custom-class="wf-gap-6">
            <WelfareSelect
              :options="deliveryCategoryTypeOptions"
              :model-value="values.categoryType"
              @update:model-value="(value) => setFieldValue('categoryType', value)"
              option-label="label"
              placeholder="표준"
              small
              class="wf_w-180"
            />
            <div class="wf_flex wf-gap-4">
              <WelfareSelect
                :model-value="values.categoryDepthId1"
                @update:model-value="(value) => setFieldValue('categoryDepthId1', value)"
                placeholder="1차 분류"
                :options="categoryDepth1"
                option-label="label"
                small
                class="wf_w-180"
              />
              <WelfareSelect
                :model-value="values.categoryDepthId2"
                @update:model-value="(value) => setFieldValue('categoryDepthId2', value)"
                :disabled="!values.categoryDepthId1?.value"
                placeholder="2차 분류"
                :options="categoryDepth2"
                option-label="label"
                small
                class="wf_w-180"
              />
              <WelfareSelect
                :model-value="values.categoryDepthId3"
                @update:model-value="(value) => setFieldValue('categoryDepthId3', value)"
                :disabled="!values.categoryDepthId2?.value"
                placeholder="3차 분류 "
                :options="categoryDepth3"
                option-label="label"
                small
                class="wf_w-180"
              />
            </div>
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1" label="상품 구분">
            <WelfareSelect
              :modelValue="values.productClassificationCode"
              @update:modelValue="(value) => setFieldValue('productClassificationCode', value)"
              option-label="label"
              :options="deliveryProductClassification"
              placeholder="전체"
              small
              class="wf_w-180"
            />
          </FormGroup>
          <FormGroup class="wf_flex-1" is-border-left label="상품 코드">
            <WelfareInputText
              :modelValue="values.productCode"
              @update:modelValue="(value) => setFieldValue('productCode', value)"
              placeholder="상품코드 조회"
              size="small"
              class="wf_w-180"
            />
          </FormGroup>
          <FormGroup class="wf_flex-1" is-border-left label="상품명">
            <WelfareInputText
              :modelValue="values.productName"
              @update:modelValue="(value) => setFieldValue('productName', value)"
              placeholder="상품명 조회"
              size="small"
              class="wf_w-180"
            />
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1" label="판매사">
            <WelfareSelect
              :modelValue="values.sellerKey"
              @update:modelValue="(value) => setFieldValue('sellerKey', value)"
              option-label="label"
              :options="sellerSelectOptions"
              placeholder="판매사 선택 "
              small
              class="wf_w-180"
            />
          </FormGroup>
          <FormGroup class="wf_flex-1" is-border-left label="판매상태">
            <WelfareSelect
              :modelValue="values.lastProductSalesStatusCode"
              @update:modelValue="(value) => setFieldValue('lastProductSalesStatusCode', value)"
              :options="deliverySaleStatus"
              option-label="label"
              placeholder="전체"
              small
              class="wf_w-180"
            />
          </FormGroup>
          <FormGroup class="wf_flex-1" is-border-left label="전시상태">
            <WelfareSelect
              :modelValue="values.displayYn"
              @update:modelValue="(value) => setFieldValue('displayYn', value)"
              option-label="label"
              :options="deliveryDisplayStatus"
              placeholder="사용"
              small
              class="wf_w-180"
            />
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1" label="담당 MD">
            <WelfareInputText
              :modelValue="values.chargeMdKey"
              @update:modelValue="(value) => setFieldValue('chargeMdKey', value)"
              placeholder="MD 조회"
              size="small"
              class="wf_w-180"
            />
          </FormGroup>
        </div>
        <div class="wf_flex wf_flex-row wf_h-42">
          <div
            class="wf-body_02-semi wf_bg-bg-gray wf_flex wf_items-center wf_text-n-33 wf-px-14 wf_product-border-radius-bottom-left wf_product-min-w-150 wf_product-border-right-ncc"
          >
            기간
          </div>
          <div class="wf_flex wf_items-center wf-space-x-4 wf-py-6 wf-pl-11">
            <WelfareSelect
              :modelValue="values.searchDateType"
              @update:modelValue="(value) => setFieldValue('searchDateType', value)"
              option-label="label"
              :options="deliverySearchDateType"
              placeholder="등록일"
              small
              class="wf_w-180"
            />
            <WelfareDateTimePicker
              :modelValue="values.fromDate"
              @update:model-value="(val) => setFieldValue('fromDate', val)"
              :format="DEFAULT_DATE_FORMAT_DOT"
              :type="'date'"
              size="small"
            />
            <span class="wf-pl-2 wf-pr-1 wf_text-n-33">~</span>
            <WelfareDateTimePicker
              :modelValue="values.toDate"
              @update:model-value="(val) => setFieldValue('toDate', val)"
              :format="DEFAULT_DATE_FORMAT_DOT"
              :type="'date'"
              size="small"
            />
          </div>
          <div class="wf_flex wf_items-center wf-space-x-4 wf-ml-6">
            <WelfareMdButton
              v-for="(item, index) in ProductDataFieldFormApprovalProductListConfig.listButtonDateFilter"
              :key="index"
              :label="item.label"
              class="wf_w-55"
              buttonType="neutral"
              buttonSize="small"
              :class="{ active: currentFilterDate === item.value }"
              @click="handleChangeCountDate(item.value)"
            />
          </div>
        </div>
      </div>
      <div class="wf_flex wf_flex-row wf_justify-center wf-space-x-4 wf_flex-grow wf_w-full wf_product-border-bottom-sub-gray wf-pb-20">
        <WelfareMdButton class="wf_w-120" :label="'초기화'" buttonType="liner" @onClick="handleResetForm" />
        <WelfareMdButton class="wf_w-120" :label="'조회'" buttonType="default" @onClick="handleSearch" />
      </div>
      <div class="wf_product-search-table">
        <DataTableContainer
          :column-configs="deliverySearchProductTableHeaderConfig"
          :value="searchResults"
          :loading="isLoading"
          :total-records="totalSearchItems"
          @page-change="onPageChange"
          @row-click="onRowSelect"
          no-data-label="조회내역이 없습니다."
          :select-props="{ small: true, options: DEFAULT_TABLE_SELECT_OPTIONS }"
          row-hover
        >
          <template #title>
            <p class="wf_spacing--1">
              <span class="wf-body_01-semi">조회결과</span>&nbsp;
              <span class="wf-body_01-mid wf_text-n-8-f">(총 {{ totalSearchItems ?? 0 }}건)</span>
            </p>
          </template>
          <template #buttons>
            <div class="wf-space-x-6 wf_flex">
              <WelfareMdButton
                label="선택 등록"
                button-type="liner"
                buttonSize="small"
                class="w-66 wf-mr--2 wf_color-button--blue"
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
@import url('@/assets/css/view/order/modal/order-product-search.css');
@import url('@/assets/css/widgets/dataTable/data-table-container.css');
</style>
