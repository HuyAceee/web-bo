<script lang="ts" setup>
import Column from 'primevue/column'
import { DataTablePaginationWithCheckbox, WelfareMdButton } from '@/components'
import { ApprovalTableDataModel, WelfareDataTableWithCheckBoxExpose } from '@/models'
import { PageState } from 'primevue/paginator'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
export interface ProductTableDataDeliveryProps {
  data: ApprovalTableDataModel[] | undefined
  loading: boolean
  totalElement: number | undefined
  dataHeaderTableModal: any[]
  link?: string
}

interface ProductTableDataDeliveryEmits {
  (e: 'page-change', params: PageState): void
  (e: 'select-all-change', checked: boolean): void
  (e: 'row-checked-change', item: any): void
  (e: 'show-info-seller', code: string): void
  (e: 'refuse-approval-list'): void
  (e: 'refuse-approval-by-id', id: string): void
  (e: 'approval-list'): void
  (e: 'approval-by-id', id: string): void
}

defineProps<ProductTableDataDeliveryProps>()
const emit = defineEmits<ProductTableDataDeliveryEmits>()

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
  onShowInfoSeller: (code: string) => {
    emit('show-info-seller', code)
  },
  onRefuseApprovalList: () => {
    emit('refuse-approval-list')
  },
  onRefuseApprovalById: (id: string) => {
    emit('refuse-approval-by-id', id)
  },
  onApprovalList: () => {
    emit('approval-list')
  },
  onApprovalById: (id: string) => {
    emit('approval-by-id', id)
  }
}

const refTable = ref<InstanceType<typeof DataTablePaginationWithCheckbox> | null>(null)

const scrollToTop = () => {
  refTable.value?.scrollToTop()
}

const clearSelectedAll = () => {
  refTable.value?.clearCheckAll?.()
}

defineExpose<WelfareDataTableWithCheckBoxExpose>({
  scrollToTop,
  clearCheckAll: clearSelectedAll
})
</script>

<template>
  <DataTablePaginationWithCheckbox
    ref="refTable"
    :value="data"
    :loading="loading"
    :total-records="totalElement"
    @page-change="eventEmit.onPageChange"
    @row-checked-change="eventEmit.onRowCheckedChanged"
    @select-all-change="eventEmit.onSelectAllChange"
  >
    <template #title>
      <h6 class="wf_text-n-33">조회 결과 &nbsp;(총 {{ totalElement ?? 0 }} 건)</h6>
    </template>
    <template #buttons>
      <div class="wf-space-x-6 wf_flex">
        <WelfareMdButton @click="eventEmit.onRefuseApprovalList" label="승인반려" class="wf_w-69" buttonType="liner" />
        <WelfareMdButton @click="eventEmit.onApprovalList" label="승인" class="wf_w-45" buttonType="default" />
      </div>
    </template>
    <template #columns>
      <Column key="productCode" columnKey="productCode" header="상품코드" class="wf_m-w-140 wf_justify-start wf-text_link">
        <template #body="slotProps">
          <router-link class="wf_text-sub-02" target="_blank" :to="`${link}?productRequestKey=${slotProps.data.id}`">
            {{ slotProps.data.product_code }}
          </router-link>
        </template>
      </Column>
      <Column key="productName" columnKey="productName" header="상품명" class="wf_m-w-300 wf_justify-start wf-text_link">
        <template #body="slotProps">
          <router-link class="wf_text-sub-02" target="_blank" :to="`${link}?productRequestKey=${slotProps.data.id}`">
            {{ slotProps.data.product_name }}
          </router-link>
        </template>
      </Column>
      <Column
        v-for="item in dataHeaderTableModal"
        :key="item.field"
        :column-key="item.field"
        :field="item.field"
        :header="item.header"
        :class="item.class"
      >
        <template #body="slotProps">
          <button
            v-if="item.field === 'seller_code' || item.field === 'seller'"
            @click="eventEmit.onShowInfoSeller('S3456')"
            class="font-inherit"
            :class="item.class"
          >
            {{ slotProps.data[item.field] }}
          </button>
          <span v-else>{{ slotProps.data[item.field] }}</span>
        </template>
      </Column>
      <Column key="approveManagement" columnKey="batters" header="승인 관리" class="wf_m-w-150 wf-space-x-4">
        <template #body="slotProps">
          <WelfareMdButton @click="eventEmit.onRefuseApprovalById(slotProps.data.id)" label="반려" buttonType="liner" buttonSize="small" />
          <WelfareMdButton @click="eventEmit.onApprovalById(slotProps.data.id)" label="승인" buttonType="liner" buttonSize="small" />
        </template>
      </Column>
    </template>
  </DataTablePaginationWithCheckbox>
</template>
