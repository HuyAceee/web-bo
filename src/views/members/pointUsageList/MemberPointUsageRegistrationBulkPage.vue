<!-- BO_B0201_020101 -->

<script setup lang="ts">
import { FORMAT_DATE_DOT_YYYY_MM_DD_hh_mm, TEXTAREA_NUMBER_200, XLS_ACCEPTED_TYPE, acceptNumberKey, formatNumberDot } from '@/common'
import { TextInputValidationMaxBytes, WelfareCloseIcon } from '@/components'
import MemberRegistrationBulk from '@/components/members/pointUsageList/MemberRegistrationBulk.vue'
import MemberRegistrationBulkAction from '@/components/members/pointUsageList/MemberRegistrationBulkAction.vue'
import MemberSpecifyInBulkTable from '@/components/members/pointUsageList/MemberSpecifyInBulkTable.vue'
import { WelfareDateTimePicker, WelfareInputText, WelfareMdButton, WelfareRadioGroup, WelfareSelect } from '@/components/uikit'
import FormGroup from '@/components/widgets/form/FormGroup.vue'
import TextareaCount from '@/components/widgets/textInput/TextareaCount.vue'
import { useMemberPointUsageRegistrationBulk } from '@/composables/members/pointUsageList/useMemberPointUsageRegistrationBulk'
import { MenberPointTargetKindType, memberPointProcessCategoryOptions } from '@/models/views/members/memberWelfarePoint/MemberWelfarePointModel'
import {
  memberPointAllocationSpecifyInBulkSearchMemberHeaderTableConfig,
  memberPointAllocationSpecifyInBulkSearchSpecificMemberHeaderTableConfig,
  memberTransferHistoryHeaderTableConfig
} from '@/models/views/members/pointUsageList/MemberPointAllocationSpecifyInBulkModel'

const {
  values,
  setFieldValue,
  optionsPointType,
  handelChangeTextareaNotes,
  readOnlyTextareaNotes,
  resetForm,
  handleFileUpload,
  inputFileEl,
  openFileInput,
  resetFile,
  inputFileName,
  isAllAllocationTarget,
  handleTabChange,
  isLoadingFail,
  isLoadingSuccess,
  onDeleteRecords,
  onDownload,
  onRegisterRecords,
  onRowSelected,
  onSelectAllChange,
  pageItemsFail,
  pageItemsSuccess,
  totalSuccessItems,
  onPageChange,
  listChecked,
  currentActive,
  tabPanelProps,
  downloadSampleFile,
  handleRegisterMember,
  handleSubmitValidation,
  pointDetail,
  claimStatus,
  pointHistories,
  targetKindOptions,
  onRowSelectedMember,
  onSelectAllChangeMember,
  onResetDataTable,
  handleExportExcel,
  onClickDeleteRecords,
  showModelSearchMember,
  items,
  handleDownloadAllResult,
  refTable,
  totalPoint,
  isDisabled,
  bulkItems,
  isLoadingBulk,
  memberAllItems,
  isLoadingMember,
  resultItems,
  isLoadingResult
} = useMemberPointUsageRegistrationBulk()
</script>

<template>
  <div class="wf-body-wrap-content wf-pt-29">
    <form class="wf-space-y-12 wf_flex wf_flex-col wf-mt-0">
      <div class="wf-btn-border--bg-color-line-gray wf_br-6">
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-10" is-rounded-top label="복지포인트배정코드">
            <span class="wf-body_03-reg wf_text-n-33">{{ pointDetail.pointKey }}</span></FormGroup
          >
          <FormGroup is-border-left class="wf_flex-1" custom-class="wf-pb-1 " label="등록상태">
            <span class="wf-body_03-reg wf_text-n-33">{{ claimStatus }}</span>
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1" custom-class="wf-pb-1 " label="복지포인트 구분" required>
            <WelfareRadioGroup
              :model-value="values.processCategory"
              @update:model-value="(value) => setFieldValue('processCategory', value)"
              :options="memberPointProcessCategoryOptions"
              :disabled="isDisabled"
              size="sm"
            />
          </FormGroup>
          <FormGroup is-border-left class="wf_flex-1" custom-class="wf-pb-1 " label="복지포인트 유형" required>
            <WelfareSelect
              class="wf_w-180"
              optionLabel="label"
              optionValue="value"
              :model-value="values.detailedCategory"
              :options="optionsPointType"
              :disabled="isDisabled"
              @update:modelValue="(value) => setFieldValue('detailedCategory', value)"
              small
              placeholder="선택"
            />
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-10" label="복지포인트 배정명" required>
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
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-10" label="배정 복지포인트" required>
            <span class="wf-body_03-reg wf_text-n-33">인당</span>
            <WelfareInputText
              class="wf-ml-23 wf_w-180"
              size="small"
              placeholder="숫자만 입력"
              text-align="right"
              type="number"
              input-type="number"
              :disabled="isDisabled"
              @keypress="acceptNumberKey"
              :model-value="values.pointAmount as string"
              @update:model-value="(value) => setFieldValue('pointAmount', value)"
            />
            <span class="wf-ml-6 wf-body_03-reg wf_text-n-33">포인트</span>
          </FormGroup>
          <FormGroup is-border-left class="wf_flex-1" custom-class="wf-pb-1 " label="총 배정 복지포인트">
            <span class="wf-body_03-reg wf_text-n-33">{{ `${formatNumberDot(totalPoint)} 포인트` }}</span>
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-10" label="사용 시작" required>
            <WelfareDateTimePicker
              size="small"
              :format="FORMAT_DATE_DOT_YYYY_MM_DD_hh_mm"
              :model-value="values.useStartDate"
              :disabled="isDisabled"
              @update:model-value="(value) => setFieldValue('useStartDate', value)"
              :max-date="values.useEndDate"
            />
          </FormGroup>
          <FormGroup is-border-left class="wf_flex-1" custom-class="wf-pb-1 wf-pl-10" label="사용 종료" required>
            <WelfareDateTimePicker
              size="small"
              :format="FORMAT_DATE_DOT_YYYY_MM_DD_hh_mm"
              :model-value="values.useEndDate"
              :disabled="isDisabled"
              @update:model-value="(value) => setFieldValue('useEndDate', value)"
              :min-date="values.useStartDate"
            />
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1 wf-administrator-notes" label="관리자 메모">
            <div class="wf-py-7 wf-width-full">
              <TextareaCount
                :model-value="values.managerMemo"
                :readonly="readOnlyTextareaNotes"
                :disabled="isDisabled"
                @update:model-value="handelChangeTextareaNotes"
                placeholder="상세 내용을 입력해 주세요."
                class="wf-administrator-notes-textarea"
                :max="TEXTAREA_NUMBER_200"
              >
                <template #note>
                  <span class="wf_text-sub-01 wf-body_04-reg wf-pl-11" />
                </template>
              </TextareaCount>
            </div>
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup
            class="wf_flex-1"
            custom-class="wf-pb-1 "
            label="복지포인트배정대상"
            required
            :isBorderBottom="isAllAllocationTarget"
            :isRoundedBottom="!isAllAllocationTarget"
            :isRoundedTop="!isAllAllocationTarget"
          >
            <WelfareRadioGroup
              size="sm"
              name="targetKind"
              :model-value="values.targetKind"
              @update:model-value="(value) => setFieldValue('targetKind', value)"
              :options="targetKindOptions"
              :disabled="isDisabled"
            />
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center" v-if="isAllAllocationTarget">
          <FormGroup class="wf_flex-1" custom-class="wf-pb-1 " label="제외 회원" :isBorderBottom="false" isRoundedBottom isRoundedTop>
            <WelfareMdButton label="회원선택" :disabled="isDisabled" @on-click="showModelSearchMember" button-type="liner" button-size="small" />
          </FormGroup>
        </div>
      </div>

      <div class="wf-btn-border--bg-color-line-gray wf_br-6" v-if="values.targetKind === MenberPointTargetKindType.BULK_ALLOCATION">
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1" custom-class="wf-pb-1 " label="양식 다운로드" is-rounded-top>
            <WelfareMdButton
              class="wf-ml--1"
              :disabled="isDisabled"
              label="양식 다운로드"
              button-type="liner"
              button-size="small"
              @on-click="downloadSampleFile"
            />
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup
            class="wf_flex-1 wf_h-82--i wf_flex wf_flex-row"
            custom-class="wf-pb-1 wf-pr-10"
            label="엑셀파일 등록"
            required
            :isBorderBottom="false"
            isRoundedBottom
            isRoundedTop
          >
            <div class="wf_flex wf_flex-col wf_w-full wf-ml--1">
              <div class="wf_flex wf_flex-row wf_items-center wf-mb-10">
                <WelfareMdButton
                  label="파일선택"
                  :disabled="isDisabled"
                  buttonType="liner"
                  class="wf_w-66"
                  buttonSize="small"
                  @on-click="openFileInput"
                />
                <span class="wf-body_04-reg wf_text-sub-01 wf-ml-10">* 지원하는 파일형식: .xls</span>
              </div>
              <div class="wf_flex wf_flex-row wf_w-full">
                <div class="wf-search-input-wrapper wf_w-full">
                  <input type="file" ref="inputFileEl" hidden :accept="XLS_ACCEPTED_TYPE" @change="handleFileUpload" />
                  <WelfareInputText
                    inputType="text"
                    class="wf_w-full wrap-input wf_flex wf_flex-row"
                    placeholder="선택된 파일이 없습니다"
                    :model-value="inputFileName"
                    :disabled="isDisabled"
                    size="small"
                  >
                    <template v-if="inputFileName" #icon>
                      <button type="button" @click="resetFile" class="wf-icon-input-text wf_right-2 wf-py-4 wf-pointer wf-z-2">
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
          </FormGroup>
        </div>
      </div>

      <MemberRegistrationBulk
        is-not-container
        v-if="values.targetKind === MenberPointTargetKindType.BULK_ALLOCATION && !pointDetail.pointKey"
        hidden-action
        ref="refTable"
        :is-loading="currentActive ? isLoadingFail : isLoadingSuccess"
        :total-success-items="totalSuccessItems"
        :list-checked="listChecked"
        :items="currentActive ? pageItemsFail : pageItemsSuccess"
        :total-items="currentActive ? pageItemsFail?.length : pageItemsSuccess?.length"
        :total-fail-items="pageItemsFail?.length ?? 0"
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
        @page-change="onPageChange"
        :total-items="items?.length ?? 0"
        :items="resultItems"
        :is-loading="isLoadingResult"
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
        :is-loading="isLoadingMember"
        :column-configs="memberPointAllocationSpecifyInBulkSearchMemberHeaderTableConfig"
        ref="refTable"
        :hidden-pagination="isAllAllocationTarget"
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
        hidden-title
        :is-loading="isLoadingBulk"
        :column-configs="memberPointAllocationSpecifyInBulkSearchSpecificMemberHeaderTableConfig"
        ref="refTable"
        :hidden-pagination="isAllAllocationTarget"
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

      <div class="wf-btn-border--bg-color-line-gray wf_br-6" :class="{ 'wf-mt-0': isAllAllocationTarget }">
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1" custom-class="wf-pb-1 " label="등록자" is-rounded-top>
            <span class="wf-body_03-reg wf_text-n-33 wf-ml--1">{{ pointDetail.auditing?.registerName ? `${pointDetail.auditing?.registerName}(${pointDetail.auditing?.registerKey})` : '' }}</span>
          </FormGroup>
          <FormGroup class="wf_flex-1" custom-class="wf-pb-1 " label="등록 일시" is-border-left>
            <span class="wf-body_03-reg wf_text-n-33">{{ pointDetail.auditing?.registeredDate }}</span>
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1" custom-class="wf-pb-1 " label="조정자" :isBorderBottom="false" isRoundedBottom>
            <span class="wf-body_03-reg wf_text-n-33 wf-ml--1">{{ pointDetail.auditing?.modifierName ? `${pointDetail.auditing?.modifierName} (${pointDetail.auditing?.modifierKey})` : '' }}</span>
          </FormGroup>
          <FormGroup class="wf_flex-1" custom-class="wf-pb-1 " label="조정 일시" is-border-left :isBorderBottom="false">
            <span class="wf-body_03-reg wf_text-n-33">{{ pointDetail.auditing?.modifiedDate }}</span>
          </FormGroup>
        </div>
      </div>

      <div class="wf-mt-30">
        <MemberSpecifyInBulkTable
          hidden-pagination
          is-select-invisible
          :show-selection="false"
          :column-configs="memberTransferHistoryHeaderTableConfig"
          :items="pointHistories"
        >
          <template #buttons>
            <div></div>
          </template>
          <template #title>
            <span class="wf-body_01-semi wf-mr-4">배정 및 조정 이력</span>
          </template>
        </MemberSpecifyInBulkTable>
      </div>
      <MemberRegistrationBulkAction :is-adjust="!!pointDetail.pointKey" @reset="resetForm" @submit="handleSubmitValidation" />
    </form>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/member/member-register-individual-page.css');
@import url('@/assets/css/view/member/member-point-usage-registration-bulk-page.css');
</style>

<script lang="ts">
export default {
  name: 'MemberPointUsageRegistrationBulkPage'
}
</script>
