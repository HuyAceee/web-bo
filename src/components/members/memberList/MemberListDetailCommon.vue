<script setup lang="ts">
import { handleKeyBackspaceResetValue } from '@/common';
import { CommonTable, CommonTableContentCell, CommonTableRow, CommonTableTitleCell, WelfareInputText, WelfareMdButton } from '@/components'
import { MemberDetailBaseModel } from '@/models'

interface MemberListDetailCommonProps {
  data?: MemberDetailBaseModel
  name?: string
}
interface MemberListDetailCommonEmits {
  (e: 'update:name', value: string): void
  (e: 'onCheck'): void
  (e: 'onRegister'): void
  (e: 'onClear'): void
}
defineProps<MemberListDetailCommonProps>()
defineEmits<MemberListDetailCommonEmits>()
</script>
<template>
  <CommonTable>
    <CommonTableRow height="43">
      <CommonTableTitleCell title="회원명 (회원코드)" isFirstCol />
      <CommonTableContentCell>
        <div class="wf_flex wf-space-x-4 wf-ml--1">
          <div @click="() => !$props.name && $emit('onCheck')" class="wf_relative wf-pointer">
            <WelfareInputText :model-value="$props.name" @keydown="($event) => handleKeyBackspaceResetValue($event, () => $emit('update:name', ''))" @update:model-value="(value) => $emit('update:name', value)" class="wf_w-180" size="small" />
            <div class="wf-el-overlay" v-if="!$props.name"></div>
          </div>
          <WelfareMdButton button-size="small" button-type="liner" label="조회" @on-click="$emit('onCheck')" />
        </div>
      </CommonTableContentCell>
      <CommonTableTitleCell title="회원아이디" />
      <CommonTableContentCell :text="$props?.data?.id" />
      <CommonTableTitleCell title="회원 등급" />
      <CommonTableContentCell :text="$props?.data?.membershipLevel?.title" />
    </CommonTableRow>
    <CommonTableRow height="44">
      <CommonTableTitleCell title="휴대폰번호" isFirstCol />
      <CommonTableContentCell :text="$props?.data?.phoneNumber" />
      <CommonTableTitleCell title="성별" />
      <CommonTableContentCell :text="$props?.data?.gender?.title" />
      <CommonTableTitleCell title="사번" />
      <CommonTableContentCell :text="$props?.data?.cleanup" />
    </CommonTableRow>
    <CommonTableRow height="44">
      <CommonTableTitleCell title="직급" isFirstCol />
      <CommonTableContentCell :text="$props?.data?.rank" />
      <CommonTableTitleCell title="재직상태" />
      <CommonTableContentCell :text="$props?.data?.employmentStatus?.title" />
      <CommonTableTitleCell title="계정상태" />
      <CommonTableContentCell :text="$props?.data?.accountStatus?.title" />
    </CommonTableRow>
    <CommonTableRow height="42" isLastRow>
      <CommonTableTitleCell title="고객사코드" isFirstCol />
      <CommonTableContentCell :text="$props?.data?.companyCode" />
      <CommonTableTitleCell title="고객사" />
      <CommonTableContentCell :text="$props?.data?.customer" />
      <CommonTableTitleCell title="블랙회원" />
      <CommonTableContentCell>
        <WelfareMdButton
          v-if="$props.data?.membershipLevel?.code != 'BLACK'"
          button-size="small"
          button-type="liner"
          label="등록"
          @on-click="$emit('onRegister')"
        />
        <WelfareMdButton v-else button-size="small" button-type="liner" label="해제" @on-click="$emit('onClear')" />
      </CommonTableContentCell>
    </CommonTableRow>
  </CommonTable>
</template>
