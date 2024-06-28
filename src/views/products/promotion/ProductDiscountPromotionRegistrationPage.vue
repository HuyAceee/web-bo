<!-- BO_C0401_020101 -->

<script setup lang="ts">
import { TextInputNumber, WelfareRadioGroup } from '@/components'
import ProductBorderBottomTitle from '@/components/products/deliveryProduct/registerAndEdit/ProductBorderBottomTitle.vue'
import ProductBottomButton from '@/components/products/common/ProductBottomButton.vue'
import ProductSearchModalWithTableWrapper from '@/components/products/common/ProductSearchModalWithTableWrapper.vue'
import { WelfareDateTimePicker, WelfareMdButton } from '@/components/uikit'
import { TextInputWithMaxLengthCharacters } from '@/components/widgets'
import { useProductPromotionRegister } from '@/composables/products/promotion/useProductPromotionRegister'
import { ProductPromotionRegisterConfig, ProductSearchType } from '@/models'
import ProductDataTable from '@/components/products/promotion/ProductDataTable.vue'
import { FORMAT_DATE_TIME_YYYY_MM_DD_HH_MM_SS, formatTime } from '@/common'
import Column from 'primevue/column'
import { isOnCoupon } from '@/models/views/products/modal/ProductSearchProductModalModel'

const {
  values,
  handleChangeValueField,
  handleOpenModal,
  setFieldValue,
  handleCancel,
  handleCancelInBulk,
  handleSave,
  handleDateChange,
  handleAddMultipleDiscount,
  handleDeleteRecord,
  handleCloseDiscountPromotion,
  dataPromotionInfo,
  discountPromotionKey,
  handleChangeCouponApplies,
  productCreatedBy
} = useProductPromotionRegister()
</script>

<template>
  <div class="wf-product-menu-wrap wf-mt--1 wf-ml--1 wf-mr--1">
    <div class="wf_flex wf_flex-col wf-btn-border--bg-color-line-gray wf_br-6 wf-mb-20">
      <div class="wf_flex wf_flex-1">
        <div
          class="wf-btn-border-r--ncc wf_br-tl--6 wf_br-bl--6 wf_flex wf_items-center wf_justify-start wf_h-42 wf-pl-14 wf-pr-11 wf-py-14 wf-body_02-semi wf_text-n-33 wf_w-150 wf_bg-bg-gray wf-body_02-semi wf_text-n-33"
        >
          할인 구분
        </div>
        <div class="wf_flex wf_h-42 wf-body_03-reg wf-pl-11 wf_text--14 wf-w-550">
          <WelfareRadioGroup
            :options="ProductPromotionRegisterConfig.discountCatOptions"
            :model-value="values.discountCat"
            size="sm"
            @update:model-value="(value) => handleChangeValueField('discountCat', value)"
          />
        </div>
      </div>
    </div>

    <ProductBorderBottomTitle class="wf-mb-20 wf-pb-10">할인 프로모션 설정</ProductBorderBottomTitle>

    <div class="wf_flex wf_flex-col wf-btn-border--bg-color-line-gray wf-mb-20 wf_br-6">
      <div class="wf_flex wf-btn-border-b--ncc wf_h-44">
        <div class="wf_flex wf_flex-1">
          <div
            class="wf-btn-border-b--ncc wf-btn-border-r--ncc wf_br-tl--6 wf_flex wf_items-center wf_justify-start wf_h-44 wf-pl-14 wf-pr-11 wf-py-14 wf-body_02-semi wf_text-n-33 wf_w-150 wf_bg-bg-gray wf-body_02-semi wf_text-n-33"
          >
            판매사&nbsp;<span class="wf_text-sub-01">*</span>
          </div>
          <div class="wf_flex wf_items-center wf_justify-start wf_h-42 wf-pl-11 wf-body_03-reg wf_text--14 wf-w-550 gap-4">
            <ProductSearchModalWithTableWrapper
              ref="searchSellerKeyRef"
              @selectValue="
                (value) => {
                  setFieldValue('seller', value)
                }
              "
              :default-value="values.sellerFromApi"
              class="wf-product-base-info-search"
              :type="ProductSearchType.SELLER"
              placeholder-input="판매사 조회"
              label-button="조회"
              :disabled="false"
            />
          </div>
        </div>
        <div class="wf_flex wf_flex-1">
          <div
            class="wf-btn-border-b--ncc wf-btn-border-l--ncc wf-btn-border-r--ncc wf_flex wf_items-center wf_justify-start wf_h-44 wf-pl-14 wf-pr-11 wf-py-14 wf-body_02-semi wf_text-n-33 wf_w-151 wf_bg-bg-gray"
          >
            프로모션 기간&nbsp;<span class="wf_text-sub-01">*</span>
          </div>
          <div class="wf_flex wf_items-center wf_justify-start wf_h-44 wf-pl-11 wf-pb-2 wf-body_03-reg wf_text--14">
            <WelfareDateTimePicker
              :model-value="values.discountPeriodBegin"
              size="small"
              format="YYYY.MM.DD hh:mm:ss"
              @update:model-value="(date) => handleDateChange('beginDate', date, values.discountPeriodEnd)"
            />&nbsp;~&nbsp;&nbsp;
            <WelfareDateTimePicker
              :model-value="values.discountPeriodEnd"
              size="small"
              format="YYYY.MM.DD hh:mm:ss"
              @update:model-value="(date) => handleDateChange('endDate', values.discountPeriodBegin, date)"
            />
          </div>
        </div>
      </div>
      <div class="wf_flex">
        <div class="wf_flex wf_flex-1">
          <div
            class="wf-btn-border-r--ncc wf_br-tl--6 wf_br-bl--6 wf_flex wf_items-center wf_justify-start wf_h-42 wf-pl-14 wf-pr-11 wf-py-14 wf-body_02-semi wf_text-n-33 wf_w-150 wf_bg-bg-gray wf-body_02-semi wf_text-n-33"
          >
            프로모션 명&nbsp;<span class="wf_text-sub-01">*</span>
          </div>
          <div class="wf_flex wf_items-center wf_justify-start wf_h-42 wf-px-11 wf-body_03-reg wf_text--14 wf_flex-grow-1">
            <TextInputWithMaxLengthCharacters
              class="wf_flex wf_flex-grow-1"
              :model-value="values.promotionName"
              @update:model-value="(val) => setFieldValue('promotionName', val)"
              size="small"
              placeholder="한글기준 30자 이내로 입력"
              :max-length="30"
              :hidden-warning="false"
            />
          </div>
        </div>
        <div class="wf_flex wf_flex-1">
          <div
            class="wf-btn-border-l--ncc wf-btn-border-r--ncc wf_flex wf_items-center wf_justify-start wf_h-42 wf-pl-14 wf-pr-11 wf-py-14 wf-body_02-semi wf_text-n-33 wf_w-151 wf_bg-bg-gray"
          >
            프로모션코드
          </div>
          <div class="wf_flex wf_items-center wf_justify-start wf_h-42 wf-pl-11 wf-pr-11 wf-pt-1 wf-body_03-reg wf_text--14">
            {{ values.promotionCode }}
          </div>
        </div>
      </div>
    </div>

    <div class="wf_flex wf_flex-col wf-btn-border--bg-color-line-gray wf_br-6 wf-mb-10">
      <div class="wf_flex wf_flex-1">
        <div
          class="wf-btn-border-r--ncc wf_br-tl--6 wf_br-bl--6 wf_flex wf_items-center wf_justify-start wf_h-42 wf-pl-14 wf-pr-11 wf-py-14 wf-body_02-semi wf_text-n-33 wf_w-150 wf_bg-bg-gray wf-body_02-semi wf_text-n-33"
        >
          대상 상품&nbsp;<span class="wf_text-sub-01">*</span>
        </div>
        <div class="wf_flex wf_items-center wf_justify-start wf_h-42 wf-pl-11 wf-body_03-reg wf_text--14 wf-w-550">
          <!-- search product -->
          <WelfareMdButton button-type="liner" button-size="small" label="대상상품 등록" @on-click="handleOpenModal" />
          <!-- search product -->
        </div>
      </div>
    </div>

    <ProductDataTable class="wf-mt-5 wf-mb-20 product-table" :data="values.product">
      <template #action-button>
        <Column key="action-button" columnKey="action-button" header="수정">
          <template #body="slotProps">
            <WelfareMdButton @click="handleDeleteRecord(slotProps.data.productKey)" label="삭제" buttonType="liner" buttonSize="small" />
          </template>
        </Column>
      </template>
    </ProductDataTable>

    <div class="wf_flex wf_flex-col wf-btn-border--bg-color-line-gray wf_br-6">
      <div class="wf_flex wf_h-42">
        <div class="wf_flex wf_flex-1">
          <div
            class="wf-btn-border-r--ncc wf_br-tl--6 wf_br-bl--6 wf_flex wf_items-center wf_justify-start wf_h-42 wf-pl-14 wf-pr-11 wf-py-14 wf-body_02-semi wf_text-n-33 wf_w-150 wf_bg-bg-gray wf-body_02-semi wf_text-n-33"
          >
            쿠폰 적용 여부&nbsp;<span class="wf_text-sub-01">*</span>
          </div>
          <div class="wf_flex wf_items-center wf_justify-start wf_h-42 wf-pl-11 wf-pr-11 wf-body_03-reg wf_text--14 wf-w-550">
            <WelfareRadioGroup
              :options="ProductPromotionRegisterConfig.couponAppliesOptions"
              :model-value="values.couponApplies"
              size="sm"
              @update:model-value="(value) => handleChangeCouponApplies(value)"
            />
          </div>
        </div>
        <div class="wf_flex wf_flex-1">
          <div
            class="wf-w-187 wf-btn-border-l--ncc wf-btn-border-r--ncc wf_flex wf_items-center wf_h-42 wf-pl-14 wf-pr-11 wf-py-14 wf-body_02-semi wf_text-n-33 wf_bg-bg-gray"
          >
            할인 금액&nbsp;<span class="wf_text-sub-01">*</span>
          </div>
          <div class="wf_flex wf-width-full wf_justify-between wf_items-center wf_h-42 wf-pl-12 wf-pr-11 wf-body_03-reg wf_text--14 wf-ml--1">
            <div class="wf_flex wf_items-center">
              <TextInputNumber
                placeholder="- 없이 숫자만 입력 해주세요."
                class="text-align-right"
                format-value
                should-check-press-key
                size="small"
                :modelValue="values.discountAmount"
                @update:model-value="(value) => setFieldValue('discountAmount', value)"
              />
              &nbsp;&nbsp;<span>원</span>
            </div>
            <WelfareMdButton button-type="liner" button-size="small" label="대상상품 적용" @click="handleAddMultipleDiscount" />
          </div>
        </div>
      </div>
    </div>

    <div class="alert-txt wf-mt-10">※프로모션 기간만료 및 중지 후 재진행은 신규 프로모션을 등록 해주세요.</div>
    <ProductDataTable :value="values.productDiscounted" class="wf-mt-8 wf-mb-21" is-registration>
      <template #action-button>
        <Column key="action-button" columnKey="action-button" header="수정">
          <template #body="slotProps">
            <WelfareMdButton
              v-if="discountPromotionKey && slotProps?.data?.progressYn !== ''"
              @click="handleCloseDiscountPromotion(slotProps.data)"
              :disabled="slotProps?.data?.progressYn === isOnCoupon.notApplicable"
              label="중지"
              buttonType="liner"
              buttonSize="small"
            />
          </template>
        </Column>
      </template>
    </ProductDataTable>

    <ProductBorderBottomTitle class="wf-pb-9">등록정보</ProductBorderBottomTitle>

    <div class="wf_flex wf_flex-col wf-btn-border--bg-color-line-gray wf_br-6 wf-mt-21 wf-mb-30">
      <div class="wf_flex">
        <div class="wf_flex wf_flex-1">
          <div
            class="wf-btn-border-r--ncc wf_br-tl--6 wf_br-bl--6 wf_flex wf_items-center wf_justify-start wf_h-42 wf-pl-14 wf-pr-11 wf-py-14 wf-body_02-semi wf_text-n-33 wf_w-150 wf_bg-bg-gray wf-body_02-semi wf_text-n-33"
          >
            등록자
          </div>
          <div class="wf_flex wf_items-center wf_justify-start wf_h-42 wf-pl-11 wf-pr-11 wf-pb-2 wf-body_03-reg wf_text--14 wf-w-550">
            {{ productCreatedBy }}
          </div>
        </div>
        <div class="wf_flex wf_flex-1">
          <div
            class="wf-btn-border-l--ncc wf-btn-border-r--ncc wf_flex wf_items-center wf_justify-start wf_h-42 wf-pl-14 wf-pr-11 wf-py-14 wf-body_02-semi wf_text-n-33 wf_w-151 wf_bg-bg-gray"
          >
            등록 일시
          </div>
          <div class="wf_flex wf_items-center wf_justify-start wf_h-42 wf-pl-11 wf-pr-11 wf-pt-1 wf-body_03-reg wf_text--14">
            {{ dataPromotionInfo?.createdByName && formatTime(dataPromotionInfo?.createdDate, FORMAT_DATE_TIME_YYYY_MM_DD_HH_MM_SS) }}
          </div>
        </div>
      </div>
    </div>

    <ProductBottomButton
      temporary-label="일괄중지"
      class="action-btn"
      @on-cancel-click="handleCancel"
      @on-temporary-click="handleCancelInBulk"
      @on-save-click="handleSave"
      preview-visible
      approval-visible
    />
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/product/promotion/product-promotion-register-discount.css');
</style>
