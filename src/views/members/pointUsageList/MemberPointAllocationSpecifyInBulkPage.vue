<!-- BO_B0201_020101 / BO_B0201_020301 -->

<script setup lang="ts">
import { MockDataMemberTransferHistory } from '@/assets'
import { FORMAT_DATE_DOT_YYYY_MM_DD_hh_mm, TEXTAREA_NUMBER_200, XLS_ACCEPTED_TYPE, formatNumberDot } from '@/common'
import { WelfareCloseIcon } from '@/components'
import MemberRegistrationBulk from '@/components/members/pointUsageList/MemberRegistrationBulk.vue'
import MemberSpecifyInBulkTable from '@/components/members/pointUsageList/MemberSpecifyInBulkTable.vue'
import { WelfareDateTimePicker, WelfareInputText, WelfareMdButton, WelfareRadioGroup, WelfareSelect } from '@/components/uikit'
import FormGroup from '@/components/widgets/form/FormGroup.vue'
import TextareaCount from '@/components/widgets/textInput/TextareaCount.vue'
import { useMemberPointUsageRegistrationBulk } from '@/composables/members/pointUsageList/useMemberPointUsageRegistrationBulk'
import {
  MenberPointTargetKindType,
  memberPointProcessCategoryOptions,
  memberPointTargetKindOptions
} from '@/models/views/members/memberWelfarePoint/MemberWelfarePointModel'
import { memberTransferHistoryHeaderTableConfig } from '@/models/views/members/pointUsageList/MemberPointAllocationSpecifyInBulkModel'

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
  totalFailItems,
  totalSuccessItems,
  onPageChange,
  listChecked,
  currentActive,
  tabPanelProps,
  downloadSampleFile,
  handleRegisterMember,
  isSubmitted,
  handleSubmitValidation
} = useMemberPointUsageRegistrationBulk()
</script>

<template>
  <div class="wf-body-wrap-content wf-pt-29">
    <form class="wf-space-y-12 wf_flex wf_flex-col wf-mt-0">
      <div class="wf-btn-border--bg-color-line-gray wf_br-6">
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-10" is-rounded-top label="복지포인트배정코드"> </FormGroup>
          <FormGroup is-border-left class="wf_flex-1" custom-class="wf-pb-1 " label="등록상태">
            <span class="wf-body_03-reg wf_text-n-33">작성중</span>
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1" custom-class="wf-pb-1 " label="복지포인트 구분" required>
            <WelfareRadioGroup
              :model-value="values.processCategory"
              @update:model-value="(value) => setFieldValue('processCategory', value)"
              :options="memberPointProcessCategoryOptions"
              size="sm"
            />
          </FormGroup>
          <FormGroup is-border-left class="wf_flex-1" custom-class="wf-pb-1 " label="복지포인트 유형" required>
            <WelfareSelect
              class="wf_w-180"
              optionLabel="label"
              optionValue="value"
              :model-value="optionsPointType"
              :options="optionsPointType"
              @update:modelValue="(value) => setFieldValue('detailedCategory', value.value)"
              small
              placeholder="선택"
            />
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-10" label="복지포인트 배정명" required>
            <WelfareInputText
              class="w-full"
              size="small"
              placeholder="포인트명 입력"
              :model-value="values.pointName"
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
              :model-value="values.pointAmount as string"
              @update:model-value="(value) => setFieldValue('pointAmount', value)"
            />
            <span class="wf-ml-6 wf-body_03-reg wf_text-n-33">포인트</span>
          </FormGroup>
          <FormGroup is-border-left class="wf_flex-1" custom-class="wf-pb-1 " label="총 배정 복지포인트">
            <span class="wf-body_03-reg wf_text-n-33">0,000,000 포인트</span>
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-10" label="사용 시작" required>
            <WelfareDateTimePicker
              size="small"
              :format="FORMAT_DATE_DOT_YYYY_MM_DD_hh_mm"
              :model-value="values.useStartDate"
              @update:model-value="(value) => setFieldValue('useStartDate', value)"
              :max-date="values.useEndDate"
            />
          </FormGroup>
          <FormGroup is-border-left class="wf_flex-1" custom-class="wf-pb-1 wf-pl-10" label="사용 종료" required>
            <WelfareDateTimePicker
              size="small"
              :format="FORMAT_DATE_DOT_YYYY_MM_DD_hh_mm"
              :model-value="values.useEndDate"
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
              :options="memberPointTargetKindOptions"
            />
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center" v-if="isAllAllocationTarget">
          <FormGroup class="wf_flex-1" custom-class="wf-pb-1 " label="제외 회원" :isBorderBottom="false" isRoundedBottom isRoundedTop>
            <WelfareMdButton label="회원선택" button-type="liner" button-size="small" />
          </FormGroup>
        </div>
      </div>

      <MemberRegistrationBulk
        is-not-container
        v-if="values.targetKind === MenberPointTargetKindType.BULK_ALLOCATION"
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

      <MemberSpecifyInBulkTable v-else hidden-title :hidden-pagination="isAllAllocationTarget" :is-select-invisible="isAllAllocationTarget">
        <template #buttons v-if="isAllAllocationTarget">
          <WelfareMdButton label="선택삭제" class="wf_w-72" buttonType="liner" />
        </template>
        <template #buttons v-else>
          <WelfareMdButton label="초기화" class="wf_w-57" buttonType="liner" />
          <WelfareMdButton label="선택삭제" class="wf_w-69" buttonType="liner" />
          <WelfareMdButton label="회원조회" class="wf_w-69" buttonType="liner" />
          <WelfareMdButton label="엑셀 다운로드" class="wf_w-96" buttonType="liner" />
        </template>
      </MemberSpecifyInBulkTable>

      <MemberSpecifyInBulkTable v-if="isSubmitted" :items="pageItemsSuccess">
        <template #buttons>
          <WelfareMdButton label="엑셀 다운로드" class="wf_w-91" buttonType="liner" button-size="small" @on-click="onDownload" />
        </template>
        <template #title>
          <span class="wf-body_01-semi wf-mr-4">일괄지정 총 {{ formatNumberDot(totalSuccessItems) }} 건</span>
        </template>
      </MemberSpecifyInBulkTable>

      <div class="wf-btn-border--bg-color-line-gray wf_br-6" v-if="values.targetKind === MenberPointTargetKindType.BULK_ALLOCATION">
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1" custom-class="wf-pb-1 " label="양식 다운로드" is-rounded-top>
            <WelfareMdButton class="wf-ml--1" label="양식 다운로드" button-type="liner" button-size="small" @on-click="downloadSampleFile" />
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup
            class="wf_flex-1 wf_h-82--i wf_flex wf_flex-row"
            custom-class="wf-pb-1 "
            label="엑셀파일 등록"
            required
            :isBorderBottom="false"
            isRoundedBottom
            isRoundedTop
          >
            <div class="wf_flex wf_flex-col wf_w-full wf-ml--1">
              <div class="wf_flex wf_flex-row wf_items-center wf-mb-10">
                <WelfareMdButton label="파일선택" buttonType="liner" class="wf_w-66" buttonSize="small" @on-click="openFileInput" />
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

      <div class="wf-btn-border--bg-color-line-gray wf_br-6" :class="{ 'wf-mt-0': isAllAllocationTarget }">
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1" custom-class="wf-pb-1 " label="등록자" is-rounded-top>
            <span class="wf-body_03-reg wf_text-n-33 wf-ml--1">{{ isAllAllocationTarget ? '회원아이디(회원이름)' : '관리자명(회원코드)' }}</span>
          </FormGroup>
          <FormGroup class="wf_flex-1" custom-class="wf-pb-1 " label="등록 일시" is-border-left>
            <span class="wf-body_03-reg wf_text-n-33">2023. 06. 14 00:00:00</span>
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1" custom-class="wf-pb-1 " label="조정자" :isBorderBottom="false" isRoundedBottom>
            <span class="wf-body_03-reg wf_text-n-33 wf-ml--1">{{ isAllAllocationTarget ? '회원아이디(회원이름)' : '관리자명(회원코드)' }}</span>
          </FormGroup>
          <FormGroup class="wf_flex-1" custom-class="wf-pb-1 " label="조정 일시" is-border-left :isBorderBottom="false">
            <span class="wf-body_03-reg wf_text-n-33">2023. 06. 14 00:00:00</span>
          </FormGroup>
        </div>
      </div>

      <div class="wf-mt-30">
        <MemberSpecifyInBulkTable
          hidden-pagination
          is-select-invisible
          :show-selection="false"
          :column-configs="memberTransferHistoryHeaderTableConfig"
          :items="MockDataMemberTransferHistory"
        >
          <template #buttons>
            <div></div>
          </template>
          <template #title>
            <span class="wf-body_01-semi wf-mr-4">배정 및 조정 이력</span>
          </template>
        </MemberSpecifyInBulkTable>
      </div>
      <MemberRegistrationBulkAction @reset="resetForm" @submit="handleSubmitValidation" />
    </form>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/member/member-register-individual-page.css');
@import url('@/assets/css/view/member/member-point-usage-registration-bulk-page.css');
</style>

<script lang="ts">
export default {
  name: 'MemberPointAllocationSpecifyInBulkPage'
}
</script>
