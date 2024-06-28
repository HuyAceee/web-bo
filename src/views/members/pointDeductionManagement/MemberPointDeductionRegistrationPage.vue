<!-- BO_B0202_020101 -->

<script setup lang="ts">
import { FORMAT_DATE_DOT_YYYY_MM_DD_hh_mm, FORMAT_DATE_TIME_YYYY_MM_DD_HH_MM_SS, XLS_ACCEPTED_TYPE, acceptNumberKey, formatNumberDot, formatTextLength, formatTime } from '@/common'
import {
  CommonTable,
  CommonTableContentCell,
  CommonTableRow,
  CommonTableTitleCell,
  TextInputValidationMaxBytes,
  TextareaMaxLengthBytes,
  WelfareBigButton,
  WelfareCloseIcon,
  WelfareDateTimePicker,
  WelfareInputText,
  WelfareMdButton,
  WelfareRadioGroup,
  WelfareSelect
} from '@/components'
import MemberRegistrationBulk from '@/components/members/pointUsageList/MemberRegistrationBulk.vue'
import MemberSpecifyInBulkTable from '@/components/members/pointUsageList/MemberSpecifyInBulkTable.vue'
import { useMemberPointDeductionRegistration } from '@/composables/members/pointDeduction/useMemberPointDeductionRegistration'
import { MenberPointTargetKindType, memberPointProcessCategoryOptions } from '@/models/views/members/memberWelfarePoint/MemberWelfarePointModel'
import {
  memberPointAllocationSpecifyInBulkSearchMemberHeaderTableConfig,
  memberPointAllocationSpecifyInBulkSearchSpecificMemberHeaderTableConfig
} from '@/models/views/members/pointUsageList/MemberPointAllocationSpecifyInBulkModel'

const {
  registerBtnDisabled,
  tabPanelProps,
  optionsPointType,
  targetKindOptions,
  isAllAllocationTarget,
  values,
  listChecked,
  currentActive,
  isLoadingSuccess,
  isLoadingFail,
  totalSuccessItems,
  totalFailItems,
  pageItemsFail,
  pageItemsSuccess,
  inputFileEl,
  inputFileName,
  resetFile,
  setFieldValue,
  onRegisterRecords,
  onDeleteRecords,
  onRowSelected,
  onSelectAllChange,
  onPageChange,
  handleTabChange,
  onDownload,
  downloadSampleFile,
  resetForm,
  openFileInput,
  handleFileUpload,
  handleRegisterMember,
  onRegister,
  showModelSearchMember,
  onRowSelectedMember,
  onSelectAllChangeMember,
  onClickDeleteRecords,
  pointDetail,
  items,
  onResetDataTable,
  handleDownloadAllResult,
  handleExportExcel,
  refTable,
  totalPoint,
  isDisabled,
  bulkItems,
  isLoadingBulk,
  memberAllItems,
  isLoadingMember,
  resultItems,
  isLoadingResult
} = useMemberPointDeductionRegistration()
</script>

<template>
  <div class="wf_border-page wf-px-30 wf-py-30">
    <CommonTable>
      <CommonTableRow height="43">
        <CommonTableTitleCell title="복지포인트 코드" is-first-col />
        <CommonTableContentCell :text="pointDetail?.pointKey?.toString()"></CommonTableContentCell>
        <CommonTableTitleCell title="등록상태" />
        <CommonTableContentCell :text="`차감등록`" />
      </CommonTableRow>
      <CommonTableRow height="44">
        <CommonTableTitleCell title="복지포인트 구분" is-first-col required />
        <CommonTableContentCell>
          <WelfareRadioGroup
            size="sm"
            name="processCategory"
            :options="memberPointProcessCategoryOptions"
            :model-value="values.processCategory"
            :disabled="isDisabled"
            @update:model-value="(value) => setFieldValue('processCategory', value)"
          />
        </CommonTableContentCell>
        <CommonTableTitleCell title="복지포인트 유형" required />
        <CommonTableContentCell>
          <WelfareSelect
            class="wf_w-180"
            small
            placeholder="선택"
            :options="optionsPointType"
            option-label="label"
            option-value="value"
            :model-value="values.detailedCategory"
            :disabled="isDisabled"
            @update:model-value="(value) => setFieldValue('detailedCategory', value)"
          />
        </CommonTableContentCell>
      </CommonTableRow>
      <CommonTableRow height="44">
        <CommonTableTitleCell title="복지포인트 차감명" is-first-col required />
        <CommonTableContentCell>
          <TextInputValidationMaxBytes
            class="wf_w-full"
            placeholder="복지포인트명 입력"
            size="small"
            hidden-warning
            :max-bytes="40"
            :model-value="values.pointName"
            :disabled="isDisabled"
            @update:model-value="(value) => setFieldValue('pointName', value)"
          />
        </CommonTableContentCell>
      </CommonTableRow>
      <CommonTableRow height="44">
        <CommonTableTitleCell title="차감 일시" is-first-col required />
        <CommonTableContentCell>
          <WelfareDateTimePicker
            class="wf_w-180"
            size="small"
            :format="FORMAT_DATE_DOT_YYYY_MM_DD_hh_mm"
            :model-value="values.useStartDate"
            :disabled="isDisabled"
            @update:model-value="(value) => setFieldValue('useStartDate', value)"
          />
        </CommonTableContentCell>
      </CommonTableRow>
      <CommonTableRow height="44">
        <CommonTableTitleCell title="차감 복지포인트" is-first-col required />
        <CommonTableContentCell>
          <span class="wf-body_03-reg wf_text-n-33">인당</span>
          <WelfareInputText
            class="wf-ml-20 wf_w-180"
            size="small"
            placeholder="숫자만 입력"
            text-align="right"
            :model-value="values.pointAmount as string"
            :disabled="isDisabled"
            @keypress="acceptNumberKey"
            @update:model-value="(value) => setFieldValue('pointAmount', value)"
          />
          <span class="wf-ml-6 wf-body_03-reg wf_text-n-33">포인트</span>
        </CommonTableContentCell>
        <CommonTableTitleCell title="총 차감 복지포인트" />
        <CommonTableContentCell :text="`${formatNumberDot(totalPoint)} 포인트`" />
      </CommonTableRow>
      <CommonTableRow height="154">
        <CommonTableTitleCell title="관리자 메모" is-first-col />
        <CommonTableContentCell>
          <TextareaMaxLengthBytes
            class="wf_w-full wf_i-h-120"
            placeholder="내용 입력"
            size="small"
            hidden-warning
            :max-bytes="100"
            :disabled="isDisabled"
            :label-bottom-right="formatTextLength(values.managerMemo, 100)"
            :model-value="values.managerMemo"
            @update:model-value="(value) => setFieldValue('managerMemo', value)"
          />
        </CommonTableContentCell>
      </CommonTableRow>
      <CommonTableRow height="150">
        <CommonTableTitleCell title="차감 사유 입력" is-first-col required />
        <CommonTableContentCell>
          <TextareaMaxLengthBytes
            class="wf_w-full wf_i-h-120"
            placeholder="내용 입력"
            size="small"
            hidden-warning
            :max-bytes="100"
            :disabled="isDisabled"
            :label-bottom-right="formatTextLength(values?.processReason, 100)"
            :model-value="values.processReason"
            @update:model-value="(value) => setFieldValue('processReason', value)"
          />
        </CommonTableContentCell>
      </CommonTableRow>
      <CommonTableRow height="44" :is-last-row="!isAllAllocationTarget">
        <CommonTableTitleCell title="복지포인트 차감 대상" is-first-col required />
        <CommonTableContentCell>
          <WelfareRadioGroup
            size="sm"
            name="targetKind"
            :options="targetKindOptions"
            :model-value="values.targetKind"
            :disabled="isDisabled"
            @update:model-value="(value) => setFieldValue('targetKind', value)"
          />
        </CommonTableContentCell>
      </CommonTableRow>
      <CommonTableRow height="44" is-last-row v-if="isAllAllocationTarget">
        <CommonTableTitleCell title="제외 회원" is-first-col />
        <CommonTableContentCell>
          <WelfareMdButton label="회원선택" :disabled="isDisabled" button-type="liner" button-size="small" @on-click="showModelSearchMember" />
        </CommonTableContentCell>
      </CommonTableRow>
    </CommonTable>

    <CommonTable class="wf-mt-12" v-if="values.targetKind === MenberPointTargetKindType.BULK_ALLOCATION">
      <CommonTableRow>
        <CommonTableTitleCell title="양식 다운로드" is-first-col />
        <CommonTableContentCell>
          <WelfareMdButton label="양식 다운로드" :disabled="isDisabled" button-type="liner" button-size="small" @on-click="downloadSampleFile" />
        </CommonTableContentCell>
      </CommonTableRow>
      <CommonTableRow height="84" is-last-row>
        <CommonTableTitleCell title="엑셀파일 등록" is-first-col />
        <CommonTableContentCell>
          <div class="wf_flex wf_flex-col wf_w-full">
            <div class="wf_flex wf_flex-row wf_items-center wf-mb-10">
              <WelfareMdButton label="파일선택" buttonType="liner" class="wf_w-68" buttonSize="small" @on-click="openFileInput" />
              <span class="wf-body_04-reg wf_text-sub-01 wf-ml-10">*지원하는 파일 형식 : .xls</span>
            </div>
            <div class="wf_flex wf_flex-row wf_w-full">
              <div class="wf-search-input-wrapper wf_w-full">
                <input type="file" ref="inputFileEl" hidden :accept="XLS_ACCEPTED_TYPE" @change="handleFileUpload" />
                <WelfareInputText
                  inputType="text"
                  class="wf_w-full wrap-input wf_flex wf_flex-row"
                  placeholder="선택된 파일이 없습니다"
                  :model-value="inputFileName"
                  size="small"
                >
                  <template v-if="inputFileName" #icon>
                    <button type="button" @click="resetFile" class="wf-icon-input-text wf_right-2 wf-py-4 wf-pointer">
                      <WelfareCloseIcon :width="10" :height="10" />
                    </button>
                  </template>
                </WelfareInputText>
                <div class="wf-inp-el-overlay_1" @click="openFileInput"></div>
                <div class="wf-inp-el-overlay_2"></div>
              </div>
              <WelfareMdButton label="업로드" class="wf_w-55 wf-ml-6" buttonType="liner" button-size="small" @on-click="handleRegisterMember" />
            </div>
          </div>
        </CommonTableContentCell>
      </CommonTableRow>
    </CommonTable>

    <div class="wf-mt-12">
      <MemberRegistrationBulk
        is-not-container
        ref="refTable"
        v-if="values.targetKind === MenberPointTargetKindType.BULK_ALLOCATION && !pointDetail.pointKey"
        hidden-action
        :is-loading="currentActive ? isLoadingFail : isLoadingSuccess"
        :total-success-items="totalSuccessItems"
        :list-checked="listChecked"
        :items="currentActive ? pageItemsFail : pageItemsSuccess"
        :total-items="currentActive ? totalFailItems : totalSuccessItems"
        :total-fail-items="totalFailItems"
        :tab-panel-props="tabPanelProps"
        :current-active="currentActive"
        @delete-records="onDeleteRecords"
        @register-records="onRegisterRecords"
        @row-selected="onRowSelected"
        @select-all-change="onSelectAllChange"
        @page-change="onPageChange"
        @tab-change="handleTabChange"
        @downloadFile="onDownload"
      />

      <MemberSpecifyInBulkTable
        v-else-if="pointDetail.pointKey"
        :is-loading="isLoadingResult"
        @page-change="onPageChange"
        :items="resultItems"
        :total-items="items?.length ?? 0"
        :show-selection="false"
      >
        <template #buttons>
          <WelfareMdButton label="엑셀 다운로드" class="wf_w-91" buttonType="liner" button-size="small" @on-click="handleDownloadAllResult" />
        </template>
        <template #title>
          <span class="wf-body_01-semi wf-mr-4">일괄지정 총 {{ formatNumberDot(items?.length ?? 0) }} 건</span>
        </template>
      </MemberSpecifyInBulkTable>

      <MemberSpecifyInBulkTable
        v-else-if="values.targetKind === MenberPointTargetKindType.ALL_MEMBER"
        :items="memberAllItems"
        :total-items="items?.length ?? 0"
        hidden-title
        :column-configs="memberPointAllocationSpecifyInBulkSearchMemberHeaderTableConfig"
        ref="refTable"
        :is-loading="isLoadingMember"
        :is-select-invisible="isAllAllocationTarget"
        @page-change="onPageChange"
        @delete-records="onDeleteRecords"
        @row-selected="onRowSelectedMember"
        @select-all-change="onSelectAllChangeMember"
      >
        <template #buttons>
          <WelfareMdButton label="선택삭제" class="wf_w-72" buttonType="liner" @on-click="onClickDeleteRecords" />
        </template>
      </MemberSpecifyInBulkTable>

      <MemberSpecifyInBulkTable
        v-else
        :items="bulkItems"
        :total-items="items?.length ?? 0"
        hidden-title
        :is-loading="isLoadingBulk"
        :column-configs="memberPointAllocationSpecifyInBulkSearchSpecificMemberHeaderTableConfig"
        ref="refTable"
        :is-select-invisible="isAllAllocationTarget"
        @page-change="onPageChange"
        @delete-records="onDeleteRecords"
        @row-selected="onRowSelectedMember"
        @select-all-change="onSelectAllChangeMember"
      >
        <template #buttons>
          <WelfareMdButton label="초기화" class="wf_w-57" buttonType="liner" @on-click="onResetDataTable" />
          <WelfareMdButton label="선택삭제" class="wf_w-69" buttonType="liner" @on-click="onClickDeleteRecords" />
          <WelfareMdButton label="회원조회" class="wf_w-69" buttonType="liner" @on-click="showModelSearchMember" />
          <WelfareMdButton label="엑셀 다운로드" class="wf_w-96" buttonType="liner" @on-click="handleExportExcel" />
        </template>
      </MemberSpecifyInBulkTable>
    </div>

    <CommonTable class="wf-mt-12">
      <CommonTableRow height="42" is-last-row>
        <CommonTableTitleCell title="등록자" is-first-col />
        <CommonTableContentCell :text="pointDetail?.auditing?.registerName ? `${pointDetail?.auditing?.registerName}(${pointDetail?.auditing?.registerKey})` : ''" />
        <CommonTableTitleCell title="등록일자" />
        <CommonTableContentCell :text="pointDetail?.auditing?.registeredDate ? formatTime(pointDetail?.auditing?.registeredDate ?? '', FORMAT_DATE_TIME_YYYY_MM_DD_HH_MM_SS) : ''" />
      </CommonTableRow>
    </CommonTable>
    <div class="wf-mt-30 wf-mx--1 wf-mt--1 wf_flex wf_justify-between">
      <WelfareBigButton class="wf_w-120" button-type="neatral" label="초기화" @on-click="() => resetForm()" />
      <WelfareBigButton class="wf_w-120" button-type="neatral" label="차감등록" :disabled="registerBtnDisabled" @on-click="onRegister" />
    </div>
  </div>
</template>
