<script setup lang="ts">
import { ALL_COMMON_MESSAGES, DEFAULT_TABLE_SELECT_OPTIONS_TWO } from '@/common'
import { DataTablePaginationWithCheckbox, WelfareMdButton } from '@/components'
import { WelfareDataTableWithCheckBoxExpose } from '@/models'
import Column from 'primevue/column'
import { PageState } from 'primevue/paginator'
import { ref } from 'vue'

export interface MemberBulkRegistrationProps {
  data: any[] | undefined
  loading: boolean
  totalElement: number | undefined
  totalSuccessElement: number | undefined
  totalFailElement: number | undefined
  totalItems: number | undefined
  registerSucceed: boolean
  reasonRefused?: boolean
  currentActive?: number
}

interface MemberBulkRegistrationEmits {
  (e: 'page-change', params: PageState): void
  (e: 'select-all-change', checked: boolean): void
  (e: 'row-checked-change', item: any): void
  (e: 'delete-records'): void
  (e: 'register-records'): void
  (e: 'download-file'): void
}

const props = defineProps<MemberBulkRegistrationProps>()
const emit = defineEmits<MemberBulkRegistrationEmits>()

const eventEmit = {
  onPageChange: (params: PageState) => {
    emit('page-change', params)
    scrollToTop()
  },
  onSelectAllChange: (checked: boolean) => {
    emit('select-all-change', checked)
  },
  onRowCheckedChanged: (item: any) => {
    emit('row-checked-change', item)
  },
  onDownload: () => {
    emit('download-file')
  },
  onDeleteRecords: () => {
    emit('delete-records')
  },
  onRegisterRecords: () => {
    emit('register-records')
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

const selectProps = {
  options: DEFAULT_TABLE_SELECT_OPTIONS_TWO,
  class: 'wf_w-128'
}
</script>

<template>
  <DataTablePaginationWithCheckbox
    ref="refTable"
    noDataLabel="리스트가 없습니다."
    :value="data"
    :total-records="totalItems"
    :loading="loading"
    :selectProps="selectProps"
    @page-change="eventEmit.onPageChange"
    @row-checked-change="eventEmit.onRowCheckedChanged"
    @select-all-change="eventEmit.onSelectAllChange"
  >
    <template #title>
      <h6 class="wf_text-n-33 wf_flex wf_flex-row wf_justify-center wf_items-center">
        <span> {{ registerSucceed ? '일괄등록 총' : '총' }} {{ props.totalElement ?? 0 }} 건&nbsp;&nbsp;</span>
        <span class="wf-body_01-mid wf_flex">
          (성공&nbsp;
          <span class="wf_text-sub-01">{{ props.totalSuccessElement }}</span>
          &nbsp;건, 실패&nbsp;
          <span class="wf_text-sub-01">{{ props.totalFailElement }}</span
          >&nbsp;건)
        </span>
      </h6>
      <!-- <h6 class="wf_text-n-33 wf_flex wf_flex-row wf_justify-center wf_items-center">
        <span> 일괄등록 총 {{ props.totalElement ?? 0 }} 건</span>
      </h6> -->
    </template>
    <template #buttons>
      <div class="wf-space-x-6 wf_flex">
        <WelfareMdButton
          v-if="!props.registerSucceed && !props.currentActive"
          @click="eventEmit.onDeleteRecords"
          :disabled="props.registerSucceed"
          label="선택삭제"
          class="wf_w-69"
          buttonType="liner"
        />
        <WelfareMdButton
          v-if="!props.registerSucceed && !props.currentActive"
          @click="eventEmit.onRegisterRecords"
          :disabled="props.registerSucceed"
          label="일괄 등록"
          class="wf_w-69"
          buttonType="default"
        />
        <WelfareMdButton @click="eventEmit.onDownload" label="엑셀 다운로드" class="wf_w-93" buttonType="liner" />
      </div>
    </template>
    <template #columns>
      <Column column-key="no" key="no" field="id" header="No."> </Column>
      <Column column-key="situation" key="situation" class="wf-table-m-w-280" v-if="registerSucceed">
        <template #header>상태</template>
        <template #body="slotProps">
          <p
            class="wf_w-full line-clamp wf-pointer wf_text-center wf-whitespace-prewrap wf-word-break"
            :class="slotProps.data.reasonRefused === ALL_COMMON_MESSAGES.SUCCESS ? 'wf_text-n-33' : 'wf_text-sub-01'"
          >
            {{ slotProps.data.reasonRefused }}
          </p>
        </template>
      </Column>
      <Column column-key="memberShipCode" key="memberShipCode" field="memberShipCode" header="회원코드"></Column>
      <Column column-key="memberName" key="memberName">
        <template #header>회원명<span class="wf_text-sub-01">*</span> </template>
        <template #body="slotProps">
          <p class="wf_w-full line-clamp wf-pointer wf_text-center wf-whitespace-prewrap wf-word-break">
            {{ slotProps.data.name }}
          </p>
        </template>
      </Column>
      <Column column-key="email" key="email">
        <template #header> 아이디(이메일)<span class="wf_text-sub-01">*</span> </template>
        <template #body="slotProps">
          <p class="wf_w-full line-clamp wf-pointer wf_text-center wf-whitespace-prewrap wf-word-break">
            {{ slotProps.data.email }}
          </p>
        </template>
      </Column>

      <Column column-key="phone" key="phone" field="phone">
        <template #header> 휴대폰번호<span class="wf_text-sub-01">*</span> </template>
      </Column>
      <Column column-key="dateOfBirth" key="dateOfBirth" field="dateOfBirth">
        <template #header> 생년월일<span class="wf_text-sub-01">*</span> </template>
      </Column>
      <Column column-key="gender" key="gender" field="gender">
        <template #header> 성별<span class="wf_text-sub-01">*</span> </template>
      </Column>
      <Column column-key="jobNumber" key="jobNumber" field="jobNumber">
        <template #header> 사번<span class="wf_text-sub-01">*</span> </template>
      </Column>
      <Column column-key="rank" key="rank" field="rank">
        <template #header> 직급<span class="wf_text-sub-01">*</span> </template>
      </Column>
      <Column column-key="employeeStatus" key="employeeStatus" field="employeeStatus">
        <template #header> 재직상태<span class="wf_text-sub-01">*</span> </template>
      </Column>
      <Column column-key="accountStatus" key="accountStatus" field="accountStatus">
        <template #header> 계정상태<span class="wf_text-sub-01">*</span> </template>
      </Column>
      <Column column-key="memberShipLevel" key="memberShipLevel" field="memberShipLevel">
        <template #header> 회원등급<span class="wf_text-sub-01">*</span> </template>
      </Column>
      <Column column-key="customerCompanyCode" key="customerCompanyCode" field="customerCompanyCode">
        <template #header> 고객사코드<span class="wf_text-sub-01">*</span> </template>
      </Column>
      <Column column-key="customer" key="customer" field="customer">
        <template #header> 고객사<span class="wf_text-sub-01">*</span> </template>
      </Column>
      <Column column-key="address" key="address" field="address">
        <template #header> 고객사 주소<span class="wf_text-sub-01">*</span> </template>
      </Column>
      <Column column-key="reasonRefused" key="reasonRefused" class="wf_col-grow" v-if="reasonRefused">
        <template #header>실패 사유</template>
        <template #body="slotProps">
          <p class="wf_w-full line-clamp wf-pointer wf_text-sub-01 wf_text-center wf-whitespace-prewrap wf-word-break">
            {{ slotProps.data.reasonRefused }}
          </p>
        </template>
      </Column>
    </template>
  </DataTablePaginationWithCheckbox>
</template>

<style scoped>
@import url('@/assets/css/view/member/memberRegistration/member-bulk-registration-table.css');
</style>
