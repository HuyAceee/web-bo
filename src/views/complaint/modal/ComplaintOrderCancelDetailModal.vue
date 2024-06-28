<!--BO_F0202_020101_P-->
<script lang="ts" setup>
import { HeaderModal } from '@/components'
import ComplaintOrderCancelDetailFilter from '@/components/complaint/modal/complaintOrderCancelDetailModal/ComplaintOrderCancelDetailFilter.vue'
import ComplaintOrderCancelDetailRefund from '@/components/complaint/modal/complaintOrderCancelDetailModal/ComplaintOrderCancelDetailRefund.vue'
import ComplaintOrderCancelDetailRequestTable from '@/components/complaint/modal/complaintOrderCancelDetailModal/ComplaintOrderCancelDetailRequestTable.vue'
import ComplaintOrderCancelDetailTicketTable from '@/components/complaint/modal/complaintOrderCancelDetailModal/ComplaintOrderCancelDetailTicketTable.vue'
import { useComplaintCancelOrderDetail } from '@/composables/complaint/modal/useComplaintCancelOrderDetail'
import { useComplaintOrderCancelDetailModal } from '@/composables/complaint/modal/useComplaintOrderCancelDetailModal'

export interface Props {
  id?: number
}

const { id } = withDefaults(defineProps<Props>(), { id: undefined })
const {
  dataOrderCancel,
  updateMemoNotes,
  submitMemoNotes,
  dataTableTicketDetail,
  onRowSelected,
  onSelectAllChange,
  onCancelWithDrawal,
  onReRequestProcessing,
  refTable,
  getDetailOrderCancelTicket,
  showTicketDetails
} = useComplaintCancelOrderDetail(id)
const { closeModalByPop } = useComplaintOrderCancelDetailModal()
</script>

<template>
  <div class="wf-modal-order-container">
    <HeaderModal title="주문취소 상세" @close-modal="closeModalByPop" />
    <div class="wf_body scrollbar-custom">
      <ComplaintOrderCancelDetailFilter
        :data-order-cancel="dataOrderCancel"
        @update-memo-notes="updateMemoNotes"
        @submit-memo-notes="submitMemoNotes"
        @show-ticket-details="showTicketDetails"
      />
      <ComplaintOrderCancelDetailRequestTable :data-order-cancel="dataOrderCancel" @submit-success="getDetailOrderCancelTicket" />
      <ComplaintOrderCancelDetailTicketTable
        ref="refTable"
        @row-checked-change="onRowSelected"
        @select-all-change="onSelectAllChange"
        :data-table-ticket-detail="dataTableTicketDetail"
        @on-cancel-with-drawal="onCancelWithDrawal"
        @on-re-request-processing="onReRequestProcessing"
      />
      <ComplaintOrderCancelDetailRefund :data-order-cancel="dataOrderCancel" />
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/complaint/modal/complaint-order-cancel-modal.css');
</style>
