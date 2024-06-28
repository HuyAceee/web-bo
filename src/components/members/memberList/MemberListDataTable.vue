<script lang="ts" setup>
import { WelfareMdButton, WelfareSelect, DataTablePaginationWithCheckbox } from '@/components'
import {
  defaultDataTablePropsConfig,
  memberHeaderFieldTableMemberListConfig,
  WelfareDataTableEmits,
  WelfareDataTableProps,
  WelfareDataTableWithCheckBoxExpose
} from '@/models'
import Column from 'primevue/column'
import { PageState } from 'primevue/paginator'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { MEMBER_INFORMATION_REGISTRATION } from '@/common'
import { useBaseTable } from '@/composables/widgets/table/useBaseTable'
import { useDataTableWithCheckbox } from '@/composables/widgets/table/useDataTableWithCheckbox'

const router = useRouter()

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

const { selectRows, scrollToTop, parentRef } = useBaseTable(params)
const { clearSelectedAll } = useDataTableWithCheckbox(params, data)

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
      <h6 class="wf_text-n-33">조회 결과 &nbsp;(총 {{ totalElement ?? 0 }} 건)</h6>
      <div class="wf-space-x-6 wf_flex">
        <!-- <WelfareMdButton :disabled="isListCheckedEmpty" label="선택 일괄수정" class="wf_w-96" buttonType="liner" /> -->
        <WelfareMdButton label="등록" class="wf_w-45" buttonType="liner" @click="router.push(MEMBER_INFORMATION_REGISTRATION)" />
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
    <DataTablePaginationWithCheckbox
      :value="data"
      :loading="loading"
      :total-records="totalElement"
      @pageChange="onPageChange"
      @select-all-change="eventEmit.onSelectAllChange"
      no-data-label="리스트가 없습니다."
      is-select-invisible
      ref="tableRef"
    >
      <template #columns>
        <Column field="code" class="wf_m-w-120" header="회원코드">
          <template #body="slotProps">
            <router-link
              :to="{ path: 'detail', query: { memberKey: slotProps.data.code } }"
              class="wf_m-w-250 wf-text_link wf_text-sub-02 wf_flex wf_justify-center wf-pointer"
            >
              <span> {{ slotProps.data.code }}</span>
            </router-link>
          </template>
        </Column>
        <Column
          v-for="(body, index) in [...memberHeaderFieldTableMemberListConfig[0], ...memberHeaderFieldTableMemberListConfig[1]]"
          :key="index"
          :field="body.field"
          :class="body.class"
          :header="body.header"
        >
          <template #body="slotProps">
            <div v-if="body.field === 'customerCompanyCode'">
              <a class="wf_m-w-250 wf-text_link wf_text-sub-02 wf_flex wf_justify-center wf-pointer">
                {{ slotProps.data[body.field] }}
              </a>
            </div>
            <div v-else-if="body.field === 'customer'">
              <a class="wf_m-w-250 wf-text_link wf_text-sub-02 wf_flex wf_justify-center wf-pointer">
                {{ slotProps.data[body.field] }}
              </a>
            </div>
            <div v-else>
              {{ slotProps.data[body.field] }}
            </div>
          </template>
        </Column>
      </template>
    </DataTablePaginationWithCheckbox>
  </div>
</template>
