<script setup lang="ts">
import { WelfareSelect, WelfareTextarea } from '@/components'
import { ProductDeliveryInfoProps } from '@/composables/products/deliveryInfo/useProductDeliveryInfo'
import { WelfareSelectOptionType } from '@/models'

export interface ProductProductShippingInfoTableProps {
  deliveryInfoValue: ProductDeliveryInfoProps
}

defineProps<ProductProductShippingInfoTableProps>()

const deliveryInfoPlaceholder = `-일반상품 기준 평균 2-3일(토, 일, 공휴일 제외) 이내 배송됩니다. 단, 도서, 산간, 오지, 일부 지역, 설치상품의 경우 혹은 상품의 재고 상황에 따라 다소 지연될 수 있습니다.
-식품의 경우 신선도 유지를 위해 영업일 기준으로 배송이 시작 됩니다.(토, 일, 공휴일 제외)
-주문 제작 및 가구, 가전 상품의 경우 7-12일(토, 일, 공휴일 제외)의 시간이 소요될 수 있습니다.
-일부 상품의 경우 물류사정에 따라 개별 배송 및 추가배송비가 발생될 수 있습니다.
-일부 상품의 경우 지역에 따라 추가운임이 발생될 수 있습니다.`

const options: WelfareSelectOptionType[] = [
  { label: '기본 출고지', value: '1' },
  { label: '기본 출고지', value: '2' },
  { label: '기본 출고지', value: '3' }
]
</script>

<template>
  <table class="table-row-layout table-row-layout-p-14 wf-mt-20" aria-hidden="true">
    <caption></caption>
    <tbody>
      <tr>
        <td>출고지 명<span class="wf_text-sub-01"> *</span></td>
        <td class="table-p-6 w-table-row-316">
          <div class="w-180">
            <WelfareSelect
              v-model="$props.deliveryInfoValue.shipAddressName"
              placeholder="기본 출고지"
              optionLabel="label"
              :options="options"
              small
            />
          </div>
        </td>
        <td>출고지 택배사 명</td>
        <td class="table-p-6 w-table-row-316">우체국</td>
        <td>출고 배송지 ID</td>
        <td class="table-p-6 w-table-row-316">DE123</td>
      </tr>
      <tr>
        <td>출고지 주소<span class="wf_text-sub-01 wf-ml-1">*</span></td>
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
        <td>합배송</td>
        <td>가능</td>
        <td>배송비 정책</td>
        <td colspan="3">무료</td>
      </tr>
      <tr>
        <td>기본 배송비</td>
        <td>0</td>
        <td>도서산간 배송비</td>
        <td>5,000</td>
        <td>제주 배송비<span class="wf_text-sub-01"> *</span></td>
        <td>5,000</td>
      </tr>
      <tr>
        <td>배송 안내</td>
        <td colspan="5" class="wf-space-x-6 table-p-6">
          <div class="text-area-h-120">
            <WelfareTextarea
              autoResize
              v-model="$props.deliveryInfoValue.shipInfo"
              class="wrap-textarea-388"
              :placeholder="deliveryInfoPlaceholder"
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
