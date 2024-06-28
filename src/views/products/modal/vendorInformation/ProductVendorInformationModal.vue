<!-- BO_C0605_010101_P -->
<script setup lang="ts">
import { vendorInformation } from '@/assets'
import { HeaderModal, WelfareMdButton } from '@/components'
import { useProductVendorInformationModal } from '@/composables/products/modal/vendorInformation/useProductVendorInformationModal'
import { ProductVendorInformationModel } from '@/models'
import { computed } from 'vue'

export interface Props {
  data?: ProductVendorInformationModel
}

const { closeModalByPop } = useProductVendorInformationModal()

const { data } = withDefaults(defineProps<Props>(), {
  data() {
    return vendorInformation
  }
})

const dataView = computed(() => {
  const {
    sellerCode,
    nameOfSellingCompany,
    salesDirectory,
    businessNumber,
    companyRegistrationNumber,
    representative,
    workplace,
    masterAccount,
    phoneNumber
  } = data
  return [
    {
      title: '판매사 코드',
      content: sellerCode,
      underline: true
    },
    {
      title: '판매사명',
      content: nameOfSellingCompany
    },
    {
      title: '사업자번호',
      content: businessNumber
    },
    {
      title: '법인등록번호',
      content: companyRegistrationNumber
    },
    {
      title: '판매 카테고리',
      content: salesDirectory
    },
    {
      title: '대표자',
      content: representative
    },
    {
      title: '사업장',
      content: workplace
    },
    {
      title: '마스터계정',
      content: masterAccount
    },
    {
      title: '휴대폰 번호',
      content: phoneNumber
    }
  ]
})
</script>

<script lang="ts">
export default {
  name: 'TicketProductRegistration'
}
</script>

<template>
  <div class="wf-manager-info wf_text-n-33">
    <HeaderModal :title="'판매사 정보'" @close-modal="closeModalByPop" />
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
