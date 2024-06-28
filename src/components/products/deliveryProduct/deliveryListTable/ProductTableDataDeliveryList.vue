<script setup lang="ts">
import { DataTableContainerConfigModel, ProductTicketProductListModel, WelfareDataTableWithCheckBoxExpose } from '@/models'
import { DataTablePaginationWithCheckbox, WelfareMdButton } from '@/components'
import { PageState } from 'primevue/paginator'
import Column from 'primevue/column'
import { handleRedirectLink } from '@/common/html'
import { ref } from 'vue'
import { formatNumberDot } from '@/common'

export interface ProductTableDataDeliveryListProps {
  data: any[] | undefined
  loading: boolean
  totalElement: number | undefined
  dataHeaderTableModal: DataTableContainerConfigModel[]
  linkEdit?: string
  linkRegister?: string
}

interface ProductTableDataDeliveryListEmits {
  (e: 'page-change', params: PageState): void
  (e: 'select-all-change', checked: boolean): void
  (e: 'row-checked-change', item: any): void
  (e: 'on-stop-all-sell'): void
  (e: 'on-stop-sell', id: string): void
  (e: 'download-file'): void
  (e: 'show-info-seller', code: string): void
  (e: 'stop-seller-by-id', id: string): void
}

defineProps<ProductTableDataDeliveryListProps>()
const emit = defineEmits<ProductTableDataDeliveryListEmits>()

const eventEmit = {
  onPageChange: (params: PageState) => {
    emit('page-change', params)
  },
  onSelectAllChange: (checked: boolean) => {
    emit('select-all-change', checked)
  },
  onRowCheckedChanged: (item: any) => {
    emit('row-checked-change', item)
  },
  onStopAllSell: () => {
    emit('on-stop-all-sell')
  },
  onStopSell: (id: string) => {
    emit('on-stop-sell', id)
  },
  onDownload: () => {
    emit('download-file')
  },
  showInfoSeller: (code: string) => {
    emit('show-info-seller', code)
  },
  stopSellerById: (id: string) => {
    emit('stop-seller-by-id', id)
  }
}

const refTable = ref<InstanceType<typeof DataTablePaginationWithCheckbox> | null>(null)

const scrollToTop = () => {
  refTable.value?.scrollToTop()
}

const clearSelectedAll = () => {
  refTable?.value?.clearCheckAll?.()
}

defineExpose<WelfareDataTableWithCheckBoxExpose>({
  scrollToTop,
  clearCheckAll: clearSelectedAll
})

const getProductCodeQuery = (product?: ProductTicketProductListModel) => {
  if (product?.product_code && product?.productClassificationCode) {
    return `code=${product.product_code}&classification=${product.productClassificationCode}`
  }
}
</script>

<template>
  <DataTablePaginationWithCheckbox
    :value="data"
    @page-change="eventEmit.onPageChange"
    :total-records="totalElement"
    @row-checked-change="eventEmit.onRowCheckedChanged"
    @select-all-change="eventEmit.onSelectAllChange"
    :loading="loading"
    ref="refTable"
  >
    <template #title>
      <h6 class="wf_text-n-33">조회 결과 &nbsp;총 {{ totalElement }} 건</h6>
    </template>
    <template #buttons>
      <div class="wf-space-x-6 wf_flex">
        <WelfareMdButton @click="eventEmit.onStopAllSell" label="판매종료" class="wf_w-69" buttonType="liner" />
        <WelfareMdButton @click="handleRedirectLink(linkRegister ?? '')" label="상품등록" class="wf_w-69" buttonType="default" />
        <WelfareMdButton @click="eventEmit.onDownload" label="엑셀 다운로드" class="wf_w-93" buttonType="liner" />
      </div>
    </template>
    <template #columns>
      <Column key="productCode" columnKey="productCode" header="상품코드" class="wf_m-w-140 wf_justify-start wf-text_link">
        <template #body="slotProps">
          <a class="wf_text-sub-02" target="blank" :href="`${linkEdit}?${getProductCodeQuery(slotProps.data)}`">
            {{ slotProps.data.product_code }}
          </a>
        </template>
      </Column>
      <Column key="productName" columnKey="productName" header="상품명" class="wf_m-w-300 wf_justify-start wf-text_link">
        <template #body="slotProps">
          <a class="wf_text-sub-02" target="blank" :href="`${linkEdit}?${getProductCodeQuery(slotProps.data)}`">
            {{ slotProps.data.product_name }}
          </a>
        </template>
      </Column>
      <Column
        v-for="item in dataHeaderTableModal"
        :key="item.field"
        :field="item.field"
        :column-key="item.field"
        :header="item.header"
        :class="item.class"
      >
        <template #body="slotProps">
          <button
            v-if="item.field === 'seller_code' || item.field === 'seller'"
            @click="eventEmit.showInfoSeller('S3456')"
            class="font-inherit"
            :class="item.class"
          >
            {{ slotProps.data[item.field] }}
          </button>
          <span v-else-if="['price', 'instant_discount_price'].includes(item.field)">{{ slotProps?.data?.[item?.field] ? formatNumberDot(slotProps?.data?.[item?.field]) : '' }}</span>
          <span v-else>{{ slotProps.data[item.field] }}</span>
        </template>
      </Column>
      <Column key="copy" columnKey="copy" header="복사" class="wf_m-w-150">
        <template #body>
          <WelfareMdButton @click="handleRedirectLink(linkRegister ?? '')" label="상품복사" buttonType="liner" buttonSize="small" />
        </template>
      </Column>
      <Column key="management" columnKey="management" header="관리" class="wf_m-w-150">
        <template #body="slotProps">
          <WelfareMdButton @click="eventEmit.stopSellerById(slotProps.data.id)" label="판매종료" buttonType="liner" buttonSize="small" />
        </template>
      </Column>
    </template>
  </DataTablePaginationWithCheckbox>
</template>
