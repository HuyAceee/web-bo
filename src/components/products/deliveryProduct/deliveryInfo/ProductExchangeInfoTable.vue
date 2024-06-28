<script setup lang="ts">
import { WelfareSelect, WelfareTextarea } from '@/components'
import { ProductDeliveryInfoProps } from '@/composables/products/deliveryInfo/useProductDeliveryInfo'
import { WelfareSelectOptionType } from '@/models'

export interface ProductExchangeTableProps {
  deliveryInfoValue: ProductDeliveryInfoProps
}

defineProps<ProductExchangeTableProps>()

const exchangePeriodPlaceholder = `-고객님의 단순변심으로 인한 교환은 상품 유형에 따라 아래 기간 이내에 가능합니다.
-식품/보석 : 수령 당일로 부터 7일 (일부상품 제외) 의류,도서,잡화,컴퓨터,디지털기기 : 수령 당일로 부터 15일 기타 상품 : 수령 당일로 부터 30일
-상품의 내용이 표시광고 내용과 다르거나 계약내용과 다르게 이행된 경우에는 상품을 수령한 날부터 3개월 이내, 그 사실을 안 날 또는 알 수 있었던 날부터 30일 이내에 교환이 가능합니다.`

const exchangeInfoPlaceholder = `-상품 카테고리에 따라 교환에 대한 기준이 상이할 수 있습니다.
-기타 자세한 사항은 고객센터(000-0000)로 문의 주시기 바랍니다.`

const options: WelfareSelectOptionType[] = [
  { label: '하위분1', value: '1' },
  { label: '하위분2', value: '2' },
  { label: '하위분3', value: '3' }
]
</script>

<template>
  <table class="table-row-layout table-row-layout-p-14 wf-mt-20" aria-hidden="true">
    <caption></caption>
    <tbody>
      <tr>
        <td>교환 회수지 명<span class="wf_text-sub-01"> *</span></td>
        <td class="table-p-6 w-table-row-316">
          <div class="w-180">
            <WelfareSelect
              v-model="$props.deliveryInfoValue.exchangeAddressName"
              placeholder="기본 출고지"
              optionLabel="label"
              :options="options"
              small
            />
          </div>
        </td>
        <td>교환 택배사 명</td>
        <td class="table-p-6 w-table-row-316">우체국</td>
        <td>교환 배송지 ID</td>
        <td class="table-p-6 w-table-row-316">DE123</td>
      </tr>
      <tr>
        <td>교환 회수지 주소<span class="wf_text-sub-01">*</span></td>
        <td colspan="5" class="table-p-7">
          <div class="wf-space-y-4">
            <div class="wf-space-x-14 tag-content-center">
              <p class="tag-info-shipping">지번 주소</p>
              <span> 경기도 남양주시 오남읍 오남리 418-1 (주안에있는교회) </span>
            </div>
            <div class="wf-space-x-6 tag-content-center">
              <p class="tag-info-shipping">도로명 주소</p>
              <span> 경기도 남양주시 오남읍 진건오남로512번길 23-1 (오남리, 주안에있는교회) </span>
            </div>
            <div class="wf-space-x-14 tag-content-center">
              <p class="tag-info-shipping">상세주소</p>
              <span> 904호 904호 10층 </span>
            </div>
            <div class="wf-space-x-14 tag-content-center">
              <p class="tag-info-shipping">출고지 전화번호 01</p>
              <span> 010-1234-1234 </span>
            </div>
            <div class="wf-space-x-14 tag-content-center">
              <p class="tag-info-shipping">출고지 전화번호 02</p>
              <span> - </span>
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <td>교환 출고지 명<span class="wf_text-sub-01"> *</span></td>
        <td>교환 회수지</td>
        <td>교환 택배사 명</td>
        <td colspan="3">우체국</td>
      </tr>
      <tr>
        <td>교환 출고지 주소<span class="wf_text-sub-01">*</span></td>
        <td colspan="5" class="table-p-7">
          <div class="wf-space-y-4">
            <div class="wf-space-x-14 tag-content-center">
              <p class="tag-info-shipping">지번 주소</p>
              <span> 경기도 남양주시 오남읍 오남리 418-1 (주안에있는교회) </span>
            </div>
            <div class="wf-space-x-6 tag-content-center">
              <p class="tag-info-shipping">도로명 주소</p>
              <span> 경기도 남양주시 오남읍 진건오남로512번길 23-1 (오남리, 주안에있는교회) </span>
            </div>
            <div class="wf-space-x-14 tag-content-center">
              <p class="tag-info-shipping">상세주소</p>
              <span> 904호 904호 10층 </span>
            </div>
            <div class="wf-space-x-14 tag-content-center">
              <p class="tag-info-shipping">출고지 전화번호 01</p>
              <span> 010-1234-1234 </span>
            </div>
            <div class="wf-space-x-14 tag-content-center">
              <p class="tag-info-shipping">출고지 전화번호 02</p>
              <span> - </span>
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <td>교환 배송비</td>
        <td colspan="5" class="p-0">
          <div class="wf_flex">
            <div class="w-table-row-200 table-border-right table-row-padding-content">3,000</div>
            <div class="table-title-row-150 table-border-right">자동회수 가능 여부</div>
            <div class="w-table-row-200 table-border-right table-row-padding-content">불가능</div>
            <div class="table-title-row-150 table-border-right">도서산간 교환 배송비</div>
            <div class="w-table-row-200 table-border-right table-row-padding-content">5,000</div>
            <div class="table-title-row-150 table-border-right">제주 교환 배송비</div>
            <div class="w-table-row-199 table-row-padding-content">5,000</div>
          </div>
        </td>
      </tr>
      <tr>
        <td>교환 기간</td>
        <td colspan="5" class="wf-space-x-6 table-p-6">
          <div class="text-area-h-120">
            <WelfareTextarea
              v-model="$props.deliveryInfoValue.exchangePeriod"
              autoResize
              class="wrap-textarea-388"
              :placeholder="exchangePeriodPlaceholder"
            />
          </div>
        </td>
      </tr>
      <tr>
        <td>교환 안내</td>
        <td colspan="5" class="wf-space-x-6 table-p-6">
          <div class="text-area-h-120">
            <WelfareTextarea
              autoResize
              v-model="$props.deliveryInfoValue.exchangeInfo"
              class="wrap-textarea-388"
              :placeholder="exchangeInfoPlaceholder"
            />
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
@import url('@/assets/css/view/product/deliveryProduct/deliveryProdRegister/product-table.css');
@import url('@/assets/css/view/product/deliveryProduct/deliveryInfo/product-delivery-info.css');
</style>
