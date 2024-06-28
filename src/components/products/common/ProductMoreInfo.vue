<script setup lang="ts">
import { reactive } from 'vue'
import { WelfareInputText, WelfareRadio, WelfareRadioGroup } from '@/components/uikit'
import { WelfareRadioProps, YnOptions } from '@/models'

interface ProductMoreInfoProps {
  registerProductReview: string
  qaRegistration: string
  giveAGift: string
  minimumPurchaseQuantity: string
  maximumPurchaseQuantity: string
  isMinimumPurchaseQuantity: boolean
  isMaximumPurchaseQuantity: boolean
}

interface ProductMoreInfoEmits {
  (e: 'onChangeRegisterProductReview', value: boolean): void
  (e: 'onChangeQaRegistration', value: boolean): void
  (e: 'onChangeGiveAGift', value: boolean): void
  (e: 'onChangeMinimumPurchaseQuantity', value: string): void
  (e: 'onChangeMaximumPurchaseQuantity', value: string): void
  (e: 'onChangeIsMinimumPurchaseQuantity', value: string): void
  (e: 'onChangeIsMaximumPurchaseQuantity', value: string): void
}

const props = defineProps<ProductMoreInfoProps>()
const emits = defineEmits<ProductMoreInfoEmits>()

const options = reactive<WelfareRadioProps[]>([
  { label: '가능', value: YnOptions.Y },
  { label: '불가능', value: YnOptions.N }
])
</script>

<template>
  <div class="wf_flex wf_flex-col wf-btn-border--bg-color-line-gray wf_br-6 wf-mt-20">
    <slot name="moreInfo"></slot>
    <div class="wf_flex wf-btn-border-b--ncc wf_h-44">
      <div class="wf_flex wf_flex-1">
        <div
          class="wf-btn-border-r--ncc wf_flex wf_items-center wf_justify-start wf_h-44 wf-pl-14 wf-pr-11 wf-py-14 wf-btn-border-b--ncc wf-body_02-semi wf_text-n-33 wf_w-150 wf_bg-bg-gray wf-body_02-semi wf_text-n-33"
        >
          상품 리뷰 등록&nbsp;<span class="wf_text-sub-01">*</span>
        </div>
        <div class="wf_flex wf_items-center wf_justify-start wf_h-44 wf-pl-11 wf-pr-11 wf-pb-14 wf-pt-7 wf-body_03-reg wf_text--14 wf-w-550">
          <WelfareRadioGroup
            :model-value="props.registerProductReview"
            @update:model-value="(value) => emits('onChangeRegisterProductReview', value)"
            :options="options"
            size="sm"
          />
        </div>
      </div>
      <div class="wf_flex wf_flex-1">
        <div
          class="wf-btn-border-l--ncc wf-btn-border-r--ncc wf_flex wf_items-center wf_justify-start wf_h-44 wf-pl-14 wf-pr-11 wf-py-14 wf-btn-border-b--ncc wf-body_02-semi wf_text-n-33 wf_w-150 wf_bg-bg-gray"
        >
          Q&A 등록&nbsp;<span class="wf_text-sub-01">*</span>
        </div>
        <div class="wf_flex wf_items-center wf_justify-start wf_h-44 wf-pl-11 wf-pr-11 wf-pb-14 wf-pt-7 wf-body_03-reg wf_text--14">
          <WelfareRadioGroup
            :model-value="props.qaRegistration"
            @update:model-value="(value) => emits('onChangeQaRegistration', value)"
            :options="options"
            size="sm"
          />
        </div>
      </div>
      <div class="wf_flex wf_flex-1">
        <div
          class="wf-btn-border-l--ncc wf-btn-border-r--ncc wf_flex wf_items-center wf_justify-start wf_h-44 wf-pl-14 wf-pr-11 wf-py-14 wf-btn-border-b--ncc wf-body_02-semi wf_text-n-33 wf_w-150 wf_bg-bg-gray"
        >
          선물하기
        </div>
        <div class="wf_flex wf_items-center wf_justify-start wf_h-44 wf-pl-11 wf-pr-11 wf-pb-14 wf-pt-7 wf-body_03-reg wf_text--14">
          <WelfareRadioGroup
            :model-value="props.giveAGift"
            @update:model-value="(value) => emits('onChangeGiveAGift', value)"
            :options="options"
            size="sm"
          />
        </div>
      </div>
    </div>
    <div class="wf_flex wf-btn-border-b--ncc wf_h-44">
      <div class="wf_flex wf_flex-1">
        <div
          class="wf-btn-border-r--ncc wf_flex wf_items-center wf_justify-start wf_h-44 wf-pl-14 wf-pr-11 wf-py-14 wf-btn-border-b--ncc wf-body_02-semi wf_text-n-33 wf_w-150 wf_bg-bg-gray wf-body_02-semi wf_text-n-33"
        >
          최소 구매 수량&nbsp;<span class="wf_text-sub-01">*</span>
        </div>
        <div
          class="wf_flex wf_items-center wf_justify-start wf-space-x-21 wf_h-44 wf-pl-11 wf-pr-11 wf-pb-14 wf-pt-10 wf-body_03-reg wf_text--14 wf-w-550"
        >
          <div class="wf_flex wf-space-x-10">
            <WelfareRadio
              label="사용"
              :model-value="props.isMinimumPurchaseQuantity"
              @update:model-value="(value) => emits('onChangeIsMinimumPurchaseQuantity', value)"
              :value="true"
              class=""
              name="radio-sm-ck-di"
              size="sm"
            />
            <div class="wf_flex wf-space-x-8">
              <WelfareInputText
                size="small"
                inputType="number"
                :model-value="props.minimumPurchaseQuantity"
                @update:model-value="(value) => emits('onChangeMinimumPurchaseQuantity', value)"
                :disabled="!props.isMinimumPurchaseQuantity"
                class="wf_w-128"
                placeholder="숫자입력"
              />
              <div class="wf_flex wf_items-center wf-body_02-reg wf_text-n-33">
                개 이상 부터&nbsp; <span class="wf-body_04-reg wf_text-sub-01 wf-mt-1 wf-ml-2">*1회당 구매 가능 최소 수량</span>
              </div>
            </div>
          </div>
          <WelfareRadio
            label="사용 안함"
            :model-value="props.isMinimumPurchaseQuantity"
            @update:model-value="(value) => emits('onChangeIsMinimumPurchaseQuantity', value)"
            :value="false"
            class=""
            name="radio-sm-ck-di"
            size="sm"
          />
        </div>
      </div>
    </div>
    <div class="wf_flex wf_h-42">
      <div
        class="wf_br-bl--6 wf-btn-border-r--ncc wf_flex wf_items-center wf_justify-start wf-pl-14 wf-pr-11 wf-py-14 wf_w-150 wf-body_02-semi wf_text-n-33 wf_bg-bg-gray wf_h-42"
      >
        최대 구매 수량&nbsp;<span class="wf_text-sub-01">*</span>
      </div>
      <div class="wf_flex wf_items-center wf_justify-start wf_h-42 wf-pl-11 wf-pr-11 wf-pb-14 wf-pt-10 wf-space-x-21">
        <div class="wf_flex wf-space-x-10">
          <WelfareRadio
            label="사용"
            class="ml-109"
            :model-value="props.isMaximumPurchaseQuantity"
            @update:model-value="(value) => emits('onChangeIsMaximumPurchaseQuantity', value)"
            :value="true"
            name="radio-sm-ck-di2"
            size="sm"
          />
          <div class="wf_flex wf-space-x-8">
            <WelfareInputText
              size="small"
              inputType="number"
              :model-value="props.maximumPurchaseQuantity"
              @update:model-value="(value) => emits('onChangeMaximumPurchaseQuantity', value)"
              :disabled="!props.isMaximumPurchaseQuantity"
              class="wf_w-128"
              placeholder="숫자입력"
            />
            <div class="wf_flex wf_items-center wf-body_02-reg wf_text-n-33">
              개 이하 까지&nbsp; <span class="wf-body_04-reg wf_text-sub-01 wf-mt-1 wf-ml-2">*1회당 구매 가능 최대 수량</span>
            </div>
          </div>
        </div>
        <WelfareRadio
          label="사용 안함"
          class="ml-109"
          :model-value="props.isMaximumPurchaseQuantity"
          @update:model-value="(value) => emits('onChangeIsMaximumPurchaseQuantity', value)"
          :value="false"
          name="radio-sm-ck-di2"
          size="sm"
        />
      </div>
    </div>
  </div>
</template>