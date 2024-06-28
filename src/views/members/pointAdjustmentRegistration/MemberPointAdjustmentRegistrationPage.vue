<!-- BO_B0201_030101 -->

<script setup lang="ts">
import { acceptNumberKey, formatNumberDot } from '@/common'
import MemberPointAdjustmentTable from '@/components/members/memberPointAllocation/MemberPointAdjustmentTable.vue'
import MemberSpecifyInBulkTable from '@/components/members/pointUsageList/MemberSpecifyInBulkTable.vue'
import WelfareBigButton from '@/components/uikit/button/WelfareBigButton.vue'
import WelfareMdButton from '@/components/uikit/button/WelfareMdButton.vue'
import WelfareInputText from '@/components/uikit/input/WelfareInputText.vue'
import WelfareRadioGroup from '@/components/uikit/radio/WelfareRadioGroup.vue'
import CommonTable from '@/components/uikit/table/CommonTable.vue'
import CommonTableContentCell from '@/components/uikit/table/CommonTableContentCell.vue'
import CommonTableRow from '@/components/uikit/table/CommonTableRow.vue'
import CommonTableTitleCell from '@/components/uikit/table/CommonTableTitleCell.vue'
import TextareaMaxLengthBytes from '@/components/widgets/textInput/TextareaMaxLengthBytes.vue'
import { useMemberPointAdjustmentRegistration } from '@/composables/members/welfarePointAllocation/useMemberPointAdjustmentRegistration'
import { memberPointProcessCategoryOptions } from '@/models/views/members/memberWelfarePoint/MemberWelfarePointModel'
import { TabManagerModelExpose } from '@/models/widgets/TabModel'

const {
  memberTableRef,
  currentData,
  pointKey,
  registerBtnDisabled,
  resgistrationStatus,
  targetKindOptions,
  isAllAllocationTarget,
  values,
  valuesComputed,
  setFieldValue,
  onRegister,
  onReset,
  onCloseTab
} = useMemberPointAdjustmentRegistration()

defineExpose<TabManagerModelExpose>({
  onClose: onCloseTab
})
</script>

<template>
  <div class="wf_border-page wf-px-30 wf-py-30">
    <CommonTable>
      <CommonTableRow height="43">
        <CommonTableTitleCell title="복지포인트 배정 코드" is-first-col />
        <CommonTableContentCell :text="(pointKey as string) ?? '-'" />
        <CommonTableTitleCell title="등록상태" />
        <CommonTableContentCell :text="resgistrationStatus" />
      </CommonTableRow>
      <CommonTableRow height="44">
        <CommonTableTitleCell title="복지포인트 구분" is-first-col required />
        <CommonTableContentCell>
          <WelfareRadioGroup
            size="sm"
            name="processCategory"
            disabled
            :options="memberPointProcessCategoryOptions"
            :model-value="values.processCategory"
            @update:model-value="(value) => setFieldValue('processCategory', value)"
          />
        </CommonTableContentCell>
        <CommonTableTitleCell title="복지포인트 유형" required />
        <CommonTableContentCell :text="valuesComputed.detailedCategory"> </CommonTableContentCell>
      </CommonTableRow>
      <CommonTableRow height="44">
        <CommonTableTitleCell title="복지포인트 배정명" is-first-col required />
        <CommonTableContentCell :text="values.pointName" />
      </CommonTableRow>
      <CommonTableRow height="44">
        <CommonTableTitleCell title="배정 복지포인트" is-first-col required />
        <CommonTableContentCell>
          <span class="wf-body_03-reg wf_text-n-33">인당</span>
          <WelfareInputText
            class="wf-ml-20 wf_w-180"
            size="small"
            placeholder="숫자만 입력"
            text-align="right"
            disabled
            :model-value="(formatNumberDot((values.pointAmount ?? '') as number) as string) ?? ''"
            @keypress="acceptNumberKey"
            @update:model-value="(value) => setFieldValue('pointAmount', value)"
          />
          <span class="wf-ml-6 wf-body_03-reg wf_text-n-33">포인트</span>
        </CommonTableContentCell>
        <CommonTableTitleCell title="총 배정 복지포인트" />
        <CommonTableContentCell :text="`${valuesComputed.totalPoints} 포인트`" />
      </CommonTableRow>
      <CommonTableRow height="44">
        <CommonTableTitleCell title="사용 시작" is-first-col required />
        <CommonTableContentCell :text="valuesComputed.useStartDate"> </CommonTableContentCell>
        <CommonTableTitleCell title="사용 종료" required />
        <CommonTableContentCell :text="valuesComputed.useEndDate"> </CommonTableContentCell>
      </CommonTableRow>
      <CommonTableRow height="154">
        <CommonTableTitleCell title="관리자 메모" is-first-col />
        <CommonTableContentCell>
          <TextareaMaxLengthBytes
            class="wf_w-full wf_i-h-120"
            placeholder="내용 입력"
            size="small"
            hidden-warning
            :max-bytes="50"
            :model-value="values.managerMemo"
            disabled
            @update:model-value="(value) => setFieldValue('managerMemo', value)"
          />
        </CommonTableContentCell>
      </CommonTableRow>
      <CommonTableRow height="150">
        <CommonTableTitleCell title="조정등록 사유 입력" is-first-col required />
        <CommonTableContentCell>
          <TextareaMaxLengthBytes
            class="wf_w-full wf_i-h-120"
            placeholder="조정사유를 입력 합니다."
            size="small"
            hidden-warning
            :max-bytes="50"
            :model-value="values.processReason"
            @update:model-value="(value) => setFieldValue('processReason', value)"
          />
        </CommonTableContentCell>
      </CommonTableRow>
      <CommonTableRow height="44" :is-last-row="!isAllAllocationTarget">
        <CommonTableTitleCell title="복지포인트 배정 대상" is-first-col required />
        <CommonTableContentCell>
          <WelfareRadioGroup
            size="sm"
            name="targetKind"
            disabled
            :options="targetKindOptions"
            :model-value="values.targetKind"
            @update:model-value="(value) => setFieldValue('targetKind', value)"
          />
        </CommonTableContentCell>
      </CommonTableRow>
      <CommonTableRow height="44" is-last-row v-if="isAllAllocationTarget">
        <CommonTableTitleCell title="제외 회원" is-first-col />
        <CommonTableContentCell>
          <WelfareMdButton label="회원선택" button-type="liner" disabled button-size="small" />
        </CommonTableContentCell>
      </CommonTableRow>
    </CommonTable>

    <div class="wf-mt-12">
      <MemberSpecifyInBulkTable
        v-if="isAllAllocationTarget"
        hidden-title
        :hidden-pagination="isAllAllocationTarget"
        :is-select-invisible="isAllAllocationTarget"
      >
        <template #buttons>
          <WelfareMdButton disabled label="선택삭제" class="wf_w-72" buttonType="liner" />
        </template>
      </MemberSpecifyInBulkTable>
    </div>

    <CommonTable class="wf-mt-12">
      <CommonTableRow height="42">
        <CommonTableTitleCell title="등록자" is-first-col />
        <CommonTableContentCell :text="valuesComputed.register"></CommonTableContentCell>
        <CommonTableTitleCell title="등록일자" />
        <CommonTableContentCell :text="valuesComputed.registeredDate" />
      </CommonTableRow>
      <CommonTableRow height="42" is-last-row>
        <CommonTableTitleCell title="조정자" is-first-col />
        <CommonTableContentCell :text="valuesComputed.modifier"></CommonTableContentCell>
        <CommonTableTitleCell title="조정일자" />
        <CommonTableContentCell :text="valuesComputed.modifiedDate" />
      </CommonTableRow>
    </CommonTable>

    <div class="wf-mt-30">
      <MemberPointAdjustmentTable ref="memberTableRef" :data="currentData?.foMembers" />
    </div>

    <div class="wf-mt-30 wf-mx--1 wf-mt--1 wf_flex wf_justify-center wf-space-x-20">
      <WelfareBigButton class="wf_w-230" button-type="neatral" label="초기화" @on-click="onReset" />
      <WelfareBigButton class="wf_w-230" button-type="default" label="조정등록" :disabled="registerBtnDisabled" @on-click="onRegister" />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'MemberPointAdjustmentRegistrationPage'
}
</script>

<style>
@import url('@/assets/css/view/common/form-data-table-list.css');
</style>
