<script setup lang="ts">
import { BaseDataTablePagination, CommonTable, CommonTableContentCell, CommonTableRow, CommonTableTitleCell, WelfareMdButton } from '@/components'
import {
  companyContractInformationExhibitionManagementTableConfig,
  CompanyContractInformationProps,
  ContractStatus
} from '@/models/views/company/customerManagement/CompanyContractInformationModel'
import { formatTime, DEFAULT_DATE_FORMAT_DOT, FORMAT_DATE_DOT_YYYY_MM_DD_HH_mm } from '@/common'
import Column from 'primevue/column'
import { useCompanyContractInformationLogic } from '@/composables/company/customerManagement/useCompanyContractInformation'
import { formatFileNameSize } from '@/common/data'

defineProps<CompanyContractInformationProps>()
const {
  values,
  items,
  isLoading,
  totalItems,
  tableRef,
  renderSettlementDateValue,
  renderContractStatusLabel,
  onPageChange,
  onDownloadContractFile,
  onDownloadExcelContractInformation,
  onOpenCompanyReviewContractModal
} = useCompanyContractInformationLogic()
</script>

<template>
  <div class="contract-information wf_text-n-33">
    <div class="wf-width-full">
      <CommonTable>
        <CommonTableRow height="44">
          <CommonTableTitleCell title="계약기간" is-first-col required />
          <CommonTableContentCell class="wf_flex wf_items-center wf_justify-between">
            <div class="wf_flex wf_items-center wf_justify-between wf_h-44 wf-pb-2 wf_label_information wf_text--14">
              <span class="wf_label_information">{{
                values.contractStartDate ? formatTime(values.contractStartDate, DEFAULT_DATE_FORMAT_DOT) : ''
              }}</span>
              <span class="wf_label_information" v-if="values.contractEndDate">&nbsp;~&nbsp;&nbsp;</span>
              <span class="wf_label_information">{{
                values.contractEndDate ? formatTime(values.contractEndDate, DEFAULT_DATE_FORMAT_DOT) : ''
              }}</span>
            </div>
            <WelfareMdButton
              :disabled="values.contractStatus !== ContractStatus.STARTED"
              button-type="default"
              button-size="small"
              label="계약 연장"
              @click="onOpenCompanyReviewContractModal"
            />
          </CommonTableContentCell>
          <CommonTableTitleCell title="계약상태" required />
          <CommonTableContentCell class="wf_label_information">{{ renderContractStatusLabel(values.contractStatus) }}</CommonTableContentCell>
        </CommonTableRow>
        <CommonTableRow height="44">
          <CommonTableTitleCell title="계약일" is-first-col required />
          <CommonTableContentCell>
            <span class="wf_label_information">{{ values.contractRegDate ? formatTime(values.contractRegDate, DEFAULT_DATE_FORMAT_DOT) : '' }}</span>
          </CommonTableContentCell>
          <CommonTableTitleCell title="정산일" required />
          <CommonTableContentCell class="wf_label_information">{{ renderSettlementDateValue(values.settlementDate) }}</CommonTableContentCell>
        </CommonTableRow>
        <CommonTableRow height="44" isLastRow>
          <CommonTableTitleCell title="계약서" is-first-col required />
          <CommonTableContentCell class="wf-space-x-6">
            <span class="wf_label_information">{{
              values.contractFileOriginName ? formatFileNameSize(values.contractFileOriginName, values.contractFileSize) : ''
            }}</span>
            <WelfareMdButton
              :disabled="!values.contractFileOriginName"
              button-type="liner"
              button-size="small"
              label="다운로드"
              @click="onDownloadContractFile(values.contractFileDownloadLink, values.contractFileOriginName)"
            />
          </CommonTableContentCell>
        </CommonTableRow>
      </CommonTable>
      <BaseDataTablePagination
        ref="tableRef"
        @page-change="onPageChange"
        no-data-label="전시 목록이 없습니다."
        class="wf-mt-28 wf-pt-30"
        :total-records="totalItems"
        :value="items"
        :loading="isLoading"
      >
        <template #title>
          <h6 class="wf_text-n-33">&nbsp;</h6>
        </template>
        <template #buttons>
          <div class="wf-space-x-4 wf_flex">
            <WelfareMdButton label="엑셀다운로드" class="wf_w-93" buttonType="liner" @on-click="onDownloadExcelContractInformation()" />
          </div>
        </template>
        <template #columns>
          <Column
            v-for="col in companyContractInformationExhibitionManagementTableConfig"
            :key="col.field"
            :class="col.class"
            :column-key="col.header"
          >
            <template #header>
              <p>{{ col.header }}</p>
            </template>
            <template #body="slotProps">
              <div v-if="col.field === 'no'">
                <p>
                  {{ slotProps.index + 1 }}
                </p>
              </div>
              <div v-else-if="col.field === 'contractStatus'">
                {{ renderContractStatusLabel(slotProps.data?.[col.field]) }}
              </div>
              <div v-else-if="col.field === 'contractStartDate'">
                {{ slotProps.data?.[col.field] && formatTime(slotProps.data?.[col.field], FORMAT_DATE_DOT_YYYY_MM_DD_HH_mm) }}
              </div>
              <div v-else-if="col.field === 'contractEndDate'">
                {{ slotProps.data?.[col.field] && formatTime(slotProps.data?.[col.field], FORMAT_DATE_DOT_YYYY_MM_DD_HH_mm) }}
              </div>
              <div v-else-if="col.field === 'contractRegDate'">
                {{ slotProps.data?.[col.field] && formatTime(slotProps.data?.[col.field], DEFAULT_DATE_FORMAT_DOT) }}
              </div>
              <div v-else-if="col.field === 'settlementDate'">
                {{ renderSettlementDateValue(slotProps.data?.[col.field]) }}
              </div>
              <div v-else-if="col.field === 'registeredName'">
                <p>
                  {{ slotProps.data?.auditing?.registerName.toString() }}
                  {{ slotProps.data?.auditing?.registerKey && `(${slotProps.data?.auditing?.registerKey})` }}
                </p>
              </div>
              <div v-else-if="col.field === 'registeredDate'">
                {{ slotProps.data?.auditing?.[col.field] && formatTime(slotProps.data?.auditing?.registeredDate, FORMAT_DATE_DOT_YYYY_MM_DD_HH_mm) }}
              </div>
              <div v-else-if="col.field === 'contract'" class="wf_flex wf_items-center">
                {{ renderContractStatusLabel(slotProps.data?.[col.field]) }}
                <WelfareMdButton
                  label="다운로드"
                  buttonType="liner"
                  buttonSize="small"
                  @click="onDownloadContractFile(slotProps.data?.contractFileDownloadLink, slotProps.data?.contractFileOriginName)"
                />
              </div>
              <p v-else>
                {{ slotProps.data?.[col.field] }}
              </p>
            </template>
          </Column>
        </template>
      </BaseDataTablePagination>
    </div>
  </div>
</template>

<style scoped>
@import url('@/assets/css/view/company/customerManagement/company-contact-information-tab.css');
</style>

<script lang="ts">
export default {
  name: 'CompanyContractInformationPageVue'
}
</script>
