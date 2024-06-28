<!-- BO_I0103_020301_P -->
<script setup lang="ts">
import { DataTablePaginationWithCheckbox, HeaderModal, WelfareMdButton } from '@/components'
import {
  ExhibitionCouponPromotionInquiryProps,
  exhibitionCouponPromotionInquiryTableConfig
} from '@/models/views/exhibition/modal/ExhibitionCouponPromotionInquiryModel'
import Column from 'primevue/column'
import FormGroup from '@/components/widgets/form/FormGroup.vue'
import { useExhibitionCouponPromotionInquiryModalLogic } from '@/composables/exhibition/modal/useExhibitionCouponPromotionInquiryModalLogic'
import { FORMAT_DATE_TIME_YYYY_MM_DD_HH_MM_SS } from '@/common'

const props = defineProps<ExhibitionCouponPromotionInquiryProps>()
const {
  items,
  tableRef,
  onSelectAllChange,
  onPageChange,
  onSelectCouponLink,
  onRowCheckedChange,
  totalItems,
  isLoading,
  onRowClick,
  couponDetailRef,
  selectedRowRef
} = useExhibitionCouponPromotionInquiryModalLogic(props)
</script>

<template>
  <div class="coupon-promotion-inquiry-modal wf_text-n-33">
    <HeaderModal title="쿠폰 프로모션 조회" @close-modal="props.onClose" />
    <div class="wf-p-20 wf-width-full wf_flex wf_flex-col">
      <DataTablePaginationWithCheckbox
        ref="tableRef"
        :value="items"
        :loading="isLoading"
        :total-records="totalItems"
        no-data-label="조회 내용이 없습니다."
        @select-all-change="onSelectAllChange"
        @row-checked-change="onRowCheckedChange"
        @page-change="onPageChange"
        @row-click="onRowClick"
        :select-props="{ options: [] }"
        class="wf_product-border-bottom-ncc wf-pb-20"
        row-hover
      >
        <template #title>
          <p class="wf-body_01-semi">쿠폰 목록</p>
        </template>
        <template #buttons>
          <WelfareMdButton
            label="선택 쿠폰 연결"
            buttonType="liner"
            buttonSize="small"
            class="wf_w-93 wf_color-button--blue"
            @click="onSelectCouponLink"
          />
        </template>
        <template #columns>
          <Column
            v-for="column in exhibitionCouponPromotionInquiryTableConfig"
            :key="column.field"
            :column-key="column.field"
            class="wf-nowrap"
            :class="column?.class"
          >
            <template #header>
              {{ column.header }}
            </template>
            <template #body="slotProps">
              <p :class="{ 'wf_table-single-selected-row--content': selectedRowRef === slotProps.data.id }">
                {{ slotProps.data?.[column.field] }}
              </p>
            </template>
          </Column>
        </template>
      </DataTablePaginationWithCheckbox>
      <p class="wf-body_01-semi wf-mt-21">쿠폰 상세 내역</p>
      <div class="wf-btn-border--bg-color-line-gray wf_br-6 wf-mt-15">
        <div class="wf_flex wf_items-center">
          <FormGroup label="쿠폰 코드" class="wf_h-44" custom-class="wf-body_03-reg" is-rounded-top is-border-bottom>
            {{ couponDetailRef?.couponKey }}
          </FormGroup>
          <FormGroup label="진행 상태" class="wf_h-44" custom-class="wf-body_03-reg" is-border-left>
            {{ couponDetailRef?.couponStatus }}
          </FormGroup>
          <FormGroup label="쿠폰 유형" class="wf_h-44" custom-class="wf-body_03-reg" is-border-left>
            {{ couponDetailRef?.couponType }}
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup label="쿠폰명" custom-class="wf-body_03-reg" is-rounded-top is-border-bottom>
            {{ couponDetailRef?.couponName }}
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup label="발급 유형" class="wf_h-44" custom-class="wf-body_03-reg" is-rounded-top is-border-bottom
            >{{ couponDetailRef?.issueType }}
          </FormGroup>
          <FormGroup label="발급 방법" class="wf_h-44" custom-class="wf-body_03-reg" is-border-left>
            {{ couponDetailRef?.issueMethod }}
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup label="적용 채널" class="wf_h-44" custom-class="wf-body_03-reg" is-rounded-top is-rounded-bottom :is-border-bottom="false"
            >{{ couponDetailRef?.applyChannelsString }}
          </FormGroup>
          <FormGroup label="혜택" class="wf_h-44" custom-class="wf-body_03-reg" is-border-left :is-border-bottom="false">
            {{ couponDetailRef?.benefitValue }}
          </FormGroup>
          <FormGroup label="대상상품" class="wf_h-44" custom-class="wf-body_03-reg" is-border-left :is-border-bottom="false">
            {{ couponDetailRef?.targetType }}
          </FormGroup>
        </div>
      </div>
      <div class="wf-btn-border--bg-color-line-gray wf_br-6 wf-mt-9 wf-mb--1">
        <div class="wf_flex wf_items-center">
          <FormGroup label="등록자" class="wf_h-44" custom-class="wf-body_03-reg" is-rounded-top is-border-bottom>
            {{ couponDetailRef?.couponRegisterManagerName ?? '회원명' }}
            ({{ couponDetailRef?.couponRegisterManagerId ?? '회원코드' }})
          </FormGroup>
          <FormGroup label="등록일시" class="wf_h-44" custom-class="wf-body_03-reg" is-border-left>
            {{ couponDetailRef?.couponRegisterDate ?? FORMAT_DATE_TIME_YYYY_MM_DD_HH_MM_SS }}
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup label="수정자" class="wf_h-44" custom-class="wf-body_03-reg" is-rounded-top :is-border-bottom="false" is-rounded-bottom>
            {{ couponDetailRef?.forceEndManagerName ?? '회원명' }} ({{ couponDetailRef?.forceEndManagerId ?? '회원코드' }})
          </FormGroup>
          <FormGroup label="수정일시" class="wf_h-44" custom-class="wf-body_03-reg" is-border-left>
            {{ couponDetailRef?.forceEndDate ?? FORMAT_DATE_TIME_YYYY_MM_DD_HH_MM_SS }}
          </FormGroup>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/exhibition/modal/exhibition-coupon-promotion-inquiry-modal.css');
@import url('@/assets/css/widgets/dataTable/data-table-container.css');
</style>
