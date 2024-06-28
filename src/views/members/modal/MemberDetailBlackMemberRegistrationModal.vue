<!-- BO_B0101_020704_P -->

<script setup lang="ts">
import {
  BaseDataTablePagination,
  CommonTable,
  CommonTableContentCell,
  CommonTableRow,
  CommonTableTitleCell,
  HeaderModal,
  WelfareMdButton,
  WelfareSelect,
  TextareaMaxLengthBytes
} from '@/components'
import { useMemberDetailBlackMemberRegistrationModalLogic } from '@/composables/members/memberList/useMemberDetailBlackMemberRegistrationModalLogic'
import { MemberDetailBlackMemberRegistrationModalProps } from '@/models'
import Column from 'primevue/column'
import { FORMAT_DATE_YYYY_MM_DD_HH_mm_ss, formatTime } from '@/common'

const props = defineProps<MemberDetailBlackMemberRegistrationModalProps>()

const { customSelectOptions, reasonOptions, query, memberComputed, statusSaveButton, tableRef, items, isLoading, totalItems, onPageChange, onSave } =
  useMemberDetailBlackMemberRegistrationModalLogic(props)
</script>
<template>
  <div class="wf_w-800 wf_bg-white">
    <HeaderModal title="블랙회원 등록/관리" @close-modal="$emit('onClose')" />
    <div class="wf-px-20 wf-py-20">
      <CommonTable>
        <CommonTableRow height="44">
          <CommonTableTitleCell title="선택 회원명" is-first-col />
          <CommonTableContentCell :text="memberComputed" />
          <CommonTableTitleCell title="사유 구분" required />
          <CommonTableContentCell>
            <WelfareSelect
              class="wf_w-180"
              small
              v-model="query.reason"
              :options="reasonOptions"
              option-label="label"
              option-value="value"
              placeholder="선택"
            />
          </CommonTableContentCell>
        </CommonTableRow>
        <CommonTableRow height="150" is-last-row>
          <CommonTableTitleCell title="상세 사유" is-first-col required />
          <CommonTableContentCell>
            <TextareaMaxLengthBytes
              labelBottomRight="0/200"
              :max-bytes="200"
              class="text-area-h-120 wf-width-full"
              placeholder="상세 사유 입력"
              v-model="query.message"
              :hidden-lablel-text-bytes="true"
            />
          </CommonTableContentCell>
        </CommonTableRow>
      </CommonTable>

      <div class="wf-mt-20">
        <WelfareMdButton class="wf_w-120 wf-mx-auto" label="등록" button-type="liner" :disabled="statusSaveButton" @on-click="onSave" />
      </div>

      <hr class="wf-my-20 wf_break-line-gray" />
      <BaseDataTablePagination
        class="p-datatable-modal"
        :value="items"
        :loading="isLoading"
        :totalRecords="totalItems"
        :rows="10"
        :select-props="{ options: customSelectOptions }"
        is-select-invisible
        v-on:page-change="onPageChange"
        ref="tableRef"
        noDataLabel="리스트가 없습니다."
      >
        <template #title>
          <p class="wf-body_01-semi wf_text-n-33">블랙회원 등록 이력</p>
        </template>
        <template #columns>
          <Column key="no" columnKey="no" field="id" header="No." class="wf_col-56" />
          <Column key="detail" columnKey="detail" header="내용" class="wf_col-250">
            <template #body="slotProps">
              <div class="wf_w-full tooltip">
                <span class="line-clamp wf-pointer wf_text-sub-02 wf-whitespace-prewrap wf-word-break wf_w-230" :title="slotProps.data.contentLabel">
                  {{ slotProps.data.content }}
                </span>
              </div>
            </template>
          </Column>
          <Column key="status" columnKey="status" field="status" header="상태" class="wf_col-100" />
          <Column key="registrant" columnKey="registrant" header="등록자" class="wf_col-180">
            <template #body="slotProps">
              <p class="wf_w-full line-clamp wf-pointer wf_text-n-33">
                {{ `${slotProps.data?.registerName}(${slotProps.data?.registerKey})` }}
              </p>
            </template>
          </Column>
          <Column key="registrationDate" columnKey="registrationDate" header="등록일시">
            <template #body="slotProps">
              <p class="wf_w-full wf_text-center">
                {{ formatTime(slotProps.data.registrationDate ?? '', FORMAT_DATE_YYYY_MM_DD_HH_mm_ss) }}
              </p>
            </template>
          </Column>
        </template>
      </BaseDataTablePagination>
    </div>
  </div>
</template>
