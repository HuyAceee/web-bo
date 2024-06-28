<script lang="ts" setup>
import { WelfareDataTableEmits, WelfareDataTableProps, WelfareDataTableWithCheckBoxExpose } from '@/models'
import { PageState } from 'primevue/paginator'
import { DataTablePaginationWithCheckbox, WelfareMdButton, WelfareSelect } from '@/components'
import { ref } from 'vue'
import { DataTableRowClickEvent } from 'primevue/datatable'
import Column from 'primevue/column'
import { datePickerNotification, DEFAULT_DATE_FORMAT, formatTime, replaceDashRegex } from '@/common'
import {
  exhibitionSellerSpecialMngtTableConfig,
  ExhibitionSpecialManagementListFormModel,
  exhibitionSpecialManagementListModelConfig,
  exhibitionSpecialMngtTableConfig
} from '@/models/views/exhibition/exhibitionContent/ExhibitionSpecialManagementModel'
import { useModalNotification } from '@/composables'
import DateTimePicker from '@/components/widgets/dateTimePicker/DateTimePicker.vue'
import WelfareTimeInput from '@/components/widgets/dateTime/WelfareTimeInput.vue'

interface ComplaintOrderCancelProps extends WelfareDataTableProps {
  data?: ExhibitionSpecialManagementListFormModel[]
  loading: boolean
  totalElement: number
  sellerType?: boolean
}

interface ComplaintOrderCancelEmits extends WelfareDataTableEmits {
  (e: 'page-change', params: PageState): void

  (e: 'onRowSelected', event: any): void

  (e: 'onSelectAllChange', checked: boolean): void

  (e: 'clearChecked'): void

  (e: 'onDownloadExcel'): void

  (e: 'onChangeDataTable', field: string, value: string | undefined, index: number): void

  (e: 'copyValueSelect'): void

  (e: 'saveValueTable'): void

  (e: 'deleteValueExhibition'): void

  (e: 'openModalSellerSpecial', exhibitionKey: string): void

  (e: 'openModalExhibitionRegister'): void
}

const tableRef = ref()
const props = defineProps<ComplaintOrderCancelProps>()
const emit = defineEmits<ComplaintOrderCancelEmits>()

const { openModal, closeModalByPop } = useModalNotification()

const eventEmit = {
  onPageChange: (params: PageState) => {
    emit('page-change', params)
  },
  onRowClick: (event: DataTableRowClickEvent) => {
    emit('row-click', event.data)
  },
  onRowSelected: (event: any) => {
    emit('onRowSelected', event)
  },
  onSelectAllChange: (checked: boolean) => {
    emit('onSelectAllChange', checked)
  },
  clearChecked: () => {
    emit('clearChecked')
  },
  onDownloadExcel: () => {
    emit('onDownloadExcel')
  },
  onChangeDataTable: (field: string, value: string | undefined, index: number) => {
    emit('onChangeDataTable', field, value, index)
  },
  copyValueSelect: () => {
    emit('copyValueSelect')
  },
  saveValueTable: () => {
    emit('saveValueTable')
  },
  deleteValueExhibition: () => {
    emit('deleteValueExhibition')
  },
  openModalSellerSpecial: (exhibitionKey: string) => {
    emit('openModalSellerSpecial', exhibitionKey)
  },
  openModalExhibitionRegister: () => {
    emit('openModalExhibitionRegister')
  }
}
const scrollToTop = () => {
  tableRef.value?.scrollToTop()
}

const clearCheckAll = () => {
  tableRef.value?.clearCheckAll()
}

let isOpenModal: boolean
const openModalDateNotification = (content: string) => {
  if (isOpenModal) return
  isOpenModal = true
  openModal({
    content,
    onAccept() {
      closeModalByPop?.()
      isOpenModal = false
    }
  })
}

const handleChooseStartDate = (value: string, index: number) => {
  const { displayEndDate, displayEndTime, displayStartTime } = props.data?.[index] || {}
  const endDate = displayEndDate?.replace(replaceDashRegex, '')
  const newStartDate = value?.replace(replaceDashRegex, '')

  if (endDate && endDate < newStartDate) {
    openModalDateNotification(datePickerNotification.startDate.date)
    return
  }

  if (displayStartTime && displayEndTime && endDate && endDate === newStartDate && displayStartTime > displayEndTime) {
    openModalDateNotification(datePickerNotification.startDate.date)
    return
  }

  eventEmit.onChangeDataTable('displayStartDate', value, index)
}

const handleChooseEndDate = (value: string, index: number) => {
  const { displayStartDate, displayEndTime, displayStartTime } = props.data?.[index] || {}
  const startDate = displayStartDate?.replace(replaceDashRegex, '')
  const newEndDate = value?.replace(replaceDashRegex, '')

  if (startDate && startDate > newEndDate) {
    openModalDateNotification(datePickerNotification.endDate.date)
    return
  }

  if (displayStartTime && displayEndTime && startDate && startDate === newEndDate && displayStartTime > displayEndTime) {
    openModalDateNotification(datePickerNotification.startDate.date)
    return
  }

  eventEmit.onChangeDataTable('displayEndDate', value, index)
}

const handleChooseStartTime = (value: string, index: number, resetValue?: () => void) => {
  if (!value) {
    eventEmit.onChangeDataTable('displayStartTime', undefined, index)
    return
  }

  const { displayEndDate, displayStartDate, displayEndTime } = props.data?.[index] || {}
  const endDate = displayEndDate?.replace(replaceDashRegex, '')
  const startDate = displayStartDate?.replace(replaceDashRegex, '')

  if (endDate && startDate && startDate === endDate && displayEndTime && displayEndTime < value) {
    openModalDateNotification(datePickerNotification.startDate.date)
    eventEmit.onChangeDataTable('displayStartTime', undefined, index)
    resetValue?.()
    return
  }

  eventEmit.onChangeDataTable('displayStartTime', value, index)
}

const handleChooseEndTime = (value: string, index: number, resetValue?: () => void) => {
  if (!value) {
    eventEmit.onChangeDataTable('displayEndTime', undefined, index)
    return
  }

  const { displayEndDate, displayStartDate, displayStartTime } = props.data?.[index] || {}
  const endDate = displayEndDate?.replace(replaceDashRegex, '')
  const startDate = displayStartDate?.replace(replaceDashRegex, '')

  if (endDate && startDate && startDate === endDate && displayStartTime && displayStartTime > value) {
    openModalDateNotification(datePickerNotification.endDate.date)
    eventEmit.onChangeDataTable('displayEndTime', undefined, index)
    resetValue?.()
    return
  }

  eventEmit.onChangeDataTable('displayEndTime', value, index)
}

defineExpose<WelfareDataTableWithCheckBoxExpose>({
  scrollToTop,
  clearCheckAll
})
</script>

<template>
  <div class="wf-table-wrapper" ref="parentRef">
    <DataTablePaginationWithCheckbox
      class="wf_data-table-colspan"
      ref="tableRef"
      lazy
      :value="data"
      :loading="loading"
      @page-change="eventEmit.onPageChange"
      :total-records="props.totalElement"
      @row-checked-change="eventEmit.onRowSelected"
      @select-all-change="eventEmit.onSelectAllChange"
      no-data-label="조회 내용이 없습니다."
    >
      <template #title>
        <h6 class="wf_text-n-33">조회 결과 &nbsp;(총 {{ props.totalElement ?? 0 }}건)</h6>
      </template>
      <template #buttons>
        <div class="wf-mb--4 wf_flex wf-space-x-6">
          <!--          confirm sb-->
          <!--          <WelfareMdButton label="선택복사" class="wf-bt-w-69" @on-click="eventEmit.copyValueSelect" button-size="default" buttonType="liner" />-->
          <WelfareMdButton label="저장" class="wf_w-45" @on-click="eventEmit.saveValueTable" button-size="default" buttonType="liner" />
          <WelfareMdButton label="삭제" class="wf_w-45" @on-click="eventEmit.deleteValueExhibition" button-size="default" buttonType="liner" />
          <WelfareMdButton label="등록" class="wf_w-45" @on-click="eventEmit.openModalExhibitionRegister" button-size="default" buttonType="liner" />
          <WelfareMdButton label="엑셀다운로드" class="wf_w-93" @on-click="eventEmit.onDownloadExcel" button-size="default" buttonType="liner" />
        </div>
      </template>
      <template #columns>
        <Column
          v-for="col in sellerType ? exhibitionSellerSpecialMngtTableConfig : exhibitionSpecialMngtTableConfig"
          :key="col.field"
          :column-key="col.field"
          :class="col.class"
          :header="col.header"
          :field="col.field"
        >
          <template #body="slotProps">
            <template v-if="col.field === 'exhibitionKey'">
              <p class="wf_text-sub-02 wf_text-underline wf-cursor-pointer" @click="eventEmit.openModalSellerSpecial(slotProps.data?.exhibitionKey)">
                {{ slotProps.data?.[col.field] }}
              </p>
            </template>
            <template v-else-if="col.field === 'displayYn'">
              <div class="wf_flex wf-width-full">
                <WelfareSelect
                  class="wf_flex wf_flex-1 wf-width-full"
                  small
                  option-label="label"
                  option-value="value"
                  :options="exhibitionSpecialManagementListModelConfig.selectRow3[0]?.options.slice(1)"
                  :modelValue="slotProps.data?.[col.field]"
                  @update:modelValue="
                    (value) => {
                      eventEmit.onChangeDataTable(col.field, value, slotProps.index)
                    }
                  "
                />
              </div>
            </template>
            <template v-else-if="col.field === 'displayStartDate'">
              <DateTimePicker
                :modelValue="formatTime(slotProps.data?.[col.field], DEFAULT_DATE_FORMAT)"
                @update:model-value="
                  (value) => {
                    handleChooseStartDate(value, slotProps.index)
                  }
                "
                :format="DEFAULT_DATE_FORMAT"
                :type="'date'"
                size="small"
              />
            </template>
            <template v-else-if="col.field === 'displayEndDate'">
              <DateTimePicker
                :modelValue="formatTime(slotProps.data?.[col.field], DEFAULT_DATE_FORMAT)"
                @update:model-value="
                  (value) => {
                    handleChooseEndDate(value, slotProps.index)
                  }
                "
                :format="DEFAULT_DATE_FORMAT"
                :type="'date'"
                size="small"
              />
            </template>
            <template v-else-if="col.field === 'displayStartTime'">
              <WelfareTimeInput
                :modelValue="slotProps.data?.[col.field]"
                @update:model-value="
                  (value, resetValue) => {
                    handleChooseStartTime(value, slotProps.index, resetValue)
                  }
                "
              />
            </template>
            <template v-else-if="col.field === 'displayEndTime'">
              <WelfareTimeInput
                :modelValue="slotProps.data?.[col.field]"
                @update:model-value="
                  (value, resetValue) => {
                    handleChooseEndTime(value, slotProps.index, resetValue)
                  }
                "
              />
            </template>
            <!--default col -->
            <template v-else>
              {{ slotProps.data?.[col.field] }}
            </template>
          </template>
        </Column>
      </template>
    </DataTablePaginationWithCheckbox>
  </div>
</template>
<style scoped>
@import url('@/assets/css/widgets/dataTable/data-table-merge-col.css');
@import url('@/assets/css/view/exhibition/exhibition-special-management-list.css');
</style>
