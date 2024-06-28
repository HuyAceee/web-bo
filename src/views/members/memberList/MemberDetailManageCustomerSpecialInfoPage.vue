<!-- BO_B0101_020701 -->

<script setup lang="ts">
import { DataTablePaginationWithCheckbox, WelfareMdButton } from '@/components'
import { useMemberListManageCustomerSpecialInfo } from '@/composables/members/memberList/useMemberCustomerSpecialInfo'
import { MemberDetailBaseTabProps } from '@/models'
import Column from 'primevue/column'

const props = defineProps<MemberDetailBaseTabProps>()

const {
  tableRef,
  isLoading,
  items,
  totalItems,
  checkedItems,
  onPageChange,
  onSelectAllChange,
  onRowCheckedChange,
  onDelete,
  onShowMemoDetail,
  onShowMemoRegistration,
  onDownLoad
} = useMemberListManageCustomerSpecialInfo(props)
</script>

<template>
  <div>
    <DataTablePaginationWithCheckbox
      :value="items"
      :loading="isLoading"
      :totalRecords="totalItems"
      v-on:page-change="onPageChange"
      v-on:select-all-change="onSelectAllChange"
      v-on:row-checked-change="onRowCheckedChange"
      ref="tableRef"
    >
      <template #title>
        <h6 class="wf_text-n-33">총 {{ totalItems }} 건</h6>
      </template>
      <template #buttons>
        <div class="wf-space-x-6 wf_flex">
          <WelfareMdButton label="선택 삭제" buttonType="liner" :disabled="!checkedItems.length" @on-click="onDelete" />
          <WelfareMdButton label="메모등록" buttonType="default" @on-click="() => onShowMemoRegistration()" />
          <WelfareMdButton label="엑셀 다운로드" buttonType="liner" @on-click="onDownLoad" />
        </div>
      </template>
      <template #columns>
        <Column key="no" columnKey="no" field="id" header="No." class="wf_col-100" />
        <Column key="detail" columnKey="detail" header="내용" class="wf_col-800">
          <template #body="slotProps">
            <p
              class="wf_w-full line-clamp wf-pointer wf_text-sub-02 wf-whitespace-prewrap wf-word-break"
              @click="() => onShowMemoDetail(slotProps.data)"
            >
              {{ slotProps.data.detail }}
            </p>
          </template>
        </Column>
        <Column key="manager" columnKey="manager" header="관리자" class="wf_col-200">
          <template #body="slotProps">
            <p class="wf_w-full">
              {{ `${slotProps.data?.registerName}(${slotProps.data?.registerKey})` }}
            </p>
          </template></Column
        >
        <Column key="registrationDate" columnKey="registrationDate" field="registrationDate" header="등록일시"></Column>
      </template>
    </DataTablePaginationWithCheckbox>
  </div>
</template>
