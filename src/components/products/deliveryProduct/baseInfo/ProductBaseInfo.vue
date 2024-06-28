<script setup lang="ts">
import { WelfareInputText, WelfareMdButton, WelfareSelect, WelfareTag } from '@/components/uikit'
import ProductSearchModalWrapper from '@/components/products/common/ProductSearchModalWrapper.vue'
import ProductSearchModalWithTableWrapper from '@/components/products/common/ProductSearchModalWithTableWrapper.vue'
import { ProductSearchRecordModel, ProductSearchType, WelfareSelectOptionType, YnOptions } from '@/models'
import { useNotificationMaxLength } from '@/composables'
import { TEXT_MAX_NUMBER_10 } from '@/common/constant'
import { productBaseInfoType } from '@/models/views/products/common/ProductTypeModel'

interface ProductBaseInfoProps {
  type?: string
  externalIntegration?: string
  productCode: string
  productName: string
  productNameI18?: string
  sellerSearch: string
  brandSearch: string
  selectTypeProduct?: WelfareSelectOptionType
  selectSeller?: WelfareSelectOptionType
  optionsTypeProduct: WelfareSelectOptionType[]
  labelTypeProduct: string
  optionsSelectSeller: WelfareSelectOptionType[]
  keywordProductBase: string
  keywordsProductBase: string[]
  productCodeSeller?: string
  nameModel?: string
  lowSellerKey?: number
}

interface ProductBaseInfoEmits {
  (e: 'onChangeProductName', value: string): void
  (e: 'onChangeProductNameI18', value: string): void
  (e: 'onChangeSelectTypeProduct', value: WelfareSelectOptionType): void
  (e: 'onChangeSelectSeller', value: WelfareSelectOptionType): void
  (e: 'onChangeKeywordProductBase', value: string): void
  (e: 'handleAddTagKeywordBase'): void
  (e: 'handleRemoveTagKeywordBase', idx: number): void
  (e: 'onChangeBrandSearch', value: ProductSearchRecordModel): void
  (e: 'onChangeSellerSearch', value: ProductSearchRecordModel): void
  (e: 'onChangeProductCodeSeller', value: string): void
  (e: 'onChangeNameModel', value: string): void
}

const props = defineProps<ProductBaseInfoProps>()
const emits = defineEmits<ProductBaseInfoEmits>()

const { isReadOnly: readOnlyName, handelChange: handelChangeName } = useNotificationMaxLength({
  emit: (value: string) => emits('onChangeProductName', value),
  length: 50
})

const { isReadOnly: readOnlyNameI18, handelChange: handelChangeNameI18 } = useNotificationMaxLength({
  emit: (value: string) => emits('onChangeProductNameI18', value),
  length: 50
})
</script>

<template>
  <div class="wf_flex wf_flex-col wf-btn-border--bg-color-line-gray wf_br-6 wf-mt-20">
    <div class="wf_flex wf-btn-border-b--ncc wf_h-44">
      <div class="wf_flex wf_flex-1">
        <div
          class="wf-btn-border-r--ncc wf_br-tl--6 wf_flex wf_items-center wf_justify-start wf_h-44 wf-pl-14 wf-pr-11 wf-py-14 wf-btn-border-b--ncc wf-body_02-semi wf_text-n-33 wf_w-150 wf_bg-bg-gray wf-body_02-semi wf_text-n-33"
        >
          외부연동 여부
        </div>
        <div class="wf_flex wf_items-center wf_justify-start wf_h-44 wf-pl-11 wf-pr-11 wf-py-14 wf-body_03-reg wf_text--14 wf_text-n-33">
          {{ props.externalIntegration === YnOptions.Y ? '외부연동' : props.externalIntegration === YnOptions.N ? '직접등록' : '직접등록' }}
        </div>
      </div>
      <div class="wf_flex wf_flex-1">
        <div
          class="wf-btn-border-l--ncc wf_flex wf_items-center wf_justify-start wf_h-44 wf-pl-14 wf-pr-11 wf-py-14 wf-btn-border-b--ncc wf-body_02-semi wf_text-n-33 wf_w-150 wf_bg-bg-gray"
        >
          상품 유형&nbsp;<span class="wf_text-sub-01">*</span>
        </div>
        <div class="wf-btn-border-l--ncc wf_flex wf_items-center wf_justify-start wf_h-44 wf-pl-11 wf-pr-11 wf-py-14 wf-body_03-reg wf_text--14">
          <WelfareSelect
            @update:model-value="(value) => emits('onChangeSelectTypeProduct', value)"
            :model-value="props.selectTypeProduct"
            class="wf_w-180"
            :placeholder="props.labelTypeProduct"
            optionLabel="label"
            :options="props.optionsTypeProduct"
            small
          />
        </div>
      </div>
      <div class="wf_flex wf_flex-1">
        <div
          class="wf-btn-border-l--ncc wf_flex wf_items-center wf_justify-start wf_h-44 wf-pl-14 wf-pr-11 wf-py-14 wf-btn-border-b--ncc wf-body_02-semi wf_text-n-33 wf_w-150 wf_bg-bg-gray"
        >
          상품요청코드
        </div>
        <div
          class="wf-btn-border-l--ncc wf_flex wf_items-center wf_justify-start wf_h-44 wf-pl-11 wf-pr-11 wf-py-14 wf-body_03-reg wf_text--14 wf_text-n-33"
        >
          {{ props.productCode }}
        </div>
      </div>
    </div>
    <div class="wf_flex wf-btn-border-b--ncc wf_h-44">
      <div class="wf_flex wf_flex-1 wf_w-full">
        <div
          class="wf-btn-border-r--ncc wf_flex wf_items-center wf_justify-start wf_h-44 wf-pl-14 wf-pr-11 wf-py-14 wf-btn-border-b--ncc wf-body_02-semi wf_text-n-33 wf_w-150 wf_bg-bg-gray"
        >
          상품명&nbsp;<span class="wf_text-sub-01">*</span>
        </div>
        <div class="wf_flex wf_items-center wf_justify-start wf_h-44 wf-pl-11 wf-pr-11 wf-py-14 wf-body_03-reg wf_text--14 wf_flex-1-0-0">
          <div class="wf_flex wf_items-center wf-space-x-4 wf_flex-1">
            <WelfareInputText
              size="small"
              inputType="text"
              class="wf_flex wf_flex-1 wf_w-full"
              :model-value="props.productName"
              :readonly="readOnlyName"
              @update:model-value="handelChangeName"
              placeholder="한글 기준 50자 이내로 입력"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="wf_flex wf-btn-border-b--ncc wf_h-44">
      <div class="wf_flex wf_flex-1 wf_w-full">
        <div
          class="wf-btn-border-r--ncc wf_flex wf_items-center wf_justify-start wf_h-44 wf-pl-14 wf-pr-11 wf-py-14 wf-btn-border-b--ncc wf-body_02-semi wf_text-n-33 wf_w-150 wf_bg-bg-gray wf-body_02-semi wf_text-n-33"
        >
          다국어 상품명
        </div>
        <div class="wf_flex wf_items-center wf_justify-start wf_h-44 wf-pl-11 wf-pr-11 wf-py-14 wf-body_03-reg wf_text--14 wf_flex-1-0-0">
          <WelfareInputText
            :model-value="props.productNameI18"
            :readonly="readOnlyNameI18"
            @update:model-value="handelChangeNameI18"
            size="small"
            inputType="text"
            class="wf_w-full"
            placeholder="한글 기준 50자 이내로 입력"
          />
        </div>
      </div>
    </div>
    <div class="wf_flex wf-btn-border-b--ncc wf_h-44">
      <div class="wf_flex wf_flex-1">
        <div
          class="wf-btn-border-r--ncc wf_flex wf_items-center wf_justify-start wf_h-44 wf-pl-14 wf-pr-11 wf-py-14 wf-btn-border-b--ncc wf-body_02-semi wf_text-n-33 wf_w-150 wf_bg-bg-gray"
        >
          판매사 상품코드
        </div>
        <div class="wf_flex wf_items-center wf_justify-start wf_h-44 wf-pl-11 wf-pr-11 wf-py-14 wf-body_03-reg wf_text--14">
          <WelfareInputText
            :model-value="props.productCodeSeller"
            @update:model-value="(value) => emits('onChangeProductCodeSeller', value)"
            size="small"
            inputType="text"
            class="wf_w-180"
            placeholder="필요시 숫자만 입력"
          />
        </div>
      </div>
      <div class="wf_flex wf_flex-2">
        <div
          class="wf-btn-border-l--ncc wf_flex wf_items-center wf_justify-start wf_h-44 wf-pl-14 wf-pr-11 wf-py-14 wf-btn-border-b--ncc wf-body_02-semi wf_text-n-33 wf_w-150 wf_bg-bg-gray"
        >
          판매사&nbsp;<span class="wf_text-sub-01">*</span>
        </div>
        <div
          class="wf-btn-border-l--ncc wf_flex wf_items-center wf_justify-start wf_h-44 wf-pl-11 wf-pr-11 wf-py-14 wf-body_03-reg wf_text--14 wf-space-x-6"
        >
          <ProductSearchModalWithTableWrapper
            class="wf-product-base-info-search"
            :type="ProductSearchType.SELLER"
            placeholder-input="판매사 조회"
            label-button="조회"
            :defaultValue="sellerSearch"
            @selectValue="(value: ProductSearchRecordModel) => emits('onChangeSellerSearch', value)"
          />
          <WelfareSelect
            :disabled="!sellerSearch"
            @update:model-value="(value) => emits('onChangeSelectSeller', value)"
            :model-value="props.selectSeller"
            class="wf_w-180"
            placeholder="하위업체 전체"
            optionLabel="label"
            :options="props.optionsSelectSeller"
            small
          />
        </div>
      </div>
    </div>

    <div v-if="props.type != productBaseInfoType.ticket" class="wf_flex wf-btn-border-b--ncc wf_h-44">
      <div class="wf_flex wf_flex-1">
        <div
          class="wf-btn-border-r--ncc wf_flex wf_items-center wf_justify-start wf_h-44 wf-pl-14 wf-pr-11 wf-py-14 wf-btn-border-b--ncc wf-body_02-semi wf_text-n-33 wf_w-150 wf_bg-bg-gray"
        >
          브랜드&nbsp;<span class="wf_text-sub-01">*</span>
        </div>
        <div class="wf_flex wf_items-center wf_justify-start wf_h-44 wf-pl-11 wf-pr-11 wf-py-14 wf-body_03-reg wf_text--14">
          <ProductSearchModalWrapper
            class="wf-product-base-info-search"
            :type="ProductSearchType.BRAND"
            placeholder-input="브랜드 조회"
            label-button="조회"
            :defaultValue="props.brandSearch"
            @selectValue="(value: ProductSearchRecordModel) => emits('onChangeBrandSearch', value)"
          />
        </div>
      </div>
      <div class="wf_flex wf_flex-2">
        <div
          class="wf-btn-border-l--ncc wf_flex wf_items-center wf_justify-start wf_h-44 wf-pl-14 wf-pr-11 wf-py-14 wf-btn-border-b--ncc wf-body_02-semi wf_text-n-33 wf_w-150 wf_bg-bg-gray"
        >
          모델명
        </div>
        <div class="wf-btn-border-l--ncc wf_flex wf_items-center wf_justify-start wf_h-44 wf-pl-11 wf-pr-11 wf-py-14 wf-body_03-reg wf_text--14">
          <WelfareInputText
            :model-value="props.nameModel"
            @update:model-value="(value) => emits('onChangeNameModel', value)"
            size="small"
            inputType="text"
            class="wf_w-180"
            placeholder="필요시 입력"
          />
        </div>
      </div>
    </div>
    <div class="wf_flex">
      <div
        class="wf_br-bl--6 wf-btn-border-r--ncc wf_flex wf_items-center wf_justify-start wf-pl-14 wf-pr-11 wf-py-14 wf_w-150 wf-body_02-semi wf_text-n-33 wf_bg-bg-gray"
      >
        상품 키워드
      </div>
      <div class="wf_text-sub-01 wf_flex wf_flex-1 wf_flex-col wf_justify-start wf-space-y-6 wf-pl-10 wf-pr-12 wf-pt-6 wf-pb-7 wf-body_03-reg">
        <div class="wf_flex wf_items-center wf-space-x-4">
          <WelfareInputText
            size="small"
            :model-value="props.keywordProductBase"
            @update:model-value="(value) => emits('onChangeKeywordProductBase', value)"
            inputType="text"
            class="wf_flex wf_flex-1-0-0"
            :maxLength="TEXT_MAX_NUMBER_10"
            placeholder="상품 검색 키워드를 입력해 주세요."
          />
          <WelfareMdButton label="등록하기" buttonType="liner" buttonSize="small" @on-click="() => emits('handleAddTagKeywordBase')" />
        </div>
        <div class="wf-btn-border--ncc wf_flex wf_items-center wf-product-base-tag-wrap wf_flex-wrap wf-pl-8 wf-pr-5 wf-py-5 wf_br-4 wf_min-h-49">
          <WelfareTag
            v-for="(keyword, idx) in keywordsProductBase"
            v-bind:key="idx + keyword"
            @iconClick="() => emits('handleRemoveTagKeywordBase', idx)"
            >{{ keyword }}</WelfareTag
          >
        </div>
      </div>
    </div>
  </div>
</template>
