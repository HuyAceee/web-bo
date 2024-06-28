<!-- BO_E0203_020101_P -->
<script setup lang="ts">
import {
  deliveryCancelRequestModalTablePointExpireMockData,
  deliveryCancelRequestModalTableRestorationCouponInformationMockData
} from '@/assets/mockData/data/delivery/delivery-cancel-request-data'
import { formatNumberDot, renderLabelEnum } from '@/common'
import {
  DataTableContainer,
  DataTablePaginationWithCheckbox,
  HeaderModal,
  TextareaMaxLengthBytes,
  WelfareMdButton,
  WelfareSelect
} from '@/components'
import DeliveryHint from '@/components/delivery/modal/DeliveryHint.vue'
import FormGroup from '@/components/widgets/form/FormGroup.vue'
import { useDeliveryCancelRequestModalLogic } from '@/composables/delivery/modal/useDeliveryCancelRequestModalLogic'
import { deliveryClaimDetailReasonTypeOptions } from '@/models/views/delivery/common'
import {
  deliveryCancelRequestInfoHint,
  deliveryCancelRequestModalTableHeaderConfig,
  deliveryCancelRequestModalTablePointExpireHeaderConfig,
  deliveryCancelRequestModalTableRefundAmountHeaderConfig,
  deliveryCancelRequestModalTableRefundPaymentHeaderConfig,
  deliveryCancelRequestModalTableRestorationCouponInformationHeaderConfig,
  deliveryCancelRequestCaculateTotalFields
} from '@/models/views/delivery/modal/DeliveryCancelRequestModel'
import { DeliveryProductCashReceiptProps } from '@/models/views/delivery/modal/DeliveryProductCashReceiptModel'
import Column from 'primevue/column'

const props = defineProps<DeliveryProductCashReceiptProps>()

const {
  cancelFee,
  onRowSelected,
  onSelectAllChange,
  orderedTicketProducts,
  tableConfigs,
  onPageChange,
  handlePutOrderCancel,
  showModalChangeCancelFee,
  values,
  setFieldValue,
  deliveryCancelRequestModalTableRefundAmount,
  tableRef,
  isCaculated,
  handleCanculate,
  cancelRequestTableRefundPayment
} = useDeliveryCancelRequestModalLogic(props.id)
</script>

<template>
  <div class="wf-order-cancel-request">
    <HeaderModal title="취소신청" @close-modal="$props.onCancel" />
    <div class="wf-p-20 wf-pr-14 wf-width-full wf_flex wf_flex-col wf-space-y-19 wf-modal-scroll scrollbar-custom">
      <DeliveryHint :data="deliveryCancelRequestInfoHint" />
      <div class="wf-space-y-8" :class="{ 'wf-mt-20': !indexTable }" v-for="(table, indexTable) in tableConfigs" :key="indexTable">
        <span v-if="table.title" class="wf-body_01-semi">{{ table.title }}</span>
        <div class="wf-btn-border--bg-color-line-gray wf_br-6">
          <div
            class="wf_flex wf_items-center"
            :class="{ 'wf-h-42': indexRow === table.tableRows.length - 1 }"
            v-for="(row, indexRow) in table.tableRows"
            :key="indexRow"
          >
            <FormGroup
              class="wf_flex-1"
              :class="{ 'wf-h-42': indexRow === table.tableRows.length - 1 }"
              :custom-class="'wf-pb-1 wf-pl-11 ' + item.classNameValue"
              :is-rounded-top="!index"
              :is-rounded-bottom="indexRow === table.tableRows.length - 1"
              :is-border-left="!!index"
              :is-border-bottom="indexRow !== table.tableRows.length - 1"
              :label="item.title"
              v-for="(item, index) in row.rowItems"
              :key="index"
            >
              <span v-if="!item?.onClick" class="wf-body_03-reg wf_text-n-33">
                {{ item.value }}
              </span>
              <span v-else class="wf-body_03-reg wf_text-sub-02 wf-underline wf-pointer" @click="item.onClick">
                {{ item.value }}
              </span>
            </FormGroup>
          </div>
        </div>
      </div>
      <DataTablePaginationWithCheckbox
        ref="tableRef"
        :value="orderedTicketProducts"
        v-on:select-all-change="onSelectAllChange"
        v-on:row-checked-change="onRowSelected"
        @page-change="onPageChange"
        no-data-label="조회내용이 없습니다."
        :loading="false"
        is-select-invisible
        class="wf-mt-21"
      >
        <template #columns>
          <Column
            v-for="column in deliveryCancelRequestModalTableHeaderConfig"
            :key="column?.field"
            :column-key="column?.field"
            class="wf-nowrap"
            :class="column?.class"
          >
            <template #header>
              {{ column.header }}
            </template>
            <template #body="slotProps">
              <span
                v-if="column?.onClick"
                class="wf-underline wf_w-full wf-body_03-reg wf-pointer wf_text-sub-02 text-center"
                :class="slotProps.data?.isDisabled ? 'column-disable-bg' : ''"
              >
                {{ renderLabelEnum(column?.convertEnumValue ?? [], slotProps.data?.[column.field]) }}</span
              >
              <span v-else-if="deliveryCancelRequestCaculateTotalFields.includes(column.field)">{{
                formatNumberDot(slotProps.data[column.field])
              }}</span>
              <p v-else :class="slotProps.data?.isDisabled ? 'column-disable-bg' : ''">
                {{ renderLabelEnum(column?.convertEnumValue ?? [], slotProps.data?.[column.field]) }}
              </p>
            </template>
          </Column>
        </template>
        <template #title>
          <span class="wf-body_01-semi">취소 티켓 선택</span>
        </template>
      </DataTablePaginationWithCheckbox>
      <div class="wf-btn-border--bg-color-line-gray wf_br-6 wf-mt-10">
        <div class="wf_flex wf_items-center">
          <FormGroup custom-class="wf-pd-unset wf-pl-10" label="취소사유" is-rounded-top is-rounded-bottom>
            <WelfareSelect
              placeholder="취소 사유 선택해 주세요. 귀책에 따라 취소수수료 부과 여부가 결정됩니다."
              small
              class="wf-w-986"
              option-label="label"
              option-value="value"
              :options="deliveryClaimDetailReasonTypeOptions"
              :modelValue="values.cancelReasonCode"
              @update:modelValue="(value) => setFieldValue('cancelReasonCode', value)"
            />
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup
            custom-class="wf-pd-unset wf-pl-10 pl-13"
            label="기타메모"
            class="wf-h-151"
            is-rounded-top
            is-rounded-bottom
            :is-border-bottom="false"
          >
            <TextareaMaxLengthBytes
              :max-bytes="500"
              class="text-area-h-120 wf-width-full"
              placeholder="관리자용 기타메모입니다."
              :modelValue="values.cancelMemo"
              @update:modelValue="(value) => setFieldValue('cancelMemo', value)"
              label-bottom-left="* 관리자용 메모입니다."
            />
          </FormGroup>
        </div>
      </div>
      <div class="wf_flex wf_flex-col wf-gap-22 wf-mt-21">
        <DataTableContainer
          :value="deliveryCancelRequestModalTableRefundAmount"
          @page-change="() => {}"
          :column-configs="deliveryCancelRequestModalTableRefundAmountHeaderConfig"
          is-select-invisible
        >
          <template #title
            ><div class="wf_flex wf_flex-row wf_items-center wf-gap-22">
              <span class="wf-body_01-semi wf_text-n-33">환불금액</span>
              <WelfareMdButton button-size="small" button-type="liner" label="환불금액 계산하기" class="wf_w-113 wf-mt--1" @on-click="handleCanculate" />
            </div>
          </template>
          <template #body-cancelFee>
            <div class="wf_flex wf_flex-row wf_items-center wf-gap-10">
              <span class="wf-body_03-reg wf_text-n-33">{{ formatNumberDot(cancelFee) }} 원</span>
              <WelfareMdButton button-size="small" button-type="liner" label="취소수수료 변경" @on-click="showModalChangeCancelFee" />
            </div>
          </template>
        </DataTableContainer>
        <DataTableContainer
          :value="isCaculated ? cancelRequestTableRefundPayment : []"
          class="wf-mt--3"
          @page-change="() => {}"
          :column-configs="deliveryCancelRequestModalTableRefundPaymentHeaderConfig"
          is-select-invisible
          no-data-label="환불금액 계산하기 버튼을 클릭해 주세요."
        >
          <template #title
            ><div class="wf_flex wf_flex-row wf_items-center wf-gap-22">
              <span class="wf-body_01-semi wf_text-n-33">환불수단</span>
            </div>
          </template>
        </DataTableContainer>
        <DataTableContainer
          :value="isCaculated ? deliveryCancelRequestModalTablePointExpireMockData : []"
          @page-change="() => {}"
          :column-configs="deliveryCancelRequestModalTablePointExpireHeaderConfig"
          is-select-invisible
        >
          <template #title
            ><div class="wf_flex wf_flex-row wf_items-center wf-gap-22">
              <span class="wf-body_02-mid wf_text-n-33">ㅣ 소멸예정포인트</span>
              <WelfareMdButton button-size="small" button-type="liner" label="소멸 예정 포인트 확인하기" class="wf_w-151" />
            </div>
          </template>
        </DataTableContainer>
        <!-- <DataTableContainer
          :value="deliveryCancelRequestModalTableDepositProcessingHistoryMockData"
          class="wf-label-mb-10"
          @page-change="() => {}"
          :column-configs="deliveryCancelRequestModalTableDepositProcessingHistoryHeaderConfig"
          is-select-invisible
        >
          <template #title>
            <span class="wf-body_01-semi wf_text-n-33">적립금 처리 내역</span>
          </template>
        </DataTableContainer> -->
        <DataTableContainer
          :value="deliveryCancelRequestModalTableRestorationCouponInformationMockData"
          @page-change="() => {}"
          :column-configs="deliveryCancelRequestModalTableRestorationCouponInformationHeaderConfig"
          is-select-invisible
          class="wf-restoration-coupon-information"
        >
          <template #title>
            <span class="wf-body_01-semi wf_text-n-33">복원 쿠폰 정보</span>
          </template>
        </DataTableContainer>
      </div>
      <div class="wf-action-wrapper wf-mt-20">
        <WelfareMdButton button-type="cancel" label="닫기" class="wf_w-120" @on-click="$props.onCancel" />
        <WelfareMdButton button-type="default" label="취소신청" class="wf_w-120" @on-click="handlePutOrderCancel" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/order/modal/order-product-receipt-modal.css');
@import url('@/assets/css/view/order/modal/order-cancel-request-modal.css');
@import url('@/assets/css/view/delivery/modal/delivery-cancel-sell.css');
</style>
