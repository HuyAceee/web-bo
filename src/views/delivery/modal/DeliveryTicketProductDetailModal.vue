<!-- BO_E0207_010101_P -->
<script setup lang="ts">
import { FORMAT_DATE_TIME_YYYY_MM_DD_HH_MM_SS, formatNumberDot, formatTime, renderLabelEnum } from '@/common'
import { DataTableContainer, HeaderModal, WelfareMdButton } from '@/components'
import FormGroup from '@/components/widgets/form/FormGroup.vue'
import { useDeliveryReceiptViewModal } from '@/composables/delivery/modal/useDeliveryReceiptViewModal'
import { useDeliveryTicketProductDetailLogic } from '@/composables/delivery/modal/useDeliveryTicketProductDetailLogic'
import { useDeliveryTicketProductModalDetail } from '@/composables/delivery/modal/useDeliveryTicketProductModalDetail'
import { EmployeeStatusEnum } from '@/models'
import { DeliveryDetailModalProps } from '@/models/views/delivery/modal/DeliveryDetailModalModel'
import { deliveryOrderProcessStatusCommonCodeName } from '@/models/views/delivery/modal/DeliveryIssuanceDelayInfoModel'
import { orderTicketDetailTableHeaderConfig } from '@/models/views/delivery/ticketDetailModal/DeliveryTicketDetailModalModel'
import { deliveryOrderChannelOptions } from '@/models/views/delivery/ticketProductOrderManagement/DeliveryTicketProductListOrderStatusModel'
import { deliveryClaimStatusOptions } from '@/models/views/delivery/ticketProductOrderManagement/DeliveryTicketProductTicketListModel'

const props = withDefaults(defineProps<DeliveryDetailModalProps>(), {})
const {
  orderDetail,
  onClickMemberKey,
  onClickSellerKey,
  onClickProductKey,
  onClickOrderKey,
  onClickClaimKey,
  onShowModalTicketImage,
  convertTicketType
} = useDeliveryTicketProductDetailLogic(props)
const { closeModalByPop } = useDeliveryTicketProductModalDetail()
const { onShowModal } = useDeliveryReceiptViewModal()
</script>

<template>
  <div class="member-request-modal">
    <HeaderModal title=" 주문 상세 내역" @close-modal="props.onCancel" />
    <div class="wf-p-20 wf-pt-26 wf-pr-14 wf-width-full wf_flex wf_flex-col wf-space-y-20 modal-scroll scrollbar-custom">
      <div class="wf-btn-border--bg-color-line-gray wf_br-6 wf_text-n-33">
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1 form-group-padding" is-rounded-top :is-border-bottom="false" is-rounded-bottom label="주문코드">
            <div class="wf_w-full wf-body_03-reg">{{ orderDetail.orderKey }}</div>
          </FormGroup>
          <FormGroup class="wf_flex-1 form-group-padding" is-border-left :is-border-bottom="false" label="결제일시">
            <div class="wf_w-full wf-body_03-reg">
              {{ formatTime(orderDetail.paymentDatetime, FORMAT_DATE_TIME_YYYY_MM_DD_HH_MM_SS) }}
            </div>
          </FormGroup>
        </div>
      </div>
      <div class="wf-space-y-9 wf_text-n-33">
        <div class="wf_flex wf_items-center wf_justify-between">
          <span class="wf-body_01-semi wf_text-n-33">주문기본정보</span>
        </div>
        <div class="wf-btn-border--bg-color-line-gray wf_br-6">
          <div class="wf_flex wf_items-center">
            <FormGroup class="wf_flex-1 form-group-padding" is-rounded-top is-rounded-bottom label="회원코드">
              <span class="wf-underline wf_w-full wf-body_03-reg wf-pointer wf_text-sub-02" @click="() => onClickMemberKey(orderDetail)">{{
                orderDetail.memberKey
              }}</span>
            </FormGroup>
            <FormGroup class="wf_flex-1 form-group-padding" is-border-left label="회원명">
              <span class="wf-underline wf_w-full wf-body_03-reg wf-pointer wf_text-sub-02" @click="() => onClickMemberKey(orderDetail)">{{
                orderDetail.memberName
              }}</span>
            </FormGroup>
          </div>
          <div class="wf_flex wf_items-center">
            <FormGroup class="wf_flex-1 form-group-padding" is-rounded-top is-rounded-bottom label="회원아이디">
              <span class="wf-underline wf_w-full wf-body_03-reg wf-pointer wf_text-sub-02" @click="() => onClickMemberKey(orderDetail)">{{
                orderDetail.memberId
              }}</span>
            </FormGroup>
            <FormGroup class="wf_flex-1 form-group-padding" is-border-left label="휴대폰번호">
              <div class="wf_w-full wf-body_03-reg">{{ orderDetail.memberPhone }}</div>
            </FormGroup>
          </div>
          <div class="wf_flex wf_items-center">
            <FormGroup class="wf_flex-1 form-group-padding" is-rounded-top is-rounded-bottom label="소속 회사">
              <div class="wf_w-full wf-body_03-reg">{{ `${orderDetail.customerKey} (${orderDetail.customerName})` }}</div>
            </FormGroup>
            <FormGroup class="wf_flex-1 form-group-padding" is-border-left label="사번">
              <div class="wf_w-full wf-body_03-reg">{{ orderDetail.employeeNumber }}</div>
            </FormGroup>
          </div>
          <div class="wf_flex wf_items-center">
            <FormGroup class="wf_flex-1 form-group-padding" is-rounded-top is-rounded-bottom label="주문자명">
              <div class="wf_w-full wf-body_03-reg">{{ orderDetail.ordererName }}</div>
            </FormGroup>
          </div>
          <div class="wf_flex wf_items-center">
            <FormGroup class="wf_flex-1 form-group-padding" is-rounded-top is-rounded-bottom label="상품 금액">
              <div class="wf_w-full wf-body_03-reg wf_text-right">{{ formatNumberDot(orderDetail?.totalProductAmount) }} 원</div>
            </FormGroup>
            <FormGroup class="wf_flex-1 form-group-padding" is-border-left label="할인 금액">
              <div class="wf_w-full wf-body_03-reg wf_text-right">{{ formatNumberDot(orderDetail?.discountAmount) }} 원</div>
            </FormGroup>
          </div>
          <div class="wf_flex wf_items-center">
            <FormGroup class="wf_flex-1 form-group-padding" label="최종 결제금액">
              <div class="wf_w-full wf-body_03-reg wf_text-right">{{ formatNumberDot(orderDetail.lastPaymentAmount) }} 원</div>
            </FormGroup>
          </div>
          <div class="wf_flex wf_items-center">
            <FormGroup class="wf_flex-1 form-group-padding" label="주문채널">
              <div class="wf_w-full wf-body_03-reg">{{ renderLabelEnum(deliveryOrderChannelOptions, orderDetail.orderChannel) }}</div>
            </FormGroup>
            <FormGroup class="wf_flex-1 form-group-padding" is-border-left label="신용카드 정보">
              <div class="wf_w-full wf-body_03-reg"></div>
            </FormGroup>
          </div>
          <div class="wf_flex wf_items-center">
            <FormGroup
              class="wf_flex-1 wf-ticket-product-payment form-group-row"
              customClass="wf_p-0 wf_h-86"
              is-rounded-top
              is-rounded-bottom
              label="결제수단별 결제금액"
              :is-border-bottom="false"
            >
              <div class="wf_flex align-center w-full">
                <div class="wf-group-h-44 wf_width-full wf_br-b flex-1">
                  <div class="align-center p-14 title-payment b-r-payment b-b-payment wf_h-44 wf-pt-12">
                    <span class="wf-body_02-semi wf_text-n-33"> 복지포인트 </span>
                  </div>
                  <div class="wf_flex align-center wf_filter-body p-14 b-r-payment">
                    <div class="wf_w-full wf-body_03-reg">
                      {{ formatNumberDot(orderDetail?.welfarePointPaymentAmount) ?? '-' }}
                    </div>
                  </div>
                </div>
                <div class="wf-group-h-44 wf_width-full wf_br-b flex-1">
                  <div class="align-center p-14 title-payment b-r-payment b-b-payment wf_h-44 wf-pt-12">
                    <span class="wf-body_02-semi wf_text-n-33"> 신용카드 </span>
                  </div>
                  <div class="wf_flex align-center wf_filter-body p-14 b-r-payment">
                    <div class="wf_w-full wf-body_03-reg">
                      {{ formatNumberDot(orderDetail?.welfarePointPaymentAmount) ?? '-' }}
                    </div>
                  </div>
                </div>
                <div class="wf-group-h-44 wf_width-full wf_br-b flex-1">
                  <div class="align-center p-14 title-payment b-r-payment b-b-payment wf_h-44 wf-pt-12">
                    <span class="wf-body_02-semi wf_text-n-33"> 계좌이체 </span>
                  </div>
                  <div class="wf_flex align-center wf_filter-body p-14 b-r-payment">
                    <div class="wf_w-full wf-body_03-reg">
                      {{ formatNumberDot(orderDetail?.creditCartPaymentAmount) ?? '-' }}
                    </div>
                  </div>
                </div>
                <div class="wf-group-h-44 wf_width-full wf_br-b flex-1">
                  <div class="align-center p-14 title-payment b-r-payment b-b-payment wf_h-44 wf-pt-12">
                    <span class="wf-body_02-semi wf_text-n-33"> 메가존페이 </span>
                  </div>
                  <div class="wf_flex align-center wf_filter-body p-14 b-r-payment">
                    <div class="wf_w-full wf-body_03-reg">
                      {{ formatNumberDot(orderDetail?.transferPaymentAmount) ?? '-' }}
                    </div>
                  </div>
                </div>
                <div class="wf-group-h-44 wf_width-full wf_br-b flex-1">
                  <div class="align-center p-14 title-payment b-r-payment b-b-payment wf_h-44 wf-pt-12">
                    <span class="wf-body_02-semi wf_text-n-33"> 네이버페이 </span>
                  </div>
                  <div class="wf_flex align-center wf_filter-body p-14 b-r-payment">
                    <div class="wf_w-full wf-body_03-reg">
                      {{ formatNumberDot(orderDetail?.megazonePaymentAmount) ?? '-' }}
                    </div>
                  </div>
                </div>
                <div class="wf-group-h-44 wf_width-full wf_br-b flex-1">
                  <div class="align-center p-14 title-payment b-r-payment b-b-payment wf_h-44 wf-pt-12">
                    <span class="wf-body_02-semi wf_text-n-33"> 카카오페이 </span>
                  </div>
                  <div class="wf_flex align-center wf_filter-body p-14 b-r-payment">
                    <div class="wf_w-full wf-body_03-reg">
                      {{ formatNumberDot(orderDetail?.naverPaymentAmount) ?? '-' }}
                    </div>
                  </div>
                </div>
                <div class="wf-group-h-44 wf_width-full wf_br-b flex-1">
                  <div class="align-center p-14 title-payment b-b-payment wf_h-44 wf-pt-12">
                    <span class="wf-body_02-semi wf_text-n-33"> 토스페이 </span>
                  </div>
                  <div class="wf_flex align-center wf_filter-body p-14">
                    <div class="wf_w-full wf-body_03-reg">
                      {{ formatNumberDot(orderDetail?.kakaoPaymentAmount) ?? '-' }}
                    </div>
                  </div>
                </div>
              </div>
            </FormGroup>
          </div>
        </div>
      </div>
      <div class="wf-space-y-10 wf_text-n-33">
        <div class="wf_flex wf_items-center wf_justify-between">
          <span class="wf-body_01-semi wf_text-n-33">주문상품정보</span>
          <WelfareMdButton
            label="영수증 보기"
            buttonType="liner"
            class="wf-mr--2 wf_md-button--liner"
            buttonSize="small"
            @on-click="() => onShowModal(props.orderKey)"
          />
        </div>
        <div class="wf-btn-border--bg-color-line-gray wf_br-6">
          <div class="wf_flex wf_items-center">
            <FormGroup class="wf_flex-1 form-group-padding" is-rounded-top is-rounded-bottom label="판매사 코드">
              <span class="wf-underline wf_w-full wf-body_03-reg wf-pointer wf_text-sub-02" @click="() => onClickSellerKey(orderDetail)">{{
                orderDetail.sellerKey
              }}</span>
            </FormGroup>
            <FormGroup class="wf_flex-1 form-group-padding" is-border-left label="판매사명">
              <span class="wf-underline wf_w-full wf-body_03-reg wf-pointer wf_text-sub-02" @click="() => onClickSellerKey(orderDetail)">{{
                orderDetail.sellerName
              }}</span>
            </FormGroup>
          </div>
          <div class="wf_flex wf_items-center">
            <FormGroup class="wf_flex-1 form-group-padding" is-rounded-top is-rounded-bottom label="상품주문코드">
              <div class="wf_w-full wf-body_03-reg">{{ orderDetail.productOrderKey }}</div>
            </FormGroup>
            <FormGroup class="wf_flex-1 form-group-padding" is-border-left label="티켓유형">
              <div class="wf_w-full wf-body_03-reg">{{ convertTicketType(orderDetail.ticketType) }}</div>
            </FormGroup>
          </div>
          <div class="wf_flex wf_items-center">
            <FormGroup class="wf_flex-1 form-group-padding" is-rounded-top is-rounded-bottom label="상품코드">
              <span class="wf-underline wf_w-full wf-body_03-reg wf-pointer wf_text-sub-02" @click="() => onClickProductKey(orderDetail)">{{
                orderDetail.productKey
              }}</span>
            </FormGroup>
            <FormGroup class="wf_flex-1 form-group-padding" is-border-left label="상품명">
              <span class="wf-underline wf_w-full wf-body_03-reg wf-pointer wf_text-sub-02" @click="() => onClickProductKey(orderDetail)">{{
                orderDetail.productName
              }}</span>
            </FormGroup>
          </div>
          <div class="wf_flex wf_items-center">
            <FormGroup class="wf_flex-1 form-group-padding" is-rounded-top is-rounded-bottom label="옵션코드">
              <div class="wf_w-full wf-body_03-reg">{{ orderDetail.optionKey }}</div>
            </FormGroup>
            <FormGroup class="wf_flex-1 form-group-padding" is-border-left label="옵션명">
              <div class="wf_w-full wf-body_03-reg">{{ orderDetail.optionLargeName }}</div>
            </FormGroup>
          </div>
          <div class="wf_flex wf_items-center wf_h-42">
            <FormGroup class="wf_flex-1 form-group-padding wf_h-42" is-rounded-top is-rounded-bottom label="수량" :is-border-bottom="false">
              <div class="wf_w-full wf-body_03-reg">{{ orderDetail.salePrice }}</div>
            </FormGroup>
            <FormGroup class="wf_flex-1 form-group-padding wf_h-42" is-border-left label="판매가" :is-border-bottom="false">
              <div class="wf_w-full wf-body_03-reg">{{ formatNumberDot(orderDetail.salePrice) }} 원</div>
            </FormGroup>
          </div>
        </div>
      </div>
      <!-- table -->
      <div class="wf_product-search-table">
        <DataTableContainer
          isSelectInvisible
          :column-configs="orderTicketDetailTableHeaderConfig"
          :value="orderDetail.orderedTicketProducts"
          no-data-label="조회내용이 없습니다."
          row-hover
        >
          <template #title>
            <span class="wf-body_01-semi wf_text-n-33">받는 사람 및 티켓 정보 </span>
          </template>
          <template #body-immediatelyDiscountAmount="{ props }">
            <span>{{
              formatNumberDot(props.data.immediatelyDiscountAmount) ?? 0
            }}</span>
          </template>
          <template #body-transactionNumber="{ props }">
            <span class="wf-underline wf_w-full wf-body_03-reg wf-pointer wf_text-sub-02" @click="() => onClickOrderKey(orderDetail)">{{
              props.data.transactionNumber
            }}</span>
          </template>
          <template #body-stt="{ props }">
            <span>{{ props.index + 1 }}</span>
          </template>
          <template #body-ticketCouponStatus="{ props }">
            <span>{{ props.data.ticketCouponStatus === EmployeeStatusEnum.Y ? '활성' : '폐기' }} </span>
          </template>
          <template #body-useYn="{ props }">
            <span>{{ props.data.useYn === EmployeeStatusEnum.Y ? '사용' : '미사용' }} </span>
          </template>
          <template #body-ticketCouponNumber="{ props }">
            <span
              class="wf-underline wf_w-full wf-body_03-reg wf-pointer wf_text-sub-02"
              @click="() => onShowModalTicketImage(props?.data?.ticketCouponUrl)"
              >{{ props.data.ticketCouponNumber }}</span
            >
          </template>
          <template #body-orderStatus="{ props }">
            <span class="wf-underline wf_w-full wf-body_03-reg wf-pointer wf_text-sub-02" @click="() => onClickClaimKey(orderDetail)">{{
              deliveryOrderProcessStatusCommonCodeName?.find((item) => item.value === props.data?.orderStatus)?.label
            }}</span>
          </template>
          <template #body-claimStatus="{ props }">
            <span class="wf-underline wf_w-full wf-body_03-reg wf-pointer wf_text-sub-02" @click="() => onClickClaimKey(orderDetail)">{{
              deliveryOrderProcessStatusCommonCodeName?.find((item) => item.value === props.data?.claimStatus)?.label
            }}</span>
          </template>
          <template #body-productAmount="{ props }">
            <span class="wf-underline wf_w-full wf-body_03-reg wf-pointer wf_text-sub-02" @click="() => onClickClaimKey(orderDetail)">{{
              renderLabelEnum(deliveryClaimStatusOptions, props.data.orderStatus)
            }}</span>
          </template>
          <template #body-lastPaymentAmount="{ props }">
            {{ formatNumberDot(props.data.lastPaymentAmount) }}
          </template>
          <template #body-welfarePointPaymentAmount="{ props }">
            {{ formatNumberDot(props.data.welfarePointPaymentAmount) }}
          </template>
          <template #body-pgPaymentAmount="{ props }">
            {{ formatNumberDot(props.data.pgPaymentAmount) }}
          </template>
          <template #body-balance="{ props }">
            {{ formatNumberDot(props.data.balance) }}
          </template>
        </DataTableContainer>
        <div class="wf-space-y-10">
          <!-- <div class="wf_flex wf_items-center wf_justify-between">
            <span class="wf-body_01-semi wf_text-n-33">보내는 사람 메시지 ffff</span>
          </div> -->
          <div class="wf_flex wf_items-center wf-btn-border--bg-color-line-gray wf_br-6">
            <FormGroup class="wf_flex-1 form-group-padding" is-rounded-top is-rounded-bottom :is-border-bottom="false" label="보내는 사람 메시지">
              <div class="wf_w-full wf-body_03-reg wf_text-n-33">{{ orderDetail?.senderMessage }}</div>
            </FormGroup>
          </div>
        </div>
      </div>
      <div class="wf-space-y-10">
        <!-- <div class="wf_flex wf_items-center wf_justify-between">
          <span class="wf-body_01-semi wf_text-n-33">처리로그</span>
        </div> -->
        <div class="wf_flex wf-btn-border--bg-color-line-gray wf_br-6 m-h-44">
          <FormGroup class="wf_flex-1 m-h-44 form-group-padding" is-rounded-top :is-border-bottom="false" is-rounded-bottom label="처리내역로그">
            <div class="wf_w-full wf-body_03-reg">
              <div v-for="(item, index) in orderDetail.orderHistories" :key="index" class="wf-body_03-reg wf_text-n-33">
                <span v-if="item.orderStatus">{{ item.orderStatus }} </span>
                <span v-if="item.processDatetime">({{ formatTime(item.processDatetime, FORMAT_DATE_TIME_YYYY_MM_DD_HH_MM_SS) }}) </span>
                <span v-if="item.processor">({{ item.processor }}) </span>
              </div>
            </div>
          </FormGroup>
        </div>
      </div>
      <div class="wf-mx-auto">
        <WelfareMdButton label="닫기" button-type="cancel" button-size="default" class="wf_w-230" @on-click="closeModalByPop" />
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/order/modal/order-ticket-product-detail.css');
</style>
