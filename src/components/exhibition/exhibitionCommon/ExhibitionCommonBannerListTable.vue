<script setup lang="ts">
import { DEFAULT_DATE_FORMAT_DOT, DEFAULT_TABLE_SELECT_OPTIONS_TWO, formatTime, TEXT_MAX_NUMBER_3 } from '@/common'
import {
  exhibitionBannerGroupUseYnOptions,
  ExhibitionCommonBannerGroupListTableEmits,
  ExhibitionCommonBannerListTableProps,
  exhibitionCommonBannerTableConfig
} from '@/models/views/exhibition/exhibitionCommon/ExhibitionCommonBannerManagementModel'
import { PageState } from 'primevue/paginator'
import { DataTablePaginationWithCheckbox, WelfareInputText, WelfareMdButton, WelfareSelect } from '@/components'
import { useExhibitionCommonBannerListTable } from '@/composables/exhibition/exhibitionCommon/useExhibitionCommonBannerListTable'
import Column from 'primevue/column'
import { DataTableRowClickEvent } from 'primevue/datatable'
import WelfareTimeInput from '@/components/widgets/dateTime/WelfareTimeInput.vue'
import DateTimePicker from '@/components/widgets/dateTimePicker/DateTimePicker.vue'
import { useExhibitionFlagRegistrationPopupLogic } from '@/composables/exhibition/exhibitionCommon/useExhibitionFlagRegistrationPopup'

const props = defineProps<ExhibitionCommonBannerListTableProps>()
const emits = defineEmits<ExhibitionCommonBannerGroupListTableEmits>()

const { values, setFieldValue, onSave, onDelete, onSelectAllChange, onRowSelected, tableRef, onRegistration, handleDateChangeTableForm, onUpdate } =
  useExhibitionCommonBannerListTable(props, emits)
const { displayOrderValidate } = useExhibitionFlagRegistrationPopupLogic()

defineExpose({
  scrollToTop: () => {
    tableRef?.value?.scrollToTop()
  },
  clearCheckAll: () => {
    tableRef?.value?.clearCheckAll()
  }
})
</script>

<template>
  <DataTablePaginationWithCheckbox
    ref="tableRef"
    :loading="isLoading"
    :value="data"
    :total-records="totalItems"
    @row-checked-change="onRowSelected"
    @select-all-change="onSelectAllChange"
    @page-change="(params: PageState) => emits('page-change', params)"
    @row-click="(rowSelect: DataTableRowClickEvent) => emits('row-click', rowSelect)"
    no-data-label="조회 내용이 없습니다."
    :select-props="{ options: DEFAULT_TABLE_SELECT_OPTIONS_TWO, class: 'wf_w-120' }"
    :reorderable-columns="false"
    :resizable-columns="false"
  >
    <template #title>
      <h6>배너 목록&nbsp;&nbsp;총 {{ totalItems ?? 0 }} 건</h6>
    </template>
    <template #buttons>
      <WelfareMdButton label="등록" button-type="liner" @click="onRegistration" />
      <WelfareMdButton label="저장" button-type="liner" @click="onSave" />
      <WelfareMdButton label="삭제" button-type="default" @click="onDelete" />
      <WelfareMdButton label="엑셀다운로드" button-type="liner" @click="emits('excel-download')" />
    </template>
    <template #columns>
      <Column
        v-for="(col, index) in exhibitionCommonBannerTableConfig"
        :key="index"
        :class="[col?.class, { 'wf_custom-col': col.children?.length ?? 0 > 1 }]"
      >
        <template #header> {{ col.header }}<span v-if="col?.required" class="wf_text-sub-01">*</span></template>

        <!-- body col -->
        <template #body="slotProps">
          <template v-if="col.field === 'displayStartDate' || col.field === 'displayEndDate'">
            <DateTimePicker
              size="small"
              :model-value="formatTime(values.modifyRequestList[slotProps.index]?.[col.field] ?? '', DEFAULT_DATE_FORMAT_DOT)"
              @update:model-value="(value) => handleDateChangeTableForm(col.field, value, slotProps.index)"
              :format="DEFAULT_DATE_FORMAT_DOT"
            />
          </template>
          <template v-else-if="col.field === 'displayStartTime' || col.field === 'displayEndTime'">
            <WelfareTimeInput
              :model-value="values.modifyRequestList[slotProps.index]?.[col.field]"
              @update:model-value="(value) => handleDateChangeTableForm(col.field, value, slotProps.index)"
            />
          </template>
          <WelfareSelect
            v-else-if="col.field === 'displayYn'"
            small
            class="wf_w-100"
            option-label="label"
            option-value="value"
            :options="exhibitionBannerGroupUseYnOptions.slice(1)"
            :model-value="values.modifyRequestList?.[slotProps.index].displayYn"
            @update:model-value="(value) => setFieldValue(`modifyRequestList.${slotProps.index}.displayYn`, value)"
          />
          <WelfareInputText
            v-else-if="col.field === 'displayOrder'"
            :max-length="TEXT_MAX_NUMBER_3"
            @input="displayOrderValidate"
            :model-value="values.modifyRequestList[slotProps.index]?.displayOrder?.toString()"
            @update:model-value="(value) => setFieldValue(`modifyRequestList.${slotProps.index}.displayOrder`, value)"
            size="small"
          />
          <p v-else-if="col.field === 'bannerKey'" class="wf-text_link wf-pointer" @click="onUpdate(slotProps.data)">
            {{ slotProps.data?.[col.field] }}
          </p>

          <!--default col -->
          <template v-else>
            <div :class="{ 'wf_table-single-selected-row--content': slotProps.data.id === selectedRow?.id }">
              {{ slotProps.data?.[col.field] }}
            </div>
          </template>
        </template>
      </Column>
    </template>
  </DataTablePaginationWithCheckbox>
</template>

<style scoped>
@import url('@/assets/css/widgets/dataTable/data-table-merge-col.css');
</style>
