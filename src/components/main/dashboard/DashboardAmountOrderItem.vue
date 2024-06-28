<script setup lang="ts">
import { DashboardAmountOrderModel } from './DashboardAmountOrder.vue'

interface DashboardAmountOrderItemProps {
  data: DashboardAmountOrderModel
}

const props = defineProps<DashboardAmountOrderItemProps>()
</script>

<template>
  <div class="wf-dashboard-amount-order-item ">
    <div class="wf_flex-col wf-header-slider wf_flex wf_items-center wf_justify-center wf_align-self-stretch wf-space-y-12">
      <span class="wf-title wf-sub_tit_01">판매가</span>
      <h2 class="wf-number">{{props.data.total}}</h2>
    </div>
    <div class="wf-div-border-center wf-mb-4"></div>
    <div class="wf-frame1000002079 wf_flex wf_flex-col wf_items-center wf_justify-center wf_align-self-stretch wf-space-y-26">
      <div class="wf-wrap wf_flex wf_items-start wf_justify-between wf_align-self-stretch wf-space-x-20">
        <div class="wf-item wf_flex-1-0-0 wf_flex wf_items-start wf_justify-center wf_flex-col wf-space-y-8">
          <span class="wf-title wf-body_03-reg">할인</span>
          <span class="wf-number wf-sub_tit_01">{{props.data.discount}}</span>
        </div>

        <div class="wf-item wf_flex-1-0-0 wf_flex wf_items-start wf_justify-center wf_flex-col wf-space-y-8">
          <span class="wf-title wf-body_03-reg">쿠폰할인</span>
          <span class="wf-number wf-sub_tit_01">{{props.data.discountTicket}}</span>
        </div>

        <div class="wf-item wf_flex-1-0-0 wf_flex wf_items-start wf_justify-center wf_flex-col wf-space-y-8">
          <span class="wf-title wf-body_03-reg">배송비</span>
          <span class="wf-number wf-sub_tit_01">{{props.data.deliveryFee}}</span>
        </div>
      </div>
      <div class="wf-wrap wf_flex wf_items-start wf_justify-between wf_align-self-stretch wf-space-x-20">
        <div class="wf-item wf_flex-1-0-0 wf_flex wf_items-start wf_justify-center wf_flex-col wf-space-y-8">
          <span class="wf-title wf-body_03-reg">실결제금액</span>
          <span class="wf-number wf-sub_tit_01">{{props.data.realMoney}}</span>
        </div>

        <div class="wf-item wf_flex-1-0-0 wf_flex wf_items-start wf_justify-center wf_flex-col wf-space-y-8">
          <span class="wf-title wf-body_03-reg">복지포인트결제</span>
          <span class="wf-number wf-sub_tit_01">{{props.data.benefitPoints}}</span>
        </div>

        <div class="wf-item wf_flex-1-0-0 wf_flex wf_items-start wf_justify-center wf_flex-col wf-space-y-8">
          <span class="wf-title wf-body_03-reg">추가결제</span>
          <span class="wf-number wf-sub_tit_01">{{props.data.extraFee}}</span>
        </div>
      </div>
      </div>
    </div>
</template>


