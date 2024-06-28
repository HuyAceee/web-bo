<script setup lang="ts">
import { WelfareTabUnderline, WelfareSwiper } from '@/components'
import { useSwiper } from '@/composables'
import { TabViewChangeEvent } from 'primevue/tabview'
import DashboardSessionTitleLink from './DashboardSessionTitleLink.vue'
import DashboardAmountOrderItem from './DashboardAmountOrderItem.vue'
import IconCircleArrowLeft from '@/components/icons/IconCircleArrowLeft.vue'
import IconCircleArrowRight from '@/components/icons/IconCircleArrowRight.vue'

export interface DashboardAmountOrderModel {
  total: string
  discount: string
  discountTicket: string
  deliveryFee: string
  realMoney: string
  benefitPoints: string
  extraFee: string
}

interface DashboardAmountOrderProps {
  data: DashboardAmountOrderModel[]
}

const props = defineProps<DashboardAmountOrderProps>()

const tabPanelProps = [
  { header: '총계', disabled: false, pt: {} },
  { header: '일반', disabled: false, pt: {} },
  { header: '상품권', disabled: false, pt: {} },
  { header: '설치', disabled: false, pt: {} }
]

const { indexActive, setIndex } = useSwiper()

const handleTabChange = (event: TabViewChangeEvent) => {
  setIndex(event.index)
}
</script>

<template>
  <div class="wf-dashboard-amount-order wf_flex wf_flex-col wf_items-center wf-space-y-20">
    <div class="wf-frame1000002113 wf-width-full wf_flex wf_items-center">
      <DashboardSessionTitleLink title="주문금액" subTitle="원" link="" linkTitle="내역 보러가기 " />
    </div>

    <div class="wf-width-full">
      <WelfareTabUnderline class="wf-mt--1 wf-ml--5" @tab-change="handleTabChange" :activeIndex="indexActive" :wfTabPanelProps="tabPanelProps" />
      <div class="wf-dashboard-amount-order-content">
        <WelfareSwiper>
          <template #content>
            <DashboardAmountOrderItem class="wf-swiper_item" v-for="(item, index) in props.data" v-bind:key="index" :data="item" />
          </template>
          <template #arrowleft>
            <div class="wf-swiper_arrow-left wf-arrow wf-disable wf_flex wf_items-center wf_justify-center wf-arrow-left">
              <IconCircleArrowLeft />
            </div>
          </template>
          <template #arrowright>
            <div class="wf-swiper_arrow-right wf-arrow wf_flex wf_items-center wf_justify-center wf-arrow-right">
              <IconCircleArrowRight />
            </div>
          </template>
        </WelfareSwiper>
      </div>
    </div>
  </div>
</template>
