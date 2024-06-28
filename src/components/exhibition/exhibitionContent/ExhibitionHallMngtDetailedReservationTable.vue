<script setup lang="ts">
import { DataTablePaginationWithCheckbox, WelfareMdButton } from '@/components/uikit'
import ExhibitionTitle from '../common/ExhibitionTitle.vue'
import Column from 'primevue/column'
import { exhibitionHallMngtDetailedReservationTableConfig } from '@/models/views/exhibition/exhibitionContent/ExhibitionHallMngtModel'
</script>

<template>
  <div class="wf_exhibition-table-container-hotfix">
    <DataTablePaginationWithCheckbox
      class="wf_data-table-colspan"
      ref="tableRef"
      lazy
      is-select-invisible
      :reorderable-columns="false"
      :resizable-columns="false"
    >
      <template #title><ExhibitionTitle class="wf-mb--4" title="예약 목록" /> </template>
      <template #buttons>
        <div class="wf-mb--4 wf_flex wf-space-x-4">
          <WelfareMdButton label="코너 복사" @on-click="() => {}" button-size="small" buttonType="liner" />
          <WelfareMdButton label="등록" @on-click="() => {}" button-size="small" buttonType="liner" />
          <WelfareMdButton label="삭제" @on-click="() => {}" button-size="small" buttonType="liner" />
          <WelfareMdButton label="저장" @on-click="() => {}" button-size="small" buttonType="liner" />
        </div>
      </template>
      <template #columns>
        <Column
          v-for="(col, index) in exhibitionHallMngtDetailedReservationTableConfig"
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
          <!-- <template #body="slotProps">
          </template> -->
        </Column>
      </template>
    </DataTablePaginationWithCheckbox>
  </div>
</template>

<style scoped>
@import url('@/assets/css/widgets/dataTable/data-table-merge-col.css');
</style>
