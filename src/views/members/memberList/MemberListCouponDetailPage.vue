<!-- BO_B0101_020401 -->
<script setup lang="ts">
import { PRODUCT_TICKET_ORDER_DETAIL_LIST, formatTime, FORMAT_DATE_YYYY_MM_DD_HH_mm_ss, formatNumberDot } from '@/common'
import { DataTableContainer, WelfareMdButton } from '@/components'
import { useMemberListCouponDetail } from '@/composables/members/memberList/useMemberListCouponDetail'
import {
  MemberDetailBaseTabProps,
  memberHeaderFieldTableMemberListCouponDetailConfig,
  MemberCouponDetailIssueEnum,
  MemberCouponDetailProductClassificationEnum
} from '@/models'
const props = defineProps<MemberDetailBaseTabProps>()
const { items, totalItems, isLoading, onPageChange, tableRef, onDownloadExcel, openComingSoonModal } = useMemberListCouponDetail(props)
</script>
<template>
  <div class="wf-mb-10 wf-member-list-coupon-detail">
    <DataTableContainer
      :value="items"
      :loading="isLoading"
      :total-records="totalItems"
      :column-configs="memberHeaderFieldTableMemberListCouponDetailConfig"
      @page-change="onPageChange"
      no-data-label="리스트가 없습니다"
      ref="tableRef"
    >
      <template #title>
        <h6 class="wf_text-n-33">조회 결과 &nbsp;총 {{ totalItems ?? 0 }}건</h6>
      </template>
      <template #buttons>
        <div class="wf-space-x-6 wf_flex">
          <WelfareMdButton @on-click="onDownloadExcel" label="엑셀 다운로드" class="wf_w-96" buttonType="liner" />
        </div>
      </template>
      <template #body-couponKey="{ props }">
        <span @click="openComingSoonModal" class="wf_text-sub-02" v-if="props.data.couponIssueType === MemberCouponDetailIssueEnum.DIRECT">
          <!-- BO_H0101_020101 don't have plan to develop-->
          <!-- <router-link class="wf_text-sub-02" target="_blank" to=""> -->
          {{ props.data.couponKey }}
          <!-- </router-link> -->
        </span>
        <span @click="openComingSoonModal" class="wf_text-sub-02" v-if="props.data.couponIssueType === MemberCouponDetailIssueEnum.AUTO">
          <!-- BO_H0102_020101 don't have plan to develop-->
          <!-- <router-link class="wf_text-sub-02" target="_blank" to=""> -->
          {{ props.data.couponKey }}
          <!-- </router-link> -->
        </span>
      </template>
      <template #body-orderKey="{ props }">
        <span
          @click="openComingSoonModal"
          class="wf_text-sub-02"
          v-if="props.data.productClassification === MemberCouponDetailProductClassificationEnum.DELIVERY"
        >
          <!-- BO_E0103_010101 don't have plan to develop-->
          <!-- <router-link class="wf_text-sub-02" target="_blank" to=""> -->
          {{ props.data.orderKey }}
          <!-- </router-link> -->
        </span>
        <!-- BO_E0203_010101 -->
        <span v-if="props.data.productClassification === MemberCouponDetailProductClassificationEnum.TICKET">
          <router-link class="wf_text-sub-02" target="_blank" :to="PRODUCT_TICKET_ORDER_DETAIL_LIST">
            {{ props.data.orderKey }}
          </router-link>
        </span>
      </template>
      <template #body-registrant="{ props }">
        <span> {{ props.data?.audit?.registerName }}&nbsp;({{ props.data?.audit?.registerKey }}) </span>
      </template>
      <template #body-usedDate="{ props }">
        <span>
          {{ props.data?.usedDate && formatTime(props.data?.usedDate, FORMAT_DATE_YYYY_MM_DD_HH_mm_ss) }}
        </span>
      </template>
      <template #body-registrationDateTime="{ props }">
        <span>
          {{ props.data?.audit?.registeredDate && formatTime(props.data?.audit?.registeredDate, FORMAT_DATE_YYYY_MM_DD_HH_mm_ss) }}
        </span>
      </template>
      <template #body-benefitValue="{ props }">
        <span>
          {{ props?.data?.benefitValue && formatNumberDot(props?.data?.benefitValue) }}
        </span>
      </template>
      <template #body-usedAmount="{ props }">
        <span>
          {{ props?.data?.usedAmount && formatNumberDot(props?.data?.usedAmount) }}
        </span>
      </template>
    </DataTableContainer>
  </div>
</template>

<script lang="ts">
export default {
  name: 'MemberListCouponDetailPage'
}
</script>

<style scoped>
@import url('@/assets/css/view/member/member-list-coupon-detail.css');
</style>
