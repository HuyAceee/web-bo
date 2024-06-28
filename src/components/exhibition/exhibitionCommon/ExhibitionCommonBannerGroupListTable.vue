<script setup lang="ts">
import { DEFAULT_TABLE_SELECT_OPTIONS_TWO } from '@/common'
import {
  exhibitionBannerGroupUseYnOptions,
  ExhibitionCommonBannerGroupListTableEmits,
  ExhibitionCommonBannerGroupListTableProps,
  exhibitionCommonBannerGroupTableConfig
} from '@/models/views/exhibition/exhibitionCommon/ExhibitionCommonBannerManagementModel'
import { PageState } from 'primevue/paginator'
import { DataTableRowClickEvent } from 'primevue/datatable'
import { DataTablePaginationWithCheckbox, WelfareMdButton, WelfareSelect } from '@/components'
import Column from 'primevue/column'
import { useExhibitionCommonBannerGroupListTable } from '@/composables/exhibition/exhibitionCommon/useExhibitionCommonBannerGroupListTable'

const props = defineProps<ExhibitionCommonBannerGroupListTableProps>()
const emits = defineEmits<ExhibitionCommonBannerGroupListTableEmits>()

const { values, setFieldValue, onSave, onRowSelected, onSelectAllChange, onDelete, tableRef, onRegister, openBannerGroupRegistrationModal } =
  useExhibitionCommonBannerGroupListTable(props, emits)
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
    :select-props="{ options: DEFAULT_TABLE_SELECT_OPTIONS_TWO, class: 'wf_w-120' }"
    no-data-label="조회 내용이 없습니다."
    @row-click="(rowSelect: DataTableRowClickEvent) => emits('row-click', rowSelect)"
    row-hover
  >
    <template #title>
      <h6>배너 그룹 목록&nbsp;&nbsp;총 {{ totalItems ?? 0 }} 건</h6>
    </template>
    <template #buttons>
      <WelfareMdButton label="등록" button-type="liner" @click="onRegister" />
      <WelfareMdButton label="저장" button-type="liner" @click="onSave" />
      <WelfareMdButton label="삭제" button-type="default" @click="onDelete" />
      <WelfareMdButton label="엑셀다운로드" button-type="liner" @click="emits('excel-download')" />
    </template>
    <template #columns>
      <Column
        v-for="item in exhibitionCommonBannerGroupTableConfig"
        :key="item.field"
        :column-key="item.field"
        :field="item.field"
        :class="item.class"
      >
        <template #header>
          <p>{{ item.header }}&nbsp;<span class="wf_text-sub-01" v-if="item.field === 'bannerGroupUseYn'">*</span></p>
        </template>
        <template #body="slotProps">
          <WelfareSelect
            small
            option-label="label"
            option-value="value"
            class="wf_w-100"
            v-if="item.field === 'bannerGroupUseYn'"
            :options="exhibitionBannerGroupUseYnOptions.slice(1)"
            :model-value="values.modifyRequestList?.[slotProps.index].bannerGroupUseYn"
            @update:model-value="(value) => setFieldValue(`modifyRequestList.${slotProps.index}.bannerGroupUseYn`, value)"
          />
          <p
            class="wf-text_link"
            v-else-if="item.field === 'bannerGroupKey'"
            @click="openBannerGroupRegistrationModal(slotProps.data?.[item.field], () => $emit('refresh'))"
          >
            {{ slotProps.data?.[item.field] }}
          </p>
          <p
            v-else
            :class="{
              'wf_table-single-selected-row--content': slotProps.data.id === selectedRow?.id
            }"
          >
            {{ slotProps.data?.[item.field] }}
          </p>
        </template>
      </Column>
    </template>
  </DataTablePaginationWithCheckbox>
</template>

<style scoped></style>
