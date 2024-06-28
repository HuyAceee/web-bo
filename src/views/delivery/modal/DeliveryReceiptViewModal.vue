<!-- BO_E0208_140101_P -->
<script setup lang="ts">
import { formatNumberDot, renderLabelEnum } from '@/common'
import { printDownloadPdf } from '@/common/pdfUtils'
import { DataTableContainer, HeaderModal, WelfareMdButton } from '@/components'
import FormGroup from '@/components/widgets/form/FormGroup.vue'
import { useDeliveryProductCardReceiptModal } from '@/composables/delivery/modal/useDeliveryProductCardReceiptModal'
// import { useDeliveryProductCashReceiptModal } from '@/composables/delivery/modal/useDeliveryProductCashReceiptModal'
import { useDeliveryReceiptViewModalLogic } from '@/composables/delivery/modal/useDeliveryReceiptViewModalLogic'
import {
  DeliveryReceiptModalPropsModel,
  deliveryHeaderFieldTableReceiptHistoryConfig,
  deliveryHeaderFieldTableReceiptPaymentConfig
} from '@/models/views/delivery/modal/DeliveryReceiptViewModel'
import {
  DeliveryPaymentMethodModel,
  deliveryPaymentMethodAllOptions
} from '@/models/views/delivery/ticketProductOrderManagement/DeliveryTicketProductListOrderStatusModel'

const props = defineProps<DeliveryReceiptModalPropsModel>()
const {
  itemsHistory,
  isLoadingHistory,
  onPageChangeHistory,
  tablePurchaseHistoryRef,
  tablePaymentHistoryRef,
  closeModalByPop,
  receiptDetail,
  totalProductAmount,
  exportPdfRef
} = useDeliveryReceiptViewModalLogic(props)

const { onShowModal: openModalCard } = useDeliveryProductCardReceiptModal()
// const { onShowModal: openModalCash } = useDeliveryProductCashReceiptModal()
</script>
<template>
  <div class="wf-modal-wrapper--content wf-modal-wrapper--grow wf_delivery-modal-receipt">
    <HeaderModal title="전자 영수증" @close-modal="props.onCancel" />
    <div class="wf-modal-body modal-scroll scrollbar-custom wf-space-y-20 wf-pr-14">
      <div class="" ref="exportPdfRef">
        <div class="wf_flex wf_justify-center wf-mb-30">
          <h6 class="wf_text-n-33">영수증 (공급받는자용)</h6>
        </div>
        <div class="wf_flex wf_flex-col wf-space-y-20">
          <div class="wf_w-full wf_flex wf-btn-border--bg-color-line-gray wf_br-6 wf_h-44">
            <FormGroup label="주문번호" class="wf_flex-1" is-rounded-top is-rounded-bottom :is-border-bottom="false">
              <div class="wf-body_03-reg">{{ receiptDetail?.orderKey }}</div>
            </FormGroup>
            <FormGroup label="공급받는 자" class="wf_flex-1" is-border-left :is-border-bottom="false">
              <div class="wf-body_03-reg">{{ receiptDetail?.orderer }}</div>
            </FormGroup>
          </div>
          <div class="wf_flex wf_flex-col wf-space-y-12">
            <div class="wf_flex wf_justify-between">
              <p class="wf-body_01-semi">구매내역</p>
              <p class="wf-body_04-reg wf_text-sub-01 wf-pt-2 wf-pr-1">상품명 앞 * 표기는 면세상품입니다.&nbsp;</p>
            </div>
            <div class="wf_flex wf_flex-col wf-space-y-10">
              <div class="wf_config_table">
                <DataTableContainer
                  ref="tablePurchaseHistoryRef"
                  is-select-invisible
                  :value="itemsHistory"
                  :loading="isLoadingHistory"
                  :column-configs="deliveryHeaderFieldTableReceiptHistoryConfig"
                  @page-change="onPageChangeHistory"
                  no-data-label="리스트가 없습니다"
                >
                  <template #body-quantity="{ props }">{{ props.data?.quantity }} 개</template>
                  <template #body-productAmount="{ props }">{{ formatNumberDot(props.data?.productAmount) }} 원</template>
                </DataTableContainer>
              </div>
              <div class="wf_w-full wf_flex wf_flex-col wf-btn-border--bg-color-line-gray wf_br-6">
                <FormGroup label="물품가 총액" custom-class="wf_form-group-justify-right" is-rounded-top>
                  <div class="wf-body_03-reg">{{ formatNumberDot(totalProductAmount) }} 원</div>
                </FormGroup>
                <FormGroup label="부가세" custom-class="wf_form-group-justify-right" is-rounded-top>
                  <div class="wf-body_03-reg">{{ formatNumberDot(receiptDetail?.purchase?.totalProductAmountAdditionalTax) }} 원</div>
                </FormGroup>
                <FormGroup label="구매 합계" custom-class="wf_form-group-justify-right" is-rounded-bottom :is-border-bottom="false">
                  <div class="wf-body_03-reg">
                    {{ formatNumberDot(totalProductAmount - receiptDetail?.purchase?.totalProductAmountAdditionalTax) }} 원
                  </div>
                </FormGroup>
              </div>
            </div>
          </div>
          <div class="wf_flex wf_flex-col wf-space-y-10">
            <p class="wf-body_01-semi">기타비용</p>
            <div class="wf_w-full wf_flex wf_flex-col wf-btn-border--bg-color-line-gray wf_br-6 wf-mt-9">
              <FormGroup label="배송비" custom-class="wf_form-group-justify-right" is-rounded-top>
                <div class="wf-body_03-reg">{{ formatNumberDot(receiptDetail?.etcCost?.deliveryAmount) }} 원</div>
              </FormGroup>
              <FormGroup label="부가세" custom-class="wf_form-group-justify-right" is-rounded-top>
                <div class="wf-body_03-reg">{{ formatNumberDot(receiptDetail?.etcCost?.deliveryAmountAdditionalTax) }} 원</div>
              </FormGroup>
              <FormGroup label="기타비용 합계" custom-class="wf_form-group-justify-right wf_h-42" is-rounded-bottom :is-border-bottom="false">
                <div class="wf-body_03-reg">
                  {{ formatNumberDot(receiptDetail?.etcCost?.deliveryAmount - receiptDetail?.etcCost?.deliveryAmountAdditionalTax) }} 원
                </div>
              </FormGroup>
            </div>
          </div>
          <p class="wf-body_01-semi wf-mb-10">결제 내역</p>
          <div
            class="wf_w-full wf_flex wf_flex-col wf-space-y-5 wf-mt-5"
            :class="{ 'wf-space-y-10 wf-mt-0': !index }"
            v-for="(payment, index) in receiptDetail.payments"
            :key="index"
          >
            <div class="wf_w-full wf_flex wf-btn-border--bg-color-line-gray wf_br-6">
              <FormGroup label="결제 일시" class="wf_flex-1" is-rounded-top is-rounded-bottom :is-border-bottom="false">
                <div class="wf-body_03-reg">{{ payment.paymentDatetime }}</div>
              </FormGroup>
              <FormGroup label="결제 수단" class="wf_flex-1" is-border-left :is-border-bottom="false">
                <div class="wf-body_03-reg">{{ renderLabelEnum(deliveryPaymentMethodAllOptions, payment.paymentMethod) }}</div>
              </FormGroup>
            </div>
            <div class="wf_config_table_payment">
              <DataTableContainer
                ref="tablePaymentHistoryRef"
                is-select-invisible
                :value="[payment]"
                :column-configs="deliveryHeaderFieldTableReceiptPaymentConfig"
                no-data-label="리스트가 없습니다"
              >
                <template #body-paymentAmount="{ props }">{{ formatNumberDot(props.data?.paymentAmount) }} 개</template>
                <template #body-proofId="{ props }">
                  <WelfareMdButton
                    v-if="props.data?.paymentMethod === DeliveryPaymentMethodModel.CREDIT_CARD"
                    label="현금영수증"
                    button-type="liner"
                    button-size="small"
                    @on-click="() => openModalCard()"
                  />
                  <span v-else>비대상</span>
                </template>
              </DataTableContainer>
            </div>
          </div>
          <div class="wf_flex wf_flex-col wf-space-y-10 wf-mt-16">
            <p class="wf-body_04-reg wf_text-sub-01">본 영수증은 구매 내역 확인 용도로만 사용할 수 있으며 법적인 효력은 없습니다.</p>
            <p class="wf-body_04-reg wf_text-sub-01">법적 증빙이 필요한 경우에는 현금영수증,&nbsp; 신용카드 전표를 확인해 주시기 바립니다.&nbsp;</p>
          </div>
        </div>
      </div>
      <div class="wf_flex wf_flex-row wf_justify-center wf-space-x-4 wf_flex-grow wf_w-full">
        <WelfareMdButton class="wf_w-120" :label="'닫기'" buttonType="cancel" @on-click="() => closeModalByPop?.()" />
        <WelfareMdButton class="wf_w-120" :label="'다운로드'" buttonType="default" @on-click="() => printDownloadPdf(exportPdfRef)" />
      </div>
    </div>
  </div>
</template>
<style scoped>
@import url('@/assets/css/view/delivery/modal/delivery-receipt-view-modal.css');
</style>

<script lang="ts">
export default {
  name: 'DeliveryReceiptViewModal'
}
</script>
