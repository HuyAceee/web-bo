<script lang="ts" setup>
import {
  exhibitionGnbDisplayYn,
  exhibitionGnbReservationGroupManagementTableConfig,
  ExhibitionGnbReservationManagementProps,
  exhibitionGnbSubTitleUseYn
} from '@/models/views/exhibition/exhibitionGnbManagement/ExhibitionGnbManagementModel'
import { DataTablePaginationWithCheckbox, TextInputWithMaxLengthCharacters, WelfareCheckbox, WelfareMdButton, WelfareSelect } from '@/components'
import { useExhibitionGnbReservationManagement } from '@/composables/exhibition/exhibitionCommon/useExhibitionGnbReservationManagement'
import Column from 'primevue/column'
import DateTimePicker from '@/components/widgets/dateTimePicker/DateTimePicker.vue'
import { DEFAULT_DATE_FORMAT, formatTime, TEXT_MAX_NUMBER_8 } from '@/common'
import WelfareTimeInput from '@/components/widgets/dateTime/WelfareTimeInput.vue'
import ExhibitionGnbLinkTypeGroup from '@/components/exhibition/exhibitionCommon/exhibitionGnbManagement/ExhibitionGnbLinkTypeGroup.vue'

interface ExhibitionGnbReservationManagementEmit {
  (e: 'setHasGnbValue', value: boolean): void
}

const props = defineProps<ExhibitionGnbReservationManagementProps>()
const emit = defineEmits<ExhibitionGnbReservationManagementEmit>()

const setHasGnbValue = (value: boolean) => {
  emit('setHasGnbValue', value)
}

const {
  gnbGroupList,
  totalItem,
  addNewRow,
  submitNewGnbGroup,
  loading,
  deleteGnbGroup,
  isSelectedAll,
  onSelectAll,
  onRowSelected,
  listChecked,
  handleChooseStartDate,
  handleChooseEndDate,
  handleChooseStartTime,
  handleChooseEndTime
} = useExhibitionGnbReservationManagement(props, setHasGnbValue)

const columnsConfig = [
  exhibitionGnbReservationGroupManagementTableConfig[3].field,
  exhibitionGnbReservationGroupManagementTableConfig[4].field,
  exhibitionGnbReservationGroupManagementTableConfig[5].field,
  exhibitionGnbReservationGroupManagementTableConfig[6].field,
  exhibitionGnbReservationGroupManagementTableConfig[7].field,
  exhibitionGnbReservationGroupManagementTableConfig[8].field,
  exhibitionGnbReservationGroupManagementTableConfig[9].field,
  exhibitionGnbReservationGroupManagementTableConfig[10].field
]
</script>

<template>
  <DataTablePaginationWithCheckbox
    :value="gnbGroupList"
    :loading="loading"
    ref="refTable"
    hidden-pagination
    is-select-invisible
    :show-selection="false"
    class="wf-mt-30"
    no-data-label="조회 내용이 없습니다"
  >
    <template #columns>
      <slot name="columns">
        <Column
          v-for="(item, index) in exhibitionGnbReservationGroupManagementTableConfig"
          :key="item.field"
          :column-key="item.field"
          :field="item.field"
          :class="item.class"
        >
          <template #header v-if="item.field === 'select'">
            <WelfareCheckbox id="select-all" :model-value="isSelectedAll" size="sm" v-on:click="onSelectAll" />
          </template>
          <template #header v-else-if="columnsConfig.includes(item.field)">
            <span>{{ exhibitionGnbReservationGroupManagementTableConfig[index].header }} <span class="wf_text-sub-01">*</span></span>
          </template>
          <template #header v-else>
            <span>{{ exhibitionGnbReservationGroupManagementTableConfig[index].header }}</span>
          </template>
          <template #body="slotProps" v-if="item.field === 'select'">
            <WelfareCheckbox
              :model-value="listChecked.includes(slotProps.data?.id)"
              id="{{ slotProps.data?.id }}"
              :key="slotProps.data?.id"
              @update:modelValue="onRowSelected(slotProps.data)"
              size="sm"
            />
          </template>
          <template #body="slotProps" v-else-if="item.field === 'displayYn'">
            <WelfareSelect
              class="wf_w-100"
              optionLabel="label"
              option-value="value"
              small
              :model-value="slotProps.data.displayYn"
              @update:model-value="
                (value) => {
                  gnbGroupList[slotProps.index].displayYn = value
                }
              "
              :options="exhibitionGnbDisplayYn"
            />
          </template>
          <template #body="slotProps" v-else-if="item.field === 'displayStartDate'">
            <DateTimePicker
              :modelValue="slotProps.data?.[item.field] && formatTime(slotProps.data?.[item.field], DEFAULT_DATE_FORMAT)"
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
          <template #body="slotProps" v-else-if="item.field === 'displayStartTime'">
            <WelfareTimeInput
              :modelValue="slotProps.data?.[item.field]"
              @update:model-value="
                (value) => {
                  handleChooseStartTime(value, slotProps.index)
                }
              "
            />
          </template>
          <template #body="slotProps" v-else-if="item.field === 'displayEndDate'">
            <DateTimePicker
              :modelValue="slotProps.data?.[item.field] && formatTime(slotProps.data?.[item.field], DEFAULT_DATE_FORMAT)"
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
          <template #body="slotProps" v-else-if="item.field === 'displayEndTime'">
            <WelfareTimeInput
              :modelValue="slotProps.data?.[item.field]"
              @update:model-value="
                (value) => {
                  handleChooseEndTime(value, slotProps.index)
                }
              "
            />
          </template>
          <template #body="slotProps" v-else-if="item.field === 'mainTitleName'">
            <TextInputWithMaxLengthCharacters
              :model-value="slotProps.data[item.field]"
              @update:model-value="
                (value) => {
                  gnbGroupList[slotProps.index].mainTitleName = value
                }
              "
              :max-length="TEXT_MAX_NUMBER_8"
              hidden-warning
              size="small"
            ></TextInputWithMaxLengthCharacters>
          </template>
          <template #body="slotProps" v-else-if="item.field === 'linkUrl'">
            <ExhibitionGnbLinkTypeGroup :gnb-group-list="gnbGroupList" :slot-props="slotProps" />
          </template>
          <template #body="slotProps" v-else-if="item.field === 'subTitleUseYn'">
            <WelfareSelect
              class="wf_w-100"
              optionLabel="label"
              option-value="value"
              small
              :model-value="slotProps.data.subTitleUseYn"
              @update:model-value="
                (value) => {
                  gnbGroupList[slotProps.index].subTitleUseYn = value
                }
              "
              :options="exhibitionGnbSubTitleUseYn"
            />
          </template>
          <template #body="slotProps" v-else-if="item.field === 'subTitleName'">
            <TextInputWithMaxLengthCharacters
              :model-value="slotProps.data[item.field]"
              :disabled="slotProps.data.subTitleUseYn === exhibitionGnbSubTitleUseYn[0].value"
              class="wf-width-full wf-ml-6"
              size="small"
              :max-length="TEXT_MAX_NUMBER_8"
              @update:model-value="
                (value: string) => {
                  gnbGroupList[slotProps.index].subTitleName = value
                }
              "
              hidden-warning
            ></TextInputWithMaxLengthCharacters>
          </template>
          <template #body="slotProps" v-else-if="item.field === 'rowNum'">
            <p>{{ slotProps.index + 1 }}</p>
          </template>
          <template #body="slotProps" v-else>
            <p>{{ slotProps.data[item.field] }}</p>
          </template>
        </Column>
      </slot>
    </template>
    <template #title>
      <h6 class="wf_text-n-33">GNB 예약목록 총 {{ totalItem }} 건</h6>
    </template>
    <template #buttons>
      <div class="wf-space-x-6 wf_flex wf_justify-center wf_items-center">
        <WelfareMdButton label="추가" @click="addNewRow" class="wf_w-45" buttonType="liner" />
        <WelfareMdButton label="삭제" @click="deleteGnbGroup" class="wf_w-45" buttonType="liner" />
        <WelfareMdButton label="저장" class="wf_w-45" @click="submitNewGnbGroup" buttonType="default" />
      </div>
    </template>
  </DataTablePaginationWithCheckbox>
</template>

<style scoped>
@import url('@/assets/css/widgets/dataTable/data-table-container.css');
</style>
