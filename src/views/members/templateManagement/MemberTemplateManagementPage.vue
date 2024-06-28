<!-- BO_B0303_010101 -->
<script setup lang="ts">
import { WelfareSelect, WelfareRadio, DataTableContainer, WelfareMdButton } from '@/components'
import { fileDocumentNames } from '@/common'
import { handleDownloadFile } from '@/common/html'
import FormGroup from '@/components/widgets/form/FormGroup.vue'
import FormButtonHandleForm from '@/components/widgets/form/FormButtonHandleForm.vue'
import { useMemberTemplateManagement } from '@/composables/members/templateManagement/useMemberTemplateManagement'
import FormGroupSelectInput from '@/components/widgets/form/FormGroupSelectInput.vue'
import { memberTemplateManagementFieldTableConfig } from '@/models/views/members/templateManagement/MemberTemplateManagementModel'

const {
  values,
  setFieldValue,
  listRadioShippingDirectoryLevel,
  listSelectRow1,
  listRadioTemplateStatus,
  handleResetFormFilter,
  items,
  isLoading,
  totalItems,
  onPageChange
} = useMemberTemplateManagement()
</script>
<template>
  <div class="wf-container-box">
    <div class="wf-approval-body">
      <div class="wf-approval-border">
        <div class="wf-form-filter">
          <div id="wf-group-filer" class="wf-group-filter">
            <form id="wf_approval-group-filter" class="wf_flex wf_flex-col wf-mt-0">
              <div class="wf_flex wf_items-center">
                <FormGroup is-rounded-top :label="listRadioShippingDirectoryLevel.label" customClass="wf-space-x-20 wf_flex-1">
                  <WelfareRadio
                    v-for="(radio, index) in listRadioShippingDirectoryLevel.options"
                    :key="index"
                    :model-value="values[listRadioShippingDirectoryLevel.field]"
                    @update:model-value="(value) => setFieldValue(listRadioShippingDirectoryLevel.field, value)"
                    :value="radio.value"
                    :label="radio.label"
                    :name="listRadioShippingDirectoryLevel.field"
                    size="sm"
                  />
                </FormGroup>
                <FormGroup is-border-left :label="listSelectRow1.label">
                  <WelfareSelect
                    class="wf_w-180"
                    optionLabel="label"
                    :placeholder="listSelectRow1.field"
                    :model-value="values[listSelectRow1.field]"
                    @update:model-value="(value) => setFieldValue(listSelectRow1.field, value)"
                    :options="listSelectRow1.options"
                    small
                  />
                </FormGroup>
              </div>
              <div class="wf_flex wf_items-center">
                <FormGroup is-rounded-top :label="listRadioTemplateStatus.label" customClass="wf-space-x-20 wf_flex-1">
                  <WelfareRadio
                    v-for="(radio, index) in listRadioTemplateStatus.options"
                    :key="index"
                    :model-value="values[listRadioTemplateStatus.field]"
                    @update:model-value="(value) => setFieldValue(listRadioTemplateStatus.field, value)"
                    :value="radio.value"
                    :label="radio.label"
                    :name="listRadioTemplateStatus.field"
                    size="sm"
                  />
                </FormGroup>
              </div>
              <div class="wf_flex wf_items-center">
                <FormGroup class="wf_h-42" :is-border-bottom="false" is-rounded-bottom label="검색어">
                  <FormGroupSelectInput class="w-full" optionLabel="label" select-placeholder="사용안함" input-placeholder="검색어 입력" />
                </FormGroup>
              </div>
            </form>
          </div>

          <FormButtonHandleForm @on-reset="handleResetFormFilter" />
        </div>
      </div>
      <div class="wf-table-wrapper">
        <DataTableContainer
          ref="refTable"
          :value="items"
          :loading="isLoading"
          :total-records="totalItems"
          :column-configs="memberTemplateManagementFieldTableConfig"
          @page-change="onPageChange"
          no-data-label="조회 내용이 없습니다."
        >
          <template #title>
            <h6 class="wf_text-n-33">조회 결과 &nbsp;총 {{ totalItems }} 건</h6>
          </template>
          <template #buttons>
            <div class="wf-space-x-6 wf_flex">
              <WelfareMdButton disabled label="신규 추가" class="wf_w-72" buttonType="liner" />
              <WelfareMdButton disabled label="선택 삭제" class="wf_w-72" buttonType="liner" />
              <WelfareMdButton
                label="엑셀다운로드"
                @click="handleDownloadFile(fileDocumentNames.memberList.url, fileDocumentNames.memberList.name)"
                class="wf_w-93"
                buttonType="liner"
              />
            </div>
          </template>
          <template #body-templateTitle>
            <a class="wf_m-w-250 wf-text_link wf_text-sub-02 wf_flex wf_justify-center wf-pointer" target="blank"> [광고] 복지몰 프로모션 </a>
          </template>
          <template #body-delete>
            <WelfareMdButton label="삭제" buttonType="liner" buttonSize="small" />
          </template>
        </DataTableContainer>
      </div>
    </div>
  </div>
</template>
<style scoped>
@import url('@/assets/css/view/member/member-template-management.css');
</style>

<script lang="ts">
export default {
  name: 'MemberTemplateManagementPage'
}
</script>
