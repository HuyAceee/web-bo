<!-- BO_E0207_050101_P -->
<script setup lang="ts">
import { HeaderModal, WelfareMdButton } from '@/components'
import { useDeliveryCustomerInfoModal } from '@/composables/delivery/modal/useDeliveryCustomerInfoModal'
import { DeliveryCustomerInfoModel } from '@/models/views/delivery/modal/DeliveryCustomerInfoModel'
import { computed } from 'vue'

export interface Props {
  data: DeliveryCustomerInfoModel
}

const { closeModalByPop } = useDeliveryCustomerInfoModal()

const props = defineProps<Props>()

const dataView = computed(() => {
  const {
    customerKey,
    customerName,
    bizRegNum,
    corpRegNum,
    contractEndDate,
    contractStartDate,
    representativeName,
    streetAddress,
    masterAccountName,
    masterAccountPhone
  } = props.data
  return [
    {
      title: '고객사 코드',
      content: customerKey,
      underline: true
    },
    {
      title: '고객사명',
      content: customerName
    },
    {
      title: '사업자번호',
      content: bizRegNum
    },
    {
      title: '법인등록번호',
      content: corpRegNum
    },
    {
      title: '계약기간',
      content: contractStartDate && contractEndDate ? contractEndDate + '~' + contractStartDate : ''
    },
    {
      title: '대표자',
      content: representativeName
    },
    {
      title: '사업장',
      content: streetAddress
    },
    {
      title: '마스터계정',
      content: masterAccountName
    },
    {
      title: '휴대폰 번호',
      content: masterAccountPhone
    }
  ]
})
</script>

<template>
  <div class="wf-manager-info wf_text-n-33">
    <HeaderModal title="고객사 정보" @close-modal="closeModalByPop" />
    <div class="wf_body">
      <div class="wf_body__table">
        <div class="wf_body__table-item" v-for="{ content, title, underline = false } in dataView" :key="title">
          <div class="wf_body__table-item--title wf-body_02-semi">{{ title }}</div>
          <div
            class="wf_body__table-item--content wf-body_03-reg"
            :class="{ underline }"
            v-if="typeof content === 'string' || typeof content === 'number'"
          >
            {{ content }}
          </div>
          <div class="wf_body__table-item--content wf-body_03-reg" :class="{ underline }" v-else>
            <div v-for="(item, index) in content" :key="index">{{ item }}</div>
          </div>
        </div>
      </div>
      <div class="wf_body-action">
        <WelfareMdButton label="닫기" buttonType="cancel" class="wf_w-120" @on-click="closeModalByPop" />
      </div>
    </div>
  </div>
</template>
<style scoped>
@import url('@/assets/css/view/product/modal/vendorInformation');
</style>
