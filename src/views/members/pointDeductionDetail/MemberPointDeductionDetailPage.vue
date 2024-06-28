<!-- BO_B0202_010201 -->

<script lang="ts" setup>
import {
  CommonTable,
  CommonTableContentCell,
  CommonTableRow,
  CommonTableTitleCell,
  DataTableContainer,
  TextareaMaxLengthBytes,
  WelfareInputText,
  WelfareMdButton,
  WelfareRadioGroup
} from '@/components'
import { MenberPointTargetKindType, memberPointProcessCategoryOptions } from '@/models/views/members/memberWelfarePoint/MemberWelfarePointModel'
import { useMemberPointDeductionDetail } from '@/composables/members/pointDeduction/useMemberPointDeductionDetail'
import { DEFAULT_DATE_FORMAT, FORMAT_DATE_DOT_YYYY_MM_DD_hh_mm, formatNumberDot, formatTime } from '@/common'
import { MemberPointDeductionDetailConfig } from '@/models/views/members/memberWelfarePoint/MemberWelfarePointDeductionDetailModel'

const { pointDetail, totalPoints, targetKindOptions, loading, pageItems, onPageChange, totalItems, onExport } = useMemberPointDeductionDetail()
</script>

<template>
  <div class="wf_border-page wf-px-30 wf-py-30">
    <CommonTable>
      <CommonTableRow height="43">
        <CommonTableTitleCell title="복지포인트 차감코드" is-first-col />
        <CommonTableContentCell
          ><span class="wf-body_03-reg wf_text--14 wf_text-n-33">{{ pointDetail?.pointKey }}</span></CommonTableContentCell
        >
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
            :model-value="pointDetail?.processCategory?.code"
            :disabled="true"
          />
        </CommonTableContentCell>
        <CommonTableTitleCell title="복지포인트 유형" required />
        <CommonTableContentCell :text="pointDetail?.detailedCategory?.title"> </CommonTableContentCell>
      </CommonTableRow>
      <CommonTableRow height="44">
        <CommonTableTitleCell title="복지포인트 차감명" is-first-col required />
        <CommonTableContentCell :text="pointDetail?.pointName" />
      </CommonTableRow>
      <CommonTableRow height="44">
        <CommonTableTitleCell title="차감일시" is-first-col required />
        <CommonTableContentCell :text="formatTime(pointDetail?.deductionDate ?? '', DEFAULT_DATE_FORMAT)" />
      </CommonTableRow>
      <CommonTableRow height="44">
        <CommonTableTitleCell title="차감 복지포인트" is-first-col required />
        <CommonTableContentCell v-if="pointDetail?.targetKind?.code !== MenberPointTargetKindType.BULK_ALLOCATION">
          <span class="wf-body_03-reg wf_text-n-33">인당</span>
          <WelfareInputText
            class="wf-ml-20 wf_w-180"
            size="small"
            placeholder="숫자만 입력"
            text-align="right"
            disabled
            :model-value="pointDetail?.pointAmount as string"
          />
          <span class="wf-ml-6 wf-body_03-reg wf_text-n-33">포인트</span>
        </CommonTableContentCell>
        <CommonTableContentCell v-else text="일괄 지정" />
        <CommonTableTitleCell title="총 차감 복지포인트" />
        <CommonTableContentCell :text="`${formatNumberDot(totalPoints)} 포인트`" />
      </CommonTableRow>
      <CommonTableRow height="153">
        <CommonTableTitleCell title="관리자 메모" is-first-col />
        <CommonTableContentCell>
          <TextareaMaxLengthBytes
            class="wf_w-full wf_i-h-120"
            placeholder="관리자 메모 입력"
            size="small"
            hidden-warning
            :max-bytes="100"
            disabled
            :model-value="pointDetail?.managerMemo"
          />
        </CommonTableContentCell>
      </CommonTableRow>
      <CommonTableRow height="153">
        <CommonTableTitleCell title="차감등록 사유 입력" is-first-col required />
        <CommonTableContentCell>
          <TextareaMaxLengthBytes
            class="wf_w-full wf_i-h-120"
            placeholder="관리자 메모 입력"
            size="small"
            hidden-warning
            :max-bytes="100"
            disabled
            :model-value="pointDetail?.processReason"
          />
        </CommonTableContentCell>
      </CommonTableRow>
      <CommonTableRow height="42" :is-last-row="true">
        <CommonTableTitleCell title="복지포인트 차감 대상" is-first-col required />
        <CommonTableContentCell>
          <WelfareRadioGroup size="sm" name="targetKind" disabled :options="targetKindOptions" :model-value="pointDetail?.targetKind?.code" />
        </CommonTableContentCell>
      </CommonTableRow>
    </CommonTable>
    <div class="wf-mt-12">
      <DataTableContainer
        :total-records="totalItems"
        :column-configs="MemberPointDeductionDetailConfig"
        :value="pageItems"
        :loading="loading"
        @page-change="onPageChange"
      >
        <template #title>
          <h6 class="wf_text-n-33">총 {{ totalItems }} 건</h6>
        </template>
        <template #buttons>
          <div class="wf-space-x-6 wf_flex wf_justify-center wf_items-center">
            <WelfareMdButton @on-click="onExport" label="엑셀 다운로드" class="wf_w-96" buttonType="liner" />
          </div>
        </template>
      </DataTableContainer>
    </div>
    <CommonTable class="wf-mt-12">
      <CommonTableRow height="44" is-last-row>
        <CommonTableTitleCell title="등록자" is-first-col />
        <CommonTableContentCell :text="`${pointDetail?.auditing?.registerName} (${pointDetail?.auditing?.registerKey})`" />
        <CommonTableTitleCell title="등록일자" />
        <CommonTableContentCell :text="formatTime(pointDetail?.auditing?.registeredDate ?? '', FORMAT_DATE_DOT_YYYY_MM_DD_hh_mm)" />
      </CommonTableRow>
    </CommonTable>
  </div>
</template>
