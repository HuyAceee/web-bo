<!-- BO_N0101_010101 -->
<script setup lang="ts">
import { CONTRACT_DETAIL_ROUTER } from '@/common'
import { DataTablePaginationWithCheckbox, WelfareMdButton } from '@/components'
import WelfareCheckbox from '@/components/uikit/checkbox/WelfareCheckbox.vue'
import WelfareInputText from '@/components/uikit/input/WelfareInputText.vue'
import WelfareRadioGroup from '@/components/uikit/radio/WelfareRadioGroup.vue'
import WelfareSelect from '@/components/uikit/select/WelfareSelect.vue'
import FormButtonHandleForm from '@/components/widgets/form/FormButtonHandleForm.vue'
import FormGroup from '@/components/widgets/form/FormGroup.vue'
import FormGroupTimeLinesFilterForm from '@/components/widgets/form/FormGroupTimeLinesFilterForm.vue'
import { usePartnerManagementListPage } from '@/composables/partner/usePartnerManagementListPage'
import { deliveryListSelectDateOrderDetailOptions } from '@/models/views/delivery/ticketProductOrderManagement/DeliveryTicketProductListOrderStatusModel'
import { partnerListDataHeaderTableModel } from '@/models/views/partner/PartnerListDataHeaderTableModel'
import Column from 'primevue/column'

const {
  handleInputFieldChangeSearchWord,
  contractTypeOptions,
  sellerStatusRadioOptions,
  searchWordSelectOptions,
  getIsCheckBox,
  handleCheckBoxChange,
  listCheckboxContractStatusList,
  values,
  setFieldValue,
  currentFilterDate,
  handleChangeCountDate,
  items,
  isLoading,
  onPageChange,
  totalItems,
  refTable,
  handleSearch,
  onRowSelected,
  onSelectAllChange,
  handleResetSearch,
  handleDownloadExcel,
  handleActivePartner,
  handleInactivePartner,
  redirectToRegistrationPage
} = usePartnerManagementListPage()
</script>

<template>
  <div>
    <div class="wf-p-30 wf-space-y-29">
      <div class="wf-btn-border--bg-color-line-gray wf_br-6">
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-11" is-rounded-top label="계약 유형">
            <WelfareSelect
              class="wf_w-180"
              optionLabel="label"
              option-value="value"
              optionDisabled="disabled"
              small
              placeholder="전체 "
              :options="contractTypeOptions"
              :model-value="values.contractType"
              @update:model-value="(value) => setFieldValue('contractType', value)"
            />
          </FormGroup>
          <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-12 " is-border-left label="계약 상태">
            <div class="wf-space-x-20 wf_flex">
              <div v-for="(_item, _index) in listCheckboxContractStatusList" :key="_index">
                <WelfareCheckbox
                  :model-value="getIsCheckBox(_item.id)"
                  @update:model-value="(value) => handleCheckBoxChange(value, _item.id)"
                  size="sm"
                  :label="_item.label"
                />
              </div>
            </div>
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-2" custom-class="wf-pb-1 wf-pl-11" label="판매사 상태">
            <WelfareRadioGroup
              @update:model-value="(value) => setFieldValue('sellerStatus', value)"
              :model-value="values.sellerStatus"
              :options="sellerStatusRadioOptions"
              size="sm"
            />
          </FormGroup>
          <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-11 wf-pr-8" label="판매사코드" is-border-left>
            <WelfareInputText
              class="wf_w-180"
              size="small"
              placeholder=""
              :model-value="values.sellerCode"
              @update:model-value="(value) => setFieldValue('sellerCode', value)"
            />
          </FormGroup>
          <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-11 wf-pr-8" label="판매사명" is-border-left>
            <WelfareInputText
              class="wf_w-180"
              size="small"
              placeholder=""
              :model-value="values.salesCompanyName"
              @update:model-value="(value) => setFieldValue('salesCompanyName', value)"
            />
          </FormGroup>
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroupTimeLinesFilterForm
            class="wf_h-44"
            custom-class="wf-pl-11 wf-mt--1"
            label="등록일"
            is-border-bottom
            is-rounded-bottom
            hiddenSelectOption
            :current-active-date="currentFilterDate"
            :from-date="values.fromDate"
            :to-date="values.toDate"
            :options-product-type-date="deliveryListSelectDateOrderDetailOptions"
            @on-change-date-from="(value) => setFieldValue('fromDate', value)"
            @on-change-date-to="(value) => setFieldValue('toDate', value)"
            @on-change-filter-date="handleChangeCountDate"
          />
        </div>
        <div class="wf_flex wf_items-center">
          <FormGroup class="wf_flex-1" custom-class="wf-pb-1 wf-pl-11" is-rounded-top label="검색어" :isBorderBottom="false" isRoundedBottom>
            <WelfareSelect
              class="wf_w-180 wf-mr-6"
              optionLabel="label"
              option-value="value"
              small
              placeholder="사용안함"
              :options="searchWordSelectOptions"
              :model-value="values.searchWordSelect"
              @update:model-value="(value) => setFieldValue('searchWordSelect', value)"
            />
            <WelfareInputText
              class="w-full"
              size="small"
              placeholder="최대 50개까지 입력 가능합니다. (,로 구분)"
              :disabled="!values.searchWordSelect"
              @input="handleInputFieldChangeSearchWord"
              :model-value="values.searchWord"
              @update:model-value="(value) => setFieldValue('searchWord', value)"
            />
          </FormGroup>
        </div>
      </div>
      <FormButtonHandleForm @on-reset="handleResetSearch" @on-submit="handleSearch" />
    </div>
    <div class="wf-line-separate"></div>
    <div class="wf-p-30">
      <DataTablePaginationWithCheckbox
        :value="items"
        @page-change="onPageChange"
        @select-all-change="onSelectAllChange"
        @row-checked-change="onRowSelected"
        :total-records="totalItems"
        :loading="isLoading"
        ref="refTable"
      >
        <template #title>
          <h6 class="wf_text-n-33">조회 결과 &nbsp;총 {{ totalItems }} 건</h6>
        </template>
        <template #buttons>
          <div class="wf-space-x-6 wf_flex">
            <WelfareMdButton label="활성" class="wf_w-45" buttonType="liner" @on-click="handleActivePartner" />
            <WelfareMdButton label="비활성" class="wf_w-57" buttonType="liner" @on-click="handleInactivePartner" />
            <WelfareMdButton label="판매사 등록" class="wf_w-84" buttonType="default" @on-click="redirectToRegistrationPage" />
            <WelfareMdButton label="엑셀다운로드" class="wf_w-93" buttonType="liner" @on-click="handleDownloadExcel" />
          </div>
        </template>
        <template #columns>
          <Column key="id" columnKey="id" header="No." class="wf_m-w-50">
            <template #body="slotProps">
              <span>{{ slotProps.data.id }}</span>
            </template>
          </Column>
          <Column key="seller_code" columnKey="seller_code" header="판매사코드" class="wf_m-w-90">
            <template #body="slotProps">
              <router-link class="wf_text-sub-02" target="blank" :to="`${CONTRACT_DETAIL_ROUTER}?id=${slotProps.data.seller_code}`">
                {{ slotProps.data.seller_code }}
              </router-link>
            </template>
          </Column>
          <Column
            v-for="item in partnerListDataHeaderTableModel.slice(2)"
            :key="item.field"
            :field="item.field"
            :column-key="item.field"
            :header="item.header"
            :class="item.class"
          >
            <template #body="slotProps">
              <span>{{ slotProps.data[item.field] }}</span>
            </template>
          </Column>
        </template>
      </DataTablePaginationWithCheckbox>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'PartnerManagementListPage'
}
</script>
