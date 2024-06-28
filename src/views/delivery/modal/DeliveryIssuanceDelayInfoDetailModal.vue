<!-- BO_E0203_040201_P -->
<script setup lang="ts">
import { HeaderModal, WelfareMdButton, DataTablePaginationWithCheckbox } from '@/components'
import FormGroup from '@/components/widgets/form/FormGroup.vue'
import Column from 'primevue/column'
import { useDeliveryIssuanceDelayInfoDetailModalLogic } from '@/composables/delivery/modal/useDeliveryIssuanceDelayInfoDetailModalLogic'
import {
  DeliveryIssuanceDelayInfoDetailProps,
  deliveryIssuanceDelayInfoDetailTableConfig
} from '@/models/views/delivery/modal/DeliveryIssuanceDelayInfoDetailModel'

const props = defineProps<DeliveryIssuanceDelayInfoDetailProps>()
const { issueDelayData } = useDeliveryIssuanceDelayInfoDetailModalLogic(props)
</script>

<template>
  <div class="issuance-delay-info-detail wf_text-n-33">
    <HeaderModal title="발급 지연 안내" @close-modal="props.onClose?.()" />
    <div class="wf-p-20 wf-width-full wf_flex wf_flex-col">
      <div class="wf-btn-border--bg-color-line-gray wf_br-6">
        <div class="wf_flex wf_items-center">
          <FormGroup custom-class="wf-body_03-reg wf-pl-11" label="발급지연 처리일시" is-rounded-top is-rounded-bottom :is-border-bottom="false">
            {{ props.issuanceDelayProcessingDateTime }}
          </FormGroup>
          <FormGroup custom-class="wf-body_03-reg" label="처리자" is-border-left :is-border-bottom="false">
            {{ props.manager }}
          </FormGroup>
        </div>
      </div>
      <div class="wf-mt-20 wf-body_01-semi">발급 지연 안내 처리 주문</div>
      <div class="wf-mt-12">
        <DataTablePaginationWithCheckbox
          :value="issueDelayData"
          :isSelectInvisible="true"
          :show-selection="false"
          no-data-label="조회 내용이 없습니다."
        >
          <template #columns>
            <Column
              v-for="header in deliveryIssuanceDelayInfoDetailTableConfig"
              :header="header.header"
              :column-key="header.field"
              v-bind:key="header.field"
              :class="header.class"
              :field="header.field"
            >
              <template #body="slotProps">
                <p v-if="['orderKey', 'productOrderKey', 'productName'].includes(header.field)" class="wf-text_link">
                  {{ slotProps.data?.[header.field] }}
                </p>
                <p v-else>{{ slotProps.data?.[header.field] }}</p>
              </template>
            </Column>
          </template>
        </DataTablePaginationWithCheckbox>
      </div>
      <div class="wf-btn-border--bg-color-line-gray wf_br-6 wf-mt--6">
        <div class="wf_flex wf_items-center">
          <FormGroup custom-class="wf-body_03-reg wf-pt-13 wf-pl-11" label="발급 지연 사유" is-rounded-top is-rounded-bottom> 주문폭주 </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup
            custom-class="wf-body_03-reg guidance-notes"
            class="wf-h-149"
            label="안내 메모"
            is-rounded-top
            is-rounded-bottom
            :is-border-bottom="false"
          >
            <p>고객님, 주문해 주셔서 감사합니다.</p>
            <p>주문해 주신 상품이 주문 폭주로 배송 지연이 예상되어 사전에 안내 드립니다.</p>
            <p>2일 이내에 배송 처리 지원해 드리겠습니다.</p>
            <p>많은 양해 부탁드립니다.</p>
            <p>혹 주문 취소를 원하실 경우 02-8888-0005로 전화 부탁드립니다.</p>
            <p>감사합니다. :)</p>
          </FormGroup>
        </div>
      </div>
      <div class="wf_flex wf_flex-row wf_justify-center wf-space-x-4 wf_flex-grow wf_w-full wf-pt-20">
        <WelfareMdButton class="wf_w-120" label="닫기" button-type="cancel" @onClick="props.onClose?.()" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/delivery/modal/delivery-issuance-delay-info-detail-modal.css');
</style>
