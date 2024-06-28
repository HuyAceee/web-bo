<script setup lang="ts">
import { formatNumberDot, MEMBER_DETAIL_INFO } from '@/common'
import { BaseDataTablePagination } from '@/components'
import { WelfareDataTableEmits, WelfareDataTableExpose, WelfareDataTableProps } from '@/models'
import { defaultDataTablePropsConfig } from '@/models/uikit/WelfareDataTableProps'
import Column from 'primevue/column'
import { ImgLoader } from '@/assets'
import { useBaseDataTablePaginationEmit } from '@/composables/widgets/table/useTableEmit'
import { useMemberWelfarePointUsageDetail } from '@/composables/members/modal/useMemberWelfarePointUsageDetail'
import { memberPointUsageHeaderTableConfig } from '@/models/views/members/pointUsageList/MemberPointUsageListModel'

export interface MemberPointUsageListTableProps extends WelfareDataTableProps {}

export interface MemberPointUsageListTableEmits extends WelfareDataTableEmits {
  (e: 'show-modal-detail'): void
}

const props = withDefaults(defineProps<MemberPointUsageListTableProps>(), defaultDataTablePropsConfig)
const emit = defineEmits<MemberPointUsageListTableEmits>()
const { event, tableRef } = useBaseDataTablePaginationEmit(emit)
const { handleOpenModal } = useMemberWelfarePointUsageDetail()

const scrollToTop = () => {
  tableRef?.value?.scrollToTop()
}

defineExpose<WelfareDataTableExpose>({
  scrollToTop: scrollToTop
})
</script>

<template>
  <BaseDataTablePagination
    class="wf-member-point-usage-list"
    ref="tableRef"
    v-bind="props"
    v-on="event"
    noDataLabel="조회 내용이 없습니다.
"
  >
    <template #title>
      <h6 class="wf_text-n-33">조회 결과 &nbsp;총 {{ formatNumberDot(props.totalRecords) }} 건</h6>
    </template>
    <template #loading>
      <div class="p-datatable-loading-overlay p-component-overlay" data-pc-section="loadingoverlay">
        <img class="wf-loading-table" alt="" :src="ImgLoader" />
      </div>
    </template>
    <template #columns>
      <Column
        :header="memberPointUsageHeaderTableConfig[0].header"
        :field="memberPointUsageHeaderTableConfig[0].field"
        :class="memberPointUsageHeaderTableConfig[0].class"
      >
        <template #body="slotProps">
          <p class="wf-pointer wf-text_link">{{ slotProps.data?.[memberPointUsageHeaderTableConfig[0].field] }}</p>
        </template>
      </Column>
      <Column
        :header="memberPointUsageHeaderTableConfig[1].header"
        :field="memberPointUsageHeaderTableConfig[1].field"
        :class="memberPointUsageHeaderTableConfig[1].class"
      >
        <template #body="slotProps">
          <p>{{ slotProps.data?.[memberPointUsageHeaderTableConfig[1].field] }}</p>
        </template>
      </Column>
      <Column
        :header="memberPointUsageHeaderTableConfig[2].header"
        :field="memberPointUsageHeaderTableConfig[2].field"
        :class="memberPointUsageHeaderTableConfig[2].class"
      >
        <template #body="slotProps">
          <router-link
            :to="{ path: `${MEMBER_DETAIL_INFO}`, query: { memberKey: slotProps.data[memberPointUsageHeaderTableConfig[2].field] } }"
            class="wf-text_link wf-pointer"
            >{{ slotProps.data?.[memberPointUsageHeaderTableConfig[2].field] }}
          </router-link>
        </template>
      </Column>
      <Column
        v-for="(item, index) in memberPointUsageHeaderTableConfig.slice(3, 7)"
        :header="item.header"
        :field="item.field"
        :key="index"
        :class="item.class"
      />
      <Column
        :header="memberPointUsageHeaderTableConfig[7].header"
        :field="memberPointUsageHeaderTableConfig[7].field"
        :class="memberPointUsageHeaderTableConfig[7].class"
      >
        <template #body="slotProps">
          <p class="wf-pointer wf-text_link" @click="handleOpenModal(slotProps.data?.[memberPointUsageHeaderTableConfig[2].field])">
            {{
              slotProps.data?.[memberPointUsageHeaderTableConfig[7].field] &&
              formatNumberDot(slotProps.data?.[memberPointUsageHeaderTableConfig[7].field])
            }}
          </p>
        </template>
      </Column>
      <Column
        :header="memberPointUsageHeaderTableConfig[8].header"
        :field="memberPointUsageHeaderTableConfig[8].field"
        :class="memberPointUsageHeaderTableConfig[8].class"
      >
        <template #body="slotProps">
          <p
            v-if="slotProps.data?.[memberPointUsageHeaderTableConfig[8].field]"
            class="wf-pointer wf-text_link"
            @click="handleOpenModal(slotProps.data?.[memberPointUsageHeaderTableConfig[2].field])"
          >
            {{
              slotProps.data?.[memberPointUsageHeaderTableConfig[8].field] &&
              formatNumberDot(slotProps.data?.[memberPointUsageHeaderTableConfig[8].field])
            }}
          </p>
        </template>
      </Column>
      <Column
        :header="memberPointUsageHeaderTableConfig[9].header"
        :field="memberPointUsageHeaderTableConfig[9].field"
        :class="memberPointUsageHeaderTableConfig[9].class"
      />
    </template>
  </BaseDataTablePagination>
</template>
