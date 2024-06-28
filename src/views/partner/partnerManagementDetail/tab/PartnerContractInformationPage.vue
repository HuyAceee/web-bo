<!-- BO_N0101_020301 -->
<script setup lang="ts">
import { DataTablePaginationWithCheckbox, WelfareMdButton } from '@/components'
import FormGroup from '@/components/widgets/form/FormGroup.vue'
import { usePartnerContractInformationPage } from '@/composables/partner/partnerManagementDetail/usePartnerContractInformationPage'
import { partnerContractDataHeaderTableConfig } from '@/models/views/partner/PartnerContractInformationModel'
import Column from 'primevue/column'
import { FORMAT_DATE_YYYY_MM_DD, formatTime, SELLER_CONTRACT_DETAIL_ROUTER } from '@/common'
import { formatFileNameSize } from '@/common/data'
import { PartnerCompanyDetailTabProps } from '@/models/views/partner/partnerDetail/PartnerDetailModel'
const props = defineProps<PartnerCompanyDetailTabProps>()

const { dataDetail, items, isLoading, onPageChange, totalItems, tableRef, handleDownloadExcel, isDateInRange, onClickDownloadFile } =
  usePartnerContractInformationPage(props)
</script>

<template>
  <div class="wf-space-y-30">
    <div class="wf-group-filter wf_padding_table wf_text-n-33">
      <div class="wf_flex wf_items-center wf_justify-between wf-mb-16">
        <h6 class="wf_text-n-33">| 기본 계약정보</h6>
      </div>
      <div class="wf-btn-border--bg-color-line-gray wf_br-6">
        <div class="wf_flex">
          <FormGroup
            class="wf_flex-1"
            custom-class="wf-pb-1 wf-pl-11 wf_flex wf_justify-between wf_width-full"
            is-rounded-top
            required
            label="계약기간"
          >
            <span class="wf-body_03-reg" v-if="dataDetail.contractStartDate ?? dataDetail.contractEndDate"
              >{{ dataDetail.contractStartDate && formatTime(dataDetail.contractStartDate, FORMAT_DATE_YYYY_MM_DD) }} ~
              {{ dataDetail.contractEndDate && formatTime(dataDetail.contractEndDate, FORMAT_DATE_YYYY_MM_DD) }}</span
            >
            <WelfareMdButton
              v-if="dataDetail.contractStartDate ?? dataDetail.contractEndDate"
              label="계약 연장"
              class="wf_w-68"
              buttonSize="small"
              buttonType="default"
              :disabled="!isDateInRange"
            />
          </FormGroup>
          <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-12 " required is-border-left label="계약상태">
            <span class="wf-body_03-reg">{{ dataDetail.contractStatus }}</span>
          </FormGroup>
        </div>
        <div class="wf_flex">
          <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-11" required is-rounded-top label="계약일"
            ><span class="wf-body_03-reg">{{ dataDetail.contractRegDate }}</span>
          </FormGroup>
          <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-12" required is-border-left label="정산일">
            <span class="wf-body_03-reg" v-if="dataDetail.settlementDate">매월 {{ dataDetail.settlementDate }}일</span>
          </FormGroup>
        </div>
        <div class="wf_flex">
          <FormGroup
            class="wf_flex-1"
            custom-class="wf-pb-1 wf-pl-11"
            required
            is-rounded-top
            :isBorderBottom="false"
            isRoundedBottom
            label="계약유형"
            ><span class="wf-body_03-reg">{{ dataDetail.contractType }}</span>
          </FormGroup>
          <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-12" required is-border-left label="계약서" :isBorderBottom="false">
            <span class="wf-body_03-reg" v-if="dataDetail.contractFileDownloadLink">{{
              formatFileNameSize(dataDetail.contractFileOriginName, dataDetail.contractFileSize)
            }}</span>
            <WelfareMdButton
              v-if="dataDetail.contractFileDownloadLink"
              @on-click="onClickDownloadFile(dataDetail.contractFileDownloadLink, dataDetail.contractFileOriginName)"
              label="계약 연장"
              class="wf_w-68 wf-ml-20"
              buttonSize="small"
              buttonType="liner"
            />
          </FormGroup>
        </div>
      </div>
    </div>
    <div class="wf-line-separate"></div>
    <DataTablePaginationWithCheckbox
      :value="items"
      @page-change="onPageChange"
      :total-records="totalItems"
      :loading="isLoading"
      :show-selection="false"
      ref="tableRef"
    >
      <template #title>
        <h6 class="wf_text-n-33">| 계약이력</h6>
      </template>
      <template #buttons>
        <div class="wf-space-x-6 wf_flex">
          <WelfareMdButton label="엑셀다운로드" class="wf_w-93" buttonType="liner" @on-click="handleDownloadExcel" />
        </div>
      </template>
      <template #columns>
        <Column
          v-for="item in partnerContractDataHeaderTableConfig"
          :key="item.field"
          :field="item.field"
          :column-key="item.field"
          :header="item.header"
          :class="item.class"
        >
          <template #body="slotProps">
            <span v-if="item.field === 'contractStartDate'">
              <router-link
                class="wf_text-sub-02"
                :to="{
                  path: SELLER_CONTRACT_DETAIL_ROUTER,
                  query: { contractKey: slotProps?.data?.contractKey, sellerKey: slotProps?.data?.sellerKey }
                }"
                target="_blank"
              >
                {{ slotProps.data.contractStartDate }}
              </router-link>
            </span>
            <WelfareMdButton
              v-else-if="item.field === 'contractFileDownloadLink' && slotProps.data.contractFileDownloadLink"
              @on-click="onClickDownloadFile(slotProps.data.contractFileDownloadLink, slotProps.data.contractFileOriginName)"
              label="계약 연장"
              class="wf_w-68"
              buttonSize="small"
              buttonType="liner"
            />
            <span v-else>{{ slotProps.data[item.field] }}</span>
          </template>
        </Column>
      </template>
    </DataTablePaginationWithCheckbox>
  </div>
</template>
