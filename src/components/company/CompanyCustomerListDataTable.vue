<script lang="ts" setup>
import { WelfareCheckbox, WelfareMdButton, WelfarePagination, WelfareSelect } from '@/components'
import { defaultDataTablePropsConfig, WelfareDataTableEmits, WelfareDataTableProps, WelfareDataTableWithCheckBoxExpose } from '@/models'
import Column from 'primevue/column'
import ColumnGroup from 'primevue/columngroup'
import DataTable from 'primevue/datatable'
import { PageState } from 'primevue/paginator'
import Row from 'primevue/row'
import { computed } from 'vue'
import { COMPANY_CUSTOMER_INFORMATION_REGISTRATION, DATA_TABLE_NUMBER_ITEMS_PAGE_50, DATA_TABLE_NUMBER_OF_PAGE } from '@/common'
import { useBaseTable } from '@/composables/widgets/table/useBaseTable'
import { useDataTableWithCheckbox } from '@/composables/widgets/table/useDataTableWithCheckbox'
import {
  ContractStatusEnumObject,
  CustomerStatusEnumObject,
  EContractStatus,
  ECustomerStatus,
  companyCustomerHeaderFieldTableCompanyCustomerListConfig
} from '@/models/views/company/customerManagement/CompanyCustomerListModel'

export interface ProductTableDataDeliveryProps extends WelfareDataTableProps {
  data: any[] | undefined
  loading: boolean
  totalElement: number | undefined
  isListCheckedEmpty: boolean
}

interface ProductTableDataDeliveryEmits extends WelfareDataTableEmits {
  (e: 'page-change', params: PageState): void

  (e: 'select-all-change', checked: boolean): void

  (e: 'row-checked-change', item: any): void

  (e: 'download-file'): void

  (e: 'change-status', status: ECustomerStatus): void
}

const props = withDefaults(defineProps<ProductTableDataDeliveryProps>(), defaultDataTablePropsConfig)
const emit = defineEmits<ProductTableDataDeliveryEmits>()

const eventEmit = {
  onPageChange: (params: PageState) => {
    emit('page-change', params)
  },
  onSelectAllChange: (checked: boolean) => {
    emit('select-all-change', checked)
  },
  onRowCheckedChanged: (item: any) => {
    emit('row-checked-change', item)
  },
  onDownload: () => {
    emit('download-file')
  },
  onDropdownChange: (value: any) => {
    emit('drop-down-change', value)
  },
  onUpdateCustomerStatus: (status: ECustomerStatus) => {
    emit('change-status', status)
  }
}

const params = {
  ...props,
  onSelectAllChange: eventEmit.onSelectAllChange,
  onPageChange: eventEmit.onPageChange,
  onRowCheckedChange: eventEmit.onRowCheckedChanged
}

const data = computed(() => {
  return props.data
})

const { selectRows, eventFirst, scrollToTop, parentRef } = useBaseTable(params)
const { isSelectAll, onCheckboxValueChange, onSelectAllClick, clearSelectedAll } = useDataTableWithCheckbox(params, data)

const onSelectChange = () => {
  clearSelectedAll()
}

const onPageChange = (data: PageState) => {
  clearSelectedAll()
  eventEmit.onPageChange(data)
}

defineExpose<WelfareDataTableWithCheckBoxExpose>({
  scrollToTop,
  clearCheckAll: clearSelectedAll
})
</script>

<template>
  <div ref="parentRef" class="wf-table-wrapper">
    <div class="wf_flex wf_items-center wf_justify-between wf-mb-16">
      <h6 class="wf_text-n-33">조회 결과 &nbsp;총 {{ totalElement || 0 }} 건</h6>
      <div class="wf-space-x-6 wf_flex">
        <WelfareMdButton @click="eventEmit.onUpdateCustomerStatus(ECustomerStatus.Activate)" label="활성" class="wf_w-45" buttonType="liner" />
        <WelfareMdButton @click="eventEmit.onUpdateCustomerStatus(ECustomerStatus.UnActivate)" label="비활성" class="wf_w-57" buttonType="liner" />
        <router-link class="no-underline" :to="COMPANY_CUSTOMER_INFORMATION_REGISTRATION">
          <WelfareMdButton label="고객사 등록" class="wf_w-81" buttonType="default" />
        </router-link>
        <WelfareMdButton label="엑셀 다운로드" @click="eventEmit.onDownload" class="wf_w-93" buttonType="liner" />
        <WelfareSelect
          placeholder="개씩"
          v-if="selectRows && !props.isSelectInvisible"
          v-model="selectRows"
          optionLabel="label"
          class="wf_w-100"
          v-bind="props.selectProps"
          @update:modelValue="onSelectChange"
        />
      </div>
    </div>

    <DataTable :value="data" :loading="loading">
      <ColumnGroup type="header">
        <Row>
          <Column class="wf_m-w-50" columnKey="id">
            <template #header>
              <WelfareCheckbox id="select-all" v-model="isSelectAll" size="sm" v-on:click="onSelectAllClick" />
            </template>
          </Column>
          <Column
            v-for="(header, index) in companyCustomerHeaderFieldTableCompanyCustomerListConfig[0]"
            :key="index"
            :class="header.class"
            :header="header.header"
          />
        </Row>
      </ColumnGroup>
      <Column class="wf_m-w-50" field="id">
        <template #body="slotProps">
          <WelfareCheckbox
            v-model="slotProps.data.isSelected"
            id="{{ slotProps.data.code }}"
            :key="slotProps.data.code"
            @update:modelValue="onCheckboxValueChange(slotProps.data)"
            size="sm"
          />
        </template>
      </Column>
      <Column
        v-for="(body, index) in [...companyCustomerHeaderFieldTableCompanyCustomerListConfig[0]]"
        :key="index"
        :field="body.field"
        :class="body.class"
      >
        <template #body="slotProps">
          <div v-if="body.field === 'customerKey'">
            <router-link
              :to="{ path: 'edit', query: { customerKey: slotProps.data.customerKey } }"
              class="wf_m-w-250 wf-text_link wf_text-sub-02 wf_flex wf_justify-center wf-pointer"
            >
              <span> {{ slotProps.data[body.field] }}</span>
            </router-link>
          </div>
          <div class="text-center" v-else-if="body.field === 'auditing.registerName'">
            <a :class="body.class">
              {{ slotProps.data['auditing']['registerName'] }}
              {{ slotProps.data['auditing']['registerKey'] ? `(${slotProps.data['auditing']['registerKey']})` : `` }}
            </a>
          </div>
          <div v-else-if="body.field === 'auditing.registeredDate'">
            <a :class="body.class">
              {{ slotProps.data['auditing']['registeredDate'] }}
            </a>
          </div>
          <div v-else-if="body.field === 'customerStatus'">
            <a :class="body.class">
              {{ CustomerStatusEnumObject[slotProps.data['customerStatus'] as ECustomerStatus]?.label }}
            </a>
          </div>
          <div v-else-if="body.field === 'contractStatus'">
            <a :class="body.class">
              {{ ContractStatusEnumObject[slotProps.data['contractStatus'] as EContractStatus]?.label! }}
            </a>
          </div>
          <div class="text-center" v-else :class="body.class">
            {{ slotProps.data[body.field] }}
          </div>
        </template>
      </Column>
      <template #empty>
        <p v-if="!props.loading" class="wf-data-table-empty-data wf_text-n-33 wf-body_02-reg">리스트가 없습니다.</p>
      </template>
    </DataTable>
    <WelfarePagination
      :rows="selectRows?.value ?? DATA_TABLE_NUMBER_ITEMS_PAGE_50"
      :pageLinkSize="DATA_TABLE_NUMBER_OF_PAGE"
      :totalRecords="totalElement"
      @page="onPageChange"
      @update:first="eventFirst"
    />
  </div>
</template>
