<script lang="ts" setup>
import { TextareaMaxLength } from '@/components'
import FormGroup from '@/components/widgets/form/FormGroup.vue'
import WelfareMdButton from '@/components/uikit/button/WelfareMdButton.vue'
import { ComplaintOrderCancelDetailFormModel } from '@/models/views/complaint/modal/ComplaintOrderCancelDetailModel'
import { FORMAT_DATE_TIME_YYYY_MM_DD_HH_MM_SS, formatTime, MEMBER_DETAIL_INFO, DEFAULT_DATE_TIME_FORMAT } from '@/common'
import { computed } from 'vue'
import { deliveryOrderProcessStatusCommonCodeName } from '@/models/views/delivery/modal/DeliveryIssuanceDelayInfoModel'

interface ComplaintOrderCancelDetailFilterProps {
  dataOrderCancel?: ComplaintOrderCancelDetailFormModel
}

interface ComplaintOrderCancelDetailFilterEmits {
  (e: 'update-memo-notes', value: string): void

  (e: 'submit-memo-notes'): void
  (e: 'show-ticket-details', value: number): void
}

const props = defineProps<ComplaintOrderCancelDetailFilterProps>()
const emits = defineEmits<ComplaintOrderCancelDetailFilterEmits>()

const emitEvent = {
  updateMemoNotes: (value: string) => {
    emits('update-memo-notes', value)
  },
  submitMemoNotes: () => {
    emits('submit-memo-notes')
  },
  showTicketDetails: (value: number) => {
    emits('show-ticket-details', value)
  }
}

const historyMessage = computed(() => {
  return props?.dataOrderCancel?.claimTicketDetails?.[0]?.claimTicketHistories?.map((item) => {
    return `${item.handlerName}  (${formatTime(item.handleDatetime, DEFAULT_DATE_TIME_FORMAT)}) ${
      deliveryOrderProcessStatusCommonCodeName?.find((itemValue) => itemValue.value === item?.claimProcess)?.label ?? ''
    }  ${item.claimProductKey} , ${item.processHistoryKey}`
  })
})
</script>

<template>
  <p class="wf-body_01-semi wf-pt-3 wf-pb-12">취소신청정보</p>
  <div class="wf-group-filter">
    <div class="wf_flex wf_flex-col wf-mt-0">
      <div class="wf_flex wf_items-center wf_br-b">
        <FormGroup class="wf-width-full" is-rounded-top label="클레임코드" :isBorderBottom="false"
          ><p class="wf-body_03-reg">
            {{ dataOrderCancel?.claimKey }}
          </p>
        </FormGroup>
      </div>
      <div class="wf_flex wf_flex-row">
        <div class="wf-w-1-2">
          <FormGroup label="신청일시">
            <p class="wf-body_03-reg">
              {{ dataOrderCancel?.applyDatetime && formatTime(dataOrderCancel.applyDatetime, FORMAT_DATE_TIME_YYYY_MM_DD_HH_MM_SS) }}
            </p>
          </FormGroup>
        </div>
        <div class="wf-w-1-2">
          <FormGroup label="클레임 신청자" is-border-left>
            <p class="wf-body_03-reg">
              {{ dataOrderCancel?.applierName }} <span v-if="dataOrderCancel?.applierCode"> ({{ dataOrderCancel?.applierCode }})</span>
            </p>
          </FormGroup>
        </div>
      </div>
      <div class="wf_flex wf_flex-row wf-width-full">
        <FormGroup class="wf_flex-1" custom-class="wf-pr-8" label="주문코드">
          <span
            @click="emitEvent.showTicketDetails(dataOrderCancel?.orderKey as number)"
            class="wf-body_03-reg wf_text-sub-02 wf-underline wf-pointer"
          >
            {{ dataOrderCancel?.orderKey }}
          </span>
        </FormGroup>
      </div>
      <div class="wf_flex wf_flex-row">
        <div class="wf-w-1-2">
          <FormGroup label="회원명">
            <router-link
              target="_blank"
              :to="{ path: `${MEMBER_DETAIL_INFO}`, query: { memberKey: dataOrderCancel?.memberKey } }"
              class="wf-body_03-reg wf_text-sub-02 wf-underline wf-pointer"
            >
              {{ dataOrderCancel?.memberName }} <span v-if="dataOrderCancel?.memberKey">({{ dataOrderCancel?.memberKey }})</span>
            </router-link>
          </FormGroup>
        </div>
        <div class="wf-w-1-2">
          <FormGroup label="로그인 아이디" is-border-left>
            <p class="wf-body_03-reg">{{ dataOrderCancel?.memberId }}</p>
          </FormGroup>
        </div>
      </div>
      <div class="wf_flex wf_flex-row">
        <div class="wf-w-1-2">
          <FormGroup label="고객사">
            <p class="wf-body_03-reg">{{ dataOrderCancel?.companyName }}</p>
          </FormGroup>
        </div>
        <div class="wf-w-1-2">
          <FormGroup label="휴대폰번호" is-border-left>
            <p class="wf-body_03-reg">{{ dataOrderCancel?.memberPhoneNumber }}</p>
          </FormGroup>
        </div>
      </div>
      <div class="wf_flex wf_br-b">
        <FormGroup class="wf_flex-1 form-group-padding wf_h-unset" is-rounded-top is-rounded-bottom :is-border-bottom="false" label="처리내역로그">
          <div class="wf-space-y-3">
            <p class="wf-body_03-reg" v-for="(item, index) in historyMessage" :key="index">{{ item }}</p>
          </div>
        </FormGroup>
      </div>
      <div class="wf_flex wf_flex-row wf-width-full">
        <FormGroup class="wf_flex-1" label="주문취소철회사유"
          ><p class="wf-body_03-reg">{{ dataOrderCancel?.sellerName }}</p>
        </FormGroup>
      </div>
      <div class="wf_flex wf_flex-row wf-width-full wf_h-155">
        <FormGroup class="wf_flex-1 wf_h-154" custom-class="wf-pr-8" label="기타메모" :is-border-bottom="false" is-rounded-bottom>
          <TextareaMaxLength
            size="small"
            :model-value="dataOrderCancel?.etcMemoContents"
            class="input-textarea-h"
            @update:model-value="
              (value) => {
                emitEvent.updateMemoNotes(value)
              }
            "
            :max-length="500"
            label-bottom-left="* 관리자용 메모입니다."
            :label-bottom-right="`${dataOrderCancel?.etcMemoContents?.length || 0}/500 bytes`"
            placeholder="유선으로 주문취소 요청하여 처리"
          />
          <div class="wf_flex wf-height-full wf_items-end wf-pb-27 pl-button-5 wf-mr-4">
            <WelfareMdButton label="저장" buttonType="default" @on-click="emitEvent.submitMemoNotes" button-size="small" class="wf_w-44" />
          </div>
        </FormGroup>
      </div>
    </div>
  </div>
  <p class="wf-body_01-semi wf-pb-12 wf-mt-18">판매 업체 정보</p>
  <div class="wf-group-filter wf_h-44">
    <div class="wf_flex wf_flex-col wf-mt-0">
      <div class="wf_flex wf_flex-row">
        <div class="wf-w-1-2">
          <FormGroup label="판매사" class="wf_h-42" is-rounded-top :is-border-bottom="false" is-rounded-bottom>
            <p class="wf-body_03-reg">
              {{ dataOrderCancel?.sellerName }} <span v-if="dataOrderCancel?.sellerKey"> ({{ dataOrderCancel?.sellerKey }})</span>
            </p>
          </FormGroup>
        </div>
        <div class="wf-w-1-2">
          <FormGroup label="하위업체" class="wf_h-42" is-border-left :is-border-bottom="false">
            <p class="wf-body_03-reg">{{ dataOrderCancel?.subcontract }}</p>
          </FormGroup>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/complaint/modal/complaint-order-cancel-modal.css');
</style>
