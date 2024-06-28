<!-- BO_B0102_010101 -->
<!-- BO_B0102_020101 -->
<!-- BO_B0102_040101 -->
<script setup lang="ts">
import { XLS_ACCEPTED_TYPE } from '@/common'
import { WelfareCloseIcon } from '@/components'
import MemberBulkRegistrationTable from '@/components/members/memberRegistration/MemberBulkRegistrationTable.vue'
import { WelfareBigButton, WelfareInputText, WelfareMdButton, WelfareTabOutline } from '@/components/uikit'
import { useMemberBulkRegistration } from '@/composables/members/memberRegistration/useMemberBulkRegistration'

const {
  currentActive,
  handleTabChange,
  tabData,
  tabPanelProps,
  resetFile,
  downloadSampleFile,
  openFileInput,
  inputFileName,
  inputFileEl,
  handleFileUpload,
  handleRegisterMember,
  totalItems,
  onPageChange,
  onDeleteRecords,
  onRegisterRecords,
  onDownload,
  onRowSelected,
  onSelectAllChange,
  totalSuccessItems,
  totalFailItems,
  pageItemsSuccess,
  isLoadingSuccess,
  pageItemsFail,
  isLoadingFail,
  registerSucceed,
  tableRef
} = useMemberBulkRegistration()
</script>

<template>
  <div class="wf_member-wrapper">
    <div class="wf_member-bulk-reg-wrapper wf-space-y-26 wf_flex wf_flex-col wf_items-center wf_border-b-n-33">
      <div class="wf-btn-border--ncc wf_br-6 wf_w-full">
        <div class="wf_flex wf_flex-col wf_h-44 wf_border-b-n-33">
          <div class="wf_flex wf_flex-row wf_h-43">
            <div class="wf_bg-bg-gray wf_w-150 wf-px-14 wf-py-14 wf_items-center wf_border-tl-r-6 wf_border-r-n-33">
              <p class="wf-body_02-semi wf_text-n-33">양식 다운로드</p>
            </div>
            <div class="wf_h-43 wf-px-11 wf-py-6">
              <WelfareMdButton label="엑셀 양식 다운로드" buttonType="liner" class="wf_w-115" buttonSize="small" @on-click="downloadSampleFile" />
            </div>
          </div>
        </div>
        <div class="wf_flex wf_flex-col">
          <div class="wf_flex wf_flex-row">
            <div class="wf_bg-bg-gray wf_w-150 wf-px-14 wf-py-14 wf_border-bl-r-6 wf_flex wf_items-center wf_border-r-n-33">
              <p class="wf-body_02-semi wf_text-n-33">엑셀 파일 등록</p>
            </div>
            <div class="wf_flex wf_flex-col wf_items-start wf-px-11 wf-space-y-4 wf-py-6 wf_flex-grow-1">
              <div class="wf_flex wf_items-end wf-space-x-6">
                <WelfareMdButton label="파일 선택" buttonType="liner" class="wf_w-68" buttonSize="small" @on-click="openFileInput" />
                <span class="wf-body_04-reg wf_text-sub-01">*지원하는 파일 형식 : .xls</span>
              </div>
              <div class="wf_w-full">
                <div class="wf-search-input-wrapper wf_w-full">
                  <input type="file" ref="inputFileEl" hidden :accept="XLS_ACCEPTED_TYPE" @change="handleFileUpload" />
                  <WelfareInputText
                    inputType="text"
                    class="wf_w-full wrap-input wf_flex wf_flex-row"
                    placeholder="선택된 파일이 없습니다"
                    :model-value="inputFileName"
                  >
                    <template #icon>
                      <button type="button" @click="resetFile" class="wf-icon-input-text wf_right-6 wf-py-4 wf-pointer">
                        <WelfareCloseIcon :width="10" :height="10" />
                      </button>
                    </template>
                  </WelfareInputText>
                  <div class="wf-inp-el-overlay_1" @click="openFileInput"></div>
                  <div class="wf-inp-el-overlay_2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <WelfareBigButton label="업로드" buttonType="default" @on-click="handleRegisterMember" />
    </div>

    <div class="wf_member-bulk-reg-table-wrapper">
      <WelfareTabOutline @tab-change="handleTabChange" :activeIndex="currentActive" :wfTabPanelProps="tabPanelProps" v-if="!registerSucceed" lazy>
        <template #wf-tab-text-content="{ tabIndex }">
          <component
            ref="tableRef"
            :is="tabData[tabIndex].component"
            :data="tabIndex ? pageItemsFail : pageItemsSuccess"
            :loading="tabIndex ? isLoadingFail : isLoadingSuccess"
            :totalElement="totalItems"
            :totalItems="tabIndex ? totalFailItems : totalSuccessItems"
            :totalSuccessElement="totalSuccessItems"
            :totalFailElement="totalFailItems"
            :reasonRefused="tabIndex ? true : false"
            :showSelection="!registerSucceed && !tabIndex"
            :registerSucceed="registerSucceed"
            @pageChange="onPageChange"
            @rowCheckedChange="onRowSelected"
            @selectAllChange="onSelectAllChange"
            @deleteRecords="onDeleteRecords"
            @registerRecords="onRegisterRecords"
            @downloadFile="onDownload"
            :currentActive="currentActive"
          />
        </template>
      </WelfareTabOutline>
      <MemberBulkRegistrationTable
        :data="pageItemsSuccess"
        :loading="isLoadingSuccess"
        :totalElement="totalItems"
        :totalItems="totalItems"
        :totalSuccessElement="totalSuccessItems"
        :totalFailElement="totalFailItems"
        :reasonRefused="false"
        :showSelection="false"
        :registerSucceed="registerSucceed"
        @pageChange="onPageChange"
        @rowCheckedChange="onRowSelected"
        @selectAllChange="onSelectAllChange"
        @deleteRecords="onDeleteRecords"
        @registerRecords="onRegisterRecords"
        @downloadFile="onDownload"
        v-else
        :currentActive="currentActive"
      >
      </MemberBulkRegistrationTable>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/member/memberRegistration/member-bulk-registration.css');
</style>
