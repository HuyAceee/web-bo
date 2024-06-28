<script setup lang="ts">
import { acceptNumberKeyWithoutLeadingZero } from '@/common'
import ExhibitionTitle from '@/components/exhibition/common/ExhibitionTitle.vue'
import { DataTablePaginationWithCheckbox, WelfareInputText, WelfareMdButton, WelfareSelect } from '@/components/uikit'
import { useExhibitionHallMngtCategoryGroupTable } from '@/composables/exhibition/exhibitionContent/useExhibitionHallMngtCategoryGroupTable'
import { exhibitionHallMngtCategoryGroupTableConfig } from '@/models/views/exhibition/exhibitionContent/ExhibitionHallMngtModel'
import Column from 'primevue/column'

const {
  flatformOptions,
  exhibitionStatusOptions,
  tableRef,
  values,
  tableValuesComputed,
  setFieldValue,
  onRowCheck,
  onSelectAll,
  onCopyCorner,
  onRegister,
  onDelete,
  onSave
} = useExhibitionHallMngtCategoryGroupTable()
</script>

<template>
  <div class="wf_exhibition-table-container-hotfix">
    <DataTablePaginationWithCheckbox
      class="wf_data-table-colspan"
      ref="tableRef"
      lazy
      is-select-invisible
      hidden-pagination
      :reorderable-columns="false"
      :resizable-columns="false"
      :value="tableValuesComputed"
      :total-records="tableValuesComputed.length ?? 0"
      @row-checked-change="(item: any) => onRowCheck(item)"
      @select-all-change="onSelectAll"
    >
      <template #title>
        <ExhibitionTitle class="wf-mb--4" :title="`카테고리 그룹 관리 총 ${values.formData?.length ?? 0}건`" />
      </template>
      <template #buttons>
        <div class="wf-mb--4 wf_flex wf-space-x-4">
          <WelfareMdButton label="코너 복사" @on-click="onCopyCorner" button-size="small" buttonType="liner" />
          <WelfareMdButton label="등록" @on-click="onRegister" button-size="small" buttonType="liner" />
          <WelfareMdButton label="삭제" @on-click="onDelete" button-size="small" buttonType="liner" />
          <WelfareMdButton label="저장" @on-click="onSave" button-size="small" buttonType="liner" />
        </div>
      </template>
      <template #columns>
        <Column
          v-for="(col, index) in exhibitionHallMngtCategoryGroupTableConfig"
          :key="index"
          :class="[col?.class, { 'wf_custom-col': col.children?.length ?? 0 > 1 }]"
          :field="col?.field"
        >
          <template #header>
            <!-- nested header cell -->
            <template v-if="col.children?.length ?? 0 > 1">
              <div class="wf_w-full">
                <div class="wf_data-table-border-b wf_h-44 wf_flex wf_items-center wf_justify-center">
                  {{ col.header }}<span v-if="col?.required" class="wf_text-sub-01">*</span>
                </div>
                <div class="wf_h-44 wf_grid" :class="`wf_grid-cols-${col.children?.length}`">
                  <div
                    v-for="(childCol, childIdx) in col.children"
                    :key="childIdx"
                    class="wf_flex wf_items-center wf_justify-center"
                    :class="{ 'wf_data-table-border-l': childIdx !== 0 }"
                  >
                    {{ childCol?.header }}<span v-if="childCol?.required" class="wf_text-sub-01">*</span>
                  </div>
                </div>
              </div>
            </template>
            <!-- default header cell -->
            <template v-else> {{ col.header }}<span v-if="col?.required" class="wf_text-sub-01">*</span> </template>
          </template>

          <!-- body col -->
          <template #body="slotProps">
            <!-- body nested col -->
            <template v-if="col.children?.length ?? 0 > 1">
              <div class="wf_w-full wf_h-full wf_grid" :class="`wf_grid-cols-${col.children?.length}`">
                <!-- nested custom col -->
                <template v-if="col.field === 'ex-start'">
                  <div class="wf_flex wf_items-center wf_justify-center"></div>
                  <div class="wf_flex wf_items-center wf_justify-center wf_data-table-border-l"></div>
                  <div class="wf_flex wf_items-center wf_justify-center wf_data-table-border-l"></div>
                  <div class="wf_flex wf_items-center wf_justify-center wf_data-table-border-l"></div>
                </template>

                <!-- nested default col -->
                <template v-else>
                  <div
                    v-for="(childCol, childIdx) in col.children"
                    class="wf_flex wf_items-center wf_justify-center"
                    :class="{ 'wf_data-table-border-l': childIdx !== 0 }"
                    :key="childIdx"
                  >
                    <div :class="true === slotProps.data.id && 'wf_table-single-selected-row--content'">
                      {{ slotProps.data?.[childCol.field] }}
                    </div>
                  </div>
                </template>
              </div>
            </template>

            <!-- body custom col -->
            <template v-else-if="col.field == 'flatform'">
              <WelfareSelect
                small
                class="wf_w-80"
                option-label="label"
                option-value="value"
                :options="flatformOptions"
                :model-value="slotProps.data?.flatform"
                @update:model-value="(value) => setFieldValue(`formData.${slotProps.index}.flatform`, value)"
              />
            </template>

            <template v-else-if="col.field == 'exhibitionStatus'">
              <WelfareSelect
                small
                class="wf_w-80"
                option-label="label"
                option-value="value"
                :options="exhibitionStatusOptions"
                :model-value="slotProps.data?.exhibitionStatus"
                @update:model-value="(value) => setFieldValue(`formData.${slotProps.index}.exhibitionStatus`, value)"
              />
            </template>

            <template v-else-if="col.field == 'exhibitionOrder'">
              <WelfareInputText
                size="small"
                @keypress="acceptNumberKeyWithoutLeadingZero"
                placeholder=" "
                :model-value="slotProps.data?.exhibitionOrder"
                @update:model-value="(value) => setFieldValue(`formData.${slotProps.index}.exhibitionOrder`, value)"
              />
            </template>

            <!--default col -->
            <template v-else>
              <div :class="true === slotProps.data.id && 'wf_table-single-selected-row--content'">
                {{ slotProps.data?.[col.field] }}
              </div>
            </template>
          </template>
        </Column>
      </template>
    </DataTablePaginationWithCheckbox>
  </div>
</template>

<style scoped>
@import url('@/assets/css/widgets/dataTable/data-table-merge-col.css');
</style>
