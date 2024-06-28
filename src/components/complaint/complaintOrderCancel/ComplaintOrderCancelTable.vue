<script lang="ts" setup>
import { WelfareDataTableEmits, WelfareDataTableProps, WelfareDataTableWithCheckBoxExpose } from '@/models'
import { PageState } from 'primevue/paginator'
import { DataTablePaginationWithCheckbox, WelfareMdButton } from '@/components'
import { ref } from 'vue'
import { DataTableRowClickEvent } from 'primevue/datatable'
import { ImgLoader } from '@/assets'
import Column from 'primevue/column'
import { FORMAT_DATE_DOT_YYYY_MM_DD_hh_mm, formatTime, PRODUCT_TICKET_PRODUCT_EDIT } from '@/common'
import {
  ComplaintOrderCancelListFormModel,
  ComplaintOrderCancelTableConfig
} from '@/models/views/complaint/complaintOrderCancel/ComplaintOrderCancelModel'
import {
  deliveryClaimReasonStatusCommonCodeName,
  deliveryOrderProcessStatusCommonCodeName
} from '@/models/views/delivery/modal/DeliveryIssuanceDelayInfoModel'
import { deliveryClaimDetailReasonTypeOptions } from '@/models/views/delivery/common'
import { useComingSoonModal } from '@/composables/widgets/modal/useComingSoonModal'
import { MemberPointAllocationListType } from '@/models/views/members/pointAllocationList/MemberPointAllocationListModel'
import { MemberPointAllocationListFormModel } from '@/models/views/members/memberWelfarePoint/MemberWelfarePointAllocationListModel'
import { MemberPointAdjustmentListFormModel } from '@/models/views/members/memberWelfarePoint/MemberWelfarePointAdjustmentModel'

interface ComplaintOrderCancelProps extends WelfareDataTableProps {
  data?: ComplaintOrderCancelListFormModel[]
  loading: boolean
  totalElement: number
  typePointAllocation: MemberPointAllocationListType
  selectedMember: MemberPointAllocationListFormModel | MemberPointAdjustmentListFormModel
}

interface ComplaintOrderCancelEmits extends WelfareDataTableEmits {
  (e: 'page-change', params: PageState): void

  (e: 'row-click', params: MemberPointAllocationListFormModel[] | MemberPointAdjustmentListFormModel[]): void

  (e: 'submit-registration'): void

  (e: 'on-edit-page'): void

  (e: 'onRowSelected', event: any): void

  (e: 'onSelectAllChange', checked: boolean): void

  (e: 'clearChecked'): void

  (e: 'openModalOrderCancel'): void

  (e: 'onShowModalOrderCancelDetail', id: number): void

  (e: 'onShowModalOrderDetail', id: number): void

  (e: 'onDownloadExcel'): void
}

const tableRef = ref()
const props = defineProps<ComplaintOrderCancelProps>()
const emit = defineEmits<ComplaintOrderCancelEmits>()

const navigationRegisterBasicInfomation = (code: string) => {
  return `${PRODUCT_TICKET_PRODUCT_EDIT}?code=${code}`
}

const { openComingSoonModal } = useComingSoonModal()
const eventEmit = {
  onPageChange: (params: PageState) => {
    emit('page-change', params)
  },
  onRowClick: (event: DataTableRowClickEvent) => {
    emit('row-click', event.data)
  },
  onSubmitRegistration: () => {
    emit('submit-registration')
  },
  onEditPage: () => {
    emit('on-edit-page')
  },
  onRowSelected: (event: any) => {
    emit('onRowSelected', event)
  },
  onSelectAllChange: (checked: boolean) => {
    emit('onSelectAllChange', checked)
  },
  clearChecked: () => {
    emit('clearChecked')
  },
  openModalOrderCancel: () => {
    emit('openModalOrderCancel')
  },
  onShowModalOrderCancelDetail: (id: number) => {
    emit('onShowModalOrderCancelDetail', id)
  },
  onShowModalOrderDetail: (id: number) => {
    emit('onShowModalOrderDetail', id)
  },
  onDownloadExcel: () => {
    emit('onDownloadExcel')
  }
}
const scrollToTop = () => {
  tableRef.value?.scrollToTop()
}

const clearCheckAll = () => {
  tableRef.value?.clearCheckAll()
}

const openNewPage = () => {
  openComingSoonModal()
}

const fieldActionTableList = [
  ComplaintOrderCancelTableConfig[1].field,
  ComplaintOrderCancelTableConfig[3].field,
  ComplaintOrderCancelTableConfig[7].field,
  ComplaintOrderCancelTableConfig[13].field,
  ComplaintOrderCancelTableConfig[17].field,
  ComplaintOrderCancelTableConfig[21].field,
  ComplaintOrderCancelTableConfig[24].field,
  ComplaintOrderCancelTableConfig[26].field,
  ComplaintOrderCancelTableConfig[27].field,
  ComplaintOrderCancelTableConfig[5].field,
  ComplaintOrderCancelTableConfig[2].field,
  ComplaintOrderCancelTableConfig[6].field,
  ComplaintOrderCancelTableConfig[29].field
]

defineExpose<WelfareDataTableWithCheckBoxExpose>({
  scrollToTop,
  clearCheckAll
})
</script>

<template>
  <div class="wf-table-wrapper">
    <DataTablePaginationWithCheckbox
      :value="props.data"
      :loading="props.loading"
      :total-records="props.totalElement"
      @pageChange="eventEmit.onPageChange"
      @row-checked-change="eventEmit.onRowSelected"
      @select-all-change="eventEmit.onSelectAllChange"
      ref="tableRef"
    >
      <template #title>
        <h6 class="wf_text-n-33">조회 결과 &nbsp;총 {{ props.totalElement }} 건</h6>
      </template>
      <template #loading>
        <div class="p-datatable-loading-overlay p-component-overlay" data-pc-section="loadingoverlay">
          <img class="wf-loading-table" :src="ImgLoader" alt="" />
        </div>
      </template>
      <template #buttons>
        <WelfareMdButton label="주문취소철회" class="wf_w-93" buttonType="liner" @on-click="eventEmit.openModalOrderCancel" />
        <WelfareMdButton @on-click="eventEmit.onEditPage" label="처리 재요청" class="wf_w-81" buttonType="liner" />
        <WelfareMdButton label="엑셀다운로드" class="wf_w-93" @on-click="eventEmit.onDownloadExcel" buttonType="liner" />
      </template>
      <template #columns>
        <Column
          v-for="column in ComplaintOrderCancelTableConfig"
          :key="column.field"
          :column-key="column.field"
          class="wf-nowrap"
          :class="column?.class"
        >
          <template #header>
            {{ column.header }}
          </template>
          <template #body="slotProps">
            <p v-if="!fieldActionTableList.includes(column.field)">
              {{ slotProps.data?.[column.field] }}
            </p>
            <p
              v-if="column.field === fieldActionTableList[0]"
              class="wf_text-sub-02 wf_text-underline wf-pointer"
              @click="eventEmit.onShowModalOrderCancelDetail(slotProps.data?.[column.field])"
            >
              {{ slotProps.data?.[column.field] }}
            </p>

            <p
              v-if="column.field === fieldActionTableList[1]"
              class="wf_text-sub-02 wf_text-underline wf-pointer"
              @click="eventEmit.onShowModalOrderDetail(slotProps.data?.[column.field])"
            >
              {{ slotProps.data?.[column.field] }}
            </p>
            <router-link
              v-if="column.field === fieldActionTableList[2]"
              class="wf_text-sub-02"
              :to="`${navigationRegisterBasicInfomation(slotProps.data?.[column.field])}`"
              target="_blank"
            >
              {{ slotProps.data?.[column.field] }}
            </router-link>
            <p v-if="column.field === fieldActionTableList[3]" class="wf_text-sub-02 cursor-pointer wf_text-underline" @click="openNewPage">
              {{ slotProps.data?.[column.field] }}
            </p>
            <p v-if="column.field === fieldActionTableList[4]">
              {{ slotProps.data?.[column.field] && formatTime(slotProps.data?.[column.field], FORMAT_DATE_DOT_YYYY_MM_DD_hh_mm) }}
            </p>
            <p v-if="column.field === fieldActionTableList[5]" class="wf_text-sub-02 cursor-pointer wf_text-underline" @click="openNewPage">
              {{ slotProps.data?.[column.field] }}
            </p>
            <p v-if="column.field === fieldActionTableList[6]" class="wf_text-sub-02 cursor-pointer wf_text-underline" @click="openNewPage">
              {{ slotProps.data?.[column.field] }}
            </p>
            <p v-if="column.field === fieldActionTableList[7]">
              {{ slotProps.data?.[column.field] && formatTime(slotProps.data?.[column.field], FORMAT_DATE_DOT_YYYY_MM_DD_hh_mm) }}
            </p>
            <p v-if="column.field === fieldActionTableList[8]">
              {{ slotProps.data?.[column.field]  }}
            </p>
            <p v-if="column.field === fieldActionTableList[9]">
              {{ deliveryOrderProcessStatusCommonCodeName?.find((item) => item.value === slotProps.data?.[column?.field])?.label }}
            </p>
            <p v-if="column.field === fieldActionTableList[10]">
              {{ deliveryClaimReasonStatusCommonCodeName?.find((item) => item.value === slotProps.data?.[column?.field])?.label }}
            </p>
            <p v-if="column.field === fieldActionTableList[11]">
              {{ deliveryOrderProcessStatusCommonCodeName?.find((item) => item.value === slotProps.data?.[column?.field])?.label }}
            </p>
            <p v-if="column.field === fieldActionTableList[12]">
              {{ deliveryClaimDetailReasonTypeOptions?.find((item) => item.value === slotProps.data?.[column?.field])?.label }}
            </p>
          </template>
        </Column>
      </template>
    </DataTablePaginationWithCheckbox>
  </div>
</template>
<style scoped>
@import url('@/assets/css/view/complaint/complaint-order-cancel-list.css');
</style>