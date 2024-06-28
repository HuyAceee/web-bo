<!-- BO_B0101_020402 -->
<script setup lang="ts">
import { DataTableContainer, WelfareMdButton } from '@/components'
import { useMemberListPointDetail } from '@/composables/members/memberList/useMemberListPointDetail'
import {
  MemberDetailBaseTabProps,
  memberHeaderFieldTableMemberListPointPaymentDetailConfig,
  memberHeaderFieldTableMemberListPointUsageDetailConfig,
  MemberPointDetailWelfarePointUseKindEnum,
  MemberCouponDetailProductClassificationEnum
} from '@/models'
import { MEMBER_POINT_ADJUSTMENT_REGISTRATION, MEMBER_POINTS_DEDUCTION, FORMAT_DATE_YYYY_MM_DD_HH_mm_ss, formatTime, formatNumberDot } from '@/common'
const props = defineProps<MemberDetailBaseTabProps>()
const {
  itemsPayment,
  totalItemsPayment,
  isLoadingPayment,
  onPageChangePayment,
  tablePaymentRef,
  itemsUsage,
  totalItemsUsage,
  isLoadingUsage,
  onPageChangeUsage,
  tableUsageRef,
  onDownloadExcelPayment,
  onDownloadExcelUsage,
  memberData
} = useMemberListPointDetail(props)
</script>
<template>
  <div class="wf-custom-table">
    <DataTableContainer
      ref="tablePaymentRef"
      :value="itemsPayment"
      :loading="isLoadingPayment"
      :total-records="totalItemsPayment"
      :column-configs="memberHeaderFieldTableMemberListPointPaymentDetailConfig"
      @page-change="onPageChangePayment"
      no-data-label="리스트가 없습니다."
    >
      <template #title>
        <div class="wf_flex wf_justify-center wf_items-center wf-space-x-20">
          <h6 class="wf_text-n-33">
            복지포인트 지급 내역&nbsp;(총&nbsp;{{ totalItemsPayment }}건, 사용가능 포인트 {{ memberData.value?.pointBalance ?? 0 }})
          </h6>
        </div>
      </template>
      <template #buttons>
        <div class="wf-space-x-6 wf_flex">
          <WelfareMdButton label="엑셀 다운로드" class="wf_w-96" buttonType="liner" @on-click="onDownloadExcelPayment" />
        </div>
      </template>
      <template #body-bend="{ props }">
        <span>
          {{ props.data.useKind.title }}
        </span>
      </template>
      <template #body-pointKey="{ props }">
        <router-link
          class="wf_text-sub-02"
          target="_blank"
          :to="`${MEMBER_POINT_ADJUSTMENT_REGISTRATION}?customerKey=${props.data.customerKey}&pointKey=${props.data.pointKey}`"
        >
          {{ props.data.pointKey }}
        </router-link>
      </template>
      <template #body-expirationPeriod="{ props }">
        <span>
          {{ props.data.useValidDate.startDate && formatTime(props.data.useValidDate.startDate, FORMAT_DATE_YYYY_MM_DD_HH_mm_ss) }} ~
          {{ props.data.useValidDate.endDate && formatTime(props.data.useValidDate.endDate, FORMAT_DATE_YYYY_MM_DD_HH_mm_ss) }}
        </span>
      </template>
      <template #body-registrant="{ props }">
        <span> {{ props.data?.auditing?.registerName }}&nbsp;{{ props.data?.auditing?.registerId }} </span>
      </template>
      <template #body-registrationDateTime="{ props }">
        <span>
          {{ props.data?.auditing?.registeredDate && formatTime(props.data?.auditing?.registeredDate, FORMAT_DATE_YYYY_MM_DD_HH_mm_ss) }}
        </span>
      </template>
      <template #body-pointAmount="{ props }">
        <span>
          {{ formatNumberDot(props.data?.pointAmount) ?? 0 }}
        </span>
      </template>
    </DataTableContainer>
    <hr class="wf_break-line-gray wf-my-26" />
    <DataTableContainer
      ref="tableUsageRef"
      :value="itemsUsage"
      :loading="isLoadingUsage"
      :total-records="totalItemsUsage"
      :column-configs="memberHeaderFieldTableMemberListPointUsageDetailConfig"
      @page-change="onPageChangeUsage"
      no-data-label="리스트가 없습니다."
    >
      <template #title>
        <div class="wf_flex wf_justify-center wf_items-center wf-space-x-20">
          <h6 class="wf_text-n-33">복지포인트 사용내역&nbsp;(총{{ totalItemsUsage ?? 0 }}건)</h6>
        </div>
      </template>
      <template #buttons>
        <div class="wf-space-x-6 wf_flex">
          <WelfareMdButton label="엑셀 다운로드" class="wf_w-96" buttonType="liner" @on-click="onDownloadExcelUsage" />
        </div>
      </template>
      <template #body-division="{ props }">
        <span>
          {{ props.data.useKind.title }}
        </span>
      </template>
      <template #body-pointKey="{ props }">
        <span v-if="props.data.useKind.code === MemberPointDetailWelfarePointUseKindEnum.DEDUCTED">
          <router-link class="wf_text-sub-02" target="_blank" :to="`${MEMBER_POINTS_DEDUCTION}?customerKey=${props.data.customerKey}`">
            {{ props.data.pointKey }}
          </router-link>
        </span>
        <span v-if="props.data.useKind.code === MemberPointDetailWelfarePointUseKindEnum.ADJUSTED">
          <router-link
            class="wf_text-sub-02"
            target="_blank"
            :to="`${MEMBER_POINT_ADJUSTMENT_REGISTRATION}?customerKey=${props.data.customerKey}&pointKey=${props.data.pointKey}`"
          >
            {{ props.data.pointKey }}
          </router-link>
        </span>
      </template>
      <template #body-orderKey="{ props }">
        <span v-if="props.data?.order?.orderKey === 0"> ORDER_KEY </span>
        <span
          v-if="props.data?.order?.orderKey !== 0 && props.data?.order?.productClass.code === MemberCouponDetailProductClassificationEnum.TICKET"
          class="wf_flex wf_justify-center wf-underline wf_w-full wf-body_03-reg wf-pointer wf_text-sub-02"
        >
          <!-- BO_E0108_010101_P don't have plan to develop -->
          {{ props.data.order.orderKey }}
        </span>
        <span
          v-if="props.data?.order?.orderKey !== 0 && props.data?.order?.productClass.code === MemberCouponDetailProductClassificationEnum.DELIVERY"
          class="wf_flex wf_justify-center wf-underline wf_w-full wf-body_03-reg wf-pointer wf_text-sub-02"
        >
          <!-- BO_E0207_010101_P don't have plan to develop -->
          {{ props.data.order.orderKey }}
        </span>
      </template>
      <template #body-registrant="{ props }">
        <span> {{ props.data?.auditing?.registerName }}&nbsp;{{ props.data?.auditing?.registerId ?? 'SYSTEM' }} </span>
      </template>
      <template #body-registrationDateTime="{ props }">
        <span>
          {{ props.data?.auditing?.registeredDate && formatTime(props.data?.auditing?.registeredDate, FORMAT_DATE_YYYY_MM_DD_HH_mm_ss) }}
        </span>
      </template>
      <template #body-pointAmount="{ props }">
        <span>
          {{ formatNumberDot(props.data?.pointAmount) ?? 0 }}
        </span>
      </template>
    </DataTableContainer>
  </div>
</template>
<style scoped>
@import url('@/assets/css/view/member/member-list-point-detail.css');
</style>

<script lang="ts">
export default {
  name: 'MemberListPointDetailPage'
}
</script>
