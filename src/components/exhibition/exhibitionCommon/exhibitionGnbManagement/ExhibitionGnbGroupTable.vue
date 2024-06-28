<script lang="ts" setup>
import {
  ExhibitionGnbGroupListTableModel,
  exhibitionGnbGroupManagementTableConfig,
  ExhibitionGnbGroupType,
  ExhibitionGnbGroupTypeApplicationChannelValue,
  ExhibitionGnbGroupTypeUseYnValue,
  ExhibitionGnbGroupTypeValue
} from '@/models/views/exhibition/exhibitionGnbManagement/ExhibitionGnbManagementModel'
import { DataTableContainer, TextInputValidationMaxBytes, WelfareInputText, WelfareMdButton, WelfareSelect } from '@/components'
import { DataTableRowClickEvent } from 'primevue/datatable'
import { categoriesExhibitionStatusOptions } from '@/models/views/categories/exhibition/CategoriesExhibitionDepth3ManagementModel'
import { ref } from 'vue'
import { WelfareDataTableExpose } from '@/models'

interface ExhibitionGnbGroupTableProps {
  gnbGroupList?: ExhibitionGnbGroupListTableModel[]
  totalItem: number
  filterType: string
  loading: boolean
  typeGnbCustomer?: boolean
  itemsSelected?: ExhibitionGnbGroupListTableModel
}

const tableRef = ref()

interface ExhibitionGnbGroupTableEmit {
  (e: 'selectedRow', event: DataTableRowClickEvent): void

  (e: 'addNewRow'): void

  (e: 'submitNewGnbGroup'): void

  (e: 'deleteGnbGroup'): void

  (e: 'setFilterType', value: string): void

  (e: 'setValueGnbGroup', field: any, value: string, index: number): void

  (e: 'openModalGnbGroup'): void
}

const props = defineProps<ExhibitionGnbGroupTableProps>()

const emitEvent = defineEmits<ExhibitionGnbGroupTableEmit>()

const changEvent = (value: string, index: number) => {
  setTimeout(() => {
    emitEvent('setValueGnbGroup', 'displayOrder', value, index)
  })
}

const checkIsDisable = (value: ExhibitionGnbGroupListTableModel): boolean => {
  return (
    !!value.gnbGroupKey &&
    props.typeGnbCustomer &&
    [ExhibitionGnbGroupType.MAIN, ExhibitionGnbGroupType.TIMEDEAL, ExhibitionGnbGroupType.BEST].includes(
      value.gnbGroupTypeCurrent as ExhibitionGnbGroupType
    )
  )
}

const resetSelectedRow = () => {
  tableRef?.value?.resetSelectedRow()
}

const scrollToTop = () => {
  tableRef?.value?.scrollToTop()
}

defineExpose<WelfareDataTableExpose>({
  scrollToTop,
  resetSelectedRow
})
</script>

<template>
  <DataTableContainer
    ref="tableRef"
    :value="gnbGroupList"
    is-select-invisible
    :loading="loading"
    :column-configs="exhibitionGnbGroupManagementTableConfig"
    @row-click="(value) => emitEvent('selectedRow', value)"
    no-data-label="내용이 없습니다."
  >
    <template #title>
      <h6 class="wf_text-n-33">GNB 그룹 관리 총 {{ totalItem }} 건</h6>
    </template>
    <template #buttons>
      <div class="wf-space-x-6 wf_flex wf_justify-center wf_items-center">
        <!--        confirm sb-->
        <!--        <WelfareMdButton label="그룹 복사" v-if="typeGnbCustomer" @click="emitEvent('openModalGnbGroup')" buttonType="liner" />-->
        <WelfareMdButton label="추가" @click="emitEvent('addNewRow')" class="wf_w-45" buttonType="liner" />
        <WelfareMdButton label="삭제" @click="emitEvent('deleteGnbGroup')" class="wf_w-45" buttonType="liner" />
        <WelfareMdButton label="저장" class="wf_w-45" @click="emitEvent('submitNewGnbGroup')" buttonType="default" />
        <WelfareSelect
          class="wf_w-100"
          optionLabel="label"
          option-value="value"
          :model-value="filterType"
          @update:model-value="
            (value) => {
              emitEvent('setFilterType', value)
            }
          "
          :options="ExhibitionGnbGroupTypeApplicationChannelValue"
        />
      </div>
    </template>
    <template #header-displayOrder="{ props }">
      <span class="wf-body_02-semi wf_text-n-33">
        {{ props }}
        <span class="wf_text-sub-01">&nbsp;*</span>
      </span></template
    >
    <template #header-gnbGroupName="{ props }">
      <span class="wf-body_02-semi wf_text-n-33">
        {{ props }}
        <span class="wf_text-sub-01">&nbsp;*</span>
      </span></template
    >
    <template #header-gnbGroupType="{ props }">
      <span class="wf-body_02-semi wf_text-n-33">
        {{ props }}
        <span class="wf_text-sub-01">&nbsp;*</span>
      </span></template
    >
    <template #header-customerId="{ props }">
      <span class="wf-body_02-semi wf_text-n-33">
        {{ props }}
        <span class="wf_text-sub-01">&nbsp;*</span>
      </span></template
    >
    <template #header-useYn="{ props }">
      <span class="wf-body_02-semi wf_text-n-33">
        {{ props }}
        <span class="wf_text-sub-01">&nbsp;*</span>
      </span></template
    >

    <template #body-rowNum="{ props }">
      {{ props.index + 1 }}
    </template>
    <template #body-displayOrder="{ props }">
      <WelfareInputText
        input-type="number"
        hidden-warning
        size="small"
        :model-value="props.data.displayOrder"
        @update:model-value="
          (value) => {
            if (gnbGroupList) {
              emitEvent('setValueGnbGroup', 'displayOrder', value, props.index)
              if (value === '0') {
                changEvent('', props.index)
              }
            }
          }
        "
        :disabled="checkIsDisable(props.data)"
      />
    </template>
    <template #body-gnbGroupName="{ props }">
      <TextInputValidationMaxBytes
        size="small"
        :model-value="props.data.gnbGroupName"
        @update:model-value="
          (value) => {
            if (gnbGroupList) {
              emitEvent('setValueGnbGroup', 'gnbGroupName', value, props.index)
            }
          }
        "
        :max-bytes="12"
        :disabled="checkIsDisable(props.data)"
      />
    </template>
    <template #body-gnbGroupType="{ props }">
      <div class="wf-width-full">
        <WelfareSelect
          class="wf_flex-1 wf-width-full"
          optionLabel="label"
          option-value="value"
          placeholder="선택"
          :model-value="props.data?.gnbGroupType"
          @update:model-value="
            (value) => {
              if (gnbGroupList) {
                emitEvent('setValueGnbGroup', 'gnbGroupType', value, props.index)
              }
            }
          "
          :options="ExhibitionGnbGroupTypeValue"
          small
          :disabled="checkIsDisable(props.data)"
        />
      </div>
    </template>
    <template #body-useYn="{ props }">
      <div class="wf-width-full">
        <WelfareSelect
          class="wf_flex-1 wf-width-full"
          optionLabel="label"
          option-value="value"
          :model-value="props.data?.useYn"
          @update:model-value="
            (value) => {
              if (gnbGroupList) {
                emitEvent('setValueGnbGroup', 'useYn', value, props.index)
              }
            }
          "
          :options="ExhibitionGnbGroupTypeUseYnValue"
          small
          :disabled="checkIsDisable(props.data)"
        />
      </div>
    </template>

    <template #body-reservationYn="{ props }">
      <p :class="itemsSelected?.gnbGroupKey === props.data?.gnbGroupKey && 'wf_text-sub-02'">
        {{ categoriesExhibitionStatusOptions.find((item) => item.value === props.data?.reservationYn)?.label }}
      </p>
    </template>

    <template #body-applyChannelType="{ props }">
      <div class="wf-width-full">
        <WelfareSelect
          class="wf_flex-1 wf-width-full"
          optionLabel="label"
          option-value="value"
          :model-value="props.data?.applyChannelType"
          @update:model-value="
            (value) => {
              if (gnbGroupList) {
                emitEvent('setValueGnbGroup', 'applyChannelType', value, props.index)
              }
            }
          "
          :options="ExhibitionGnbGroupTypeApplicationChannelValue"
          small
          :disabled="checkIsDisable(props.data)"
        />
      </div>
    </template>
  </DataTableContainer>
</template>

<style scoped>
@import url('@/assets/css/widgets/dataTable/data-table-container.css');
</style>
