<!-- BO_B0101_020301 -->
<script setup lang="ts">
import { FORMAT_DATE_YYYY_MM_DD_HH_mm_ss, getDateByFormat, renderLabelEnum, formatNumberDot } from '@/common'
import { DataTableContainer, WelfareBigButton, WelfareMdButton, WelfareSelect } from '@/components'
import FormGroup from '@/components/widgets/form/FormGroup.vue'
import FormGroupTimeLinesWithOutSelectForm from '@/components/widgets/form/FormGroupTimeLinesWithOutSelectFilterForm.vue'
import { useMemberListOrderDetail } from '@/composables/members/memberList/useMemberListOrderDetail'
import {
  DataHeaderMemberOrderDetailTableModalConfig,
  MemberCouponDetailProductClassificationEnum,
  MemberDetailBaseTabProps,
  MemberOrderChannelsLabel
} from '@/models'
const props = defineProps<MemberDetailBaseTabProps>()

const {
  optionProductClassification,
  optionPaymentMethod,
  values,
  items,
  isLoading,
  onPageChange,
  totalItems,
  setFieldValue,
  currentFilterDate,
  handleChangeCountDate,
  handleChangeValueSelect,
  handleResetFilter,
  onSubmitForm,
  openComingSoonModal,
  handleShowTicketDetails,
  exportOrdersExcel
} = useMemberListOrderDetail(props)
</script>
<template>
  <div>
    <div class="wf-btn-border--bg-color-line-gray wf_br-6">
      <div class="wf_flex wf_items-center">
        <FormGroup class="wf_flex-1" is-rounded-top label="주문 상태">
          <WelfareSelect
            class="wf_w-180"
            option-label="label"
            small
            placeholder="상품구분 전체"
            :options="optionProductClassification"
            :model-value="values.productClassification"
            @update:model-value="(value) => setFieldValue('productClassification', value)"
          />
        </FormGroup>
        <FormGroup class="wf_flex-1" is-border-left label="송장번호">
          <WelfareSelect
            class="wf_w-180"
            option-label="label"
            small
            placeholder="전체"
            :options="optionPaymentMethod"
            :model-value="values.paymentMethod"
            @update:model-value="(value) => setFieldValue('paymentMethod', value)"
          />
        </FormGroup>
      </div>
      <FormGroupTimeLinesWithOutSelectForm
        :is-border-bottom="false"
        is-rounded-bottom
        label="기간"
        :current-active-date="currentFilterDate"
        @on-change-filter-date="handleChangeCountDate"
        :from-date="values.fromDate"
        :to-date="values.toDate"
        @on-change-date-from="(value) => handleChangeValueSelect('fromDate', value)"
        @on-change-date-to="(value) => handleChangeValueSelect('toDate', value)"
      />
    </div>
    <div class="wf-mt-26 wf_flex wf_justify-center wf-space-x-4">
      <div class="wf_flex wf_items-center wf_justify-center wf-space-x-20">
        <WelfareBigButton type="reset" label="초기화" buttonType="neatral" @on-click="handleResetFilter" />
        <WelfareBigButton label="조회" buttonType="default" @on-click="onSubmitForm" />
      </div>
    </div>
    <hr class="wf_break-line-n33 wf-my-30" />
    <DataTableContainer
      :value="items"
      @page-change="onPageChange"
      :total-records="totalItems"
      :loading="isLoading"
      :column-configs="DataHeaderMemberOrderDetailTableModalConfig"
      ref="refTable"
    >
      <template #title>
        <h6 class="wf_text-n-33">조회 결과 &nbsp;(총 {{ totalItems ?? 0 }}건)</h6>
      </template>
      <template #buttons>
        <div class="wf-space-x-6 wf_flex">
          <WelfareMdButton @click="exportOrdersExcel" label="엑셀 다운로드" class="wf_w-93" buttonType="liner" />
        </div>
      </template>
      <template #body-orderKey="{ props }">
        <!-- screen BO_E0108_010101_P not ready yet -->
        <span
          @click="openComingSoonModal"
          class="wf_text-sub-02"
          v-if="props.data.productClassification === MemberCouponDetailProductClassificationEnum.DELIVERY"
        >
          {{ props.data.orderKey }}
        </span>
        <!-- BO_E0207_010101_P  -->
        <span
          @click="handleShowTicketDetails(props.data?.orderKey)"
          class="wf_text-sub-02"
          v-if="props.data.productClassification === MemberCouponDetailProductClassificationEnum.TICKET"
        >
          {{ props.data.orderKey }}
        </span>
      </template>
      <template #body-receiverName="{ props }">
        <span>
          {{
            props.data?.orderMemberReceiverResponses?.length === 1
              ? props.data?.orderMemberReceiverResponses[0]?.receiverName
              : props.data?.orderMemberReceiverResponses?.length > 1
                ? props.data?.orderMemberReceiverResponses[0]?.receiverName + ` 외 ${props.data?.orderMemberReceiverResponses.length - 1} 명`
                : '-'
          }}
        </span>
      </template>
      <template #body-paymentDatetime="{ props }">
        <span>
          {{ getDateByFormat(props.data.paymentDatetime, FORMAT_DATE_YYYY_MM_DD_HH_mm_ss) }}
        </span>
      </template>
      <template #body-receiverPhoneNumber="{ props }">
        <span>
          {{
            props.data?.orderMemberReceiverResponses?.length === 1
              ? props.data?.orderMemberReceiverResponses[0]?.receiverPhoneNumber
              : props.data?.orderMemberReceiverResponses?.length > 1
                ? props.data?.orderMemberReceiverResponses[0]?.receiverPhoneNumber + ` 외 ${props.data?.orderMemberReceiverResponses.length - 1} 개`
                : '-'
          }}
        </span>
      </template>
      <template #body-receiverAddress="{ props }">
        <span>
          {{
            props.data?.orderMemberReceiverResponses?.length === 1
              ? props.data?.orderMemberReceiverResponses[0]?.receiverAddress
              : props.data?.orderMemberReceiverResponses?.length > 1
                ? props.data?.orderMemberReceiverResponses[0]?.receiverAddress + ` 외 ${props.data?.orderMemberReceiverResponses.length - 1} 개`
                : '-'
          }}
        </span>
      </template>
      <template #body-orderChannel="{ props }">
        <span>
          {{ renderLabelEnum(MemberOrderChannelsLabel, props?.data?.orderChannel) }}
        </span>
      </template>
      <template #body-totalProductAmount="{ props }">
        <span>
          {{ props?.data?.totalProductAmount && formatNumberDot(props?.data?.totalProductAmount) }}
        </span>
      </template>
      <template #body-immediatelyDiscountAmount="{ props }">
        <span>
          {{ props?.data?.immediatelyDiscountAmount && formatNumberDot(props?.data?.immediatelyDiscountAmount) }}
        </span>
      </template>
      <template #body-orderCouponDiscountAmount="{ props }">
        <span>
          {{ props?.data?.orderCouponDiscountAmount && formatNumberDot(props?.data?.orderCouponDiscountAmount) }}
        </span>
      </template>
      <template #body-lastOrderAmount="{ props }">
        <span>
          {{ props?.data?.lastOrderAmount && formatNumberDot(props?.data?.lastOrderAmount) }}
        </span>
      </template>
      <template #body-deliveryAmount="{ props }">
        <span>
          {{ props?.data?.deliveryAmount && formatNumberDot(props?.data?.deliveryAmount) }}
        </span>
      </template>
      <template #body-deliveryDiscountAmount="{ props }">
        <span>
          {{ props?.data?.deliveryDiscountAmount && formatNumberDot(props?.data?.deliveryDiscountAmount) }}
        </span>
      </template>
      <template #body-lastPaymentAmount="{ props }">
        <span>
          {{ props?.data?.lastPaymentAmount && formatNumberDot(props?.data?.lastPaymentAmount) }}
        </span>
      </template>
      <template #body-cancelProductAmount="{ props }">
        <span>
          {{ props?.data?.cancelProductAmount && formatNumberDot(props?.data?.cancelProductAmount) }}
        </span>
      </template>
      <template #body-claimDeliveryAmount="{ props }">
        <span>
          {{ props?.data?.claimDeliveryAmount && formatNumberDot(props?.data?.claimDeliveryAmount) }}
        </span>
      </template>
      <template #body-remainingPaymentAmount="{ props }">
        <span>
          {{ props?.data?.remainingPaymentAmount && formatNumberDot(props?.data?.remainingPaymentAmount) }}
        </span>
      </template>
      <template #body-welfarePointPaymentAmount="{ props }">
        <span>
          {{ props?.data?.welfarePointPaymentAmount && formatNumberDot(props?.data?.welfarePointPaymentAmount) }}
        </span>
      </template>
      <template #body-pgPaymentAmount="{ props }">
        <span>
          {{ props?.data?.pgPaymentAmount && formatNumberDot(props?.data?.pgPaymentAmount) }}
        </span>
      </template>
    </DataTableContainer>
  </div>
</template>

<script lang="ts">
export default {
  name: 'MemberListOrderDetailPage'
}
</script>
