<script setup lang="ts">
import { DEFAULT_DATE_FORMAT_DOT, getDateByFormat } from '@/common'
import ProductTitle from '@/components/products/common/ProductTitle.vue'
import { WelfareCheckbox, WelfareDateTimePicker, WelfareRadioGroup } from '@/components/uikit'
import { ProductSalesTax } from '@/models'

const taxOptions = [
  {
    label: '과세',
    value: ProductSalesTax.TAXATION
  },
  {
    label: '면세',
    value: ProductSalesTax.TAXFREE
  },
  {
    label: '영세',
    value: ProductSalesTax.YOUNG
  }
]

const adultCertifiedOptions = [
  {
    label: 'Yes',
    value: true
  },
  {
    label: 'No',
    value: false
  }
]

interface ProductSalesInformationProps {
  tax?: ProductSalesTax
  adultCertified?: any
  startDate?: any
  endDate?: any
  unlimited?: boolean
}

interface ProductSalesInformationEmits {
  (e: 'update:tax', value: any): void
  (e: 'update:adultCertified', value: any): void
  (e: 'update:startDate', value: any): void
  (e: 'update:endDate', value: any): void
  (e: 'update:unlimited', value: any): void
}

defineProps<ProductSalesInformationProps>()
defineEmits<ProductSalesInformationEmits>()
</script>

<template>
  <div class="wf-space-y-20">
    <ProductTitle title="판매정보" />
    <div class="wf-btn-border--ncc wf_br-6 over">
      <div class="wf_flex wf_h-43 wf-btn-border-b--ncc">
        <div class="wf_w-150 wf_h-full wf_flex wf_items-center wf-px-15 wf_bg-bg-gray wf_br-tl--6">
          <span class="wf-body_02-semi wf_text-n-33">판매 기간 <span class="wf_text-sub-01">*</span></span>
        </div>
        <div class="wf_flex-1 wf_h-full wf_flex wf_items-center wf-px-12 wf-btn-border-l--ncc wf-ml--1">
          <div class="wf_flex wf_items-center wf-space-x-20 wf-ml--1">
            <WelfareCheckbox
              :model-value="$props.unlimited"
              @update:model-value="(value) => $emit('update:unlimited', value)"
              size="sm"
              label="제한 없음"
            />
            <div>
              <div class="wf_flex wf_items-center wf-space-x-4 wf-ml--2">
                <WelfareDateTimePicker
                  :model-value="$props.startDate && getDateByFormat($props.startDate, DEFAULT_DATE_FORMAT_DOT)"
                  @update:model-value="(value) => $emit('update:startDate', value)"
                  size="small"
                  type="date"
                  format="YYYY.MM.DD"
                  :disabled="$props.unlimited"
                />
                <span>~</span>
                <WelfareDateTimePicker
                  :model-value="$props.endDate && getDateByFormat($props.endDate, DEFAULT_DATE_FORMAT_DOT)"
                  @update:model-value="(value) => $emit('update:endDate', value)"
                  size="small"
                  type="date"
                  format="YYYY.MM.DD"
                  :disabled="$props.unlimited"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="wf_flex wf_h-43">
        <div class="wf_w-150 wf_h-full wf_flex wf_items-center wf-px-15 wf_bg-bg-gray wf_br-bl--6">
          <span class="wf-body_02-semi wf_text-n-33">과세 구분 <span class="wf_text-sub-01">*</span></span>
        </div>
        <div class="wf_flex-1 wf_h-full wf_flex wf_items-center wf-px-12 wf-btn-border-l--ncc wf-ml--1">
          <div>
            <WelfareRadioGroup
              name="tax"
              :model-value="$props.tax"
              @update:model-value="(value) => $emit('update:tax', value)"
              :options="taxOptions"
              size="sm"
            />
          </div>
        </div>
        <div class="wf_w-150 wf_h-full wf_flex wf_items-center wf-px-15 wf_bg-bg-gray wf-btn-border-l--ncc">
          <span class="wf-body_02-semi wf_text-n-33">성인 인증 상품 <span class="wf_text-sub-01">*</span></span>
        </div>
        <div class="wf_flex-1 wf_h-full wf_flex wf_items-center wf-px-12 wf-btn-border-l--ncc">
          <WelfareRadioGroup
            name="adultCertified"
            :model-value="$props.adultCertified"
            @update:model-value="(value) => $emit('update:adultCertified', value)"
            :options="adultCertifiedOptions"
            size="sm"
          />
        </div>
      </div>
    </div>
  </div>
</template>
