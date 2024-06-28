<!-- BO_E0208_140201_P -->
<script setup lang="ts">
import { HeaderModal, WelfareMdButton } from '@/components'
import FormGroup from '@/components/widgets/form/FormGroup.vue'
import { DeliveryProductReceiptTableConfigModel } from '@/models/views/delivery/common'

interface DeliveryProductReceiptProps {
  headerTitle: string
  tableConfigs: DeliveryProductReceiptTableConfigModel[]
  onCancel?: () => void
  hasNotification?: boolean
}

defineProps<DeliveryProductReceiptProps>()
</script>

<template>
  <div class="wf-order-product-receipt">
    <HeaderModal :title="$props.headerTitle" @close-modal="$props.onCancel" />
    <div class="wf-p-20 wf-pr-14 wf-width-full wf_flex wf_flex-col wf-space-y-19 wf-modal-scroll scrollbar-custom">
      <h6 class="wf-mx-auto wf-mb-10">{{ $props.headerTitle }}</h6>
      <div class="wf-space-y-8" :class="{ 'wf-mt-20': !indexTable }" v-for="(table, indexTable) in $props.tableConfigs" :key="indexTable">
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
              <span class="wf-body_03-reg wf_text-n-33">
                {{ item.value }}
              </span>
            </FormGroup>
          </div>
        </div>
      </div>
      <div class="wf_text-sub-01 wf-body_04-reg wf-notification wf-mt-20" v-if="$props.hasNotification">
        <span>현금영수증 관련 사항은 국번없이 126번에서 상담 받을 수 있습니다.</span>
        <span
          >현금영수증 확인은 국세청 홈택스(<a target="_blank" class="wf-notification-link" href="https://www.hometax.go.kr"
            >https://www.hometax.go.kr</a
          >)에서도 가능합니다.</span
        >
      </div>
      <div class="wf-action-wrapper wf-mt-20">
        <WelfareMdButton button-type="cancel" label="닫기" class="wf_w-120" @on-click="$props.onCancel" />
        <WelfareMdButton button-type="default" label="다운로드" class="wf_w-120" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/order/modal/order-product-receipt-modal.css');
</style>
