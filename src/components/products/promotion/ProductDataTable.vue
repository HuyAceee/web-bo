<script setup lang="ts">
import Column from 'primevue/column'
import { DataTablePaginationWithCheckbox } from '@/components'
import { DataTableRowClickEvent } from 'primevue/datatable'
import {
  ProductBeforeDiscountPromotionListModel,
  ProductDiscountPromotionListModel
} from '@/models/views/products/modal/ProductSearchProductModalModel'
import { formatNumberDot } from '@/common'
import { useBaseTableEmptyScroll } from '@/composables/widgets/table/useBaseTableEmptyScroll'
import { ref } from 'vue'

interface ProductDataTableProps {
  data?: ProductDiscountPromotionListModel[] | ProductBeforeDiscountPromotionListModel[]
  isRegistration?: boolean
}

interface ProductDataTableEmits {
  (e: 'row-click', event: DataTableRowClickEvent): void

  // (e: 'on-delete-record', id: string): void
}

withDefaults(defineProps<ProductDataTableProps>(), {
  isRegistration: false
})
const emit = defineEmits<ProductDataTableEmits>()
const eventEmit = {
  rowClick: (event: DataTableRowClickEvent) => {
    emit('row-click', event)
  }
  // onDeleteRecord: (id: string) => {
  //   emit('on-delete-record', id)
  // }
}
const parentRef = ref()
useBaseTableEmptyScroll(parentRef)
</script>

<template>
  <div ref="parentRef">
    <DataTablePaginationWithCheckbox
      :value="data"
      @row-click="eventEmit.rowClick"
      no-data-label="등록된 상품이 없습니다"
      :isSelectInvisible="true"
      :show-selection="false"
    >
      <template #columns>
        <Column key="productCode" columnKey="productCode" field="productCode" header="상품코드" class="column" />
        <Column key="productName" columnKey="productName" field="productName" header="상품명" class="column" />
        <Column key="salePrice" columnKey="salePrice" field="salePrice" header="판매가(VAT포함)" class="column">
          <template #body="slotProps"> {{ slotProps.data?.salePrice ? formatNumberDot(slotProps.data?.salePrice) : 0 }} won </template>
        </Column>

        <Column v-if="isRegistration" key="productDiscountAmount" columnKey="productDiscountAmount" header="할인 금액" class="column wf_text-sub-01">
          <template #body="slotProps">
            {{ slotProps.data?.productDiscountAmount ? formatNumberDot(slotProps.data?.productDiscountAmount) : 0 }} won
          </template>
        </Column>

        <Column
          key="lastProductSalesStatusName"
          columnKey="lastProductSalesStatusName"
          field="lastProductSalesStatusName"
          header="판매상태"
          class="column"
          v-if="!isRegistration"
        />

        <Column v-if="isRegistration" key="discountPercentage" columnKey="discountPercentage" header="할인율(%)" class="column">
          <template #body="slotProps"> {{ slotProps.data?.discountPercentage && slotProps.data?.discountPercentage }} % </template>
        </Column>
        <Column
          key="immediatelyProductDiscountAmount"
          columnKey="immediatelyProductDiscountAmount"
          header="즉시 할인가"
          class="column wf_text-sub-01"
          v-if="isRegistration"
        >
          <template #body="slotProps">
            {{ slotProps.data?.immediatelyProductDiscountAmount ? formatNumberDot(slotProps.data?.immediatelyProductDiscountAmount) : 0 }} won
          </template>
        </Column>

        <Column key="productCreatedByName" columnKey="productCreatedByName" header="등록자" class="column" v-if="!isRegistration">
          <template #body="slotProps">
            {{ slotProps.data?.productCreatedByName ? `${slotProps.data?.productCreatedByName} (${slotProps.data?.productCreatedBy})` : '' }}
          </template>
        </Column>
        <Column
          key="productCreatedDate"
          columnKey="productCreatedDate"
          field="productCreatedDate"
          header="등록일시"
          class="column"
          v-if="!isRegistration"
        />
        <Column key="couponApplies" columnKey="couponApplies" field="couponApplies" header="쿠폰 적용" class="column" v-if="isRegistration" />
        <Column key="progressYn" columnKey="progressYn" field="progressYn" header="진행 상태" class="column" v-if="isRegistration" />

        <slot name="action-button" />
      </template>
    </DataTablePaginationWithCheckbox>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/product/promotion/product-promotion-data-table.css');
</style>
