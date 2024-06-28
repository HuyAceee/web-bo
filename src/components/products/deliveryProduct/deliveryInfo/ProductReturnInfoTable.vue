<script setup lang="ts">
import { WelfareSelect, WelfareTextarea } from '@/components'
import { ProductDeliveryInfoProps } from '@/composables/products/deliveryInfo/useProductDeliveryInfo'
import { WelfareSelectOptionType } from '@/models'

export interface ProductReturnInfoTableProps {
  deliveryInfoValue: ProductDeliveryInfoProps
}

defineProps<ProductReturnInfoTableProps>()

const returnPeriodPlaceholder = `-고객님의 단순변심으로 인한 반품은 상품 유형에 따라 아래 기간 이내에 가능합니다.
-식품/보석 : 수령 당일로 부터 7일 (일부상품 제외) 의류,도서,잡화,컴퓨터,디지털기기 : 수령 당일로 부터 15일 기타 상품 : 수령 당일로 부터 30일
-상품의 내용이 표시광고 내용과 다르거나 계약내용과 다르게 이행된 경우에는 상품을 수령한 날부터 3개월 이내, 그 사실을 안 날 또는 알 수 있었던 날부터 30일 이내에 반품이 가능합니다.`

const returnInfoPlaceholder = `-반품 가능기간을 초과한 경우
-상품 및 구성품을 분실하였거나 취급부주의로 파손/고장/오염되어 상품의 가치가 훼손된 경우
-상품을 개봉하였거나 상품 일부를 사용/세탁/수선/소비/섭취한 경우(단, 상품의 내용을 확인하기 위해 포장을 개봉한 경우 제외)
-고객님의 요청에 의해 상품사양이 변경(이니셜 상품, 사이즈 맞춤 상품 등)된 경우는 제작이 시작된 이후 취소 및 반품이 불가합니다.`

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
        <td>반품 회수지 명<span class="wf_text-sub-01"> *</span></td>
        <td class="table-p-6 w-table-row-316">
          <div class="w-180">
            <WelfareSelect
              v-model="$props.deliveryInfoValue.returnAddressName"
              placeholder="기본 출고지"
              optionLabel="label"
              :options="options"
              small
            />
          </div>
        </td>
        <td>반품 택배사 명</td>
        <td class="table-p-6 w-table-row-316">우체국</td>
        <td>반품 배송지 ID</td>
        <td class="table-p-6 w-table-row-316">DE123</td>
      </tr>
      <tr>
        <td>반품 회수지 주소<span class="wf_text-sub-01">*</span></td>
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
        <td>반품 배송비</td>
        <td colspan="5" class="p-0">
          <div class="wf_flex">
            <div class="w-table-row-200 table-border-right table-row-padding-content">3,000</div>
            <div class="table-title-row-150 table-border-right">자동회수 가능 여부</div>
            <div class="w-table-row-200 table-border-right table-row-padding-content">가능</div>
            <div class="table-title-row-150 table-border-right">도서산간 반품 배송비</div>
            <div class="w-table-row-200 table-border-right table-row-padding-content">5,000</div>
            <div class="table-title-row-150 table-border-right">제주 반품 배송비</div>
            <div class="w-table-row-199 table-row-padding-content">5,000</div>
          </div>
        </td>
      </tr>
      <tr>
        <td>반품 기간</td>
        <td colspan="5" class="wf-space-x-6 table-p-6">
          <div class="text-area-h-120">
            <WelfareTextarea
              autoResize
              v-model="$props.deliveryInfoValue.returnPeriod"
              class="wrap-textarea-388"
              :placeholder="returnPeriodPlaceholder"
            />
          </div>
        </td>
      </tr>
      <tr>
        <td>반품 안내</td>
        <td colspan="5" class="table-p-6 table-py-7">
          <div class="text-area-h-120">
            <WelfareTextarea
              autoResize
              v-model="$props.deliveryInfoValue.returnInfo"
              class="wrap-textarea-388"
              :placeholder="returnInfoPlaceholder"
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
