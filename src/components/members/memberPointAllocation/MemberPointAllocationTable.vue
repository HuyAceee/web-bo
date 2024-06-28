<script lang="ts" setup>
import { WelfareDataTableEmits, WelfareDataTableProps, WelfareDataTableWithCheckBoxExpose } from '@/models'
import { PageState } from 'primevue/paginator'
import { DataTableContainer } from '@/components'
import { ref } from 'vue'
import { FORMAT_DATE_YYYY, FORMAT_DATE_YYYY_MM_DD_HH_mm_ss, formatNumberDot, formatTime, MEMBER_POINT_REGISTRATION_BULK, MEMBER_POINTS_DEDUCTION_DETAIL } from '@/common'
import { DataTableRowClickEvent } from 'primevue/datatable'
import { useComingSoonModal } from '@/composables/widgets/modal/useComingSoonModal'
import { MemberPointAllocationListType } from '@/models/views/members/pointAllocationList/MemberPointAllocationListModel'
import {
  MemberPointAllocationListFormModel,
  MemberWelfarePointAllocationTableConfig
} from '@/models/views/members/memberWelfarePoint/MemberWelfarePointAllocationListModel'
import {
  MemberPointAdjustmentListFormModel,
  MemberWelfarePointAdjustmentTableConfig
} from '@/models/views/members/memberWelfarePoint/MemberWelfarePointAdjustmentModel'

interface ProductTableDataDeliveryProps extends WelfareDataTableProps {
  data?: MemberPointAllocationListFormModel[] | MemberPointAdjustmentListFormModel[]
  loading: boolean
  totalElement: number
  typePointAllocation: MemberPointAllocationListType
  selectedMember: MemberPointAllocationListFormModel | MemberPointAdjustmentListFormModel
}

interface ProductTableDataDeliveryEmits extends WelfareDataTableEmits {
  (e: 'page-change', params: PageState): void

  (e: 'row-click', params: MemberPointAllocationListFormModel[] | MemberPointAdjustmentListFormModel[]): void

  (e: 'submit-registration'): void

  (e: 'on-edit-page'): void

  (e: 'downloadExcel'): void
}

const tableRef = ref()
const props = defineProps<ProductTableDataDeliveryProps>()
const emit = defineEmits<ProductTableDataDeliveryEmits>()

const allocationType = props.typePointAllocation === MemberPointAllocationListType.allocation
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
  downloadExcel: () => {
    emit('downloadExcel')
  }
}
const scrollToTop = () => {
  tableRef.value?.scrollToTop()
}
const onPageChange = (data: PageState) => {
  eventEmit.onPageChange(data)
}

const linkToNavigation = (customerKey: string, pointKey?: string) => {
  if (allocationType) {
    return `${MEMBER_POINT_REGISTRATION_BULK}?customerKey=${customerKey}`
  } else {
    return `${MEMBER_POINTS_DEDUCTION_DETAIL}?customerKey=${customerKey}&pointKey=${pointKey}`
  }
}

const openCompanyDetails = () => {
  openComingSoonModal()
}

defineExpose<WelfareDataTableWithCheckBoxExpose>({
  scrollToTop
})

</script>

<template>
  <div class="wf-table-wrapper">
    <DataTableContainer
      no-data-label="조회 리스트가 없습니다."
      :value="props.data"
      @page-change="onPageChange"
      :total-records="props.totalElement"
      :loading="props.loading"
      :column-configs="allocationType ? MemberWelfarePointAllocationTableConfig : MemberWelfarePointAdjustmentTableConfig"
      ref="tableRef"
      @row-click="eventEmit.onRowClick"
    >
      <template #title>
        <h6 class="wf_text-n-33">조회 결과 &nbsp;총 {{ props.totalElement }} 건</h6>
      </template>
      <template #body-customerKey="{ props }">
        <p class="wf_text-sub-02 cursor-pointer wf_text-underline" @click="openCompanyDetails">
          {{ props.data?.customerKey }}
        </p>
      </template>
      <template #body-pointKey="{ props }">
        <router-link class="wf_text-sub-02" :to="linkToNavigation(props.data?.customerKey, props.data?.pointKey)" target="_blank">
          {{ props.data?.pointKey }}
        </router-link>
      </template>
      <template #body-pointAmount="{ props }">
        <span>
          {{ formatNumberDot(props.data?.pointAmount) ?? 0 }}
        </span>
      </template>
      <template #body-foMemberCount="{ props }">
        <span>
          {{ formatNumberDot(props.data?.foMemberCount) ?? 0 }}
        </span>
      </template>
      <template #body-processCategory="{ props }">
        <p :class="selectedMember?.pointKey === props?.data?.pointKey && 'wf_table-single-selected-row--content'">
          {{ props.data?.processCategory?.title }}
        </p>
      </template>
      <template #body-detailedCategory="{ props }">
        <p :class="selectedMember?.pointKey === props?.data?.pointKey && 'wf_table-single-selected-row--content'">
          {{ props.data?.detailedCategory?.title }}
        </p></template
      >
      <template v-if="!allocationType" #body-useStartDate="{ props }">
        <p :class="selectedMember?.pointKey === props?.data?.pointKey && 'wf_table-single-selected-row--content'">
          {{ formatTime(props.data?.deductionDate, FORMAT_DATE_YYYY_MM_DD_HH_mm_ss) }}
        </p></template
      >
      <template #body-registeredDate="{ props }">
        <p :class="selectedMember?.pointKey === props?.data?.pointKey && 'wf_table-single-selected-row--content'">
          {{ formatTime(props.data?.auditing?.registeredDate, FORMAT_DATE_YYYY_MM_DD_HH_mm_ss) ?? '' }}
        </p></template
      >
      <template #body-register="{ props }">
        <p :class="selectedMember?.pointKey === props?.data?.pointKey && 'wf_table-single-selected-row--content'">
          {{ props.data?.auditing?.registerName + (!allocationType ? ` (${props.data?.auditing?.registerId})` : '') }}
        </p>
      </template>
      <template #body-registrationStatus="{ props }">
        <p :class="selectedMember?.pointKey === props?.data?.pointKey && 'wf_table-single-selected-row--content'">
          {{ props.data?.auditing?.registerName }}
        </p>
      </template>
      <template #body-baseYear="{ props }">
        <p :class="selectedMember?.pointKey === props?.data?.pointKey && 'wf_table-single-selected-row--content'">
          {{ props.data?.allocationDate && formatTime(props.data?.allocationDate, FORMAT_DATE_YYYY) }}
        </p>
      </template>
      <template #body-startUsing="{ props }">
        <p :class="selectedMember?.pointKey === props?.data?.pointKey && 'wf_table-single-selected-row--content'">
          {{ formatTime(props?.data?.useValidDate?.startDate, FORMAT_DATE_YYYY_MM_DD_HH_mm_ss) ?? '' }}
        </p>
      </template>
      <template #body-endOfUse="{ props }">
        <p :class="selectedMember?.pointKey === props?.data?.pointKey && 'wf_table-single-selected-row--content'">
          {{ formatTime(props?.data?.useValidDate?.endDate, FORMAT_DATE_YYYY_MM_DD_HH_mm_ss) ?? '' }}
        </p>
      </template>
      <template #body-adjustmentDate="{ props }">
        <p :class="selectedMember?.pointKey === props?.data?.pointKey && 'wf_table-single-selected-row--content'">
          {{ formatTime(props?.data?.auditing?.modifiedDate, FORMAT_DATE_YYYY_MM_DD_HH_mm_ss) ?? '' }}
        </p>
      </template>
      <template #body-coordinator="{ props }">
        <p :class="selectedMember?.pointKey === props?.data?.pointKey && 'wf_table-single-selected-row--content'">
          {{ props?.data?.auditing?.modifierName }}
        </p>
      </template>
      <template #buttons>
        <WelfareMdButton v-if="allocationType" label="조정등록" class="wf_w-69" buttonType="liner" @on-click="eventEmit.onEditPage" />
        <WelfareMdButton
          @on-click="eventEmit.onSubmitRegistration"
          :label="allocationType ? `배정등록` : `차감 등록`"
          class="wf_w-69"
          buttonType="liner"
        />
        <WelfareMdButton label="엑셀 다운로드" class="wf_w-96" buttonType="liner" @on-click="eventEmit.downloadExcel" />
      </template>
    </DataTableContainer>
  </div>
</template>
<style scoped>
@import url('@/assets/css/view/member/member-point-allocation-list.css');
</style>
